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
import java.time.LocalDate;

@Entity
@Table(name = "RECORDATORIO")
public class Recordatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recordatorio")
    private Long idRecordatorio;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_usuario_planta")
    private PlantaUsuario plantaUsuario;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "frecuencia")
    private Integer frecuencia;

    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "fecha_proximo")
    private LocalDate fechaProximo;

    @Column(name = "notification_id")
    private String notificationId;

    // Constructor vacío necesario para JPA
    public Recordatorio() {
    }

    public Long getIdRecordatorio() {
        return idRecordatorio;
    }

    public void setIdRecordatorio(Long idRecordatorio) {
        this.idRecordatorio = idRecordatorio;
    }

    public PlantaUsuario getPlantaUsuario() {
        return plantaUsuario;
    }

    public void setPlantaUsuario(PlantaUsuario plantaUsuario) {
        this.plantaUsuario = plantaUsuario;
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
