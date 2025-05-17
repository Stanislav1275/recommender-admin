import { Outlet } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useTrainApiTrainPost } from '@/shared/api/generated';
import { toast } from 'sonner';
import { RocketLoader, useRocketLoader } from '@/shared/ui/rocket-loader';
import { resolveErrorAsync } from '@/shared/lib/resolve-error';
import { Media, Display } from '@/shared/lib/media';
import { useParams, useLocation } from 'react-router-dom';

export function ConfigLayout() {
  const trainApi = useTrainApiTrainPost();
  
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  
  let pageTitle = '';
  if (location.pathname.includes('/edit')) {
    pageTitle = 'Редактирование конфигурации';
  } else if (location.pathname.includes('/create')) {
    pageTitle = 'Создание конфигурации';
  } else if (id) {
    pageTitle = 'Детали конфигурации';
  } else {
    pageTitle = 'Конфигурации';
  }
  
  const { isLoading, startLoading, stopLoading, loaderProps } = useRocketLoader({
    duration: 5000,
    onFinish: () => {
      toast.success('Обучение модели успешно завершено!');
    }
  });

  const handleStartTraining = async () => {
    try {
      startLoading();
      await trainApi.mutateAsync();
    } catch (error) {
      stopLoading();
      await resolveErrorAsync(error);
      toast.error('Ошибка при запуске обучения. Пожалуйста, попробуйте позже.');
    }
  };

  const renderTrainingButton = () => (
    <Button
      variant="outline"
      className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary-dark text-white flex items-center gap-2"
      onClick={handleStartTraining}
      disabled={isLoading || trainApi.isPending}
    >
      <Rocket className="h-4 w-4" /> 
      Начать обучение
    </Button>
  );

  const renderMobileTrainingButton = () => (
    <div className="fixed bottom-16 right-4 z-50">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary-dark text-white shadow-lg"
        onClick={handleStartTraining}
        disabled={isLoading || trainApi.isPending}
      >
        <Rocket className="h-6 w-6" />
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-auto  pb-20 md:pb-6">
        <div className="p-6">
          <RocketLoader {...loaderProps} />
          
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-3xl font-bold">{pageTitle}</h1>
              
              <Media greaterThanOrEqual={Display.md}>
                {renderTrainingButton()}
              </Media>
            </div>
            
            <Outlet />
          </div>
        </div>
      </main>
      
      <Media lessThan={Display.md}>
        {renderMobileTrainingButton()}
      </Media>
    </div>
  );
} 