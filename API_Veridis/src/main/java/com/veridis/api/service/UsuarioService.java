package com.veridis.api.service;

import com.veridis.api.exception.DatoDuplicadoException;
import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Localizacion;
import com.veridis.api.model.Usuario;
import com.veridis.api.repository.LocalizacionRepository;
import com.veridis.api.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final LocalizacionRepository localizacionRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, LocalizacionRepository localizacionRepository) {
        this.usuarioRepository = usuarioRepository;
        this.localizacionRepository = localizacionRepository;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isPresent()) {
            return usuario.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Usuario no encontrado");
    }

    public Usuario crear(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new DatoDuplicadoException("Ya existe un usuario con ese email");
        }

        usuario.setIdUsuario(null);
        usuario.setLocalizacionDefault(prepararLocalizacion(usuario.getLocalizacionDefault()));

        if (usuario.getFechaRegistro() == null) {
            usuario.setFechaRegistro(LocalDateTime.now());
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario datos) {
        Usuario usuario = buscarPorId(id);

        comprobarEmailDisponible(datos.getEmail(), id);

        usuario.setNombre(datos.getNombre());
        usuario.setEmail(datos.getEmail());
        usuario.setContrasena(datos.getContrasena());
        usuario.setLocalizacionDefault(prepararLocalizacion(datos.getLocalizacionDefault()));

        return usuarioRepository.save(usuario);
    }

    public void borrar(Long id) {
        Usuario usuario = buscarPorId(id);
        usuarioRepository.delete(usuario);
    }

    private void comprobarEmailDisponible(String email, Long idUsuarioActual) {
        Optional<Usuario> usuarioConEmail = usuarioRepository.findByEmail(email);

        if (usuarioConEmail.isPresent() && !usuarioConEmail.get().getIdUsuario().equals(idUsuarioActual)) {
            throw new DatoDuplicadoException("Ya existe un usuario con ese email");
        }
    }

    private Localizacion prepararLocalizacion(Localizacion localizacion) {
        if (localizacion == null || localizacion.getIdLocalizacion() == null) {
            return null;
        }

        Optional<Localizacion> localizacionEncontrada = localizacionRepository.findById(localizacion.getIdLocalizacion());

        if (localizacionEncontrada.isPresent()) {
            return localizacionEncontrada.get();
        }

        throw new RecursoNoEncontradoException("Localización no encontrada");
    }
}
