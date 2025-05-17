import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateConfigApiAdminConfigsConfigIdPut } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from 'sonner';
import { handleFormError } from '@/shared/lib/form';
import { recommendationConfigSchema } from '@/shared/api/generated';
import { RecommendationConfig } from '@/shared/api/generated';

interface ConfigFormProps {
    config: RecommendationConfig;
}

export const ConfigForm: FC<ConfigFormProps> = ({ config }) => {
    const { mutate: updateConfig, isPending } = useUpdateConfigApiAdminConfigsConfigIdPut();

    const form = useForm({
        resolver: zodResolver(recommendationConfigSchema),
        defaultValues: {
            name: config.name,
            description: config.description,
            is_active: config.is_active ?? true,
            title_field_filters: config.title_field_filters,
            schedules_dates: config.schedules_dates,
        },
    });

    const onSubmit = (data: RecommendationConfig) => {
        if (!config.id) return;

        updateConfig(
            {
                config_id: config.id,
                data,
            },
            {
                onSuccess: () => {
                    toast.success('Конфигурация успешно обновлена');
                },
                onError: handleFormError,
            }
        );
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name">Название</label>
                <Input
                    id="name"
                    {...form.register('name')}
                    placeholder="Введите название конфигурации"
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="description">Описание</label>
                <Textarea
                    id="description"
                    {...form.register('description')}
                    placeholder="Введите описание конфигурации"
                />
                {form.formState.errors.description && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.description.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Сохранение...' : 'Сохранить'}
                </Button>
            </div>
        </form>
    );
}; 