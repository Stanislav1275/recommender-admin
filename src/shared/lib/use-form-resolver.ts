import { useCallback } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { resolveErrorAsync } from './resolve-error';
import { toast } from 'sonner';

export const useFormResolver = <T extends FieldValues>(form: UseFormReturn<T>) => {
  const handleSubmit = useCallback(
    (onSubmit: (data: T) => Promise<void>) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      form.handleSubmit(async (data) => {
        try {
          const isValid = await form.trigger();
          if (!isValid) {
            const errors = form.formState.errors;
            Object.values(errors).forEach((error) => {
              if (error?.message) {
                toast.error(error.message);
              }
            });
            return;
          }
          await onSubmit(data);
        } catch (error) {
          await resolveErrorAsync(error);
        }
      })(e);
    },
    [form]
  );

  return { handleSubmit };
}; 