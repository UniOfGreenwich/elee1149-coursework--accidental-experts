package org.accidental.experts.backend.entity;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testGettersAndSetters() {
        User user = new User();
        Instant now = Instant.now();

        user.setId(1);
        user.setPassword("securePassword123");
        user.setEmail("john.doe@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUserType("job-seeker");
        user.setRegistrationDate(now);

        assertEquals(1, user.getId());
        assertEquals("securePassword123", user.getPassword());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("job-seeker", user.getUserType());
        assertEquals(now, user.getRegistrationDate());
    }
}