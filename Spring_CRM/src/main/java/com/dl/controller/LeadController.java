package com.dl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dl.model.LeadModel;
import com.dl.service.LeadService;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

	@Autowired
	LeadService leadservice;

	public LeadController(LeadService leadservice) {
		super();
		this.leadservice = leadservice;
	}
	
	@PostMapping("/createLead")
	public LeadModel createLead(@RequestBody LeadModel leadmodel) {
		return leadservice.createLead(leadmodel);
	}
	
	@GetMapping("/getAllLeads")
	public List<LeadModel> getAllLeads(){
		return leadservice.getAllLeads();
	}
	
	
}
