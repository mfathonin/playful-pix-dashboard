import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().nonempty('Email harus diisi').email('Email tidak valid'),
	password: z.string().nonempty('Password harus diisi').min(8, 'Password minimal 8 karakter')
});

export const registerSchema = z.object({
	email: z.string().email('Email tidak valid').nonempty('Email harus diisi'),
	password: z.string().nonempty('Password harus diisi').min(8, 'Password minimal 8 karakter'),
	registerCode: z.string().nonempty('Kode registrasi harus diisi')
});
