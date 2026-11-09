import User from './models/User.js';

export async function seedDatabase() {
  try {
    // Ensure primary DECODE administrator exists with bcrypt hashed password
    const adminEmail = (process.env.ADMIN_EMAIL || 'decode@service.com').toLowerCase().trim();
    const adminPasswordHash =
      process.env.ADMIN_PASSWORD_HASH ||
      '$2a$10$pVp5Ix1p.Cva1n3/qD7WC.ztf5ewgdicq/wIHQ0W0GdNuLprHIMBq';

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
      const match = await admin.comparePassword('decode@#carservice');
      if (!match || admin.password !== adminPasswordHash) {
        admin.password = adminPasswordHash;
        await admin.save();
        console.log(`✅ DECODE Admin (${adminEmail}) bcrypt hash updated to valid hash for decode@#carservice.`);
      }
    }
  } catch (error) {
    console.error('Error during database seed:', error);
  }
}
