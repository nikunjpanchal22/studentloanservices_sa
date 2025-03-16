package com.studentloanservices.bank_admin_service.controller;

import com.studentloanservices.bank_admin_service.model.LoanApplication;
import com.studentloanservices.bank_admin_service.service.LoanApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class LoanApplicationController {

    @Autowired
    private final LoanApplicationService loanApplicationService;

    public LoanApplicationController(LoanApplicationService loanApplicationService) {
        this.loanApplicationService = loanApplicationService;
    }

    @GetMapping("/pending")
    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationService.getAllLoanApplications();
    }

    @GetMapping("/approved")
    public int getApprovedApplications() {
        return loanApplicationService.getApprovedApplications();
    }

    @GetMapping("/active")
    public int getActiveApplications() {
        return loanApplicationService.getActiveApplications();
    }

    @GetMapping("/portfolio")
    public Long getBankPortfolio() {
        return loanApplicationService.getBankPortfolio();
    }

    @GetMapping("/manageloans")
    public List<LoanApplication> manageLoanApplications() {
        return loanApplicationService.manageLoanApplications();
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<LoanApplication> getLoanApplicationById(@PathVariable Long id) {
        LoanApplication loan = loanApplicationService.getLoanApplicationById(id);
        return loan != null ? ResponseEntity.ok(loan) : ResponseEntity.notFound().build();
    }

    @PostMapping("create")
    public ResponseEntity<String> createLoanApplication(@RequestBody LoanApplication loan) {
        int result = loanApplicationService.saveLoanApplication(loan);
        return result > 0 ? ResponseEntity.ok("Loan application created successfully")
                : ResponseEntity.status(500).body("Error creating loan application");
    }

    @PutMapping("/update/{id}/status")
    public ResponseEntity<String> updateLoanStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            String result = loanApplicationService.approveLoan(id, status);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLoanApplication(@PathVariable Long id) {
        int result = loanApplicationService.deleteLoanApplication(id);
        return result > 0 ? ResponseEntity.ok("Loan application deleted successfully")
                : ResponseEntity.status(404).body("Loan application not found");
    }
}