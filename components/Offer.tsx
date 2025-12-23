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

    // Reset scrolla dla poprawnego przechwycenia canvas
    const scrollY = window.scrollY;
    window.scrollTo(0, 0);

    const opt = {
      margin: 10, // Dodanie marginesów 10mm dla profesjonalnego wyglądu
      filename: `Oferta_HR_KONO_${data.clientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'png', quality: 1.0 }, // PNG zapewnia lepszą wierność kolorów niż JPEG
      html2canvas: { 
        scale: 2.5, // Zbalansowana wysoka rozdzielczość (300 DPI)
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 800, // Kluczowe: szerokość dopasowana do proporcji A4
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
    };

    // @ts-ignore
    if (typeof html2pdf !== 'undefined') {
      // @ts-ignore
      html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf) => {
        // Dodatkowe opcjonalne metadane do PDF
        pdf.setProperties({
            title: `Oferta HR KONO - ${data.clientName}`,
            subject: 'Kalkulacja kosztów outsourcingu kadr',
            author: 'HR KONO S.A.'
        });
      }).save().then(() => {
        window.scrollTo(0, scrollY);
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
          .print-no-shadow { shadow: none !important; box-shadow: none !important; }
        }
        #offer-content {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        /* Zapobieganie rozmyciu fontów w canvas */
        .pdf-fix-text {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
      
      <button 
        onClick={handleDownloadPDF}
        className="fixed bottom-8 right-8 bg-[#c0a068] text-white p-4 rounded-full shadow-2xl hover:bg-[#ac8e5a] transition-all transform hover:scale-110 flex items-center gap-2 z-50 group print:hidden"
        title="Pobierz PDF"
      >
        <Download size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
          Pobierz Ofertę PDF
        </span>
      </button>

      <div id="offer-content" className="max-w-[800px] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none border border-[#c0a068]/10 print:border-none pdf-fix-text">
        
        <header className="bg-[#c0a068] text-white p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wider uppercase">HR KONO S.A.</h1>
            <p className="text-white/80 mt-1 font-medium italic">Profesjonalne usługi HR Outsourcing</p>
          </div>
          <div className="mt-4 md:mt-0 text-right text-sm text-white/90 space-y-1">
            <div className="flex items-center justify-end gap-2">
              <span>ul. Fabryczna 16/22 lok. 23, 00-446 Warszawa</span>
              <MapPin size={14} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span>NIP: 744-181-15-47</span>
              <FileText size={14} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span>Tel: +48 604 316 316</span>
              <Phone size={14} />
            </div>
            <div className="font-bold text-white mt-2 uppercase tracking-tighter text-xs">Oferta z dnia: {new Date().toLocaleDateString('pl-PL')}</div>
          </div>
        </header>

        <div className="p-8 border-b border-[#c0a068]/10">
            <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">
              Oferta Handlowa
            </h2>
            <p className="text-[#c0a068] font-bold uppercase text-xs tracking-widest">Przygotowana dla: {data.clientName}</p>
        </div>

        <div className="px-8 py-6 bg-[#c0a068]/5 border-b border-[#c0a068]/10">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-[#c0a068] text-center ring-4 ring-[#c0a068]/10 relative overflow-hidden">
              <p className="text-[#c0a068] text-[9px] uppercase font-black tracking-widest">Stawka dla Klienta</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{data.finalHourly.toFixed(2)} zł</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-widest">netto / godzina</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 text-center">
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest">Suma miesięczna</p>
              <p className="text-2xl font-black text-slate-800 mt-1">{data.finalMonthly.toLocaleString('pl-PL')} zł</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">przy {data.hours}h</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 text-center">
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest">Dla Pracownika</p>
              <p className="text-2xl font-black text-slate-700 mt-1">{data.nettoWorker.toFixed(2)} zł</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">netto / rbh</p>
            </div>
          </div>
        </div>

        <div className="p-8">
             <h3 className="text-sm font-black text-slate-800 mb-4 pb-2 border-b-2 border-[#c0a068]/20 flex items-center gap-2 uppercase tracking-widest">
               <Calculator size={18} className="text-[#c0a068]" />
               Szczegółowe zestawienie kosztów
             </h3>
             <div className="overflow-hidden rounded-lg border border-slate-100 shadow-sm">
               <table className="min-w-full text-[11px]">
                 <thead className="bg-[#c0a068]/10 text-[#8f754a]">
                   <tr>
                     <th className="py-2.5 px-4 text-left font-black uppercase tracking-widest">Składnik kosztu</th>
                     <th className="py-2.5 px-4 text-right font-black uppercase tracking-widest">Wartość Mies.</th>
                     <th className="py-2.5 px-4 text-right font-black uppercase tracking-widest bg-[#c0a068]/5">Koszt / RBH</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   <tr className="bg-slate-50/50">
                     <td className="py-2.5 px-4 text-slate-900 font-bold">Wynagrodzenie (Podstawa ZUS)</td>
                     <td className="py-2.5 px-4 text-right font-bold text-slate-900">{data.podstawaZus.toLocaleString('pl-PL')} zł</td>
                     <td className="py-2.5 px-4 text-right font-bold bg-[#c0a068]/5 text-slate-900">{data.grossRate.toFixed(2)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-2 px-4 text-slate-600">ZUS (Emerytalny, Rentowy, Pozostałe)</td>
                     <td className="py-2 px-4 text-right text-slate-900">{(data.emerytalna + data.rentowa + data.wypadkowa + data.fp + data.fgsp).toLocaleString('pl-PL')} zł</td>
                     <td className="py-2 px-4 text-right bg-[#c0a068]/5 text-slate-900">{formatRBH(data.emerytalna + data.rentowa + data.wypadkowa + data.fp + data.fgsp)} zł</td>
                   </tr>

                   {(data.transportCost > 0 || data.housingCost > 0) && (
                     <tr className="bg-slate-50/30">
                       <td className="py-2 px-4 text-slate-700 font-semibold italic">Logistyka (Zakwaterowanie i Transport)</td>
                       <td className="py-2 px-4 text-right font-semibold text-slate-900">{(data.transportCost + data.housingCost).toLocaleString('pl-PL')} zł</td>
                       <td className="py-2 px-4 text-right font-semibold bg-[#c0a068]/5 text-slate-900">{formatRBH(data.transportCost + data.housingCost)} zł</td>
                     </tr>
                   )}
                   
                   {(data.medicalExamCost > 0 || data.bhpTrainingCost > 0 || data.sanepidCost > 0 || data.workClothingCost > 0) && (
                     <tr>
                       <td className="py-2 px-4 text-slate-600 italic">Koszty BHP, Medycyny i Odzieży</td>
                       <td className="py-2 px-4 text-right text-slate-900">{(data.medicalExamCost + data.bhpTrainingCost + data.sanepidCost + data.workClothingCost).toLocaleString('pl-PL')} zł</td>
                       <td className="py-2 px-4 text-right bg-[#c0a068]/5 text-slate-900">{formatRBH(data.medicalExamCost + data.bhpTrainingCost + data.sanepidCost + data.workClothingCost)} zł</td>
                     </tr>
                   )}

                   <tr className="bg-[#f9f7f2]">
                     <td className="py-3 px-4 text-[#8f754a] font-black uppercase tracking-widest text-[10px]">Marża operacyjna HR KONO ({data.marginPercent}%)</td>
                     <td className="py-3 px-4 text-right font-black text-[#8f754a]">{data.marzaKwota.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-4 text-right font-black bg-[#c0a068]/5 text-[#8f754a]">{formatRBH(data.marzaKwota)} zł</td>
                   </tr>

                   <tr className="bg-[#c0a068] text-white">
                     <td className="py-4 px-4 font-black uppercase tracking-widest text-xs text-white">FINALNA WARTOŚĆ OFERTY (NETTO)</td>
                     <td className="py-4 px-4 text-right font-black text-lg text-white">{data.finalMonthly.toLocaleString('pl-PL')} zł</td>
                     <td className="py-4 px-4 text-right font-black text-xl border-l border-white/20 text-white">{data.finalHourly.toFixed(2)} zł</td>
                   </tr>
                 </tbody>
               </table>
             </div>
        </div>

        <div className="px-8 py-6 bg-slate-50 grid grid-cols-2 gap-8 border-t border-slate-100">
           <div>
              <h3 className="text-xs font-black text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-widest">
                <CheckCircle size={16} className="text-[#c0a068]" />
                Warunki Współpracy
              </h3>
              <ul className="space-y-2 text-[10px] text-slate-600 font-medium leading-tight">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#c0a068] rounded-full"></div>
                  <span>Gwarancja OC Business (2.000.000 zł)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#c0a068] rounded-full"></div>
                  <span>Okres wypowiedzenia dopasowany do potrzeb</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#c0a068] rounded-full"></div>
                  <span>Pełna obsługa prawna i legalizacja cudzoziemców</span>
                </li>
              </ul>
           </div>

           <div>
              <h3 className="text-xs font-black text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-widest">
                <Shield size={16} className="text-[#c0a068]" /> Gwarancja HR KONO
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed italic border-l-2 border-[#c0a068] pl-3">
                Zapewniamy 100% ciągłości procesów. W przypadku nieobecności pracownika, gwarantujemy zastępstwo w ciągu 24h.
              </p>
           </div>
        </div>

        <footer className="bg-white p-6 border-t border-slate-100 text-[9px] text-slate-400 flex justify-between items-center italic">
          <p>Oferta handlowa ważna 30 dni. Podane ceny są kwotami netto.</p>
          <p className="font-black text-slate-800 uppercase tracking-tighter">HR KONO S.A. - EFEKTYWNOŚĆ I STABILNOŚĆ</p>
        </footer>
      </div>
    </div>
  );
};

export default Offer;