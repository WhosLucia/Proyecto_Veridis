package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.FamiliaPlanta;
import com.veridis.api.repository.FamiliaPlantaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class FamiliaPlantaService {

    private final FamiliaPlantaRepository familiaPlantaRepository;

    public FamiliaPlantaService(FamiliaPlantaRepository familiaPlantaRepository) {
        this.familiaPlantaRepository = familiaPlantaRepository;
    }

    public List<FamiliaPlanta> listarTodas() {
        return familiaPlantaRepository.findAll();
    }

    public FamiliaPlanta buscarPorId(Long id) {
        Optional<FamiliaPlanta> familia = familiaPlantaRepository.findById(id);

        if (familia.isPresent()) {
            return familia.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Familia de planta no encontrada");
    }

    public List<FamiliaPlanta> buscarPorNombre(String texto) {
        if (texto == null || texto.trim().isEmpty()) {
            return listarTodas();
        }

        return familiaPlantaRepository.findByNombreContainingIgnoreCase(texto);
    }
}
