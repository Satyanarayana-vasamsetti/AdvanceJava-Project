package com.dl.security.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dl.security.model.Student;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class StudentController {
	
	private List<Student> student = new ArrayList<>(List.of(
			new Student(1,"bunny", 95),
			new Student(2, "sai", 89)
			));
			
	
	@GetMapping("/students")
	public List<Student> getStudent(){
		return student;
	}
	
	@GetMapping("/csrf_token")
	public CsrfToken getCSRF(HttpServletRequest request) {
		return (CsrfToken) request.getAttribute("_csrf");
	}
	
	@PostMapping("/students")
	public Student addStudent(@RequestBody Student std) {
		student.add(std);
		return std;
		
	}
}
