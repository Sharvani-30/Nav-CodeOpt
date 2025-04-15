import React from 'react';
import { Settings } from 'lucide-react';
import { useSidebar } from './Sidebar/SidebarContext';

interface Preference {
  id: string;
  label: string;
}

const preferences: Preference[] = [
  { id: 'cost', label: 'Cost Reduction' },
  { id: 'quality', label: 'Code Quality' },
  { id: 'legacy', label: 'Legacy Modernization' },
];

export function PreferencesPanel() {
  const { open } = useSidebar();

  if (!open) {
    return null;
  }

  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Settings className="h-5 w-5 text-white/80 mr-2" />
        <h2 className="text-lg font-semibold text-white/90">Optimization Goals</h2>
      </div>
      <div className="space-y-2">
        {preferences.map((pref) => (
          <label key={pref.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={pref.id}
              className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-white/80">{pref.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}