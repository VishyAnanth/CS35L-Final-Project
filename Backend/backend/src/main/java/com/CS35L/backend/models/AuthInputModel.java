package com.CS35L.backend.models;

import lombok.*;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthInputModel {
    private String token;
    private UserDTO user;
}
