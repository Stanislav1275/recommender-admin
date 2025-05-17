import type { UseFormReturn, FieldValues } from 'react-hook-form';
import type { ZodSchema } from 'zod';
import { handleFormError, handleFormSuccess } from './form';
import { type FormEvent } from 'react';

export type FormFieldError = {
  field: string;
  message: string;
};

export type FormErrors = Record<string, string[]>;

export function createFormResolver<T extends ZodSchema>(schema: T) {
  return {
    validate: (data: unknown) => {
      try {
        return { data: schema.parse(data), errors: [] };
      } catch (error) {
        if (error instanceof Error) {
          return { data: null, errors: [{ field: 'root', message: error.message }] };
        }
        return { data: null, errors: [{ field: 'root', message: 'Неизвестная ошибка' }] };
      }
    },
  };
}

export function handleFormSubmit<T extends FieldValues>(
  form: UseFormReturn<T>,
  onSubmit: (data: T) => Promise<void>,
  successMessage: string
) {
  return async (data: T) => {
    try {
      await onSubmit(data);
      handleFormSuccess(successMessage);
      form.reset();
    } catch (error) {
      handleFormError(error);
    }
  };
}

export function getFieldError<T extends FieldValues>(form: UseFormReturn<T>, field: keyof T) {
  const error = form.formState.errors[field];
  return error?.message as string | undefined;
}

export function isFieldInvalid<T extends FieldValues>(form: UseFormReturn<T>, field: keyof T) {
  return !!form.formState.errors[field];
}

export const handleNativeFormSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());
  return data;
};

export const getNativeFieldError = (errors: FormErrors, fieldName: string) => {
  return errors[fieldName]?.[0];
};

export const isNativeFieldInvalid = (errors: FormErrors, fieldName: string) => {
  return !!errors[fieldName];
};

export const validateForm = async <T>(schema: ZodSchema<T>, data: unknown) => {
  try {
    const validatedData = await schema.parseAsync(data);
    return { data: validatedData, errors: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, errors: { _form: [error.message] } };
    }
    return { data: null, errors: { _form: ['Произошла ошибка валидации'] } };
  }
};
