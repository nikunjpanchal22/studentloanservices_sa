package com.studentloanservices.bank_admin_service.repository;

import com.studentloanservices.bank_admin_service.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<User> rowMapper = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setEmail(rs.getString("email"));
            return user;
        }
    };

    public int save(User user) throws RuntimeException {
        String sql = "INSERT INTO \"users\" (username, password, email) VALUES (?, ?, ?)";
        try {
            return jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail());
        } catch (Exception e) {
            throw new RuntimeException("Failed to save user: " + e.getMessage(), e);
        }
    }

    // Existing method for username lookup
    public User findByUsername(String username) throws RuntimeException {
        String sql = "SELECT * FROM \"users\" WHERE username = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{username}, rowMapper);
        } catch (Exception e) {
            return null; // User not found
        }
    }

    // New method to find user by email (for login)
    public User findByEmail(String email) throws RuntimeException {
        String sql = "SELECT * FROM \"users\" WHERE email = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{email}, rowMapper);
        } catch (Exception e) {
            return null; // User not found
        }
    }

    public boolean existsByUsername(String username) throws RuntimeException {
        String sql = "SELECT COUNT(*) FROM \"users\" WHERE username = ?";
        try {
            Integer count = jdbcTemplate.queryForObject(sql, new Object[]{username}, Integer.class);
            return count != null && count > 0;
        } catch (Exception e) {
            throw new RuntimeException("Failed to check username existence: " + e.getMessage(), e);
        }
    }

    public boolean existsByEmail(String email) throws RuntimeException {
        String sql = "SELECT COUNT(*) FROM \"users\" WHERE email = ?";
        try {
            Integer count = jdbcTemplate.queryForObject(sql, new Object[]{email}, Integer.class);
            return count != null && count > 0;
        } catch (Exception e) {
            throw new RuntimeException("Failed to check email existence: " + e.getMessage(), e);
        }
    }
}