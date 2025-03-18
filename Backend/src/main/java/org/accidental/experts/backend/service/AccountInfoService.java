package org.accidental.experts.backend.service;

import org.accidental.experts.backend.entity.*;
import org.accidental.experts.backend.repository.ApplicationRepository;
import org.accidental.experts.backend.repository.EmployerRepository;
import org.accidental.experts.backend.repository.JobRepository;
import org.accidental.experts.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountInfoService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplicationRepository applicationsRepository;

    @Autowired
    private JobRepository jobsRepository;

    @Autowired
    private EmployerRepository employerRepository;

    private static AppliedJobInfo getAppliedJobInfo(Application application, Job job, Employer employer) {
        AppliedJobInfo appliedJobInfo = new AppliedJobInfo();
        appliedJobInfo.setJobId(job.getId());
        appliedJobInfo.setTitle(job.getTitle());
        appliedJobInfo.setDescription(job.getDescription());
        appliedJobInfo.setCompanyName(employer.getCompanyName());
        appliedJobInfo.setDateApplied(application.getApplicationDate());
        appliedJobInfo.setEmploymentType(job.getEmploymentType());
        appliedJobInfo.setAddress(job.getAddress());
        appliedJobInfo.setCounty(job.getCounty());
        appliedJobInfo.setPostcode(job.getPostcode());
        appliedJobInfo.setApplicationStatus(application.getApplicationStatus());
        appliedJobInfo.setSalary(job.getSalary());
        return appliedJobInfo;
    }

    public Optional<AccountInfoResponse> getAccountInfo(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Application> applications = applicationsRepository.findByUserId(userId);
            List<AppliedJobInfo> appliedJobInfos = new ArrayList<>();

            for (Application application : applications) {
                Optional<Job> job = jobsRepository.findById(application.getJob_id());
                if (job.isPresent()) {
                    Optional<Employer> employer = employerRepository.findById(job.get().getEmployer_id());
                    if (employer.isPresent()) {
                        AppliedJobInfo appliedJobInfo = getAppliedJobInfo(application, job.get(), employer.get());
                        appliedJobInfos.add(appliedJobInfo);
                    }

                }
            }

            AccountInfoResponse accountInfoResponse = new AccountInfoResponse();
            accountInfoResponse.setProfile(user);
            accountInfoResponse.setApplied(appliedJobInfos);

            return Optional.of(accountInfoResponse);
        } else {
            return Optional.empty();
        }
    }
}
