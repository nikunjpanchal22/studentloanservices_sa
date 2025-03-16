package com.studentloanservices.bank_admin_service.model;

import java.util.Date;

public class LoanApplication {
    private Long id;
    private String studentName;
    private Double loanAmount;
    private String status;
    private Date applicationDate;
    private String purpose;
    private Integer term; // Loan term in months or years
    private Double interestRate;

    // Constructors
    public LoanApplication() {}

    public LoanApplication(Long id, String studentName, Double loanAmount, String status,
                           Date applicationDate, String purpose, Integer term, Double interestRate) {
        this.id = id;
        this.studentName = studentName;
        this.loanAmount = loanAmount;
        this.status = status;
        this.applicationDate = applicationDate;
        this.purpose = purpose;
        this.term = term;
        this.interestRate = interestRate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public Double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(Double loanAmount) { this.loanAmount = loanAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getApplicationDate() { return applicationDate; }
    public void setApplicationDate(Date applicationDate) { this.applicationDate = applicationDate; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public Integer getTerm() { return term; }
    public void setTerm(Integer term) { this.term = term; }

    public Double getInterestRate() { return interestRate; }
    public void setInterestRate(Double interestRate) { this.interestRate = interestRate; }
}
