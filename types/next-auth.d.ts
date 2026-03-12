import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image?: string;
  stripe_customer_id: null;
  times: string[];
  address?: string;
  phone?: string;
  status: boolean;
  timezone: null;
  createdAt: string;
  updatedAt: Date;
}
