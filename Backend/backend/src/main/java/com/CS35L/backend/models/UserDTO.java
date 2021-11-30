package com.CS35L.backend.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean enabled;
	private Boolean nonExpired;
	private Boolean nonLocked;
    private Boolean credentialsNonExpired;
    private Integer score;
}
