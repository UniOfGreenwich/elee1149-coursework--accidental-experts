package org.accidental.experts.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "applications_id_gen")
    @SequenceGenerator(name = "applications_id_gen", sequenceName = "applications_application_id_seq", allocationSize = 1)
    @Column(name = "application_id", nullable = false)
    private Integer id;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "application_date")
    private Instant applicationDate;

    @Column(name = "application_status", nullable = false, length = Integer.MAX_VALUE)
    private String applicationStatus;

    @Column(name = "job_id", nullable = false, length = Integer.MAX_VALUE)
    private Integer job_id;

    @Column(name = "user_id", nullable = false, length = Integer.MAX_VALUE)
    private Integer user_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Instant applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}