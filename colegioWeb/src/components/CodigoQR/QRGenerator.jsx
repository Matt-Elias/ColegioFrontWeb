import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = forwardRef(({ estudianteData, size = 128 }, ref) => {
  const canvasRef = useRef();

  useImperativeHandle(ref, () => ({
    getQRAsImage: () => {
      return new Promise((resolve) => {
        if (!canvasRef.current) return resolve(null);

        const canvas = canvasRef.current.querySelector('canvas');
        if (!canvas) return resolve(null);

        const imageData = canvas.toDataURL('image/png');
        resolve(imageData);
      });
    }
  }));

  const qrData = JSON.stringify(estudianteData);

  return (
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} ref={canvasRef}>
      <QRCodeCanvas
        value={qrData}
        size={size}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
    </div>
  );
});

export default QRGenerator;
