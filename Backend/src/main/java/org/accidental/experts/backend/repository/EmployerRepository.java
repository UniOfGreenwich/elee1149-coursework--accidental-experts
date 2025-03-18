package org.accidental.experts.backend.repository;

import org.accidental.experts.backend.entity.Application;
import org.accidental.experts.backend.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    Optional<Employer> findById(Integer employer_id);
}