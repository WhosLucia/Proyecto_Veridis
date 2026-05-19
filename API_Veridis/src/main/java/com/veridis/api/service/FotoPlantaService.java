package com.veridis.api.service;

import com.veridis.api.exception.DatosInvalidosException;
import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.FotoPlanta;
import com.veridis.api.model.FotoPlantaRequest;
import com.veridis.api.model.PlantaUsuario;
import com.veridis.api.repository.FotoPlantaRepository;
import com.veridis.api.repository.PlantaUsuarioRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FotoPlantaService {

    private final FotoPlantaRepository fotoPlantaRepository;
    private final PlantaUsuarioRepository plantaUsuarioRepository;

    public FotoPlantaService(FotoPlantaRepository fotoPlantaRepository,
            PlantaUsuarioRepository plantaUsuarioRepository) {
        this.fotoPlantaRepository = fotoPlantaRepository;
        this.plantaUsuarioRepository = plantaUsuarioRepository;
    }

    public List<FotoPlanta> listarTodas() {
        return fotoPlantaRepository.findAll();
    }

    public FotoPlanta buscarPorId(Long id) {
        Optional<FotoPlanta> foto = fotoPlantaRepository.findById(id);

        if (foto.isPresent()) {
            return foto.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Foto de planta no encontrada");
    }

    public List<FotoPlanta> listarPorPlantaUsuario(Long idPlantaUsuario) {
        buscarPlantaUsuario(idPlantaUsuario);
        return fotoPlantaRepository.findByPlantaUsuario_IdUsuarioPlanta(idPlantaUsuario);
    }

    public FotoPlanta crear(FotoPlantaRequest request) {
        FotoPlanta foto = new FotoPlanta();
        copiarDatos(foto, request);
        return fotoPlantaRepository.save(foto);
    }

    public FotoPlanta crearConArchivo(Long idPlantaUsuario, MultipartFile imagen, String descripcion) throws IOException {
        if (imagen == null || imagen.isEmpty()) {
            throw new DatosInvalidosException("La imagen no puede estar vacia");
        }

        String nombreArchivo = guardarArchivo(imagen);

        FotoPlanta foto = new FotoPlanta();
        foto.setPlantaUsuario(buscarPlantaUsuario(idPlantaUsuario));
        foto.setUrlImagen("/uploads/fotos-plantas/" + nombreArchivo);
        foto.setDescripcion(descripcion);
        foto.setFecha(LocalDateTime.now());

        return fotoPlantaRepository.save(foto);
    }

    public FotoPlanta actualizar(Long id, FotoPlantaRequest request) {
        FotoPlanta foto = buscarPorId(id);
        copiarDatos(foto, request);
        return fotoPlantaRepository.save(foto);
    }

    public void borrar(Long id) {
        FotoPlanta foto = buscarPorId(id);
        fotoPlantaRepository.delete(foto);
    }

    private void copiarDatos(FotoPlanta foto, FotoPlantaRequest request) {
        foto.setPlantaUsuario(buscarPlantaUsuario(request.getIdUsuarioPlanta()));
        foto.setUrlImagen(request.getUrlImagen());
        foto.setDescripcion(request.getDescripcion());

        if (request.getFecha() == null) {
            foto.setFecha(LocalDateTime.now());
        } else {
            foto.setFecha(request.getFecha());
        }
    }

    private String guardarArchivo(MultipartFile imagen) throws IOException {
        Path uploadDir = Paths.get("uploads", "fotos-plantas").toAbsolutePath();
        Files.createDirectories(uploadDir);

        String extension = obtenerExtension(imagen.getOriginalFilename(), imagen.getContentType());
        String nombreArchivo = UUID.randomUUID() + extension;
        Path destino = uploadDir.resolve(nombreArchivo);

        // Guardado fisico de la imagen
        imagen.transferTo(destino.toFile());

        return nombreArchivo;
    }

    private String obtenerExtension(String nombreOriginal, String contentType) {
        if (nombreOriginal != null) {
            String nombre = nombreOriginal.toLowerCase();

            if (nombre.endsWith(".png")) {
                return ".png";
            }

            if (nombre.endsWith(".webp")) {
                return ".webp";
            }

            if (nombre.endsWith(".jpeg")) {
                return ".jpeg";
            }

            if (nombre.endsWith(".jpg")) {
                return ".jpg";
            }
        }

        if ("image/png".equals(contentType)) {
            return ".png";
        }

        if ("image/webp".equals(contentType)) {
            return ".webp";
        }

        return ".jpg";
    }

    private PlantaUsuario buscarPlantaUsuario(Long idPlantaUsuario) {
        if (idPlantaUsuario == null) {
            throw new RecursoNoEncontradoException("Planta de usuario no encontrada");
        }

        Optional<PlantaUsuario> plantaUsuario = plantaUsuarioRepository.findById(idPlantaUsuario);

        if (plantaUsuario.isPresent()) {
            return plantaUsuario.get();
        }

        throw new RecursoNoEncontradoException("Planta de usuario no encontrada");
    }
}
