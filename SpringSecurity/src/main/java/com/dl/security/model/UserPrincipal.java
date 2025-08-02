package com.dl.security.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private AppUser user;
	
	public UserPrincipal(AppUser user) {
		this.user=user;
		// TODO Auto-generated constructor stub
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")) ;
	}
	@Override
	public String getUsername() {
		System.out.println("📥 getUsername called: " + user.getUsername());
		return user.getUsername();
	}
	
	@Override
	public String getPassword() {
		System.out.println("📥 getPassword called: " + user.getPassword());
		return user.getPassword();
	}

	
	@Override
	public boolean isAccountNonExpired() {
	    return true;
	}

	@Override
	public boolean isAccountNonLocked() {
	    return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
	    return true;
	}

	@Override
	public boolean isEnabled() {
	    return true;
	}


	

}
