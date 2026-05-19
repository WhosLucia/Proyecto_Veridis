package com.veridis.api.model;

import java.time.LocalDateTime;

public class FotoPlantaRequest {

    private Long idUsuarioPlanta;
    private String urlImagen;
    private String descripcion;
    private LocalDateTime fecha;

    public Long getIdUsuarioPlanta() {
        return idUsuarioPlanta;
    }

    public void setIdUsuarioPlanta(Long idUsuarioPlanta) {
        this.idUsuarioPlanta = idUsuarioPlanta;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
