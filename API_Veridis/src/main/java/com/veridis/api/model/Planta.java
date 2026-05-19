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
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "PLANTA")
public class Planta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_planta")
    private Long idPlanta;

    @ManyToOne
    @JoinColumn(name = "id_familia")
    private FamiliaPlanta familia;

    @Column(name = "nombre_comun")
    private String nombreComun;

    @Column(name = "nombre_cientifico")
    private String nombreCientifico;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "url_img_default")
    private String urlImgDefault;

    @Column(name = "apta_exterior_temp")
    private Boolean aptaExteriorTemp;

    @Column(name = "luz_recomendada")
    private String luzRecomendada;

    @Column(name = "humedad_recomendada")
    private String humedadRecomendada;

    @Column(name = "temp_minima")
    private BigDecimal tempMinima;

    @Column(name = "temp_maxima")
    private BigDecimal tempMaxima;

    @Column(name = "tolerancia_sol")
    private String toleranciaSol;

    @Column(name = "frecuencia_riego")
    private Integer frecuenciaRiego;

    @Column(name = "frecuencia_abono")
    private Integer frecuenciaAbono;

    @OneToMany(mappedBy = "planta")
    @JsonIgnore
    private List<PlantaUsuario> plantasUsuario;

    @OneToMany(mappedBy = "planta")
    @JsonIgnore
    private List<RecomendacionSintoma> recomendaciones;

    // Constructor vacío necesario para JPA
    public Planta() {
    }

    public Long getIdPlanta() {
        return idPlanta;
    }

    public void setIdPlanta(Long idPlanta) {
        this.idPlanta = idPlanta;
    }

    public FamiliaPlanta getFamilia() {
        return familia;
    }

    public void setFamilia(FamiliaPlanta familia) {
        this.familia = familia;
    }

    public String getNombreComun() {
        return nombreComun;
    }

    public void setNombreComun(String nombreComun) {
        this.nombreComun = nombreComun;
    }

    public String getNombreCientifico() {
        return nombreCientifico;
    }

    public void setNombreCientifico(String nombreCientifico) {
        this.nombreCientifico = nombreCientifico;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUrlImgDefault() {
        return urlImgDefault;
    }

    public void setUrlImgDefault(String urlImgDefault) {
        this.urlImgDefault = urlImgDefault;
    }

    public Boolean getAptaExteriorTemp() {
        return aptaExteriorTemp;
    }

    public void setAptaExteriorTemp(Boolean aptaExteriorTemp) {
        this.aptaExteriorTemp = aptaExteriorTemp;
    }

    public String getLuzRecomendada() {
        return luzRecomendada;
    }

    public void setLuzRecomendada(String luzRecomendada) {
        this.luzRecomendada = luzRecomendada;
    }

    public String getHumedadRecomendada() {
        return humedadRecomendada;
    }

    public void setHumedadRecomendada(String humedadRecomendada) {
        this.humedadRecomendada = humedadRecomendada;
    }

    public BigDecimal getTempMinima() {
        return tempMinima;
    }

    public void setTempMinima(BigDecimal tempMinima) {
        this.tempMinima = tempMinima;
    }

    public BigDecimal getTempMaxima() {
        return tempMaxima;
    }

    public void setTempMaxima(BigDecimal tempMaxima) {
        this.tempMaxima = tempMaxima;
    }

    public String getToleranciaSol() {
        return toleranciaSol;
    }

    public void setToleranciaSol(String toleranciaSol) {
        this.toleranciaSol = toleranciaSol;
    }

    public Integer getFrecuenciaRiego() {
        return frecuenciaRiego;
    }

    public void setFrecuenciaRiego(Integer frecuenciaRiego) {
        this.frecuenciaRiego = frecuenciaRiego;
    }

    public Integer getFrecuenciaAbono() {
        return frecuenciaAbono;
    }

    public void setFrecuenciaAbono(Integer frecuenciaAbono) {
        this.frecuenciaAbono = frecuenciaAbono;
    }

    public List<PlantaUsuario> getPlantasUsuario() {
        return plantasUsuario;
    }

    public void setPlantasUsuario(List<PlantaUsuario> plantasUsuario) {
        this.plantasUsuario = plantasUsuario;
    }

    public List<RecomendacionSintoma> getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(List<RecomendacionSintoma> recomendaciones) {
        this.recomendaciones = recomendaciones;
    }
}
