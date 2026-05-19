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

@Entity
@Table(name = "RECOMENDACION_SINTOMA")
public class RecomendacionSintoma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recomendacion")
    private Long idRecomendacion;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_sintoma")
    private Sintoma sintoma;

    @ManyToOne
    @JoinColumn(name = "id_planta")
    private Planta planta;

    @Column(name = "posible_causa")
    private String posibleCausa;

    @Column(name = "recomendacion")
    private String recomendacion;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "prioridad")
    private String prioridad;

    // Constructor vacío necesario para JPA
    public RecomendacionSintoma() {
    }

    public Long getIdRecomendacion() {
        return idRecomendacion;
    }

    public void setIdRecomendacion(Long idRecomendacion) {
        this.idRecomendacion = idRecomendacion;
    }

    public Sintoma getSintoma() {
        return sintoma;
    }

    public void setSintoma(Sintoma sintoma) {
        this.sintoma = sintoma;
    }

    public Planta getPlanta() {
        return planta;
    }

    public void setPlanta(Planta planta) {
        this.planta = planta;
    }

    public String getPosibleCausa() {
        return posibleCausa;
    }

    public void setPosibleCausa(String posibleCausa) {
        this.posibleCausa = posibleCausa;
    }

    public String getRecomendacion() {
        return recomendacion;
    }

    public void setRecomendacion(String recomendacion) {
        this.recomendacion = recomendacion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }
}
