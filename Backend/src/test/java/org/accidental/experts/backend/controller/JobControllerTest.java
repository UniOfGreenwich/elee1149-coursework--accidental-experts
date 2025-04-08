package org.accidental.experts.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.accidental.experts.backend.entity.Job;
import org.accidental.experts.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
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

@WebMvcTest(JobController.class)
class JobControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private JobRepository jobRepository;
    @Autowired private ObjectMapper objectMapper;

    private Job job1;

    @BeforeEach
    void setUp() {
        job1 = new Job();
        job1.setId(1);
        job1.setTitle("Software Engineer");
        job1.setPostingDate(Instant.parse("2023-10-01T10:00:00Z"));
    }

    @Test
    void getAllJobs_ReturnsOkAndListOfJobs() throws Exception {
        when(jobRepository.findAll()).thenReturn(Arrays.asList(job1, new Job()));

        mockMvc.perform(get("/jobs").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(job1.getId())));

        verify(jobRepository).findAll();
    }

    @Test
    void getJobById_WhenExists_ReturnsOkAndJob() throws Exception {
        when(jobRepository.findById(job1.getId())).thenReturn(Optional.of(job1));

        mockMvc.perform(get("/jobs/{id}", job1.getId()).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(job1.getId())));

        verify(jobRepository).findById(job1.getId());
    }

    @Test
    void createJob_ReturnsCreatedAndJob() throws Exception {
        Job newJob = new Job();
        newJob.setTitle("QA Tester");

        when(jobRepository.save(any(Job.class))).thenAnswer(invocation -> {
            Job saved = invocation.getArgument(0);
            saved.setId(3);
            return saved;
        });

        mockMvc.perform(post("/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newJob))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.postingDate").exists());

        verify(jobRepository).save(any(Job.class));
    }

    @Test
    void updateJob_WhenExists_ReturnsOkAndUpdatedJob() throws Exception {
        int existingId = job1.getId();
        Job updatedDetails = new Job();
        updatedDetails.setTitle("Senior Software Engineer");
        updatedDetails.setPostingDate(Instant.parse("2023-11-01T12:00:00Z"));


        when(jobRepository.findById(existingId)).thenReturn(Optional.of(job1));
        when(jobRepository.save(any(Job.class))).thenAnswer(invocation -> invocation.getArgument(0));

        mockMvc.perform(put("/jobs/{id}", existingId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(existingId)))
                .andExpect(jsonPath("$.title", is(updatedDetails.getTitle())));

        verify(jobRepository).findById(existingId);
        verify(jobRepository).save(any(Job.class));
    }

    @Test
    void deleteJob_WhenExists_ReturnsNoContent() throws Exception {
        int existingId = job1.getId();
        when(jobRepository.existsById(existingId)).thenReturn(true);

        mockMvc.perform(delete("/jobs/{id}", existingId))
                .andExpect(status().isNoContent());

        verify(jobRepository).existsById(existingId);
        verify(jobRepository).deleteById(existingId);
    }
}
