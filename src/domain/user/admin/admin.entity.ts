import { z } from 'zod';
import { userResponseSchema } from '../User.js';

const adminSchema = z.object({
    ...userResponseSchema.shape,
});
