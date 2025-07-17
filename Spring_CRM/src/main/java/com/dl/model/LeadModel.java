package com.dl.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class LeadModel {
	private int customerid;
	private String customerName;
	private String email;
	private long customerMobileNo;
	private double customerFeeCoated;
	private String description;
	private Date customerDate;
	
	
}
