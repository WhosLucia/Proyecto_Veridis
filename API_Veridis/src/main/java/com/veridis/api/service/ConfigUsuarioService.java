package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.ConfigUsuario;
import com.veridis.api.model.Usuario;
import com.veridis.api.repository.ConfigUsuarioRepository;
import com.veridis.api.repository.UsuarioRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ConfigUsuarioService {

    private final ConfigUsuarioRepository configUsuarioRepository;
    private final UsuarioRepository usuarioRepository;

    public ConfigUsuarioService(ConfigUsuarioRepository configUsuarioRepository, UsuarioRepository usuarioRepository) {
        this.configUsuarioRepository = configUsuarioRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public ConfigUsuario buscarPorUsuario(Long idUsuario) {
        buscarUsuario(idUsuario);
        Optional<ConfigUsuario> config = configUsuarioRepository.findByUsuario_IdUsuario(idUsuario);

        if (config.isPresent()) {
            return config.get();
        }

        throw new RecursoNoEncontradoException("Configuración de usuario no encontrada");
    }

    public ConfigUsuario guardarConfig(Long idUsuario, ConfigUsuario datos) {
        Usuario usuario = buscarUsuario(idUsuario);
        Optional<ConfigUsuario> configEncontrada = configUsuarioRepository.findByUsuario_IdUsuario(idUsuario);
        ConfigUsuario config;

        if (configEncontrada.isPresent()) {
            config = configEncontrada.get();
        } else {
            config = new ConfigUsuario();
            config.setUsuario(usuario);
        }

        config.setTema(datos.getTema());
        config.setIdioma(datos.getIdioma());
        config.setNotificaciones(datos.getNotificaciones());
        ponerValoresPorDefecto(config);

        return configUsuarioRepository.save(config);
    }

    private Usuario buscarUsuario(Long idUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

        if (usuario.isPresent()) {
            return usuario.get();
        }

        throw new RecursoNoEncontradoException("Usuario no encontrado");
    }

    private void ponerValoresPorDefecto(ConfigUsuario config) {
        if (config.getTema() == null) {
            config.setTema("sistema");
        }

        if (config.getIdioma() == null) {
            config.setIdioma("es");
        }

        if (config.getNotificaciones() == null) {
            config.setNotificaciones(true);
        }
    }
}
