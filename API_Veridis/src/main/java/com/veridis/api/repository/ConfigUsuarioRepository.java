package com.veridis.api.repository;

import com.veridis.api.model.ConfigUsuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigUsuarioRepository extends JpaRepository<ConfigUsuario, Long> {

    Optional<ConfigUsuario> findByUsuario_IdUsuario(Long idUsuario);
}
