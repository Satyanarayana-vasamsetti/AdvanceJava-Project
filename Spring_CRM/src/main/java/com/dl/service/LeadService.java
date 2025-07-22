package com.dl.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dl.model.LeadModel;
import com.dl.repository.LeadRepository;

@Service
public class LeadService {

	@Autowired
	LeadRepository leadrepo;

	//constructor using field
	public LeadService(LeadRepository leadrepo) {
		this.leadrepo = leadrepo;
	}
	
	//create method
	public LeadModel createLead(LeadModel leadmodel) {
		return leadrepo.save(leadmodel);
	}
	
	//get all leads
	public List<LeadModel> getAllLeads(){
		return leadrepo.findAll();
	}
	
	//getLeadByID()
	public Optional<LeadModel> getLeadById(Integer id){
		return leadrepo.findById(id);
	}
	
	//update
	public LeadModel updateLeadById(LeadModel leadmodel) {
		return leadrepo.save(leadmodel);
	} 
	
	//countAllLeads()
	public Long countAllLeadsStatus() {
		return leadrepo.count();
	}
	
	public List<LeadModel> getCountAndOrderByStatus(LeadModel.LeadStatus leadStatus){
		return leadrepo.findByLeadStatus(leadStatus);
	}
	
}
