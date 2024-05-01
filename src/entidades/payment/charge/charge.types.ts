import { AdditionalInfo, Customer, PagarmeOrder } from "../payment.types";

export type ChargeData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  customer: Customer;
  value: number;
  comment: string;
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: string;
  qrCodeImage: string;
  expiresIn: number;
  expiresDate: string;
  brCode: string;
  additionalInfo: AdditionalInfo[];
  gatewayDetails?: any;
  pagarmeOrder?: PagarmeOrder;
};
