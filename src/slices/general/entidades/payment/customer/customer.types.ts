import { Customer, PagarmeCustomer } from "../payment.types";

export type CustomerData = {
  _id?: string;
  createdById: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  cpf?: string;
  correlationID?: string;
  gatewayDetails?: any;
  pagarmeCustomer?: PagarmeCustomer;
} & Customer;
