import { Lead, LeadStatus } from '@/types/lead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Target, 
  Users,
  X,
  Edit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
  onEdit?: (lead: Lead) => void;
}

export const LeadDetails = ({ lead, onClose, onEdit }: LeadDetailsProps) => {
  const { user } = useAuth();

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

  const formatEnumLabel = (value: string) => {
    return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">{lead.customerName}</CardTitle>
                <CardDescription>Lead ID: {lead.customerid}</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              {user?.role === 'ADMIN' && onEdit && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(lead)}
                  title="Edit lead"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  <p className="font-medium">{lead.customerMobileNo}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Course & Fee Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Course</p>
                <p className="font-medium">{formatEnumLabel(lead.courses)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Tech Stack</p>
                <p className="font-medium">{formatEnumLabel(lead.stack)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Batch Timing</p>
                <p className="font-medium">{formatEnumLabel(lead.batchTiming)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Class Mode</p>
                <p className="font-medium">{formatEnumLabel(lead.classMode)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Fee</p>
                  <p className="font-medium text-success">₹{lead.customerFeeCoated?.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(lead.customerDate)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Lead Status & Source */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Target className="h-5 w-5" />
              Lead Status & Source
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Lead Status</p>
                <Badge variant={getStatusBadgeVariant(lead.leadStatus)} className="text-sm">
                  {formatEnumLabel(lead.leadStatus)}
                </Badge>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Lead Source</p>
                <p className="font-medium">{formatEnumLabel(lead.leadSource)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {lead.description && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Description</h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm leading-relaxed">{lead.description}</p>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            {user?.role === 'ADMIN' && onEdit && (
              <Button
                onClick={() => onEdit(lead)}
                className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Lead
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};