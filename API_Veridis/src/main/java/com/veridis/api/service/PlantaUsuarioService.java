package com.veridis.api.service;

import com.veridis.api.exception.DatosInvalidosException;
import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Planta;
import com.veridis.api.model.PlantaUsuarioRequest;
import com.veridis.api.model.PlantaUsuario;
import com.veridis.api.model.Ubicacion;
import com.veridis.api.model.Usuario;
import com.veridis.api.repository.PlantaRepository;
import com.veridis.api.repository.PlantaUsuarioRepository;
import com.veridis.api.repository.UbicacionRepository;
import com.veridis.api.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class PlantaUsuarioService {

    private final PlantaUsuarioRepository plantaUsuarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final PlantaRepository plantaRepository;
    private final UbicacionRepository ubicacionRepository;

    public PlantaUsuarioService(PlantaUsuarioRepository plantaUsuarioRepository, UsuarioRepository usuarioRepository,
            PlantaRepository plantaRepository, UbicacionRepository ubicacionRepository) {
        this.plantaUsuarioRepository = plantaUsuarioRepository;
        this.usuarioRepository = usuarioRepository;
        this.plantaRepository = plantaRepository;
        this.ubicacionRepository = ubicacionRepository;
    }

    public List<PlantaUsuario> listarTodas() {
        return plantaUsuarioRepository.findAll();
    }

    public PlantaUsuario buscarPorId(Long id) {
        Optional<PlantaUsuario> plantaUsuario = plantaUsuarioRepository.findById(id);

        if (plantaUsuario.isPresent()) {
            return plantaUsuario.get();
        }

        // Si no existe, lanzo una excepcion simple
        throw new RecursoNoEncontradoException("Planta de usuario no encontrada");
    }

    public List<PlantaUsuario> listarPorUsuario(Long idUsuario) {
        buscarUsuario(idUsuario);
        return plantaUsuarioRepository.findByUsuario_IdUsuario(idUsuario);
    }

    public List<PlantaUsuario> listarPorUbicacion(Long idUbicacion) {
        buscarUbicacion(idUbicacion);
        return plantaUsuarioRepository.findByUbicacion_IdUbicacion(idUbicacion);
    }

    public PlantaUsuario crear(PlantaUsuarioRequest request) {
        validarEstadoSalud(request.getEstadoSalud());

        PlantaUsuario plantaUsuario = new PlantaUsuario();
        plantaUsuario.setUsuario(buscarUsuario(request.getIdUsuario()));
        plantaUsuario.setPlanta(buscarPlanta(request.getIdPlanta()));
        plantaUsuario.setUbicacion(prepararUbicacion(request.getIdUbicacion()));
        plantaUsuario.setNombrePersonalizado(request.getNombrePersonalizado());
        plantaUsuario.setNotas(request.getNotas());
        plantaUsuario.setFechaAdquisicion(request.getFechaAdquisicion());
        plantaUsuario.setEstadoSalud(request.getEstadoSalud());

        return plantaUsuarioRepository.save(plantaUsuario);
    }

    public PlantaUsuario actualizar(Long id, PlantaUsuarioRequest request) {
        validarEstadoSalud(request.getEstadoSalud());

        PlantaUsuario plantaUsuario = buscarPorId(id);
        plantaUsuario.setUsuario(buscarUsuario(request.getIdUsuario()));
        plantaUsuario.setPlanta(buscarPlanta(request.getIdPlanta()));
        plantaUsuario.setUbicacion(prepararUbicacion(request.getIdUbicacion()));
        plantaUsuario.setNombrePersonalizado(request.getNombrePersonalizado());
        plantaUsuario.setNotas(request.getNotas());
        plantaUsuario.setFechaAdquisicion(request.getFechaAdquisicion());
        plantaUsuario.setEstadoSalud(request.getEstadoSalud());

        return plantaUsuarioRepository.save(plantaUsuario);
    }

    public void borrar(Long id) {
        PlantaUsuario plantaUsuario = buscarPorId(id);
        plantaUsuarioRepository.delete(plantaUsuario);
    }

    private Usuario buscarUsuario(Long idUsuario) {
        if (idUsuario == null) {
            throw new RecursoNoEncontradoException("Usuario no encontrado");
        }

        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

        if (usuario.isPresent()) {
            return usuario.get();
        }

        throw new RecursoNoEncontradoException("Usuario no encontrado");
    }

    private Planta buscarPlanta(Long idPlanta) {
        if (idPlanta == null) {
            throw new RecursoNoEncontradoException("Planta no encontrada");
        }

        Optional<Planta> planta = plantaRepository.findById(idPlanta);

        if (planta.isPresent()) {
            return planta.get();
        }

        throw new RecursoNoEncontradoException("Planta no encontrada");
    }

    private Ubicacion buscarUbicacion(Long idUbicacion) {
        if (idUbicacion == null) {
            throw new RecursoNoEncontradoException("Ubicacion no encontrada");
        }

        Optional<Ubicacion> ubicacion = ubicacionRepository.findById(idUbicacion);

        if (ubicacion.isPresent()) {
            return ubicacion.get();
        }

        throw new RecursoNoEncontradoException("Ubicacion no encontrada");
    }

    private Ubicacion prepararUbicacion(Long idUbicacion) {
        if (idUbicacion == null) {
            return null;
        }

        return buscarUbicacion(idUbicacion);
    }

    private void validarEstadoSalud(String estadoSalud) {
        if (estadoSalud == null || estadoSalud.trim().isEmpty()) {
            throw new DatosInvalidosException("El estado de salud no puede estar vacio");
        }
    }
}
