import { clerkMiddleware, requireAuth } from '@clerk/express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../../.env.shared') });
dotenv.config();

// Export the middleware stack for Clerk
// Note: Requires CLERK_SECRET_KEY or CLERK_PUBLISHABLE_KEY to be set in environment
export const verifyClerk = [
  clerkMiddleware(),
  requireAuth()
];
