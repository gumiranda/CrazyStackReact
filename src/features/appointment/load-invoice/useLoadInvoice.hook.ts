import { loadInvoice } from "@/entidades/appointment/appointment.api";
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
      setResultInvoice(result?.appointments?.[0]);
    }
    if (user?._id) {
      getInvoiceTotal();
    }
  }, [selectedRangeInvoice, user?._id]);
  const totalIncome =
    resultInvoice?.total?.toLocaleString?.("pt-BR", {
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
