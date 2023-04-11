import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useZodForm<TValues extends FieldValues>(
	schema: z.Schema<TValues>
) {
	return useForm<TValues>({ resolver: zodResolver(schema) });
}
