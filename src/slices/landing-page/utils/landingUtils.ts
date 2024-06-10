export const handleWhatsappClick = (message: string) => {
  const link = document.createElement("a");
  link.href = getWhatsappLink(message);
  link.target = "_blank";
  link.click();
};

export const getWhatsappLink = (message: string) => {
  return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
