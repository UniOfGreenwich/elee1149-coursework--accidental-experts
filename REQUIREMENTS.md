# Requirements Engineering

## Checklist

1. [x] Introduction
2. [x] Project Goals and Needs
3. [ ] Software Process Model - In Progress
4. [ ] System Architecture - TODO
5. [ ] Frontend - IN PROGRESS
6. [ ] Backend - IN PROGRESS
7. [ ] Performance Requirements - TODO
8. [ ] Security Requirements - TODO
9. [ ] Testing Requirements - IN PROGRESS
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

- We have chosen to use the Agile model with the scrum methodology framework we will be using 1-week sprints/iterations

### Why did we choose Agile?

- We chose the Agile methodology because it allows us to be flexible and adapt to changes in the project as we go along.
- Agile allows us to work in short iterations which means we can get feedback from stakeholders and make changes
  quickly.
- Agile allows us to work in a team and collaborate on the project together.

### How does Agile align with our project needs and goals?

## 4. Stakeholders

- Job Seekers
    - Job seekers will use the platform to find jobs and interesting opportunities.
- Recruiters
    - Recruiters will use the platform to host job listings and view those who
      apply for the job.

## 5. System Architecture

### Dependencies

## 6. Frontend

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
    - The user will be directed here if an error occurs, informing them that an error has occured,
  as an alternative to dropping them on a blank page.
- Contact Us Page
    - Allows the user to see contact information for .
- Log in Page
    - Users can log in or register for an account here.


### Non-Functional

- Error messages should be clear and informative, guiding users on how to resolve the issue.
- Website should adapt to different size screens.
- The system should be reliable and consistent, giving the users trust that it works correctly.

## 7. Backend

### Functional

#### Programming Language

- We will be making a backend using Springboot and Java
- We will be using a Postgres SQL database

#### Tools

- We will be using Swagger for API documentation
- We will be using Junit for testing
- We will be using Maven for dependency management
- We will be using GCP to host our database
- We will be using SonarQube for code quality
- We will be using Postman/Hoppscotch for API testing

#### Data Requirements

### Non-Functional

## 8. Performance Requirements

- Job search results should load in under 2 seconds.
- Pages should load in under 3 seconds, for user retention.
- The system should be able to handle a large number of concurrent users and job postings without performance degradation.

## 9. Security Requirements

- Passwords should be encrypted and not be stored as plaintext.
- Passwords should require at least one number and capital letter.
- Only authorised users should be able to access their sensitive information.

## 10. Testing Requirements

- Unit Tests
    - Adding unit test will allow us to make sure that when somebody makes a change they have not unexpectedly caused a
    - problem somewhere else in the application
- QA Testing
    - We want to have additional testing to ensure all features that we add to the
      front end are working as expected and not impacting any other areas of the app

## 11. Future Work and Product Maintenance

## 12. References and Appendices

Jędrzejko, K. (2023) 'The importance of software requirements engineering in IT projects,' Software Mind, 6
July. https://softwaremind.com/blog/software-requirements-engineering-the-driving-force-behind-successful-and-efficient-it-projects/.