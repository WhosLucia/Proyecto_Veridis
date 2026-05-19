package com.veridis.api.repository;

import com.veridis.api.model.RecomendacionSintoma;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecomendacionSintomaRepository extends JpaRepository<RecomendacionSintoma, Long> {

    List<RecomendacionSintoma> findBySintoma_IdSintoma(Long idSintoma);

    List<RecomendacionSintoma> findByPlanta_IdPlanta(Long idPlanta);

    List<RecomendacionSintoma> findBySintoma_IdSintomaAndPlanta_IdPlanta(Long idSintoma, Long idPlanta);

    List<RecomendacionSintoma> findBySintoma_IdSintomaAndPlantaIsNull(Long idSintoma);
}
