package com.dl.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dl.security.model.AppUser;

@Repository
public interface UserRepo extends JpaRepository<AppUser,Integer>{

	AppUser findByUsername(String username);

}
