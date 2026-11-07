'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Wrench,
  Cpu,
  Zap,
  Wind,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Car,
  Sliders,
  Instagram,
  Navigation,
  Truck,
  Sparkles,
  Search,
  Loader2,
  RotateCcw,
  Gauge,
  Layers,
  FileText,
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check Car Tracker States
  const [checkCarOpen, setCheckCarOpen] = useState(false);
  const [carRegInput, setCarRegInput] = useState('');
  const [carData, setCarData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchedPlate, setSearchedPlate] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll reveal observer for silky smooth entry animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const animElements = document.querySelectorAll('.scroll-fade');
    animElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      animElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const phoneNumber = '+919567386024';
  const displayPhone = '+91 95673 86024';
  const locationUrl = 'https://maps.google.com/?q=11.239908,76.172821';
  const instagramUrl = 'https://www.instagram.com/de_code71?stkn=MTV3aWN3Z3kwb3Vzbw%3D%3D&utm_source=qr';

  const brands = [
    { name: 'BMW', origin: 'Bavaria, Germany' },
    { name: 'Mercedes-Benz', origin: 'Stuttgart, Germany' },
    { name: 'Porsche', origin: 'Stuttgart, Germany' },
    { name: 'Audi', origin: 'Ingolstadt, Germany' },
    { name: 'Volkswagen', origin: 'Wolfsburg, Germany' },
    { name: 'Land Rover', origin: 'United Kingdom' },
    { name: 'MINI Cooper', origin: 'Oxford, UK' },
    { name: 'Skoda', origin: 'Mladá Boleslav, Czech' },
    { name: 'Volvo', origin: 'Gothenburg, Sweden' },
  ];

  const mainPillars = [
    {
      title: 'Auto Electrical',
      sub: 'Module & Harness Engineering',
      desc: 'Precision tracing and repair of intricate electronic wiring systems, fuse distributions, sensor communication, and CAN-bus networks.',
      icon: <Zap size={28} />,
      points: ['Wiring harness diagnostics', 'ECU & BCM component repairs', 'Sensor & actuator calibration'],
    },
    {
      title: 'Auto Scanning & Coding',
      sub: 'Dealer-Level Diagnostics',
      desc: 'OEM-grade computerized scanning, software updates, module initialization, key programming, and feature retrofits for European marques.',
      icon: <Cpu size={28} />,
      points: ['Full ECU coding & flash updates', 'Component protection removal', 'Fault code analysis & resetting'],
    },
    {
      title: 'Car AC Service',
      sub: 'Climate Control Precision',
      desc: 'Specialized automotive air conditioning servicing, compressor overhaul, dual/quad zone climate calibration, and refrigerant recovery.',
      icon: <Wind size={28} />,
      points: ['High-precision leak detection', 'Compressor valve & clutch repair', 'Cabin air purification & cooling check'],
    },
  ];

  const services = [
    {
      num: '01',
      title: 'Advanced Electrical & Diagnostics',
      icon: <Zap size={24} />,
      desc: 'Advanced electrical and electronic solutions featuring OEM-level diagnostic scanning, ECU coding, and CAN bus network troubleshooting for German luxury vehicles.',
      highlights: [
        'OEM-level diagnostic scanning',
        'ECU coding & flash updates',
        'CAN bus network troubleshooting',
      ],
    },
    {
      num: '02',
      title: 'Mechanical Care & Engine Works',
      icon: <Wrench size={24} />,
      desc: 'Comprehensive mechanical services for German V6 and inline engines, featuring engine overhauls, turbocharger repairs, suspension and air suspension calibration, brake system overhauls, and timing chain replacements.',
      highlights: [
        'Engine overhauls & timing chains',
        'Turbocharger repairs & calibration',
        'Brake & air suspension calibration',
      ],
    },
    {
      num: '03',
      title: 'AC & Climate Control',
      icon: <Wind size={24} />,
      desc: 'Expert climate control services including AC compressor repair, module diagnosis, evaporator coil cleaning, leak testing, and gas refilling for luxury vehicles.',
      highlights: [
        'AC compressor repair & overhaul',
        'Evaporator coil cleaning & leak testing',
        'Module diagnosis & gas refilling',
      ],
    },
    {
      num: '04',
      title: 'Periodic Maintenance Service (PMS)',
      icon: <Sliders size={24} />,
      desc: 'Precise periodic maintenance services featuring premium synthetic oils (Liqui Moly, Mobil 1, Shell, Castrol), Ceratec additives, and a comprehensive multi-point vehicle health check.',
      highlights: [
        'Liqui Moly, Mobil 1, Shell, Castrol',
        'Ceratec engine friction additives',
        'Multi-point vehicle health check',
      ],
    },
    {
      num: '05',
      title: 'Performance & Upgrades',
      icon: <Gauge size={24} />,
      desc: 'Advanced performance tuning, ECU remapping, and custom exhaust system upgrades to optimize vehicle power and driving dynamics.',
      highlights: [
        'Advanced performance ECU remapping',
        'Custom exhaust system upgrades',
        'Vehicle power & driving dynamics optimization',
      ],
    },
    {
      num: '06',
      title: 'Accessories & Upgrades',
      icon: <ShieldCheck size={24} />,
      desc: 'Custom performance upgrades including brake and shock absorber enhancements, along with on-demand installations of premium Android screens, dash cams, and automotive accessories based on customer inquiry.',
      highlights: [
        'Brake & shock absorber enhancements',
        'Premium Android screens & dash cams',
        'Custom luxury accessories on demand',
      ],
    },
    {
      num: '07',
      title: 'Used Spares Sourcing & Fitting',
      icon: <Layers size={24} />,
      desc: 'Sourcing and procurement of quality-checked used spare parts for all German and European luxury vehicles based on customer inquiry, complete with expert installation and fitting at our workshop.',
      highlights: [
        'Quality-checked OEM used spare parts',
        'Sourcing on customer inquiry',
        'Expert workshop fitting & installation',
      ],
    },
    {
      num: '08',
      title: 'Digital Service History & Reminders',
      icon: <FileText size={24} />,
      desc: "Complete digital service records for all vehicles serviced at DECODE. Customers can easily check their vehicle's entire service history and upcoming maintenance schedules anytime through the 'Vehicle Checkup' option on our website.",
      highlights: [
        'Complete digital service records',
        'Upcoming maintenance schedules',
        'Instant online vehicle checkup',
      ],
      isCheckupAction: true,
    },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || 'Ready').toLowerCase();
    if (s === 'in service') {
      return (
        <span className="status-pill-badge status-in-service">
          <span className="status-dot-pulse" />
          In Service
        </span>
      );
    }
    if (s === 'pending') {
      return (
        <span className="status-pill-badge status-pending">
          <span className="status-dot-pulse" />
          Pending / In Queue
        </span>
      );
    }
    if (s === 'completed' || s === 'ready') {
      return (
        <span className="status-pill-badge status-completed">
          <span className="status-dot-pulse" />
          {status}
        </span>
      );
    }
    return (
      <span className="status-pill-badge status-delivered">
        <CheckCircle2 size={13} />
        {status || 'Delivered'}
      </span>
    );
  };

  const handleCheckCar = async (plateToSearch) => {
    const regToUse = (typeof plateToSearch === 'string' ? plateToSearch : carRegInput).trim();
    if (!regToUse) {
      setSearchError('Please enter a vehicle registration number (e.g. KL 10 AB 1234)');
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    try {
      const res = await fetch(`/api/check-car?reg=${encodeURIComponent(regToUse)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setCarData(null);
        setSearchError(data.message || `No records found for "${regToUse.toUpperCase()}".`);
      } else {
        setCarData(data);
        setSearchedPlate(regToUse.toUpperCase());
        setCarRegInput(regToUse.toUpperCase());
        setSearchError(null);
        setTimeout(() => {
          document.getElementById('check-car-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    } catch (err) {
      console.error('Error checking car status:', err);
      setSearchError('Connection to server failed. Please check your network or try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `*DECODE Auto Diagnosing Hub - Service Appointment Request*\n\n` +
      `👤 *Customer Name:* ${customerName || 'Customer'}\n` +
      `📞 *Phone:* ${customerPhone || 'Not provided'}\n` +
      `🚗 *Vehicle Brand:* ${selectedBrand}\n` +
      `🏎️ *Model & Year:* ${carModel || 'Standard European'}\n` +
      `🛠️ *Requested Service:* ${selectedService}\n` +
      `📅 *Preferred Date:* ${preferredDate || 'Earliest Available'}\n` +
      `📝 *Notes/Issues:* ${bookingNote || 'Standard diagnostics'}\n\n` +
      `_I confirm that I understand prior booking is required for dedicated attention._`
    );
    window.open(`https://wa.me/919567386024?text=${text}`, '_blank');
  };

  return (
    <div className="page-wrapper">
      {/* Top Red Ticker with Continuous Train Animation - Clean Sans-Serif, No Dots */}
      <div className="top-train-ticker">
        <div className="train-track">
          <span className="train-item">
            <MapPin size={12} />
            <span>Mampad, PIN Code: 676542</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>PH: 9567386024</span>
          </span>
          <span className="train-item">
            <MapPin size={12} />
            <span>DECODE AUTO DIAGNOSING HUB — Mampad</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>+91 95673 86024</span>
          </span>

          {/* Repeat for seamless infinite train animation loop */}
          <span className="train-item">
            <MapPin size={12} />
            <span>Mampad, PIN Code: 676542</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>PH: 9567386024</span>
          </span>
          <span className="train-item">
            <MapPin size={12} />
            <span>DECODE AUTO DIAGNOSING HUB — Mampad</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>+91 95673 86024</span>
          </span>
        </div>
      </div>

      {/* Navigation Header - Sleek Luxury Black */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="container nav-inner">
          <a href="#" className="brand-logo-wrap" title="DECODE Auto Diagnosing Hub">
            <Image
              src="/images/logo.png"
              alt="DECODE Logo"
              width={46}
              height={36}
              style={{ objectFit: 'contain' }}
              priority
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            <a href="#" className="nav-link active">Home</a>
            <button
              type="button"
              onClick={() => setCheckCarOpen(true)}
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red-bright)', fontWeight: 600 }}
            >
              Check Car
            </button>
            <a href="#specialties" className="nav-link">Specialties</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#workshop" className="nav-link">Workshop</a>
            <a href="#location" className="nav-link">Contact</a>
          </nav>

          {/* Right Header CTA: Direct Phone */}
          <div className="nav-cta-clean">
            <a href={`tel:${phoneNumber}`} className="nav-phone-raw">
              <Phone size={12} color="var(--red-bright)" />
              <span>{displayPhone}</span>
            </a>
          </div>

          {/* Mobile Right Bar: Hamburger Toggle */}
          <div className="mobile-header-actions">
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-panel">
            <a href="#" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--red-bright)', fontWeight: 600 }}>Home</a>
            <button
              type="button"
              onClick={() => {
                setCheckCarOpen(true);
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--red-bright)',
                fontWeight: 700,
                textAlign: 'left',
                padding: 0,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              🚗 Check Car Status
            </button>
            <a href="#specialties" onClick={() => setMobileMenuOpen(false)}>Specialties</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#workshop" onClick={() => setMobileMenuOpen(false)}>The Workshop</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-dropdown-phone"
            >
              <Phone size={14} color="var(--red-bright)" />
              <span>Call: {displayPhone}</span>
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-ref-wrapper" id="home">
        <div className="hero-ref-center">
          <h1 className="sr-only">DECODE AUTO DIAGNOSING HUB — German &amp; European Specialists</h1>

          <div className="hero-mobile-text-wrap">
            <p className="hero-ref-desc">
              Exclusively for German &amp; European Premium Vehicles
            </p>
            <div className="hero-ref-subchips">
              <span>Auto Electrical</span>
              <span className="dot-sep">•</span>
              <span>Scanning &amp; Coding</span>
              <span className="dot-sep">•</span>
              <span>Car AC Service</span>
            </div>
            <div className="hero-ref-loc-bar">
              Mampad, PIN: 676542 • PH: 9567386024
            </div>
          </div>

          <div className="hero-ref-btn-group">
            <button
              type="button"
              onClick={() => setCheckCarOpen(true)}
              className="btn-hero-solid"
              style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Car size={14} />
              <span>CHECK CAR STATUS</span>
            </button>
            <a href="#services" className="btn-hero-outline">
              <span>OUR SERVICES</span>
            </a>
            <a href="#location" className="btn-hero-outline">
              <span>CONTACT US</span>
            </a>
          </div>
        </div>
      </section>

      {/* CHECK CAR MODAL / POPUP: Only shows small input bar when "Check Car" is clicked */}
      {checkCarOpen && (
        <div className="check-car-modal-backdrop" onClick={() => setCheckCarOpen(false)}>
          <div
            className="check-car-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="modal-close-icon-btn"
              onClick={() => setCheckCarOpen(false)}
              aria-label="Close modal"
              title="Close"
            >
              <X size={16} />
            </button>

            {/* Small Input Bar */}
            <div className="modal-search-header">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheckCar();
                }}
                className="small-search-form"
              >
                <div className="small-input-row">
                  <input
                    type="text"
                    className="small-car-input"
                    placeholder="Car number (e.g. KL 10 AB 1234)..."
                    value={carRegInput}
                    onChange={(e) => {
                      setCarRegInput(e.target.value.toUpperCase());
                      if (searchError) setSearchError(null);
                    }}
                    autoFocus
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  {carRegInput && (
                    <button
                      type="button"
                      onClick={() => setCarRegInput('')}
                      className="small-input-clear-btn"
                      title="Clear"
                    >
                      <X size={13} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn-small-check-car"
                    disabled={searchLoading}
                    aria-label="Check Car Status"
                    title="Check Car Status"
                  >
                    {searchLoading ? (
                      <Loader2 size={16} className="spin-loader" />
                    ) : (
                      <Search size={16} />
                    )}
                  </button>
                </div>
              </form>

              {/* Error Message */}
              {searchError && (
                <div className="check-car-error-card">
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div className="error-title">Vehicle Not Found</div>
                    <div className="error-desc">{searchError}</div>
                  </div>
                </div>
              )}
            </div>

            {/* CLEAR VEHICLE & SERVICE DETAILS REPORT (No Icons / Clear Document Layout) */}
            {carData && carData.car && (
              <div className="clean-vehicle-report" id="check-car-results">
                {/* Vehicle Title & Status */}
                <div className="report-header">
                  <div>
                    <div className="report-reg-badge">{carData.car.registrationNumber}</div>
                    <h3 className="report-car-title">
                      {carData.car.carName} {carData.car.model ? `— ${carData.car.model}` : ''}
                    </h3>
                  </div>
                  <div className="report-status-badge">
                    {carData.currentStatus}
                  </div>
                </div>

                {/* Key Vehicle Specifications Table */}
                <div className="report-specs-table">
                  <div className="report-spec-item">
                    <span className="spec-item-label">Odometer:</span>
                    <span className="spec-item-val">{carData.car.currentKm ? `${carData.car.currentKm.toLocaleString()} KM` : 'N/A'}</span>
                  </div>
                  <div className="report-spec-item">
                    <span className="spec-item-label">Chassis / VIN:</span>
                    <span className="spec-item-val">{carData.car.chassisNumber || 'OEM Verified'}</span>
                  </div>
                  <div className="report-spec-item">
                    <span className="spec-item-label">Client Name:</span>
                    <span className="spec-item-val">{carData.car.customerName}</span>
                  </div>
                  <div className="report-spec-item">
                    <span className="spec-item-label">Total Visits:</span>
                    <span className="spec-item-val">{carData.totalServices} {carData.totalServices === 1 ? 'Service' : 'Services'}</span>
                  </div>
                </div>

                {/* Active Service (if currently ongoing) */}
                {carData.activeService && (
                  <div className="report-active-service">
                    <div className="report-active-title">
                      Active Job: {carData.activeService.serviceCode} ({carData.activeService.status})
                    </div>
                    <div className="report-active-row">
                      <strong>Type:</strong> {carData.activeService.serviceType}
                    </div>
                    {carData.activeService.expectedDeliveryDate && (
                      <div className="report-active-row">
                        <strong>Est. Delivery:</strong> {formatDate(carData.activeService.expectedDeliveryDate)}
                      </div>
                    )}
                    {carData.activeService.workDescription && (
                      <div className="report-active-row">
                        <strong>Work Scope:</strong> {carData.activeService.workDescription}
                      </div>
                    )}
                    {carData.activeService.parts && (
                      <div className="report-active-row">
                        <strong>Components:</strong> {carData.activeService.parts}
                      </div>
                    )}
                  </div>
                )}

                {/* Service History Records */}
                <div className="report-history-wrap">
                  <h4 className="report-history-title">
                    Service History Records ({carData.serviceHistory?.length || 0})
                  </h4>

                  {carData.serviceHistory && carData.serviceHistory.length > 0 ? (
                    <div className="report-history-entries">
                      {carData.serviceHistory.map((srv, idx) => (
                        <div key={srv.id || idx} className="report-entry-card">
                          <div className="report-entry-top">
                            <div className="report-entry-main">
                              <span className="entry-date">{formatDate(srv.serviceDate)}</span>
                              <span className="entry-sep">•</span>
                              <span className="entry-code">{srv.serviceCode}</span>
                              <span className="entry-sep">•</span>
                              <span className="entry-type">{srv.serviceType}</span>
                            </div>
                            <span className="entry-status">{srv.status}</span>
                          </div>

                          <div className="report-entry-details">
                            {srv.currentKm > 0 && (
                              <div className="entry-detail-row">
                                <span className="entry-label">Odometer:</span>
                                <span>{srv.currentKm.toLocaleString()} KM</span>
                              </div>
                            )}
                            {srv.workDescription && (
                              <div className="entry-detail-row">
                                <span className="entry-label">Work Done:</span>
                                <span>{srv.workDescription}</span>
                              </div>
                            )}
                            {srv.parts && (
                              <div className="entry-detail-row">
                                <span className="entry-label">Parts:</span>
                                <span>{srv.parts}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="report-no-records">No prior service records recorded for this vehicle.</p>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="report-footer-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setCarData(null);
                      setCarRegInput('');
                    }}
                    className="btn-check-another"
                  >
                    Check Another Vehicle
                  </button>
                  <a
                    href={`https://wa.me/919567386024?text=${encodeURIComponent(
                      `Hi DECODE Hub, I am inquiring regarding vehicle ${carData.car.carName} (${carData.car.registrationNumber}). Current status: ${carData.currentStatus}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-action"
                  >
                    Contact Workshop
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3 Core Highlight Pillars */}
      <section className="section scroll-fade" id="specialties">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <h2 className="section-title">
              Engineered Exclusively For <span className="text-gradient-red">European Precision</span>
            </h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Unlike generic garages, our facility is equipped with dedicated OEM interface modules, high-frequency oscilloscopes, and specialized climate servicing chambers.
            </p>
          </div>

          <div className="pillars-grid">
            {mainPillars.map((pillar) => (
              <div key={pillar.title} className="pillar-card scroll-fade">
                <div className="pillar-icon-box">{pillar.icon}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--red-bright)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {pillar.sub}
                </div>
                <p className="pillar-desc">{pillar.desc}</p>
                <ul className="pillar-features">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="pillar-feature-item">
                      <CheckCircle2 size={15} color="var(--red-bright)" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Professional Services List */}
      <section className="section scroll-fade" id="services" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <h2 className="section-title">
              Our Professional <span className="text-gradient-red">Services</span>
            </h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              From component-level ECU repairs to comprehensive pre-trip inspections and air conditioning restorations.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc) => (
              <div key={svc.title} className="service-card scroll-fade">
                <div className="service-top">
                  <div className="service-header">
                    <div className="service-icon-box">{svc.icon}</div>
                    <span className="service-number">{svc.num}</span>
                  </div>
                  <h3 className="service-title">{svc.title}</h3>
                  <p className="service-desc">{svc.desc}</p>
                  <ul className="service-points">
                    {svc.highlights.map((h) => (
                      <li key={h} className="service-point">
                        <CheckCircle2 size={13} color="var(--red-bright)" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {svc.isCheckupAction && (
                    <button
                      type="button"
                      onClick={() => setCheckCarOpen(true)}
                      className="btn-service-checkup"
                    >
                      <Car size={13} />
                      <span>Check Vehicle Service Status</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Workshop Showcase */}
      <section className="section scroll-fade" id="workshop">
        <div className="container">
          <div className="workshop-showcase-grid">
            <div>
              <h2 className="section-title">
                The Workshop Engineered For <span className="text-gradient-red">Precision Care</span>
              </h2>
              <p className="section-desc">
                Located conveniently at Mampad (Edakkara-Kalasagar), our workshop is purpose-built to deliver sterile, dealer-spec diagnostic bays, high-rise hydraulic vehicle lifts, and genuine OEM diagnostic toolchains.
              </p>

              <div className="showcase-badges-grid">
                <div className="showcase-badge-item">
                  <div className="showcase-badge-title">
                    <CheckCircle2 size={16} color="var(--red-bright)" />
                    OEM Software
                  </div>
                  <div className="showcase-badge-desc">
                    Direct access to factory flash files, wiring schematics &amp; repair manuals.
                  </div>
                </div>

                <div className="showcase-badge-item">
                  <div className="showcase-badge-title">
                    <CheckCircle2 size={16} color="var(--red-bright)" />
                    Clean Climate Bay
                  </div>
                  <div className="showcase-badge-desc">
                    Isolated testing area for precision AC vacuum tests and leak tracing.
                  </div>
                </div>

                <div className="showcase-badge-item">
                  <div className="showcase-badge-title">
                    <CheckCircle2 size={16} color="var(--red-bright)" />
                    Hydraulic Lifts
                  </div>
                  <div className="showcase-badge-desc">
                    Multi-ton hydraulic systems for full underbody and suspension analysis.
                  </div>
                </div>

                <div className="showcase-badge-item">
                  <div className="showcase-badge-title">
                    <CheckCircle2 size={16} color="var(--red-bright)" />
                    Micro-Soldering Lab
                  </div>
                  <div className="showcase-badge-desc">
                    Surface-mount component replacement on water-damaged or fried ECUs.
                  </div>
                </div>
              </div>
            </div>

            <div className="workshop-frame" style={{ border: '2px solid rgba(230, 30, 42, 0.5)' }}>
              <Image
                src="/images/workshop.jpg"
                alt="DECODE Auto Diagnosing Hub Full Workshop"
                width={800}
                height={550}
                className="workshop-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location & Interactive Map Section */}
      <section className="section location-section scroll-fade" id="location">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <h2 className="section-title">
              Workshop <span className="text-gradient-red">Location & Map</span>
            </h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Centrally accessible in Mampad, Edakkara-Kalasagar. Easily navigate via Google Maps or contact us for route guidance.
            </p>
          </div>

          <div className="location-grid">
            <div className="location-info-card scroll-fade">
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>DECODE Auto Diagnosing Hub</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Exclusively for German &amp; European Premium Vehicles
                </p>

                <div className="location-details-list">
                  <div className="location-detail-item">
                    <div className="location-icon-box">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="detail-label">Workshop Location</div>
                      <div className="detail-value">
                        DECODE AUTO DIAGNOSING HUB<br />
                        Mampad, PIN Code: 676542<br />
                        Malappuram District, Kerala - India
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--red-bright)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                        Coordinates: 11.239908, 76.172821
                      </div>
                    </div>
                  </div>

                  <div className="location-detail-item">
                    <div className="location-icon-box">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="detail-label">Booking &amp; Assistance</div>
                      <div className="detail-value">
                        <a href={`tel:${phoneNumber}`} style={{ color: 'var(--red-bright)', fontWeight: 600 }}>
                          +91 95673 86024
                        </a>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        WhatsApp &amp; Direct Calls
                      </div>
                    </div>
                  </div>

                  <div className="location-detail-item">
                    <div className="location-icon-box">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="detail-label">Operating Hours</div>
                      <div className="detail-value">Monday – Saturday</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        09:00 AM – 07:00 PM (Prior Booking Mandatory)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Google Maps */}
            <div className="map-wrapper scroll-fade">
              <iframe
                title="DECODE Auto Diagnosing Hub Location Map"
                src="https://maps.google.com/maps?q=11.239908,76.172821&hl=en&z=15&output=embed"
                className="map-iframe"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand-logo-wrap" style={{ marginBottom: '1rem' }}>
                <div className="logo-img-wrapper">
                  <Image
                    src="/images/logo.png"
                    alt="DECODE Logo"
                    width={48}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="brand-text-block">
                  <div className="brand-name">
                    DE<span>CODE</span>
                  </div>
                  <div className="brand-tagline">Auto Diagnosing Hub</div>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '320px' }}>
                Exclusively for German &amp; European Premium Vehicles in Mampad, Edakkara-Kalasagar. Specializing in Auto Electrical, Auto Scanning, and Car AC Service.
              </p>
            </div>

            <div>
              <div className="footer-col-title">Core Services</div>
              <ul className="footer-links">
                <li><a href="#services" className="footer-link">Advanced Electrical &amp; Diagnostics</a></li>
                <li><a href="#services" className="footer-link">Mechanical Care &amp; Engine Works</a></li>
                <li><a href="#services" className="footer-link">AC &amp; Climate Control</a></li>
                <li><a href="#services" className="footer-link">Periodic Maintenance Service (PMS)</a></li>
                <li><a href="#services" className="footer-link">Performance &amp; Upgrades</a></li>
                <li><a href="#services" className="footer-link">Accessories &amp; Upgrades</a></li>
                <li><a href="#services" className="footer-link">Used Spares Sourcing &amp; Fitting</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setCheckCarOpen(true)}
                    className="footer-link"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'var(--red-bright)', font: 'inherit' }}
                  >
                    Digital Service History &amp; Reminders
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">European Marques</div>
              <ul className="footer-links">
                <li><span className="footer-link">BMW / MINI Cooper</span></li>
                <li><span className="footer-link">Mercedes-Benz</span></li>
                <li><span className="footer-link">Porsche</span></li>
                <li><span className="footer-link">Audi / Volkswagen</span></li>
                <li><span className="footer-link">Land Rover / Volvo</span></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Contact &amp; Location</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78rem', color: '#9ca3af' }}>
                <div>
                  <strong style={{ color: '#ffffff' }}>Address:</strong><br />
                  DECODE AUTO DIAGNOSING HUB<br />
                  Mampad, PIN Code: 676542<br />
                  Kerala, India
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>Phone / Booking:</strong><br />
                  <a href={`tel:${phoneNumber}`} style={{ color: 'var(--red-bright)', fontWeight: 600 }}>
                    PH: 9567386024
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#ffffff' }}>Instagram:</strong><br />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#e5e7eb', fontWeight: 500 }}>
                    @de_code71
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © {new Date().getFullYear()} DECODE AUTO DIAGNOSING HUB. All Rights Reserved.
            </div>
            <div>
              Prior Booking Required for All Workshop Visits.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
