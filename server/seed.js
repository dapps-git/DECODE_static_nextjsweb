import User from './models/User.js';
import Customer from './models/Customer.js';
import Car from './models/Car.js';
import Service from './models/Service.js';

export async function seedDatabase() {
  try {
    // 1. Ensure primary DECODE administrator exists with bcrypt hashed password
    const adminEmail = (process.env.ADMIN_EMAIL || 'decode@service.com').toLowerCase().trim();
    const adminPasswordHash =
      process.env.ADMIN_PASSWORD_HASH ||
      '$2a$10$8WiTJzERHhhckQSyFkZGPOUWPt/APgXk9yGH3vC1N.UzQHC84m5eu';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      console.log(`🌱 Creating primary DECODE admin user: ${adminEmail}...`);
      admin = new User({
        name: 'DECODE Administrator',
        email: adminEmail,
        password: adminPasswordHash,
        role: 'Admin',
      });
      await admin.save();
      console.log(`✅ DECODE Admin (${adminEmail}) successfully initialized with bcrypt hash.`);
    } else {
      if (admin.password !== adminPasswordHash) {
        admin.password = adminPasswordHash;
        await admin.save();
        console.log(`✅ DECODE Admin (${adminEmail}) bcrypt hash synchronized from .env.`);
      }
    }

    const carCount = await Car.countDocuments();
    if (carCount === 0) {
      console.log('🌱 Seeding workshop records...');

      // 2. Customers
      const cust1 = await Customer.create({
        name: 'John Mathew',
        phone: '+91 9876543210',
        address: 'Villa 14, Royal Palm Avenue, Kochi, Kerala',
      });

      const cust2 = await Customer.create({
        name: 'Sarah Jenkins',
        phone: '+91 9845012345',
        address: '402 Skyline Horizon, Marine Drive, Kochi',
      });

      const cust3 = await Customer.create({
        name: 'Vikramaditya Roy',
        phone: '+91 9711223344',
        address: 'B-12 Greenwood Estates, Bangalore',
      });

      const cust4 = await Customer.create({
        name: 'Priya Nambiar',
        phone: '+91 9988776655',
        address: '88 Lakeview Boulevard, Trivandrum',
      });

      // 3. Cars
      const car1 = await Car.create({
        customerId: cust1._id,
        carName: 'BMW 5 Series',
        model: '520d Luxury Line',
        registrationNumber: 'KL 10 AB 1234',
        chassisNumber: 'WBA5A5C58GH129845',
        currentKm: 45200,
        phone: '+91 9876543210',
      });

      const car2 = await Car.create({
        customerId: cust2._id,
        carName: 'Mercedes-Benz E-Class',
        model: 'E 220d Exclusive',
        registrationNumber: 'KL 07 CA 9988',
        chassisNumber: 'WDD2130042A887766',
        currentKm: 28400,
        phone: '+91 9845012345',
      });

      const car3 = await Car.create({
        customerId: cust3._id,
        carName: 'Audi A6',
        model: '45 TFSI Technology',
        registrationNumber: 'KA 01 MJ 5500',
        chassisNumber: 'WAUZZZF27LN004321',
        currentKm: 34100,
        phone: '+91 9711223344',
      });

      const car4 = await Car.create({
        customerId: cust4._id,
        carName: 'Porsche Macan',
        model: '2.0 Turbo GTS Look',
        registrationNumber: 'KL 01 BZ 7777',
        chassisNumber: 'WP1AA2954KLB09812',
        currentKm: 19800,
        phone: '+91 9988776655',
      });

      const car5 = await Car.create({
        customerId: cust1._id,
        carName: 'Toyota Land Cruiser',
        model: 'LC300 ZX Diesel',
        registrationNumber: 'KL 10 ZZ 0001',
        chassisNumber: 'JTMHX01J8N4001928',
        currentKm: 14200,
        phone: '+91 9876543210',
      });

      // 4. Services for BMW 5 Series (Matching prompt's exact history)
      await Service.create({
        serviceCode: 'SRV-0001',
        carId: car1._id,
        customerId: cust1._id,
        serviceDate: new Date('2025-10-10'),
        serviceType: 'Major Service',
        currentKm: 31200,
        status: 'Delivered',
        workDescription: 'Engine service, Brake replacement, Transmission oil flush, Suspension inspection, Multi-point diagnosis',
        parts: 'High Performance Synthetic Oil (7L), Front & Rear Ceramic Brake Pads, Transmission Filter, Spark Plugs, Air Filter, Cabin Carbon Filter',
        labourCost: 8000,
        partsCost: 34000,
        totalCost: 42000,
        notes: 'Vehicle inspected. Suspension bushings lubricated. All diagnostics cleared.',
      });

      await Service.create({
        serviceCode: 'SRV-0002',
        carId: car1._id,
        customerId: cust1._id,
        serviceDate: new Date('2026-04-15'),
        serviceType: 'Oil Service',
        currentKm: 39800,
        status: 'Completed',
        workDescription: 'Engine oil replacement, oil filter change, fluid top-up, 24-point checkup',
        parts: 'BMW Longlife-04 Synthetic Oil (6.5L), OEM Oil Filter Cartridge, Washer Fluid',
        labourCost: 1500,
        partsCost: 6000,
        totalCost: 7500,
        notes: 'Oil service interval reset. Tire pressure adjusted to 36 PSI.',
      });

      await Service.create({
        serviceCode: 'SRV-0003',
        carId: car1._id,
        customerId: cust1._id,
        serviceDate: new Date('2026-10-08'),
        serviceType: 'General Service',
        currentKm: 45200,
        status: 'Completed',
        workDescription: 'General vehicle health check, AC condenser cleaning, brake disc resurfacing, wheel alignment and wheel balancing',
        parts: 'AC Disinfectant Foam, Coolant Topup, Brake Cleaner, Wheel Weights',
        labourCost: 4500,
        partsCost: 14000,
        totalCost: 18500,
        notes: 'Vehicle washed, polished and ready for customer handover.',
      });

      // Services for Mercedes-Benz (Currently In Service!)
      await Service.create({
        serviceCode: 'SRV-0004',
        carId: car2._id,
        customerId: cust2._id,
        serviceDate: new Date('2026-10-08'),
        serviceType: 'AC Service',
        currentKm: 28400,
        status: 'In Service',
        expectedDeliveryDate: new Date('2026-10-09'),
        workDescription: 'AC cooling issue investigation, refrigerant leak detection and refilling, blower motor cleaning',
        parts: 'R134a AC Gas (600g), Compressor O-rings, Cabin Activated Charcoal Filter',
        labourCost: 3200,
        partsCost: 8800,
        totalCost: 12000,
        notes: 'Undergoing leak pressure testing in Bay 3. Tech: Alex Vance.',
      });

      // Services for Audi A6 (Pending Service)
      await Service.create({
        serviceCode: 'SRV-0005',
        carId: car3._id,
        customerId: cust3._id,
        serviceDate: new Date('2026-10-08'),
        serviceType: 'Brake Service',
        currentKm: 34100,
        status: 'Pending',
        expectedDeliveryDate: new Date('2026-10-10'),
        workDescription: 'Brake shudder at high speeds. Rotor inspection, front brake pad replacement, sensor calibration.',
        parts: 'Brembo Front Rotors (Pair), Brembo Low-Metallic Brake Pads, Wear Sensor Wire',
        labourCost: 4000,
        partsCost: 22000,
        totalCost: 26000,
        notes: 'Customer requested inspection of rear shock absorbers as well.',
      });

      // Services for Porsche Macan (Completed)
      await Service.create({
        serviceCode: 'SRV-0006',
        carId: car4._id,
        customerId: cust4._id,
        serviceDate: new Date('2026-10-06'),
        serviceType: 'Engine Service',
        currentKm: 19800,
        status: 'Completed',
        workDescription: 'Throttle body cleaning, ignition coil testing, spark plug replacement, intake valve carbon clean',
        parts: 'Bosch Iridium Spark Plugs (x4), Intake Gasket Set, Liqui Moly Valve Cleaner',
        labourCost: 6500,
        partsCost: 16500,
        totalCost: 23000,
        notes: 'Road tested. Crisp throttle response restored.',
      });

      console.log('✅ Demo database seeded successfully!');
      console.log('🔑 Admin login: admin@carservice.com / admin123');
    }
  } catch (error) {
    console.error('Error during database seed:', error);
  }
}
