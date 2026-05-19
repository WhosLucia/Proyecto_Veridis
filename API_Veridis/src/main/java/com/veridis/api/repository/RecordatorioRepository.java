package com.veridis.api.repository;

import com.veridis.api.model.Recordatorio;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordatorioRepository extends JpaRepository<Recordatorio, Long> {

    List<Recordatorio> findByPlantaUsuario_IdUsuarioPlanta(Long idUsuarioPlanta);

    List<Recordatorio> findByActivo(Boolean activo);
}
