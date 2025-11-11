
package com.example.exptrack.dtos;

import lombok.*;
// Create this class
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RevenueRequest {
    private Double amount;
    private String source;
}
