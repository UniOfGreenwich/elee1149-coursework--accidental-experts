package org.accidental.experts.backend.controller;

import org.accidental.experts.backend.entity.Job;
import org.accidental.experts.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Integer id) {
        Optional<Job> job = jobRepository.findById(id);
        return job.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        job.setPostingDate(Instant.now());
        jobRepository.save(job);
        return new ResponseEntity<>(job, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Integer id, @RequestBody Job jobDetails) {
        Optional<Job> job = jobRepository.findById(id);
        if (job.isPresent()) {
            Job updatedJob = job.get();
            updatedJob.setTitle(jobDetails.getTitle());
            updatedJob.setDescription(jobDetails.getDescription());
            updatedJob.setAddress(jobDetails.getAddress());
            updatedJob.setCounty(jobDetails.getCounty());
            updatedJob.setPostcode(jobDetails.getPostcode());
            updatedJob.setSalary(jobDetails.getSalary());
            updatedJob.setEmploymentType(jobDetails.getEmploymentType());
            updatedJob.setPostingDate(jobDetails.getPostingDate());
            updatedJob.setExpiryDate(jobDetails.getExpiryDate());
            jobRepository.save(updatedJob);
            return ResponseEntity.ok(updatedJob);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Integer id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/active")
    public List<Job> getActiveJobs() {
        Instant currentDate = Instant.now();
        return jobRepository.findActiveJobs(currentDate);
    }
}