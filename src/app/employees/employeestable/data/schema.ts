import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const employeesSchema = z.object({
	id: z.number(),
	employee_name: z.string(),
	address: z.string(),
	payment_method: z.string(),
	employee_salary: z.number(),
	date: z.string(),
})

export type EmployeesType = z.infer<typeof employeesSchema>;
