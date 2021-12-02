package com.CS35L.backend.models;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PostRowMapper implements RowMapper<PostDTO> {
    @Override
    public PostDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        PostDTO post = new PostDTO();
        post.setId(rs.getString("id"));
        post.setBase64(rs.getString("base64"));
        post.setTitle(rs.getString("title"));
        post.setCaption(rs.getString("caption"));
        post.setPosterId(rs.getString("posterId"));
        post.setPosterUsername(rs.getString("posterUsername"));
        post.setLatitude(rs.getDouble("latitude"));
        post.setLongitude(rs.getDouble("longitude"));
        post.setDate(rs.getDate("date"));
        post.setMood(rs.getInt("mood"));
        post.setUpvotes(rs.getInt("upvotes"));
        post.setDownvotes(rs.getInt("downvotes"));
        return post;
    }
}
