package org.accidental.experts.backend.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserUpdateDTOTest {

    @Test
    void testGettersAndSetters() {
        UserUpdateDTO userUpdateDTO = new UserUpdateDTO();

        userUpdateDTO.setFirstName("Jane");
        userUpdateDTO.setLastName("Doe");
        userUpdateDTO.setEmail("jane.doe@example.com");

        assertEquals("Jane", userUpdateDTO.getFirstName());
        assertEquals("Doe", userUpdateDTO.getLastName());
        assertEquals("jane.doe@example.com", userUpdateDTO.getEmail());
    }
}