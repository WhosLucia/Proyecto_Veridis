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
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "PLANTA_USUARIO")
public class PlantaUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario_planta")
    private Long idUsuarioPlanta;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_planta")
    private Planta planta;

    @ManyToOne
    @JoinColumn(name = "id_ubicacion")
    private Ubicacion ubicacion;

    @Column(name = "nombre_personalizado")
    private String nombrePersonalizado;

    @Column(name = "notas")
    private String notas;

    @Column(name = "fecha_adquisicion")
    private LocalDate fechaAdquisicion;

    @Column(name = "estado_salud")
    private String estadoSalud;

    @OneToMany(mappedBy = "plantaUsuario")
    @JsonIgnore
    private List<HistorialCuidado> historiales;

    @OneToMany(mappedBy = "plantaUsuario")
    @JsonIgnore
    private List<Recordatorio> recordatorios;

    @OneToMany(mappedBy = "plantaUsuario")
    @JsonIgnore
    private List<FotoPlanta> fotos;

    @OneToMany(mappedBy = "plantaUsuario")
    @JsonIgnore
    private List<Cuestionario> cuestionarios;

    // Constructor vacío necesario para JPA
    public PlantaUsuario() {
    }

    public Long getIdUsuarioPlanta() {
        return idUsuarioPlanta;
    }

    public void setIdUsuarioPlanta(Long idUsuarioPlanta) {
        this.idUsuarioPlanta = idUsuarioPlanta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Planta getPlanta() {
        return planta;
    }

    public void setPlanta(Planta planta) {
        this.planta = planta;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getNombrePersonalizado() {
        return nombrePersonalizado;
    }

    public void setNombrePersonalizado(String nombrePersonalizado) {
        this.nombrePersonalizado = nombrePersonalizado;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public LocalDate getFechaAdquisicion() {
        return fechaAdquisicion;
    }

    public void setFechaAdquisicion(LocalDate fechaAdquisicion) {
        this.fechaAdquisicion = fechaAdquisicion;
    }

    public String getEstadoSalud() {
        return estadoSalud;
    }

    public void setEstadoSalud(String estadoSalud) {
        this.estadoSalud = estadoSalud;
    }

    public List<HistorialCuidado> getHistoriales() {
        return historiales;
    }

    public void setHistoriales(List<HistorialCuidado> historiales) {
        this.historiales = historiales;
    }

    public List<Recordatorio> getRecordatorios() {
        return recordatorios;
    }

    public void setRecordatorios(List<Recordatorio> recordatorios) {
        this.recordatorios = recordatorios;
    }

    public List<FotoPlanta> getFotos() {
        return fotos;
    }

    public void setFotos(List<FotoPlanta> fotos) {
        this.fotos = fotos;
    }

    public List<Cuestionario> getCuestionarios() {
        return cuestionarios;
    }

    public void setCuestionarios(List<Cuestionario> cuestionarios) {
        this.cuestionarios = cuestionarios;
    }
}
