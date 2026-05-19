package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Cuestionario;
import com.veridis.api.model.CuestionarioRequest;
import com.veridis.api.model.PlantaUsuario;
import com.veridis.api.repository.CuestionarioRepository;
import com.veridis.api.repository.PlantaUsuarioRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class CuestionarioService {

    private final CuestionarioRepository cuestionarioRepository;
    private final PlantaUsuarioRepository plantaUsuarioRepository;

    public CuestionarioService(CuestionarioRepository cuestionarioRepository,
            PlantaUsuarioRepository plantaUsuarioRepository) {
        this.cuestionarioRepository = cuestionarioRepository;
        this.plantaUsuarioRepository = plantaUsuarioRepository;
    }

    public List<Cuestionario> listarTodos() {
        return cuestionarioRepository.findAll();
    }

    public Cuestionario buscarPorId(Long id) {
        Optional<Cuestionario> cuestionario = cuestionarioRepository.findById(id);

        if (cuestionario.isPresent()) {
            return cuestionario.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Cuestionario no encontrado");
    }

    public List<Cuestionario> listarPorPlantaUsuario(Long idPlantaUsuario) {
        buscarPlantaUsuario(idPlantaUsuario);
        return cuestionarioRepository.findByPlantaUsuario_IdUsuarioPlanta(idPlantaUsuario);
    }

    public Cuestionario crear(CuestionarioRequest request) {
        Cuestionario cuestionario = new Cuestionario();
        cuestionario.setPlantaUsuario(buscarPlantaUsuario(request.getIdUsuarioPlanta()));
        cuestionario.setObservacionesUsuario(request.getObservacionesUsuario());

        if (request.getFecha() == null) {
            cuestionario.setFecha(LocalDateTime.now());
        } else {
            cuestionario.setFecha(request.getFecha());
        }

        return cuestionarioRepository.save(cuestionario);
    }

    public void borrar(Long id) {
        Cuestionario cuestionario = buscarPorId(id);
        cuestionarioRepository.delete(cuestionario);
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
