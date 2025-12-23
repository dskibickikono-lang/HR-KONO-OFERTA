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

    const opt = {
      margin: 0,
      filename: `Oferta_HR_KONO_${data.clientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
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
    <div className="min-h-screen bg-[#f9f7f2] font-sans text-slate-800 p-4 md:p-8 print:p-0 print:bg-white">
      
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

      <div id="offer-content" className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none border border-[#c0a068]/20 print:border-none">
        
        <header className="bg-[#c0a068] text-white p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wider uppercase">HR KONO S.A.</h1>
            <p className="text-white/80 mt-1 font-medium italic">Profesjonalne usługi HR Outsourcing</p>
          </div>
          <div className="mt-4 md:mt-0 text-right text-sm text-white/90 space-y-1">
            <div className="flex items-center justify-end gap-2">
              <span>ul. Fabryczna 16/22 lok. 23, 00-446 Warszawa</span>
              <MapPin size={16} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span>NIP: 744-181-15-47</span>
              <FileText size={16} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span>Tel: +48 604 316 316</span>
              <Phone size={16} />
            </div>
            <div className="font-bold text-white mt-2 uppercase tracking-tighter">Oferta z dnia: {new Date().toLocaleDateString('pl-PL')}</div>
          </div>
        </header>

        <div className="p-8 border-b border-[#c0a068]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
              Oferta Handlowa dla {data.clientName}
            </h2>
            <p className="text-slate-500 font-medium italic">Personalizowana kalkulacja kosztów operacyjnych i pracowniczych</p>
        </div>

        <div className="px-8 py-6 bg-[#c0a068]/5 border-b border-[#c0a068]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-[#c0a068] text-center ring-2 ring-[#c0a068]/30 relative overflow-hidden order-1 md:order-2">
              <div className="absolute top-0 right-0 bg-[#c0a068] text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest">Kluczowa</div>
              <p className="text-[#c0a068] text-xs uppercase font-black tracking-widest">Stawka dla Klienta</p>
              <p className="text-4xl font-black text-slate-900 mt-2">{data.finalHourly.toFixed(2)} zł</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">netto / godzina</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c0a068]/20 text-center order-2 md:order-1">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Suma miesięczna</p>
              <p className="text-3xl font-black text-slate-800 mt-2">{data.finalMonthly.toLocaleString('pl-PL')} zł</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">estymacja (przy {data.hours}h)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c0a068]/20 text-center order-3">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Pracownik otrzymuje</p>
              <p className="text-3xl font-black text-slate-700 mt-2">{data.nettoWorker.toFixed(2)} zł</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">netto / rbh</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12">
             <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-[#c0a068]/20 flex items-center gap-2 uppercase tracking-wider">
               <Calculator size={20} className="text-[#c0a068]" />
               Szczegółowe zestawienie kosztów
             </h3>
             <div className="overflow-hidden rounded-lg border border-[#c0a068]/20">
               <table className="min-w-full text-xs">
                 <thead className="bg-[#c0a068]/10 text-[#8f754a]">
                   <tr>
                     <th className="py-3 px-4 text-left font-bold uppercase tracking-widest">Składnik kosztu</th>
                     <th className="py-3 px-4 text-right font-bold uppercase tracking-widest">Wartość Mies.</th>
                     <th className="py-3 px-4 text-right font-bold uppercase tracking-widest bg-[#c0a068]/5">Koszt / RBH</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   <tr className="bg-slate-50/30">
                     <td className="py-3 px-4 text-slate-800 font-bold uppercase text-[10px]">Wynagrodzenie (Podstawa ZUS)</td>
                     <td className="py-3 px-4 text-right font-bold text-slate-900">{data.podstawaZus.toLocaleString('pl-PL')} zł</td>
                     <td className="py-3 px-4 text-right font-bold bg-[#c0a068]/5 text-slate-900">{data.grossRate.toFixed(2)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-2.5 px-4 text-slate-600">ZUS Emerytalny (9,76%)</td>
                     <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{data.emerytalna.toLocaleString('pl-PL')} zł</td>
                     <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.emerytalna)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-2.5 px-4 text-slate-600">ZUS Rentowy (6,5%)</td>
                     <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{data.rentowa.toLocaleString('pl-PL')} zł</td>
                     <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.rentowa)} zł</td>
                   </tr>
                   <tr>
                     <td className="py-2.5 px-4 text-slate-600">Pozostałe składki ZUS, FP i FGSP</td>
                     <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{(data.wypadkowa + data.fp + data.fgsp).toLocaleString('pl-PL')} zł</td>
                     <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.wypadkowa + data.fp + data.fgsp)} zł</td>
                   </tr>

                   {data.transportCost > 0 && (
                     <tr>
                       <td className="py-2.5 px-4 text-slate-700 font-semibold flex items-center gap-2"><Truck size={12}/> Koszty logistyki i transportu</td>
                       <td className="py-2.5 px-4 text-right font-semibold text-slate-900">{data.transportCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-2.5 px-4 text-right font-semibold bg-[#c0a068]/5 text-slate-900">{formatRBH(data.transportCost)} zł</td>
                     </tr>
                   )}
                   {data.housingCost > 0 && (
                     <tr>
                       <td className="py-2.5 px-4 text-slate-700 font-semibold flex items-center gap-2"><Home size={12}/> Zakwaterowanie pracowników</td>
                       <td className="py-2.5 px-4 text-right font-semibold text-slate-900">{data.housingCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-2.5 px-4 text-right font-semibold bg-[#c0a068]/5 text-slate-900">{formatRBH(data.housingCost)} zł</td>
                     </tr>
                   )}
                   {data.medicalExamCost > 0 && (
                     <tr>
                       <td className="py-2.5 px-4 text-slate-600 italic flex items-center gap-2"><HeartPulse size={12}/> Badania lekarskie (Medycyna Pracy)</td>
                       <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{data.medicalExamCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.medicalExamCost)} zł</td>
                     </tr>
                   )}
                   {data.bhpTrainingCost > 0 && (
                     <tr>
                       <td className="py-2.5 px-4 text-slate-600 italic flex items-center gap-2"><HardHat size={12}/> Szkolenia BHP i uprawnienia</td>
                       <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{data.bhpTrainingCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.bhpTrainingCost)} zł</td>
                     </tr>
                   )}
                   {data.sanepidCost > 0 && (
                     <tr>
                       <td className="py-2.5 px-4 text-slate-600 italic flex items-center gap-2"><FileCheck size={12}/> Sanepid i orzeczenia</td>
                       <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{data.sanepidCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.sanepidCost)} zł</td>
                     </tr>
                   )}
                   {data.workClothingCost > 0 && (
                     <tr>
                       <td className="py-2.5 px-4 text-slate-600 italic flex items-center gap-2"><Shirt size={12}/> Odzież i środki ochrony osobistej</td>
                       <td className="py-2.5 px-4 text-right text-slate-900 font-medium">{data.workClothingCost.toLocaleString('pl-PL')} zł</td>
                       <td className="py-2.5 px-4 text-right bg-[#c0a068]/5 text-slate-900 font-medium">{formatRBH(data.workClothingCost)} zł</td>
                     </tr>
                   )}

                   <tr className="bg-slate-50">
                     <td className="py-4 px-4 text-[#8f754a] font-black uppercase tracking-widest text-[10px]">Marża operacyjna HR KONO ({data.marginPercent}%)</td>
                     <td className="py-4 px-4 text-right font-black text-[#8f754a]">{data.marzaKwota.toLocaleString('pl-PL')} zł</td>
                     <td className="py-4 px-4 text-right font-black bg-[#c0a068]/5 text-[#8f754a]">{formatRBH(data.marzaKwota)} zł</td>
                   </tr>

                   <tr className="bg-[#c0a068] text-white">
                     <td className="py-4 px-4 font-black uppercase tracking-widest text-sm text-white">FINALNA WARTOŚĆ OFERTY (NETTO)</td>
                     <td className="py-4 px-4 text-right font-black text-xl text-white">{data.finalMonthly.toLocaleString('pl-PL')} zł</td>
                     <td className="py-4 px-4 text-right font-black text-2xl border-l border-white/20 text-white">{data.finalHourly.toFixed(2)} zł</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200">
           <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-[#c0a068]" />
                Warunki Współpracy
              </h3>
              <ul className="space-y-3 text-[11px] text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-[#c0a068] rounded-full mt-1 flex-shrink-0"></span>
                  <span><strong>Okres próbny:</strong> Możliwość rezygnacji bez żadnych kosztów</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-[#c0a068] rounded-full mt-1 flex-shrink-0"></span>
                  <span><strong>Gwarancja:</strong> Pełne ubezpieczenie OC Business (2.000.000 zł)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-[#c0a068] rounded-full mt-1 flex-shrink-0"></span>
                  <span><strong>Forma:</strong> Umowa agencyjna (APT) lub Outsourcing procesowy</span>
                </li>
              </ul>
           </div>

           <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tighter">
                <Shield size={20} className="text-[#c0a068]" /> Gwarancja HR KONO
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed italic border-l-2 border-[#c0a068] pl-4">
                Jako HR KONO S.A. zapewniamy najwyższy standard stabilności finansowej. Każdy z naszych pracowników przechodzi rygorystyczny proces weryfikacji kompetencji oraz legalności zatrudnienia.
              </p>
           </div>
        </div>

        <footer className="bg-[#f9f7f2] p-8 border-t border-[#c0a068]/10 text-xs text-slate-400">
          <div className="flex justify-between items-center italic">
            <p>Oferta ważna 30 dni od daty wystawienia. Wszystkie ceny są kwotami netto.</p>
            <p className="font-bold text-slate-600 uppercase tracking-widest">HR KONO S.A. - Partner Twojego Sukcesu</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Offer;