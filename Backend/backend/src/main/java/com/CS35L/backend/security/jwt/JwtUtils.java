package com.CS35L.backend.security.jwt;

import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.stream.Collectors;

import com.CS35L.backend.security.securityServices.UserDetailsBasicAuth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {
    @Value("${FinalProject.app.jwtSecret}")
    private String jwtSecret;

    @Value("${FinalProject.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsBasicAuth userPrincipal = (UserDetailsBasicAuth) authentication.getPrincipal();

        return Jwts.builder().claim("authorities", authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority).collect(Collectors.toList())).setSubject((userPrincipal.getUsername())).setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes(Charset.forName("UTF-8")))
            .compact();
    }
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {

        } catch (MalformedJwtException e) {

        } catch (ExpiredJwtException e) {

        } catch (UnsupportedJwtException e) {

        } catch (IllegalArgumentException e) {

        }
    
        return false;
    }
}
