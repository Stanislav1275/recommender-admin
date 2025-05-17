import React, { useState, useEffect } from 'react';
import { FieldFilter } from '@/shared/api/generated/types/FieldFilter';
import { FilterFields } from '@/shared/ui/form-fields';
import { Media, Display } from '@/shared/lib/media';
import { Button } from '@/shared/ui/button';
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalClose,
} from '@/shared/ui/responsive-modal';

interface ConfigFilterFieldsProps {
  fieldOptions: any;
  initialFilters?: FieldFilter[];
  onChange?: (filters: FieldFilter[]) => void;
}

export const ConfigFilterFields: React.FC<ConfigFilterFieldsProps> = ({
  fieldOptions,
  initialFilters = [],
  onChange,
}) => {
  const [filters, setFilters] = useState<FieldFilter[]>(initialFilters);
  // Инициализация фильтров при загрузке fieldOptions
  useEffect(() => {
    if (fieldOptions?.title_fields && !filters.length) {
      const newFilters = fieldOptions.title_fields.map((field: any) => ({
        field_name: field.name,
        operator: field.operators[0],
        values: []
      }));
      
      setFilters(newFilters);
    }
  }, [fieldOptions, filters.length]);
  console.log({filters, fieldOptions})
  useEffect(() => {
    onChange?.(filters);
  }, [filters, onChange]);

  const handleClearAllFilters = () => {
    const emptyFilters = fieldOptions?.title_fields?.map((field: any) => ({
      field_name: field.name,
      operator: field.operators[0],
      values: []
    })) || [];
    
    setFilters(emptyFilters);
  };
  
  const handleFilterChange = (index: number, filter: FieldFilter) => {
    setFilters(prev => {
      const copy = [...prev];
      copy[index] = filter;
      return copy;
    });
  };

  if (!fieldOptions?.title_fields?.length) {
    return <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
      Загрузка фильтров...
    </div>;
  }

  return (
    <>
      <div className="mb-4 text-xs opacity-60">
        <details>
          <summary>Отладочная информация</summary>
          <pre className="whitespace-pre-wrap overflow-auto max-h-40">
            {JSON.stringify(fieldOptions, null, 2)}
          </pre>
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
                fieldOptions={fieldOptions}
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
      
      <Media greaterThanOrEqual={Display.md}>
        <div className="hidden md:block">
          <div className="bg-background rounded-lg p-5 border border-border shadow-sm">
            <FilterFields
              filters={filters}
              onChange={handleFilterChange}
              fieldOptions={fieldOptions}
              onClearAll={handleClearAllFilters}
            />
          </div>
        </div>
      </Media>
    </>
  );
}; 