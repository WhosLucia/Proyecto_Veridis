package com.veridis.api.controller;

import com.veridis.api.model.PlantaUsuario;
import com.veridis.api.model.PlantaUsuarioRequest;
import com.veridis.api.service.PlantaUsuarioService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlantaUsuarioController {

    private final PlantaUsuarioService plantaUsuarioService;

    public PlantaUsuarioController(PlantaUsuarioService plantaUsuarioService) {
        this.plantaUsuarioService = plantaUsuarioService;
    }

    @GetMapping("/api/plantas-usuario")
    public List<PlantaUsuario> listarTodas() {
        return plantaUsuarioService.listarTodas();
    }

    @GetMapping("/api/plantas-usuario/{id}")
    public PlantaUsuario buscarPorId(@PathVariable Long id) {
        return plantaUsuarioService.buscarPorId(id);
    }

    @GetMapping("/api/usuarios/{idUsuario}/plantas")
    public List<PlantaUsuario> listarPorUsuario(@PathVariable Long idUsuario) {
        return plantaUsuarioService.listarPorUsuario(idUsuario);
    }

    @GetMapping("/api/ubicaciones/{idUbicacion}/plantas")
    public List<PlantaUsuario> listarPorUbicacion(@PathVariable Long idUbicacion) {
        return plantaUsuarioService.listarPorUbicacion(idUbicacion);
    }

    @PostMapping("/api/plantas-usuario")
    public PlantaUsuario crear(@RequestBody PlantaUsuarioRequest request) {
        return plantaUsuarioService.crear(request);
    }

    @PutMapping("/api/plantas-usuario/{id}")
    public PlantaUsuario actualizar(@PathVariable Long id, @RequestBody PlantaUsuarioRequest request) {
        return plantaUsuarioService.actualizar(id, request);
    }

    @DeleteMapping("/api/plantas-usuario/{id}")
    public void borrar(@PathVariable Long id) {
        plantaUsuarioService.borrar(id);
    }
}
