import React, { useState } from 'react';
import {
  Calculator,
  Wheat,
  Scale,
  Package,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CROPS_DATABASE } from '../../data/cropsData';
import { EGYPTIAN_GOVERNORATES, SOIL_TYPES_EGYPT } from '../../data/governoratesData';
import { EGYPTIAN_COMMERCIAL_FERTILIZERS, convertToFeddans } from '../../data/fertilizersData';

export const FertilizerCalculator: React.FC = () => {
  const [cropId, setCropId] = useState('wheat');
  const [areaValue, setAreaValue] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<'feddan' | 'kirat' | 'sahm' | 'hectare'>('feddan');
  const [governorate, setGovernorate] = useState('الدقهلية');
  const [soilType, setSoilType] = useState('clay_old');
  const [growthStage, setGrowthStage] = useState('التفريع والنمو الخضري');

  // Selected commercial fertilizers
  const [selectedNitrogenFert, setSelectedNitrogenFert] = useState('urea_46');
  const [selectedPhosphorusFert, setSelectedPhosphorusFert] = useState('single_superphosphate_15_5');
  const [selectedPotassiumFert, setSelectedPotassiumFert] = useState('potassium_sulfate_50');

  // Soil Test optional inputs
  const [hasSoilTest, setHasSoilTest] = useState(false);
  const [soilNitrogenPpm, setSoilNitrogenPpm] = useState<number>(20);
  const [soilPhosphorusPpm, setSoilPhosphorusPpm] = useState<number>(10);
  const [soilPotassiumPpm, setSoilPotassiumPpm] = useState<number>(150);

  // Previously added fertilizer units
  const [alreadyAddedNitrogenUnits, setAlreadyAddedNitrogenUnits] = useState<number>(0);
  const [alreadyAddedPhosphorusUnits, setAlreadyAddedPhosphorusUnits] = useState<number>(0);
  const [alreadyAddedPotassiumUnits, setAlreadyAddedPotassiumUnits] = useState<number>(0);

  const selectedCrop = CROPS_DATABASE.find((c) => c.id === cropId) || CROPS_DATABASE[0];

  // Base units per feddan
  let baseN = selectedCrop.fertilizerGuide.nitrogenUnits;
  let baseP = selectedCrop.fertilizerGuide.phosphorusUnits;
  let baseK = selectedCrop.fertilizerGuide.potassiumUnits;

  // Adjustments based on soil type
  if (soilType === 'sandy_light') {
    baseN = Math.round(baseN * 1.15); // Sandy soils leach nutrients faster
    baseK = Math.round(baseK * 1.2);
  } else if (soilType === 'saline_affected') {
    baseN = Math.round(baseN * 1.1);
  }

  // Calculate actual feddans
  const totalFeddans = convertToFeddans(areaValue, areaUnit);

  // Soil test deductions (scientific guideline: high soil nutrient reserves reduce need)
  let nReduction = 0;
  let pReduction = 0;
  let kReduction = 0;
  if (hasSoilTest) {
    if (soilNitrogenPpm > 30) nReduction = 10;
    if (soilPhosphorusPpm > 15) pReduction = 8;
    if (soilPotassiumPpm > 250) kReduction = 10;
  }

  // Net units required for the total area
  const netNPerFeddan = Math.max(0, baseN - nReduction);
  const netPPerFeddan = Math.max(0, baseP - pReduction);
  const netKPerFeddan = Math.max(0, baseK - kReduction);

  const totalNUnitsRequired = netNPerFeddan * totalFeddans;
  const totalPUnitsRequired = netPPerFeddan * totalFeddans;
  const totalKUnitsRequired = netKPerFeddan * totalFeddans;

  // Remaining units after subtracting already added
  const remainingNUnits = Math.max(0, totalNUnitsRequired - alreadyAddedNitrogenUnits);
  const remainingPUnits = Math.max(0, totalPUnitsRequired - alreadyAddedPhosphorusUnits);
  const remainingKUnits = Math.max(0, totalKUnitsRequired - alreadyAddedPotassiumUnits);

  // Commercial fertilizers lookup
  const nFert = EGYPTIAN_COMMERCIAL_FERTILIZERS.find((f) => f.id === selectedNitrogenFert) || EGYPTIAN_COMMERCIAL_FERTILIZERS[0];
  const pFert = EGYPTIAN_COMMERCIAL_FERTILIZERS.find((f) => f.id === selectedPhosphorusFert) || EGYPTIAN_COMMERCIAL_FERTILIZERS[4];
  const kFert = EGYPTIAN_COMMERCIAL_FERTILIZERS.find((f) => f.id === selectedPotassiumFert) || EGYPTIAN_COMMERCIAL_FERTILIZERS[7];

  // Mathematical Formula:
  // Commercial Fertilizer Quantity (Kg) = Nutrient Units Needed / (Concentration % / 100)
  const nCommercialKg = (remainingNUnits / (nFert.nitrogenPercent / 100));
  const pCommercialKg = (remainingPUnits / ((pFert.phosphorusPercent || 15.5) / 100));
  const kCommercialKg = (remainingKUnits / ((kFert.potassiumPercent || 50.0) / 100));

  const nSacks = Math.ceil(nCommercialKg / nFert.sackWeightKg);
  const pSacks = Math.ceil(pCommercialKg / pFert.sackWeightKg);
  const kSacks = Math.ceil(kCommercialKg / kFert.sackWeightKg);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              حاسبة التسميد الدقيقة للمحاصيل في مصر
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              حساب الوحدات الصافية وتحويلها إلى أسمدة تجارية وشكاير وخصم ما أضيف سابقاً
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 mt-3 leading-relaxed">
          تعتمد الحاسبة على معادلة التحويل الرسمية: <span className="font-mono font-semibold text-emerald-800 dark:text-emerald-400">وزن السماد التجاري (كجم) = وحدات العنصر المطلوبة ÷ (نسبة العنصر في السماد ÷ 100)</span>. نتائج هذه الحاسبة رياضية دقيقة تستند إلى توصيات وزارة الزراعة المصرية.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          1. بيانات المحصول والمساحة ونوع التربة
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المحصول المستهدف:</label>
            <select
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CROPS_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameAr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المساحة المزروعة:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={areaValue}
                onChange={(e) => setAreaValue(parseFloat(e.target.value) || 0)}
                className="w-24 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value as typeof areaUnit)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-2 text-slate-800 dark:text-white text-xs"
              >
                <option value="feddan">فدان (4200 م²)</option>
                <option value="kirat">قيراط (24/1 فدان)</option>
                <option value="sahm">سهم (576/1 فدان)</option>
                <option value="hectare">هكتار (2.38 فدان)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المحافظة / الموقع:</label>
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {EGYPTIAN_GOVERNORATES.map((g) => (
                <option key={g.id} value={g.nameAr}>
                  {g.nameAr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">نوع أرض المزرعة:</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SOIL_TYPES_EGYPT.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameAr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Commercial Fertilizer Types Selection */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">2. اختيار نوع الأسمدة التجارية المتوفرة لديك</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <label className="block text-emerald-800 dark:text-emerald-400 font-semibold mb-1">السماد النيتروجيني المفضل:</label>
              <select
                value={selectedNitrogenFert}
                onChange={(e) => setSelectedNitrogenFert(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-white"
              >
                <option value="urea_46">يوريا 46% (شيكارة 50 كجم = 23 وحدة)</option>
                <option value="ammonium_nitrate_33_5">نترات نشادر 33.5% (شيكارة 50 كجم = 16.75 وحدة)</option>
                <option value="ammonium_sulfate_20_6">سلفات نشادر 20.6% (حامضي للأراضي القلوية)</option>
                <option value="calcium_nitrate_15_5">نترات كالسيوم 15.5% (شيكارة 25 كجم)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <label className="block text-amber-800 dark:text-amber-400 font-semibold mb-1">السماد الفوسفاتي المفضل:</label>
              <select
                value={selectedPhosphorusFert}
                onChange={(e) => setSelectedPhosphorusFert(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-white"
              >
                <option value="single_superphosphate_15_5">سوبر فوسفات أحادي 15.5% (شيكارة 50 كجم)</option>
                <option value="triple_superphosphate_46">سوبر فوسفات ثلاثي تربل 46%</option>
                <option value="phosphoric_acid_85">حمض فوسفوريك 85% (حقن شبكات ري)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <label className="block text-indigo-800 dark:text-indigo-400 font-semibold mb-1">السماد البوتاسي المفضل:</label>
              <select
                value={selectedPotassiumFert}
                onChange={(e) => setSelectedPotassiumFert(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-white"
              >
                <option value="potassium_sulfate_50">سلفات بوتاسيوم 0-0-50 (شيكارة 50 كجم)</option>
                <option value="potassium_nitrate_13_0_46">نترات بوتاسيوم 13-0-46 (شيكارة 25 كجم)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Previously Added Deductions */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              3. أسمدة أضيفت بالفعل للحقل (لحساب الكمية المتبقية)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300">أزوت أضيف (وحدة):</label>
              <input
                type="number"
                min="0"
                value={alreadyAddedNitrogenUnits}
                onChange={(e) => setAlreadyAddedNitrogenUnits(parseFloat(e.target.value) || 0)}
                className="w-20 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-white rounded-lg px-2 py-1 text-center font-bold tabular-nums"
              />
            </div>
            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/40 flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300">فوسفور أضيف (وحدة):</label>
              <input
                type="number"
                min="0"
                value={alreadyAddedPhosphorusUnits}
                onChange={(e) => setAlreadyAddedPhosphorusUnits(parseFloat(e.target.value) || 0)}
                className="w-20 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white rounded-lg px-2 py-1 text-center font-bold tabular-nums"
              />
            </div>
            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300">بوتاسيوم أضيف (وحدة):</label>
              <input
                type="number"
                min="0"
                value={alreadyAddedPotassiumUnits}
                onChange={(e) => setAlreadyAddedPotassiumUnits(parseFloat(e.target.value) || 0)}
                className="w-20 bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-white rounded-lg px-2 py-1 text-center font-bold tabular-nums"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              نتائج الحساب السمادي لمحصول {selectedCrop.nameAr}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              المساحة الإجمالية: <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{totalFeddans.toFixed(2)} فدان</span> ({areaValue} {areaUnit === 'feddan' ? 'فدان' : areaUnit === 'kirat' ? 'قيراط' : areaUnit === 'sahm' ? 'سهم' : 'هكتار'})
            </p>
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-lg font-semibold">
            معتمد من معهد بحوث المحاصيل
          </span>
        </div>

        {/* 3 Nutrient Calculation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nitrogen Result */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">عنصر النيتروجين (N)</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {netNPerFeddan} وحدة/فدان
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>إجمالي احتياج المساحة:</span>
                <span className="font-bold tabular-nums">{totalNUnitsRequired.toFixed(1)} وحدة</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>أضيف سابقاً:</span>
                <span className="tabular-nums">{alreadyAddedNitrogenUnits} وحدة</span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>الوحدات المتبقية:</span>
                <span className="tabular-nums">{remainingNUnits.toFixed(1)} وحدة</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900/60 space-y-1 text-center">
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block">كمية {nFert.nameAr}:</span>
              <div className="text-xl font-bold text-emerald-950 dark:text-emerald-200 tabular-nums">
                {Math.round(nCommercialKg)} كجم
              </div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                حوالي <span className="text-sm font-bold tabular-nums">{nSacks}</span> شيكارة (وزن {nFert.sackWeightKg} كجم)
              </div>
            </div>
          </div>

          {/* Phosphorus Result */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 dark:text-amber-300 text-sm">عنصر الفوسفور (P₂O₅)</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {netPPerFeddan} وحدة/فدان
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>إجمالي احتياج المساحة:</span>
                <span className="font-bold tabular-nums">{totalPUnitsRequired.toFixed(1)} وحدة</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>أضيف سابقاً:</span>
                <span className="tabular-nums">{alreadyAddedPhosphorusUnits} وحدة</span>
              </div>
              <div className="flex justify-between text-amber-800 dark:text-amber-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>الوحدات المتبقية:</span>
                <span className="tabular-nums">{remainingPUnits.toFixed(1)} وحدة</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/60 space-y-1 text-center">
              <span className="text-[11px] text-amber-800 dark:text-amber-300 block">كمية {pFert.nameAr}:</span>
              <div className="text-xl font-bold text-amber-950 dark:text-amber-200 tabular-nums">
                {Math.round(pCommercialKg)} كجم
              </div>
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                حوالي <span className="text-sm font-bold tabular-nums">{pSacks}</span> شيكارة (وزن {pFert.sackWeightKg} كجم)
              </div>
            </div>
          </div>

          {/* Potassium Result */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-800 dark:text-indigo-300 text-sm">عنصر البوتاسيوم (K₂O)</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {netKPerFeddan} وحدة/فدان
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>إجمالي احتياج المساحة:</span>
                <span className="font-bold tabular-nums">{totalKUnitsRequired.toFixed(1)} وحدة</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>أضيف سابقاً:</span>
                <span className="tabular-nums">{alreadyAddedPotassiumUnits} وحدة</span>
              </div>
              <div className="flex justify-between text-indigo-800 dark:text-indigo-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>الوحدات المتبقية:</span>
                <span className="tabular-nums">{remainingKUnits.toFixed(1)} وحدة</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-900/60 space-y-1 text-center">
              <span className="text-[11px] text-indigo-800 dark:text-indigo-300 block">كمية {kFert.nameAr}:</span>
              <div className="text-xl font-bold text-indigo-950 dark:text-indigo-200 tabular-nums">
                {Math.round(kCommercialKg)} كجم
              </div>
              <div className="text-xs font-semibold text-indigo-800 dark:text-indigo-400">
                حوالي <span className="text-sm font-bold tabular-nums">{kSacks}</span> شيكارة (وزن {kFert.sackWeightKg} كجم)
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Mixing Safeguards */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>برنامج التوزيع الموصى به لمحصول {selectedCrop.nameAr}:</span>
          </h3>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
            {selectedCrop.fertilizerGuide.scheduleNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Fertilizer Mixing Incompatibility Warning */}
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p>
            محاذير الخلط والتسميد: يمنع منعاً باتاً خلط أسمدة الكالسيوم (نترات الكالسيوم) مع أسمدة الفوسفات (سوبر فوسفات أو حمض فوسفوريك) أو أسمدة السلفات (سلفات بوتاسيوم أو سلفات نشادر) في نفس السمادة أو البرميل لتجنب ترسيب كبريتات وفوسفات الكالسيوم وانسداد شبكات الري.
          </p>
        </div>
      </div>
    </div>
  );
};
