# Requirements Engineering

## 1. Introduction

Requirements engineering is a key part of the software development process, where we identify, document and maintain
requirements for the project.
A full requirements engineering process involves elicitation, analysis, description and verification to make sure that
the project is able to meet all the expectations of the stakeholders (Jędrzejko, 2023).
With the limited resources we have we are going to create a requirements document that outlines the key requirements for
the ***Accidentally Unemployed*** website. The document will act as a reference for the developers when creating features
and components for the project.
Requirements are not always set in stone and this document may dynamically update over time as the development team
learns more about the requirements and how feasible they are.

The functional and non-functional requirements for both the frontend and backend will be identified and documented here.
We will outline and justify the
major decisions we made such as hosting our database, why we chose a certain approach or framework, the application
design process and how we will ensure the system is secure and performs well.

This Document contains the following sections:

* **Project Goals and Needs:** A brief description of what the project aims to achieve and create.
* **Software Process Model:** What is our chosen Software Process Model and why did we choose it?
* **System Architecture:** An overview of the systems structure and dependencies and how the components and features
  will work with each other.
* **Frontend:** Requirements for the Frontend website
* **Backend:** Requirements for the Backend database and API tools
* **Performance Requirements:** How will we ensure our system performs well?
* **Security Requirements:** How will we keep our system secure?
* **Testing Requirements:** What testing will we do and why?
* **Future Work and Product Maintenance:** How will we uphold and maintain the product as well as how we can improve the
  product with features.
* **References and Appendices:** A place to document any references or additional information.

## 2. Project Goals and Needs

- 1.0 - Host a postgress SQL database externally so that it is always live and ready to be updated whenever we develop
  or
  use the website.


- 2.0 - Have a fully functioning front end with a user interface that is user-friendly, responsive, accessible and
  visually
  appealing.
    - 2.1 - The front end should be done in a way that it meets the coding standards of the web development industry,
      each page should be semantically correct.
    - 2.2 - The front end should be responsive and work on all devices, with the aim to create a mobile first
      application
    - 2.3 - The front end should be visually appealing and follow a design system that is consistent throughout the
      application.
    - 2.4 - The front end application should work with the backend application to send and retrieve data while making
      sure only the right data is being sent, received and shown.
    - 2.5 - The front end should be able to display and handle any errors retrieved from the backend


- Have a stable backend hosted on the Google Cloud Platform that runs our endpoints and allows our front end to communicate with the database.

## 3. Software Process Model

### What did we choose?

- We have chosen to use the Agile model with the scrum methodology framework we will be using 2-week sprints/iterations

### Why did we choose Agile?

- We chose the Agile methodology because it allows us to be flexible and adapt to changes in the project as we go along.
  This means we will be able to quickly adapt to any feedback from other team members or Seb as he monitors our progress
  through PRs as well as any unexpected changes in our requirements.
- Agile allows us to work in short iterations which means we can get feedback from stakeholders and make changes
  quickly.
- Agile allows us to work in a team and collaborate on the project together. Collaboration is good to practice within
  building a product allowing the team to stay on the same page and mention when something isn't how it should be.
- Select ceremonies allow us to stay communicated and plan for the weeks ahead, this allows us to stay on top of our
  work and not fall behind.

### How does Agile align with our project needs and goals?
Using an agile methodology with 2-week sprints allows us to prioritise our most valuable features and plan our sprints
so that we can build the application step by step. If we wasn't using agile we could see tickets start being picked
up where prior work hadn't been completed leading to unstable and untidy code.


## 4. Stakeholders

- Job Seekers
    - Job seekers will use the platform to find jobs and interesting opportunities.
- Recruiters
    - Recruiters will use the platform to host job listings and view those who
      apply for the job.
- The Project Team
    - The team working on the project want to deliver a high quality, well documented application

## 5. Frontend

### Functional

#### Programming Language

We will be making a frontend using React

#### Screens

- Landing Page
    - User can see the purpose of the website and what it does. This page will have different
      view depending on if being used for job-seeking or recruitment.
- Job Search Page
    - Allows user to search for jobs, regardless of whether they are logged in or out.
- Job Seeker Dashboard
    - Allows user to set up, edit and view their profile.
    - Allows user to upload and delete their CV.
    - Allows user to leave company or job reviews.
    - Allows user to view favourite jobs.
    - Allows user to view favourite companies.
    - Allows user to view their feedback provided by recruiters on applications.
- Recruiter Dashboard
    - Allows recruiter to review job listings.
    - Allows recruiter to view the candidates that have applied to the jobs.
    - Allows recruiter to create job listings for their organisation(s).
    - Allows recruiter to give feedback to applicants.
- Error Screen
    - The user will be directed here if an error occurs, informing them that an error has occurred,
      as an alternative to dropping them on a blank page.
- Log in Page
    - Users can log in or register for an account here.


### Non-Functional

- Error messages should be clear and informative, guiding users on how to resolve the issue.
- Website should adapt to different size screens.
- The system should be reliable and consistent, giving the users trust that it works correctly.

## 6. Backend

### Functional

Our backend service will act as a secure API gateway between the front end application and the database. There will be a
collection of endpoints to allow interaction between the Postgres database and React frontend. All interactions will be
protected using authentication to ensure no 'outsiders' gain access to the contents of our database

#### Programming Language and Database

- We will be making a backend using Springboot and Java. We feel that the features of Java combined with the teams
  experience with using the programming language just gives the edge over Kotlin
- We will be using a Postgres SQL database. We chose postgresSQl due some of the features that it offered. Such as the
  fact it has ACID properties which ensure the integrity and reliability of our data

#### Tools

Database Hosting: Google Cloud Platform
Website Hosting: GitHub Pages
Backend Hosting: Google Cloud Platform
API Documentation: Swagger
API Testing Hopscotch
Code Quality; SonarLint (locally)
Testing: Junit
Dependency Management: Maven
Continuous Implementation Pipeline: GitHub Actions

#### Data Requirements
## Database Schema Documentation

Here's a breakdown of the tables used in this application:

### 1. Users

This table stores information about registered users, including both job seekers and employers also having a way to differentiate them.

| Attribute Name      | Data Type                   | Constraints                               | Description                                       |
| :------------------ |:----------------------------| :---------------------------------------- | :------------------------------------------------ |
| `user_id`           | SERIAL                      | PRIMARY KEY                               | Unique identifier for each user.                  |
| `username`          | VARCHAR(255)                | UNIQUE, NOT NULL                          | User's unique login name.                         |
| `password`          | VARCHAR(255)                | NOT NULL                                  | User's password (should be securely hashed).      |
| `email`             | VARCHAR(255)                | UNIQUE, NOT NULL                          | User's unique email address.                      |
| `first_name`        | VARCHAR(255)                | NOT NULL                                  | User's first name.                                |
| `last_name`         | VARCHAR(255)                | NOT NULL                                  | User's last name.                                 |
| `user_type`         | TEXT                        | NOT NULL, CHECK (`job_seeker`, `employer`) | Type of user account.                             |
| `registration_date` | TIMESTAMP WITHOUT TIME ZONE | DEFAULT CURRENT_TIMESTAMP                 | Date and time the user registered.                |

### 2. Employers

This table stores details specific to users who are employers.

| Attribute Name        | Data Type    | Constraints | Description                         |
| :-------------------- | :----------- |:------------| :---------------------------------- |
| `employer_id`         | SERIAL       | PRIMARY KEY | Unique identifier for each employer. |
| `company_name`        | VARCHAR(255) | NOT NULL    | Name of the employer's company.     |
| `company_website`     | VARCHAR(255) | NONE        | URL of the company's website.       |
| `company_description` | TEXT         | NONE        | A description of the company.       |

### 3. Jobs

This table contains information about ALL job listings created by employers.

| Attribute Name    | Data Type                   | Constraints                                                          | Description                                               |
| :---------------- | :-------------------------- |:---------------------------------------------------------------------| :-------------------------------------------------------- |
| `job_id`          | SERIAL                      | PRIMARY KEY                                                          | Unique identifier for each job posting.                   |
| `employer_id`     | INTEGER                     | NOT NULL, FOREIGN KEY (Employers)                                    | Links to the employer who posted the job.                 |
| `title`           | VARCHAR(255)                | NOT NULL                                                             | Title of the job position.                                |
| `description`     | TEXT                        | NOT NULL                                                             | Detailed description of the job role and responsibilities. |
| `location`        | VARCHAR(255)                | NOT NULL                                                             | Location where the job is based.                          |
| `salary`          | DECIMAL(10, 2)              | NONE                                                                 | Offered salary for the position (optional).               |
| `employment_type` | TEXT                        | NOT NULL, CHECK (`full-time`, `part-time`, `contract`, `internship`) | Type of employment (e.g., full-time, contract).       |
| `posting_date`    | TIMESTAMP WITHOUT TIME ZONE | DEFAULT CURRENT_TIMESTAMP                                            | Date and time the job was posted.                         |
| `expiry_date`     | TIMESTAMP WITHOUT TIME ZONE | NOT NULL                                                             | Date the job posting expires.                             |

### 4. Applications

This table tracks job applications submitted by users.

| Attribute Name       | Data Type                   | Constraints                                                       | Description                                              |
| :------------------- | :-------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------- |
| `application_id`     | SERIAL                      | PRIMARY KEY                                                       | Unique identifier for each application.                  |
| `job_id`             | INTEGER                     | NOT NULL, FOREIGN KEY (Jobs)                                      | Links to the job being applied for.                      |
| `user_id`            | INTEGER                     | NOT NULL, FOREIGN KEY (Users)                                     | Links to the user (job seeker) who applied.              |
| `application_date`   | TIMESTAMP WITHOUT TIME ZONE | DEFAULT CURRENT_TIMESTAMP                                         | Date and time the application was submitted.             |
| `application_status` | TEXT                        | NOT NULL, CHECK (`applied`, `interviewing`, `rejected`, `offered`, `hired`) | Current status of the job application.                   |

### 5. CVs

This table stores detailed resume information for job seekers.

| Attribute Name         | Data Type    | Constraints                   | Description                                                       |
| :--------------------- | :----------- |:------------------------------| :---------------------------------------------------------------- |
| `cv_id`                | SERIAL       | PRIMARY KEY                   | Unique identifier for each CV.                                    |
| `user_id`              | INTEGER      | NOT NULL, FOREIGN KEY (Users) | Links to the user who owns this CV.                               |
| `first_name`           | VARCHAR(255) | NOT NULL                      | First name as listed on the CV.                                   |
| `last_name`            | VARCHAR(255) | NOT NULL                      | Last name as listed on the CV.                                    |
| `email`                | VARCHAR(255) | NONE                          | Contact email address from the CV.                                |
| `phone_number`         | VARCHAR(20)  | NONE                          | Contact phone number from the CV.                                 |
| `linkedin_profile`     | VARCHAR(255) | NONE                          | URL to the user's LinkedIn profile.                               |
| `github_profile`       | VARCHAR(255) | NONE                          | URL to the user's GitHub profile.                                 |
| `personal_statement`   | TEXT         | NONE                          | Personal summary or objective statement.                          |
| `education_details`    | JSONB        | NONE                          | Structured data (JSON) detailing educational background.          |
| `work_experience`      | JSONB        | NONE                          | Structured data (JSON) detailing work history.                    |
| `skills`               | JSONB        | NONE                          | Structured data (JSON) listing skills.                            |
| `awards_and_recognition`| TEXT         | NONE                          | Text describing any awards or recognition.                        |
| `projects`             | TEXT         | NONE                          | Text describing personal or professional projects.                |
| `languages`            | TEXT         | NONE                          | Text listing languages spoken and proficiency.                    |
| `references`           | TEXT         | NONE                          | Information about references (e.g., "Available upon request"). |

### 6. Skills

This table provides a list of skills that can be associated with jobs or users.

| Attribute Name | Data Type    | Constraints      | Description                         |
| :------------- | :----------- | :--------------- | :---------------------------------- |
| `skill_id`     | SERIAL       | PRIMARY KEY      | Unique identifier for each skill.   |
| `skill_name`   | VARCHAR(255) | UNIQUE, NOT NULL | Name of the skill (e.g., 'Python'). |

### 7. JobSkills

This is a junction table linking skills from the `Skills` table to specific job postings in the `Jobs` table.

| Attribute Name | Data Type | Constraints                                  | Description                                  |
| :------------- | :-------- | :------------------------------------------- | :------------------------------------------- |
| `job_id`       | INTEGER   | NOT NULL, FOREIGN KEY (Jobs), PRIMARY KEY    | Links to the job requiring the skill.        |
| `skill_id`     | INTEGER   | NOT NULL, FOREIGN KEY (Skills), PRIMARY KEY | Links to the skill required by the job.      |

### 8. UserSkills

This is a junction table linking skills from the `Skills` table to specific users in the `Users` table.

| Attribute Name | Data Type | Constraints                                  | Description                                  |
| :------------- | :-------- | :------------------------------------------- | :------------------------------------------- |
| `user_id`      | INTEGER   | NOT NULL, FOREIGN KEY (Users), PRIMARY KEY   | Links to the user possessing the skill.      |
| `skill_id`     | INTEGER   | NOT NULL, FOREIGN KEY (Skills), PRIMARY KEY | Links to the skill possessed by the user.    |


### Non-Functional
Please see section 7, 8, and 9 for our combined performance, security and testing requirements.

- The application should be resistant to errors to allow a good integration with the user. however, any errors should be
  well handled allowing the user to understand the issue.
- The codebase should have a high level of documentation and a well-structured design which is easily able to be kept up
  to date
- All APIs should have good documentation and well-designed to allow other developers to understand what they do allowing
  front-end engineers to easily integrate them within the system

## 7. Performance Requirements

- Job search results should load in under 5 seconds.
- Pages should load in under 5 seconds, for user retention.
- The system should be able to handle a large number of concurrent users and job postings without performance degradation.

## 8. Security Requirements

- Passwords should be encrypted and not be stored as plaintext.
- Passwords should require at least one number and capital letter.
- Only authorised users should be able to access their sensitive information.

## 9. Testing Requirements

- Unit Tests
    - Adding unit test will allow us to make sure that when somebody makes a change they have not unexpectedly caused a
      problem somewhere else in the application
- QA Testing
    - We want to have additional testing to ensure all features that we add to the
      front end are working as expected and not impacting any other areas of the app
- End to End Testing
    - End to End testing covers the whole application flow from start to finish, this will allow us to make sure there
      are no errors in our application and to ensure that the features are working seamlessly

## 10. Future Work and Product Maintenance

If we had more time to develop the application there are a lot of features we would have added:
- CV upload
- More intuitive job application form
- better tracking of the status of your job application
-

## 11. References and Appendices

Jędrzejko, K. (2023) 'The importance of software requirements engineering in IT projects,' Software Mind, 6
July. https://softwaremind.com/blog/software-requirements-engineering-the-driving-force-behind-successful-and-efficient-it-projects/.
