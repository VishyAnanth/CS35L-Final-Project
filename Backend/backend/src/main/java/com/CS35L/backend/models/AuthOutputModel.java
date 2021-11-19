package com.CS35L.backend.models;

import lombok.*;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthOutputModel {
    private Status status;
    private UserDTO user;
}
