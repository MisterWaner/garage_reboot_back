import { z } from 'zod';

export enum Role {
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}

const userCore = {
    lastname: z.string({ error: 'Le nom est requis' }).trim(),
    firstname: z.string({ error: 'Le prénom est requis' }).trim(),
    email: z
        .email({ message: "L'email doit être valide" })
        .toLowerCase()
        .trim()
        .optional(),
    role: z.enum([Role.EMPLOYEE, Role.ADMIN], { error: 'Le rôle est requis' }),
};

const passwordSchema = z
    .string({ error: 'Le mot de passe est requis' })
    .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères',
    })
    .max(50, {
        message: 'Le mot de passe ne peut pas dépasser 50 caractères',
    })
    .trim();

const CreateUserDTOSchema = z.object({
    ...userCore,
});

const userResponseSchema = z.object({
    ...userCore,
    id: z.number(),
    password: z.string().optional(),
});

const loginUserSchema = z.object({
    email: userCore.email,
    password: passwordSchema,
});

const updatePasswordSchema = z
    .object({
        email: userCore.email,
        currentPassword: passwordSchema,
        newPassword: passwordSchema,
        confirmNewPassword: passwordSchema,
    })
    .superRefine((data, ctx) => {
        if (data.newPassword === data.currentPassword) {
            ctx.addIssue({
                path: ['newPassword'],
                code: 'custom',
                message:
                    "Le nouveau mot de passe ne peut pas être identique à l'ancien mot de passe",
            });
        }

        if (data.newPassword !== data.confirmNewPassword) {
            ctx.addIssue({
                path: ['confirmNewPassword'],
                code: 'custom',
                message: 'Les mots de passe ne correspondent pas',
            });
        }
    });

export type CreateUserInput = z.infer<typeof CreateUserDTOSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
