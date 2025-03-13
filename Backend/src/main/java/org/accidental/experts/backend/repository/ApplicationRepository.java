package org.accidental.experts.backend.repository;

import org.accidental.experts.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
}