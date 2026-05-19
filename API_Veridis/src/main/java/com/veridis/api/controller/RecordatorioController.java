package com.veridis.api.controller;

import com.veridis.api.model.Recordatorio;
import com.veridis.api.model.RecordatorioRequest;
import com.veridis.api.service.RecordatorioService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecordatorioController {

    private final RecordatorioService recordatorioService;

    public RecordatorioController(RecordatorioService recordatorioService) {
        this.recordatorioService = recordatorioService;
    }

    @GetMapping("/api/recordatorios")
    public List<Recordatorio> listarTodos() {
        return recordatorioService.listarTodos();
    }

    @GetMapping("/api/recordatorios/activos")
    public List<Recordatorio> listarActivos() {
        return recordatorioService.listarActivos();
    }

    @GetMapping("/api/recordatorios/{id}")
    public Recordatorio buscarPorId(@PathVariable Long id) {
        return recordatorioService.buscarPorId(id);
    }

    @GetMapping("/api/plantas-usuario/{idPlantaUsuario}/recordatorios")
    public List<Recordatorio> listarPorPlantaUsuario(@PathVariable Long idPlantaUsuario) {
        return recordatorioService.listarPorPlantaUsuario(idPlantaUsuario);
    }

    @PostMapping("/api/recordatorios")
    public Recordatorio crear(@RequestBody RecordatorioRequest request) {
        return recordatorioService.crear(request);
    }

    @PutMapping("/api/recordatorios/{id}")
    public Recordatorio actualizar(@PathVariable Long id, @RequestBody RecordatorioRequest request) {
        return recordatorioService.actualizar(id, request);
    }

    @DeleteMapping("/api/recordatorios/{id}")
    public void borrar(@PathVariable Long id) {
        recordatorioService.borrar(id);
    }
}
