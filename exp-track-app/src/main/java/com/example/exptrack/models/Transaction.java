package com.example.exptrack.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

@MappedSuperclass
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Transaction {

    @Column(name = "amount", nullable = false)
    protected Double amount;

    @Column(name = "creation_date", nullable = false)
    protected Date creationDate;

    @Column(name = "last_modified", nullable = false)
    protected Date lastModified;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @Setter
    protected User user;
}

