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

	public LeadService(LeadRepository leadrepo) {
		super();
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
	public LeadModel updateLeadById(LeadModel leadModel) {
		return leadrepo.save(leadModel);
	}
	
	//countAllLeads()
	public Long countAllLeadsStatus() {
		return leadrepo.count();
	}
	
	//delete lead by id
	public void deleteLeadById(Integer id) {
		leadrepo.deleteById(id);
	}
	
//	//user defined methods
//	public List<LeadModel> getCountAndOrderByStatus(LeadModel leadModel){
//		return leadrepo.findByLeadStatus(leadModel);
//	}
//	
//	//findLeadByUserName()
//	public List<LeadModel> findLeadByUserName(String leadUsername){
//		return leadrepo.findByLeadUserName(leadUsername); 
//	}
//	
//	public List<LeadModel> findLeadsByUserNameStartingWith(String prefix){
//		return leadrepo.findByLeadUserNameStartingWith(prefix);
//	}
//	
//	public LeadModel findByEmail(String email) {
//		return leadrepo.findByEmail(email);
//	}
}
