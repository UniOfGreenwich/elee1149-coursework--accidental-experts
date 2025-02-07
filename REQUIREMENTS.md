# Requirements Engineering

## Checklist

1. [x] Introduction
2. [x] Project Goals and Needs
3. [x] Software Process Model - In Progress
4. [x] System Architecture - TODO
5. [ ] Frontend - IN PROGRESS
6. [x] Backend - IN PROGRESS
7. [ ] Performance Requirements - TODO
8. [ ] Security Requirements - TODO
9. [x] Testing Requirements - IN PROGRESS
10. [ ] Future Work and Product Maintenance - TODO
11. [ ] References and Appendices - TODO

## 1. Introduction

Requirements engineering is a key part of the software development process, where we identify, document and maintain
requirements for the project.
A full requirements engineering process involves elicitation, analysis, description and verification to make sure that
the project is able to meet all the expectations of the stakeholders (Jędrzejko, 2023).
With the limited resources we have we are going to create a requirements document that outlines the key requirements for
***Set Project name***. The document will act as a reference for the developers when creating features and components
for the project.
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
    - 2.3 - The front end should be accessible to all users including people with disabilities by utilising tools like
      screen readers and keyboard navigation.
    - 2.4 - The front end should be visually appealing and follow a design system that is consistent throughout the
      application.
    - 2.5 - The front end application should work with the backend application to send and retrieve data while making
      sure only the right data is being sent, received and shown.
    - 2.6 - The front end should be able to display and handle any errors retrieved from the backend


- Have a stable backend that runs our endpoints and allows our front end to communicate with the database.

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
Using an agile methodology with 2-week sprints allows us to prioritise our most valuable features and plan our spritns
so that we can build the application step by step. If we wasn't using agile we could see tickets start being picked
up where prior work hadn't been completed leading to unstable and untidy code.


## 4. Stakeholders

- Job Seekers
    - Job seekers will use the platform to find jobs and interesting opportunities.
- Recruiters
    - Recruiters will use the platform to host job listings and view those who
      apply for the job.
- The Project Team
    - the team working on the project want to deliver a high quality, well documented application

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
- Contact Us Page
    - Allows the user to see contact information for .
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
Backend Hosting: Locally
API Documentation: Swagger
API Testing Hopscotch
Code Quality; SonarQube
Testing: Junit
Dependency Management: Maven
Continuous Implementation Pipeline: GitHub Actions

#### Data Requirements
### 1. Users
| Attribute Name      | Data Type                       | Constraints       | Description                                      |
|----------------------|---------------------------------|-------------------|--------------------------------------------------|
| `user_id`           | INT                             | PRIMARY KEY,      | Each Users unique identification Number          |
| `username`          | VARCHAR(255)                    | UNIQUE, NOT NULL  | Unique users Username                            |
| `email`             | VARCHAR(255)                    | UNIQUE, NOT NULL, | Unique Users Email                               |
| `password_hash`     | VARCHAR(255)                    | NOT NULL          | Hashed password for security                     |
| `first_name`        | VARCHAR(255)                    |                   | Unique user's first name                         |
| `last_name`         | VARCHAR(255)                    |                   | Unique user's last name                          |
| `role`              | ENUM ('jobSeeker', 'recruiter') | NOT NULL          | User's role/ account type                        |
| `registration_date` | TIMESTAMP                       |                   | Date of Users registration                       |
| `profile_picture`   | VARCHAR(255)                    |                   | URL/storage destination of Users profile picture |

### Non-Functional
Please see section 7, 8, and 9 for our combined performance, security and testing requirements.

- The application should be resistant to errors to allow a good integration with the user. however, any errors should be
  well handled allowing the user to understand the issue.
- The codebase should have a high level of documentation and a well-structured design which is easily able to be kept up
  to date
- All APIs should have good documentation and well-designed to allow other developers to understand what they do allowing
  front-end engineers to easily integrate them within the system

## 7. Performance Requirements

- Job search results should load in under 2 seconds.
- Pages should load in under 3 seconds, for user retention.
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

## 11. References and Appendices

Jędrzejko, K. (2023) 'The importance of software requirements engineering in IT projects,' Software Mind, 6
July. https://softwaremind.com/blog/software-requirements-engineering-the-driving-force-behind-successful-and-efficient-it-projects/.