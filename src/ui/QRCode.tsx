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
  const imgRef = useRef<HTMLImageElement>(null);
  const [download, setDownload] = useState<string | undefined>(undefined);

  async function generateQRCode(value: string | null, eclvl: "L" | "M" | "H") {
    if (canvasRef.current) {
      await QRCode.toCanvas(
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

      setImgUrl(canvasRef.current.toDataURL("img/png"));
    }
  }

  useEffect(() => {
    generateQRCode(value, eclvl);
  }, [value, eclvl]);

  useEffect(() => {
    if (imgurl && imgRef.current) {
      // Create a promise that resolves when the image loads
      const imageLoadPromise = new Promise<void>((resolve) => {
        if (imgRef.current?.complete) {
          // Check if image is already loaded (e.g., from cache)
          resolve();
        } else {
          imgRef.current!.onload = () => resolve();
          imgRef.current!.onerror = () => {
            console.error("Image failed to load.");
            resolve(); // Still resolve to avoid infinite waiting, but handle the error
          };
        }
      });

      imageLoadPromise.then(async () => {
        if (divRef.current) {
          const canvas = await html2canvas(divRef.current);
          setDownload(canvas.toDataURL("img/png"));
        }
      });
    }
  }, [imgurl, eclvl, icon, color]);

  return (
    <>
      <a href={download} download={`${icon ? icon : "~"}.png`}>
        <div ref={divRef} className="qr-code">
          <img ref={imgRef} src={imgurl} alt="" />
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
