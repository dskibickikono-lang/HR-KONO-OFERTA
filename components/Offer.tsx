import React from 'react';
import { FileText, Phone, MapPin, Calculator, Shield, CheckCircle, Truck, Download, HeartPulse, HardHat, Shirt, Home, FileCheck, TrendingUp } from 'lucide-react';
import { CalculationData } from '../App';

interface Props {
  data: CalculationData;
}

const Offer: React.FC<Props> = ({ data }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('offer-content');
    if (!element) return;

    // Przewinięcie na górę jest kluczowe dla html2canvas, aby uniknąć czarnych obszarów lub przesunięć
    window.scrollTo(0, 0);

    const opt = {
      margin: 0,
      filename: `Oferta_HR_KONO_${data.clientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'png', quality: 1.0 },
      html2canvas: { 
        scale: 3, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Wymuszenie rozpoczęcia przechwytywania od lewej krawędzi (naprawia widok "tylko prawej krawędzi")
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 800 // Szerokość okna wirtualnego dopasowana do kontenera
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
    };

    // @ts-ignore
    if (typeof html2pdf !== 'undefined') {
      // @ts-ignore
      html2pdf().set(opt).from(element).save();
    } else {
      window.print();
    }
  };

  const formatRBH = (value: number) => (value / data.hours).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f9f7f2] font-sans text-slate-800 p-4 md:p-8 print:p-0 print:bg-white flex flex-col items-center">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        #offer-content {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
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

      {/* Kontener A4 o stałej szerokości (800px) - idealnie mieści się w widoku i na PDF bez ucinania */}
      <div 
        id="offer-content" 
        className="w-[800px] bg-white shadow-2xl overflow-hidden print:shadow-none border border-[#c0a068]/20 print:border-none flex-shrink-0"
      >
        
        <header className="bg-[#c0a068] text-white p-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">HR KONO S.A.</h1>
            <p className="text-white/90 mt-1 font-semibold italic text-base uppercase tracking-widest">Outsourcing & Rekrutacja</p>
          </div>
          <div className="text-right text-xs text-white/90 space-y-1.5 font-bold">
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
            <div className="font-black text-white mt-4 uppercase text-sm border-t border-white/30 pt-2">
              OFERTA Z DNIA: {new Date().toLocaleDateString('pl-PL')}
            </div>
          </div>
        </header>

        <div className="p-10 border-b border-[#c0a068]/10">
            <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
              {data.clientName}
            </h2>
            <div className="flex items-center gap-2 text-[#c0a068] font-bold uppercase tracking-widest text-sm">
              <TrendingUp size={18} />
              Dedykowana oferta handlowa
            </div>
        </div>

        <div className="px-10 py-8 bg-[#c0a068]/5 border-b border-[#c0a068]/10">
          <div className="grid grid-cols-3 gap-6 items-center">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center shadow-sm">
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Suma miesięczna</p>
              <p className="text-3xl font-black text-slate-800 mt-2">{data.finalMonthly.toLocaleString('pl-PL')} zł</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">przy {data.hours}h</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-[#c0a068] text-center shadow-xl relative ring-8 ring-[#c0a068]/5 transform scale-105 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c0a068] text-white text-[10px] px-4 py-1 rounded-full font-black uppercase tracking-widest">KLUCZOWA</div>
              <p className="text-[#c0a068] text-xs uppercase font-black tracking-widest">Stawka dla Klienta</p>
              <p className="text-5xl font-black text-slate-900 mt-2 tracking-tighter">{data.finalHourly.toFixed(2)} zł</p>
              <p className="text-xs text-slate-500 font-black uppercase mt-1">netto / godzina</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center shadow-sm">
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Dla Pracownika</p>
              <p className="text-3xl font-black text-slate-700 mt-2">{data.nettoWorker.toFixed(2)} zł</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">netto / rbh</p>
            </div>

          </div>
        </div>

        <div className="p-10">
             <h3 className="text-lg font-black text-slate-900 mb-6 pb-2 border-b-4 border-[#c0a068]/20 flex items-center gap-3 uppercase tracking-tighter">
               <Calculator size={24} className="text-[#c0a068]" />
               Szczegółowe zestawienie kosztów
             </h3>
             <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
               <table className="min-w-full text-xs">
                 <thead className="bg-[#c0a068]/10 text-[#8f754a]">
                   <tr>
                     <th className="py-4 px-6 text-left font-black uppercase tracking-widest">Składnik kosztu</th>
                     <th className="py-4 px-6 text-right font-black uppercase tracking-widest">Wartość Mies.</th>
                     <th className="py-4 px-6 text-right font-black uppercase tracking-widest bg-[#c0a068]/5">Koszt / RBH</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   <tr className="bg-slate-50/50">
                     <td className="py-4 px-6 text-slate-900 font-bold flex items-center gap-2 uppercase tracking-tight"><FileCheck size={14} className="text-[#c0a068]" /> Wynagrodzenie (Podstawa ZUS)</td>
                     <td className="py-4 px-6 text-right font-bold text-slate-900">{data.podstawaZus.toLocaleString('pl-PL')} zł</td>
                     <td className="py-4 px-6 text-right font-bold bg-[#c0a068]/5 text-slate-900">{data.grossRate.toFixed(2)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-3 px-6 text-slate-600 pl-10">ZUS Emerytalny (9,76%)</td>
                     <td className="py-3 px-6 text-right font-medium">{data.emerytalna.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-6 text-right bg-[#c0a068]/5 font-medium">{formatRBH(data.emerytalna)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-3 px-6 text-slate-600 pl-10">ZUS Rentowy (6,5%)</td>
                     <td className="py-3 px-6 text-right font-medium">{data.rentowa.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-6 text-right bg-[#c0a068]/5 font-medium">{formatRBH(data.rentowa)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-3 px-6 text-slate-600 pl-10 italic">ZUS Wypadkowy ({data.accidentPercent}%)</td>
                     <td className="py-3 px-6 text-right font-medium">{data.wypadkowa.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-6 text-right bg-[#c0a068]/5 font-medium">{formatRBH(data.wypadkowa)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-3 px-6 text-slate-600 pl-10 italic">Fundusz Pracy (FP)</td>
                     <td className="py-3 px-6 text-right font-medium">{data.fp.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-6 text-right bg-[#c0a068]/5 font-medium">{formatRBH(data.fp)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-3 px-6 text-slate-600 pl-10 italic">FGSP</td>
                     <td className="py-3 px-6 text-right font-medium">{data.fgsp.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-6 text-right bg-[#c0a068]/5 font-medium">{formatRBH(data.fgsp)} zł</td>
                   </tr>

                   {data.housingCost > 0 && (
                     <tr className="bg-slate-50/30">
                       <td className="py-3 px-6 text-slate-700 font-bold flex items-center gap-2"><Home size={14} className="text-[#c0a068]" /> Zakwaterowanie pracowników</td>
                       <td className="py-3 px-6 text-right font-bold">{data.housingCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-3 px-6 text-right font-bold bg-[#c0a068]/5">{formatRBH(data.housingCost)} zł</td>
                     </tr>
                   )}
                   {data.transportCost > 0 && (
                     <tr className="bg-slate-50/30">
                       <td className="py-3 px-6 text-slate-700 font-bold flex items-center gap-2"><Truck size={14} className="text-[#c0a068]" /> Koszty transportu i logistyki</td>
                       <td className="py-3 px-6 text-right font-bold">{data.transportCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-3 px-6 text-right font-bold bg-[#c0a068]/5">{formatRBH(data.transportCost)} zł</td>
                     </tr>
                   )}
                   
                   {(data.medicalExamCost > 0 || data.bhpTrainingCost > 0 || data.sanepidCost > 0 || data.workClothingCost > 0) && (
                     <tr className="bg-slate-50/10">
                       <td className="py-3 px-6 text-slate-600 italic flex items-center gap-2"><Shield size={14} className="text-[#c0a068]/60" /> Inne koszty (Medycyna, BHP, Odzież)</td>
                       <td className="py-3 px-6 text-right font-medium">{(data.medicalExamCost + data.bhpTrainingCost + data.sanepidCost + data.workClothingCost).toLocaleString('pl-PL')} zł</td>
                       <td className="py-3 px-6 text-right bg-[#c0a068]/5 font-medium">{formatRBH(data.medicalExamCost + data.bhpTrainingCost + data.sanepidCost + data.workClothingCost)} zł</td>
                     </tr>
                   )}

                   <tr className="bg-[#f9f7f2]">
                     <td className="py-4 px-6 text-[#8f754a] font-black uppercase text-xs">Marża operacyjna HR KONO ({data.marginPercent}%)</td>
                     <td className="py-4 px-6 text-right font-black text-[#8f754a]">{data.marzaKwota.toLocaleString('pl-PL')} zł</td>
                     <td className="py-4 px-6 text-right font-black bg-[#c0a068]/5 text-[#8f754a]">{formatRBH(data.marzaKwota)} zł</td>
                   </tr>

                   <tr className="bg-[#c0a068] text-white">
                     <td className="py-6 px-6 font-black uppercase text-sm tracking-widest">FINALNA WARTOŚĆ OFERTY (NETTO)</td>
                     <td className="py-6 px-6 text-right font-black text-2xl">{data.finalMonthly.toLocaleString('pl-PL')} zł</td>
                     <td className="py-6 px-6 text-right font-black text-4xl border-l border-white/20">{data.finalHourly.toFixed(2)} zł</td>
                   </tr>
                 </tbody>
               </table>
             </div>
        </div>

        <div className="px-10 py-10 bg-slate-50 grid grid-cols-2 gap-12 border-t border-slate-200">
           <div>
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <CheckCircle size={18} className="text-[#c0a068]" />
                Warunki Współpracy
              </h3>
              <ul className="space-y-3 text-[11px] text-slate-600 font-bold leading-tight">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Gwarancja OC Biznesowe na kwotę 2.000.000 PLN</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Okres wypowiedzenia dopasowany do specyfiki projektu</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Pełna obsługa kadrowo-płacowa oraz prawna (Legalizacja)</span>
                </li>
              </ul>
           </div>

           <div>
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Shield size={18} className="text-[#c0a068]" /> Gwarancja Stabilności
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-4 border-[#c0a068] pl-4 font-medium">
                HR KONO S.A. gwarantuje 100% ciągłości dostarczania personelu. W przypadku absencji pracownika, zapewniamy wykwalifikowane zastępstwo w czasie nieprzekraczającym 24h.
              </p>
           </div>
        </div>

        <footer className="bg-white p-8 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between items-center uppercase tracking-widest">
          <div className="italic font-medium">
            <p>Oferta ważna przez okres 30 dni kalendarzowych.</p>
            <p>Wszystkie podane ceny są kwotami netto.</p>
          </div>
          <div className="text-right">
            <p className="font-black text-slate-800 text-xs italic">HR KONO S.A. - PARTNER TWOJEGO SUKCESU</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Offer;