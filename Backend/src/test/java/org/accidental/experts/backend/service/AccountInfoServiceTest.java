package org.accidental.experts.backend.service;

import org.accidental.experts.backend.entity.*;
import org.accidental.experts.backend.repository.ApplicationRepository;
import org.accidental.experts.backend.repository.EmployerRepository;
import org.accidental.experts.backend.repository.JobRepository;
import org.accidental.experts.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountInfoServiceTest {

    @Mock UserRepository userRepo;
    @Mock ApplicationRepository appRepo;
    @Mock JobRepository jobRepo;
    @Mock EmployerRepository employerRepo;
    @InjectMocks AccountInfoService service;

    @Test
    void getAccountInfo() {
        int userId = 1, jobId = 10, employerId = 100, appId = 1000;
        User user = new User(); user.setId(userId); user.setPassword("hashed");
        Job job = new Job(); job.setId(jobId); job.setEmployer_id(employerId); job.setTitle("Dev");
        Employer employer = new Employer(); employer.setId(employerId); employer.setCompanyName("Comp");
        Application app = new Application(); app.setId(appId); app.setJob_id(jobId); app.setUser_id(userId); app.setApplicationDate(Instant.now());

        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(appRepo.findByUserId(userId)).thenReturn(List.of(app));
        when(jobRepo.findById(jobId)).thenReturn(Optional.of(job));
        when(employerRepo.findById(employerId)).thenReturn(Optional.of(employer));

        Optional<AccountInfoResponse> result = service.getAccountInfo(userId);

        assertThat(result).isPresent();
        assertThat(result.get().getProfile()).isEqualTo(user);
        assertThat(result.get().getProfile().getPassword()).isNull();
        assertThat(result.get().getApplied()).hasSize(1);
        assertThat(result.get().getApplied().get(0).getJobId()).isEqualTo(jobId);
        assertThat(result.get().getApplied().get(0).getCompanyName()).isEqualTo(employer.getCompanyName());
    }

    @Test
    void getAccountInfoWhenUserNotFound() {
        when(userRepo.findById(anyInt())).thenReturn(Optional.empty());
        Optional<AccountInfoResponse> result = service.getAccountInfo(99);
        assertThat(result).isEmpty();
    }
}
