package com.veridis.api.repository;

import com.veridis.api.model.FotoPlanta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FotoPlantaRepository extends JpaRepository<FotoPlanta, Long> {

    List<FotoPlanta> findByPlantaUsuario_IdUsuarioPlanta(Long idUsuarioPlanta);
}
