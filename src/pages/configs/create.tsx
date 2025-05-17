import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetFieldOptionsApiAdminConfigsFieldOptionsGetSuspense } from '@/shared/api/generated';
import { createConfigSchema } from '@/shared/lib/create-config-schema';
import { useCreateConfigApiAdminConfigsPost } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { FieldFilter } from '@/shared/api/generated/types/FieldFilter';
import { RecommendationConfig } from '@/shared/api/generated/types/RecommendationConfig';
import { useFormResolver } from '@/shared/lib/use-form-resolver';
import { resolveErrorAsync } from '@/shared/lib/resolve-error';
import { Info } from 'lucide-react';
import { FormFields } from '@/shared/ui/form-fields';
import { ConfigFilterFields } from '@/shared/ui/config-filter-fields';

export const CreateConfigPage = () => {
  const { data: fieldOptions } = useGetFieldOptionsApiAdminConfigsFieldOptionsGetSuspense();
  const createConfig = useCreateConfigApiAdminConfigsPost();
  const navigate = useNavigate();

  const schema = createConfigSchema(fieldOptions?.title_fields || []);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: '',
      description: '',
      is_active: false,
      title_field_filters: [],
      schedules_dates: [],
    },
  });

  const [filters, setFilters] = useState<FieldFilter[]>([]);

  const { handleSubmit } = useFormResolver(form);
  
  const handleFiltersChange = (newFilters: FieldFilter[]) => {
    setFilters(newFilters);
  };
  
  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const config: RecommendationConfig = {
        name: data.name,
        description: data.description,
        is_active: false,
        title_field_filters: filters.filter(f => f.values && f.values.length > 0),
        schedules_dates: data.schedules_dates ?? [],
      };
      await createConfig.mutateAsync({ data: config });
      toast.success('Конфигурация успешно создана');
      navigate('/configs');
    } catch (error) {
      await resolveErrorAsync(error);
    }
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
            
            <div className="bg-muted/40 rounded-md p-4 mb-6 flex gap-3 text-sm border-l-4 border-info">
              <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Важная информация</p>
                <p>После создания конфигурации:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Будет установлено расписание обучения на <strong>04:00</strong> каждый день</li>
                  <li>Конфигурация будет создана с параметром <strong>неактивна</strong></li>
                  <li>После установки параметра <strong>активна</strong> начнется процесс обучения</li>
                </ul>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormFields control={form.control as any} />
              <div className="pt-4">
                <Button type="submit" isLoading={createConfig.isPending}>
                  Создать конфигурацию
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-5">
          <ConfigFilterFields 
            fieldOptions={fieldOptions} 
            onChange={handleFiltersChange}
          />
        </div>
      </div>
    </Form>
  );
}; 