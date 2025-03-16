package com.studentloanservices.bank_admin_service.service;

import com.studentloanservices.bank_admin_service.model.LoanApplication;
import com.studentloanservices.bank_admin_service.repository.LoanApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LoanApplicationService {

    @Autowired
    private final LoanApplicationRepository loanApplicationRepository;

    public LoanApplicationService(LoanApplicationRepository loanApplicationRepository) {
        this.loanApplicationRepository = loanApplicationRepository;
    }

    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationRepository.getAllLoanApplications();
    }

    public int getApprovedApplications (){
        return loanApplicationRepository.getApprovedApplications();
    }

    public int getActiveApplications ()  {
        return loanApplicationRepository.getActiveApplications();
    }

    public Long getBankPortfolio() {
        return loanApplicationRepository.getBankPortfolio();
    }

    public List<LoanApplication> manageLoanApplications() {
        return loanApplicationRepository.manageLoanApplications();
    }

    public LoanApplication getLoanApplicationById(Long id) {
        return loanApplicationRepository.getLoanApplicationById(id);
    }

    public int saveLoanApplication(LoanApplication loan) {
        return loanApplicationRepository.saveLoanApplication(loan);
    }

    public String approveLoan(Long id, String status) {
        try {
            int rowsAffected = loanApplicationRepository.updateLoanStatus(id, status);
            if (rowsAffected > 0) {
                return "Loan approved successfully!";
            } else {
                return "No updates performed";
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to approve loan: " + e.getMessage(), e);
        }
    }

    public int deleteLoanApplication(Long id) {
        return loanApplicationRepository.deleteLoanApplication(id);
    }
}