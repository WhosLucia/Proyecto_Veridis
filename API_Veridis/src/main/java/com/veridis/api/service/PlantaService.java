package com.veridis.api.service;

import com.veridis.api.exception.RecursoNoEncontradoException;
import com.veridis.api.model.Planta;
import com.veridis.api.repository.PlantaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class PlantaService {

    private final PlantaRepository plantaRepository;

    public PlantaService(PlantaRepository plantaRepository) {
        this.plantaRepository = plantaRepository;
    }

    public List<Planta> listarTodas() {
        return plantaRepository.findAll();
    }

    public Planta buscarPorId(Long id) {
        Optional<Planta> planta = plantaRepository.findById(id);

        if (planta.isPresent()) {
            return planta.get();
        }

        // Si no existe, lanzo una excepción simple
        throw new RecursoNoEncontradoException("Planta no encontrada");
    }

    public List<Planta> buscarPorTexto(String texto) {
        if (texto == null || texto.trim().isEmpty()) {
            return listarTodas();
        }

        List<Planta> resultado = new ArrayList<Planta>();
        List<Planta> porNombreComun = plantaRepository.findByNombreComunContainingIgnoreCase(texto);
        List<Planta> porNombreCientifico = plantaRepository.findByNombreCientificoContainingIgnoreCase(texto);

        for (Planta planta : porNombreComun) {
            resultado.add(planta);
        }

        for (Planta planta : porNombreCientifico) {
            if (!contienePlanta(resultado, planta)) {
                resultado.add(planta);
            }
        }

        return resultado;
    }

    public List<Planta> buscarPorTipo(String tipo) {
        return plantaRepository.findByTipo(tipo);
    }

    public List<Planta> buscarPorLuz(String luz) {
        return plantaRepository.findByLuzRecomendada(luz);
    }

    public List<Planta> buscarPorFamilia(Long idFamilia) {
        return plantaRepository.findByFamilia_IdFamilia(idFamilia);
    }

    private boolean contienePlanta(List<Planta> plantas, Planta plantaBuscada) {
        for (Planta planta : plantas) {
            if (planta.getIdPlanta() != null && planta.getIdPlanta().equals(plantaBuscada.getIdPlanta())) {
                return true;
            }
        }

        return false;
    }
}
