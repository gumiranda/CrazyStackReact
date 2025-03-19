import { loadInvoice } from "@/slices/appointments/entidades/appointment/appointment.api";
import { useAuth } from "@/shared/libs";
import { calculateDateRange } from "@/shared/libs/utils/dateFunctions";
import { useEffect, useState } from "react";

export const useLoadInvoice = () => {
  const { user = null } = useAuth() || {};
  const [resultInvoice, setResultInvoice] = useState<any>(null);
  const [selectedRangeInvoice, setSelectedRangeInvoice] = useState<any>("month");

  useEffect(() => {
    async function getInvoiceTotal() {
      const { initDate, endDate } = calculateDateRange(selectedRangeInvoice);
      const result = await loadInvoice(
        { initDate, endDate, createdById: user?._id },
        null
      );
      setResultInvoice(result?.appointments);
    }
    if (user?._id && user?.ownerId) {
      getInvoiceTotal();
    }
  }, [selectedRangeInvoice, user?._id]);
  const totalSum = resultInvoice?.reduce?.(
    (accumulator, currentElement) =>
      accumulator + Number(currentElement?.total ?? currentElement?.total_price),
    0
  );
  const totalIncome =
    totalSum?.toLocaleString?.("pt-BR", {
      style: "currency",
      currency: "BRL",
    }) ?? "R$ 0,00";
  return {
    resultInvoice,
    selectedRangeInvoice,
    setSelectedRangeInvoice,
    totalIncome,
  };
};
