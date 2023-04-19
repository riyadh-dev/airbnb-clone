export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export const tw = String.raw;

export function exclude<TObject, Key extends keyof TObject>(
	object: TObject,
	keys: Key[]
): Omit<TObject, Key> {
	for (let key of keys) delete object[key];
	return object;
}
