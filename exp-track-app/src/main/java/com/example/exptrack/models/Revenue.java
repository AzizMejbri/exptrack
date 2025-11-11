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
@Table(name = "revenue")
@NoArgsConstructor
@Getter
@Setter
public class Revenue extends Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source")
    private String source;

    public Revenue(Double amount, User user, Date creationDate, Date lastModified, String source) {
        this.amount = amount;
        this.user = user;
        this.creationDate = creationDate;
        this.lastModified = lastModified;
        this.source = source;
    }
}
