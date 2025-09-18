import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadDetails } from '@/components/leads/LeadDetails';
import { leadsAPI } from '@/lib/api';
import { Lead, LeadPageResponse } from '@/types/lead';
import { useAuth } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function LeadsList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeads(currentPage);
  }, [currentPage]);

  const loadLeads = async (page: number) => {
    try {
      setIsLoading(true);
      const response: LeadPageResponse = await leadsAPI.getAllLeads(page, 10);
      setLeads(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load leads',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleEditLead = (lead: Lead) => {
    navigate(`/leads/edit/${lead.customerid}`, { state: { lead } });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6 px-3 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Leads Management
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Manage and track all your leads in one place
          </p>
        </div>

        {user?.role === 'ADMIN' && (
          <Link to="/leads/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-sm md:text-base">
              <Plus className="h-4 w-4 mr-2" />
              Create New Lead
            </Button>
          </Link>
        )}
      </div>

      {/* Leads Table (scrollable on small devices) */}
      <div className="overflow-x-auto rounded-lg border">
        <div className="min-w-[600px]">
          <LeadTable
            leads={leads}
            totalElements={totalElements}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onViewLead={handleViewLead}
            onEditLead={user?.role === 'ADMIN' ? handleEditLead : undefined}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/50">
          <div className="w-full max-w-full sm:max-w-lg h-[90vh] sm:h-auto bg-background rounded-xl shadow-lg overflow-y-auto">
            <LeadDetails
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
              onEdit={user?.role === 'ADMIN' ? handleEditLead : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
