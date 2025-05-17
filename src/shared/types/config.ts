export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'in'
  | 'not_in';

export interface FieldValue {
  value: string | number | boolean;
  name: string;
}

export interface FieldMetadata {
  name: string;
  description: string;
  type: 'boolean' | 'integer' | 'float' | 'reference';
  operators: string[];
  values?: FieldValue[];
}

export interface FieldFilter {
  field_name: string;
  operator: FilterOperator;
  values: (string | number | boolean)[];
  is_active?: boolean;
}

export interface ScheduleType {
  id: string;
  name: string;
  description: string;
  value: string;
}

export interface ScheduleConfig {
  _id?: string;
  type: string;
  date_like: string;
  is_active?: boolean;
  next_run?: string | null;
}

export interface RecommendationConfig {
  _id?: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
  title_field_filters: FieldFilter[];
  schedules_dates: ScheduleConfig[];
  created_at?: string;
  updated_at?: string;
}

export interface FieldOptions {
  title_fields: FieldMetadata[];
  schedule_types: ScheduleType[];
}
