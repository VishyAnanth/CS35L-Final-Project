package com.CS35L.backend.models;

import java.util.Date;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PostDTO {
    private String id;
    private String base64;
    private String title;
    private String caption;
    private String posterId;
    private String posterUsername;
    private Double latitude;
    private Double longitude;
    private Date date;
    private Integer mood;
    private Integer upvotes;
    private Integer downvotes;
}