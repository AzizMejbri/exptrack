package com.example.exptrack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.exptrack.models.Expense;
import com.example.exptrack.models.User;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    public List<Expense> findByUser(User user);
}
