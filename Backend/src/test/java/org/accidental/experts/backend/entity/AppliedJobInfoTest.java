package org.accidental.experts.backend.entity;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

class AppliedJobInfoTest {

    @Test
    void testGettersAndSetters() {
        AppliedJobInfo jobInfo = new AppliedJobInfo();
        Instant now = Instant.now();
        BigDecimal salary = new BigDecimal("50000");

        jobInfo.setJobId(1);
        jobInfo.setTitle("Software Engineer");
        jobInfo.setDescription("Develop software solutions.");
        jobInfo.setCompanyName("Tech Corp");
        jobInfo.setDateApplied(now);
        jobInfo.setEmploymentType("Full-Time");
        jobInfo.setAddress("123 Tech Street");
        jobInfo.setCounty("Tech County");
        jobInfo.setPostcode("12345");
        jobInfo.setApplicationStatus("Pending");
        jobInfo.setSalary(salary);

        assertEquals(1, jobInfo.getJobId());
        assertEquals("Software Engineer", jobInfo.getTitle());
        assertEquals("Develop software solutions.", jobInfo.getDescription());
        assertEquals("Tech Corp", jobInfo.getCompanyName());
        assertEquals(now, jobInfo.getDateApplied());
        assertEquals("Full-Time", jobInfo.getEmploymentType());
        assertEquals("123 Tech Street", jobInfo.getAddress());
        assertEquals("Tech County", jobInfo.getCounty());
        assertEquals("12345", jobInfo.getPostcode());
        assertEquals("Pending", jobInfo.getApplicationStatus());
        assertEquals(salary, jobInfo.getSalary());
    }
}