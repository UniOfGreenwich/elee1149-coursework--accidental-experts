package org.accidental.experts.backend.repository;

import org.accidental.experts.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    @Query("SELECT a FROM Application a WHERE a.user_id = :userId")
    List<Application> findByUserId(@Param("userId") Integer userId);
}