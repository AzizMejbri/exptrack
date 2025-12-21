package com.example.exptrack.dtos;

import java.util.Date;
import java.util.Optional;

public record TransactionSummary(
    Double totalExpenses,
    Double totalRevenue,
    Double expenseCount,
    Double revenueCount,
    Double netAmount,
    String period,
    Optional<String> currency) {

}
