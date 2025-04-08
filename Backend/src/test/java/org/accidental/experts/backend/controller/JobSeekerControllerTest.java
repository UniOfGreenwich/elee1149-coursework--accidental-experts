package org.accidental.experts.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.accidental.experts.backend.entity.AccountInfoResponse;
import org.accidental.experts.backend.entity.User;
import org.accidental.experts.backend.service.AccountInfoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(JobSeekerController.class)
class JobSeekerControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private AccountInfoService accountInfoService;
    @Autowired private ObjectMapper objectMapper;

    @Test
    void getAccountInfo_WhenExists_ReturnsOkAndAccountInfo() throws Exception {
        int accountId = 1;
        AccountInfoResponse mockResponse = new AccountInfoResponse();
        User mockUserProfile = new User();

        mockResponse.setProfile(mockUserProfile);

        mockResponse.getProfile().setFirstName("First Name");

        when(accountInfoService.getAccountInfo(accountId)).thenReturn(Optional.of(mockResponse));

        mockMvc.perform(get("/accountInfo/{id}", accountId).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profile.firstName", is(mockResponse.getProfile().getFirstName())));

        verify(accountInfoService).getAccountInfo(accountId);
    }
}
