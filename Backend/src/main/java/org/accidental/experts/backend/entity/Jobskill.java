package org.accidental.experts.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jobskills")
public class Jobskill {
    @EmbeddedId
    private JobskillId id;

    @MapsId("jobId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    public JobskillId getId() {
        return id;
    }

    public void setId(JobskillId id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

}