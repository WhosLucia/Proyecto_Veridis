package com.veridis.api.repository;

import com.veridis.api.model.RespuestaCuestionario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RespuestaCuestionarioRepository extends JpaRepository<RespuestaCuestionario, Long> {

    List<RespuestaCuestionario> findByCuestionario_IdCuestionario(Long idCuestionario);
}
