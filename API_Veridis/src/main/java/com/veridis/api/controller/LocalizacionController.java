package com.veridis.api.controller;

import com.veridis.api.model.Localizacion;
import com.veridis.api.service.LocalizacionService;
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
@RequestMapping("/api/localizaciones")
public class LocalizacionController {

    private final LocalizacionService localizacionService;

    public LocalizacionController(LocalizacionService localizacionService) {
        this.localizacionService = localizacionService;
    }

    @GetMapping
    public List<Localizacion> listarTodas() {
        return localizacionService.listarTodas();
    }

    @GetMapping("/{id}")
    public Localizacion buscarPorId(@PathVariable Long id) {
        return localizacionService.buscarPorId(id);
    }

    @PostMapping
    public Localizacion crear(@RequestBody Localizacion localizacion) {
        return localizacionService.crear(localizacion);
    }

    @PutMapping("/{id}")
    public Localizacion actualizar(@PathVariable Long id, @RequestBody Localizacion localizacion) {
        return localizacionService.actualizar(id, localizacion);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        localizacionService.borrar(id);
    }
}
