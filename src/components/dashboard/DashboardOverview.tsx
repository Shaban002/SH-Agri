import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Bug,
  BookOpen,
  Wheat,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { WeatherData, Governorate } from '../../types';
import { EGYPTIAN_GOVERNORATES } from '../../data/governoratesData';
import { CROPS_DATABASE } from '../../data/cropsData';

interface DashboardProps {
  weather: WeatherData | null;
  loadingWeather: boolean;
  selectedGov: Governorate;
  onSelectGov: (gov: Governorate) => void;
  setActiveTab: (tab: string) => void;
  onSelectCrop: (cropId: string) => void;
  onAskQuery: (query: string) => void;
}

export const DashboardOverview: React.FC<DashboardProps> = ({
  weather,
  loadingWeather,
  selectedGov,
  onSelectGov,
  setActiveTab,
  onSelectCrop,
  onAskQuery,
}) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;
    onAskQuery(quickQuery);
    setActiveTab('assistant');
  };

  const monitoredCrops = CROPS_DATABASE.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* 1. Hero Section with Real Egypt Agricultural Image & Search */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0">
          <img
            src="/images/hero_egypt_agriculture_1792615520068.jpg"
            alt="حقول زراعية مصرية خضراء في الدلتا"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30" />
        </div>

        <div className="relative max-w-4xl px-4 py-8 sm:px-10 sm:py-14 space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>جمهورية مصر العربية</span>
              <span aria-hidden="true">·</span>
              <span>مركز البحوث الزراعية & وزارة الزراعة</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">الموسم الزراعي 2024-2025</span>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
              منصة المساعد والمهندس الزراعي الذكي في مصر
            </h1>
            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              مرجعك الرقمي الموثق: إدارة المحاصيل، مكافحة الآفات والحشائش، حسابات التسميد العلمية، ترشيد مياه الري، ومتابعة حشات البرسيم وفق النشرات الرسمية المعتمدة.
            </p>
          </div>

          {/* Quick Question / RAG Input Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md p-1.5 focus-within:ring-2 focus-within:ring-emerald-500 min-w-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="اسأل عن أي محصول، مرض، آفة، أو جرعة سماد..."
                className="w-full min-w-0 bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm px-2 py-2 focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">استشر الآن</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5 text-[11px] text-slate-300">
              <span className="text-emerald-400 font-medium shrink-0">أسئلة شائعة:</span>
              <button
                type="button"
                onClick={() => {
                  onAskQuery('ما برنامج تسميد القمح للفدان في الأراضي الطينية؟');
                  setActiveTab('assistant');
                }}
                className="hover:text-white underline underline-offset-2"
              >
                تسميد القمح
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  onAskQuery('كيف أتعامل مع الحامول في البرسيم المصري؟');
                  setActiveTab('assistant');
                }}
                className="hover:text-white underline underline-offset-2"
              >
                مكافحة الحامول
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  onAskQuery('ما أعراض دودة الحشد الخريفية في الذرة وطرق مكافحتها؟');
                  setActiveTab('assistant');
                }}
                className="hover:text-white underline underline-offset-2"
              >
                دودة الحشد بالذرة
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. Fast Access Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          {
            id: 'crops',
            title: 'دليل المحاصيل',
            desc: '10 محاصيل رئيسية بالتفصيل',
            icon: Wheat,
            color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40',
          },
          {
            id: 'ipm',
            title: 'المكافحة والمبيدات',
            desc: 'أمراض وآفات ومبيدات APC',
            icon: Bug,
            color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40',
          },
          {
            id: 'fertilizer',
            title: 'حاسبة التسميد',
            desc: 'وحدات NPK والشكاير للفدان',
            icon: Calculator,
            color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
          },
          {
            id: 'irrigation',
            title: 'إدارة الري',
            desc: 'حساب ETc ومواعيد السقي',
            icon: Droplets,
            color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40',
          },
          {
            id: 'berseem',
            title: 'البرسيم والحشات',
            desc: 'المصري والحجازي والحش',
            icon: Layers,
            color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40',
          },
          {
            id: 'economics',
            title: 'التكاليف والأرباح',
            desc: 'حساب العائد وصافي الربح',
            icon: TrendingUp,
            color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40',
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-right hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${item.color}`}>
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Live Weather & Agro-Climatic Intelligence */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                بيانات الطقس والتنبيهات الزراعية (Open-Meteo)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                بيانات حية محدثة مباشرة لمحطات الرصد الجوي في المحافظات المصرية
              </p>
            </div>
          </div>

          {/* Governorate Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="gov-select" className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
              المحافظة:
            </label>
            <select
              id="gov-select"
              value={selectedGov.id}
              onChange={(e) => {
                const found = EGYPTIAN_GOVERNORATES.find((g) => g.id === e.target.value);
                if (found) onSelectGov(found);
              }}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {EGYPTIAN_GOVERNORATES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nameAr} ({g.regionAr})
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadingWeather ? (
          <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
            جاري جلب أحدث بيانات الطقس لمحافظة {selectedGov.nameAr}...
          </div>
        ) : weather ? (
          <div className="pt-4 space-y-4">
            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">الحرارة الحالية</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {weather.currentTemp}°
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">مئوية</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                  العظمى {weather.tempMax}° / الصغرى {weather.tempMin}°
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">الرطوبة النسبية</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {weather.humidity}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                  {weather.humidity >= 75 ? 'عالية (تزيد فرصة الفطريات)' : 'معتدلة وطبيعية'}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">سرعة الرياح</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {weather.windSpeed}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">كم/س</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                  {weather.windSpeed >= 25 ? 'نشطة (ممنوع ري القمح)' : 'هادئة وملائمة للرش'}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">البخر نتح المرجعي ET₀</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {weather.et0}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">ملم/يوم</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                  مؤشر الاحتياج المائي للفاو
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700/60 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">احتمال المطر</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {weather.rainProbability}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                  {weather.conditionText}
                </span>
              </div>
            </div>

            {/* Weather alerts if any */}
            {weather.alerts && weather.alerts.length > 0 && (
              <div className="space-y-2">
                {weather.alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 4. Monitored Crops Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">المحاصيل المدعومة في المنصة</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              دليل شامل بالمعاملات الزراعية والأصناف والتسميد المعتمد بمصر
            </p>
          </div>
          <button
            onClick={() => setActiveTab('crops')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1"
          >
            <span>عرض جميع المحاصيل (10)</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {monitoredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop.id)}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              {crop.image ? (
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={crop.image}
                    alt={crop.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-medium">
                    {crop.categoryAr}
                  </div>
                </div>
              ) : (
                <div className="h-36 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Wheat className="w-10 h-10" />
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {crop.nameAr}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 italic">
                      {crop.scientificName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {crop.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>الأصناف: {crop.varieties.length} أصناف معتمدة</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-[-2px] transition-transform">
                    تفاصيل ←
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Seasonal Operations & Recommendations Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            أهم العمليات والتنبيهات الميدانية للموسم الحالي
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>متابعة رية المحاياة في القمح</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              تجرى بعد 21-25 يوماً من الزراعة، مع إضافة الدفعة الأولى من التسميد الأزوتي (نصف المقرر = حوالي 80 كجم يوريا أو 115 كجم نترات نشادر للفدان).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>الحشة الثانية في البرسيم المصري</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              تجرى بعد 30-35 يوماً من الحشة الأولى. يراعى الحش على ارتفاع 5-7 سم لحماية منطقة التاج وإضافة 50 كجم سلفات بوتاسيوم فور الحش.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-800/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-sky-900 dark:text-sky-300 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>فطام بنجر السكر للعروة المبكرة</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              للعروات المزروعة في أغسطس، يجب منع الري نهائياً قبل التقليع بـ 25-30 يوماً وتجنب أي سماد أزوتي لرفع تركيز السكروز ومنع تعفن الجذور.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
