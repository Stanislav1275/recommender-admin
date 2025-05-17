import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';

export const Navigation: FC = () => {
    return (
        <nav className="border-b border-border bg-header text-header-foreground">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-xl font-bold text-slate-900 dark:text-white">
                        Recommender Admin
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="relative group">
                            <Button variant="ghost" className="text-slate-600 dark:text-slate-400 hover:text-active-nav transition-colors">
                                Конфигурации
                            </Button>
                            <span className="absolute bottom-1 left-0 w-full h-0.5 bg-active-nav transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </Link>
                    </div>
                </div>
                
            </div>
        </nav>
    );
}; 