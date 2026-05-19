package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Sintoma;
import com.veridis.api.repository.SintomaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SintomaService {

    private final SintomaRepository sintomaRepository;

    public SintomaService(SintomaRepository sintomaRepository) {
        this.sintomaRepository = sintomaRepository;
    }

    public List<Sintoma> listarTodos() {
        return sintomaRepository.findAll();
    }

    public Sintoma buscarPorId(Long id) {
        Optional<Sintoma> sintoma = sintomaRepository.findById(id);

        if (sintoma.isPresent()) {
            return sintoma.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Síntoma no encontrado");
    }

    public List<Sintoma> buscarPorNombre(String texto) {
        if (texto == null || texto.trim().isEmpty()) {
            return listarTodos();
        }

        return sintomaRepository.findByNombreContainingIgnoreCase(texto);
    }
}
