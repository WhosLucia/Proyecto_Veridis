package com.veridis.api.model;

public class RegistroRequest {

    private String nombre;
    private String email;
    private String contrasena;
    private Long idLocalizacionDefault;

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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public Long getIdLocalizacionDefault() {
        return idLocalizacionDefault;
    }

    public void setIdLocalizacionDefault(Long idLocalizacionDefault) {
        this.idLocalizacionDefault = idLocalizacionDefault;
    }
}
