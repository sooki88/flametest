import { ReactNode } from "react";
import DownloadIcom from "../assets/download_wht.svg";

interface ExportHeaderType {
  children: ReactNode;
  onClick: () => void;
}

export default function ExportHeader({ children, onClick }: ExportHeaderType) {
  return (
    <div className="flex items-center gap-4">
      {children}
      <img src={DownloadIcom} alt="다운로드" onClick={onClick} className="h-6 w-6" />
    </div>
  );
}
