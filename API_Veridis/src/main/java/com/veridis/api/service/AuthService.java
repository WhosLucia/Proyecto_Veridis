package com.veridis.api.service;

import com.veridis.api.exception.DatoDuplicadoException;
import com.veridis.api.exception.DatosInvalidosException;
import com.veridis.api.model.AuthResponse;
import com.veridis.api.model.ConfigUsuario;
import com.veridis.api.model.LoginRequest;
import com.veridis.api.model.Localizacion;
import com.veridis.api.model.RegistroRequest;
import com.veridis.api.model.Usuario;
import com.veridis.api.repository.ConfigUsuarioRepository;
import com.veridis.api.repository.LocalizacionRepository;
import com.veridis.api.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final ConfigUsuarioRepository configUsuarioRepository;
    private final LocalizacionRepository localizacionRepository;

    public AuthService(UsuarioRepository usuarioRepository, ConfigUsuarioRepository configUsuarioRepository,
            LocalizacionRepository localizacionRepository) {
        this.usuarioRepository = usuarioRepository;
        this.configUsuarioRepository = configUsuarioRepository;
        this.localizacionRepository = localizacionRepository;
    }

    public AuthResponse registrar(RegistroRequest request) {
        validarRegistro(request);

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new DatoDuplicadoException("El email ya existe");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setContrasena(request.getContrasena());
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setLocalizacionDefault(buscarLocalizacion(request.getIdLocalizacionDefault()));

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        ConfigUsuario configUsuario = new ConfigUsuario();
        configUsuario.setUsuario(usuarioGuardado);
        configUsuario.setTema("sistema");
        configUsuario.setIdioma("es");
        configUsuario.setNotificaciones(true);
        configUsuarioRepository.save(configUsuario);

        return crearRespuesta(usuarioGuardado);
    }

    public AuthResponse login(LoginRequest request) {
        validarLogin(request);

        Optional<Usuario> usuario = usuarioRepository.findByEmail(request.getEmail());

        if (usuario.isEmpty()) {
            throw new DatosInvalidosException("Email o contrasena incorrectos");
        }

        // Login basico para prototipo de clase
        if (!usuario.get().getContrasena().equals(request.getContrasena())) {
            throw new DatosInvalidosException("Email o contrasena incorrectos");
        }

        return crearRespuesta(usuario.get());
    }

    private void validarRegistro(RegistroRequest request) {
        if (request.getNombre() == null || request.getNombre().isBlank()) {
            throw new DatosInvalidosException("El nombre es obligatorio");
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new DatosInvalidosException("El email es obligatorio");
        }

        if (request.getContrasena() == null || request.getContrasena().isBlank()) {
            throw new DatosInvalidosException("La contrasena es obligatoria");
        }

        if (request.getIdLocalizacionDefault() == null) {
            throw new DatosInvalidosException("La localizacion principal es obligatoria");
        }
    }

    private void validarLogin(LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new DatosInvalidosException("El email es obligatorio");
        }

        if (request.getContrasena() == null || request.getContrasena().isBlank()) {
            throw new DatosInvalidosException("La contrasena es obligatoria");
        }
    }

    private AuthResponse crearRespuesta(Usuario usuario) {
        return new AuthResponse(usuario.getIdUsuario(), usuario.getNombre(), usuario.getEmail(),
                usuario.getFechaRegistro(),
                usuario.getLocalizacionDefault());
    }

    private Localizacion buscarLocalizacion(Long idLocalizacion) {
        return localizacionRepository.findById(idLocalizacion)
                .orElseThrow(() -> new DatosInvalidosException("Localizacion no encontrada"));
    }
}
