import React, { useState } from 'react';
import { Calculator, Users, TrendingUp, Home, Truck, FileCheck, ShieldAlert, HeartPulse, HardHat, Shirt, Building2 } from 'lucide-react';
import { CalculationData } from '../App';

interface Props {
  onGenerate: (data: CalculationData) => void;
  initialData: CalculationData | null;
}

const CalculatorForm: React.FC<Props> = ({ onGenerate, initialData }) => {
  const [entity, setEntity] = useState(initialData?.entity || 'HR KONO');
  const [clientName, setClientName] = useState(initialData?.clientName || 'Fine Altech Mława Sp. z o.o.');
  const [grossRate, setGrossRate] = useState(initialData?.grossRate || 31.40);
  const [accidentPercent, setAccidentPercent] = useState(initialData?.accidentPercent || 1.20);
  const [hours, setHours] = useState(initialData?.hours || 240);
  const [transportCost, setTransportCost] = useState(initialData?.transportCost || 50);
  const [housingCost, setHousingCost] = useState(initialData?.housingCost || 500);
  const [medicalExamCost, setMedicalExamCost] = useState(initialData?.medicalExamCost || 0);
  const [bhpTrainingCost, setBhpTrainingCost] = useState(initialData?.bhpTrainingCost || 0);
  const [sanepidCost, setSanepidCost] = useState(initialData?.sanepidCost || 0);
  const [workClothingCost, setWorkClothingCost] = useState(initialData?.workClothingCost || 0);
  const [marginPercent, setMarginPercent] = useState(initialData?.marginPercent || 1);

  const handleEntityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setEntity(selected);
    
    if (selected === 'HR KONO') {
      setAccidentPercent(1.20);
    } else if (selected === 'APT WORK') {
      setAccidentPercent(0.93);
    }
    // Dla 'Inny' nie zmieniamy wartości automatycznie, użytkownik wpisuje sam
  };

  const calculate = () => {
    const podstawaZus = Number((grossRate * hours).toFixed(2));
    const emerytalna = Number((podstawaZus * 0.0976).toFixed(2));
    const rentowa = Number((podstawaZus * 0.065).toFixed(2));
    
    // Użycie dynamicznej stawki wypadkowej
    const wypadkowa = Number((podstawaZus * (accidentPercent / 100)).toFixed(2));
    
    const fp = Number((podstawaZus * 0.0245).toFixed(2));
    const fgsp = Number((podstawaZus * 0.001).toFixed(2));
    
    const inneKosztySuma = medicalExamCost + bhpTrainingCost + sanepidCost + workClothingCost;
    const totalCostBeforeMargin = podstawaZus + emerytalna + rentowa + wypadkowa + fp + fgsp + transportCost + housingCost + inneKosztySuma;
    const marzaKwota = Number((totalCostBeforeMargin * (marginPercent / 100)).toFixed(2));
    const finalMonthly = Number((totalCostBeforeMargin + marzaKwota).toFixed(2));
    const finalHourly = Number((finalMonthly / hours).toFixed(2));
    
    const nettoWorker = Number((grossRate * 0.8076).toFixed(2));

    return {
      clientName, entity, grossRate, hours, transportCost, housingCost, 
      medicalExamCost, bhpTrainingCost, sanepidCost, workClothingCost,
      marginPercent, accidentPercent,
      podstawaZus, emerytalna, rentowa, wypadkowa, fp, fgsp, 
      marzaKwota, finalMonthly, finalHourly, nettoWorker
    };
  };

  const results = calculate();
  const isAccidentRateDisabled = entity !== 'Inny';

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter italic">HR KONO <span className="text-[#c0a068]">OFFER SYSTEM</span></h1>
        <p className="text-slate-500 mt-2 font-medium">Precyzyjne wyliczenia dla Twojego biznesu</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#c0a068]">
              <FileCheck size={24} /> Dane Podstawowe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Entity Selector - Option 2 Implementation */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Building2 size={14} /> Podmiot Zatrudniający
                </label>
                <select 
                  value={entity} 
                  onChange={handleEntityChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c0a068] outline-none transition-all text-slate-900 font-bold"
                >
                  <option value="HR KONO">HR KONO S.A.</option>
                  <option value="APT WORK">APT WORK Sp. z o.o.</option>
                  <option value="Inny">Inny (Własna stawka)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nazwa Klienta</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c0a068] outline-none transition-all text-slate-900 font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Liczba Godzin</label>
                <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c0a068] outline-none font-bold text-slate-900" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Stawka Brutto (PLN)</label>
                <input type="number" step="0.01" value={grossRate} onChange={(e) => setGrossRate(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c0a068] outline-none font-bold text-lg text-slate-900" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  ZUS Wypadkowy (%)
                  {isAccidentRateDisabled && <span className="ml-1 text-[9px] bg-slate-200 px-1 rounded text-slate-500">AUTO</span>}
                </label>
                <input 
                  type="number" 
                  step="0.01" 
                  value={accidentPercent} 
                  onChange={(e) => setAccidentPercent(Number(e.target.value))} 
                  disabled={isAccidentRateDisabled}
                  className={`w-full p-3 border rounded-lg outline-none font-bold text-slate-900 transition-colors ${
                    isAccidentRateDisabled 
                      ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed' 
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#c0a068]'
                  }`} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Marża (%)</label>
                <input type="number" step="0.1" value={marginPercent} onChange={(e) => setMarginPercent(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#c0a068] outline-none font-bold text-slate-900" />
              </div>
            </div>

            <h2 className="text-xl font-bold mt-10 mb-6 flex items-center gap-2 text-[#c0a068]">
              <ShieldAlert size={24} /> Koszty Operacyjne & Inne
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Truck size={14} /> Transport</label>
                <input type="number" value={transportCost} onChange={(e) => setTransportCost(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#c0a068] outline-none text-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Home size={14} /> Zakwaterowanie</label>
                <input type="number" value={housingCost} onChange={(e) => setHousingCost(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#c0a068] outline-none text-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><HeartPulse size={14} /> Badania Lekarskie</label>
                <input type="number" value={medicalExamCost} onChange={(e) => setMedicalExamCost(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#c0a068] outline-none text-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><HardHat size={14} /> Szkolenie BHP</label>
                <input type="number" value={bhpTrainingCost} onChange={(e) => setBhpTrainingCost(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#c0a068] outline-none text-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileCheck size={14} /> Sanepid</label>
                <input type="number" value={sanepidCost} onChange={(e) => setSanepidCost(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#c0a068] outline-none text-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Shirt size={14} /> Odzież Robocza</label>
                <input type="number" value={workClothingCost} onChange={(e) => setWorkClothingCost(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#c0a068] outline-none text-slate-900" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#396542] text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden ring-4 ring-[#c0a068]/20">
            <div className="absolute top-0 right-0 p-4 opacity-5 transform rotate-12 scale-150">
              <Calculator size={120} />
            </div>
            <h3 className="text-xs font-black text-[#c0a068] uppercase tracking-widest mb-8 flex items-center gap-2 border-b border-[#c0a068]/20 pb-4">
              <TrendingUp size={16} /> Podgląd stawki finalnej
            </h3>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] text-white/60 uppercase font-black tracking-tighter">Stawka godzinowa (Dla Klienta)</p>
                <p className="text-5xl font-black text-[#c0a068] tracking-tighter">{results.finalHourly.toFixed(2)} <span className="text-xl">zł</span></p>
                <p className="text-[10px] text-white/40 uppercase mt-1 tracking-widest">netto / rbh</p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/60 uppercase font-black">Łączny koszt miesięczny</p>
                <p className="text-3xl font-black text-white">{results.finalMonthly.toLocaleString('pl-PL')} <span className="text-lg">zł</span></p>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <p className="text-[10px] text-white/60 uppercase font-black mb-1">Pracownik otrzymuje (Netto)</p>
                <p className="text-xl font-bold text-[#c0a068]">{results.nettoWorker.toFixed(2)} zł / h</p>
              </div>
            </div>

            <button 
              onClick={() => onGenerate(results)}
              className="w-full mt-10 bg-[#c0a068] hover:bg-[#ac8e5a] text-white font-black py-4 rounded-xl transition-all shadow-lg hover:scale-[1.03] active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3"
            >
              Generuj Ofertę PDF <FileCheck size={20} />
            </button>
          </div>
          
          <div className="bg-[#396542]/10 p-6 rounded-2xl border border-[#396542]/20 flex items-center gap-4">
             <div className="bg-[#396542] p-3 rounded-full text-white">
                <ShieldAlert size={24} />
             </div>
             <div>
                <p className="text-xs font-black text-[#396542] uppercase tracking-tighter">Weryfikacja Kadr</p>
                <p className="text-[11px] text-slate-600 font-medium">Algorytm ZUS zgodny z wytycznymi {entity}.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;