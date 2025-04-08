package org.accidental.experts.backend.entity;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

class JobTest {

    @Test
    void testGettersAndSetters() {
        Job job = new Job();
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(3600);
        BigDecimal salary = new BigDecimal("75000");

        job.setId(1);
        job.setEmployer_id(101);
        job.setTitle("Backend Developer");
        job.setDescription("Develop and maintain backend services.");
        job.setAddress("456 Developer Lane");
        job.setCounty("Tech County");
        job.setPostcode("67890");
        job.setSalary(salary);
        job.setEmploymentType("full-time");
        job.setPostingDate(now);
        job.setExpiryDate(expiry);

        assertEquals(1, job.getId());
        assertEquals(101, job.getEmployer_id());
        assertEquals("Backend Developer", job.getTitle());
        assertEquals("Develop and maintain backend services.", job.getDescription());
        assertEquals("456 Developer Lane", job.getAddress());
        assertEquals("Tech County", job.getCounty());
        assertEquals("67890", job.getPostcode());
        assertEquals(salary, job.getSalary());
        assertEquals("full-time", job.getEmploymentType());
        assertEquals(now, job.getPostingDate());
        assertEquals(expiry, job.getExpiryDate());
    }
}