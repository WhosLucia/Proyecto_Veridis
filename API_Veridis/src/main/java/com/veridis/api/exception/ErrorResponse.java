package com.veridis.api.exception;

import java.time.LocalDateTime;

public class ErrorResponse {

    private String mensaje;
    private Integer estado;
    private LocalDateTime fecha;

    public ErrorResponse() {
    }

    public ErrorResponse(String mensaje, Integer estado, LocalDateTime fecha) {
        this.mensaje = mensaje;
        this.estado = estado;
        this.fecha = fecha;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
