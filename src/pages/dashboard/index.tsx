import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useGetConfigsApiAdminConfigsGetSuspense } from '@/shared/api/generated';
import { Link } from 'react-router-dom';
import { LayoutGrid, Activity, BarChart3, Sparkles, Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export const DashboardPage = () => {
  const { data: configs } = useGetConfigsApiAdminConfigsGetSuspense();
  
  const totalConfigs = configs?.length || 0;
  const activeConfigs = configs?.filter(config => config.config.is_active).length || 0;
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-400 dark:to-slate-600 bg-clip-text text-transparent">
            Дашборд рекомендаций
          </h1>
        </div>
        <Button startIcon={<Plus className="mr-2 h-4 w-4" />} className="bg-gradient-to-r from-slate-600 to-slate-400 hover:from-slate-500 hover:to-slate-300 text-white">
          <Link to="/configs/create">
            Создать конфигурацию
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего конфигураций</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConfigs}</div>
            <p className="text-xs text-muted-foreground">
              ML-конфигурации для рекомендаций
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeConfigs}</div>
            <p className="text-xs text-muted-foreground">
              В данный момент обучаются
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Здоровье системы</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success"></div>
              <div className="text-lg font-medium">Healthy</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Все системы работают нормально
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Конфигурации моделей</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {configs?.map((config) => (
            <Link key={config.config.id} to={`/configs/${config.config.id}`}>
              <Card className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    {config.config.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {config.config.description}
                  </p>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      config.config.is_active 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-400'
                    }`}>
                      {config.config.is_active ? 'Активна' : 'Неактивна'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          {!configs?.length && (
            <div className="text-center p-8 col-span-full">
              <Sparkles className="h-8 w-8 mx-auto mb-4 text-muted" />
              <h3 className="font-medium mb-1">Конфигурации не найдены</h3>
              <p className="text-sm text-muted-foreground mb-4">Создайте свою первую конфигурацию ML-рекомендаций</p>
              <Link to="/configs/create">
                <Button>Создать конфигурацию</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 