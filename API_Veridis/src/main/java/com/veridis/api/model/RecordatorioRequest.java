package com.veridis.api.model;

import java.time.LocalDate;

public class RecordatorioRequest {

    private Long idUsuarioPlanta;
    private String tipo;
    private Integer frecuencia;
    private Boolean activo;
    private LocalDate fechaProximo;
    private String notificationId;

    public Long getIdUsuarioPlanta() {
        return idUsuarioPlanta;
    }

    public void setIdUsuarioPlanta(Long idUsuarioPlanta) {
        this.idUsuarioPlanta = idUsuarioPlanta;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(Integer frecuencia) {
        this.frecuencia = frecuencia;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public LocalDate getFechaProximo() {
        return fechaProximo;
    }

    public void setFechaProximo(LocalDate fechaProximo) {
        this.fechaProximo = fechaProximo;
    }

    public String getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }
}
