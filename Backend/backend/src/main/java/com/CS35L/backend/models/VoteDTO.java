package com.CS35L.backend.models;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class VoteDTO {
    private String id;
    private String userId;
    private String postId;
    private Integer vote;
}
