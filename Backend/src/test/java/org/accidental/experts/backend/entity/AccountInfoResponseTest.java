package org.accidental.experts.backend.entity;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AccountInfoResponseTest {

    @Test
    void testGettersAndSetters() {
        AccountInfoResponse response = new AccountInfoResponse();
        User user = new User();
        AppliedJobInfo jobInfo = new AppliedJobInfo();

        response.setProfile(user);
        response.setApplied(List.of(jobInfo));

        assertEquals(user, response.getProfile());
        assertEquals(1, response.getApplied().size());
        assertEquals(jobInfo, response.getApplied().get(0));
    }
}