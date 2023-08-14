import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().nonempty('Email harus diisi').email('Email tidak valid'),
	password: z.string().nonempty('Password harus diisi').min(8, 'Password minimal 8 karakter')
});

export const registerSchema = z.object({
	email: z.string({ required_error: 'Email harus diisi' }).email('Email tidak valid'),
	password: z.string({ required_error: 'Password harus diisi' }),
	registerCode: z.string({ required_error: 'Kode registrasi harus diisi' })
});
