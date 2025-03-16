package com.studentloanservices.bank_admin_service.repository;

import com.studentloanservices.bank_admin_service.model.LoanApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class LoanApplicationRepository {

    private final JdbcTemplate jdbcTemplate;

    public LoanApplicationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<LoanApplication> rowMapper = (rs, rowNum) -> new LoanApplication(
            rs.getLong("id"),
            rs.getString("student_name"),
            rs.getDouble("loan_amount"),
            rs.getString("status"),
            rs.getDate("application_date"),
            rs.getString("purpose"),
            rs.getInt("term"),
            rs.getDouble("interest_rate")
    );

    // Fetch all pending loan applications
    public List<LoanApplication> getAllLoanApplications() {
        String sql = "SELECT * FROM loan_applications WHERE status='PENDING'";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Fetch all approved loan applications
    public int getApprovedApplications() {
        String sql = "SELECT count(*) FROM loan_applications WHERE status='APPROVED'";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public int getActiveApplications() {
        String sql = "SELECT count(*) FROM loan_applications WHERE STATUS = 'APPROVED' AND APPLICATION_DATE <= SYSDATE - INTERVAL '15' DAY";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public Long getBankPortfolio() {
        String sql = "SELECT * FROM bank_data";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }

    // Fetch loan application by ID
    public LoanApplication getLoanApplicationById(Long id) {
        String sql = "SELECT * FROM loan_applications WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public List<LoanApplication> manageLoanApplications() {
        String sql = "SELECT * FROM loan_applications WHERE status!='PENDING'";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Insert new loan application
    public int saveLoanApplication(LoanApplication loan) {
        String sql = "INSERT INTO loan_applications (student_name, loan_amount, status, application_date) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, loan.getStudentName(), loan.getLoanAmount(), loan.getStatus(), loan.getApplicationDate());
    }

    // Update loan application status
    public int updateLoanStatus(Long id, String status) {
        String loanAmountSql = "SELECT loan_amount FROM loan_applications WHERE id = ?";
        Double loanAmount = jdbcTemplate.queryForObject(loanAmountSql, new Object[]{id}, Double.class);

        if (loanAmount == null) {
            throw new RuntimeException("Loan application not found with id: " + id);
        }

        String updateStatusSql = "UPDATE loan_applications SET status = ? WHERE id = ?";
        int statusRowsAffected = jdbcTemplate.update(updateStatusSql, status, id);

        int portfolioRowsAffected = 0;
        if ("APPROVED".equalsIgnoreCase(status.trim())) {
            String updatePortfolioSql = "UPDATE bank_data SET portfolio_amount = portfolio_amount - ?";
            portfolioRowsAffected = jdbcTemplate.update(updatePortfolioSql, loanAmount);
        }
        return statusRowsAffected + portfolioRowsAffected;
    }

    // Delete a loan application
    public int deleteLoanApplication(Long id) {
        String sql = "DELETE FROM loan_applications WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}