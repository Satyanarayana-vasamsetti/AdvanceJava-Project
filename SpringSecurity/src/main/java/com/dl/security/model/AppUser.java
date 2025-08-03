package com.dl.security.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name = "app_user")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AppUser {
	
	@Id
	private int id;
	
	
	private String username;
	

	private String password;
}
