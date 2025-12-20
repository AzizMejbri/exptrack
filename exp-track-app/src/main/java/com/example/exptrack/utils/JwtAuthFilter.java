package com.example.exptrack.utils;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.exptrack.dtos.UserDTO;
import com.example.exptrack.services.JwtService;
import com.example.exptrack.services.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  @Autowired
  private JwtService jwtService;
  @Autowired
  private UserService userService;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");
    String path = request.getServletPath();

    if (path.startsWith("/api/public") || path.startsWith("/auth")) {
      filterChain.doFilter(request, response);
      return;
    }
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    Long userId = jwtService
        .extractAllClaims(token)
        .get("id", Long.class);
    try {
      UserDTO user = userService.findById(userId).toDTO();

      if (jwtService.isTokenValid(token, user)) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, List.of());
        SecurityContextHolder
            .getContext()
            .setAuthentication(auth);
      }

      filterChain.doFilter(request, response);

    } catch (Exception e) {
      System.err.println("\u001B[31mJwtAuthFilter: Internal Server Error\u001B[0m");
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
  }
}
