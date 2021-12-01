package com.CS35L.backend.models;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper<UserDTO> {
    @Override
    public UserDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserDTO user = new UserDTO();
        user.setId(rs.getString("id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setEmail(rs.getString("email"));
        user.setFirstName(rs.getString("firstName"));
        user.setLastName(rs.getString("lastName"));
        user.setEnabled(rs.getBoolean("enabled"));
        user.setNonExpired(rs.getBoolean("nonExpired"));
        user.setNonLocked(rs.getBoolean("nonLocked"));
        user.setCredentialsNonExpired(rs.getBoolean("credentialsNonExpired"));
        user.setScore(rs.getInt("score"));
        return user;
    }
}
