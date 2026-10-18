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
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      title: 'Vehicle Programming & Coding',
      icon: <Cpu size={24} />,
      desc: 'OEM dealer-level flashing, retrofits, ECU/TCU adaptation, key matching, and feature unlocks for BMW, Mercedes, Audi, Porsche, and VW.',
      highlights: ['ECU / TCU software updates', 'Hidden features activation', 'Module adaptations'],
    },
    {
      num: '02',
      title: 'Expert Electrical & Electronic Diagnosis',
      icon: <Zap size={24} />,
      desc: 'Pinpoint troubleshooting of parasitic battery drains, CAN bus communication errors, sensor faults, immobilizer issues, and lighting modules.',
      highlights: ['CAN-Bus network diagnosis', 'Parasitic battery drain testing', 'Alternator & starter systems'],
    },
    {
      num: '03',
      title: 'Comprehensive Vehicle Inspection',
      icon: <ShieldCheck size={24} />,
      desc: 'Rigorous multi-point European standard mechanical and electronic health audits prior to long road trips, pre-purchase, or track days.',
      highlights: ['Live sensor data evaluation', 'Subframe & suspension scan', 'Underbody & fluid check'],
    },
    {
      num: '04',
      title: 'Specialized Automotive AC & Cooling System',
      icon: <Wind size={24} />,
      desc: 'Advanced air conditioning diagnostics, evaporator replacements, radiator flushing, and electronic climate control module repair.',
      highlights: ['R134a/R1234yf vacuum recharge', 'HVAC flap motor repair', 'Thermostat & water pump testing'],
    },
    {
      num: '05',
      title: 'Premium Genuine Used Spares',
      icon: <Wrench size={24} />,
      desc: 'High-quality tested and verified OEM used replacement parts, body control units, steering racks, headlamps, and powertrain components.',
      highlights: ['Tested OEM components', 'Cost-effective premium spares', 'Fitment warranty'],
    },
    {
      num: '06',
      title: 'Periodical Maintenance & Mechanical Repairs',
      icon: <Sliders size={24} />,
      desc: 'Scheduled interval service following factory European checklists, Liqui Moly / Motul high-grade synthetic lubricants, and suspension rebuilds.',
      highlights: ['Euro-spec synthetic oils', 'Brembo & OEM brake care', 'Transmission fluid flush'],
    },
    {
      num: '07',
      title: 'Convenient Vehicle Pick & Drop Service',
      icon: <Car size={24} />,
      desc: 'Hassle-free insured transport service to collect your European vehicle directly from your home or office and deliver it back post-service.',
      highlights: ['Insured transit', 'Real-time updates', 'Doorstep pickup in Mampad & Nilambur'],
    },
    {
      num: '08',
      title: 'Roadside Assistance & Breakdown Support',
      icon: <Truck size={24} />,
      desc: 'Emergency on-spot diagnostic support, jump-starts, electrical lockouts, and flatbed towing coordination across Malappuram & surrounding zones.',
      highlights: ['On-site scanning', 'Emergency tow dispatch', 'Fast roadside response'],
    },
  ];

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
            <span>Mampad, Edakkara-Kalasagar</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>+91 95673 86024</span>
          </span>
          <span className="train-item">
            <MapPin size={12} />
            <span>Mampad, Edakkara-Kalasagar</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>9567386024</span>
          </span>

          {/* Repeat for seamless infinite train animation loop */}
          <span className="train-item">
            <MapPin size={12} />
            <span>Mampad, Edakkara-Kalasagar</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>+91 95673 86024</span>
          </span>
          <span className="train-item">
            <MapPin size={12} />
            <span>Mampad, Edakkara-Kalasagar</span>
          </span>
          <span className="train-item">
            <Phone size={12} />
            <span>9567386024</span>
          </span>
        </div>
      </div>

      {/* Navigation Header - Solid Black */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="container nav-inner">
          <a href="#" className="brand-logo-wrap" title="DECODE AUTO DIAGNOSING HUB">
            <div className="logo-img-wrapper">
              <Image
                src="/images/logo.png"
                alt="DECODE Logo"
                width={58}
                height={46}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            <a href="#" className="nav-link active">Home</a>
            <a href="#specialties" className="nav-link">Specialties</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#workshop" className="nav-link">Workshop</a>
            <a href="#location" className="nav-link">Location &amp; Contact</a>
          </nav>

          {/* Right Header CTA: Direct Phone */}
          <div className="nav-cta-clean">
            <a href={`tel:${phoneNumber}`} className="nav-phone-raw">
              <Phone size={13} color="var(--red-bright)" />
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
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-panel">
            <a href="#" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--red-bright)', fontWeight: 600 }}>Home</a>
            <a href="#specialties" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontWeight: 500 }}>Specialties</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontWeight: 500 }}>Services</a>
            <a href="#workshop" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontWeight: 500 }}>The Workshop</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontWeight: 500 }}>Location &amp; Contact</a>
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-dropdown-phone"
            >
              <Phone size={16} color="var(--red-bright)" />
              <span>Call: {displayPhone}</span>
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-ref-wrapper" id="home">
        <div className="hero-ref-center">
          <h1 className="hero-ref-title">
            <span className="hero-accent-word">DECODE</span>{' '}
            <span className="hero-ref-title-sub">AUTO DIAGNOSING HUB</span>
          </h1>

          <p className="hero-ref-desc">
            Exclusively for German &amp; European Premium Vehicles — Mampad, Edakkara-Kalasagar
          </p>

          <div className="hero-ref-subchips">
            <span className="highlight">Auto Electrical</span>
            <span className="dot-sep">•</span>
            <span>Auto Scanning &amp; Coding</span>
            <span className="dot-sep">•</span>
            <span>Car AC Service</span>
            <span className="dot-sep">•</span>
            <span className="highlight">🏁 German &amp; European Specialists</span>
          </div>

          <div className="hero-ref-btn-group">
            <a href="#services" className="btn-hero-solid">
              <span>OUR SERVICES</span>
            </a>
            <a href="#location" className="btn-hero-outline">
              <span>CONTACT US</span>
            </a>
          </div>
        </div>
      </section>

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
                        Mampad, Edakkara - Kalasagar,<br />
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
                        <a href={`tel:${phoneNumber}`} style={{ color: '#fff' }}>
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
                <li><a href="#services" className="footer-link">Vehicle Programming &amp; Coding</a></li>
                <li><a href="#services" className="footer-link">Auto Scanning &amp; Diagnostics</a></li>
                <li><a href="#services" className="footer-link">Auto Electrical Systems</a></li>
                <li><a href="#services" className="footer-link">Car AC &amp; Climate Service</a></li>
                <li><a href="#services" className="footer-link">Genuine Used Spares</a></li>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <div>
                  <strong style={{ color: '#fff' }}>Address:</strong><br />
                  Edakkara - Kalasagar, Mampad,<br />
                  Kerala, India
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Phone / Booking:</strong><br />
                  <a href={`tel:${phoneNumber}`} style={{ color: 'var(--red-bright)' }}>
                    +91 95673 86024
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Instagram:</strong><br />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
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
