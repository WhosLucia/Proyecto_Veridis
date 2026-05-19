package com.veridis.api.repository;

import com.veridis.api.model.HistorialCuidado;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistorialCuidadoRepository extends JpaRepository<HistorialCuidado, Long> {

    List<HistorialCuidado> findByPlantaUsuario_IdUsuarioPlanta(Long idUsuarioPlanta);
}
