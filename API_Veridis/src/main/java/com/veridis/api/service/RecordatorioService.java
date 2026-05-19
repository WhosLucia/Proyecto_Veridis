package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.PlantaUsuario;
import com.veridis.api.model.Recordatorio;
import com.veridis.api.model.RecordatorioRequest;
import com.veridis.api.repository.PlantaUsuarioRepository;
import com.veridis.api.repository.RecordatorioRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class RecordatorioService {

    private final RecordatorioRepository recordatorioRepository;
    private final PlantaUsuarioRepository plantaUsuarioRepository;

    public RecordatorioService(RecordatorioRepository recordatorioRepository,
            PlantaUsuarioRepository plantaUsuarioRepository) {
        this.recordatorioRepository = recordatorioRepository;
        this.plantaUsuarioRepository = plantaUsuarioRepository;
    }

    public List<Recordatorio> listarTodos() {
        return recordatorioRepository.findAll();
    }

    public Recordatorio buscarPorId(Long id) {
        Optional<Recordatorio> recordatorio = recordatorioRepository.findById(id);

        if (recordatorio.isPresent()) {
            return recordatorio.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Recordatorio no encontrado");
    }

    public List<Recordatorio> listarPorPlantaUsuario(Long idPlantaUsuario) {
        buscarPlantaUsuario(idPlantaUsuario);
        return recordatorioRepository.findByPlantaUsuario_IdUsuarioPlanta(idPlantaUsuario);
    }

    public List<Recordatorio> listarActivos() {
        return recordatorioRepository.findByActivo(true);
    }

    public Recordatorio crear(RecordatorioRequest request) {
        Recordatorio recordatorio = new Recordatorio();
        copiarDatos(recordatorio, request);
        return recordatorioRepository.save(recordatorio);
    }

    public Recordatorio actualizar(Long id, RecordatorioRequest request) {
        Recordatorio recordatorio = buscarPorId(id);
        copiarDatos(recordatorio, request);
        return recordatorioRepository.save(recordatorio);
    }

    public void borrar(Long id) {
        Recordatorio recordatorio = buscarPorId(id);
        recordatorioRepository.delete(recordatorio);
    }

    private void copiarDatos(Recordatorio recordatorio, RecordatorioRequest request) {
        recordatorio.setPlantaUsuario(buscarPlantaUsuario(request.getIdUsuarioPlanta()));
        recordatorio.setTipo(request.getTipo());
        recordatorio.setFrecuencia(request.getFrecuencia());
        recordatorio.setActivo(request.getActivo());
        recordatorio.setFechaProximo(request.getFechaProximo());
        recordatorio.setNotificationId(request.getNotificationId());

        if (recordatorio.getFrecuencia() == null) {
            recordatorio.setFrecuencia(7);
        }

        if (recordatorio.getActivo() == null) {
            recordatorio.setActivo(true);
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
