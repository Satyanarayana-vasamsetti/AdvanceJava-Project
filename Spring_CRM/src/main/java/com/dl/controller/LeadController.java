package com.dl.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	//http://localhost:8080/api/leads/createLead
	@PostMapping("/createLead")
	public LeadModel createLead(@RequestBody LeadModel leadmodel) {
		return leadservice.createLead(leadmodel);
	}
	
	//http://localhost:8080/api/leads/getAllLeads
	@GetMapping("/getAllLeads")
	public List<LeadModel> getAllLeads(){
		return leadservice.getAllLeads();
	}
	
	//http://localhost:8080/api/leads/1
	@GetMapping("/{id}")
	public ResponseEntity<LeadModel> getLeadById(@PathVariable Integer id){
		Optional<LeadModel> lead = leadservice.getLeadById(id);
		
		//if returns first element of stream
		if(lead.isPresent()) {
			return ResponseEntity.ok(lead.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	//http://localhost:8080/api/leads/updateLead
	@PutMapping("/updateLead")
	public LeadModel updateLead(@RequestBody LeadModel leadModel) {
		return leadservice.updateLeadById(leadModel);
		
	}
	
	//http://localhost:8080/api/leads/users/count
	@GetMapping("/users/count")
	public Long countAllLeadStatus() {
		return leadservice.countAllLeadsStatus();
	}
	//http://localhost:8080/api/leads/NOTCONTACTED/leadStatus
	@GetMapping("/{status}/leadStatus")
	public ResponseEntity<Map<String, Object>> getCountAndOrderByStatus(@PathVariable("status") LeadModel.LeadStatus leadStatus){
		List<LeadModel> orders = leadservice.getCountAndOrderByStatus(leadStatus);
		int count = orders.size();
		HashMap<String, Object> response = new HashMap<String, Object>();
		response.put("count", count);
		response.put("orders", orders);	
		
		return ResponseEntity.ok(response);
		
	}
	
}
