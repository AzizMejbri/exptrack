package com.example.exptrack.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "expenses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Expense extends Transaction{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "category")
    private String category;

    public Expense(Double amount, User user, Date creationDate, Date lastModified, String category) {
        this.amount = amount;
        this.user = user;
        this.creationDate = creationDate;
        this.lastModified = lastModified;
        this.category = category;
    } 

}
