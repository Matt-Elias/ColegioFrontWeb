import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = forwardRef(({ estudianteData, size = 128 }, ref) => {
  const qrRef = useRef();

  // Función para convertir el QR a imagen PNG
  const getQRAsImage = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return null;
    return canvas.toDataURL('image/png');
  };

  // Exponemos la función al padre
  useImperativeHandle(ref, () => ({
    getQRAsImage
  }));

  const qrData = JSON.stringify(estudianteData);

  return (
    <div style={{ display: 'none' }}>
      <div ref={qrRef}>
        <QRCodeCanvas
          value={qrData}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
      </div>
    </div>
  );
});

export default QRGenerator;
