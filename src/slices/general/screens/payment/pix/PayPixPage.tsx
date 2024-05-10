"use client";

import { FlexScreen } from "@/shared/ui";
import { SubscriptionPaid } from "./components/SubscriptionPaid";
import { useGetUserById } from "@/slices/general/entidades/user/user.lib";
import { useGetSubscriptionById } from "@/slices/general/entidades/payment/subscription/subscription.lib";
import { PaymentWithPix } from "@/slices/general/features/payment/with-pix/PaymentWithPix";

export const PayPixPage = ({ user }) => {
  const { data: userData }: any = useGetUserById(user?._id);
  const { data }: any = useGetSubscriptionById(user?._id);
  const charge =
    data?.chargesByCustomer?.charges?.sort?.(
      (a, b) => new Date(a.expiresDate).getTime() - new Date(b.expiresDate).getTime()
    )?.[0] ?? [];
  return (
    <FlexScreen>
      <PaymentWithPix charge={charge} user={userData} />
      <SubscriptionPaid charge={charge} user={userData} />
    </FlexScreen>
  );
};
