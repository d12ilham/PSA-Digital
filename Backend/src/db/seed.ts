/**
 * PSA WIR Database Seed Script
 * Creates initial admin user + the 4 active 2026 report records.
 * Run with: npm run db:seed
 */
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import * as schema from './schema';

dotenv.config();

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log('🌱 Starting seed...');

  // ── 1. Admin user ──────────────────────────────────────────────────────────
  const existingAdmins = await db.select({ id: schema.users.id }).from(schema.users).limit(1);

  let adminId: string;

  if (existingAdmins.length === 0) {
    const passwordHash = await bcrypt.hash('Admin@2026!', 12);
    const [admin] = await db.insert(schema.users).values({
      email: 'admin@psa.gov.au',
      passwordHash,
      firstName: 'PSA',
      lastName: 'Admin',
      role: 'admin',
    }).returning({ id: schema.users.id });

    adminId = admin.id;
    console.log('✅ Admin user created: admin@psa.gov.au / Admin@2026!');
  } else {
    adminId = existingAdmins[0].id;
    console.log('⏭️  Admin user already exists, skipping');
  }

  // ── 2. Report Year ─────────────────────────────────────────────────────────
  const existingYears = await db.select({ id: schema.reportYears.id }).from(schema.reportYears).limit(1);

  let yearId: string;

  if (existingYears.length === 0) {
    const [year] = await db.insert(schema.reportYears).values({
      year: 2026,
      label: '2026',
      isActive: true,
    }).returning({ id: schema.reportYears.id });

    yearId = year.id;
    console.log('✅ Report year 2026 created');
  } else {
    yearId = existingYears[0].id;
    console.log('⏭️  Report year already exists, skipping');
  }

  // ── 3. Industries ──────────────────────────────────────────────────────────
  const industryData = [
    { name: 'Local Government', slug: 'local-government', sortOrder: 1 },
    { name: 'Correctional Services', slug: 'correctional-services', sortOrder: 2 },
    { name: 'Public Safety', slug: 'public-safety', sortOrder: 3 },
    { name: 'Federal and State/Territory Government', slug: 'federal-state-territory-government', sortOrder: 4 },
  ];

  const industryIds: Record<string, string> = {};

  for (const ind of industryData) {
    const existing = await db.select({ id: schema.industries.id })
      .from(schema.industries)
      .where(eq(schema.industries.slug, ind.slug))
      .limit(1);

    if (existing.length > 0) {
      industryIds[ind.slug] = existing[0].id;
      console.log(`⏭️  Industry '${ind.name}' already exists`);
      continue;
    }

    const [row] = await db.insert(schema.industries).values(ind).returning({ id: schema.industries.id });
    industryIds[ind.slug] = row.id;
    console.log(`✅ Industry created: ${ind.name}`);
  }

  // ── 4. Reports ─────────────────────────────────────────────────────────────
  const reportData = [
    {
      industrySlug: 'local-government',
      title: 'Local Government Workforce Insights Report 2026',
      slug: 'local-government-wir-2026',
      shortDescription: 'Workforce insights, strategies and data for the local government sector across Australia.',
      cardNote: null as string | null,
      sortOrder: 1,
    },
    {
      industrySlug: 'correctional-services',
      title: 'Correctional Services Workforce Insights Report 2026',
      slug: 'correctional-services-wir-2026',
      shortDescription: 'Workforce insights, strategies and data for the correctional services sector.',
      cardNote: null as string | null,
      sortOrder: 2,
    },
    {
      industrySlug: 'public-safety',
      title: 'Public Safety Workforce Insights Report 2026',
      slug: 'public-safety-wir-2026',
      shortDescription: 'Workforce insights for the public safety sector including defence, fire and emergency services, and police.',
      cardNote: 'Includes Defence, Fire and Emergency Services, and Police' as string | null,
      sortOrder: 3,
    },
    {
      industrySlug: 'federal-state-territory-government',
      title: 'Federal and State/Territory Government Workforce Insights Report 2026',
      slug: 'federal-state-territory-wir-2026',
      shortDescription: 'Workforce insights, strategies and data for federal and state/territory government.',
      cardNote: null as string | null,
      sortOrder: 4,
    },
  ];

  for (const report of reportData) {
    const industryId = industryIds[report.industrySlug];
    if (!industryId) {
      console.warn(`⚠️  Industry not found for ${report.industrySlug}, skipping report`);
      continue;
    }

    const existing = await db.select({ id: schema.reports.id })
      .from(schema.reports)
      .where(eq(schema.reports.slug, report.slug))
      .limit(1);

    if (existing.length > 0) {
      console.log(`⏭️  Report '${report.title}' already exists`);
      continue;
    }

    await db.insert(schema.reports).values({
      industryId,
      yearId,
      title: report.title,
      slug: report.slug,
      shortDescription: report.shortDescription,
      cardNote: report.cardNote,
      sortOrder: report.sortOrder,
      status: 'published',
      createdBy: adminId,
    });

    console.log(`✅ Report created: ${report.title}`);
  }

  console.log('\n🎉 Seed completed!');
  console.log('   Admin login: admin@psa.gov.au / Admin@2026!');
  await pool.end();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
