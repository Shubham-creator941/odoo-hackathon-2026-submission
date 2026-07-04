import express from 'express';
import { prisma } from '../db.js';

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  const employees = await prisma.user.findMany({
    select: {
      id: true,
      employeeCode: true,
      fullName: true,
      email: true,
      department: true,
      designation: true,
      status: true,
      role: true,
    }
  });
  res.json(employees);
});

// Get user profile by email
router.get('/employees/:email', async (req, res) => {
  const employee = await prisma.user.findUnique({
    where: { email: req.params.email },
    include: {
      attendances: true,
      leaves: true,
      payrolls: true,
      documents: true,
      notifications: true,
    }
  });
  if (!employee) return res.status(404).json({ error: 'Employee not found' });
  res.json(employee);
});

// Get attendance
router.get('/attendance/:userId', async (req, res) => {
  const attendance = await prisma.attendance.findMany({
    where: { userId: req.params.userId },
    orderBy: { date: 'desc' }
  });
  res.json(attendance);
});

// Get leaves
router.get('/leaves/:userId', async (req, res) => {
  const leaves = await prisma.leave.findMany({
    where: { userId: req.params.userId },
    orderBy: { appliedDate: 'desc' }
  });
  res.json(leaves);
});

// Get payroll
router.get('/payroll/:userId', async (req, res) => {
  const payroll = await prisma.payroll.findMany({
    where: { userId: req.params.userId },
    orderBy: { payDate: 'desc' }
  });
  res.json(payroll);
});

// Get documents
router.get('/documents/:userId', async (req, res) => {
  const documents = await prisma.document.findMany({
    where: { userId: req.params.userId },
    orderBy: { uploadDate: 'desc' }
  });
  res.json(documents);
});

// Get notifications
router.get('/notifications/:userId', async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.params.userId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(notifications);
});

export default router;
