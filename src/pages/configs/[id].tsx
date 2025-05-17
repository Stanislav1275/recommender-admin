import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetConfigApiAdminConfigsConfigIdGet, useDeleteConfigApiAdminConfigsConfigIdDelete } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { toast } from 'sonner';
import { handleFormError } from '@/shared/lib/form';
import { ConfigLogs } from '@/widgets/config-logs';
import { ConfigForm } from '@/widgets/config-form';

export const ConfigDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: configResponse, isLoading, error } = useGetConfigApiAdminConfigsConfigIdGet(
        id || '',
        { 
            query: { 
                enabled: !!id,
                retry: 1,
            } 
        }
    );

    const { mutate: deleteConfig } = useDeleteConfigApiAdminConfigsConfigIdDelete();

    const handleDelete = () => {
        if (!id) return;
        
        deleteConfig(
            { config_id: id },
            {
                onSuccess: () => {
                    toast.success('Конфигурация успешно удалена');
                    navigate('/configs');
                },
                onError: handleFormError,
            }
        );
    };

    if (!id) {
        navigate('/configs');
        return null;
    }

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка при загрузке конфигурации</div>;
    }

    if (!configResponse?.config) {
        return <div>Конфигурация не найдена</div>;
    }

    const config = configResponse.config;

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{config.name}</h1>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate('/configs')}>
                        Назад
                    </Button>
                    <Button variant="default" onClick={() => navigate(`/configs/${id}/edit`)}>
                        Редактировать
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="details">Детали</TabsTrigger>
                    <TabsTrigger value="logs">Логи</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Информация о конфигурации</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ConfigForm config={config} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="logs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Логи выполнения</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ConfigLogs configId={id} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}; 