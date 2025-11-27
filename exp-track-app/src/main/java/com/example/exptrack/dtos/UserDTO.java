package com.example.exptrack.dtos;

import com.example.exptrack.models.User;

public record UserDTO(Long id, String username) {
  public String serialize() {
    return "{id: " + id + ", username: " + username + "}";
  }
}
