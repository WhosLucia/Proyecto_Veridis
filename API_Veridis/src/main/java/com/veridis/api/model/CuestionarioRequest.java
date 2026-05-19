package com.veridis.api.model;

import java.time.LocalDateTime;

public class CuestionarioRequest {

    private Long idUsuarioPlanta;
    private LocalDateTime fecha;
    private String observacionesUsuario;

    public Long getIdUsuarioPlanta() {
        return idUsuarioPlanta;
    }

    public void setIdUsuarioPlanta(Long idUsuarioPlanta) {
        this.idUsuarioPlanta = idUsuarioPlanta;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getObservacionesUsuario() {
        return observacionesUsuario;
    }

    public void setObservacionesUsuario(String observacionesUsuario) {
        this.observacionesUsuario = observacionesUsuario;
    }
}
