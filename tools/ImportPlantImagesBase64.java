import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.MemoryCacheImageOutputStream;

public class ImportPlantImagesBase64 {
    private record Plant(long id, String name, String currentImage) {}

    private record ImageFile(Path path, String key, String mimeType) {}

    private static final Set<String> STOP_WORDS = Set.of("de", "del", "la", "el", "las", "los");

    public static void main(String[] args) throws Exception {
        boolean apply = hasFlag(args, "--apply");
        boolean alterColumn = hasFlag(args, "--alter-column");
        String url = getArg(args, "--db-url", "jdbc:mysql://127.0.0.1:3307/veridis?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Europe/Madrid");
        String user = getArg(args, "--db-user", "root");
        String password = getArg(args, "--db-password", "123");
        Path imagesDir = Path.of(getArg(args, "--images-dir", "Img_Veridis"));
        Path backupDir = Path.of(getArg(args, "--backup-dir", "db_init"));
        int maxImageSize = Integer.parseInt(getArg(args, "--max-size", "640"));
        float jpegQuality = Float.parseFloat(getArg(args, "--quality", "0.78"));

        if (!Files.isDirectory(imagesDir)) {
            throw new IllegalArgumentException("No existe la carpeta de imagenes: " + imagesDir.toAbsolutePath());
        }

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            printColumnInfo(connection);

            if (apply && alterColumn) {
                alterImageColumn(connection);
            }

            List<Plant> plants = loadPlants(connection);
            Map<String, ImageFile> images = loadImages(imagesDir);

            List<String> backupStatements = new ArrayList<>();
            List<String> missingImages = new ArrayList<>();
            int updated = 0;

            for (Plant plant : plants) {
                String key = normalizeKey(plant.name());
                key = manualImageKey(key);
                ImageFile image = images.get(key);

                if (image == null) {
                    missingImages.add(plant.id() + " - " + plant.name());
                    continue;
                }

                String dataUri = toOptimizedDataUri(image, maxImageSize, jpegQuality);
                backupStatements.add(buildRollbackStatement(plant));

                System.out.println((apply ? "UPDATE" : "DRY-RUN") + " " + plant.id() + " - " + plant.name()
                        + " <- " + image.path().getFileName() + " (" + dataUri.length() + " chars)");

                if (apply) {
                    updatePlantImage(connection, plant.id(), dataUri);
                    updated++;
                }
            }

            if (apply) {
                Files.createDirectories(backupDir);
                Path backupFile = backupDir.resolve("rollback_plantas_img_base64_"
                        + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".sql");
                backupStatements.add("ALTER TABLE PLANTA MODIFY url_img_default VARCHAR(500);");
                Files.write(backupFile, backupStatements, StandardCharsets.UTF_8);
                System.out.println("Backup rollback: " + backupFile.toAbsolutePath());
            }

            System.out.println("Plantas encontradas: " + plants.size());
            System.out.println("Imagenes encontradas: " + images.size());
            System.out.println("Plantas actualizadas: " + updated);
            printImportStats(connection);

            if (!missingImages.isEmpty()) {
                System.out.println("Plantas sin imagen emparejada:");
                missingImages.forEach((item) -> System.out.println("  - " + item));
            }
        }
    }

    private static void alterImageColumn(Connection connection) throws SQLException {
        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate("ALTER TABLE PLANTA MODIFY url_img_default LONGTEXT");
        }
        System.out.println("Columna ampliada: PLANTA.url_img_default -> LONGTEXT");
    }

    private static boolean hasFlag(String[] args, String flag) {
        for (String arg : args) {
            if (arg.equals(flag)) {
                return true;
            }
        }
        return false;
    }

    private static String getArg(String[] args, String name, String defaultValue) {
        for (int i = 0; i < args.length - 1; i++) {
            if (args[i].equals(name)) {
                return args[i + 1];
            }
        }
        return defaultValue;
    }

    private static void printColumnInfo(Connection connection) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS "
                        + "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'PLANTA' AND COLUMN_NAME = 'url_img_default'");
                ResultSet resultSet = statement.executeQuery()) {
            if (resultSet.next()) {
                System.out.println("PLANTA.url_img_default: " + resultSet.getString("COLUMN_TYPE"));
            }
        }
    }

    private static void printImportStats(Connection connection) throws SQLException {
        try (Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(
                        "SELECT COUNT(*) total, "
                                + "SUM(CASE WHEN url_img_default LIKE 'data:image/%;base64,%' THEN 1 ELSE 0 END) with_base64, "
                                + "MIN(CHAR_LENGTH(url_img_default)) min_length, "
                                + "MAX(CHAR_LENGTH(url_img_default)) max_length "
                                + "FROM PLANTA")) {
            if (resultSet.next()) {
                System.out.println("Validacion BD: " + resultSet.getInt("with_base64") + "/"
                        + resultSet.getInt("total") + " plantas con base64. Longitud min/max: "
                        + resultSet.getInt("min_length") + "/" + resultSet.getInt("max_length"));
            }
        }
    }

    private static List<Plant> loadPlants(Connection connection) throws SQLException {
        List<Plant> plants = new ArrayList<>();
        try (Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(
                        "SELECT id_planta, nombre_comun, url_img_default FROM PLANTA ORDER BY id_planta")) {
            while (resultSet.next()) {
                plants.add(new Plant(
                        resultSet.getLong("id_planta"),
                        resultSet.getString("nombre_comun"),
                        resultSet.getString("url_img_default")));
            }
        }
        return plants;
    }

    private static Map<String, ImageFile> loadImages(Path imagesDir) throws IOException {
        Map<String, ImageFile> images = new HashMap<>();
        Set<String> duplicates = new HashSet<>();

        try (var stream = Files.list(imagesDir)) {
            for (Path path : stream.filter(Files::isRegularFile).toList()) {
                String fileName = path.getFileName().toString();
                String lowerName = fileName.toLowerCase(Locale.ROOT);

                if (!lowerName.endsWith(".png") && !lowerName.endsWith(".jpg") && !lowerName.endsWith(".jpeg")) {
                    continue;
                }

                String baseName = fileName.substring(0, fileName.lastIndexOf('.'));
                String key = normalizeKey(baseName);
                String mimeType = lowerName.endsWith(".png") ? "image/png" : "image/jpeg";

                if (images.containsKey(key)) {
                    duplicates.add(key);
                }

                images.put(key, new ImageFile(path, key, mimeType));
            }
        }

        if (!duplicates.isEmpty()) {
            throw new IllegalStateException("Hay imagenes duplicadas para estas claves: " + duplicates);
        }

        return images;
    }

    private static String normalizeKey(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replace('_', ' ')
                .replaceAll("[^a-z0-9 ]", " ");

        StringBuilder key = new StringBuilder();
        for (String token : normalized.split("\\s+")) {
            if (!token.isBlank() && !STOP_WORDS.contains(token)) {
                key.append(token);
            }
        }
        return key.toString();
    }

    private static String manualImageKey(String plantKey) {
        Map<String, String> aliases = Map.of(
                "poto", "potos",
                "costillaadan", "monsteradeliciosa",
                "echeveria", "echeveriaelegans",
                "petunia", "petunias",
                "gardenia", "gardenias",
                "fresa", "fresas",
                "celestina", "plumbago",
                "judiaverde", "judiasverdes",
                "violetaolorosa", "violeta");

        return aliases.getOrDefault(plantKey, plantKey);
    }

    private static String toOptimizedDataUri(ImageFile image, int maxSize, float quality) throws IOException {
        BufferedImage source = ImageIO.read(image.path().toFile());

        if (source == null) {
            String base64 = java.util.Base64.getEncoder().encodeToString(Files.readAllBytes(image.path()));
            return "data:" + image.mimeType() + ";base64," + base64;
        }

        BufferedImage resized = resizeImage(source, maxSize);
        byte[] bytes = encodeJpeg(resized, quality);
        String base64 = java.util.Base64.getEncoder().encodeToString(bytes);
        return "data:image/jpeg;base64," + base64;
    }

    private static BufferedImage resizeImage(BufferedImage source, int maxSize) {
        int width = source.getWidth();
        int height = source.getHeight();
        double scale = Math.min(1.0, (double) maxSize / Math.max(width, height));
        int targetWidth = Math.max(1, (int) Math.round(width * scale));
        int targetHeight = Math.max(1, (int) Math.round(height * scale));

        BufferedImage output = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = output.createGraphics();
        graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics.setColor(java.awt.Color.WHITE);
        graphics.fillRect(0, 0, targetWidth, targetHeight);
        graphics.drawImage(source, 0, 0, targetWidth, targetHeight, null);
        graphics.dispose();

        return output;
    }

    private static byte[] encodeJpeg(BufferedImage image, float quality) throws IOException {
        ImageWriter writer = ImageIO.getImageWritersByFormatName("jpg").next();
        ImageWriteParam params = writer.getDefaultWriteParam();
        params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        params.setCompressionQuality(Math.max(0.1f, Math.min(1.0f, quality)));

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try (MemoryCacheImageOutputStream imageOutput = new MemoryCacheImageOutputStream(output)) {
            writer.setOutput(imageOutput);
            writer.write(null, new IIOImage(image, null, null), params);
        } finally {
            writer.dispose();
        }

        return output.toByteArray();
    }

    private static void updatePlantImage(Connection connection, long plantId, String dataUri) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE PLANTA SET url_img_default = ? WHERE id_planta = ?")) {
            statement.setString(1, dataUri);
            statement.setLong(2, plantId);
            statement.executeUpdate();
        }
    }

    private static String buildRollbackStatement(Plant plant) {
        if (plant.currentImage() == null) {
            return "UPDATE PLANTA SET url_img_default = NULL WHERE id_planta = " + plant.id() + ";";
        }

        return "UPDATE PLANTA SET url_img_default = '" + plant.currentImage().replace("'", "''")
                + "' WHERE id_planta = " + plant.id() + ";";
    }
}
