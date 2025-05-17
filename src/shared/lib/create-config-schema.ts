import { z } from 'zod';
import { FieldMetadata, fieldMetadataTypeEnum } from '@/shared/api/generated/types/FieldMetadata';

export const createConfigSchema = (fields: FieldMetadata[]) => {
  const schemaMap: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const fieldSchema = z.object({
      operator: z.string().refine((val) => field.operators.includes(val), {
        message: 'Выберите оператор из списка',
      }),
      value: z.any().refine((val) => {
        if (field.type === fieldMetadataTypeEnum.boolean) {
          return typeof val === 'boolean';
        }
        if (field.type === fieldMetadataTypeEnum.integer) {
          return typeof val === 'number' && Number.isInteger(val) && val >= 0;
        }
        if (field.type === fieldMetadataTypeEnum.float) {
          return typeof val === 'number' && val >= 0;
        }
        if (field.type === fieldMetadataTypeEnum.reference) {
          if (!field.values) return false;
          return field.values.some((v) => v.value.toString() === val.toString());
        }
        return true;
      }, {
        message: 'Некорректное значение',
      }),
    });

    schemaMap[field.name] = fieldSchema;
  });

  return z.object({
    name: z.string().min(1, 'Название обязательно'),
    description: z.string().min(1, 'Описание обязательно'),
    is_active: z.boolean().optional().default(true),
    title_field_filters: z.array(z.any()).optional(),
    schedules_dates: z.array(z.any()).optional(),
    ...schemaMap,
  });
}; 