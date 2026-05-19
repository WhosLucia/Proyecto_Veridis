package com.veridis.api.controller;

import com.veridis.api.model.RecomendacionSintoma;
import com.veridis.api.model.RecomendacionSintomaRequest;
import com.veridis.api.service.RecomendacionSintomaService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecomendacionSintomaController {

    private final RecomendacionSintomaService recomendacionSintomaService;

    public RecomendacionSintomaController(RecomendacionSintomaService recomendacionSintomaService) {
        this.recomendacionSintomaService = recomendacionSintomaService;
    }

    @GetMapping("/api/recomendaciones")
    public List<RecomendacionSintoma> listarTodas() {
        return recomendacionSintomaService.listarTodas();
    }

    @GetMapping("/api/recomendaciones/buscar")
    public List<RecomendacionSintoma> buscarPorSintomaYPlanta(@RequestParam Long idSintoma,
            @RequestParam Long idPlanta) {
        return recomendacionSintomaService.buscarPorSintomaYPlanta(idSintoma, idPlanta);
    }

    @GetMapping("/api/recomendaciones/{id}")
    public RecomendacionSintoma buscarPorId(@PathVariable Long id) {
        return recomendacionSintomaService.buscarPorId(id);
    }

    @GetMapping("/api/sintomas/{idSintoma}/recomendaciones")
    public List<RecomendacionSintoma> listarPorSintoma(@PathVariable Long idSintoma) {
        return recomendacionSintomaService.listarPorSintoma(idSintoma);
    }

    @GetMapping("/api/plantas/{idPlanta}/recomendaciones")
    public List<RecomendacionSintoma> listarPorPlanta(@PathVariable Long idPlanta) {
        return recomendacionSintomaService.listarPorPlanta(idPlanta);
    }

    @PostMapping("/api/recomendaciones")
    public RecomendacionSintoma crear(@RequestBody RecomendacionSintomaRequest request) {
        return recomendacionSintomaService.crear(request);
    }

    @PutMapping("/api/recomendaciones/{id}")
    public RecomendacionSintoma actualizar(@PathVariable Long id, @RequestBody RecomendacionSintomaRequest request) {
        return recomendacionSintomaService.actualizar(id, request);
    }

    @DeleteMapping("/api/recomendaciones/{id}")
    public void borrar(@PathVariable Long id) {
        recomendacionSintomaService.borrar(id);
    }
}
