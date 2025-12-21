package com.example.exptrack.controllers;

import org.hibernate.mapping.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exptrack.dtos.UserDTO;

@RestController
@RequestMapping("/api")
public class DashboardController {

  @GetMapping("/dashboard/{userId}")
  public ResponseEntity<?> getDashboard(
      @PathVariable String userId,
      Authentication authentication) {
    // Extract user ID from JWT in cookie (automatically done by Spring Security)
    UserDTO currentUser = (UserDTO) authentication.getPrincipal();

    if (!currentUser.id().toString().equals(userId)) {
      // Return 403 - user trying to access another user's data
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .body(Map.of("error", "Access denied"));
    }

    // Return user's dashboard data
    return ResponseEntity.ok(dashboardService.getSummary(currentUser.getId()));
  }
}
