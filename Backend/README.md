# Backend Repository Setup Guide

This guide provides step-by-step instructions to set up and run the backend of the job recruitment application. The backend is built using the **Spring Boot** framework and is designed to handle business logic, user authentication, job posting management, and more.

---

## Prerequisites

Before setting up the backend, ensure you have the following installed on your system:

1. **Java Development Kit (JDK)** (version 21 or higher)  
   [Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)

2. **Gradle** (for dependency management and building the project)  
   [Download Maven](https://gradle.org/install/)

3. **PostgreSQL** (for the database)  
   [Download PostgreSQL](https://www.postgresql.org/download/)

4. **Google Cloud SDK** (if deploying to GCP)  
   [Download Google Cloud SDK](https://cloud.google.com/sdk/docs/install)

---

## Steps to Set Up the Backend

### 1. Clone the Repository
Clone the backend repository to your local machine:
```bash
git clone https://github.com/UniOfGreenwich/elee1149-coursework--accidental-experts.git
cd backend
```
### 2. Configure database
Either connect to the GCP instance through application.properties.
```
spring.datasource.url=database_url
spring.datasource.username=your_username
spring.datasource.password=your_password
```


3. Deploy to GCP
Use the command below to deploy any changes to gcp where build packs will containerise the application and deploy the app to cloud run.
```Bash
gcloud run deploy --source .   
```
A guide for deploying it can also be found here
https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-java-service

## Configuring the Database
The below code was used to create the database in a postgres gcp instance.
```
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_type TEXT NOT NULL CHECK (user_type IN ('job_seeker', 'employer')),
    registration_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Employers (
    employer_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_website VARCHAR(255),
    company_description TEXT
);

CREATE TABLE Jobs (
    job_id SERIAL PRIMARY KEY,
    employer_id INTEGER REFERENCES Employers(employer_id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2),
    employment_type TEXT NOT NULL CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
    posting_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE Applications (
    application_id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES Jobs(job_id) NOT NULL,
    user_id INTEGER REFERENCES Users(user_id) NOT NULL,
    application_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    application_status TEXT NOT NULL CHECK (application_status IN ('applied', 'interviewing', 'rejected', 'offered', 'hired'))
);

CREATE TABLE CVs (
    cv_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(20),
    linkedin_profile VARCHAR(255),
    github_profile VARCHAR(255),
    personal_statement TEXT,
    education_details JSONB,
    work_experience JSONB,
    skills JSONB,
    awards_and_recognition TEXT,
    projects TEXT,
    languages TEXT,
    references TEXT
);


CREATE TABLE Skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE JobSkills (
    job_id INTEGER REFERENCES Jobs(job_id) NOT NULL,
    skill_id INTEGER REFERENCES Skills(skill_id) NOT NULL,
    PRIMARY KEY (job_id, skill_id)
);

CREATE TABLE UserSkills (
    user_id INTEGER REFERENCES Users(user_id) NOT NULL,
    skill_id INTEGER REFERENCES Skills(skill_id) NOT NULL,
    PRIMARY KEY (user_id, skill_id)
);
```