import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import api from '../api/axios';
import { StatusBadge } from '../components/StatusBadge';
import { ServiceTypeBadge } from '../components/ServiceTypeBadge';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import {
  Car,
  Users,
  Wrench,
  Check,
  Calendar,
  ChevronRight,
  Plus,
  Layers,
  UserPlus,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      totalCars: 0,
      totalCustomers: 0,
      activeServices: 0,
      completedServices: 0,
    },
    recentServices: [],
    inServiceList: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const onOpenAddCar = outletContext?.onOpenAddCar;
  const onOpenAddService = outletContext?.onOpenAddService;

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services/dashboard-stats');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const handleRefresh = () => fetchDashboardData();
    window.addEventListener('service-created', handleRefresh);
    window.addEventListener('car-created', handleRefresh);

    return () => {
      window.removeEventListener('service-created', handleRefresh);
      window.removeEventListener('car-created', handleRefresh);
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. HEADER & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Hero Card - Minimal Executive DECODE Card (No dummy images, no dummy chips) */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 sm:p-7 relative overflow-hidden text-white flex flex-col justify-between shadow-sm">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Workshop Operations
              </span>
            </div>
            <h1 className="text-[26px] sm:text-[30px] font-extrabold text-white tracking-tight leading-tight">
              DE<span className="text-[#E50914]">CODE</span> Auto Diagnosing Hub
            </h1>
            <p className="text-[13px] text-slate-300 font-normal leading-relaxed">
              Specialized German & European luxury vehicle management system. Live diagnostics, active bay monitoring, and digital customer records.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-[#1F1F1F] flex items-center gap-6 flex-wrap text-xs text-slate-400">
            <div>
              <span className="text-white font-bold text-sm block font-mono">
                {data.stats?.activeServices || 0}
              </span>
              <span>Active in Bays</span>
            </div>
            <div className="w-px h-6 bg-[#262626]" />
            <div>
              <span className="text-white font-bold text-sm block font-mono">
                {data.stats?.totalCars || 0}
              </span>
              <span>Registered Vehicles</span>
            </div>
            <div className="w-px h-6 bg-[#262626]" />
            <div>
              <span className="text-white font-bold text-sm block font-mono">
                {data.stats?.totalCustomers || 0}
              </span>
              <span>Verified Clients</span>
            </div>
          </div>
        </div>

        {/* Right Quick Actions Stack */}
        <div className="space-y-2.5 flex flex-col justify-center">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[14px] font-bold text-[#0F172A] flex items-center gap-1.5">
              Quick Actions
            </h3>
            <button
              onClick={() => navigate('/services')}
              className="text-[12px] font-semibold text-[#E50914] hover:underline"
            >
              View Services
            </button>
          </div>

          {/* Red Primary Button: New Service Order */}
          <button
            onClick={() => onOpenAddService?.()}
            className="w-full bg-[#E50914] hover:bg-[#C80813] text-white p-3.5 rounded-xl flex items-center justify-between text-left group shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold leading-tight">New Service Order</p>
                <p className="text-[11px] text-white/80 font-normal">Record job for a vehicle</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* White Card: Add Vehicle */}
          <button
            onClick={() => onOpenAddCar?.()}
            className="w-full bg-white hover:bg-slate-50 border border-[#E2E8F0] p-3 rounded-xl flex items-center justify-between text-left group shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] text-[#E50914] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0F172A] leading-tight">Add Vehicle</p>
                <p className="text-[11px] text-[#64748B]">Register new car & owner</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#E50914] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* White Card: Customer Directory */}
          <button
            onClick={() => navigate('/customers')}
            className="w-full bg-white hover:bg-slate-50 border border-[#E2E8F0] p-3 rounded-xl flex items-center justify-between text-left group shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0F172A] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0F172A] leading-tight">Customers</p>
                <p className="text-[11px] text-[#64748B]">View customer records</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* White Card: Vehicle Registry & History */}
          <button
            onClick={() => navigate('/cars')}
            className="w-full bg-white hover:bg-slate-50 border border-[#E2E8F0] p-3 rounded-xl flex items-center justify-between text-left group shadow-card transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0F172A] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0F172A] leading-tight">Vehicle Registry</p>
                <p className="text-[11px] text-[#64748B]">All registered vehicles</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* 2. REAL METRIC STATS CARDS (Dynamic from database, no dummy percentages) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Active Services in Workshop */}
        <div
          onClick={() => navigate('/services?status=In Service')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card hover:border-[#E50914] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#FEF2F2] text-[#E50914] flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#E50914] bg-[#FEF2F2] px-2 py-0.5 rounded">Live</span>
          </div>
          <p className="text-[12px] font-medium text-[#64748B]">In Service / Pending</p>
          <div className="mt-1">
            <span className="text-[24px] font-bold text-[#0F172A] font-mono">
              {data.stats?.activeServices || 0}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Vehicles undergoing care</p>
        </div>

        {/* 2. Completed Services */}
        <div
          onClick={() => navigate('/services?status=Completed')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card hover:border-emerald-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
          </div>
          <p className="text-[12px] font-medium text-[#64748B]">Completed Services</p>
          <div className="mt-1">
            <span className="text-[24px] font-bold text-[#0F172A] font-mono">
              {data.stats?.completedServices || 0}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Ready or delivered</p>
        </div>

        {/* 3. Total Vehicles */}
        <div
          onClick={() => navigate('/cars')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card hover:border-[#0F172A] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0F172A] flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
          </div>
          <p className="text-[12px] font-medium text-[#64748B]">Total Vehicles</p>
          <div className="mt-1">
            <span className="text-[24px] font-bold text-[#0F172A] font-mono">
              {data.stats?.totalCars || 0}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Registered in database</p>
        </div>

        {/* 4. Total Customers */}
        <div
          onClick={() => navigate('/customers')}
          className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card hover:border-[#0F172A] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0F172A] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
          </div>
          <p className="text-[12px] font-medium text-[#64748B]">Customer Profiles</p>
          <div className="mt-1">
            <span className="text-[24px] font-bold text-[#0F172A] font-mono">
              {data.stats?.totalCustomers || 0}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Verified vehicle owners</p>
        </div>
      </div>

      {/* 3. ACTIVE WORKSHOP BAYS & RECENT SERVICES (Real Data Only) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Active In-Service Vehicles */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                Active In-Service Vehicles
              </h3>
              <p className="text-[11px] text-[#64748B]">Vehicles currently in workshop queue</p>
            </div>
            <button
              onClick={() => navigate('/services?status=In Service')}
              className="text-[12px] font-semibold text-[#E50914] hover:underline"
            >
              View All
            </button>
          </div>

          {loading ? (
            <p className="text-center py-8 text-xs text-[#64748B]">Loading workshop bays...</p>
          ) : data.inServiceList?.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#64748B]">
              <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              All workshop bays are currently clear.
            </div>
          ) : (
            <div className="space-y-3">
              {data.inServiceList.slice(0, 5).map((srv) => (
                <div
                  key={srv._id}
                  onClick={() => setSelectedService(srv)}
                  className="p-3 bg-[#F8FAFC] hover:bg-slate-100 rounded-xl border border-[#E2E8F0] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        {srv.carId?.registrationNumber || 'N/A'}
                      </span>
                      <span className="text-[13px] font-bold text-[#0F172A] truncate">
                        {srv.carId?.carName} {srv.carId?.model}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1">
                      Client: <span className="font-medium text-[#0F172A]">{srv.customerId?.name || 'Customer'}</span> • {srv.serviceType}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={srv.status} />
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#E50914]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Service Records */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-[15px] font-bold text-[#0F172A] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F172A]" />
                Recent Service Records
              </h3>
              <p className="text-[11px] text-[#64748B]">Chronological service history logs</p>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="text-[12px] font-semibold text-[#E50914] hover:underline"
            >
              Full History
            </button>
          </div>

          {loading ? (
            <p className="text-center py-8 text-xs text-[#64748B]">Loading recent logs...</p>
          ) : data.recentServices?.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#64748B]">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              No service logs recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentServices.slice(0, 5).map((srv) => (
                <div
                  key={srv._id}
                  onClick={() => setSelectedService(srv)}
                  className="p-3 bg-[#F8FAFC] hover:bg-slate-100 rounded-xl border border-[#E2E8F0] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        {srv.carId?.registrationNumber || 'N/A'}
                      </span>
                      <span className="text-[13px] font-bold text-[#0F172A] truncate">
                        {srv.carId?.carName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-1">
                      <span>{formatDate(srv.serviceDate)}</span>
                      <span>•</span>
                      <span>{srv.serviceType}</span>
                      {srv.totalCost > 0 && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-emerald-700 font-semibold">
                            ₹{srv.totalCost.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={srv.status} />
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#E50914]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceDetailModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
          onEdit={(srv) => {
            setSelectedService(null);
            onOpenAddService?.(srv.carId?._id);
          }}
          onDelete={() => {
            fetchDashboardData();
          }}
        />
      )}
    </div>
  );
};
