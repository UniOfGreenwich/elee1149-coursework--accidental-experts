package org.accidental.experts.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "cvs")
public class Cv {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cvs_id_gen")
    @SequenceGenerator(name = "cvs_id_gen", sequenceName = "cvs_cv_id_seq", allocationSize = 1)
    @Column(name = "cv_id", nullable = false)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "linkedin_profile")
    private String linkedinProfile;

    @Column(name = "github_profile")
    private String githubProfile;

    @Column(name = "personal_statement", length = Integer.MAX_VALUE)
    private String personalStatement;

    @Column(name = "education_details")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> educationDetails;

    @Column(name = "work_experience")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> workExperience;

    @Column(name = "skills")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> skills;

    @Column(name = "awards_and_recognition", length = Integer.MAX_VALUE)
    private String awardsAndRecognition;

    @Column(name = "projects", length = Integer.MAX_VALUE)
    private String projects;

    @Column(name = "languages", length = Integer.MAX_VALUE)
    private String languages;

    @Column(name = "references_cv", length = Integer.MAX_VALUE)
    private String referencesCv;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getLinkedinProfile() {
        return linkedinProfile;
    }

    public void setLinkedinProfile(String linkedinProfile) {
        this.linkedinProfile = linkedinProfile;
    }

    public String getGithubProfile() {
        return githubProfile;
    }

    public void setGithubProfile(String githubProfile) {
        this.githubProfile = githubProfile;
    }

    public String getPersonalStatement() {
        return personalStatement;
    }

    public void setPersonalStatement(String personalStatement) {
        this.personalStatement = personalStatement;
    }

    public Map<String, Object> getEducationDetails() {
        return educationDetails;
    }

    public void setEducationDetails(Map<String, Object> educationDetails) {
        this.educationDetails = educationDetails;
    }

    public Map<String, Object> getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(Map<String, Object> workExperience) {
        this.workExperience = workExperience;
    }

    public Map<String, Object> getSkills() {
        return skills;
    }

    public void setSkills(Map<String, Object> skills) {
        this.skills = skills;
    }

    public String getAwardsAndRecognition() {
        return awardsAndRecognition;
    }

    public void setAwardsAndRecognition(String awardsAndRecognition) {
        this.awardsAndRecognition = awardsAndRecognition;
    }

    public String getProjects() {
        return projects;
    }

    public void setProjects(String projects) {
        this.projects = projects;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getReferencesCv() {
        return referencesCv;
    }

    public void setReferencesCv(String referencesCv) {
        this.referencesCv = referencesCv;
    }

}