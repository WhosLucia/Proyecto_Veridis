package com.veridis.api.repository;

import com.veridis.api.model.PlantaUsuario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantaUsuarioRepository extends JpaRepository<PlantaUsuario, Long> {

    List<PlantaUsuario> findByUsuario_IdUsuario(Long idUsuario);

    List<PlantaUsuario> findByUbicacion_IdUbicacion(Long idUbicacion);
}
