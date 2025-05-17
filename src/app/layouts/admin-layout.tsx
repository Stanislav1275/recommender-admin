import { Outlet, Link } from 'react-router-dom'
import { getConfigsApiAdminConfigsGetSuspenseQueryOptions } from '@/shared/api/generated/hooks/useGetConfigsApiAdminConfigsGetSuspense'
import { useSuspenseQueries } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import ReFlowLogo from '@/shared/icons/logo'
import { MobileNav } from '@/shared/ui/mobile-nav'
import { LayoutDashboard } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const PrefetchBlock = ({children}:PropsWithChildren) => {
  useSuspenseQueries({
    queries: [
      getConfigsApiAdminConfigsGetSuspenseQueryOptions(),
    ],
  });
  return children;
}

export function AdminLayout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <aside className="hidden md:block w-72 h-screen fixed left-0 top-0 bg-card border-r border-border p-4 overflow-y-auto">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <ReFlowLogo className="h-20 w-auto" />
        </Link>
        <nav className="space-y-2">
          <NavLink 
            to="/" 
            text="Дашборд"
            icon={<LayoutDashboard size={18} />}
          />
        
        </nav>
      </aside>

      <main className="flex-1 overflow-auto md:ml-72 pb-20 md:pb-6">
        <div className="p-6">
          <PrefetchBlock>
            <Outlet />
          </PrefetchBlock>
        </div>
      </main>

      <MobileNav />
    </div>
  )
} 

interface NavLinkProps {
  to: string;
  text: string;
  icon: React.ReactNode;
}

function NavLink({ to, text, icon }: NavLinkProps) {
  const currentPath = window.location.pathname;
  const isActive = 
    (to === '/' && (currentPath === '/' || currentPath === '')) || 
    (to !== '/' && currentPath.startsWith(to));

  return (
    <Link 
      to={to} 
      className={cn(
        'flex items-center gap-3 p-2 hover:bg-accent rounded-md relative transition-colors',
        isActive && 'text-active-nav font-medium'
      )}
    >
      <span className={cn(
        'transition-colors',
        isActive ? 'text-active-nav' : 'text-muted-foreground'
      )}>
        {icon}
      </span>
      <span>{text}</span>
      {isActive && (
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4/5 bg-active-nav rounded-r-md"></span>
      )}
    </Link>
  );
} 