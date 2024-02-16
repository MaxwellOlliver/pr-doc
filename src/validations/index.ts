import z from 'zod';

export const summarySchema = z.object({
	summaryDescription: z.string().min(10).max(1000)
});

export const issueSchema = z.object({
	issue: z.object({
		id: z.string()
	})
});

export const changesSchema = z.object({
	changes: z.array(
		z.object({
			relativePath: z.string(),
			description: z.string().min(10).max(1000)
		})
	)
});
