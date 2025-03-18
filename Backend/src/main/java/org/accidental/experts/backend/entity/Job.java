package org.accidental.experts.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobs_id_gen")
    @SequenceGenerator(name = "jobs_id_gen", sequenceName = "jobs_job_id_seq", allocationSize = 1)
    @Column(name = "job_id", nullable = false)
    private Integer id;

    @Column(name = "employer_id", nullable = false)
    private Integer employer_id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name="county", nullable = true)
    private String county;

    @Column(name="postcode", nullable = true)
    private String postcode;

    @Column(name = "salary", precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "employment_type", nullable = false, length = Integer.MAX_VALUE)
    private String employmentType;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "posting_date")
    private Instant postingDate;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEmployer_id() {
        return employer_id;
    }

    public void setEmployer_id(Integer employer_id) {
        this.employer_id = employer_id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public Instant getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(Instant postingDate) {
        this.postingDate = postingDate;
    }

    public Instant getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Instant expiryDate) {
        this.expiryDate = expiryDate;
    }

}