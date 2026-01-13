import React, { useState } from 'react';
import Offer from './components/Offer';
import CalculatorForm from './components/CalculatorForm';

export type CalculationData = {
  clientName: string;
  grossRate: number;
  hours: number;
  transportCost: number;
  housingCost: number;
  medicalExamCost: number;
  bhpTrainingCost: number;
  sanepidCost: number;
  workClothingCost: number;
  marginPercent: number;
  // Wyniki obliczeń
  podstawaZus: number;
  emerytalna: number;
  rentowa: number;
  wypadkowa: number;
  fp: number;
  fgsp: number;
  marzaKwota: number;
  finalMonthly: number;
  finalHourly: number;
  nettoWorker: number;
};

const App: React.FC = () => {
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [data, setData] = useState<CalculationData | null>(null);

  const handleGenerate = (calculatedData: CalculationData) => {
    setData(calculatedData);
    setView('preview');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {view === 'edit' ? (
        <CalculatorForm onGenerate={handleGenerate} initialData={data} />
      ) : (
        <div className="relative">
          <button 
            onClick={() => setView('edit')}
            className="fixed top-8 left-8 bg-slate-800 text-white px-6 py-2 rounded-full shadow-xl hover:bg-slate-700 transition-all z-50 print:hidden font-bold flex items-center gap-2"
          >
            ← Wróć do edycji
          </button>
          <Offer data={data!} />
        </div>
      )}
    </div>
  );
};

export default App;