package com.CS35L.backend.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.CS35L.backend.models.AuthInputModel;
import com.CS35L.backend.models.AuthOutputModel;
import com.CS35L.backend.models.PostDTO;
import com.CS35L.backend.models.PostOutputModel;
import com.CS35L.backend.models.PostRowMapper;
import com.CS35L.backend.models.Status;
import com.CS35L.backend.models.UserDTO;
import com.CS35L.backend.models.UserRowMapper;
import com.CS35L.backend.models.VoteDTO;
import com.CS35L.backend.models.VoteRowMapper;
import com.CS35L.backend.security.jwt.JwtUtils;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

@RestController
@RequestMapping("/")
public class GeneralController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    private final JdbcTemplate jdbcTemplate;

    private PasswordEncoder passwordEncoder() {
		return new Argon2PasswordEncoder();
	}

    public GeneralController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/")
    public String test() {
        return "THIS IS A TEST";
    }

    @PostMapping("/signUp")
    public AuthOutputModel signUp(@RequestBody AuthInputModel authInputModel) {
        AuthOutputModel response = new AuthOutputModel()
        .setStatus(Status.SUCCESS)
        .setUser(authInputModel.getUser());
        try {
            Boolean usernameExists = Optional.of(this.jdbcTemplate.queryForObject("SELECT EXISTS(SELECT 1 FROM users WHERE username = ?)", Boolean.class, authInputModel.getUser().getUsername())).orElse(false);
            Boolean emailExists = Optional.of(this.jdbcTemplate.queryForObject("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)", Boolean.class, authInputModel.getUser().getEmail())).orElse(false);

            if(!usernameExists && !emailExists) {
                UUID uuid = UUID.randomUUID();
                this.jdbcTemplate.update("INSERT INTO users (id, username, password, email, firstName, lastName, enabled, nonExpired, nonLocked, credentialsNonExpired, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                uuid,
                authInputModel.getUser().getUsername(),
                passwordEncoder().encode(authInputModel.getUser().getPassword()),
                authInputModel.getUser().getEmail(),
                authInputModel.getUser().getFirstName(),
                authInputModel.getUser().getLastName(),
                true,
                true,
                true,
                true,
                0);
            } else {
                response.setStatus(Status.ERROR);
            }
        } catch(EmptyResultDataAccessException e) {
            response.setStatus(Status.ERROR);
        }
        if(response.getStatus() == Status.SUCCESS) {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authInputModel.getUser().getUsername(), authInputModel.getUser().getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            response.setUser(authInputModel.getUser());
            response.setToken(jwt);
        }
        return response;
    }

    @PostMapping("/signIn")
    public AuthOutputModel signIn(@RequestBody AuthInputModel authInputModel) {
        AuthOutputModel response = new AuthOutputModel()
        .setStatus(Status.SUCCESS);

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authInputModel.getUser().getUsername(), authInputModel.getUser().getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        response.setUser(authInputModel.getUser());
        response.setToken(jwt);
        return response;
    }

    @PostMapping("/signOut")
    public AuthOutputModel signOut(HttpServletRequest request, HttpServletResponse response) {
        AuthOutputModel res = new AuthOutputModel()
        .setStatus(Status.SUCCESS);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
            return res;
        }
        res.setStatus(Status.ERROR);
        return res;
    }

    @PostMapping("/searchUserByUsername")
    public List<UserDTO> searchUser(@RequestBody AuthInputModel authInputModel) {
        try {
            List<UserDTO> users = Optional.of(jdbcTemplate.query("SELECT * FROM users WHERE username LIKE ? LIMIT 3", new UserRowMapper(), "%"+authInputModel.getUser().getUsername()+"%")).orElse(null);
            for(UserDTO user : users) {
                user.setPassword("");
            }
            return users;
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }

    @PostMapping("/getUser")
    public AuthOutputModel getUser(@RequestBody AuthInputModel authInputModel) {
        AuthOutputModel res = new AuthOutputModel()
        .setStatus(Status.SUCCESS);
        try {
            UserDTO user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", new UserRowMapper(), authInputModel.getUser().getUsername())).orElse(null);
            res.setUser(user);
            res.getUser().setPassword("");
        } catch(EmptyResultDataAccessException e) {
            res.setStatus(Status.ERROR);
        }
        return res;
    }

    @PostMapping("/post")
    public PostOutputModel post(@RequestBody PostDTO postDTO) {
        PostOutputModel res = new PostOutputModel()
        .setStatus(Status.SUCCESS);
        UUID uuid = UUID.randomUUID();
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        try {
            UserDTO user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", new UserRowMapper(), username)).orElse(null);
            if(user != null) {
                this.jdbcTemplate.update("INSERT INTO posts (id, base64, title, caption, posterId, latitude, longitude, date, mood, upvotes, downvotes, posterUsername) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
                    uuid,
                    postDTO.getBase64(),
                    postDTO.getTitle(),
                    postDTO.getCaption(),
                    user.getId(),
                    postDTO.getLatitude(),
                    postDTO.getLongitude(),
                    new Date(System.currentTimeMillis()),
                    postDTO.getMood(),
                    0,
                    0,                    
                    user.getUsername());
                this.jdbcTemplate.update("UPDATE users SET score = ? WHERE username = ?", 
                    user.getScore() + 2,
                    username);
                res.setPost(postDTO);
            } else {
                res.setStatus(Status.ERROR);
            }
        } catch(EmptyResultDataAccessException e) {
            res.setStatus(Status.ERROR);
        }
        
        return res;
    }

    @PostMapping("/searchPost")
    public List<PostDTO> search(@RequestBody PostDTO postDTO) {
        try {
            List<PostDTO> posts = Optional.of(jdbcTemplate.query("SELECT * FROM posts WHERE caption LIKE ? OR title LIKE ?", new PostRowMapper(), "%" + postDTO.getCaption() + "%", "%" + postDTO.getCaption() + "%")).orElse(null);
            return posts;
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }

    @GetMapping("/scores")
    public List<UserDTO> getScores() {
        List<UserDTO> users = Optional.of(jdbcTemplate.query("SELECT * FROM users ORDER BY score DESC", new UserRowMapper())).orElse(null);
        for(UserDTO user : users) {
            user.setPassword("");
        }
        return users;
    }

    @PostMapping("/getPostsOfUser")
    public List<PostDTO> getPostsByUsername(@RequestBody AuthInputModel authInputModel) {
        try {
            UserDTO user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", new UserRowMapper(), authInputModel.getUser().getUsername())).orElse(null);
            if(user != null) {
                List<PostDTO> posts = Optional.of(jdbcTemplate.query("SELECT * FROM posts WHERE posterId = ?", new PostRowMapper(), user.getId())).orElse(null);
                return posts;
            }
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
        return null;
    }
    
    @PostMapping("/vote")
    public VoteDTO vote(@RequestBody VoteDTO vote) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        UserDTO user = null;
        try {
            user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", new UserRowMapper(), username)).orElse(null);
            VoteDTO alreadyVoted = Optional.of(this.jdbcTemplate.queryForObject("SELECT * FROM votes WHERE userid = ? AND postid = ?", new VoteRowMapper(), user.getId(), vote.getPostId())).orElse(null);
            if(alreadyVoted == null) {
                PostDTO post = Optional.of(this.jdbcTemplate.queryForObject("SELECT * FROM posts WHERE id = ?", new PostRowMapper(), vote.getPostId())).orElse(null);
                UserDTO poster = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE id = ?", new UserRowMapper(), post.getPosterId())).orElse(null);
                if(user != null && post != null && poster != null && (vote.getVote() == -1 || vote.getVote() == 1)) {
                    UUID uuid = UUID.randomUUID();
                    this.jdbcTemplate.update("INSERT INTO votes (id, userid, postid, vote) VALUES (?,?,?,?)", 
                        uuid.toString(),
                        user.getId(),
                        vote.getPostId(),
                        vote.getVote());
                    this.jdbcTemplate.update("UPDATE users SET score = ? WHERE id = ?", 
                        poster.getScore() + vote.getVote(),
                        poster.getId());
                    
                    if(vote.getVote() == 1){
                        this.jdbcTemplate.update("UPDATE posts SET upvotes = ? WHERE id = ?", 
                            post.getUpvotes() + 1,
                            post.getId());
                    } else if(vote.getVote() == -1) {
                        this.jdbcTemplate.update("UPDATE posts SET downvotes = ? WHERE id = ?", 
                            post.getDownvotes() + 1,
                            post.getId());
                    }
                }
                vote.setId("SUCCESS");
            } else {
                vote.setId("ERROR");
            }
        } catch(EmptyResultDataAccessException e) {
            PostDTO post = Optional.of(this.jdbcTemplate.queryForObject("SELECT * FROM posts WHERE id = ?", new PostRowMapper(), vote.getPostId())).orElse(null);
            UserDTO poster = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE id = ?", new UserRowMapper(), post.getPosterId())).orElse(null);
            if(user != null && post != null && poster != null && (vote.getVote() == -1 || vote.getVote() == 1)) {
                UUID uuid = UUID.randomUUID();
                this.jdbcTemplate.update("INSERT INTO votes (id, userid, postid, vote) VALUES (?,?,?,?)", 
                    uuid.toString(),
                    user.getId(),
                    vote.getPostId(),
                    vote.getVote());
                this.jdbcTemplate.update("UPDATE users SET score = ? WHERE id = ?", 
                    poster.getScore() + vote.getVote(),
                    poster.getId());

                if(vote.getVote() == 1){
                    this.jdbcTemplate.update("UPDATE posts SET upvotes = ? WHERE id = ?", 
                        post.getUpvotes() + 1,
                        post.getId());
                } else if(vote.getVote() == -1) {
                    this.jdbcTemplate.update("UPDATE posts SET downvotes = ? WHERE id = ?", 
                        post.getDownvotes() + 1,
                        post.getId());
                }
            }
            vote.setId("SUCCESS");
        }
        return vote;
    }

    @PostMapping("/checkVoted")
    public VoteDTO checkVoted(@RequestBody VoteDTO vote) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        UserDTO user = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", new UserRowMapper(), username)).orElse(null);
        try {
            VoteDTO voteCheck = Optional.of(jdbcTemplate.queryForObject("SELECT * FROM votes WHERE userid = ? AND postid = ?", new VoteRowMapper(), user.getId(), vote.getPostId())).orElse(null);
            
            if(voteCheck != null) {
                vote.setId("SUCCESS");
            } else {
                vote.setId("ERROR");
            }
        } catch(EmptyResultDataAccessException e) {
            
            vote.setId("ERROR");
        }
        return vote;
    }
}
