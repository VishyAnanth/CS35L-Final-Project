package com.CS35L.backend.models;

import lombok.*;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostOutputModel {
    private Status status;
    private PostDTO post;
}
