import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, UseFormProps, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useZodForm<TValues extends FieldValues>(
	schema: z.Schema<TValues>,
	props?: Omit<UseFormProps<TValues>, 'resolver'>
) {
	return useForm<TValues>({ ...props, resolver: zodResolver(schema) });
}
