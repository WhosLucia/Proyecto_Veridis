package com.veridis.api.controller;

import com.veridis.api.model.RespuestaCuestionario;
import com.veridis.api.model.RespuestaCuestionarioRequest;
import com.veridis.api.service.RespuestaCuestionarioService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RespuestaCuestionarioController {

    private final RespuestaCuestionarioService respuestaCuestionarioService;

    public RespuestaCuestionarioController(RespuestaCuestionarioService respuestaCuestionarioService) {
        this.respuestaCuestionarioService = respuestaCuestionarioService;
    }

    @GetMapping("/api/respuestas-cuestionario")
    public List<RespuestaCuestionario> listarTodas() {
        return respuestaCuestionarioService.listarTodas();
    }

    @GetMapping("/api/respuestas-cuestionario/{id}")
    public RespuestaCuestionario buscarPorId(@PathVariable Long id) {
        return respuestaCuestionarioService.buscarPorId(id);
    }

    @GetMapping("/api/cuestionarios/{idCuestionario}/respuestas")
    public List<RespuestaCuestionario> listarPorCuestionario(@PathVariable Long idCuestionario) {
        return respuestaCuestionarioService.listarPorCuestionario(idCuestionario);
    }

    @PostMapping("/api/respuestas-cuestionario")
    public RespuestaCuestionario crear(@RequestBody RespuestaCuestionarioRequest request) {
        return respuestaCuestionarioService.crear(request);
    }

    @DeleteMapping("/api/respuestas-cuestionario/{id}")
    public void borrar(@PathVariable Long id) {
        respuestaCuestionarioService.borrar(id);
    }
}
