import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  Users,
  Wrench,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      isActive: location.pathname === '/dashboard' || location.pathname === '/',
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: Users,
      isActive: location.pathname === '/customers',
    },
    {
      name: 'Vehicles',
      path: '/cars',
      icon: Car,
      isActive: location.pathname === '/cars' || (location.pathname.startsWith('/cars/') && location.pathname !== '/customers'),
    },
    {
      name: 'Service Jobs',
      path: '/services',
      icon: Wrench,
      isActive: location.pathname === '/services',
    },
  ];

  return (
    <aside className="w-64 bg-[#0A0A0A] text-slate-300 flex flex-col shrink-0 min-h-screen select-none border-r border-[#1F1F1F]">
      {/* Brand Header with DECODE Logo */}
      <div 
        onClick={() => navigate('/dashboard')}
        className="h-20 flex items-center px-5 gap-3 border-b border-[#1F1F1F] cursor-pointer hover:bg-[#121212] transition-colors"
      >
        <div className="h-10 flex items-center justify-center shrink-0">
          <img
            src="/logo.png"
            alt="DECODE"
            className="h-8 w-auto object-contain"
          />
        </div>
        <div className="min-w-0">
          <h1 className="font-extrabold text-[15px] tracking-tight text-white flex items-center gap-1 leading-tight">
            DE<span className="text-[#E50914]">CODE</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase truncate">
            Auto Diagnosing Hub
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-3 space-y-1 flex-1">
        <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Main Menu
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-150 group ${
                  active
                    ? 'bg-[#171717] text-white border-l-4 border-[#E50914] shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#141414]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                      active ? 'text-[#E50914]' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info & Sign Out Footer */}
      <div className="p-3.5 border-t border-[#1F1F1F] bg-[#050505]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#E50914] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'DC'}
            </div>
            <div className="truncate">
              <p className="text-[12px] font-bold text-white truncate">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || 'decode@service.com'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#E50914] hover:bg-[#141414] transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
