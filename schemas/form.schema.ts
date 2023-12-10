import {z} from 'zod'

export const formSchema = z.object({
	name: z.string().min(4, { message: "Name is required" }),
	description: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
