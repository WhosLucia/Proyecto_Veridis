package com.veridis.api.repository;

import com.veridis.api.model.Cuestionario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CuestionarioRepository extends JpaRepository<Cuestionario, Long> {

    List<Cuestionario> findByPlantaUsuario_IdUsuarioPlanta(Long idUsuarioPlanta);
}
