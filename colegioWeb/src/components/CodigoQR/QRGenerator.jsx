import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRGenerator = () => {
  const value = "https://ejemplo.com";

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "codigo_qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <QRCodeCanvas
        id="qr-gen"
        value={value}
        size={256}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
      <br />
      <button onClick={downloadQR}>Descargar QR</button>
    </div>
  );
};

export default QRGenerator;
