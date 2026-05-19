package com.veridis.api.controller;

import com.veridis.api.model.FamiliaPlanta;
import com.veridis.api.service.FamiliaPlantaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/familias")
public class FamiliaPlantaController {

    private final FamiliaPlantaService familiaPlantaService;

    public FamiliaPlantaController(FamiliaPlantaService familiaPlantaService) {
        this.familiaPlantaService = familiaPlantaService;
    }

    @GetMapping
    public List<FamiliaPlanta> listarTodas() {
        return familiaPlantaService.listarTodas();
    }

    @GetMapping("/{id}")
    public FamiliaPlanta buscarPorId(@PathVariable Long id) {
        return familiaPlantaService.buscarPorId(id);
    }

    @GetMapping("/buscar")
    public List<FamiliaPlanta> buscarPorNombre(@RequestParam String texto) {
        return familiaPlantaService.buscarPorNombre(texto);
    }
}
