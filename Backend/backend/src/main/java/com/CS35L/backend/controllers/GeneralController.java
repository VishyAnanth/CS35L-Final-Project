package com.CS35L.backend.controllers;

import com.CS35L.backend.models.AuthInputModel;
import com.CS35L.backend.models.AuthOutputModel;
import com.CS35L.backend.models.Status;
import com.CS35L.backend.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeneralController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/")
    public String test() {
        return "THIS IS A TEST";
    }

    @PostMapping("/signUp")
    public AuthOutputModel signUp(@RequestBody AuthInputModel authInputModel) {
        AuthOutputModel response = new AuthOutputModel()
        .setStatus(Status.SUCCESS)
        .setUser(authInputModel.getUser());


        return response;
    }

    @PostMapping("/signIn")
    public AuthOutputModel signIn(@RequestBody AuthInputModel authInputModel) {
        AuthOutputModel response = new AuthOutputModel()
        .setStatus(Status.SUCCESS);


        return response;
    }

    @PostMapping("/signOut")
    public AuthOutputModel signOut(@RequestBody AuthInputModel authInputModel) {
        AuthOutputModel response = new AuthOutputModel()
        .setStatus(Status.SUCCESS);

        
        return response;
    }
}
