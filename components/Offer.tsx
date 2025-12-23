import React from 'react';
import { FileText, Phone, MapPin, Calculator, Shield, CheckCircle, Truck, Download, HeartPulse, HardHat, Shirt, Home, FileCheck } from 'lucide-react';
import { CalculationData } from '../App';

interface Props {
  data: CalculationData;
}

const Offer: React.FC<Props> = ({ data }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('offer-content');
    if (!element) return;

    // Zabezpieczenie przed przesunięciem: wymuszamy tymczasowo styl "drukarski"
    const originalStyle = element.style.cssText;
    element.style.width = '794px'; // Standardowa szerokość A4 w pikselach (96 DPI)
    element.style.margin = '0';
    element.style.padding = '0';

    const opt = {
      margin: 5, // Mały margines bezpieczeństwa w mm
      filename: `Oferta_HR_KONO_${data.clientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'png', quality: 1.0 },
      html2canvas: { 
        scale: 2.5, 
        useCORS: true,
        logging: false,
        letterRendering: true,
        width: 794,
        windowWidth: 794,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (typeof html2pdf !== 'undefined') {
      // @ts-ignore
      html2pdf().set(opt).from(element).save().then(() => {
        // Przywracamy oryginalne style po wygenerowaniu
        element.style.cssText = originalStyle;
      });
    } else {
      window.print();
    }
  };

  const formatRBH = (value: number) => (value / data.hours).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f9f7f2] font-sans text-slate-800 p-4 md:p-8 print:p-0 print:bg-white">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        #offer-content {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
      `}</style>
      
      <button 
        onClick={handleDownloadPDF}
        className="fixed bottom-8 right-8 bg-[#c0a068] text-white p-4 rounded-full shadow-2xl hover:bg-[#ac8e5a] transition-all transform hover:scale-110 flex items-center gap-2 z-50 group print:hidden"
      >
        <Download size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap px-0 group-hover:px-2">
          Pobierz Ofertę PDF
        </span>
      </button>

      {/* Kontener ofertowy z wymuszoną szerokością dla spójności PDF */}
      <div 
        id="offer-content" 
        className="w-full max-w-[794px] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-[#c0a068]/10 print:border-none print:shadow-none bg-white"
      >
        
        <header className="bg-[#c0a068] text-white p-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-wider uppercase">HR KONO S.A.</h1>
            <p className="text-white/80 mt-1 font-medium italic text-sm">Profesjonalne usługi HR Outsourcing</p>
          </div>
          <div className="text-right text-[11px] text-white/90 space-y-0.5 font-medium">
            <div className="flex items-center justify-end gap-1.5">
              <span>ul. Fabryczna 16/22 lok. 23, 00-446 Warszawa</span>
              <MapPin size={12} />
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span>NIP: 744-181-15-47</span>
              <FileText size={12} />
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span>Tel: +48 604 316 316</span>
              <Phone size={12} />
            </div>
            <div className="font-black text-white mt-1 uppercase tracking-tighter pt-1 border-t border-white/20">
              Oferta z dnia: {new Date().toLocaleDateString('pl-PL')}
            </div>
          </div>
        </header>

        <div className="p-8 border-b border-[#c0a068]/10">
            <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">
              Oferta Handlowa
            </h2>
            <p className="text-[#c0a068] font-bold uppercase text-xs tracking-widest">Dla: {data.clientName}</p>
        </div>

        <div className="px-8 py-6 bg-[#c0a068]/5 border-b border-[#c0a068]/10">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#c0a068] text-center shadow-sm relative">
              <p className="text-[#c0a068] text-[9px] uppercase font-black tracking-widest">Stawka Klienta</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{data.finalHourly.toFixed(2)} zł</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">netto / godzina</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-slate-100 text-center shadow-sm">
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest">Miesięcznie</p>
              <p className="text-2xl font-black text-slate-800 mt-1">{data.finalMonthly.toLocaleString('pl-PL')} zł</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">przy {data.hours}h</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 text-center shadow-sm">
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest">Dla Pracownika</p>
              <p className="text-2xl font-black text-slate-700 mt-1">{data.nettoWorker.toFixed(2)} zł</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">netto / rbh</p>
            </div>
          </div>
        </div>

        <div className="p-8">
             <h3 className="text-xs font-black text-slate-800 mb-4 pb-2 border-b-2 border-[#c0a068]/20 flex items-center gap-2 uppercase tracking-widest">
               <Calculator size={16} className="text-[#c0a068]" />
               Szczegóły kalkulacji
             </h3>
             <div className="overflow-hidden rounded-lg border border-slate-100">
               <table className="min-w-full text-[11px]">
                 <thead className="bg-[#c0a068]/10 text-[#8f754a]">
                   <tr>
                     <th className="py-2.5 px-4 text-left font-black uppercase">Składnik</th>
                     <th className="py-2.5 px-4 text-right font-black uppercase">Miesięcznie</th>
                     <th className="py-2.5 px-4 text-right font-black uppercase bg-[#c0a068]/5">Stawka / h</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   <tr className="bg-slate-50/50 font-bold">
                     <td className="py-2.5 px-4 text-slate-900">Wynagrodzenie (Podstawa)</td>
                     <td className="py-2.5 px-4 text-right">{data.podstawaZus.toLocaleString('pl-PL')} zł</td>
                     <td className="py-2.5 px-4 text-right bg-[#c0a068]/5">{data.grossRate.toFixed(2)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-2 px-4 text-slate-600">Koszt Składek ZUS & FP</td>
                     <td className="py-2 px-4 text-right">{(data.emerytalna + data.rentowa + data.wypadkowa + data.fp + data.fgsp).toLocaleString('pl-PL')} zł</td>
                     <td className="py-2 px-4 text-right bg-[#c0a068]/5">{formatRBH(data.emerytalna + data.rentowa + data.wypadkowa + data.fp + data.fgsp)} zł</td>
                   </tr>
                   {(data.transportCost > 0 || data.housingCost > 0) && (
                     <tr className="bg-slate-50/30">
                       <td className="py-2 px-4 text-slate-700 font-semibold italic">Zakwaterowanie i Transport</td>
                       <td className="py-2 px-4 text-right font-semibold">{(data.transportCost + data.housingCost).toLocaleString('pl-PL')} zł</td>
                       <td className="py-2 px-4 text-right font-semibold bg-[#c0a068]/5">{formatRBH(data.transportCost + data.housingCost)} zł</td>
                     </tr>
                   )}
                   <tr className="bg-[#f9f7f2]">
                     <td className="py-3 px-4 text-[#8f754a] font-black uppercase text-[10px]">Marża HR KONO ({data.marginPercent}%)</td>
                     <td className="py-3 px-4 text-right font-black text-[#8f754a]">{data.marzaKwota.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-4 text-right font-black bg-[#c0a068]/5 text-[#8f754a]">{formatRBH(data.marzaKwota)} zł</td>
                   </tr>
                   <tr className="bg-[#c0a068] text-white">
                     <td className="py-4 px-4 font-black uppercase text-xs">SUMA OFERTY (NETTO)</td>
                     <td className="py-4 px-4 text-right font-black text-lg">{data.finalMonthly.toLocaleString('pl-PL')} zł</td>
                     <td className="py-4 px-4 text-right font-black text-xl border-l border-white/20">{data.finalHourly.toFixed(2)} zł</td>
                   </tr>
                 </tbody>
               </table>
             </div>
        </div>

        <div className="px-8 py-6 bg-slate-50 grid grid-cols-2 gap-8 border-t border-slate-100">
           <div>
              <h3 className="text-[10px] font-black text-slate-900 mb-2 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle size={14} className="text-[#c0a068]" /> Gwarancje Usługi
              </h3>
              <ul className="space-y-1.5 text-[10px] text-slate-600 font-medium">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c0a068] rounded-full"></div> OC Biznesowe 2.000.000 PLN</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c0a068] rounded-full"></div> Ciągłość procesów 24/7</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#c0a068] rounded-full"></div> Legalność zatrudnienia (Audit Compliance)</li>
              </ul>
           </div>
           <div>
              <h3 className="text-[10px] font-black text-slate-900 mb-2 uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} className="text-[#c0a068]" /> Kontakt Biznesowy
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed italic border-l-2 border-[#c0a068] pl-3">
                Nasze rozwiązania redukują koszty operacyjne o średnio 15% przy zachowaniu najwyższej jakości kadr.
              </p>
           </div>
        </div>

        <footer className="bg-white p-6 border-t border-slate-100 text-[8px] text-slate-400 flex justify-between items-center uppercase tracking-tighter">
          <p>Oferta ważna 30 dni. Ceny netto. HR KONO S.A.</p>
          <p className="font-black text-slate-800 italic">Efektywność. Stabilność. Partnerstwo.</p>
        </footer>
      </div>
    </div>
  );
};

export default Offer;