package com.dl.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dl.model.LeadModel;

@Repository
public interface LeadRepository extends JpaRepository<LeadModel,Integer>{
	List<LeadModel> findByLeadStatus(LeadModel leadModel);
//	
//	List<LeadModel>	findByLeadUserName(String leasUserName);
//	
//	List<LeadModel>	findByLeadUserNameStartingWith(String prefix);
//
//	LeadModel findByEmail(String email);
}
