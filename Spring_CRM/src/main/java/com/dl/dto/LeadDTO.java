package com.dl.dto;

import java.util.Date;


import com.dl.model.LeadModel.BatchTiming;
import com.dl.model.LeadModel.ClassMode;
import com.dl.model.LeadModel.Courses;
import com.dl.model.LeadModel.LeadSource;
import com.dl.model.LeadModel.LeadStatus;
import com.dl.model.LeadModel.TechStack;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeadDTO {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Mobile number is required")
    @Digits(integer = 10, fraction = 0, message = "Mobile number must be 10 digits")
    private Long customerMobileNo;

    @NotNull(message = "Fee is required")
    @Min(value = 1000, message = "Minimum fee should be 1000")
    private Double customerFeeCoated;

    private String description;
    private Date customerDate;

    @NotNull(message = "Batch timing is required")
    private BatchTiming batchTiming;

    @NotNull(message = "Course is required")
    private Courses courses;

    @NotNull(message = "Lead status is required")
    private LeadStatus leadStatus;

    @NotNull(message = "Tech stack is required")
    private TechStack stack;

    @NotNull(message = "Lead source is required")
    private LeadSource leadSource;

    @NotNull(message = "Class mode is required")
    private ClassMode classMode;
}
