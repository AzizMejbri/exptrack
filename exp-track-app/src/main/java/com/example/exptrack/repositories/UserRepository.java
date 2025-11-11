package com.example.exptrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.exptrack.models.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {  }


