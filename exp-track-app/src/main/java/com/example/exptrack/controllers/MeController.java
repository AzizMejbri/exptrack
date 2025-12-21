package com.example.exptrack.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.exptrack.dtos.UserDTO;

@Controller
public class MeController {
  @GetMapping("/api/me")
  public ResponseEntity<?> me(Authentication authentication) {
    UserDTO user = (UserDTO) authentication.getPrincipal();
    return ResponseEntity.ok(user);
  }
}
