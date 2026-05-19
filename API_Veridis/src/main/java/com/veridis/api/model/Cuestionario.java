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
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "CUESTIONARIO")
public class Cuestionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cuestionario")
    private Long idCuestionario;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_usuario_planta")
    private PlantaUsuario plantaUsuario;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "observaciones_usuario")
    private String observacionesUsuario;

    @OneToMany(mappedBy = "cuestionario")
    @JsonIgnore
    private List<RespuestaCuestionario> respuestas;

    // Constructor vacío necesario para JPA
    public Cuestionario() {
    }

    public Long getIdCuestionario() {
        return idCuestionario;
    }

    public void setIdCuestionario(Long idCuestionario) {
        this.idCuestionario = idCuestionario;
    }

    public PlantaUsuario getPlantaUsuario() {
        return plantaUsuario;
    }

    public void setPlantaUsuario(PlantaUsuario plantaUsuario) {
        this.plantaUsuario = plantaUsuario;
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

    public List<RespuestaCuestionario> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<RespuestaCuestionario> respuestas) {
        this.respuestas = respuestas;
    }
}
