import React from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/shared/ui/select";
import { MultipleSelector } from "@/shared/ui/multy-selector";
import { X } from "lucide-react";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { TriStateCheckbox, TriStateValue } from "@/shared/ui/tri-state-checkbox";
import { Button } from "@/shared/ui/button";
import { FieldMetadata } from "@/shared/api/generated/types/FieldMetadata";
import { FieldFilter } from "@/shared/api/generated/types/FieldFilter";
import { FieldValue } from "@/shared/api/generated/types/FieldValue";
import { Control, FieldValues } from "react-hook-form";
import { FiltersInfo } from "@/shared/ui/filters-info";
import { OperatorSelect } from "@/shared/ui/operator-select";

export interface CommonFieldNames {
  name: string;
  description: string;
  is_active: boolean;
}

interface FilterFieldsProps {
  filters: FieldFilter[];
  onChange: (i: number, val: FieldFilter) => void;
  fieldOptions: { title_fields: FieldMetadata[] };
  onClearAll?: () => void;
}

export const FilterFields: React.FC<FilterFieldsProps> = ({ 
  filters, 
  onChange, 
  fieldOptions,
  onClearAll
}) => {
  console.log({filters, fieldOptions})
  
  if (!fieldOptions?.title_fields || fieldOptions.title_fields.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Поля фильтров недоступны. Пожалуйста, попробуйте позже.</p>
      </div>
    );
  }
  
  return (
  <ScrollArea className="h-[500px] max-h-[70vh] overflow-y-scroll w-full pr-2">
    <div className="space-y-6 p-2">
      <FiltersInfo className="mb-6" />
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-base">Фильтры</h3>
        {onClearAll && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="text-muted-foreground text-xs hover:text-foreground"
          >
            Очистить все
          </Button>
        )}
      </div>
      
      {fieldOptions?.title_fields.map((field: FieldMetadata, i: number) => {
        const filter = filters[i] || { 
          field_name: field.name,
          operator: field.operators[0], 
          values: [] 
        };
        const isMulti = ['in', 'not_in'].includes(filter.operator);
        const isBoolean = field.type === 'boolean';

        return (
          <div 
            key={field.name} 
            className="flex flex-col gap-3 bg-background rounded-lg p-3 border border-border shadow-sm"
          >
            <div className="font-medium text-sm mb-1">{field.description || field.name}</div>
            
            {/* Boolean поля обрабатываем особым образом */}
            {isBoolean ? (
              <div className="flex items-center justify-between">
                <TriStateCheckbox
                  value={
                    filter.values.length === 0 
                      ? null 
                      : filter.values[0] === true
                  }
                  onChange={(value: TriStateValue) => {
                    if (value === null) {
                      onChange(i, { ...filter, values: [] });
                    } else {
                      onChange(i, { 
                        ...filter, 
                        operator: value === true ? 'equals' : 'not_equals',
                        values: [value]
                      });
                    }
                  }}
                  showClearButton={filter.values.length > 0}
                  onClear={() => onChange(i, { ...filter, values: [] })}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <OperatorSelect 
                  operator={filter.operator}
                  operators={field.operators}
                  onChange={op => onChange(i, { ...filter, operator: op })}
                />
                
                <div className="flex gap-3 items-center">
                  {(isMulti || (Array.isArray(field.values) && field.values.length > 2)) && Array.isArray(field.values) && field.values.length > 0 ? (
                    <MultipleSelector
                      options={field.values.map((v: FieldValue) => ({ 
                        value: String(v.value), 
                        label: v.name 
                      }))}
                      value={
                        Array.isArray(filter.values)
                          ? field.values
                              .filter(v => filter.values.includes(v.value))
                              .map(v => ({ value: String(v.value), label: v.name }))
                          : []
                      }
                      onChange={opts =>
                        onChange(i, {
                          ...filter,
                          values: opts.map(opt => {
                            const found = field.values!.find(v => String(v.value) === opt.value);
                            return found ? found.value : opt.value;
                          }),
                        })
                      }
                      placeholder="Выберите значения"
                      className="cursor-pointer w-full"
                      
                    />
                  ) : Array.isArray(field.values) && field.values.length > 0 ? (
                    <div className="flex flex-1 gap-2 items-center">
                      <Select
                        value={filter.values?.[0] ? String(filter.values[0]) : ''}
                        onValueChange={val => onChange(i, { ...filter, values: [val] })}
                      >
                        <SelectTrigger className="bg-background cursor-pointer">
                          <SelectValue placeholder="Значение" />
                        </SelectTrigger>
                        <SelectContent className="bg-background backdrop-blur-lg shadow-lg">
                          {field.values.map((v: FieldValue) => (
                            <SelectItem 
                              key={v.value.toString()} 
                              value={v.value.toString()} 
                              className="cursor-pointer"
                            >
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {filter.values.length > 0 && (
                        <button 
                          type="button" 
                          onClick={() => onChange(i, { ...filter, values: [] })} 
                          className="p-1 rounded-md hover:bg-muted cursor-pointer"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-1 gap-2 items-center">
                      <Input
                        type={field.type === 'integer' || field.type === 'float' ? 'number' : 'text'}
                        value={filter.values?.[0] !== undefined ? String(filter.values?.[0]) : ''}
                        onChange={e => onChange(i, { ...filter, values: [e.target.value] })}
                        className="cursor-text"
                      />
                      
                      {filter.values.length > 0 && (
                        <button 
                          type="button" 
                          onClick={() => onChange(i, { ...filter, values: [] })} 
                          className="p-1 rounded-md hover:bg-muted cursor-pointer"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </ScrollArea>
)};

export interface FormFieldsProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
}

export function FormFields<TFieldValues extends CommonFieldNames>({ 
  control 
}: FormFieldsProps<TFieldValues>) {
  return (
    <div className="space-y-6">
      <FormField
        control={control as any} // TODO: улучшить типизацию в будущем
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control as any} 
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control as any} 
        name="is_active"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Активна</FormLabel>
              <FormControl>
                <TriStateCheckbox
                  value={field.value || false}
                  onChange={(value) => field.onChange(value === null ? false : value)}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
} 