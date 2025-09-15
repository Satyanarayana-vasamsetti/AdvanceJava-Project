import { useState, useEffect } from 'react';
import { LeadForm } from '@/components/leads/LeadForm';
import { leadsAPI } from '@/lib/api';
import { Lead } from '@/types/lead';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function EditLead() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { toast } = useToast();
  
  const [lead, setLead] = useState<Lead | null>(location.state?.lead || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLead, setIsLoadingLead] = useState(!lead);

  useEffect(() => {
    if (!lead && id) {
      loadLead(parseInt(id));
    }
  }, [id, lead]);

  const loadLead = async (leadId: number) => {
    try {
      setIsLoadingLead(true);
      const leadData = await leadsAPI.getLeadById(leadId);
      setLead(leadData);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load lead details"
      });
      navigate('/leads');
    } finally {
      setIsLoadingLead(false);
    }
  };

  const handleSubmit = async (data: Lead) => {
    try {
      setIsLoading(true);
      const updatedData = { ...data, customerid: lead?.customerid };
      await leadsAPI.updateLead(updatedData);
      toast({
        title: "Success",
        description: "Lead updated successfully"
      });
      navigate('/leads');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to update lead"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingLead) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-48"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-96 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Lead not found</p>
        <Button onClick={() => navigate('/leads')} className="mt-4">
          Back to Leads
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/leads')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Lead</h1>
          <p className="text-muted-foreground">
            Update lead information for {lead.customerName}
          </p>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm
        onSubmit={handleSubmit}
        initialData={lead}
        isLoading={isLoading}
        mode="edit"
      />
    </div>
  );
}