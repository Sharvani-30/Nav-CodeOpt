import React from 'react';
import { HelpCircle, Info, Settings } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { cn } from '../../lib/utils';

const footerItems = [
  { icon: Info, label: 'About Us', href: '#' },
  { icon: HelpCircle, label: 'How it Works', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export function SidebarFooter() {
  const { open } = useSidebar();

  return (
    <div className="border-t border-white/10 py-2">
      <div className={cn(
        "flex",
        open ? "flex-col px-2" : "flex-col items-center"
      )}>
        {footerItems.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="group relative flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white/90 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {open ? (
              <span className="text-sm">{label}</span>
            ) : (
              <div className="absolute left-16 hidden group-hover:block bg-zinc-800 p-2 rounded-lg shadow-lg z-50">
                <span className="text-sm whitespace-nowrap">{label}</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}