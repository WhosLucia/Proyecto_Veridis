package com.veridis.api.repository;

import com.veridis.api.model.Planta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantaRepository extends JpaRepository<Planta, Long> {

    List<Planta> findByNombreComunContainingIgnoreCase(String texto);

    List<Planta> findByNombreCientificoContainingIgnoreCase(String texto);

    List<Planta> findByTipo(String tipo);

    List<Planta> findByLuzRecomendada(String luzRecomendada);

    List<Planta> findByFamilia_IdFamilia(Long idFamilia);
}
