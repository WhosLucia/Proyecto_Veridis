package com.veridis.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "email")
    private String email;

    @Column(name = "contrasena")
    private String contrasena;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "id_localizacion_default")
    private Localizacion localizacionDefault;

    @OneToOne(mappedBy = "usuario")
    @JsonIgnore
    private ConfigUsuario configUsuario;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private List<Ubicacion> ubicaciones;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private List<PlantaUsuario> plantasUsuario;

    // Constructor vacío necesario para JPA
    public Usuario() {
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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
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

    public ConfigUsuario getConfigUsuario() {
        return configUsuario;
    }

    public void setConfigUsuario(ConfigUsuario configUsuario) {
        this.configUsuario = configUsuario;
    }

    public List<Ubicacion> getUbicaciones() {
        return ubicaciones;
    }

    public void setUbicaciones(List<Ubicacion> ubicaciones) {
        this.ubicaciones = ubicaciones;
    }

    public List<PlantaUsuario> getPlantasUsuario() {
        return plantasUsuario;
    }

    public void setPlantasUsuario(List<PlantaUsuario> plantasUsuario) {
        this.plantasUsuario = plantasUsuario;
    }
}
