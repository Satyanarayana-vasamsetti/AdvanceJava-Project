import { useState } from 'react';
import { LeadForm } from '@/components/leads/LeadForm';
import { leadsAPI } from '@/lib/api';
import { Lead } from '@/types/lead';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CreateLead() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Lead) => {
    try {
      setIsLoading(true);
      await leadsAPI.createLead(data);
      toast({
        title: "Success",
        description: "Lead created successfully"
      });
      navigate('/leads');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to create lead"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold">Create New Lead</h1>
          <p className="text-muted-foreground">
            Add a new lead to the system
          </p>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode="create"
      />
    </div>
  );
}