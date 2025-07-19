package com.dl.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LeadModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer customerid;
	private String customerName;
	private String email;
	private Long customerMobileNo;
	private Double customerFeeCoated;
	private String description;
	private Date customerDate;
	
	@Enumerated(EnumType.STRING)
	private BatchTiming batchTiming;
	
	@Enumerated(EnumType.STRING)
	private Courses courses;
	
	@Enumerated(EnumType.STRING)
	private LeadStatus leadStatus;
	
	@Enumerated(EnumType.STRING)
	private TechStack stack;
	
	@Enumerated(EnumType.STRING)
	private LeadSource leadSource;
	
	@Enumerated(EnumType.STRING)
	private ClassMode classMode;
	
	
}
