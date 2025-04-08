package org.accidental.experts.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.accidental.experts.backend.dto.ChangePasswordDTO;
import org.accidental.experts.backend.dto.UserUpdateDTO;
import org.accidental.experts.backend.entity.User;
import org.accidental.experts.backend.repository.UserRepository;
import org.accidental.experts.backend.utils.PasswordUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerHyperCondensedPositiveTest {

    @Autowired MockMvc mvc;
    @MockBean UserRepository repo;
    @Autowired ObjectMapper mapper;

    @Test void getAllUsers() throws Exception {
        when(repo.findAll()).thenReturn(Collections.emptyList());
        mvc.perform(get("/users")).andExpect(status().isOk());
    }

    @Test void getUserById() throws Exception {
        when(repo.findById(anyInt())).thenReturn(Optional.of(new User()));
        mvc.perform(get("/users/1")).andExpect(status().isOk());
    }

    @Test void createUser() throws Exception {
        when(repo.save(any(User.class))).thenReturn(new User());
        User newUser = new User();
        newUser.setPassword("somePassword"); // FIX: Set password
        mvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(newUser))).andExpect(status().isCreated());
    }

    @Test void updateUser() throws Exception {
        when(repo.findById(anyInt())).thenReturn(Optional.of(new User()));
        when(repo.save(any(User.class))).thenReturn(new User());
        mvc.perform(put("/users/1").contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(new UserUpdateDTO()))).andExpect(status().isOk());
    }

    @Test void authenticateUser() throws Exception {
        User existingUser = new User();
        existingUser.setEmail("test@example.com"); // Ensure existing user has email
        existingUser.setPassword(PasswordUtil.hashPassword("pass"));
        when(repo.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser)); // Use specific email in mock setup

        User authReq = new User();
        authReq.setEmail("test@example.com"); // FIX: Set email
        authReq.setPassword("pass");

        mvc.perform(post("/users/authenticate").contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(authReq))).andExpect(status().isOk());
    }

    @Test void changePassword() throws Exception {
        User existingUser = new User();
        existingUser.setPassword(PasswordUtil.hashPassword("oldPass"));
        when(repo.findById(anyInt())).thenReturn(Optional.of(existingUser));
        when(repo.save(any(User.class))).thenReturn(new User());
        ChangePasswordDTO changeDto = new ChangePasswordDTO();
        changeDto.setCurrentPassword("oldPass"); changeDto.setNewPassword("newPass");
        mvc.perform(put("/users/1/change-password").contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(changeDto))).andExpect(status().isOk());
    }
}
