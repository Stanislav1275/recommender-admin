import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  useGetFieldOptionsApiAdminConfigsFieldOptionsGetSuspense,
  useGetConfigApiAdminConfigsConfigIdGetSuspense,
  useUpdateConfigApiAdminConfigsConfigIdPut
} from '@/shared/api/generated';
import { createConfigSchema } from '@/shared/lib/create-config-schema';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldFilter } from '@/shared/api/generated/types/FieldFilter';
import { RecommendationConfig } from '@/shared/api/generated/types/RecommendationConfig';
import { useFormResolver } from '@/shared/lib/use-form-resolver';
import { resolveErrorAsync } from '@/shared/lib/resolve-error';
import { Media, Display } from '@/shared/lib/media';
import { Info } from 'lucide-react';
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalClose,
} from '@/shared/ui/responsive-modal';
import { FormFields } from '@/shared/ui/form-fields';
import { FilterFields } from '@/shared/ui/form-fields';
import { mockTitleFields } from '@/shared/lib/mock-data';

type ConfigFormValues = {
  name: string;
  description: string;
  is_active: boolean;
  title_field_filters?: unknown[];
  schedules_dates?: unknown[];
};

export const EditConfigPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: configResponse } = useGetConfigApiAdminConfigsConfigIdGetSuspense(id || '');
  
  const fieldOptionsQuery = useGetFieldOptionsApiAdminConfigsFieldOptionsGetSuspense();
  const fieldOptions = fieldOptionsQuery.data;
  
  console.log('Field options from API:', fieldOptions);
  
  const fields = fieldOptions || { title_fields: mockTitleFields };
  
  console.log('Using fields:', fields);
  
  const updateConfig = useUpdateConfigApiAdminConfigsConfigIdPut();
  
  const schema = createConfigSchema(fields?.title_fields || []);
  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(schema) as unknown as any,
    defaultValues: {
      name: '',
      description: '',
      is_active: false,
      title_field_filters: [],
      schedules_dates: [],
    },
  });

  const [filters, setFilters] = useState<FieldFilter[]>([]);
  const [originalFilters, setOriginalFilters] = useState<FieldFilter[]>([]);

  useEffect(() => {
    if (configResponse?.config) {
      const configData = configResponse.config;
      
      form.reset({
        name: configData.name,
        description: configData.description,
        is_active: configData.is_active,
      });

      if (fields.title_fields) {
        const preparedFilters: FieldFilter[] = fields.title_fields.map(field => {
          const existingFilter = configData.title_field_filters
            ?.find(filter => filter.field_name === field.name);
            
          if (existingFilter) {
            return {
              ...existingFilter,
              values: existingFilter.values || []
            };
          }

          return {
            field_name: field.name,
            operator: field.operators[0],
            values: []
          };
        });

        setFilters(preparedFilters);
        setOriginalFilters(JSON.parse(JSON.stringify(preparedFilters))); // глубокая копия для сравнения
      }
    }
  }, [configResponse, fields, form]);

  const { handleSubmit } = useFormResolver<ConfigFormValues>(
    form as unknown as typeof form
  );
  
  const handleClearAllFilters = () => {
    setFilters(JSON.parse(JSON.stringify(originalFilters)));
  };
  
  const handleFilterChange = (index: number, filter: FieldFilter) => {
    setFilters(prev => {
      const copy = [...prev];
      copy[index] = filter;
      return copy;
    });
  };

  const onSubmitHandler = async (data: ConfigFormValues) => {
    if (!configResponse?.config) return;
    
    try {
      const updatedConfig: RecommendationConfig = {
        ...configResponse.config,
        name: data.name,
        description: data.description,
        is_active: data.is_active,
        title_field_filters: filters.filter(f => f.values && f.values.length > 0),
      };
      
      await updateConfig.mutateAsync({ 
        config_id: id!,
        data: updatedConfig 
      });
      
      toast.success('Конфигурация успешно обновлена');
      navigate('/configs');
    } catch (error) {
      await resolveErrorAsync(error);
    }
  };

  if (!configResponse?.config) {
    return <div>Загрузка конфигурации...</div>;
  }

  console.log('Rendering with fields:', fields);
  console.log('Filter values:', filters);

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Форма - основные поля */}
        <div className="md:col-span-7">
          <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
            
            {/* Информационное сообщение */}
            <div className="bg-muted/40 rounded-md p-4 mb-6 flex gap-3 text-sm border-l-4 border-info">
              <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Важная информация</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>При активации конфигурации (<strong>is_active = true</strong>) запустится обучение в соответствии с расписанием</li>
                  <li>По умолчанию обучение происходит в <strong>04:00</strong> каждый день</li>
                </ul>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
              <FormFields control={form.control} />
              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <Button type="submit" isLoading={updateConfig.isPending}>
                  Сохранить изменения
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Отменить
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Фильтры - мобильная версия */}
        <div className="md:col-span-5">
          {/* Отладочная информация */}
          <div className="mb-4 text-xs opacity-60">
            <details open>
              <summary>Отладочная информация</summary>
              <pre className="whitespace-pre-wrap overflow-auto max-h-40">
                {JSON.stringify(fields, null, 2)}
              </pre>
              <p className="mt-2 font-bold">title_fields length: {fields.title_fields?.length || 0}</p>
            </details>
          </div>
          
          <Media lessThan={Display.md}>
            <div className="block md:hidden">
              <ResponsiveModal>
                <ResponsiveModalTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Фильтры {filters.filter(f => f.values && f.values.length > 0).length > 0 && 
                      `(${filters.filter(f => f.values && f.values.length > 0).length})`}
                  </Button>
                </ResponsiveModalTrigger>
                <ResponsiveModalContent>
                  <ResponsiveModalHeader>
                    <ResponsiveModalTitle>Фильтры</ResponsiveModalTitle>
                  </ResponsiveModalHeader>
                  <FilterFields
                    filters={filters}
                    onChange={handleFilterChange}
                    fieldOptions={fields}
                    onClearAll={handleClearAllFilters}
                  />
                  <ResponsiveModalFooter>
                    <ResponsiveModalClose asChild>
                      <Button>Готово</Button>
                    </ResponsiveModalClose>
                  </ResponsiveModalFooter>
                </ResponsiveModalContent>
              </ResponsiveModal>
            </div>
          </Media>
          
          {/* Фильтры - десктопная версия */}
          <Media greaterThanOrEqual={Display.md}>
            <div className="hidden md:block">
              <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
                <FilterFields
                  filters={filters}
                  onChange={handleFilterChange}
                  fieldOptions={fields}
                  onClearAll={handleClearAllFilters}
                />
              </div>
            </div>
          </Media>
        </div>
      </div>
    </Form>
  );
}; 