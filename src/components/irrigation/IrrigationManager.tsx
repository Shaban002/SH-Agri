import React, { useState } from 'react';
import {
  Droplets,
  Calendar,
  CloudSun,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { CROPS_DATABASE } from '../../data/cropsData';
import { EGYPTIAN_GOVERNORATES, SOIL_TYPES_EGYPT } from '../../data/governoratesData';
import { WeatherData } from '../../types';

interface IrrigationManagerProps {
  weather: WeatherData | null;
}

interface IrrigationLog {
  id: string;
  date: string;
  cropName: string;
  hoursOrM3: string;
  method: string;
  notes: string;
}

export const IrrigationManager: React.FC<IrrigationManagerProps> = ({ weather }) => {
  const [cropId, setCropId] = useState('wheat');
  const [governorate, setGovernorate] = useState('الدقهلية');
  const [soilType, setSoilType] = useState('clay_old');
  const [irrigationMethod, setIrrigationMethod] = useState<'flood' | 'drip' | 'sprinkler'>('flood');
  const [growthStageIndex, setGrowthStageIndex] = useState(1);
  const [areaFeddans, setAreaFeddans] = useState<number>(2);

  // Irrigation Logs
  const [logs, setLogs] = useState<IrrigationLog[]>([
    {
      id: '1',
      date: '2024-11-20',
      cropName: 'القمح',
      hoursOrM3: 'رية المحاياة (غمر هادئ)',
      method: 'ري بالغمر التقليدي',
      notes: 'تمت إضافة الدفعة الأولى من نترات النشادر مع الرية، الأرض شربت باعتدال دون تغريق.',
    },
    {
      id: '2',
      date: '2024-10-15',
      cropName: 'البرسيم المصري',
      hoursOrM3: 'رية التجرية السريعة',
      method: 'ري بالغمر',
      notes: 'بعد 5 أيام من بدار التقاوي في وجود الماء لتثبيت البادرات.',
    },
  ]);

  const [newLogDate, setNewLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [newLogHours, setNewLogHours] = useState('3 ساعات تشغيل');
  const [newLogNotes, setNewLogNotes] = useState('');

  const selectedCrop = CROPS_DATABASE.find((c) => c.id === cropId) || CROPS_DATABASE[0];

  // FAO Crop Coefficient (Kc) values approximation:
  // stage 0: Initial (~0.4 - 0.5)
  // stage 1: Dev (~0.7 - 0.8)
  // stage 2: Mid-season (~1.05 - 1.15)
  // stage 3: Late (~0.6 - 0.7)
  const kcValues = [0.45, 0.75, 1.15, 0.85, 0.5];
  const currentKc = kcValues[growthStageIndex] || 0.85;

  const et0 = weather?.et0 || 4.2; // mm/day
  const etc = parseFloat((et0 * currentKc).toFixed(1)); // mm/day

  // Irrigation efficiency:
  // Flood: 55%, Sprinkler: 78%, Drip: 88%
  const efficiency = irrigationMethod === 'drip' ? 0.88 : irrigationMethod === 'sprinkler' ? 0.78 : 0.55;
  const grossWaterDemandMm = etc / efficiency; // mm/day

  // 1 mm on 1 Feddan (4200 m²) = 4.2 m³ of water
  const dailyM3PerFeddan = parseFloat((grossWaterDemandMm * 4.2).toFixed(1));
  const totalDailyFarmM3 = parseFloat((dailyM3PerFeddan * areaFeddans).toFixed(1));

  // Recommended Irrigation Interval (days) based on Soil water holding capacity
  // Clay: higher holding capacity (intervals 10-14 days in flood)
  // Sandy: low capacity (drip intervals daily or every 2 days)
  let recommendedIntervalDays = 12;
  if (irrigationMethod === 'drip') {
    recommendedIntervalDays = soilType === 'sandy_light' ? 1 : 2;
  } else if (irrigationMethod === 'sprinkler') {
    recommendedIntervalDays = soilType === 'sandy_light' ? 2 : 3;
  } else {
    // Flood
    if (soilType === 'sandy_light') recommendedIntervalDays = 5;
    else if (soilType === 'clay_old') recommendedIntervalDays = 12;
    else recommendedIntervalDays = 8;
  }

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogDate) return;

    const newEntry: IrrigationLog = {
      id: Date.now().toString(),
      date: newLogDate,
      cropName: selectedCrop.nameAr,
      hoursOrM3: newLogHours,
      method: irrigationMethod === 'drip' ? 'ري بالتنقيط' : irrigationMethod === 'sprinkler' ? 'ري بالرش المحوري' : 'ري بالغمر',
      notes: newLogNotes || 'تم الري بنجاح.',
    };

    setLogs([newEntry, ...logs]);
    setNewLogNotes('');
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-sm">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              إدارة الري والاحتياجات المائية (FAO ETc)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              حساب استهلاك المحصول من المياه، فترات الري، وسجل العمليات الفعلي
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 mt-3 leading-relaxed">
          تعتمد المنصة على معادلة منظمة الفاو الدولية لحساب الاحتياج المائي الاسترشادي: <span className="font-mono font-semibold text-cyan-900 dark:text-cyan-400">ETc = ET₀ × Kc</span>، مع مراعاة كفاءة نظام الري (الغمر 55%، الرش 78%، التنقيط 88%)، وبيانات البخر نتح المحدثة من محطات الأرصاد.
        </p>
      </div>

      {/* Field Setup Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          1. معطيات الحقل ونظام الري
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المحصول:</label>
            <select
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {CROPS_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameAr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المساحة (بالفدان):</label>
            <input
              type="number"
              min="0.25"
              step="0.25"
              value={areaFeddans}
              onChange={(e) => setAreaFeddans(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">طريقة الري بالمزرعة:</label>
            <select
              value={irrigationMethod}
              onChange={(e) => setIrrigationMethod(e.target.value as typeof irrigationMethod)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="flood">ري بالغمر التقليدي (كفاءة 55%)</option>
              <option value="drip">ري بالتنقيط الحديث (كفاءة 88%)</option>
              <option value="sprinkler">ري بالرش المحوري Pivot (كفاءة 78%)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">نوع التربة:</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {SOIL_TYPES_EGYPT.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameAr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-700 dark:text-slate-300 font-medium mb-1.5">
            مرحلة النمو الحالية (تحدد معامل المحصول Kc):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { idx: 0, name: 'الإنبات والبادرات', kc: '0.45' },
              { idx: 1, name: 'التفريع والنمو السريع', kc: '0.75' },
              { idx: 2, name: 'التزهير وطرد السنابل', kc: '1.15 (الأعلى استهلاكاً)' },
              { idx: 3, name: 'امتلاء الحبوب والنضج', kc: '0.85' },
            ].map((item) => (
              <button
                key={item.idx}
                type="button"
                onClick={() => setGrowthStageIndex(item.idx)}
                className={`p-3 rounded-xl border text-right transition-all ${
                  growthStageIndex === item.idx
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-cyan-950 dark:text-cyan-200 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-xs">{item.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">Kc: {item.kc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculations & Results */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          2. التقديرات المائية لمحصول {selectedCrop.nameAr}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">البخر نتح المرجعي (ET₀)</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{et0}</div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">ملم/يوم (محطة الطقس)</span>
          </div>

          <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-900/60">
            <span className="text-[11px] text-cyan-800 dark:text-cyan-300 block mb-1">استهلاك المحصول (ETc)</span>
            <div className="text-2xl font-bold text-cyan-950 dark:text-cyan-200 tabular-nums">{etc}</div>
            <span className="text-[10px] text-cyan-700 dark:text-cyan-400">ملم/يوم (Kc = {currentKc})</span>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block mb-1">الاحتياج الإجمالي للفدان</span>
            <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 tabular-nums">{dailyM3PerFeddan}</div>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400">م³ ماء / فدان / يوم</span>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
            <span className="text-[11px] text-indigo-800 dark:text-indigo-300 block mb-1">الفترة التقريبية بين الريات</span>
            <div className="text-2xl font-bold text-indigo-950 dark:text-indigo-200 tabular-nums">{recommendedIntervalDays}</div>
            <span className="text-[10px] text-indigo-700 dark:text-indigo-400">أيام بحسب نظام الري والتربة</span>
          </div>
        </div>

        {/* Agronomic Recommendations for Irrigation */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white block">توصيات الري الرسمية من واقع النشرة الفنية:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">رية المحاياة:</span>
              {selectedCrop.irrigationGuide.firstIrrigationMohayah}
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">مراحل حرجة يمنع فيها التعطيش:</span>
              {selectedCrop.irrigationGuide.criticalStages.join(' · ')}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real Irrigation Logs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <span>3. سجل عمليات الري الفعلية بالمزرعة</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">عدد العمليات المسجلة: {logs.length}</span>
        </h2>

        {/* Add log form */}
        <form onSubmit={handleAddLog} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">تسجيل رية جديدة:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">تاريخ الري:</label>
              <input
                type="date"
                value={newLogDate}
                onChange={(e) => setNewLogDate(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">كمية السقي / الساعات:</label>
              <input
                type="text"
                value={newLogHours}
                onChange={(e) => setNewLogHours(e.target.value)}
                placeholder="مثال: 4 ساعات تشغيل للماكينة أو 350 م3"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">ملاحظات (أسمدة مع الري، طقس):</label>
              <input
                type="text"
                value={newLogNotes}
                onChange={(e) => setNewLogNotes(e.target.value)}
                placeholder="مثال: تم حقن حمض فوسفوريك، الأرض جفت باعتدال"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>حفظ عملية الري بالسجل</span>
          </button>
        </form>

        {/* Logs List */}
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 dark:text-white">{log.cropName}</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">{log.date}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-cyan-800 dark:text-cyan-400 font-medium">{log.hoursOrM3}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 dark:text-slate-400">{log.method}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{log.notes}</p>
              </div>

              <button
                onClick={() => handleDeleteLog(log.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                title="حذف السجل"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
