package com.veridis.api.controller;

import com.veridis.api.model.ConfigUsuario;
import com.veridis.api.model.Ubicacion;
import com.veridis.api.model.Usuario;
import com.veridis.api.service.ConfigUsuarioService;
import com.veridis.api.service.UbicacionService;
import com.veridis.api.service.UsuarioService;
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
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UbicacionService ubicacionService;
    private final ConfigUsuarioService configUsuarioService;

    public UsuarioController(UsuarioService usuarioService, UbicacionService ubicacionService,
            ConfigUsuarioService configUsuarioService) {
        this.usuarioService = usuarioService;
        this.ubicacionService = ubicacionService;
        this.configUsuarioService = configUsuarioService;
    }

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return usuarioService.crear(usuario);
    }

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        usuarioService.borrar(id);
    }

    @GetMapping("/{idUsuario}/ubicaciones")
    public List<Ubicacion> listarUbicaciones(@PathVariable Long idUsuario) {
        return ubicacionService.listarPorUsuario(idUsuario);
    }

    @GetMapping("/{idUsuario}/config")
    public ConfigUsuario buscarConfig(@PathVariable Long idUsuario) {
        return configUsuarioService.buscarPorUsuario(idUsuario);
    }

    @PutMapping("/{idUsuario}/config")
    public ConfigUsuario guardarConfig(@PathVariable Long idUsuario, @RequestBody ConfigUsuario configUsuario) {
        return configUsuarioService.guardarConfig(idUsuario, configUsuario);
    }
}
