package org.accidental.experts.backend.controller;

import org.accidental.experts.backend.entity.Employer;
import org.accidental.experts.backend.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employers")
public class EmployerController {

    private final EmployerRepository employerRepository;

    @Autowired
    public EmployerController(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Integer id) {
        Optional<Employer> employer = employerRepository.findById(id);
        return employer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Employer> createEmployer(@RequestBody Employer employer) {
        employerRepository.save(employer);
        return new ResponseEntity<>(employer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employer> updateEmployer(@PathVariable Integer id, @RequestBody Employer employerDetails) {
        Optional<Employer> employer = employerRepository.findById(id);
        if (employer.isPresent()) {
            Employer updatedEmployer = employer.get();
            updatedEmployer.setCompanyName(employerDetails.getCompanyName());
            updatedEmployer.setCompanyWebsite(employerDetails.getCompanyWebsite());
            updatedEmployer.setCompanyDescription(employerDetails.getCompanyDescription());
            employerRepository.save(updatedEmployer);
            return ResponseEntity.ok(updatedEmployer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable Integer id) {
        if (employerRepository.existsById(id)) {
            employerRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}