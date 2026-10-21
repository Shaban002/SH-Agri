import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { CropCatalog } from './components/crops/CropCatalog';
import { SmartAssistant } from './components/assistant/SmartAssistant';
import { DiagnosticTool } from './components/diagnosis/DiagnosticTool';
import { IpmSection } from './components/ipm/IpmSection';
import { FertilizerCalculator } from './components/fertilizer/FertilizerCalculator';
import { IrrigationManager } from './components/irrigation/IrrigationManager';
import { BerseemManager } from './components/berseem/BerseemManager';
import { FarmManager } from './components/farm/FarmManager';
import { EconomicsCalculator } from './components/economics/EconomicsCalculator';
import { ReferenceLibrary } from './components/library/ReferenceLibrary';
import { AdminControlPanel } from './components/admin/AdminControlPanel';
import { EGYPTIAN_GOVERNORATES } from './data/governoratesData';
import { fetchGovWeather } from './services/weatherService';
import { Governorate, WeatherData } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedGov, setSelectedGov] = useState<Governorate>(EGYPTIAN_GOVERNORATES[0]); // Dakahlia
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  // Dark Mode state with localStorage and documentElement sync
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sh_agri_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('sh_agri_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sh_agri_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Cross-component triggers
  const [selectedCropIdForModal, setSelectedCropIdForModal] = useState<string | null>(null);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string>('');

  // Fetch live weather on governorate change
  useEffect(() => {
    let isMounted = true;
    setLoadingWeather(true);
    fetchGovWeather(selectedGov)
      .then((data) => {
        if (isMounted) {
          setWeather(data);
          setLoadingWeather(false);
        }
      })
      .catch((err) => {
        console.error('Weather error:', err);
        if (isMounted) setLoadingWeather(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedGov]);

  const handleSelectCropFromDashboard = (cropId: string) => {
    setSelectedCropIdForModal(cropId);
    setActiveTab('crops');
  };

  const handleAskAboutCrop = (cropName: string) => {
    setAssistantInitialQuery(`أريد معرفة أهم التوصيات الزراعية لموسم زراعة ${cropName} في مصر (الأصناف، مواعيد الزراعة، التسميد والري)`);
    setActiveTab('assistant');
  };

  const handleAskQuery = (query: string) => {
    setAssistantInitialQuery(query);
    setActiveTab('assistant');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors" dir="rtl">
      {/* Universal Navigation Header with Dark Mode Toggle */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            weather={weather}
            loadingWeather={loadingWeather}
            selectedGov={selectedGov}
            onSelectGov={setSelectedGov}
            setActiveTab={setActiveTab}
            onSelectCrop={handleSelectCropFromDashboard}
            onAskQuery={handleAskQuery}
          />
        )}

        {activeTab === 'crops' && (
          <CropCatalog
            onAskAboutCrop={handleAskAboutCrop}
            selectedCropId={selectedCropIdForModal}
            onClearSelectedCrop={() => setSelectedCropIdForModal(null)}
          />
        )}

        {activeTab === 'assistant' && (
          <SmartAssistant
            initialQuery={assistantInitialQuery}
            onClearInitialQuery={() => setAssistantInitialQuery('')}
          />
        )}

        {activeTab === 'diagnosis' && <DiagnosticTool />}

        {activeTab === 'ipm' && <IpmSection />}

        {activeTab === 'fertilizer' && <FertilizerCalculator />}

        {activeTab === 'irrigation' && <IrrigationManager weather={weather} />}

        {activeTab === 'berseem' && <BerseemManager />}

        {activeTab === 'farm' && <FarmManager />}

        {activeTab === 'economics' && <EconomicsCalculator />}

        {activeTab === 'library' && <ReferenceLibrary />}

        {activeTab === 'admin' && <AdminControlPanel />}
      </main>

      {/* Editorial Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
