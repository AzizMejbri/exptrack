#!/usr/bin/env Rscript

# Script to populate database with users, revenues, and expenses
library(httr)
library(jsonlite)
library(stringi)

# Configuration
base_url <- "http://localhost:8080"  # Change if your backend runs on different port

# Common expense categories and revenue sources
expense_categories <- c(
  "Food & Dining", "Transportation", "Housing", "Utilities", "Healthcare",
  "Entertainment", "Shopping", "Travel", "Education", "Personal Care",
  "Insurance", "Taxes", "Gifts & Donations", "Business Expenses", "Childcare",
  "Pets", "Subscriptions", "Home Maintenance", "Car Maintenance", "Clothing",
  "Electronics", "Fitness", "Hobbies", "Groceries", "Dining Out",
  "Coffee Shops", "Alcohol & Bars", "Fast Food", "Public Transport", "Fuel",
  "Rent", "Mortgage", "Electricity", "Water", "Internet", "Phone Bill",
  "Doctor Visits", "Medications", "Dental", "Movies", "Concerts", "Sports",
  "Books", "Games", "Furniture", "Appliances", "Repairs", "Cleaning"
)

revenue_sources <- c(
  "Salary", "Freelance Work", "Business Income", "Investment Returns",
  "Rental Income", "Dividends", "Interest Income", "Bonus", "Commission",
  "Consulting Fees", "Contract Work", "Stock Sales", "Royalties",
  "Online Sales", "Side Business", "Part-time Job", "Overtime Pay",
  "Tax Refund", "Gift Money", "Inheritance", "Lottery Winnings",
  "Cashback Rewards", "Survey Income", "Teaching", "Tutoring",
  "Photography", "Writing", "Programming", "Design Work", "Coaching",
  "Real Estate", "Stock Market", "Bond Interest", "Mutual Funds",
  "Retirement Income", "Social Security", "Pension", "Annuity",
  "Alimony", "Child Support", "Grant", "Scholarship", "Stipend",
  "YouTube Revenue", "Blog Income", "Affiliate Marketing", "App Sales"
)

# Function to generate random data
generate_random_data <- function() {
  # Generate 100 unique usernames and emails
  usernames <- paste0("user", sprintf("%03d", 1:100))
  emails <- paste0(usernames, "@example.com")
  passwords <- replicate(100, stri_rand_strings(1, 8))
  
  list(
    usernames = usernames,
    emails = emails,
    passwords = passwords
  )
}

# Function to create a user
create_user <- function(username, email, password) {
  tryCatch({
    user_data <- list(
      username = username,
      email = email,
      password = password
    )
    
    response <- POST(
      url = paste0(base_url, "/test/users"),
      body = toJSON(user_data, auto_unbox = TRUE),
      content_type("application/json")
    )
    
    if (status_code(response) %in% c(200, 201)) {
      # Try to extract user ID from response
      response_data <- fromJSON(content(response, "text"))
      user_id <- response_data$id
      
      cat("✓ Created user:", username, "(ID:", user_id, ")\n")
      return(user_id)
    } else {
      cat("✗ Failed user:", username, "- Status:", status_code(response), "\n")
      return(NULL)
    }
  }, error = function(e) {
    cat("✗ Error creating user:", username, "-", e$message, "\n")
    return(NULL)
  })
}

# Function to create revenue for a user
create_revenue <- function(user_id, amount, source, description) {
  tryCatch({
    revenue_data <- list(
      amount = amount,
      source = source,
      description = description
      # userId should be in the path, not in body
    )
    
    response <- POST(
      url = paste0(base_url, "/test/", user_id, "/revenues"),
      body = toJSON(revenue_data, auto_unbox = TRUE),
      content_type("application/json")
    )
    
    return(status_code(response) %in% c(200, 201))
  }, error = function(e) {
    return(FALSE)
  })
}

# Function to create expense for a user
create_expense <- function(user_id, amount, category, description) {
  tryCatch({
    expense_data <- list(
      amount = amount,
      category = category,
      description = description
      # userId should be in the path, not in body
    )
    
    response <- POST(
      url = paste0(base_url, "/test/", user_id, "/expenses"),
      body = toJSON(expense_data, auto_unbox = TRUE),
      content_type("application/json")
    )
    
    return(status_code(response) %in% c(200, 201))
  }, error = function(e) {
    return(FALSE)
  })
}

# Function to get random category/source with weighted probabilities
get_random_category <- function(categories) {
  # Create weights - some categories are more common than others
  weights <- runif(length(categories), 0.1, 1.0)
  sample(categories, 1, prob = weights)
}

# Main execution
cat("Starting database population...\n")
cat("API Base URL:", base_url, "\n")
cat("Available expense categories:", length(expense_categories), "\n")
cat("Available revenue sources:", length(revenue_sources), "\n\n")

# Generate random user data
user_data <- generate_random_data()
user_ids <- c()

# Step 1: Create users and collect their IDs
cat("=== Creating 100 Users ===\n")
for (i in 1:100) {
  user_id <- create_user(user_data$usernames[i], user_data$emails[i], user_data$passwords[i])
  if (!is.null(user_id)) {
    user_ids <- c(user_ids, user_id)
    names(user_ids)[length(user_ids)] <- user_data$usernames[i]
  }
  Sys.sleep(0.1)  # Small delay
}

# Step 2: Create revenues and expenses for each user
cat("\n=== Creating Revenues and Expenses ===\n")
total_revenues <- 0
total_expenses <- 0

# Track category/source distribution for summary
category_counts <- setNames(rep(0, length(expense_categories)), expense_categories)
source_counts <- setNames(rep(0, length(revenue_sources)), revenue_sources)

for (username in names(user_ids)) {
  user_id <- user_ids[[username]]
  cat("Processing user:", username, "(ID:", user_id, ")\n")
  
  # Create 100 revenues with mean=2000, sd=1000
  revenues_created <- 0
  for (j in 1:100) {
    amount <- max(0, round(rnorm(1, mean = 2000, sd = 1000), 2))
    source <- get_random_category(revenue_sources)
    description <- paste("Revenue", j, "for", username)
    
    if (create_revenue(user_id, amount, source, description)) {
      revenues_created <- revenues_created + 1
      source_counts[source] <- source_counts[source] + 1
    }
    
    # Small delay every 10 requests to avoid overwhelming the server
    if (j %% 10 == 0) Sys.sleep(0.05)
  }
  total_revenues <- total_revenues + revenues_created
  
  # Create 1000 expenses with mean=200, sd=100
  expenses_created <- 0
  for (j in 1:1000) {
    amount <- max(0, round(rnorm(1, mean = 200, sd = 100), 2))
    category <- get_random_category(expense_categories)
    description <- paste("Expense", j, "for", username)
    
    if (create_expense(user_id, amount, category, description)) {
      expenses_created <- expenses_created + 1
      category_counts[category] <- category_counts[category] + 1
    }
    
    # Small delay every 50 requests to avoid overwhelming the server
    if (j %% 50 == 0) Sys.sleep(0.05)
  }
  total_expenses <- total_expenses + expenses_created
  
  cat("  ✓ Revenues:", revenues_created, "/100\n")
  cat("  ✓ Expenses:", expenses_created, "/1000\n\n")
  Sys.sleep(0.2)  # Small delay between users
}

# Summary
cat("\n")
cat("=== Final Summary ===\n")
cat("Total users created:", length(user_ids), "/100\n")
cat("Total revenues created:", total_revenues, "/", (100 * 100), "\n")
cat("Total expenses created:", total_expenses, "/", (100 * 1000), "\n")
cat("Average revenues per user:", round(total_revenues / length(user_ids), 1), "\n")
cat("Average expenses per user:", round(total_expenses / length(user_ids), 1), "\n")

# Category and source distribution summary
cat("\n=== Top 10 Expense Categories ===\n")
top_categories <- head(sort(category_counts, decreasing = TRUE), 10)
for (i in 1:length(top_categories)) {
  cat(sprintf("%2d. %-25s: %d expenses\n", i, names(top_categories)[i], top_categories[i]))
}

cat("\n=== Top 10 Revenue Sources ===\n")
top_sources <- head(sort(source_counts, decreasing = TRUE), 10)
for (i in 1:length(top_sources)) {
  cat(sprintf("%2d. %-25s: %d revenues\n", i, names(top_sources)[i], top_sources[i]))
}

# Save user IDs for reference
write.csv(data.frame(
  username = names(user_ids),
  user_id = user_ids
), "created_users.csv", row.names = FALSE)

# Save category/source distribution
write.csv(data.frame(
  category = names(category_counts),
  count = category_counts
), "expense_categories_distribution.csv", row.names = FALSE)

write.csv(data.frame(
  source = names(source_counts),
  count = source_counts
), "revenue_sources_distribution.csv", row.names = FALSE)

cat("\nUser IDs saved to 'created_users.csv'\n")
cat("Category distribution saved to 'expense_categories_distribution.csv'\n")
cat("Source distribution saved to 'revenue_sources_distribution.csv'\n")
