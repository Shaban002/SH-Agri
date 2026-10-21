import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  Scale,
  Receipt,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { CROPS_DATABASE } from '../../data/cropsData';

export const EconomicsCalculator: React.FC = () => {
  const [cropId, setCropId] = useState('wheat');
  const [areaFeddans, setAreaFeddans] = useState<number>(1);

  // Costs (in Egyptian Pounds EGP)
  const [seedCost, setSeedCost] = useState<number>(1400); // تقاوي معتمدة
  const [fertilizerCost, setFertilizerCost] = useState<number>(3800); // أسمدة أزوتية وفوسفاتية وبوتاسيوم
  const [pesticideCost, setPesticideCost] = useState<number>(900); // مبيدات حشائش وفطري
  const [irrigationFuelCost, setIrrigationFuelCost] = useState<number>(1800); // سولار وكهرباء ري
  const [machineryLaborCost, setMachineryLaborCost] = useState<number>(3200); // حرث وتسوية وحصاد ودراس
  const [landRentCost, setLandRentCost] = useState<number>(6000); // إيجار الأرض للموسم أو مصاريف عامة

  // Yield and Revenue
  const [expectedYieldPerFeddan, setExpectedYieldPerFeddan] = useState<number>(24);
  const [yieldUnit, setYieldUnit] = useState<string>('إردب (150 كجم)');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(2000); // سعر توريد القمح 2000 ج للإردب

  // Secondary yield (تبن القمح، قش الأرز، دريس، عروش بنجر)
  const [byProductRevenue, setByProductRevenue] = useState<number>(4500); // تبن

  // Updates defaults when crop changes
  const handleCropChange = (id: string) => {
    setCropId(id);
    if (id === 'wheat') {
      setExpectedYieldPerFeddan(24);
      setYieldUnit('إردب (150 كجم)');
      setSellingPricePerUnit(2000);
      setByProductRevenue(4500);
      setSeedCost(1400);
      setFertilizerCost(3800);
    } else if (id === 'maize') {
      setExpectedYieldPerFeddan(26);
      setYieldUnit('إردب (140 كجم)');
      setSellingPricePerUnit(1800);
      setByProductRevenue(1500);
      setSeedCost(1200);
      setFertilizerCost(4500);
    } else if (id === 'rice') {
      setExpectedYieldPerFeddan(4.2);
      setYieldUnit('طن أرز شعير');
      setSellingPricePerUnit(17000);
      setByProductRevenue(2000);
      setSeedCost(1600);
      setFertilizerCost(3200);
    } else if (id === 'berseem_egyptian') {
      setExpectedYieldPerFeddan(42);
      setYieldUnit('طن علف أخضر (5 حشات)');
      setSellingPricePerUnit(800);
      setByProductRevenue(0);
      setSeedCost(1500);
      setFertilizerCost(2200);
    } else if (id === 'cotton') {
      setExpectedYieldPerFeddan(10.5);
      setYieldUnit('قنطار زهر (157.5 كجم)');
      setSellingPricePerUnit(10000);
      setByProductRevenue(0);
      setSeedCost(1100);
      setFertilizerCost(3900);
    } else if (id === 'sugar_beet') {
      setExpectedYieldPerFeddan(32);
      setYieldUnit('طن بنجر سكر');
      setSellingPricePerUnit(1900);
      setByProductRevenue(2500);
      setSeedCost(1800);
      setFertilizerCost(4200);
    }
  };

  const selectedCrop = CROPS_DATABASE.find((c) => c.id === cropId) || CROPS_DATABASE[0];

  // Calculations per Feddan
  const totalCostPerFeddan =
    seedCost + fertilizerCost + pesticideCost + irrigationFuelCost + machineryLaborCost + landRentCost;

  const primaryRevenuePerFeddan = expectedYieldPerFeddan * sellingPricePerUnit;
  const totalRevenuePerFeddan = primaryRevenuePerFeddan + byProductRevenue;
  const netProfitPerFeddan = totalRevenuePerFeddan - totalCostPerFeddan;
  const roiPercentage = totalCostPerFeddan > 0 ? ((netProfitPerFeddan / totalCostPerFeddan) * 100).toFixed(1) : '0';

  // Calculations for total farm area
  const totalFarmCost = totalCostPerFeddan * areaFeddans;
  const totalFarmRevenue = totalRevenuePerFeddan * areaFeddans;
  const totalFarmNetProfit = netProfitPerFeddan * areaFeddans;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              حساب الإنتاجية والتكاليف والعائد الاقتصادي
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تحليل جدوى المحاصيل المصرية، حساب تكلفة الفدان، وصافي الربح المتوقع
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 mt-3 leading-relaxed">
          جميع الأسعار والتكاليف مبنية على مدخلاتك الحقيقية وأسعار التوريد الرسمية المعلنة. يفصل النظام بوضوح بين التكاليف التشغيلية وصافي العائد للمساحة المزروعة.
        </p>
      </div>

      {/* Main Parameters Setup */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">المحصول المستهدف:</label>
              <select
                value={cropId}
                onChange={(e) => handleCropChange(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {CROPS_DATABASE.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">المساحة (فدان):</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={areaFeddans}
                onChange={(e) => setAreaFeddans(parseFloat(e.target.value) || 1)}
                className="w-20 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold tabular-nums text-center text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            وحدة قياس المحصول: <strong className="text-slate-900 dark:text-white">{yieldUnit}</strong>
          </span>
        </div>

        {/* Cost Breakdown Inputs */}
        <div>
          <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
            1. بنود التكاليف للفدان الواحد (جنيه مصري):
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">تقاوي معتمدة:</label>
              <input
                type="number"
                value={seedCost}
                onChange={(e) => setSeedCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">أسمدة كيميائية ومغذيات:</label>
              <input
                type="number"
                value={fertilizerCost}
                onChange={(e) => setFertilizerCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">مبيدات ومكافحة آفات:</label>
              <input
                type="number"
                value={pesticideCost}
                onChange={(e) => setPesticideCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">الري والوقود والسولار:</label>
              <input
                type="number"
                value={irrigationFuelCost}
                onChange={(e) => setIrrigationFuelCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">العمالة والحرث والحصاد:</label>
              <input
                type="number"
                value={machineryLaborCost}
                onChange={(e) => setMachineryLaborCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">إيجار الأرض أو مصروفات عامة:</label>
              <input
                type="number"
                value={landRentCost}
                onChange={(e) => setLandRentCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>
          </div>
        </div>

        {/* Revenue Inputs */}
        <div className="pt-2">
          <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
            2. الإنتاجية المتوقعة وأسعار البيع والتوريد:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
              <label className="block text-emerald-900 dark:text-emerald-300 font-semibold mb-1">
                الإنتاجية للفدان ({yieldUnit}):
              </label>
              <input
                type="number"
                step="0.5"
                value={expectedYieldPerFeddan}
                onChange={(e) => setExpectedYieldPerFeddan(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
              <label className="block text-emerald-900 dark:text-emerald-300 font-semibold mb-1">
                سعر بيع/توريد الوحدة (جنيه):
              </label>
              <input
                type="number"
                value={sellingPricePerUnit}
                onChange={(e) => setSellingPricePerUnit(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                عائد المنتجات الثانوية (تبن / قش / دريس ج):
              </label>
              <input
                type="number"
                value={byProductRevenue}
                onChange={(e) => setByProductRevenue(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary KPIs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          التحليل المالي وصافي العائد لمساحة {areaFeddans} فدان
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">إجمالي تكاليف المزرعة</span>
            <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
              {totalFarmCost.toLocaleString('ar-EG')}
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">جنيه مصري</span>
          </div>

          <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-900/60">
            <span className="text-[11px] text-sky-800 dark:text-sky-300 block mb-1">إجمالي الإيرادات المتوقعة</span>
            <div className="text-xl font-bold text-sky-950 dark:text-sky-200 tabular-nums">
              {totalFarmRevenue.toLocaleString('ar-EG')}
            </div>
            <span className="text-[10px] text-sky-700 dark:text-sky-400">جنيه مصري</span>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block mb-1">صافي الربح التقديري</span>
            <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 tabular-nums">
              {totalFarmNetProfit.toLocaleString('ar-EG')}
            </div>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400">جنيه مصري للمساحة</span>
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
            <span className="text-[11px] text-indigo-800 dark:text-indigo-300 block mb-1">العائد على الاستثمار (ROI)</span>
            <div className="text-2xl font-bold text-indigo-950 dark:text-indigo-200 tabular-nums">
              {roiPercentage}%
            </div>
            <span className="text-[10px] text-indigo-700 dark:text-indigo-400">نسبة الربح للتكلفة</span>
          </div>
        </div>

        {/* Per Feddan Metrics Table */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-white block">ملخص الفدان الواحد:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300">
            <div>تكلفة الفدان الواحد: <strong className="tabular-nums text-slate-900 dark:text-white">{totalCostPerFeddan.toLocaleString('ar-EG')} جنيه</strong></div>
            <div>إيراد الفدان الواحد: <strong className="tabular-nums text-slate-900 dark:text-white">{totalRevenuePerFeddan.toLocaleString('ar-EG')} جنيه</strong></div>
            <div>صافي ربح الفدان الواحد: <strong className="tabular-nums text-emerald-800 dark:text-emerald-400">{netProfitPerFeddan.toLocaleString('ar-EG')} جنيه</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
