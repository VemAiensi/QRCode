import { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

type QRParam = {
  eclvl: "L" | "M" | "H";
  value: string | null;
  icon: string | null;
  color: string;
};

function QRCodeComponent({ value, icon, color, eclvl }: QRParam) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgurl, setImgUrl] = useState<string | undefined>(undefined);
  const divRef = useRef<HTMLDivElement>(null);
  const [download, setDownload] = useState<string | undefined>(undefined);

  async function generateDownloadLink() {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      setDownload(canvas.toDataURL("img/png"));
    }
  }

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      value ? value : "This app is developed by Vem Aiensi", //Value
      {
        width: 500,
        margin: 2, // Add margin around the QR Code
        color: {
          dark: "#000000", // Foreground color
          light: "#ffffff", // Background color
        },
        errorCorrectionLevel: eclvl, // Error correction level
      }
    );
    if (canvasRef.current) setImgUrl(canvasRef.current.toDataURL("img/png"));
    generateDownloadLink();
  }, [value, eclvl]);

  return (
    <>
      <a href={download} download={`${icon ? icon : "~"}.png`}>
        <div ref={divRef} className="qr-code">
          <img src={imgurl} alt="" />
          <div className="logo" style={{ backgroundColor: color }}>
            {icon ? icon : "~"}
          </div>
        </div>
      </a>
      <div className="hidden">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default QRCodeComponent;
