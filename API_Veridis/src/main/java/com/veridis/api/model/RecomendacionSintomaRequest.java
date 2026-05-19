package com.veridis.api.model;

public class RecomendacionSintomaRequest {

    private Long idSintoma;
    private Long idPlanta;
    private String posibleCausa;
    private String recomendacion;
    private String observaciones;
    private String prioridad;

    public Long getIdSintoma() {
        return idSintoma;
    }

    public void setIdSintoma(Long idSintoma) {
        this.idSintoma = idSintoma;
    }

    public Long getIdPlanta() {
        return idPlanta;
    }

    public void setIdPlanta(Long idPlanta) {
        this.idPlanta = idPlanta;
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
