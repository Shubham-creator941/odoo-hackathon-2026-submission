import { mockEmployees } from '../mock/employees'
import type { Employee } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const localEmployees = [...mockEmployees]

export async function getEmployees(): Promise<Employee[]> {
  await delay(600)
  return localEmployees
}

export async function getEmployee(id: string): Promise<Employee | undefined> {
  await delay(400)
  return localEmployees.find((emp) => emp.id === id)
}

export async function createEmployee(data: Omit<Employee, 'id' | 'status'>): Promise<Employee> {
  await delay(600)
  const newEmp: Employee = {
    ...data,
    id: data.employeeId,
    status: 'Active',
    avatar: data.fullName.slice(0, 2).toUpperCase(),
  }
  localEmployees.push(newEmp)
  return newEmp
}

export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  await delay(600)
  const idx = localEmployees.findIndex((emp) => emp.id === id)
  if (idx === -1) throw new Error('Employee not found')
  localEmployees[idx] = { ...localEmployees[idx], ...data }
  return localEmployees[idx]
}
