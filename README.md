# ELEE1149-Project-Template

## Installaling the frontend application

Navigate to the the following directory usinng the commands below:

```
cd Frontend/accidental-experts-frontend
```

Before running the project it is important to have NPM(Node Package Manager) installed on your device. Once you have NPM and node.js configured on your device run the following command in your terminal.

### Recommended node version

- node.js: v20.15.0
- NPM: v10.8.2

<<<<<<< Updated upstream
```bash
  npm install
  npm run start
```
=======
## Future Work
- **Profile Management**: Allow users to update and manage their profiles after creation.
- **Job Tracking**: Implement functionality for job seekers to track their applications.
- **Enhanced Security**: Add features like password recovery, two-factor authentication, etc.
- **Notifications**: Implement email or in-app notifications for job application updates.
- **Search and Filter**: Improve job search functionality with advanced filters.

## To Do
- **Profile Management**:
    - Add endpoints for updating user profiles.
    - Create frontend components for profile management.

- **Job Tracking**:
    - Implement backend logic for tracking job applications.
    - Create frontend components to display application status.

- **Enhanced Security**:
    - Implement password recovery feature.
    - Add two-factor authentication.

- **Notifications**:
    - Set up email notifications for job application updates.
    - Implement in-app notifications.

- **Search and Filter**:
    - Enhance job search with filters for location, salary, job type, etc.
## Technologies Used
- **Backend:**
    - Java 21
    - Spring Boot
    - Gradle
- **Frontend:**
    - React
    - TypeScript
    - JavaScript
    - npm

## Backend Setup

### Prerequisites
- Java 21
- Gradle 6.8 or higher

## Running the Application
The frontend application is hosted on GitHub Pages, and the backend API and database are hosted on Google Cloud Platform (GCP). Users do not need to run the applications locally to use them.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Navigate to the backend directory:
    ```bash
    cd Backend/accidental-experts-backend
    ```

### Running the Backend
1. Update Application.properties with the relevent database inforation

2. Start the backend server:
    ```bash
    ./gradlew bootRun
    ```

3. The backend server will be running at `http://localhost:8080`.

## Frontend Setup

If you want to run the frontend application locally, you do not need to run the backend locally as the application is configured to use the deployed version on GCP.

### Prerequisites
- Node.js v20.15.0
- npm v10.8.2

### Installation
1. Navigate to the frontend directory:
    ```bash
    cd Frontend/accidental-experts-frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Frontend
1. Start the frontend application:
    ```bash
    npm run start
    ```

2. The frontend application will be running at `http://localhost:3000`.

## License

The project is licensed under the MIT License (MIT License, 2023).

Copyright (c) 2023 James Pittman, Nishal Patel, Harry Gately, and Sam Lawrence

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## References
MIT License. (2023). Available at: https://opensource.org/licenses/MIT (Accessed: 21 March 2025).
>>>>>>> Stashed changes
