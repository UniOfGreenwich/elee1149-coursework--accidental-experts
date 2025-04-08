package org.accidental.experts.backend.repository;

import org.accidental.experts.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    @Query("SELECT j FROM Job j WHERE j.postingDate <= :currentDate AND j.expiryDate >= :currentDate")
    List<Job> findActiveJobs(@Param("currentDate") Instant currentDate);
}