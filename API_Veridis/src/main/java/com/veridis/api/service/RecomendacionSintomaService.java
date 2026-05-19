package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Planta;
import com.veridis.api.model.RecomendacionSintoma;
import com.veridis.api.model.RecomendacionSintomaRequest;
import com.veridis.api.model.Sintoma;
import com.veridis.api.repository.PlantaRepository;
import com.veridis.api.repository.RecomendacionSintomaRepository;
import com.veridis.api.repository.SintomaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class RecomendacionSintomaService {

    private final RecomendacionSintomaRepository recomendacionSintomaRepository;
    private final SintomaRepository sintomaRepository;
    private final PlantaRepository plantaRepository;

    public RecomendacionSintomaService(RecomendacionSintomaRepository recomendacionSintomaRepository,
            SintomaRepository sintomaRepository, PlantaRepository plantaRepository) {
        this.recomendacionSintomaRepository = recomendacionSintomaRepository;
        this.sintomaRepository = sintomaRepository;
        this.plantaRepository = plantaRepository;
    }

    public List<RecomendacionSintoma> listarTodas() {
        return recomendacionSintomaRepository.findAll();
    }

    public RecomendacionSintoma buscarPorId(Long id) {
        Optional<RecomendacionSintoma> recomendacion = recomendacionSintomaRepository.findById(id);

        if (recomendacion.isPresent()) {
            return recomendacion.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Recomendacion no encontrada");
    }

    public List<RecomendacionSintoma> listarPorSintoma(Long idSintoma) {
        buscarSintoma(idSintoma);
        return recomendacionSintomaRepository.findBySintoma_IdSintoma(idSintoma);
    }

    public List<RecomendacionSintoma> listarPorPlanta(Long idPlanta) {
        buscarPlanta(idPlanta);
        return recomendacionSintomaRepository.findByPlanta_IdPlanta(idPlanta);
    }

    public List<RecomendacionSintoma> buscarPorSintomaYPlanta(Long idSintoma, Long idPlanta) {
        buscarSintoma(idSintoma);
        buscarPlanta(idPlanta);

        List<RecomendacionSintoma> resultado = new ArrayList<RecomendacionSintoma>();
        List<RecomendacionSintoma> especificas =
                recomendacionSintomaRepository.findBySintoma_IdSintomaAndPlanta_IdPlanta(idSintoma, idPlanta);
        List<RecomendacionSintoma> genericas =
                recomendacionSintomaRepository.findBySintoma_IdSintomaAndPlantaIsNull(idSintoma);

        for (RecomendacionSintoma recomendacion : especificas) {
            resultado.add(recomendacion);
        }

        for (RecomendacionSintoma recomendacion : genericas) {
            resultado.add(recomendacion);
        }

        return resultado;
    }

    public RecomendacionSintoma crear(RecomendacionSintomaRequest request) {
        RecomendacionSintoma recomendacion = new RecomendacionSintoma();
        copiarDatos(recomendacion, request);
        return recomendacionSintomaRepository.save(recomendacion);
    }

    public RecomendacionSintoma actualizar(Long id, RecomendacionSintomaRequest request) {
        RecomendacionSintoma recomendacion = buscarPorId(id);
        copiarDatos(recomendacion, request);
        return recomendacionSintomaRepository.save(recomendacion);
    }

    public void borrar(Long id) {
        RecomendacionSintoma recomendacion = buscarPorId(id);
        recomendacionSintomaRepository.delete(recomendacion);
    }

    private void copiarDatos(RecomendacionSintoma recomendacion, RecomendacionSintomaRequest request) {
        recomendacion.setSintoma(buscarSintoma(request.getIdSintoma()));
        recomendacion.setPlanta(prepararPlanta(request.getIdPlanta()));
        recomendacion.setPosibleCausa(request.getPosibleCausa());
        recomendacion.setRecomendacion(request.getRecomendacion());
        recomendacion.setObservaciones(request.getObservaciones());
        recomendacion.setPrioridad(request.getPrioridad());

        if (recomendacion.getPrioridad() == null) {
            recomendacion.setPrioridad("media");
        }
    }

    private Sintoma buscarSintoma(Long idSintoma) {
        if (idSintoma == null) {
            throw new RecursoNoEncontradoException("Sintoma no encontrado");
        }

        Optional<Sintoma> sintoma = sintomaRepository.findById(idSintoma);

        if (sintoma.isPresent()) {
            return sintoma.get();
        }

        throw new RecursoNoEncontradoException("Sintoma no encontrado");
    }

    private Planta buscarPlanta(Long idPlanta) {
        if (idPlanta == null) {
            throw new RecursoNoEncontradoException("Planta no encontrada");
        }

        Optional<Planta> planta = plantaRepository.findById(idPlanta);

        if (planta.isPresent()) {
            return planta.get();
        }

        throw new RecursoNoEncontradoException("Planta no encontrada");
    }

    private Planta prepararPlanta(Long idPlanta) {
        if (idPlanta == null) {
            return null;
        }

        return buscarPlanta(idPlanta);
    }
}
