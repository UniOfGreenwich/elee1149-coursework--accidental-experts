package org.accidental.experts.backend.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChangePasswordDTOTest {

    @Test
    void testGettersAndSetters() {
        ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO();

        changePasswordDTO.setCurrentPassword("oldPassword123");
        changePasswordDTO.setNewPassword("newPassword456");

        assertEquals("oldPassword123", changePasswordDTO.getCurrentPassword());
        assertEquals("newPassword456", changePasswordDTO.getNewPassword());
    }
}