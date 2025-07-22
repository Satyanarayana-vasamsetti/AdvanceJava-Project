package com.dl.model;

import java.util.Date;

import jakarta.persistence.Column;
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
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private BatchTiming batchTiming;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Courses courses;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private LeadStatus leadStatus;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private TechStack stack;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private LeadSource leadSource;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ClassMode classMode;
	
	@Getter
	@AllArgsConstructor
	public enum BatchTiming {
		_7AM_8AM,
		_8AM_9AM,
		_9AM_10AM,
		_10AM_11AM,
		_11AM_12PM,
		_12PM_1PM,
		_1PM_2PM,
		_2PM_3PM,
		_3PM_4PM,
		_4PM_5PM,
		_5PM_6PM,
		_6PM_7PM,
		_7PM_8PM,
		_8PM_9PM
		
	}
	
	@Getter
	@AllArgsConstructor
	public enum ClassMode {
		HYD_CLASSROOM,
		BLR_CLASSROOM,
		INDIA_ONLINE,
		INTERNATIONAL_ONLINE
	}
	
	@Getter
	@AllArgsConstructor
	public enum Courses {
		ANGULAAR,
		AWSWITHDEVOPS,
		AZURE,
		AZUREDEVOPS,
		BUSINESSANLAYST,
		CLOUDOPSMASTERS,
		DEVOPSI,
		FRONTENDANGULAR,
		FRONTENDREACT,
		FULLSTACK_JAVA,
		FULLSTACK_MEAN,
		FULLSTACK_MERN,
		FULLSTACK_PYTHON,
		FULLSTACK_REACT_JAVA,
		JAVA,
		NEEDCOUNSELLING,
		OTHERS,
		POWERBI,
		PYTHON,
		REACT,
		SALESFORCEADMIN,
		SALESFORCEDEVELOPER,
		SERVICENOW,
		AZUREDATAENGINEER,
		TABLEAU,
		TESTING
	}
	
	@Getter
	@AllArgsConstructor
	public enum LeadSource {
		NONE,
		WALKIN,
		STUDENTREFERAL,
		DEMO,
		WEBSITE,
		INBOUNDCALL,
		GOOGLEADDWORDS,
		FACEBOOKADS,
		GOOGLEMYBUSINESS,
		WHATSAPPDL
		
	}
	
	@Getter
	@AllArgsConstructor
	public enum LeadStatus {
		NONE,
		NOTCONTACTED,
		ATTEMPTED,
		WARMLEAD,
		OPPORTUNITY,
		ATTENDEDDEMO,
		VISITED,
		REGISTERED,
		COLDLEAD
		
		
	}
	
	@Getter
	@AllArgsConstructor
	public enum TechStack {
			CLOUDOPS,
			SALESFORCE,
			FULLSTACK,
			DATASTACK,
			SERVICENOW,
			BUSINESSSTACK

	}

	
}
