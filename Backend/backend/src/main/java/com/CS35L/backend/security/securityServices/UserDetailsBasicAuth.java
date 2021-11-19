package com.CS35L.backend.security.securityServices;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import com.CS35L.backend.models.UserDTO;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsBasicAuth implements UserDetails {

    private UserDTO user;
    
    public UserDetailsBasicAuth(UserDTO pUser) {
        this.user = pUser;
    }

    public static UserDetailsBasicAuth build(UserDTO pUser) {
        return new UserDetailsBasicAuth(pUser);
    }

    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> l = new ArrayList<>();
        l.add(new SimpleGrantedAuthority(String.valueOf("1")));
        return l;
	}

	public String getId() {
		return this.user.getId();
	}

    @Override
	public String getPassword() {
		return this.user.getPassword();
	}

    @Override
	public String getUsername() {
		return this.user.getUsername();
	}

    @Override
	public boolean isEnabled() {
		return this.user.getEnabled();
	}

    @Override
	public boolean isCredentialsNonExpired() {
		return this.user.getCredentialsNonExpired();
	}

    @Override
	public boolean isAccountNonExpired() {
		return this.user.getNonExpired();
	}

    @Override
	public boolean isAccountNonLocked() {
		return this.user.getNonLocked();
	}

    @Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsBasicAuth u = (UserDetailsBasicAuth) o;
		return Objects.equals(this.user.getId(), u.getId());
	}
    
}
