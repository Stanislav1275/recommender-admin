import { toast } from 'sonner';
import { ZodError } from 'zod';

export function handleFormError(error: unknown) {
  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => err.message);
    errors.forEach((message) =>
      toast.error(message, {
        description: 'Ошибка',
      })
    );
    return;
    
  }

  if (error instanceof Error) {
    toast.error(error.message, {
      description: 'Ошибка',
    });
    return;
  }

  toast.error('Произошла неизвестная ошибка', {
    description: 'Ошибка',
  });
}

export function handleFormSuccess(message: string) {
  toast.success(message, {
    description: 'Успех',
  });
}
