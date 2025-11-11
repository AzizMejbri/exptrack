# Create project structure manually
mkdir exp-track-app
cd exp-track-app

# Create pom.xml
cat > pom.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>exp-track-app</artifactId>
    <version>1.0.0</version>
    <name>exp-track-app</name>
    <description>Expense Tracker Application</description>
    
    <properties>
        <java.version>21</java.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
EOF

# Create directory structure
mkdir -p src/main/java/com/example/exptrack
mkdir -p src/main/resources

# Create main application class
cat > src/main/java/com/example/exptrack/ExpTrackApplication.java << 'EOF'
package com.example.exptrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExpTrackApplication {
    public static void main(String[] args) {
        SpringApplication.run(ExpTrackApplication.class, args);
    }
}
EOF

# Create a simple controller
mkdir -p src/main/java/com/example/exptrack/controllers
cat > src/main/java/com/example/exptrack/controllers/ExpenseController.java << 'EOF'
package com.example.exptrack.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExpenseController {

    @GetMapping("/")
    public String home() {
        return "Expense Tracker API is running!";
    }

    @GetMapping("/api/expenses")
    public String getExpenses() {
        return "Expense list will be here";
    }

    @GetMapping("/api/health")
    public String health() {
        return "API is healthy!";
    }
}
EOF

# Create application properties
cat > src/main/resources/application.properties << 'EOF'
spring.application.name=exp-track-app
server.port=8080

# H2 Database for development
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA settings
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Dev tools
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true
EOF

echo "Spring Boot project created successfully!"
