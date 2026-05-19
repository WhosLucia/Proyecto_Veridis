package com.veridis.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "SINTOMA")
public class Sintoma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sintoma")
    private Long idSintoma;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "sintoma")
    @JsonIgnore
    private List<RespuestaCuestionario> respuestasCuestionario;

    @OneToMany(mappedBy = "sintoma")
    @JsonIgnore
    private List<RecomendacionSintoma> recomendaciones;

    // Constructor vacío necesario para JPA
    public Sintoma() {
    }

    public Long getIdSintoma() {
        return idSintoma;
    }

    public void setIdSintoma(Long idSintoma) {
        this.idSintoma = idSintoma;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<RespuestaCuestionario> getRespuestasCuestionario() {
        return respuestasCuestionario;
    }

    public void setRespuestasCuestionario(List<RespuestaCuestionario> respuestasCuestionario) {
        this.respuestasCuestionario = respuestasCuestionario;
    }

    public List<RecomendacionSintoma> getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(List<RecomendacionSintoma> recomendaciones) {
        this.recomendaciones = recomendaciones;
    }
}
