import { FC } from 'react';
import { useGetConfigLogsApiAdminConfigsConfigIdLogsGet } from '@/shared/api/generated';
import { ConfigExecutionLog } from '@/shared/api/generated';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ConfigLogsProps {
    configId: string;
}

export const ConfigLogs: FC<ConfigLogsProps> = ({ configId }) => {
    const { data: logs = [] } = useGetConfigLogsApiAdminConfigsConfigIdLogsGet(
        configId,
        undefined,
        {
            query: {
                refetchInterval: 5000,
            },
        }
    );

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Логи выполнения</h2>
            <div className="space-y-2">
                {logs.map((log: ConfigExecutionLog) => (
                    <div
                        key={log.id}
                        className="p-4 rounded-lg border bg-card text-card-foreground"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">{log.message}</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(log.created_at || ''), 'PPpp', { locale: ru })}
                                </p>
                            </div>
                            <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                    log.status === 'success'
                                        ? 'bg-green-100 text-green-800'
                                        : log.status === 'error'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}
                            >
                                {log.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 