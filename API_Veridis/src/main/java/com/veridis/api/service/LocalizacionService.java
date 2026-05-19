package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Localizacion;
import com.veridis.api.repository.LocalizacionRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class LocalizacionService {

    private final LocalizacionRepository localizacionRepository;

    public LocalizacionService(LocalizacionRepository localizacionRepository) {
        this.localizacionRepository = localizacionRepository;
    }

    public List<Localizacion> listarTodas() {
        return localizacionRepository.findAll();
    }

    public Localizacion buscarPorId(Long id) {
        Optional<Localizacion> localizacion = localizacionRepository.findById(id);

        if (localizacion.isPresent()) {
            return localizacion.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Localización no encontrada");
    }

    public Localizacion crear(Localizacion localizacion) {
        if (localizacion.getFechaActualizacion() == null) {
            localizacion.setFechaActualizacion(LocalDateTime.now());
        }

        return localizacionRepository.save(localizacion);
    }

    public Localizacion actualizar(Long id, Localizacion datos) {
        Localizacion localizacion = buscarPorId(id);

        localizacion.setCiudad(datos.getCiudad());
        localizacion.setProvincia(datos.getProvincia());
        localizacion.setPais(datos.getPais());
        localizacion.setLatitud(datos.getLatitud());
        localizacion.setLongitud(datos.getLongitud());
        localizacion.setFechaActualizacion(LocalDateTime.now());

        return localizacionRepository.save(localizacion);
    }

    public void borrar(Long id) {
        Localizacion localizacion = buscarPorId(id);
        localizacionRepository.delete(localizacion);
    }
}
