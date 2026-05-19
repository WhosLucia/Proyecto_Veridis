package com.veridis.api.controller;

import com.veridis.api.model.Sintoma;
import com.veridis.api.service.SintomaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sintomas")
public class SintomaController {

    private final SintomaService sintomaService;

    public SintomaController(SintomaService sintomaService) {
        this.sintomaService = sintomaService;
    }

    @GetMapping
    public List<Sintoma> listarTodos() {
        return sintomaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Sintoma buscarPorId(@PathVariable Long id) {
        return sintomaService.buscarPorId(id);
    }

    @GetMapping("/buscar")
    public List<Sintoma> buscarPorNombre(@RequestParam String texto) {
        return sintomaService.buscarPorNombre(texto);
    }
}
