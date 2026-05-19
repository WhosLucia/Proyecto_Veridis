package com.veridis.api.repository;

import com.veridis.api.model.Ubicacion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {

    List<Ubicacion> findByUsuario_IdUsuario(Long idUsuario);
}
