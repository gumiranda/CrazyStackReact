import { Customer, PagarmeSubscription } from "../payment.types";

export type SubscriptionData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  customer: Customer;
  value: string;
  comment: string;
  additionalInfo: any[];
  dayGenerateCharge: string;
  globalID: string;
  gatewayDetails?: any;
  priceId?: string;
  pagarmeSubscription?: PagarmeSubscription;
};
