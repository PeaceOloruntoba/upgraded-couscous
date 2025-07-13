export interface User {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
}

export type PaymentStatus = 'active' | 'inactive';