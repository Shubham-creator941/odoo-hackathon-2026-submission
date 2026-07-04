import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const passwordHash = await bcrypt.hash('password123', 10);
  
  // 1. Create Users (Employees)
  const user1 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      employeeCode: 'EMP-2026-0042',
      email: 'jane.smith@example.com',
      passwordHash,
      role: 'employee',
      isVerified: true,
      status: 'active',
      fullName: 'Jane Smith',
      phoneNumber: '555-0100',
      department: 'Engineering',
      designation: 'Senior Developer',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      employeeCode: 'EMP-ADMIN-01',
      email: 'admin@example.com',
      passwordHash,
      role: 'admin',
      isVerified: true,
      status: 'active',
      fullName: 'Admin User',
      department: 'HR',
    },
  });

  // 2. Create Attendance
  await prisma.attendance.createMany({
    data: [
      { userId: user1.id, date: new Date('2026-07-03T00:00:00Z'), checkIn: '08:58 AM', checkOut: '05:30 PM', workingHours: '8h 32m', status: 'Present' },
      { userId: user1.id, date: new Date('2026-07-02T00:00:00Z'), checkIn: '09:15 AM', checkOut: '05:45 PM', workingHours: '8h 30m', status: 'Late' },
      { userId: user1.id, date: new Date('2026-07-01T00:00:00Z'), checkIn: '08:55 AM', checkOut: '05:15 PM', workingHours: '8h 20m', status: 'Present' },
    ]
  });

  // 3. Create Leaves
  await prisma.leave.createMany({
    data: [
      { userId: user1.id, leaveType: 'Annual Leave', startDate: new Date('2026-07-20T00:00:00Z'), endDate: new Date('2026-07-25T00:00:00Z'), duration: '6 days', status: 'Pending', reason: 'Annual summer vacation', managerId: 'Sarah Chen' },
      { userId: user1.id, leaveType: 'Sick Leave', startDate: new Date('2026-05-12T00:00:00Z'), endDate: new Date('2026-05-13T00:00:00Z'), duration: '2 days', status: 'Approved', reason: 'Food poisoning', managerId: 'Sarah Chen', resolvedDate: new Date('2026-05-11T00:00:00Z') },
    ]
  });

  // 4. Create Payroll
  await prisma.payroll.createMany({
    data: [
      { userId: user1.id, basicSalary: 8500, allowances: 450, deductions: 120, netPay: 8830, status: 'Paid', payDate: new Date('2026-06-30T00:00:00Z'), period: 'June 2026' },
      { userId: user1.id, basicSalary: 8500, allowances: 450, deductions: 120, netPay: 8830, status: 'Scheduled', payDate: new Date('2026-07-30T00:00:00Z'), period: 'July 2026' },
    ]
  });

  // 5. Create Documents
  await prisma.document.createMany({
    data: [
      { userId: user1.id, documentName: 'W-4 Form Tax Info', category: 'Tax Document', status: 'Verified', expiryDate: new Date('2027-06-16T00:00:00Z') },
      { userId: user1.id, documentName: 'Employment Agreement', category: 'Contract', status: 'Verified', expiryDate: new Date('2029-06-20T00:00:00Z') },
    ]
  });

  // 6. Create Notifications
  await prisma.notification.createMany({
    data: [
      { userId: user1.id, title: 'Payroll Finalization Complete', message: 'The monthly payroll expenses for June 2026 have been finalized.', category: 'Payroll', priority: 'High', read: false },
      { userId: user1.id, title: 'Holiday Announcement', message: 'The office will be closed on Friday, July 4th.', category: 'Announcements', priority: 'High', read: true },
    ]
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
