package com.veridis.api.controller;

import com.veridis.api.model.Planta;
import com.veridis.api.service.PlantaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plantas")
public class PlantaController {

    private final PlantaService plantaService;

    public PlantaController(PlantaService plantaService) {
        this.plantaService = plantaService;
    }

    @GetMapping
    public List<Planta> listarTodas() {
        return plantaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Planta buscarPorId(@PathVariable Long id) {
        return plantaService.buscarPorId(id);
    }

    @GetMapping("/buscar")
    public List<Planta> buscarPorTexto(@RequestParam String texto) {
        return plantaService.buscarPorTexto(texto);
    }

    @GetMapping("/tipo/{tipo}")
    public List<Planta> buscarPorTipo(@PathVariable String tipo) {
        return plantaService.buscarPorTipo(tipo);
    }

    @GetMapping("/luz/{luz}")
    public List<Planta> buscarPorLuz(@PathVariable String luz) {
        return plantaService.buscarPorLuz(luz);
    }

    @GetMapping("/familia/{idFamilia}")
    public List<Planta> buscarPorFamilia(@PathVariable Long idFamilia) {
        return plantaService.buscarPorFamilia(idFamilia);
    }
}
