package com.dl.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class LeadConfig {
	@Bean
	ModelMapper modelMapper(){
		return new ModelMapper();
		
	}
}
