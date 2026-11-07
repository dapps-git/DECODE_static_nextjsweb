

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  Car,
  Search,
  Plus,
  Eye,
  Trash2,
  Calendar,
  Phone,
  User,
  Users,
  Wrench,
  SlidersHorizontal,
  MapPin,
} from 'lucide-react';

export const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [carToDelete, setCarToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isCustomersView = location.pathname === '/customers';
  const outletContext = useOutletContext();
  const onOpenAddCar = outletContext?.onOpenAddCar;

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/cars?search=${encodeURIComponent(search)}&status=${statusFilter}`);
      setCars(res.data);
    } catch (err) {
      console.error('Error fetching cars list', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();

    const handleRefresh = () => fetchCars();
    window.addEventListener('car-created', handleRefresh);
    window.addEventListener('service-created', handleRefresh);

    return () => {
      window.removeEventListener('car-created', handleRefresh);
      window.removeEventListener('service-created', handleRefresh);
    };
  }, [search, statusFilter]);

  const handleDelete = async () => {
    if (!carToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/cars/${carToDelete._id}`);
      setCarToDelete(null);
      fetchCars();
    } catch (err) {
      console.error('Error deleting car', err);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Real statistics derived from actual loaded data
  const stats = useMemo(() => {
    const totalVehicles = cars.length;
    const activeInService = cars.filter(
      (c) => c.currentStatus === 'In Service' || c.currentStatus === 'Pending'
    ).length;
    const completed = cars.filter(
      (c) => c.currentStatus === 'Completed' || c.currentStatus === 'Delivered' || c.currentStatus === 'Ready'
    ).length;
    const customerMap = new Map();
    cars.forEach((c) => {
      const name = c.customerId?.name || c.phone || 'Client';
      customerMap.set(name, (customerMap.get(name) || 0) + 1);
    });
    return {
      totalVehicles,
      activeInService,
      completed,
      totalCustomers: customerMap.size,
    };
  }, [cars]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-0.5">
            {isCustomersView ? 'CLIENTS DIRECTORY' : 'VEHICLE REGISTRY'}
          </span>
          <h1 className="text-[26px] font-bold text-[#0F172A] tracking-tight leading-tight">
            {isCustomersView ? 'Customer Directory' : 'Vehicle Registry'}
          </h1>
          <p className="text-[13px] text-[#64748B] font-normal mt-0.5">
            {isCustomersView
              ? 'Simple overview of verified clients, contact details, and assigned luxury vehicles.'
              : 'Detailed registry of German and European vehicles, plate numbers, mileage, and active service status.'}
          </p>
        </div>

        <button
          onClick={() => onOpenAddCar?.()}
          className="btn-primary self-start sm:self-auto py-2.5 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{isCustomersView ? '+ Add Customer & Car' : '+ Add New Vehicle'}</span>
        </button>
      </div>

      {/* 2. Real Stat Summary Cards (No dummy numbers, no fake percentages) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#64748B]">Total Clients</p>
            <div className="mt-0.5">
              <span className="text-[22px] font-bold text-[#0F172A] font-mono">
                {stats.totalCustomers}
              </span>
            </div>
            <p className="text-[10px] text-[#64748B]">Active vehicle owners</p>
          </div>
        </div>

        {/* Total Vehicles */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#64748B]">Total Vehicles</p>
            <div className="mt-0.5">
              <span className="text-[22px] font-bold text-[#0F172A] font-mono">
                {stats.totalVehicles}
              </span>
            </div>
            <p className="text-[10px] text-[#64748B]">In workshop records</p>
          </div>
        </div>

        {/* Active In Service */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-[#FEF2F2] text-[#E50914] flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#64748B]">In Workshop</p>
            <div className="mt-0.5">
              <span className="text-[22px] font-bold text-[#E50914] font-mono">
                {stats.activeInService}
              </span>
            </div>
            <p className="text-[10px] text-[#64748B]">Undergoing service</p>
          </div>
        </div>

        {/* Completed Vehicles */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#64748B]">Completed</p>
            <div className="mt-0.5">
              <span className="text-[22px] font-bold text-emerald-700 font-mono">
                {stats.completed}
              </span>
            </div>
            <p className="text-[10px] text-[#64748B]">Ready for delivery</p>
          </div>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isCustomersView
                ? 'Search customer by name or phone...'
                : 'Search vehicle by brand, model, plate number, or owner...'
            }
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#E50914] focus:bg-white rounded-lg pl-10 pr-4 py-2 text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#FEF2F2]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5">
          {!isCustomersView && (
            <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg text-[13px] text-[#0F172A]">
              <Car className="w-4 h-4 text-[#64748B]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[13px] text-[#0F172A] font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="In Service">In Service</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed / Ready</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg text-[13px] text-[#0F172A]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[13px] text-[#0F172A] font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          {isCustomersView ? (
            /* STREAMLINED CUSTOMER DIRECTORY (Clean, without lots of redundant vehicle info) */
            <table className="w-full text-left">
              <thead className="bg-[#F8FAFC] text-[#64748B] text-[11px] uppercase font-bold border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-5 py-3">CUSTOMER NAME</th>
                  <th className="px-5 py-3">PHONE NUMBER</th>
                  <th className="px-5 py-3">REGISTERED VEHICLE</th>
                  <th className="px-5 py-3">SERVICE VISITS</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-[#64748B] text-[13px] font-medium">
                      Loading customer directory...
                    </td>
                  </tr>
                ) : cars.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-12 text-center text-[#64748B] text-[13px]">
                      <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      No customer records found.
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr
                      key={car._id}
                      onClick={() => navigate(`/cars/${car._id}`)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      {/* Customer Name */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] shrink-0 font-bold text-xs">
                            {car.customerId?.name ? car.customerId.name.slice(0, 2).toUpperCase() : 'CU'}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-[#0F172A] group-hover:text-[#E50914] transition-colors">
                              {car.customerId?.name || 'Customer'}
                            </p>
                            {car.customerId?.address && (
                              <p className="text-[11px] text-[#64748B] truncate max-w-xs flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                                {car.customerId.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-3.5 font-mono text-[13px] text-[#0F172A]">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#E50914]" />
                          <span>{car.customerId?.phone || car.phone || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Registered Vehicle */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#0F172A] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                            {car.registrationNumber}
                          </span>
                          <span className="text-[13px] font-medium text-[#0F172A]">
                            {car.carName} {car.model}
                          </span>
                        </div>
                      </td>

                      {/* Service Visits */}
                      <td className="px-5 py-3.5 text-[13px] text-[#64748B] font-mono">
                        <span className="font-bold text-[#0F172A]">{car.serviceCount || 0}</span> visits
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 text-[#64748B]">
                          <button
                            onClick={() => navigate(`/cars/${car._id}`)}
                            title="View Vehicle History"
                            className="p-1.5 rounded-md hover:text-[#E50914] hover:bg-[#FEF2F2] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCarToDelete(car)}
                            title="Delete"
                            className="p-1.5 rounded-md hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            /* VEHICLE REGISTRY TABLE (NO car banner image, pure sleek black/white/red) */
            <table className="w-full text-left">
              <thead className="bg-[#F8FAFC] text-[#64748B] text-[11px] uppercase font-bold border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-5 py-3">VEHICLE BRAND & MODEL</th>
                  <th className="px-5 py-3">REGISTRATION NUMBER</th>
                  <th className="px-5 py-3">OWNER / CLIENT</th>
                  <th className="px-5 py-3">ODOMETER</th>
                  <th className="px-5 py-3">STATUS</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-[#64748B] text-[13px] font-medium">
                      Loading vehicle registry...
                    </td>
                  </tr>
                ) : cars.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-[#64748B] text-[13px]">
                      <Car className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      No vehicles found in registry.
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr
                      key={car._id}
                      onClick={() => navigate(`/cars/${car._id}`)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      {/* Vehicle Brand & Model (NO IMAGE) */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] shrink-0 font-bold">
                            <Car className="w-4 h-4 text-[#E50914]" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-[#0F172A] group-hover:text-[#E50914] transition-colors">
                              {car.carName}
                            </p>
                            <p className="text-[11px] text-[#64748B]">
                              {car.model}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Registration Plate */}
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-[12px] font-bold text-[#0F172A] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0] shadow-sm inline-block">
                          {car.registrationNumber}
                        </span>
                      </td>

                      {/* Owner / Client */}
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-bold text-[#0F172A]">
                          {car.customerId?.name || 'Customer'}
                        </p>
                        <p className="text-[11px] text-[#64748B] font-mono mt-0.5">
                          {car.customerId?.phone || car.phone || 'N/A'}
                        </p>
                      </td>

                      {/* Current KM */}
                      <td className="px-5 py-3.5 font-mono text-[13px] text-[#0F172A]">
                        {car.currentKm ? `${car.currentKm.toLocaleString()} KM` : '—'}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <StatusBadge status={car.currentStatus || 'Ready'} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 text-[#64748B]">
                          <button
                            onClick={() => navigate(`/cars/${car._id}`)}
                            title="View Vehicle"
                            className="p-1.5 rounded-md hover:text-[#E50914] hover:bg-[#FEF2F2] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCarToDelete(car)}
                            title="Delete"
                            className="p-1.5 rounded-md hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* 5. Clean Footer */}
        <div className="px-5 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between text-[12px] text-[#64748B]">
          <div>
            Showing <strong className="text-[#0F172A]">{cars.length}</strong> {isCustomersView ? 'verified client(s)' : 'registered vehicle(s)'}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!carToDelete}
        onClose={() => setCarToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Record"
        message={`Are you sure you want to delete ${carToDelete?.carName} (${carToDelete?.registrationNumber})? This will permanently remove the record.`}
      />
    </div>
  );
};
