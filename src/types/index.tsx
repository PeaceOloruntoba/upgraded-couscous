// src/types/index.ts
export interface User {
  uid: string;
  email: string | null;
}

export type PaymentStatus = 'active' | 'inactive';
