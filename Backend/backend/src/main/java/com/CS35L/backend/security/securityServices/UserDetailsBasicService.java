package com.CS35L.backend.security.securityServices;

import java.util.Optional;

import com.CS35L.backend.models.UserDTO;
import com.CS35L.backend.models.UserRowMapper;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsBasicService implements UserDetailsService {

    private final JdbcTemplate jdbcTemplate;

    public UserDetailsBasicService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDTO user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", new UserRowMapper(), username)).orElse(null);
        return new UserDetailsBasicAuth(user);
    }

    public UserDetails loadUserByEmail(String email) {
        UserDTO user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE email = ?", new UserRowMapper(), email)).orElse(null);
        return new UserDetailsBasicAuth(user);
    }
}
