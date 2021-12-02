package com.CS35L.backend.models;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class VoteRowMapper implements RowMapper<VoteDTO> {
    @Override
    public VoteDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        VoteDTO vote = new VoteDTO();
        vote.setId(rs.getString("id"));
        vote.setUserId(rs.getString("userid"));
        vote.setPostId(rs.getString("postid"));
        vote.setVote(rs.getInt("vote"));
        return vote;
    }
}
