package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.HistorialCuidado;
import com.veridis.api.model.HistorialCuidadoRequest;
import com.veridis.api.model.PlantaUsuario;
import com.veridis.api.repository.HistorialCuidadoRepository;
import com.veridis.api.repository.PlantaUsuarioRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class HistorialCuidadoService {

    private final HistorialCuidadoRepository historialCuidadoRepository;
    private final PlantaUsuarioRepository plantaUsuarioRepository;

    public HistorialCuidadoService(HistorialCuidadoRepository historialCuidadoRepository,
            PlantaUsuarioRepository plantaUsuarioRepository) {
        this.historialCuidadoRepository = historialCuidadoRepository;
        this.plantaUsuarioRepository = plantaUsuarioRepository;
    }

    public List<HistorialCuidado> listarTodos() {
        return historialCuidadoRepository.findAll();
    }

    public HistorialCuidado buscarPorId(Long id) {
        Optional<HistorialCuidado> historial = historialCuidadoRepository.findById(id);

        if (historial.isPresent()) {
            return historial.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Historial de cuidado no encontrado");
    }

    public List<HistorialCuidado> listarPorPlantaUsuario(Long idPlantaUsuario) {
        buscarPlantaUsuario(idPlantaUsuario);
        return historialCuidadoRepository.findByPlantaUsuario_IdUsuarioPlanta(idPlantaUsuario);
    }

    public HistorialCuidado crear(HistorialCuidadoRequest request) {
        HistorialCuidado historial = new HistorialCuidado();
        copiarDatos(historial, request);
        return historialCuidadoRepository.save(historial);
    }

    public HistorialCuidado actualizar(Long id, HistorialCuidadoRequest request) {
        HistorialCuidado historial = buscarPorId(id);
        copiarDatos(historial, request);
        return historialCuidadoRepository.save(historial);
    }

    public void borrar(Long id) {
        HistorialCuidado historial = buscarPorId(id);
        historialCuidadoRepository.delete(historial);
    }

    private void copiarDatos(HistorialCuidado historial, HistorialCuidadoRequest request) {
        historial.setPlantaUsuario(buscarPlantaUsuario(request.getIdUsuarioPlanta()));
        historial.setTipoCuidado(request.getTipoCuidado());
        historial.setNotas(request.getNotas());

        if (request.getFecha() == null) {
            historial.setFecha(LocalDateTime.now());
        } else {
            historial.setFecha(request.getFecha());
        }
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
