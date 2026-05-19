package com.veridis.api.controller;

import com.veridis.api.model.HistorialCuidado;
import com.veridis.api.model.HistorialCuidadoRequest;
import com.veridis.api.service.HistorialCuidadoService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistorialCuidadoController {

    private final HistorialCuidadoService historialCuidadoService;

    public HistorialCuidadoController(HistorialCuidadoService historialCuidadoService) {
        this.historialCuidadoService = historialCuidadoService;
    }

    @GetMapping("/api/historial-cuidados")
    public List<HistorialCuidado> listarTodos() {
        return historialCuidadoService.listarTodos();
    }

    @GetMapping("/api/historial-cuidados/{id}")
    public HistorialCuidado buscarPorId(@PathVariable Long id) {
        return historialCuidadoService.buscarPorId(id);
    }

    @GetMapping("/api/plantas-usuario/{idPlantaUsuario}/historial")
    public List<HistorialCuidado> listarPorPlantaUsuario(@PathVariable Long idPlantaUsuario) {
        return historialCuidadoService.listarPorPlantaUsuario(idPlantaUsuario);
    }

    @PostMapping("/api/historial-cuidados")
    public HistorialCuidado crear(@RequestBody HistorialCuidadoRequest request) {
        return historialCuidadoService.crear(request);
    }

    @PutMapping("/api/historial-cuidados/{id}")
    public HistorialCuidado actualizar(@PathVariable Long id, @RequestBody HistorialCuidadoRequest request) {
        return historialCuidadoService.actualizar(id, request);
    }

    @DeleteMapping("/api/historial-cuidados/{id}")
    public void borrar(@PathVariable Long id) {
        historialCuidadoService.borrar(id);
    }
}
