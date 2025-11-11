package com.example.exptrack.dtos;

import lombok.*;
// Create this class
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExpenseRequest {
    private Double amount;
    private String category;
}
