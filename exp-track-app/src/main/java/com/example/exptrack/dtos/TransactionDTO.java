package com.example.exptrack.dtos;

import java.util.Date;

public record TransactionDTO(
    String id,
    Double amount,
    String type,
    String category,
    String description,
    Date createdAt,
    Date updatedAt) {

}
