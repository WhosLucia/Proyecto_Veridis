package com.veridis.api.model;

import java.time.LocalDateTime;

public class AuthResponse {

    private Long idUsuario;
    private String nombre;
    private String email;
    private LocalDateTime fechaRegistro;
    private Localizacion localizacionDefault;

    public AuthResponse() {
    }

    public AuthResponse(Long idUsuario, String nombre, String email, LocalDateTime fechaRegistro,
            Localizacion localizacionDefault) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.fechaRegistro = fechaRegistro;
        this.localizacionDefault = localizacionDefault;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Localizacion getLocalizacionDefault() {
        return localizacionDefault;
    }

    public void setLocalizacionDefault(Localizacion localizacionDefault) {
        this.localizacionDefault = localizacionDefault;
    }
}
