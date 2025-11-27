package com.example.exptrack.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exptrack.dtos.LoginRequest;
import com.example.exptrack.dtos.UserDTO;
import com.example.exptrack.security.UserDetailsImpl;
import com.example.exptrack.services.JwtService;

@RestController
@RequestMapping("/auth/login")
public class LoginController {

  @Autowired
  private JwtService jwtService;
  @Autowired
  private AuthenticationManager authMan;

  @PostMapping
  public ResponseEntity<?> handleLogin(@RequestBody LoginRequest loginRequest) {
    try {

      Authentication auth = authMan.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
      UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
      String jwtToken = jwtService.generateToken(new UserDTO(user.getId(), user.getEmail()));
      return ResponseEntity.ok(Map.of(
          "token", jwtToken,
          "id", user.getId(),
          "username", user.getActualUsername()));

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
    }
  }
}
