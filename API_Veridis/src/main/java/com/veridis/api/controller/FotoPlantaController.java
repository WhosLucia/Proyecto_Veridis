package com.veridis.api.controller;

import com.veridis.api.model.FotoPlanta;
import com.veridis.api.model.FotoPlantaRequest;
import com.veridis.api.service.FotoPlantaService;
import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FotoPlantaController {

    private final FotoPlantaService fotoPlantaService;

    public FotoPlantaController(FotoPlantaService fotoPlantaService) {
        this.fotoPlantaService = fotoPlantaService;
    }

    @GetMapping("/api/fotos")
    public List<FotoPlanta> listarTodas() {
        return fotoPlantaService.listarTodas();
    }

    @GetMapping("/api/fotos/{id}")
    public FotoPlanta buscarPorId(@PathVariable Long id) {
        return fotoPlantaService.buscarPorId(id);
    }

    @GetMapping("/api/plantas-usuario/{idPlantaUsuario}/fotos")
    public List<FotoPlanta> listarPorPlantaUsuario(@PathVariable Long idPlantaUsuario) {
        return fotoPlantaService.listarPorPlantaUsuario(idPlantaUsuario);
    }

    @PostMapping(value = "/api/fotos", consumes = MediaType.APPLICATION_JSON_VALUE)
    public FotoPlanta crear(@RequestBody FotoPlantaRequest request) {
        return fotoPlantaService.crear(request);
    }

    @PostMapping(value = "/api/fotos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public FotoPlanta subirFoto(
            @RequestParam Long idUsuarioPlanta,
            @RequestParam MultipartFile imagen,
            @RequestParam(required = false) String descripcion) throws IOException {
        return fotoPlantaService.crearConArchivo(idUsuarioPlanta, imagen, descripcion);
    }

    @PutMapping("/api/fotos/{id}")
    public FotoPlanta actualizar(@PathVariable Long id, @RequestBody FotoPlantaRequest request) {
        return fotoPlantaService.actualizar(id, request);
    }

    @DeleteMapping("/api/fotos/{id}")
    public void borrar(@PathVariable Long id) {
        fotoPlantaService.borrar(id);
    }
}
