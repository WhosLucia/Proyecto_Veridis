package com.veridis.api.repository;

import com.veridis.api.model.Localizacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalizacionRepository extends JpaRepository<Localizacion, Long> {
}
