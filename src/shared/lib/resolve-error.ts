import { HTTPValidationError } from '@/shared/api/generated/types/HTTPValidationError';
import { toast } from 'sonner';

export const resolveErrorAsync = async (error: unknown): Promise<void> => {
  if (error instanceof Error) {
    if ('detail' in error && Array.isArray((error as HTTPValidationError).detail)) {
      const validationErrors = (error as HTTPValidationError).detail;
      validationErrors?.forEach((err) => {
        toast.error(err.msg);
      });
    } else {
      toast.error(error.message || 'Произошла ошибка');
    }
  } else {
    toast.error('Произошла неизвестная ошибка');
  }
}; 