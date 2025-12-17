import React from 'react';
import { FileText, Phone, MapPin, Calculator, Shield, Users, CheckCircle, TrendingUp, Truck } from 'lucide-react';

const Offer: React.FC = () => {
  // Primary color: #c0a068
  
  return (
    <div className="min-h-screen bg-[#f9f7f2] font-sans text-slate-800 p-4 md:p-8 print:p-0">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none border border-[#c0a068]/20">
        
        {/* Header */}
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
            <div className="font-bold text-white mt-2">Data: 17.12.2025</div>
          </div>
        </header>

        {/* Title Section */}
        <div className="p-8 border-b border-[#c0a068]/10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              Oferta Handlowa dla Fine Altech Mława Sp. z o.o.
            </h2>
            <p className="text-slate-500 font-medium italic">Profesjonalne usługi HR Outsourcing</p>
        </div>

        {/* Final Rates Section - UPDATED: Hourly rate highlighted */}
        <div className="px-8 py-6 bg-[#c0a068]/5 border-b border-[#c0a068]/10">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-6 w-1.5 bg-[#c0a068] rounded-full"></div>
             <h2 className="text-xl font-bold text-slate-700 uppercase tracking-tight">FINALNE STAWKI DLA KLIENTA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* HIGHLIGHTED CARD: Hourly Rate */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-[#c0a068] text-center ring-2 ring-[#c0a068]/30 relative overflow-hidden order-1 md:order-2">
              <div className="absolute top-0 right-0 bg-[#c0a068] text-white text-[10px] px-2 py-0.5 font-bold uppercase">Główna</div>
              <p className="text-[#c0a068] text-sm uppercase font-black tracking-widest">Stawka godzinowa</p>
              <p className="text-4xl font-black text-slate-900 mt-2">40,52 zł</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">netto / h</p>
            </div>
            
            {/* Standard Card: Monthly Sum */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c0a068]/20 text-center order-2 md:order-1">
              <p className="text-slate-500 text-sm uppercase font-bold">Stawka miesięczna</p>
              <p className="text-3xl font-black text-slate-800 mt-2">9725,67 zł</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">estymowana suma</p>
            </div>

            {/* Standard Card: Net for Worker */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c0a068]/20 text-center order-3">
              <p className="text-slate-500 text-sm uppercase font-bold">Netto dla pracownika</p>
              <p className="text-3xl font-black text-slate-700 mt-2">25,36 zł</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">/ godz.</p>
            </div>
          </div>
        </div>

        {/* Parameters & Calculation */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Detailed Calculation Table */}
          <div className="lg:col-span-8">
             <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-[#c0a068]/20 flex items-center gap-2">
               <Calculator size={20} className="text-[#c0a068]" />
               SZCZEGÓŁOWA KALKULACJA
             </h3>
             <div className="overflow-hidden rounded-lg border border-[#c0a068]/20">
               <table className="min-w-full text-sm">
                 <thead className="bg-[#c0a068]/10 text-[#8f754a]">
                   <tr>
                     <th className="py-3 px-4 text-left font-bold uppercase tracking-wider">Pozycja</th>
                     <th className="py-3 px-4 text-right font-bold uppercase tracking-wider">Kwota (PLN)</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   <tr><td className="py-2.5 px-4 text-slate-700 font-medium">Podstawa ZUS</td><td className="py-2.5 px-4 text-right font-bold">7536,00 zł</td></tr>
                   <tr className="bg-[#c0a068]/5"><td className="py-2.5 px-4 text-slate-600">Składka emerytalna (9,76%)</td><td className="py-2.5 px-4 text-right text-slate-600">735,51 zł</td></tr>
                   <tr><td className="py-2.5 px-4 text-slate-600">Składka rentowa (6,5%)</td><td className="py-2.5 px-4 text-right text-slate-600">489,84 zł</td></tr>
                   <tr className="bg-[#c0a068]/5"><td className="py-2.5 px-4 text-slate-600">Składka wypadkowa (1,67%)</td><td className="py-2.5 px-4 text-right text-slate-600">125,85 zł</td></tr>
                   <tr><td className="py-2.5 px-4 text-slate-600">Fundusz Pracy (2,45%)</td><td className="py-2.5 px-4 text-right text-slate-600">184,63 zł</td></tr>
                   <tr className="bg-[#c0a068]/5"><td className="py-2.5 px-4 text-slate-600">Fundusz GSP (0,1%)</td><td className="py-2.5 px-4 text-right text-slate-600">7,54 zł</td></tr>
                   <tr><td className="py-2.5 px-4 text-slate-600">Koszt transportu</td><td className="py-2.5 px-4 text-right text-slate-600 font-bold">50,00 zł</td></tr>
                   <tr className="bg-[#c0a068]/5"><td className="py-2.5 px-4 text-slate-600">Koszt zakwaterowania</td><td className="py-2.5 px-4 text-right text-slate-600 font-bold">500,00 zł</td></tr>
                   <tr><td className="py-2.5 px-4 text-slate-600">Inne koszty</td><td className="py-2.5 px-4 text-right text-slate-600">0,00 zł</td></tr>
                   <tr className="bg-[#c0a068]/5"><td className="py-2.5 px-4 text-[#8f754a] font-bold">Marża (1%)</td><td className="py-2.5 px-4 text-right text-[#8f754a] font-bold">96,29 zł</td></tr>
                   <tr className="bg-[#c0a068] text-white">
                     <td className="py-3.5 px-4 font-black uppercase tracking-wide">FINALNA STAWKA MIESIĘCZNA</td>
                     <td className="py-3.5 px-4 text-right font-black text-xl">9725,67 zł</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>

          {/* Parameters Sidebar */}
          <div className="lg:col-span-4 space-y-6">
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-[#c0a068]/20 uppercase tracking-tight">Parametry Oferty</h3>
                <div className="space-y-3">
                   <div className="bg-white p-4 rounded-lg border border-[#c0a068]/20 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Stawka godz. brutto</span>
                      <span className="font-bold text-[#8f754a]">31,40 zł</span>
                   </div>
                   <div className="bg-white p-4 rounded-lg border border-[#c0a068]/20 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Ilość godzin mies.</span>
                      <span className="font-bold text-[#8f754a]">240 godz.</span>
                   </div>
                   <div className="bg-white p-4 rounded-lg border border-[#c0a068]/20 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Marża</span>
                      <span className="font-bold text-[#8f754a]">1%</span>
                   </div>
                </div>
             </div>

             <div className="bg-[#c0a068]/10 p-5 rounded-xl border border-[#c0a068]/20">
                <h4 className="font-bold text-[#8f754a] mb-2 flex items-center gap-2">
                   <Shield size={18} />
                   BEZPIECZEŃSTWO
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  Nasza oferta obejmuje pełne ubezpieczenie OC do kwoty 2.000.000,00 PLN oraz gwarancję zastępstwa pracownika.
                </p>
             </div>
          </div>
        </div>

        {/* Detailed Offer Terms */}
        <div className="p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200">
           <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-[#c0a068]" />
                Warunki Współpracy
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><strong>Forma:</strong> Umowa agencyjna (APT) lub Outsourcing procesowy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><strong>Okres próbny:</strong> Możliwość rezygnacji bez konsekwencji finansowych</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><strong>Czas realizacji:</strong> 7-14 dni roboczych - standardowy czas pozyskania</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><strong>Ochrona Danych:</strong> RODO - pełna zgodność z przepisami</span>
                </li>
              </ul>
           </div>

           <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Truck size={20} className="text-[#c0a068]" />
                Dodatkowe Korzyści
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Organizacja transportu grupowego</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Zakwaterowanie w apartamentach pracowniczych</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Bonus za polecenie: 1000 PLN za każdą osobę</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c0a068] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Flexibility Program: zmiany z 24h wyprzedzeniem</span>
                </li>
              </ul>
           </div>
        </div>

        {/* Legal Info */}
        <div className="bg-[#f9f7f2] p-8 border-t border-[#c0a068]/10 text-xs text-slate-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-[#8f754a] mb-2 uppercase">Ważne Informacje Prawne</h4>
              <p className="mb-1">• Oferta ważna przez 30 dni od daty wystawienia.</p>
              <p className="mb-1">• Ceny podane są w PLN i są cenami netto.</p>
              <p className="mb-1">• Minimalny okres współpracy: 3 miesiące.</p>
              <p>• Wymagane podpisanie umowy ramowej przed rozpoczęciem współpracy.</p>
            </div>
            <div className="text-right flex flex-col justify-end space-y-1">
               <p className="font-bold text-slate-700 italic">HR KONO S.A. - Profesjonalne usługi HR Outsourcing</p>
               <p>Strona 1 z 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;