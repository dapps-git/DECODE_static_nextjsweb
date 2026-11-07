import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import api from '../api/axios';
import { StatusBadge } from '../components/StatusBadge';
import { ServiceTypeBadge } from '../components/ServiceTypeBadge';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { AddServiceModal } from '../components/AddServiceModal';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  Wrench,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
} from 'lucide-react';

export const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  const [selectedService, setSelectedService] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const onOpenAddService = outletContext?.onOpenAddService;

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/services?search=${encodeURIComponent(search)}&status=${statusFilter}`
      );
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    const handleRefresh = () => fetchServices();
    window.addEventListener('service-created', handleRefresh);
    window.addEventListener('car-created', handleRefresh);

    return () => {
      window.removeEventListener('service-created', handleRefresh);
      window.removeEventListener('car-created', handleRefresh);
    };
  }, [search, statusFilter]);

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/services/${serviceToDelete._id}`);
      setServiceToDelete(null);
      fetchServices();
    } catch (err) {
      console.error('Error deleting service', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = (status) => {
    if (status === 'all') {
      searchParams.delete('status');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ status });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-0.5">
            WORKSHOP JOBS
          </span>
          <h1 className="text-[26px] font-bold text-[#0F172A] tracking-tight leading-tight">
            Service Orders &amp; Job Cards
          </h1>
          <p className="text-[13px] text-[#64748B] font-normal mt-0.5">
            Complete records of luxury maintenance, ECU coding, mechanical overhauls, and billing logs.
          </p>
        </div>

        <button
          onClick={() => onOpenAddService?.()}
          className="btn-primary self-start sm:self-auto py-2.5 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job code, vehicle registration, model, or customer..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#E50914] focus:bg-white rounded-lg pl-10 pr-4 py-2 text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#FEF2F2]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Jobs' },
            { id: 'In Service', label: 'In Service' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Completed', label: 'Completed' },
            { id: 'Delivered', label: 'Delivered' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => handleStatusChange(st.id)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${
                statusFilter === st.id
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[#64748B] text-[11px] uppercase font-bold border-b border-[#E2E8F0]">
              <tr>
                <th className="px-5 py-3">JOB CODE</th>
                <th className="px-5 py-3">VEHICLE</th>
                <th className="px-5 py-3">CUSTOMER</th>
                <th className="px-5 py-3">SERVICE TYPE</th>
                <th className="px-5 py-3">DATE &amp; KM</th>
                <th className="px-5 py-3">TOTAL COST</th>
                <th className="px-5 py-3">STATUS</th>
                <th className="px-5 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-5 py-8 text-center text-[#64748B] text-[13px] font-medium">
                    Loading service history records...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-[#64748B] text-[13px]">
                    <Wrench className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No service records found.
                  </td>
                </tr>
              ) : (
                services.map((srv) => (
                  <tr
                    key={srv._id}
                    onClick={() => setSelectedService(srv)}
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    {/* ID */}
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-[12px] font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                        {srv.serviceCode || 'SRV-000'}
                      </span>
                    </td>

                    {/* Vehicle */}
                    <td className="px-5 py-3.5">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (srv.carId?._id) navigate(`/cars/${srv.carId._id}`);
                        }}
                        className="hover:text-[#E50914] transition-colors"
                      >
                        <div className="text-[13px] font-bold text-[#0F172A] group-hover:text-[#E50914] transition-colors">
                          {srv.carId?.carName || 'Vehicle'}
                        </div>
                        <div className="font-mono text-[11px] text-[#64748B]">
                          {srv.carId?.registrationNumber}
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-3.5">
                      <div className="text-[13px] font-semibold text-[#0F172A]">{srv.customerId?.name || '—'}</div>
                      <div className="text-[11px] text-[#64748B] font-mono">
                        {srv.customerId?.phone}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <ServiceTypeBadge type={srv.serviceType} />
                    </td>

                    {/* Date & KM */}
                    <td className="px-5 py-3.5">
                      <div className="font-mono text-[12px] font-bold text-[#0F172A]">
                        {formatDate(srv.serviceDate)}
                      </div>
                      <div className="font-mono text-[11px] text-[#64748B]">
                        {srv.currentKm ? `${srv.currentKm.toLocaleString()} KM` : '—'}
                      </div>
                    </td>

                    {/* Cost */}
                    <td className="px-5 py-3.5 font-mono text-[13px] font-bold text-[#0F172A]">
                      {srv.totalCost > 0 ? `₹${srv.totalCost.toLocaleString()}` : '—'}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <StatusBadge status={srv.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedService(srv)}
                          title="View Details"
                          className="p-1.5 rounded-md text-[#64748B] hover:text-[#E50914] hover:bg-[#FEF2F2] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingService(srv);
                          }}
                          title="Edit Service"
                          className="p-1.5 rounded-md text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setServiceToDelete(srv)}
                          title="Delete Service"
                          className="p-1.5 rounded-md text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
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
        </div>
      </div>

      {selectedService && (
        <ServiceDetailModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
          onEdit={(srv) => {
            setSelectedService(null);
            setEditingService(srv);
          }}
          onDelete={(srv) => {
            setSelectedService(null);
            setServiceToDelete(srv);
          }}
        />
      )}

      {editingService && (
        <AddServiceModal
          isOpen={!!editingService}
          editService={editingService}
          onClose={() => setEditingService(null)}
          onSuccess={() => {
            setEditingService(null);
            fetchServices();
          }}
        />
      )}

      <ConfirmModal
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Service Record"
        message={`Are you sure you want to delete service ${serviceToDelete?.serviceCode || ''} for ${serviceToDelete?.carId?.carName || 'this vehicle'}?`}
      />
    </div>
  );
};
