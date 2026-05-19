package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Cuestionario;
import com.veridis.api.model.RespuestaCuestionario;
import com.veridis.api.model.RespuestaCuestionarioRequest;
import com.veridis.api.model.Sintoma;
import com.veridis.api.repository.CuestionarioRepository;
import com.veridis.api.repository.RespuestaCuestionarioRepository;
import com.veridis.api.repository.SintomaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class RespuestaCuestionarioService {

    private final RespuestaCuestionarioRepository respuestaCuestionarioRepository;
    private final CuestionarioRepository cuestionarioRepository;
    private final SintomaRepository sintomaRepository;

    public RespuestaCuestionarioService(RespuestaCuestionarioRepository respuestaCuestionarioRepository,
            CuestionarioRepository cuestionarioRepository, SintomaRepository sintomaRepository) {
        this.respuestaCuestionarioRepository = respuestaCuestionarioRepository;
        this.cuestionarioRepository = cuestionarioRepository;
        this.sintomaRepository = sintomaRepository;
    }

    public List<RespuestaCuestionario> listarTodas() {
        return respuestaCuestionarioRepository.findAll();
    }

    public RespuestaCuestionario buscarPorId(Long id) {
        Optional<RespuestaCuestionario> respuesta = respuestaCuestionarioRepository.findById(id);

        if (respuesta.isPresent()) {
            return respuesta.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Respuesta de cuestionario no encontrada");
    }

    public List<RespuestaCuestionario> listarPorCuestionario(Long idCuestionario) {
        buscarCuestionario(idCuestionario);
        return respuestaCuestionarioRepository.findByCuestionario_IdCuestionario(idCuestionario);
    }

    public RespuestaCuestionario crear(RespuestaCuestionarioRequest request) {
        RespuestaCuestionario respuesta = new RespuestaCuestionario();
        respuesta.setCuestionario(buscarCuestionario(request.getIdCuestionario()));
        respuesta.setSintoma(prepararSintoma(request.getIdSintoma()));

        return respuestaCuestionarioRepository.save(respuesta);
    }

    public void borrar(Long id) {
        RespuestaCuestionario respuesta = buscarPorId(id);
        respuestaCuestionarioRepository.delete(respuesta);
    }

    private Cuestionario buscarCuestionario(Long idCuestionario) {
        if (idCuestionario == null) {
            throw new RecursoNoEncontradoException("Cuestionario no encontrado");
        }

        Optional<Cuestionario> cuestionario = cuestionarioRepository.findById(idCuestionario);

        if (cuestionario.isPresent()) {
            return cuestionario.get();
        }

        throw new RecursoNoEncontradoException("Cuestionario no encontrado");
    }

    private Sintoma prepararSintoma(Long idSintoma) {
        if (idSintoma == null) {
            return null;
        }

        Optional<Sintoma> sintoma = sintomaRepository.findById(idSintoma);

        if (sintoma.isPresent()) {
            return sintoma.get();
        }

        throw new RecursoNoEncontradoException("Sintoma no encontrado");
    }
}
