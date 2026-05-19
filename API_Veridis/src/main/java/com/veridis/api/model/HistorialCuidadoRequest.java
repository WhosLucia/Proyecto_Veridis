package com.veridis.api.model;

import java.time.LocalDateTime;

public class HistorialCuidadoRequest {

    private Long idUsuarioPlanta;
    private String tipoCuidado;
    private LocalDateTime fecha;
    private String notas;

    public Long getIdUsuarioPlanta() {
        return idUsuarioPlanta;
    }

    public void setIdUsuarioPlanta(Long idUsuarioPlanta) {
        this.idUsuarioPlanta = idUsuarioPlanta;
    }

    public String getTipoCuidado() {
        return tipoCuidado;
    }

    public void setTipoCuidado(String tipoCuidado) {
        this.tipoCuidado = tipoCuidado;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }
}
