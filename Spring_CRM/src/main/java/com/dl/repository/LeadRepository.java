package com.dl.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dl.model.LeadModel;

@Repository
public interface LeadRepository extends JpaRepository<LeadModel,Integer>{

	List<LeadModel> findByLeadStatus(LeadModel.LeadStatus leadStatus);	
}
