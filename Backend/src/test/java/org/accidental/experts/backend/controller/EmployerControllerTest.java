package org.accidental.experts.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.accidental.experts.backend.entity.Employer;
import org.accidental.experts.backend.repository.EmployerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EmployerController.class)
class EmployerControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private EmployerRepository employerRepository;
    @Autowired private ObjectMapper objectMapper;

    private Employer employer1;

    @BeforeEach
    void setUp() {
        employer1 = new Employer();
        employer1.setId(1);
        employer1.setCompanyName("Test Company One");
    }

    @Test
    void getAllEmployers() throws Exception {
        when(employerRepository.findAll()).thenReturn(Arrays.asList(employer1, new Employer()));

        mockMvc.perform(get("/employers").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(employer1.getId())));

        verify(employerRepository).findAll();
    }

    @Test
    void getEmployerById() throws Exception {
        when(employerRepository.findById(employer1.getId())).thenReturn(Optional.of(employer1));

        mockMvc.perform(get("/employers/{id}", employer1.getId()).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(employer1.getId())));

        verify(employerRepository).findById(employer1.getId());
    }

    @Test
    void createEmployer() throws Exception {
        Employer newEmployer = new Employer();
        newEmployer.setCompanyName("New Corp");

        when(employerRepository.save(any(Employer.class))).thenAnswer(invocation -> {
            Employer saved = invocation.getArgument(0);
            saved.setId(3);
            return saved;
        });

        mockMvc.perform(post("/employers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newEmployer))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)));

        verify(employerRepository).save(any(Employer.class));
    }

    @Test
    void updateEmployer() throws Exception {
        int existingId = employer1.getId();
        Employer updatedDetails = new Employer();
        updatedDetails.setCompanyName("Updated Name");

        when(employerRepository.findById(existingId)).thenReturn(Optional.of(employer1));
        when(employerRepository.save(any(Employer.class))).thenAnswer(invocation -> invocation.getArgument(0));

        mockMvc.perform(put("/employers/{id}", existingId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(existingId)))
                .andExpect(jsonPath("$.companyName", is(updatedDetails.getCompanyName())));

        verify(employerRepository).findById(existingId);
        verify(employerRepository).save(any(Employer.class));
    }

    @Test
    void deleteEmployer() throws Exception {
        int existingId = employer1.getId();
        when(employerRepository.existsById(existingId)).thenReturn(true);

        mockMvc.perform(delete("/employers/{id}", existingId))
                .andExpect(status().isNoContent());

        verify(employerRepository).existsById(existingId);
        verify(employerRepository).deleteById(existingId);
    }
}
