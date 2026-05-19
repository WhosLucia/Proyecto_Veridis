package com.veridis.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "HISTORIAL_CUIDADO")
public class HistorialCuidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Long idHistorial;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_usuario_planta")
    private PlantaUsuario plantaUsuario;

    @Column(name = "tipo_cuidado")
    private String tipoCuidado;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "notas")
    private String notas;

    // Constructor vacío necesario para JPA
    public HistorialCuidado() {
    }

    public Long getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Long idHistorial) {
        this.idHistorial = idHistorial;
    }

    public PlantaUsuario getPlantaUsuario() {
        return plantaUsuario;
    }

    public void setPlantaUsuario(PlantaUsuario plantaUsuario) {
        this.plantaUsuario = plantaUsuario;
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
