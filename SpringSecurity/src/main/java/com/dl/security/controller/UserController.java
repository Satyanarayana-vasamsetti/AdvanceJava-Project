package com.dl.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dl.security.model.AppUser;
import com.dl.security.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	public UserService ser;
	
	@PostMapping("/register")
	public AppUser register(@RequestBody AppUser user) {
		return ser.register(user); 
	}
	
	@PostMapping("/login")
	public String login(@RequestBody AppUser user) {
		return ser.verify(user);
	}
}
