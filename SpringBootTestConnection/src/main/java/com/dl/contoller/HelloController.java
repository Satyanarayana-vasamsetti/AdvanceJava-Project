package com.dl.contoller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HelloController {
	
	@GetMapping("/get")
	public String get() {
		return "Get method is invoke";
	}
	
	@PutMapping("/put")
	public String put() {
		return "Put method invoke";  
	}
	
	@PostMapping("/post")
	public String post() {
		return "Post method invoke";  
	}
	
	@DeleteMapping("/delete")
	public String delete() {
		return "Delete method invoke";  
	}
	 
}
