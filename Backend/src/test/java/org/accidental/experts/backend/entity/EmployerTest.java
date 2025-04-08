package org.accidental.experts.backend.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EmployerTest {

    @Test
    void testGettersAndSetters() {
        Employer employer = new Employer();

        employer.setId(1);
        employer.setCompanyName("Tech Corp");
        employer.setCompanyWebsite("https://techcorp.com");
        employer.setCompanyDescription("A leading technology company.");

        assertEquals(1, employer.getId());
        assertEquals("Tech Corp", employer.getCompanyName());
        assertEquals("https://techcorp.com", employer.getCompanyWebsite());
        assertEquals("A leading technology company.", employer.getCompanyDescription());
    }
}