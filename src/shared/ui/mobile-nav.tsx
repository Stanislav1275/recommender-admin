import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import {
  Home,
  Settings,
  LayoutGrid,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { FiltersInfo } from '@/shared/ui/filters-info';
import { Button } from '@/shared/ui/button';
import ReFlowLogo from '@/shared/icons/logo';

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <nav className={cn('fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-mobile-nav text-foreground md:hidden', className)}>
        <div className="grid grid-cols-5 h-16">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              'flex flex-col items-center justify-center text-muted-foreground transition-colors',
              isActive && 'text-primary'
            )}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Главная</span>
          </NavLink>
          
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              'flex flex-col items-center justify-center text-muted-foreground transition-colors',
              isActive && 'text-primary'
            )}
          >
            <LayoutGrid size={20} />
            <span className="text-xs mt-1">Конфиги</span>
          </NavLink>
          
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex flex-col items-center justify-center text-muted-foreground hover:text-active-nav transition-colors">
                <Menu size={20} />
                <span className="text-xs mt-1">Меню</span>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="border-highlight">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <ReFlowLogo className="h-12 w-auto" />
                  <span className="text-xl font-bold">Re:Flow</span>
                </div>
                
                <div className="space-y-4">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors',
                      isActive && 'bg-accent text-active-nav font-medium'
                    )}
                  >
                    <Home size={18} />
                    <span>Дашборд</span>
                  </NavLink>
                  
                  
                  
                  <NavLink 
                    to="/configs/create" 
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors',
                      isActive && 'bg-accent text-active-nav font-medium'
                    )}
                  >
                    <Settings size={18} />
                    <span>Создать конфигурацию</span>
                  </NavLink>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <NavLink 
            to="/configs/create" 
            className={({ isActive }) => cn(
              'flex flex-col items-center justify-center text-muted-foreground transition-colors',
              isActive && 'text-primary'
            )}
          >
            <Settings size={20} />
            <span className="text-xs mt-1">Создать</span>
          </NavLink>
          
          <Button 
            variant="ghost" 
            onClick={() => setHelpOpen(true)} 
            className="flex flex-col items-center justify-center h-full text-muted-foreground hover:text-active-nav transition-colors"
          >
            <HelpCircle size={20} />
            <span className="text-xs mt-1">Справка</span>
          </Button>
        </div>
      </nav>
      
      {helpOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" 
          onClick={() => setHelpOpen(false)}
        >
          <div 
            className="bg-card p-4 rounded-lg shadow-lg border border-highlight w-full max-w-md" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Справка</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setHelpOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <FiltersInfo />
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setHelpOpen(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 