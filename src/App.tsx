import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CreateConfigPage } from '@/pages/configs/create';
import { ConfigDetailsPage } from '@/pages/configs/[id]';
import { EditConfigPage } from '@/pages/configs/edit';
import { DashboardPage } from '@/pages/dashboard';
import { Providers } from './app/providers/index';
import { AdminLayout } from './app/layouts/admin-layout';
import { ConfigLayout } from './app/layouts/config-layout';
import { MediaContextProvider } from '@/shared/lib/media';

function App() {
    return (
      <Providers>
        <Router>
          <MediaContextProvider>
            <div className="min-h-screen bg-background">
                <Routes>
                    <Route element={<AdminLayout />}>
                        <Route path="/" element={<DashboardPage />} />
                    </Route>
                    
                    <Route element={<ConfigLayout />}>
                        <Route path="/configs/create" element={<CreateConfigPage />} />
                        <Route path="/configs/:id" element={<ConfigDetailsPage />} />
                        <Route path="/configs/:id/edit" element={<EditConfigPage />} />
                    </Route>
                </Routes>
            </div>
            <Toaster />
          </MediaContextProvider>
        </Router>
        </Providers>
    );
}

export default App;
