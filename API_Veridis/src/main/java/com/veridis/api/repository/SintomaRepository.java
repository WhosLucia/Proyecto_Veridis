package com.veridis.api.repository;

import com.veridis.api.model.Sintoma;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SintomaRepository extends JpaRepository<Sintoma, Long> {

    List<Sintoma> findByNombreContainingIgnoreCase(String texto);
}
