import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GitBranch, MessageSquare, FileDown, QrCode, Lock, Gamepad2, UserPlus } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/processes', icon: GitBranch, label: 'Estatus' },
  { to: '/playground', icon: Gamepad2, label: 'Playground' },
  { to: '/feedback', icon: MessageSquare, label: 'Buzón' },
  { to: '/resources', icon: FileDown, label: 'Recursos' },
  { to: '/signup', icon: UserPlus, label: '' },
  { to: '/qr', icon: QrCode, label: '' },
  { to: '/admin', icon: Lock, label: '' },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/5 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around md:justify-center md:gap-12 h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 text-[10px] font-medium transition-all duration-300 md:flex-row md:text-sm md:gap-2",
                  isActive 
                    ? "text-blue-400" 
                    : "text-zinc-500 hover:text-zinc-300"
                )
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label && <span>{label}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
