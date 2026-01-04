# Exptrackz Project Report
# Mohamed Aziz Mejbri

> French version will soon be generated in report-fr.md

## Summary / Abstract
Exptrackz is a web-based expense tracking application designed to help users manage their personal finances efficiently. The application allows users to authenticate securely, log expenses and revenues, visualize financial trends through charts and graphs, receive notifications when budgets are exceeded, and generate reports in multiple formats including PDF, CSV, Markdown, JSON, and HTML. The main objectives of the project were to provide an intuitive and interactive platform for personal finance management, automate financial monitoring, and offer flexible reporting tools. The results include a fully functional web application that successfully meets the user's financial tracking and reporting needs.

---
## Index

1. [Introduction](#introduction)  
2. [Needs Analysis](#needs-analysis)  
   2.1 [User Description](#user-description)  
   2.2 [Expected Functionalities](#expected-functionalities)  
   2.3 [Technical Constraints](#technical-constraints)  

3. [Specifications](#specifications-cahier-de-charge)  
   3.1 [Minimal Functionalities](#minimal-functionalities)  
   3.2 [Optional Functionalities](#optional-functionalities)  
   3.3 [Use Case Diagram](#use-case-diagram)  

4. [Conception and Architecture](#conception-and-architecture)  
   4.1 [Technical Choices](#technical-choices)  
   4.2 [System Architecture](#system-architecture)  

5. [Development and Realisation](#development-and-realisation)  
   5.1 [Frontend Modules](#frontend-modules)  
   5.2 [Backend Modules](#backend-modules)  
   5.3 [Screenshots](#screenshots)  
   5.4 [Code Snippets](#code-snippets)  

6. [Tests and Validation](#tests-and-validation)  

7. [Conclusions and Perspective](#conclusions-and-perspective)  
   7.1 [Conclusions](#conclusions)  
   7.2 [Perspectives and Improvements](#perspectives-and-improvements)  
   7.3 [Required Teachings](#required-teachings)  

8. [Bibliography / References](#bibliography-%2F-references)  
   8.1 [TypeScript](#typescript)  
   8.2 [Angular](#angular)  
   8.3 [PostgreSQL](#postgresql)  
   8.4 [Docker and Docker Compose](#docker-and-docker-compose)  
   8.5 [Git](#git)  
   8.6 [Java](#java)  
   8.7 [Spring Boot](#spring-boot)  
   8.8 [Swagger / OpenAPI for Spring Boot](#swagger-%2F-openapi-for-spring-boot)  
   8.9 [Server-Client Website Design](#server-client-website-design)  
---

## Introduction
### Context
In the modern world, managing personal finances has become increasingly complex due to diverse income sources, varying expenses, and the need for financial planning. Many individuals lack simple and efficient tools to track their daily financial activities and analyze spending trends.  

### Problem
Existing solutions are either too simplistic, offering only basic tracking, or overly complex, making them difficult for average users to operate. Additionally, integration of multi-format reporting and real-time notifications remains limited in most applications.  

### Motivation
The motivation behind Exptrackz was to create a user-friendly platform that combines comprehensive financial tracking, insightful analytics, and customizable reporting in a single application.  

### Objectives
- Enable secure user authentication and account management.  
- Allow logging of both expenses and revenues.  
- Visualize financial trends with charts and graphs.  
- Notify users when their spending exceeds defined budgets.  
- Generate detailed financial reports in PDF, CSV, Markdown, JSON, and HTML formats.  
- Provide a responsive, intuitive, and interactive interface for better user experience.

---

## Needs Analysis
### User Description
The primary users of Exptrackz are individuals seeking better control over their personal finances. They may include students, professionals, and households who wish to:  
- Track daily expenses and revenues.  
- Monitor budget limits.  
- Analyze spending patterns over time.  
- Export financial data for reporting or accounting purposes.

### Expected Functionalities
- Secure user authentication and authorization.  
- Expense and revenue logging with categories and descriptions.  
- Budget management and threshold notifications.  
- Graphical representations: pie charts, bar charts, line charts for trends.  
- Report generation and export in multiple formats.  

### Technical Constraints
- Cross-platform web application.  
- Responsive design for desktop users.  
- Secure storage of user credentials and financial data.  
- Reliable integration with PostgreSQL for persistent data storage.  
- Docker and Docker Compose for consistent deployment and container management.

---

## Specifications (Cahier de Charge)
### Minimal Functionalities
- User authentication and profile management.  
- Add, edit, and delete expenses and revenues.  
- View summary dashboard with total income, expenses, and balance.  
- Generate reports in at least one export format (PDF).  

### Optional Functionalities
- Multi-format report export (PDF, CSV, Markdown, JSON, HTML).  
- Budget alerts and notifications when thresholds are exceeded.  
- Trend analysis with charts and graphs.  
- Filtering and categorization of expenses and revenues.  

### Use Case Diagram
```plantuml

@startuml
left to right direction


skinparam backgroundColor #0d1117
skinparam defaultTextColor white
skinparam shadowing false
skinparam ArrowColor white
skinparam ArrowThickness 2
skinparam LineThickness 1

skinparam Actor {
  BackgroundColor #0d1117
  BorderColor white
  FontColor white
}

skinparam UseCase {
  BackgroundColor #0d1117
  BorderColor white
  FontColor white
}

skinparam Rectangle {
  BackgroundColor #0d1117
  BorderColor white
  FontColor white
}
actor User 

rectangle Exptrackz {
  (Login / Registration) as Login
  (Add Expense)
  (Add Income)
  (View Dashboard)
  (Set Budget)
  (Receive Notifications)
  (Generate Reports)
  (View Charts)
}

User --> (Add Expense)          
User --> (Add Income)           
User --> (View Dashboard)           
User --> (Set Budget)               
User --> (Receive Notifications)
User --> (Generate Reports)         
User --> (View Charts)                  

(Add Expense)           ..> (Login): <>
(Add Income)            ..> (Login): <>
(View Dashboard)        ..> (Login): <> 
(Set Budget)            ..> (Login): <> 
(Receive Notifications) ..> (Login): <>
(Generate Reports)      ..> (Login): <> 
(View Charts)           ..> (Login): <> 


@enduml
```


> If the plantUML script is not rendering the use case diagram then:
> ![useCaseDiagram](./assets/images/useCaseDiagram.png)

## Conception and Architecture
### Technical Choices
- Backend: Spring Boot (Java) for robust, scalable, and maintainable API development.

- Frontend: Angular for dynamic and responsive single-page application experience.

- Database: PostgreSQL for secure and reliable data storage with relational integrity.

- Containerization: Docker and Docker Compose for environment consistency, easy deployment, and scalability.

- Git: Git for version control

#### Justification 

##### Angular (Frontend)
- Angular provides a **robust, component-based architecture** that allows building dynamic, maintainable, and scalable single-page applications (SPA).  
- Its built-in **data binding, dependency injection, and modularity** enable efficient handling of complex UI interactions such as charts, dashboards, and reactive forms.  
- Angular integrates seamlessly with RESTful APIs, making it ideal for communicating with the Spring Boot backend.  

##### Spring Boot (Backend)
- Spring Boot simplifies backend development by providing **ready-to-use frameworks for REST APIs, authentication, and database connectivity**.  
- It offers **strong security features** including JWT integration, which is essential for handling access tokens and refresh tokens in Exptrackz.  
- Spring Boot's scalability and extensive ecosystem allow rapid development of business logic, services, and secure data operations.  

##### Docker and Docker Compose (Containerization)
- Docker ensures that the application runs in **isolated, consistent environments** regardless of the host system, eliminating “it works on my machine” issues.  
- Docker Compose allows easy orchestration of multiple containers (frontend, backend, database), **simplifying deployment and testing**.  
- Containerization ensures **portability, scalability, and maintainability**, which is crucial for a full-stack application like Exptrackz.  

##### Git (Version Control)
- Git provides **robust version control** for tracking changes and maintaining project history.  
- It allows the implementation of **branches, commits, and pull requests**, which enhances the development workflow and ensures safe code management.  
- Integration with platforms like GitHub facilitates **continuous integration and deployment**, aligning with modern DevOps practices.  

**In summary:**  
This technology stack (Angular + Spring Boot + Docker + Docker Compose + Git) ensures a **secure, scalable, maintainable, and deployable full-stack application**. It combines frontend interactivity, backend reliability, database integrity, containerized deployment, and modern development workflow, which together make Exptrackz robust and user-friendly.


#### System Architecture
The system follows a standard client-server architecture:

- Frontend (Angular): Handles user interactions, form submissions, chart rendering, and report generation. Communicates with the backend via RESTful APIs.

- Backend (Spring Boot): Manages authentication, business logic, database operations, and report formatting. Provides endpoints for all frontend requests.

- Database (PostgreSQL): Stores user credentials, expenses, revenues, budgets, and metadata for reports.

- Container Management (Docker & Docker Compose): Ensures the application runs consistently across environments and simplifies deployment with isolated containers for backend, frontend, and database.


### UML Diagrams

#### Class Diagram 
This diagram represesnt sthe objects' data structure
```mermaid
classDiagram
    %% Base class
    class Transaction {
        <<abstract>>
        -Double amount
        -Date creationDate
        -Date lastModified
        -User user
        +getAmount(): Double
        +setAmount(amount: Double)
        +getCreationDate(): Date
        +setCreationDate(date: Date)
        +getLastModified(): Date
        +setLastModified(date: Date)
        +getUser(): User
        +setUser(user: User)
    }

    %% Subclasses
    class Expense {
        -Long Id
        -String category
        +getId(): Long
        +setId(id: Long)
        +getCategory(): String
        +setCategory(category: String)
    }

    class Revenue {
        -Long id
        -String source
        +getId(): Long
        +setId(id: Long)
        +getSource(): String
        +setSource(source: String)
    }

    %% User class
    class User {
        -Long id
        -String username
        -String email
        -String password
        -List~Expense~ expenses
        -List~Revenue~ revenues
        +getId(): Long
        +setId(id: Long)
        +getUsername(): String
        +setUsername(username: String)
        +getEmail(): String
        +setEmail(email: String)
        +getPassword(): String
        +setPassword(password: String)
        +getExpenses(): List~Expense~
        +setExpenses(expenses: List~Expense~)
        +getRevenues(): List~Revenue~
        +setRevenues(revenues: List~Revenue~)
        +toDTO(): UserDTO
    }

    %% Inheritance
    Expense --|> Transaction
    Revenue --|> Transaction

    %% Associations
    User "1" -- "0..*" Transaction : owns

```


> 1. **Transaction** is abstract, and both **Expense** and **Revenue** inherit from it.  
> 2. **User** has a **one-to-many** relationship with both Expense and Revenue.  
> 3. Associations show ownership (User → Transactions).  


#### Sequence Diagram 
This diagram shows how the actions of the system happen

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Angular Component
    participant TransactionService
    participant Backend as SpringBoot API
    participant Database as PostgreSQL

    Note over User, Frontend: User is authenticated and has access_token & refresh_token in cookies

    User->>Frontend: Clicks / requests data (fetch, add, update, delete)
    Frontend->>TransactionService: Call service method
    TransactionService->>Backend: Send HTTP request with access_token
    alt Access token valid
        Backend->>Backend: Validate userId vs requested data
        Backend->>Database: Fetch/Modify/Delete data
        Database-->>Backend: Return data/status
        Backend-->>TransactionService: Response with data/status
        TransactionService-->>Frontend: Return data
        Frontend-->>User: Render or store data
    else Access token invalid
        Backend-->>TransactionService: 401 Unauthorized
        TransactionService-->>Frontend: Reject request
        Frontend-->>User: Show error / redirect to login
    else Access token expired but refresh token valid
        Frontend->>Backend: Call /auth/login/refresh with refresh_token
        Backend->>Backend: Validate refresh token
        Backend-->>Frontend: Return new access_token & refresh_token
        Frontend->>TransactionService: Retry original request with new access_token
        TransactionService->>Backend: Send request
        Backend->>Database: Fetch/Modify/Delete data
        Database-->>Backend: Return data/status
        Backend-->>TransactionService: Response with data/status
        TransactionService-->>Frontend: Return data
        Frontend-->>User: Render or store data
    end
```


> 1. **User interactions** go through the **Angular frontend**.  
> 2. **TransactionService** acts as a middleware between the frontend and backend.  
> 3. **Backend validation** ensures users can only access their own data.  
> 4. **JWT authentication flow**:
>   - Access token valid → normal request  
>   - Access token invalid → 401 Unauthorized  
>   - Access token expired → refresh token endpoint `/auth/login/refresh`  
> 5. **Database** interactions happen only in the backend layer.  
> 6. Responses flow back through the same chain to the **frontend** and finally to the **user**.  



## Development and Realisation


### Developped modules

#### Frontend Modules (Angular)

1. **Core Application**
   - `app.ts`, `app.routes.ts`, `app.config.ts`, `app.html`, `app.scss`
   - Main application configuration, routing, and layout.

2. **Authentication (`auth`)**
   - `auth.ts`, `auth.guard.ts`, `auth.interceptor.ts`
   - Handles login, signup, route protection, and JWT token management in HTTP requests.

3. **Dashboard (`dashboard`)**
   - `dashboard.component.ts/html/scss`
   - Displays the user's overall financial summary, including net balance and trends.

4. **Transactions (`transactions`)**
   - `transactions.component.ts/html/scss`
   - Lists user expenses and revenues, allows adding, editing, and deleting transactions.

5. **Category Statistics (`category-stats`)**
   - `category-stats.component.ts/html/scss`
   - Shows breakdowns of expenses and revenues by category, with charts and percentages.

6. **Reports (`reports`)**
   - `reports.component.ts/html/scss`
   - Enables generating reports and exporting them in various formats (PDF, CSV, JSON, Markdown, HTML).

7. **Settings (`settings`)**
   - `settings.component.ts/html/scss`
   - Manages user-specific settings, such as budgets and preferences.

8. **Layout (`layout`), Header (`header`), Sidebar (`sidebar`)**
   - Shared UI components for consistent application structure and navigation.

9. **Login and Signup (`login`, `signup`)**
   - `login.ts/html/scss` and `signup.ts/html/scss`
   - Handles user authentication and registration forms.

10. **Guards (`guards`)**
    - `user-id-matcher.guard.ts`
    - Ensures that users can only access their own resources.

11. **Services (`services`)**
    - `transaction.service.ts`, `settings.service.ts`, `theme.service.ts`
    - Encapsulate business logic and HTTP requests to the backend.

12. **Models (`models`)**
    - `transaction.model.ts`
    - Defines frontend representations of transactions for type safety.

---

#### Backend Modules (Spring Boot)

1. **Main Application**
   - `ExpTrackApplication.java`
   - Entry point of the backend application.

2. **Configuration (`config`)**
   - `CorsConfig.java`, `SecurityConfig.java`, `OpenApiConfig.java`
   - Manages CORS policies, security settings, and API documentation.

3. **Controllers (`controllers`)**
   - `LoginController.java`, `SignUpController.java`, `TransactionController.java`
   - Handles HTTP requests for authentication, user management, and transaction operations.
   - `GlobalExceptionHandler.java` manages consistent error responses.

4. **Models (`models`)**
   - `User.java`, `Transaction.java`, `Expense.java`, `Revenue.java`
   - Represent the database entities for persistence and business logic.

5. **Repositories (`repositories`)**
   - `UserRepository.java`, `ExpenseRepository.java`, `RevenueRepository.java`
   - Interfaces for database CRUD operations, leveraging Spring Data JPA.

6. **Services (`services`)**
   - `TransactionService.java`, `ExpenseService.java`, `RevenueService.java`, `UserService.java`
   - Core business logic for handling transactions, users, and reports.
   - `JwtService.java` and `CookieService.java` manage JWT authentication and secure cookies.
   - `ReportGeneratorService.java` handles the generation of reports in multiple formats.

7. **DTOs (`dtos`)**
   - Includes `UserDTO.java`, `TransactionDTO.java`, `CategorySummaryDTO.java`, `ExpenseReportDTO.java`, etc.
   - Used for transferring data between backend and frontend while decoupling the internal models.

8. **Security (`security`)**
   - `UserDetailsImpl.java`, `UserDetailsServiceImpl.java`
   - Implements Spring Security user details for authentication and authorization.

9. **Utils (`utils`)**
   - `JwtAuthFilter.java`, `CookiesExtractor.java`
   - Utility classes for JWT validation and cookie extraction.

---

**Summary:**  
The frontend modules focus on **user interface, data visualization, and interaction**, while the backend modules handle **business logic, security, data persistence, and API responses**. Services act as **middleware layers** to separate concerns, and DTOs ensure clean communication between frontend and backend. Together, these modules form a **secure, modular, and maintainable full-stack application**.


### Screenshots

#### Login Component:
![Screenshot](screenshots/Screenshot_03-Jan_23-23-57_257.png)
#### Login Password Restriction:
![Screenshot](screenshots/Screenshot_03-Jan_23-24-17_22881.png)
#### Client Side Email format checking:
![Screenshot](screenshots/Screenshot_03-Jan_23-24-30_3481.png)
#### Authentication Failure:
![Screenshot](screenshots/Screenshot_03-Jan_23-25-06_25693.png)
#### Signup Component:
![Screenshot](screenshots/Screenshot_03-Jan_23-25-15_22794.png)
#### Dashboard Component:
![Screenshot](screenshots/Screenshot_03-Jan_23-25-36_13250.png)
#### Dark Mode Support:
![Screenshot](screenshots/Screenshot_03-Jan_23-25-43_5310.png)
#### Logout Component:
![Screenshot](screenshots/Screenshot_03-Jan_23-25-57_10878.png)
#### Transactions CRUD Component:
![Screenshot](screenshots/Screenshot_03-Jan_23-26-11_13300.png)
#### Transaction Creation Component:
![Screenshot](screenshots/Screenshot_03-Jan_23-26-20_2393.png)
#### Notifications When the Threshold is reached:
![Screenshot](screenshots/Screenshot_03-Jan_23-26-59_20718.png)
#### Transaction Creation Success:
![Screenshot](screenshots/Screenshot_03-Jan_23-27-31_16676.png)
#### Category Statistics Component (List Mode):
![Screenshot](screenshots/Screenshot_03-Jan_23-26-36_15393.png)
#### Category Statistics Component (Chart Mode):
![Screenshot](screenshots/Screenshot_03-Jan_23-28-34_13880.png)
#### Financial Report Component (Trend Analysis Section):
![Screenshot](screenshots/Screenshot_03-Jan_23-28-50_21200.png)
#### Financial Report Component (Custom Report Generation Section):
![Screenshot](screenshots/Screenshot_03-Jan_23-29-03_177.png)
#### Supported exporting File Formats :
![Screenshot](screenshots/Screenshot_03-Jan_23-29-09_16080.png)
#### Exported Markdown file:
![Screenshot](screenshots/Screenshot_03-Jan_23-30-36_10217.png)
#### Exported JSON file:
![Screenshot](screenshots/Screenshot_03-Jan_23-30-58_28552.png)
#### Exported HTML file:
![Screenshot](screenshots/Screenshot_03-Jan_23-31-13_7791.png)
#### Exported PDF file:
![Screenshot](screenshots/Screenshot_03-Jan_23-31-26_28529.png)
#### Settings Component:
##### General Section:
![Screenshot](screenshots/Screenshot_03-Jan_23-31-47_31221.png)
![Screenshot](screenshots/Screenshot_03-Jan_23-31-51_8945.png)
##### Budget Section:
![Screenshot](screenshots/Screenshot_03-Jan_23-32-00_7219.png)
![Screenshot](screenshots/Screenshot_03-Jan_23-32-06_7577.png)


### Snippets 

1. Backend – Transaction Model & Inheritance

- OO design and the use of JPA/Hibernate inheritance.

- database structure for expenses and revenues.

```java 
package com.example.exptrack.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Transaction {

  @Column(name = "amount", nullable = false)
  protected Double amount;

  @Column(name = "creation_date", nullable = false)
  protected Date creationDate;

  @Column(name = "last_modified", nullable = false)
  protected Date lastModified;

  @JoinColumn(name = "user_id", nullable = false)
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  protected User user;

  public Transaction() {
  }

  public Transaction(Double amount, Date creationDate, Date lastModified, User user) {
    this.amount = amount;
    this.creationDate = creationDate;
    this.lastModified = lastModified;
    this.user = user;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public Date getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(Date creationDate) {
    this.creationDate = creationDate;
  }

  public Date getLastModified() {
    return lastModified;
  }

  public void setLastModified(Date lastModified) {
    this.lastModified = lastModified;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}

package com.example.exptrack.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expenses")
public class Expense extends Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;

  @Column(name = "category", nullable = false)
  private String category;

  public Expense() {
  }

  public Expense(Long id, String category) {
    Id = id;
    this.category = category;
  }

  public Expense(Double amount, User user, Date creationDate, Date lastModified, String category) {
    this.amount = amount;
    this.user = user;
    this.creationDate = creationDate;
    this.lastModified = lastModified;
    this.category = category;
  }

  public Long getId() {
    return Id;
  }

  public void setId(Long id) {
    Id = id;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

}
```

2. Backend – Transaction Service Method
- Shows business logic separation, user validation, and interaction with the repository. 

```Java
package com.example.exptrack.services;

import com.example.exptrack.dtos.*;
import com.example.exptrack.models.Expense;
import com.example.exptrack.models.Revenue;
import com.example.exptrack.models.User;
import com.example.exptrack.repositories.ExpenseRepository;
import com.example.exptrack.repositories.RevenueRepository;
import com.example.exptrack.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.Date;

@Service
@Transactional
public class TransactionService {

  @Autowired
  private ExpenseRepository expenseRepository;
  @Autowired
  private RevenueRepository revenueRepository;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ReportGeneratorService reportGeneratorService;

  // Helper method to get date range based on timeFrame
  private Map<String, Date> getDateRange(String timeFrame) {
    LocalDate now = LocalDate.now();
    LocalDate startDate;
    LocalDate endDate = now;

    switch (timeFrame.toLowerCase()) {
      case "day":
        startDate = now;
        break;
      case "week":
        startDate = now.minusDays(7);
        break;
      case "month":
        startDate = now.withDayOfMonth(1);
        break;
      case "year":
        startDate = now.withDayOfYear(1);
        break;
      case "all":
        startDate = LocalDate.of(2000, 1, 1); // Arbitrary early date
        break;
      default:
        startDate = now.withDayOfMonth(1); // Default to month
    }

    Map<String, Date> range = new HashMap<>();
    range.put("start", Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
    range.put("end", Date.from(endDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant()));
    return range;
  }

  // Get transactions with filtering (combined expenses and revenues)
  public List<TransactionDTO> getTransactions(Long userId, String timeFrame, int limit, int page) {
    Map<String, Date> dateRange = getDateRange(timeFrame);

    // Get expenses and revenues
    List<Expense> expenses = expenseRepository.findByUserIdAndCreationDateBetweenOrderByCreationDateDesc(
        userId, dateRange.get("start"), dateRange.get("end"));
    List<Revenue> revenues = revenueRepository.findByUserIdAndCreationDateBetweenOrderByCreationDateDesc(
        userId, dateRange.get("start"), dateRange.get("end"));

    // Combine and sort by creation date
    List<TransactionDTO> allTransactions = new ArrayList<>();

    // Convert expenses to DTOs
    expenses.forEach(expense -> {
      TransactionDTO dto = new TransactionDTO();
      dto.setId(expense.getId());
      dto.setAmount(expense.getAmount());
      dto.setType("expense");
      dto.setCategory(expense.getCategory());
      dto.setDescription("Expense: " + expense.getCategory()); // You might want to add description field
      dto.setCreationDate(expense.getCreationDate());
      dto.setLastModified(expense.getLastModified());
      dto.setTransactionType("expense");
      allTransactions.add(dto);
    });

    // Convert revenues to DTOs
    revenues.forEach(revenue -> {
      TransactionDTO dto = new TransactionDTO();
      dto.setId(revenue.getId());
      dto.setAmount(revenue.getAmount());
      dto.setType("revenue");
      dto.setSource(revenue.getSource());
      dto.setDescription("Revenue: " + revenue.getSource()); // You might want to add description field
      dto.setCreationDate(revenue.getCreationDate());
      dto.setLastModified(revenue.getLastModified());
      dto.setTransactionType("revenue");
      allTransactions.add(dto);
    });

    // Sort by creation date (most recent first)
    allTransactions.sort((a, b) -> b.getCreationDate().compareTo(a.getCreationDate()));

    // Apply pagination
    int start = (page - 1) * limit;
    int end = Math.min(start + limit, allTransactions.size());

    if (start >= allTransactions.size()) {
      return Collections.emptyList();
    }

    return allTransactions.subList(start, end);
  }

  /* ... */
}
```

3. Backend – JWT Refresh Endpoint

- Demonstrates token handling, security logic, and refresh mechanism.


```java 

  @PostMapping("/login/refresh")
  @Operation(summary = "Refresh JWT token pair", description = """
      Uses the provided refresh token to generate a new pair of access and refresh tokens.
      Sets the new access token as a HttpOnly cookie.
      """, security = {} // public endpoint
  )
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Tokens refreshed successfully", content = @Content(mediaType = "application/json")),
      @ApiResponse(responseCode = "401", description = "Invalid refresh token", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<?> refresh(@RequestBody Map<String, String> request, HttpServletResponse response) {
    String refreshToken = request.get("refreshToken");
    try {
      JwtService.TokenPair newTokens = jwtService.refreshTokenPair(refreshToken);
      cookieService.addCookie(response, "access_token",
          newTokens.getAccessToken(),
          jwtService.getMillisUntilExpiration(newTokens.getAccessToken()) / 1000);
      return ResponseEntity.ok(newTokens.toMap());
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(401).body(Map.of("error", "Invalid refresh token"));
    }
  }

  /* ===================== REFRESH ACCESS TOKEN ONLY ===================== */
  @PostMapping("/login/refresh-access")
  @Operation(summary = "Refresh access token", description = """
      Uses a refresh token to refresh the access token only.
      Returns the new access token in the response body.
      """, security = {} // public endpoint
  )
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Access token refreshed successfully", content = @Content(mediaType = "application/json")),
      @ApiResponse(responseCode = "401", description = "Cannot refresh token or invalid refresh token", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> request) {
    String accessToken = request.get("accessToken");
    String refreshToken = request.get("refreshToken");

    if (jwtService.canTokenBeRefreshed(accessToken, refreshToken)) {
      try {
        String newAccessToken = jwtService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
      } catch (IllegalArgumentException e) {
        return ResponseEntity.status(401).body(Map.of("error", "Failed to refresh token"));
      }
    }
    return ResponseEntity.status(401).body(Map.of("error", "Cannot refresh token"));
  }

```

4. Frontend – TransactionService (Middleware)

Shows interaction between frontend and backend, token passing, and HTTP request handling.

```typescript 

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // private apiUrl = 'https://localhost:8443/api';
  private apiUrl = environment.apiUrl;
  private userId: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    const currentUser = this.authService.getCurrentUser();
    this.userId = currentUser?.id || null;


    if (!this.userId) {
      console.warn('⚠️ WARNING: No user ID found. User not authenticated.');
    }
  }

  private getBaseUrl(): string {
    if (!this.userId) {
      throw new Error('User not authenticated');
    }
    return `${this.apiUrl}/users/${this.userId}/transactions`;
  }

  private getRequestOptions(params?: HttpParams): {
    headers: HttpHeaders;
    params?: HttpParams;
    withCredentials: boolean;
  } {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      ...(params && { params }),
      withCredentials: true
    };
  }

  checkAuth(): void {
    const currentUser = this.authService.getCurrentUser();
  }

  getTransactions(timeFrame: string, limit: number = 10, page: number = 1): Observable<Transaction[]> {

    const userId = this.userId;

    if (!userId) {
      console.error('❌ No user ID found! User may not be authenticated.');
      return of([]);
    }

    const params = new HttpParams()
      .set('timeFrame', timeFrame)
      .set('limit', limit.toString())
      .set('page', page.toString());

    const url = `${this.apiUrl}/users/${userId}/transactions`;
    console.log('🌐 API URL:', url);
    console.log('📋 Params:', params.toString());

    return this.http.get<any>(url, {
      params: params,
      withCredentials: true,
    }).pipe(
      map(transactions => {
        console.log('✅ Backend Response:', transactions);
        const mapped = this.mapTransactions(transactions);
        console.log('🗺️ Mapped Transactions:', mapped);
        return mapped;
      }),
      catchError(error => {
        console.error('❌ Error fetching transactions:', error);
        console.error('Error Status:', error.status);
        console.error('Error Message:', error.message);
        console.error('Error URL:', error.url);
        return of([]);
      })
    );
  }

  getTransactionSummary(timeFrame: string): Observable<TransactionSummary> {
    console.log('🔍 getTransactionSummary called with:', timeFrame);

    const userId = this.userId;
    if (!userId) {
      console.error('❌ No user ID for summary');
      return of(this.getEmptySummary(timeFrame));
    }

    const params = new HttpParams().set('timeFrame', timeFrame);
    const url = `${this.apiUrl}/users/${userId}/transactions/summary`;
    console.log('🌐 Summary URL:', url);

    return this.http.get<any>(url, this.getRequestOptions(params)).pipe(
      map(summary => {
        console.log('✅ Summary Response:', summary);
        return this.mapSummary(summary, timeFrame);
      }),
      catchError(error => {
        console.error('❌ Error fetching summary:', error);
        return of(this.getEmptySummary(timeFrame));
      })
    );
  }

  getCategorySummary(timeFrame: string): Observable<CategorySummary[]> {
    console.log('🔍 getCategorySummary called with:', timeFrame);

    const userId = this.userId;
    if (!userId) {
      console.error('❌ No user ID for categories');
      return of([]);
    }

    const params = new HttpParams().set('timeFrame', timeFrame);
    const url = `${this.apiUrl}/users/${userId}/transactions/categories/summary`;
    console.log('🌐 Categories URL:', url);

    return this.http.get<any>(url, this.getRequestOptions(params)).pipe(
      map(categories => {
        console.log('✅ Categories Response:', categories);
        return this.mapCategories(categories);
      }),
      catchError(error => {
        console.error('❌ Error fetching categories:', error);
        return of([]);
      })
    );
  }

```

5. Frontend – Component Example (Dashboard)

Shows data binding and dynamic rendering of summary data
```typescript 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pieChart', { static: false }) pieChartRef!: ElementRef;
  private pieChart: Chart | null = null;

  timeFrames = [
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' },
    { value: 'day', label: 'Today' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  selectedTimeFrame = 'month';
  transactions: Transaction[] = [];
  summary: TransactionSummary | null = null;
  categorySummary: CategorySummary[] = [];
  isLoading = true;
  isDarkMode = false;
  hasChartData = false;
  hasError = false;
  errorMessage = '';

  private subscriptions: Subscription[] = [];

  // Budget alerts
  showBudgetAlert = false;
  budgetAlertMessage = '';
  budgetAlertType: 'warning' | 'danger' = 'warning';

  constructor(
    private transactionService: TransactionService,
    private themeService: ThemeService,
    private settingsService: SettingsService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('🏠 Dashboard initialized');
    console.log('👤 Current User:', this.authService.getCurrentUser());

    // Request notification permission if enabled
    this.settingsService.requestNotificationPermission();

    // Subscribe to theme changes
    const themeSub = this.themeService.isDarkMode$.subscribe(
      (mode: boolean) => {
        this.isDarkMode = mode;
        this.updatePieChart();
      }
    );
    this.subscriptions.push(themeSub);

    // Subscribe to settings changes
    const appSettingsSub = this.settingsService.appSettings$.subscribe(() => {
      console.log('🔄 Settings changed, updating UI');
      this.updatePieChart();
    });
    this.subscriptions.push(appSettingsSub);

    const budgetSettingsSub = this.settingsService.budgetSettings$.subscribe(() => {
      console.log('🔄 Budget settings changed, checking alerts');
      this.checkBudgetAlerts();
    });
    this.subscriptions.push(budgetSettingsSub);

    this.loadDashboardData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updatePieChart();
    }, 100);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.destroyChart();
  }

  onTimeFrameChange() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    console.log('📊 Loading dashboard data...');
    console.log('⏰ Selected timeframe:', this.selectedTimeFrame);

    this.isLoading = true;
    this.hasChartData = false;
    this.hasError = false;
    this.errorMessage = '';
    let loaded = 0;
    let failed = 0;

    const finish = () => {
      loaded++;
      console.log(`✔️ Loaded ${loaded}/3 data sources`);
      if (loaded === 3) {
        this.isLoading = false;

        if (failed === 3) {
          this.hasError = true;
          this.errorMessage = 'Failed to load dashboard data. Please try again.';
          console.error('❌ All data sources failed to load');
        } else {
          console.log('✅ Dashboard data loaded successfully!');

          // Check budget alerts after data is loaded
          this.checkBudgetAlerts();

          setTimeout(() => this.updatePieChart(), 50);
        }
      }
    };

    const handleError = (source: string, error: any) => {
      console.error(`❌ ${source} failed:`, error);
      failed++;
      finish();
    };

    // Transactions
    this.transactionService.getTransactions(this.selectedTimeFrame, 5)
      .subscribe({
        next: (data: Transaction[]) => {
          this.transactions = data || [];
          finish();
        },
        error: (error) => handleError('Transactions', error)
      });

    // Summary
    this.transactionService.getTransactionSummary(this.selectedTimeFrame)
      .subscribe({
        next: (summary: TransactionSummary) => {
          this.summary = summary;
          const expenses = Number(summary?.totalExpenses) || 0;
          const revenue = Number(summary?.totalRevenue) || 0;
          this.hasChartData = (expenses > 0 || revenue > 0);
          finish();
        },
        error: (error) => handleError('Summary', error)
      });

    // Categories
    this.transactionService.getCategorySummary(this.selectedTimeFrame)
      .subscribe({
        next: (data: CategorySummary[]) => {
          this.categorySummary = data || [];
          finish();
        },
        error: (error) => handleError('Categories', error)
      });
  }

  formatCurrency(amount: number | null | undefined): string {
    return this.settingsService.formatCurrency(amount);
  }

  formatDate(date: Date | string): string {
    return this.settingsService.formatDate(date);
  }

  getBudgetProgress(): number {
    const totalExpenses = Number(this.summary?.totalExpenses) || 0;
    const budgetSettings = this.settingsService.getBudgetSettings();

    if (this.selectedTimeFrame === 'month') {
      return Math.min((totalExpenses / budgetSettings.monthlyBudget) * 100, 100);
    } else if (this.selectedTimeFrame === 'week') {
      return Math.min((totalExpenses / budgetSettings.weeklyBudget) * 100, 100);
    }

    return 0;
  }

  getBudgetStatusClass(): string {
    const progress = this.getBudgetProgress();
    const threshold = this.settingsService.getBudgetSettings().alertThreshold;

    if (progress >= 100) return 'over-budget';
    if (progress >= threshold) return 'near-budget';
    return 'under-budget';
  }

  getExpenseCategories(): CategorySummary[] {
    return this.categorySummary.filter((c: CategorySummary) => c.type === 'expense');
  }

  getRevenueCategories(): CategorySummary[] {
    return this.categorySummary.filter((c: CategorySummary) => c.type === 'revenue');
  }

  showFullTransactions(): void {
    this.router.navigate([`/transactions/${this.authService.getCurrentUser()?.id}`]);
  }

  retryLoad(): void {
    this.loadDashboardData();
  }

  dismissBudgetAlert(): void {
    this.showBudgetAlert = false;
  }
}
```
```html

<div class="dashboard-container">
  <!-- Header -->
  <header class="dashboard-header">
    <div class="header-content">
      <h1>Financial Dashboard</h1>
      <div class="time-frame-selector">
        <select [(ngModel)]="selectedTimeFrame" (change)="onTimeFrameChange()" class="time-select">
          <option *ngFor="let frame of timeFrames" [value]="frame.value">{{ frame.label }}</option>
        </select>
      </div>
    </div>
  </header>

  <!-- Loading State -->
  <div *ngIf="isLoading; else contentTemplate" class="loading-state">
    <div class="loading-spinner"></div>
    <p>Loading your financial data...</p>
  </div>

  <!-- Main Content -->
  <ng-template #contentTemplate>
    <div *ngIf="summary" class="dashboard-content">

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card revenue-card">
          <div class="card-icon">
            <i class="icon-revenue">↑</i>
          </div>
          <div class="card-content">
            <h3>Total Revenue</h3>
            <p class="amount">{{ formatCurrency(summary.totalRevenue) }}</p>
            <span class="card-label">Income</span>
          </div>
        </div>

        <div class="summary-card expense-card">
          <div class="card-icon">
            <i class="icon-expense">↓</i>
          </div>
          <div class="card-content">
            <h3>Total Expenses</h3>
            <p class="amount">{{ formatCurrency(summary.totalExpenses) }}</p>
            <span class="card-label">Spending</span>
          </div>
        </div>

        <div class="summary-card net-card">
          <div class="card-icon">
            <i class="icon-net">$</i>
          </div>
          <div class="card-content">
            <h3>Net Amount</h3>
            <p class="amount" [class.positive]="summary.netAmount >= 0" [class.negative]="summary.netAmount < 0">
              {{ formatCurrency(summary.netAmount) }}
            </p>
            <span class="card-label">Balance</span>
          </div>
        </div>
      </div>

      <!-- Charts and Details -->
      <div class="charts-section">
        <!-- Pie Chart -->
        <div class="chart-container">
          <div class="chart-header">
            <h3>Income vs Expenses</h3>
          </div>
          <div class="pie-chart-wrapper" *ngIf="summary.totalRevenue || summary.totalExpenses">
            <canvas #pieChart></canvas>
          </div>
          <div *ngIf="!summary.totalRevenue && !summary.totalExpenses" class="no-data-message">
            No data available for chart
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="category-breakdown">
          <div class="expense-categories">
            <h3>Expense Categories</h3>
            <div *ngFor="let category of getExpenseCategories()" class="category-item">
              <div class="category-info">
                <span class="category-name">{{ category.name  }}</span>
                <span class="category-amount">{{ formatCurrency(category.amount) }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill expense-fill" [style.width.%]="category.percentage"></div>
              </div>
              <span class="percentage">{{ category.percentage.toFixed(1) }}%</span>
            </div>
            <div *ngIf="getExpenseCategories().length === 0" class="no-data-message">
              No expense data available
            </div>
          </div>

          <div class="revenue-categories">
            <h3>Revenue Sources</h3>
            <div *ngFor="let category of getRevenueCategories()" class="category-item">
              <div class="category-info">
                <span class="category-name">{{ category.name }}</span>
                <span class="category-amount">{{ formatCurrency(category.amount) }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill revenue-fill" [style.width.%]="category.percentage"></div>
              </div>
              <span class="percentage">{{ category.percentage.toFixed(1) }}%</span>
            </div>
            <div *ngIf="getRevenueCategories().length === 0" class="no-data-message">
              No revenue data available
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="recent-transactions">
        <div class="section-header">
          <h3>Recent Transactions</h3>
          <button class="btn-primary" (click)="showFullTransactions()">View All</button>
        </div>
        <div class="transactions-list">
          <div *ngFor="let transaction of transactions" class="transaction-item">
            <div class="transaction-main">
              <div class="transaction-icon" [class.expense]="transaction.type === 'expense'" [class.revenue]="transaction.type === 'revenue'">
                {{ transaction.type === 'expense' ? '↓' : '↑' }}
              </div>
              <div class="transaction-details">
                <span class="transaction-description">{{ transaction.description }}</span>
                <span class="transaction-category">{{ transaction.category }}</span>
              </div>
            </div>
            <div class="transaction-amount" [class.expense]="transaction.type === 'expense'" [class.revenue]="transaction.type === 'revenue'">
              {{ transaction.type === 'expense' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
            </div>
          </div>
          <div *ngIf="transactions.length === 0" class="no-data-message">
            No recent transactions
          </div>
        </div>
      </div>
    </div>

    <!-- No Data State -->
    <div *ngIf="!summary" class="no-data-state">
      <div class="no-data-icon">📊</div>
      <h3>No Financial Data Available</h3>
      <p>Try selecting a different time frame or add some transactions.</p>
      <button class="btn-primary" routerLink="/transactions/new">Add First Transaction</button>
    </div>
  </ng-template>
</div>
```

6. Frontend – Auth Guard

Demonstrates route protection and secure access based on JWT tokens.

```typescript 

import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log('AuthGuard checking...');

    // CASE 1: Already have user in memory/localStorage
    if (this.authService.getCurrentUser()) {
      console.log('AuthGuard: User found in memory');
      return true;
    }

    // CASE 2: Try to fetch user from backend (for page refresh)
    console.log('AuthGuard: No user in memory, fetching from backend...');
    return this.authService.fetchCurrentUser()?.pipe(
      map(user => {
        console.log('AuthGuard: Fetched user successfully');
        return !!user; // Convert to boolean
      }),
      catchError(() => {  // Removed unused 'error' parameter
        console.log('AuthGuard: Failed to fetch user, redirecting to login');
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return of(false);
      })
    );
  }
}
```


## Tests and Validation

While no formal unit or integration testing frameworks were employed during the development of Exptrackz, the application was subjected to **extensive functional validation** to ensure **data integrity and correctness**. The testing focused on verifying that:

- Transactions were correctly stored, retrieved, and associated with the authenticated user.
- Expense and revenue calculations, summaries, and reports produced accurate results.
- Budget notifications and chart visualizations reflected the underlying data correctly.

During testing, several challenges were encountered:

1. **Java null-handling behavior:** Some silent `NullPointerExceptions` required careful handling, particularly when dealing with JPA relationships and lazy-loaded entities.  
2. **Spring Boot inheritance with JPA:** Managing the `Transaction` superclass and its subclasses (`Expense` and `Revenue`) required attention to annotations and constructors to prevent unexpected persistence behavior.

Despite the lack of formalized unit tests, the combination of manual testing, data verification, and attention to edge cases provided confidence in the application's correctness and reliability.



## Conclusions and Perspective

### Conclusions
The Exptrackz project successfully achieved its objective of providing a **full-featured expense tracking application**. Users can securely authenticate, log expenses and revenues, visualize financial trends through charts, receive notifications for budget limits, and generate detailed reports in multiple formats. The project demonstrated the effective integration of a **Spring Boot backend, Angular frontend, and PostgreSQL database**, along with containerized deployment using Docker and Docker Compose. Overall, the application meets the intended functionality, maintains data integrity, and provides a solid foundation for future enhancements.

### Perspectives and Improvements
While the current version is fully functional, several improvements can be envisioned:

- **Mobile Version:** Developing a mobile application would make Exptrackz more accessible and user-friendly on smartphones.  
- **UI/UX Enhancements:** Refining the user interface and experience, fixing minor UI bugs, and optimizing navigation can improve usability and engagement.  
- **Additional Features:** Introducing features such as automated expense categorization, multi-currency support, or advanced analytics could further enhance the application.

### Required Teachings
The project highlighted the relevance of the technical and theoretical teachings from the university. Key lessons applied included:

- **Object-Oriented Programming and Design Patterns:** Essential for structuring models and services in a maintainable way.  
- **Web Development and Frameworks:** Knowledge of backend (Spring Boot) and frontend (Angular) frameworks was critical to implement secure, responsive, and interactive features.  
- **Database Management and JPA:** Understanding relational databases and JPA allowed efficient storage, retrieval, and mapping of user transactions.  
- **Software Engineering Practices:** Principles such as modularity, separation of concerns, and middleware design were crucial for building a robust full-stack application.

The project provided valuable practical experience, bridging the gap between academic knowledge and real-world application development.


## Bibliography / References

#### TypeScript
- Official Documentation: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

#### Angular
- Official Angular Documentation: [https://angular.io/docs](https://angular.io/docs)

#### PostgreSQL
- Official Documentation: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)

#### Docker and Docker Compose
- Official Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)

#### Git
- Official Git Documentation: [https://git-scm.com/doc](https://git-scm.com/doc)

#### Java
- Official Java Documentation: [https://docs.oracle.com/en/java/](https://docs.oracle.com/en/java/)

#### Spring Boot
- Official Spring Boot Documentation: [https://docs.spring.io/spring-boot/docs/current/reference/html/](https://docs.spring.io/spring-boot/docs/current/reference/html/)

#### Swagger / OpenAPI for Spring Boot
- Official Springdoc OpenAPI Documentation: [https://springdoc.org/](https://springdoc.org/)
- *OpenAPI Specification* Documentation: [https://swagger.io/specification/](https://swagger.io/specification/)

#### Server-Client Website Design
- MDN Web Docs – Client-Server Architecture: [https://developer.mozilla.org/en-US/docs/Learn/Server-side](https://developer.mozilla.org/en-US/docs/Learn/Server-side)



