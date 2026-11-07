import React from 'react';
import { QuickSearch } from './QuickSearch';
import { useAuth } from '../context/AuthContext';
import { Plus, Wrench, Menu, Bell, User, ChevronDown } from 'lucide-react';

export const Navbar = ({ onOpenAddCar, onOpenAddService, toggleMobileMenu }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
      {/* Mobile menu toggle & Quick search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <QuickSearch />
        </div>
      </div>

      {/* Top right quick shortcuts & User profile */}
      <div className="flex items-center gap-3">
        {/* Quick Add Buttons */}
        <button
          onClick={onOpenAddCar}
          className="hidden sm:inline-flex btn-secondary text-[13px] py-1.5 px-3 items-center gap-1.5 font-semibold"
        >
          <Plus className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Add Vehicle</span>
        </button>
        <button
          onClick={onOpenAddService}
          className="hidden sm:inline-flex btn-primary text-[13px] py-1.5 px-3 items-center gap-1.5 font-semibold"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Record Service</span>
        </button>

        <div className="h-5 w-px bg-[#E2E8F0] hidden sm:block mx-0.5" />

        {/* User profile */}
        <div className="flex items-center gap-2.5 pl-1.5 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#FEF2F2] border border-[#FCA5A5] text-[#E50914] flex items-center justify-center shadow-sm shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left leading-tight">
            <p className="text-[12px] font-bold text-[#0F172A]">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-[#64748B] font-medium">
              {user?.role || 'Service Manager'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
