import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lead, LeadStatus } from '@/types/lead';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, Edit, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LeadTableProps {
  leads: Lead[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewLead: (lead: Lead) => void;
  onEditLead?: (lead: Lead) => void;
  isLoading?: boolean;
}

export const LeadTable = ({
  leads,
  totalElements,
  currentPage,
  totalPages,
  onPageChange,
  onViewLead,
  onEditLead,
  isLoading
}: LeadTableProps) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadgeVariant = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.REGISTERED:
        return 'default';
      case LeadStatus.WARMLEAD:
        return 'secondary';
      case LeadStatus.OPPORTUNITY:
        return 'outline';
      case LeadStatus.COLDLEAD:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatEnumLabel = (value: any) => {
    if (typeof value !== 'string') return '-';
    return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.leadStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-pulse">Loading leads...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Leads Management</CardTitle>
            <CardDescription>
              Total {totalElements} leads found
            </CardDescription>
          </div>
          
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.values(LeadStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {formatEnumLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Table for desktop */}
        <div className="overflow-x-auto hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No leads found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.customerid} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{lead.customerName}</div>
                      <div className="text-sm text-muted-foreground">ID: {lead.customerid}</div>
                    </TableCell>
                    <TableCell>
                      <div>{lead.email}</div>
                      <div className="text-sm text-muted-foreground">{lead.customerMobileNo}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatEnumLabel(lead.courses)}</div>
                      <div className="text-sm text-muted-foreground">{formatEnumLabel(lead.stack)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(lead.leadStatus)}>
                        {formatEnumLabel(lead.leadStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{lead.customerFeeCoated?.toLocaleString()}</TableCell>
                    <TableCell>{formatEnumLabel(lead.leadSource)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => onViewLead(lead)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user?.role === 'ADMIN' && onEditLead && (
                          <Button variant="ghost" size="icon" onClick={() => onEditLead(lead)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden space-y-4">
          {filteredLeads.length === 0 ? (
            <Card className="p-4 text-center text-muted-foreground">No leads found</Card>
          ) : (
            filteredLeads.map((lead) => (
              <Card key={lead.customerid} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{lead.customerName}</h3>
                    <p className="text-xs text-muted-foreground">ID: {lead.customerid}</p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(lead.leadStatus)}>
                    {formatEnumLabel(lead.leadStatus)}
                  </Badge>
                </div>
                <div className="mt-2 text-sm space-y-1">
                  <p><span className="font-medium">Email:</span> {lead.email}</p>
                  <p><span className="font-medium">Mobile:</span> {lead.customerMobileNo}</p>
                  <p><span className="font-medium">Course:</span> {formatEnumLabel(lead.courses)}</p>
                  <p><span className="font-medium">Stack:</span> {formatEnumLabel(lead.stack)}</p>
                  <p><span className="font-medium">Fee:</span> ₹{lead.customerFeeCoated?.toLocaleString()}</p>
                  <p><span className="font-medium">Source:</span> {formatEnumLabel(lead.leadSource)}</p>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => onViewLead(lead)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  {user?.role === 'ADMIN' && onEditLead && (
                    <Button size="sm" variant="outline" onClick={() => onEditLead(lead)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
