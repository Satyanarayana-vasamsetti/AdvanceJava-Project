package com.dl.controller;

import com.dl.dto.LeadDTO;
import com.dl.model.LeadModel;
import com.dl.service.LeadService;

import jakarta.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @Autowired
    private ModelMapper modelMapper;

    // Constructor
    public LeadController(LeadService leadService, ModelMapper modelMapper) {
        this.leadService = leadService;
        this.modelMapper = modelMapper;
    }

    // POST: Create Lead
    @PostMapping("/createLead")
    public ResponseEntity<LeadDTO> createLead(@Valid @RequestBody LeadDTO leadDTO) {
        LeadModel model = modelMapper.map(leadDTO, LeadModel.class);
        LeadModel saved = leadService.createLead(model);
        LeadDTO responseDTO = modelMapper.map(saved, LeadDTO.class);
        return ResponseEntity.ok(responseDTO);
    }

    // GET: Paginated & Sorted List of Leads
    @GetMapping("/getAllLeads")
    public ResponseEntity<Page<LeadDTO>> getAllLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "customerid") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<LeadModel> leadPage = leadService.getAllLeads(pageable);

        Page<LeadDTO> dtoPage = leadPage.map(lead -> modelMapper.map(lead, LeadDTO.class));
        return ResponseEntity.ok(dtoPage);
    }

    // GET: Lead by ID
    @GetMapping("/{id}")
    public ResponseEntity<LeadDTO> getLeadById(@PathVariable Integer id) {
        Optional<LeadModel> optionalLead = leadService.getLeadById(id);
        return optionalLead
                .map(lead -> ResponseEntity.ok(modelMapper.map(lead, LeadDTO.class)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT: Update Lead
    @PutMapping("/updateLead")
    public ResponseEntity<LeadDTO> updateLead(@Valid @RequestBody LeadDTO leadDTO) {
        LeadModel leadModel = modelMapper.map(leadDTO, LeadModel.class);
        LeadModel updated = leadService.updateLeadById(leadModel);
        LeadDTO responseDTO = modelMapper.map(updated, LeadDTO.class);
        return ResponseEntity.ok(responseDTO);
    }

    // GET: Total count of leads
    @GetMapping("/users/count")
    public Long countAllLeadStatus() {
        return leadService.countAllLeadsStatus();
    }

    // GET: Leads filtered by status + count
    @GetMapping("/{status}/leadStatus")
    public ResponseEntity<Map<String, Object>> getCountAndOrderByStatus(@PathVariable("status") LeadModel.LeadStatus leadStatus) {
        List<LeadModel> leads = leadService.getCountAndOrderByStatus(leadStatus);
        List<LeadDTO> leadDTOs = leads.stream().map(lead -> modelMapper.map(lead, LeadDTO.class)).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("count", leadDTOs.size());
        response.put("orders", leadDTOs);

        return ResponseEntity.ok(response);
    }
}
