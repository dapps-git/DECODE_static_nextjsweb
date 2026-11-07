import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Car as CarIcon, User as UserIcon, ArrowRight, X } from 'lucide-react';
import api from '../api/axios';
import { StatusBadge } from './StatusBadge';

export const QuickSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/cars?search=${encodeURIComponent(query.trim())}`);
        setResults(res.data.slice(0, 5));
        setIsOpen(true);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (carId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/cars/${carId}`);
  };

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search customer, vehicle, plate number..."
          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#E50914] focus:bg-white rounded-lg pl-9 pr-9 py-2 text-xs sm:text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#FEF2F2] transition-all shadow-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E2E8F0] rounded-xl shadow-card-hover overflow-hidden z-50">
          {loading ? (
            <div className="p-3 text-center text-xs text-slate-400 font-medium">Searching registry...</div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-[#E2E8F0]">
              <div className="px-3.5 py-1.5 bg-[#F8FAFC] text-[10px] uppercase tracking-wider font-bold text-slate-500">
                Found Records ({results.length})
              </div>
              {results.map((car) => (
                <div
                  key={car._id}
                  onClick={() => handleSelect(car._id)}
                  className="px-3.5 py-2.5 hover:bg-[#FEF2F2]/60 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center shrink-0 text-[#E50914]">
                      <CarIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0F172A] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {car.registrationNumber}
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E50914] transition-colors">
                          {car.carName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-0.5">
                        <span className="flex items-center gap-1 font-medium">
                          <UserIcon className="w-3 h-3 text-slate-400" />
                          {car.customerId?.name || 'Owner'}
                        </span>
                        <span>•</span>
                        <span className="font-mono">{car.currentKm?.toLocaleString()} KM</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={car.currentStatus} />
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E50914] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-slate-500">
              No matching vehicles or registration numbers found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
