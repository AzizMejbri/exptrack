package com.example.exptrack.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.exptrack.dtos.UserDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

  private final String SECRET;

  public JwtService(@Value("${JWT_SECRET}") String secret) {
    this.SECRET = secret;
  }

  public String generateToken(UserDTO user) {

    return Jwts.builder()
        .claim("id", user.id())
        .claim("username", user.username())
        .setSubject(user.username())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
        .signWith(SignatureAlgorithm.HS256, SECRET)
        .compact();
  }

  public Claims extractClaims(String token) {
    return Jwts.parser()
        .setSigningKey(SECRET)
        .parseClaimsJws(token)
        .getBody();
  }

  public UserDTO extractUserDTO(String token) {
    Claims claims = Jwts.parser()
        .setSigningKey(SECRET)
        .parseClaimsJws(token)
        .getBody();
    return new UserDTO(claims.get("id", Long.class), claims.get("username", String.class));
  }

  public boolean isTokenValid(String token, UserDTO user) {
    String username = extractClaims(token).getSubject();
    return username.equals(user.username()) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return extractClaims(token).getExpiration().before(new Date());
  }
}
