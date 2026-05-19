package com.veridis.api.controller;

import com.veridis.api.model.Ubicacion;
import com.veridis.api.service.UbicacionService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ubicaciones")
public class UbicacionController {

    private final UbicacionService ubicacionService;

    public UbicacionController(UbicacionService ubicacionService) {
        this.ubicacionService = ubicacionService;
    }

    @GetMapping
    public List<Ubicacion> listarTodas() {
        return ubicacionService.listarTodas();
    }

    @GetMapping("/{id}")
    public Ubicacion buscarPorId(@PathVariable Long id) {
        return ubicacionService.buscarPorId(id);
    }

    @PostMapping
    public Ubicacion crear(@RequestBody Ubicacion ubicacion) {
        return ubicacionService.crear(ubicacion);
    }

    @PutMapping("/{id}")
    public Ubicacion actualizar(@PathVariable Long id, @RequestBody Ubicacion ubicacion) {
        return ubicacionService.actualizar(id, ubicacion);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        ubicacionService.borrar(id);
    }
}
