package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Localizacion;
import com.veridis.api.model.Ubicacion;
import com.veridis.api.model.Usuario;
import com.veridis.api.repository.LocalizacionRepository;
import com.veridis.api.repository.UbicacionRepository;
import com.veridis.api.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UbicacionService {

    private final UbicacionRepository ubicacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final LocalizacionRepository localizacionRepository;

    public UbicacionService(UbicacionRepository ubicacionRepository, UsuarioRepository usuarioRepository,
            LocalizacionRepository localizacionRepository) {
        this.ubicacionRepository = ubicacionRepository;
        this.usuarioRepository = usuarioRepository;
        this.localizacionRepository = localizacionRepository;
    }

    public List<Ubicacion> listarTodas() {
        return ubicacionRepository.findAll();
    }

    public Ubicacion buscarPorId(Long id) {
        Optional<Ubicacion> ubicacion = ubicacionRepository.findById(id);

        if (ubicacion.isPresent()) {
            return ubicacion.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Ubicación no encontrada");
    }

    public List<Ubicacion> listarPorUsuario(Long idUsuario) {
        buscarUsuario(idUsuario);
        return ubicacionRepository.findByUsuario_IdUsuario(idUsuario);
    }

    public Ubicacion crear(Ubicacion ubicacion) {
        ubicacion.setIdUbicacion(null);
        prepararRelaciones(ubicacion);
        ponerValoresPorDefecto(ubicacion);

        return ubicacionRepository.save(ubicacion);
    }

    public Ubicacion actualizar(Long id, Ubicacion datos) {
        Ubicacion ubicacion = buscarPorId(id);

        ubicacion.setUsuario(datos.getUsuario());
        ubicacion.setLocalizacion(datos.getLocalizacion());
        prepararRelaciones(ubicacion);

        ubicacion.setNombre(datos.getNombre());
        ubicacion.setDescripcion(datos.getDescripcion());
        ubicacion.setLuz(datos.getLuz());
        ubicacion.setHumedad(datos.getHumedad());
        ubicacion.setEsExterior(datos.getEsExterior());
        ponerValoresPorDefecto(ubicacion);

        return ubicacionRepository.save(ubicacion);
    }

    public void borrar(Long id) {
        Ubicacion ubicacion = buscarPorId(id);
        ubicacionRepository.delete(ubicacion);
    }

    private void prepararRelaciones(Ubicacion ubicacion) {
        if (ubicacion.getUsuario() == null || ubicacion.getUsuario().getIdUsuario() == null) {
            throw new RecursoNoEncontradoException("Usuario no encontrado");
        }

        Usuario usuario = buscarUsuario(ubicacion.getUsuario().getIdUsuario());
        ubicacion.setUsuario(usuario);

        if (ubicacion.getLocalizacion() != null && ubicacion.getLocalizacion().getIdLocalizacion() != null) {
            Localizacion localizacion = buscarLocalizacion(ubicacion.getLocalizacion().getIdLocalizacion());
            ubicacion.setLocalizacion(localizacion);
        } else {
            ubicacion.setLocalizacion(null);
        }
    }

    private Usuario buscarUsuario(Long idUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

        if (usuario.isPresent()) {
            return usuario.get();
        }

        throw new RecursoNoEncontradoException("Usuario no encontrado");
    }

    private Localizacion buscarLocalizacion(Long idLocalizacion) {
        Optional<Localizacion> localizacion = localizacionRepository.findById(idLocalizacion);

        if (localizacion.isPresent()) {
            return localizacion.get();
        }

        throw new RecursoNoEncontradoException("Localización no encontrada");
    }

    private void ponerValoresPorDefecto(Ubicacion ubicacion) {
        if (ubicacion.getLuz() == null) {
            ubicacion.setLuz("luz_indirecta");
        }

        if (ubicacion.getHumedad() == null) {
            ubicacion.setHumedad("media");
        }

        if (ubicacion.getEsExterior() == null) {
            ubicacion.setEsExterior(false);
        }
    }
}
