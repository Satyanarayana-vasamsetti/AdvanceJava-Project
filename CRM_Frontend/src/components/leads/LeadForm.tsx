import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead, BatchTiming, Courses, LeadStatus, TechStack, LeadSource, ClassMode } from '@/types/lead';
import { Save, Plus } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (data: Lead) => Promise<void>;
  initialData?: Partial<Lead>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export const LeadForm = ({ onSubmit, initialData, isLoading, mode = 'create' }: LeadFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Lead>({
    defaultValues: initialData || {
      customerDate: new Date().toISOString().split('T')[0],
    },
  });

  const formatEnumLabel = (value: string) => {
    return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          {mode === 'create' ? (
            <Plus className="h-6 w-6 text-primary" />
          ) : (
            <Save className="h-6 w-6 text-primary" />
          )}
          <div>
            <CardTitle className="text-2xl">
              {mode === 'create' ? 'Create New Lead' : 'Edit Lead'}
            </CardTitle>
            <CardDescription>
              {mode === 'create' 
                ? 'Add a new lead to the system' 
                : 'Update lead information'
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  {...register('customerName', { required: 'Customer name is required' })}
                  className={errors.customerName ? 'border-destructive' : ''}
                  placeholder="Enter customer name"
                />
                {errors.customerName && (
                  <p className="text-sm text-destructive">{errors.customerName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email format'
                    }
                  })}
                  className={errors.email ? 'border-destructive' : ''}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerMobileNo">Mobile Number *</Label>
                <Input
                  id="customerMobileNo"
                  type="number"
                  {...register('customerMobileNo', { 
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Mobile number must be 10 digits'
                    }
                  })}
                  className={errors.customerMobileNo ? 'border-destructive' : ''}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.customerMobileNo && (
                  <p className="text-sm text-destructive">{errors.customerMobileNo.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerFeeCoated">Fee *</Label>
                <Input
                  id="customerFeeCoated"
                  type="number"
                  step="0.01"
                  {...register('customerFeeCoated', { 
                    required: 'Fee is required',
                    min: { value: 1000, message: 'Minimum fee should be 1000' }
                  })}
                  className={errors.customerFeeCoated ? 'border-destructive' : ''}
                  placeholder="Enter fee amount"
                />
                {errors.customerFeeCoated && (
                  <p className="text-sm text-destructive">{errors.customerFeeCoated.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter description (optional)"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Course Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Course *</Label>
                <Controller
                  name="courses"
                  control={control}
                  rules={{ required: 'Course is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Courses).map((course) => (
                          <SelectItem key={course} value={course}>
                            {formatEnumLabel(course)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.courses && (
                  <p className="text-sm text-destructive">{errors.courses.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tech Stack *</Label>
                <Controller
                  name="stack"
                  control={control}
                  rules={{ required: 'Tech stack is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tech stack" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TechStack).map((stack) => (
                          <SelectItem key={stack} value={stack}>
                            {formatEnumLabel(stack)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.stack && (
                  <p className="text-sm text-destructive">{errors.stack.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Batch Timing *</Label>
                <Controller
                  name="batchTiming"
                  control={control}
                  rules={{ required: 'Batch timing is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch timing" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(BatchTiming).map((timing) => (
                          <SelectItem key={timing} value={timing}>
                            {formatEnumLabel(timing)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.batchTiming && (
                  <p className="text-sm text-destructive">{errors.batchTiming.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Class Mode *</Label>
                <Controller
                  name="classMode"
                  control={control}
                  rules={{ required: 'Class mode is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ClassMode).map((mode) => (
                          <SelectItem key={mode} value={mode}>
                            {formatEnumLabel(mode)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.classMode && (
                  <p className="text-sm text-destructive">{errors.classMode.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Lead Status *</Label>
                <Controller
                  name="leadStatus"
                  control={control}
                  rules={{ required: 'Lead status is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(LeadStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {formatEnumLabel(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.leadStatus && (
                  <p className="text-sm text-destructive">{errors.leadStatus.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Lead Source *</Label>
                <Controller
                  name="leadSource"
                  control={control}
                  rules={{ required: 'Lead source is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(LeadSource).map((source) => (
                          <SelectItem key={source} value={source}>
                            {formatEnumLabel(source)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.leadSource && (
                  <p className="text-sm text-destructive">{errors.leadSource.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-border">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
            >
              {isLoading ? (
                mode === 'create' ? 'Creating...' : 'Updating...'
              ) : (
                mode === 'create' ? 'Create Lead' : 'Update Lead'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};