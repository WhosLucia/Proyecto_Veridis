package com.veridis.api.repository;

import com.veridis.api.model.FamiliaPlanta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamiliaPlantaRepository extends JpaRepository<FamiliaPlanta, Long> {

    List<FamiliaPlanta> findByNombreContainingIgnoreCase(String texto);
}
