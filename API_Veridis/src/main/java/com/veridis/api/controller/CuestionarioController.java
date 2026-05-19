package com.veridis.api.controller;

import com.veridis.api.model.Cuestionario;
import com.veridis.api.model.CuestionarioRequest;
import com.veridis.api.service.CuestionarioService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CuestionarioController {

    private final CuestionarioService cuestionarioService;

    public CuestionarioController(CuestionarioService cuestionarioService) {
        this.cuestionarioService = cuestionarioService;
    }

    @GetMapping("/api/cuestionarios")
    public List<Cuestionario> listarTodos() {
        return cuestionarioService.listarTodos();
    }

    @GetMapping("/api/cuestionarios/{id}")
    public Cuestionario buscarPorId(@PathVariable Long id) {
        return cuestionarioService.buscarPorId(id);
    }

    @GetMapping("/api/plantas-usuario/{idPlantaUsuario}/cuestionarios")
    public List<Cuestionario> listarPorPlantaUsuario(@PathVariable Long idPlantaUsuario) {
        return cuestionarioService.listarPorPlantaUsuario(idPlantaUsuario);
    }

    @PostMapping("/api/cuestionarios")
    public Cuestionario crear(@RequestBody CuestionarioRequest request) {
        return cuestionarioService.crear(request);
    }

    @DeleteMapping("/api/cuestionarios/{id}")
    public void borrar(@PathVariable Long id) {
        cuestionarioService.borrar(id);
    }
}
