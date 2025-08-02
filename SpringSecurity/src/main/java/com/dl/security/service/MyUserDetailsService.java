package com.dl.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dl.security.model.AppUser;
import com.dl.security.model.UserPrincipal;
import com.dl.security.repository.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepo repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("Trying to load user: " + username);
		

		AppUser user = repo.findByUsername(username);
		if(user==null) {
			System.out.println("User not found in DB");
			System.out.println("User not found");
			throw new UsernameNotFoundException("User not found");
		}
		System.out.println("User found: " + user);
		return new UserPrincipal(user);
	}

}
