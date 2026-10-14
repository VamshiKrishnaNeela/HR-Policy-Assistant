import { useState } from 'react';
import type { Region, UserSettings } from '@/types';
import { regions } from '@/data/mockData';
import { User, Globe, Bell, Save, Check } from 'lucide-react';

const STORAGE_KEY = 'hr-assistant-settings';

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UserSettings;
  } catch {
    /* ignore */
  }
  return {
    displayName: 'Alex Morgan',
    preferredRegion: 'India',
    notifications: true,
  };
}

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {/* Display name */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Display Name</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                This is how your name appears across the app.
              </p>
            </div>
          </div>
          <input
            type="text"
            value={settings.displayName}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, displayName: e.target.value }))
            }
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
        </div>

        {/* Preferred region */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Preferred Region
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Policies and answers will default to this region.
              </p>
            </div>
          </div>
          <select
            value={settings.preferredRegion}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                preferredRegion: e.target.value as Region,
              }))
            }
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-700 transition-shadow"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-800">
                Notification Preference
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Receive email notifications when policies are updated.
              </p>
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              role="switch"
              aria-checked={settings.notifications}
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: !prev.notifications,
                }))
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.notifications ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-slate-600">
              {settings.notifications ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center justify-end gap-3 mt-6">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600 animate-fade-in">
            <Check className="w-4 h-4" />
            Settings saved successfully
          </span>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
