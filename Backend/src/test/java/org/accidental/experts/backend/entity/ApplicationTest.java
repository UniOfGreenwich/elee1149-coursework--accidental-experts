package org.accidental.experts.backend.entity;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

class ApplicationTest {

    @Test
    void testGettersAndSetters() {
        Application application = new Application();
        Instant now = Instant.now();

        application.setId(1);
        application.setApplicationDate(now);
        application.setApplicationStatus("Pending");
        application.setJob_id(101);
        application.setUser_id(202);

        assertEquals(1, application.getId());
        assertEquals(now, application.getApplicationDate());
        assertEquals("Pending", application.getApplicationStatus());
        assertEquals(101, application.getJob_id());
        assertEquals(202, application.getUser_id());
    }
}