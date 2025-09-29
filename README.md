# Gestion des Interventions

This repository contains a full-stack web application for managing intervention requests at the Institut Universitaire Saint Jean (IUSJ). The system allows students to submit requests and track their status, while administrative staff can manage, assign, and resolve these interventions.

The project is divided into two main parts:
*   `InterventionBack`: A RESTful API backend built with Java and Spring Boot.
*   `InterventionFront`: A web client built with Angular.

## Key Features

*   **Dual-Role Authentication**: Secure, token-based (JWT) login system for both students (`Etudiant`) and staff (`Personnel`).
*   **Student Portal**:
    *   Submit detailed intervention requests, categorized by type.
    *   View a history of submitted requests and their current status (`ATTENTE`, `TRAITEMENT`, `TRAITEE`, `ECHEC`).
*   **Staff Portal (Admin)**:
    *   A dashboard summarizing key metrics like total students, staff, and interventions.
    *   View and manage all intervention requests submitted by students.
    *   Take ownership of requests and update their status.
    *   View lists of all registered students and staff members.
    *   Export intervention, student, or staff data to Excel files.
*   **Email Notifications**: Automatically sends emails to students when the status of their intervention request is updated by a staff member.

## Tech Stack

### Backend (`InterventionBack`)
*   **Java 17**
*   **Spring Boot 3**
*   **Spring Security** with JWT for authentication
*   **Spring Data JPA (Hibernate)** for data persistence
*   **MySQL** database
*   **Maven** for dependency management

### Frontend (`InterventionFront`)
*   **Angular 16**
*   **TypeScript**
*   **PrimeNG** for UI components (Tables, Dialogs, Charts, etc.)
*   **Bootstrap** for styling and layout
*   **Axios** for HTTP requests

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following software installed on your machine:
*   Java JDK 17 or higher
*   Maven
*   Node.js and npm
*   MySQL Server

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/ElinorTch/Gestion-des-interventions.git
    cd Gestion-des-interventions
    ```

2.  **Backend Setup (`InterventionBack`):**
    *   Navigate to the backend directory:
        ```sh
        cd InterventionBack
        ```
    *   Create a MySQL database named `isjinterventions`.
    *   Configure your database connection in `src/main/resources/application.properties`. Update the `spring.datasource.username` and `spring.datasource.password` properties with your MySQL credentials.
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/isjinterventions
        spring.datasource.username=root
        spring.datasource.password=
        ```
    *   Run the Spring Boot application using the Maven Wrapper:
        ```sh
        # For Linux/macOS
        ./mvnw spring-boot:run

        # For Windows
        mvnw.cmd spring-boot:run
        ```
    The backend server will start on `http://localhost:8090`.

3.  **Frontend Setup (`InterventionFront`):**
    *   Open a new terminal and navigate to the frontend directory:
        ```sh
        cd InterventionFront
        ```
    *   Install the necessary npm packages:
        ```sh
        npm install
        ```
    *   Run the Angular development server:
        ```sh
        ng serve
        ```
    *   Open your browser and navigate to `http://localhost:4200/`. The application should be running. The frontend is configured to communicate with the backend API at `http://localhost:8090`.
