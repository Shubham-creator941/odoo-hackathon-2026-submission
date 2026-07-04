import { z } from 'zod'

export const leaveSchema = z
  .object({
    leaveType: z.string().min(1, 'Leave Type is required'),
    startDate: z.string().min(1, 'Start Date is required'),
    endDate: z.string().min(1, 'End Date is required'),
    reason: z.string().min(5, 'Reason must be at least 5 characters long'),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  })

export type LeaveInput = z.infer<typeof leaveSchema>
