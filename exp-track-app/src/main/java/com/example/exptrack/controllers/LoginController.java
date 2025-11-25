package com.example.exptrack.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exptrack.dtos.LoginRequest;
import com.example.exptrack.dtos.Token;
import com.example.exptrack.dtos.UserDTO;
import com.example.exptrack.models.User;
import com.example.exptrack.services.UserService;

@RestController
@RequestMapping("/auth/login")
public class LoginController {

  @Autowired
  private UserService userService = new UserService();

  @PostMapping
  public ResponseEntity<?> handleLogin(
      @RequestBody LoginRequest loginRequest) {
    try {
      User user = userService.findByEmail(loginRequest.getEmail());
      if (user.getPassword()
          .equals(loginRequest
              .getPassword())) {
        return ResponseEntity
            .ok(Map.of(
                "user", new UserDTO(user),
                "token", new Token()));
      } else {
        try {
          return ResponseEntity
              .status(HttpStatus.UNAUTHORIZED)
              .body(Map.of(
                  "error", "invalid credentials",
                  "message", "email doesnt match the password"));
        } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
              "error", "internal server error",
              "message", e.getMessage()));
        }
      }
    } catch (RuntimeException r) {
      r.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
          "error", "internal server error",
          "message", r.getMessage()));
    }

  }
}
