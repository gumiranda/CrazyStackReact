import QRCodeReact from "qrcode.react";

export const QRCode = (value) => {
  return (
    <QRCodeReact
      id="qr-gen-value"
      value={value.code}
      size={180}
      level={"H"}
      includeMargin
    />
  );
};
