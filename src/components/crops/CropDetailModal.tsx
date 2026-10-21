import React, { useState } from 'react';
import {
  X,
  Wheat,
  Calendar,
  Droplets,
  AlertOctagon,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Crop } from '../../types';

interface CropDetailModalProps {
  crop: Crop | null;
  onClose: () => void;
  onAskAboutCrop: (cropName: string) => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  onClose,
  onAskAboutCrop,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'planting' | 'stages' | 'fertilizer' | 'problems' | 'harvest'>('overview');

  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto transition-colors min-w-0">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 gap-2 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Wheat className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-1.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">{crop.nameAr}</h2>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 italic hidden xs:inline sm:inline">({crop.scientificName})</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="truncate">{crop.categoryAr}</span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">تحديث: {crop.reviewDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onAskAboutCrop(crop.nameAr)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>اسأل الخبير</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons (Segmented Controls) */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs min-w-0">
          {[
            { id: 'overview', label: 'نظرة عامة والأصناف' },
            { id: 'planting', label: 'المواعيد والتربة والتقاوي' },
            { id: 'stages', label: 'مراحل النمو والري' },
            { id: 'fertilizer', label: 'برنامج التسميد المعتمد' },
            { id: 'problems', label: 'الآفات والمكافحة' },
            { id: 'harvest', label: 'الحصاد والإنتاجية' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {crop.image && (
                <div className="rounded-xl overflow-hidden h-40 sm:h-52 relative border border-slate-200 dark:border-slate-800 shadow-sm">
                  <img
                    src={crop.image}
                    alt={crop.nameAr}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3 text-white">
                    <span className="text-xs bg-emerald-600/90 backdrop-blur-sm px-2.5 py-1 rounded-md font-medium shadow-sm">
                      {crop.nameAr} — {crop.categoryAr}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">نبذة عن المحصول وأهميته</h3>
                <p className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {crop.summary}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">الأهمية الاقتصادية في مصر</h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">{crop.economicImportance}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">الأصناف المعتمدة رسمياً بمصر</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {crop.varieties.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">المحافظات والمناطق الأكثر ملاءمة</h3>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {crop.suitableGovernorates.map((gov, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300">
                      {gov}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'planting' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>مواعيد الزراعة بحسب المناطق في مصر</span>
                </h3>
                <div className="space-y-2">
                  {crop.plantingDates.map((pd, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">{pd.region}</span>
                      <span className="text-slate-600 dark:text-slate-300">{pd.dateRange}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">متطلبات التربة والمناخ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">نوع التربة الملائم:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{crop.soilAndClimate.preferredSoil}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">درجة الحموضة (pH):</span>
                    <span className="font-medium text-slate-900 dark:text-white tabular-nums">{crop.soilAndClimate.phRange}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">تحمل الملوحة:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{crop.soilAndClimate.salinityTolerance}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">الحرارة المثلى:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{crop.soilAndClimate.optimalTemp}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">طرق ومعدلات التقاوي المعتمدة للفدان</h3>
                <div className="space-y-2">
                  {crop.seedingRate.map((sr, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-800/40">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{sr.method}</span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 tabular-nums">{sr.rateKgPerFeddan}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">إعداد وتجهيز الأرض والخدمة</h3>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                  {crop.landPreparation.map((lp, i) => (
                    <li key={i}>{lp}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'stages' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">مراحل النمو والاحتياجات المائية والسمادية</h3>
                <div className="space-y-3">
                  {crop.growthStages.map((stage, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {i + 1}. {stage.stageName}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                          {stage.durationDays}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{stage.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5 text-xs">
                        <div className="bg-sky-50/80 dark:bg-sky-950/40 p-2 rounded border border-sky-100 dark:border-sky-800/40 text-sky-900 dark:text-sky-300">
                          <span className="font-semibold block text-[11px]">الري:</span>
                          {stage.irrigationNeeds}
                        </div>
                        <div className="bg-emerald-50/80 dark:bg-emerald-950/40 p-2 rounded border border-emerald-100 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300">
                          <span className="font-semibold block text-[11px]">التسميد:</span>
                          {stage.fertilizationNeeds}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60 space-y-2">
                <h4 className="font-bold text-sky-950 dark:text-sky-200 text-xs flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>دليل إدارة الري للمحصول</span>
                </h4>
                <div className="text-xs text-sky-900 dark:text-sky-300 space-y-1">
                  <div>
                    <span className="font-semibold">رية المحاياة:</span> {crop.irrigationGuide.firstIrrigationMohayah}
                  </div>
                  <div>
                    <span className="font-semibold">إجمالي ريات الدلتا:</span> {crop.irrigationGuide.totalIrrigationsDelta}
                  </div>
                  <div>
                    <span className="font-semibold">إجمالي ريات الصعيد:</span> {crop.irrigationGuide.totalIrrigationsUpperEgypt}
                  </div>
                  <div>
                    <span className="font-semibold">الاحتياج المائي التقديري:</span> {crop.irrigationGuide.waterRequirementsM3}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fertilizer' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">المقرر السمادي الصافي المعتمد (وحدة للفدان)</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">أزوت (N)</span>
                    <span className="text-xl font-bold text-emerald-900 dark:text-emerald-200 tabular-nums">
                      {crop.fertilizerGuide.nitrogenUnits}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">وحدة/فدان</span>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60">
                    <span className="text-[11px] text-amber-700 dark:text-amber-400 block">فوسفور (P₂O₅)</span>
                    <span className="text-xl font-bold text-amber-900 dark:text-amber-200 tabular-nums">
                      {crop.fertilizerGuide.phosphorusUnits}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">وحدة/فدان</span>
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60">
                    <span className="text-[11px] text-indigo-700 dark:text-indigo-400 block">بوتاسيوم (K₂O)</span>
                    <span className="text-xl font-bold text-indigo-900 dark:text-indigo-200 tabular-nums">
                      {crop.fertilizerGuide.potassiumUnits}
                    </span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 block mt-0.5">وحدة/فدان</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">تعليمات ومواعيد التوزيع مع الريات</h3>
                <div className="space-y-2">
                  {crop.fertilizerGuide.scheduleNotes.map((note, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 text-xs">
                <span className="font-bold block mb-1">تنبيه حاسبة التسميد:</span>
                لحساب عدد الشكاير التجارية بدقة (يوريا، نترات، سوبر فوسفات، سلفات بوتاسيوم) وخصم ما أضيف سابقاً، يمكنك استخدام «حاسبة التسميد» المتخصصة بالمنصة.
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">أهم الأمراض الشائعة</h3>
                <div className="flex flex-wrap gap-1.5">
                  {crop.commonProblems.diseases.map((d, i) => (
                    <span key={i} className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-lg text-rose-800 dark:text-rose-300 text-xs">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">أهم الآفات الحشرية والحيوانية</h3>
                <div className="flex flex-wrap gap-1.5">
                  {crop.commonProblems.pests.map((p, i) => (
                    <span key={i} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-amber-900 dark:text-amber-300 text-xs">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">الحشائش المنافسة</h3>
                <div className="flex flex-wrap gap-1.5">
                  {crop.commonProblems.weeds.map((w, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-300 text-xs">
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-rose-800 dark:text-rose-400 text-sm mb-2 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>أخطاء شائعة كارثية يجب تجنبها</span>
                </h3>
                <div className="space-y-2">
                  {crop.commonMistakes.map((m, i) => (
                    <div key={i} className="p-3 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-800/40 text-rose-950 dark:text-rose-300 text-xs leading-relaxed">
                      ❌ {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'harvest' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">علامات النضج والحصاد</h3>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                  {crop.harvesting.signs.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block">متوسط الإنتاجية المتوقعة للفدان:</span>
                <span className="text-lg font-bold text-emerald-950 dark:text-emerald-200 block">
                  {crop.harvesting.expectedYieldPerFeddan}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">معاملات ما بعد الحصاد والتخزين</h3>
                <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                  {crop.harvesting.postHarvest}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>المراجع ومصادر التوصيات الرسمية</span>
                </h3>
                <div className="space-y-2">
                  {crop.references.map((ref, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
                      <span>{ref.source} - {ref.organization}</span>
                      <span className="font-mono text-slate-400 dark:text-slate-500">{ref.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <button
            onClick={() => onAskAboutCrop(crop.nameAr)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>استشر المساعد الذكي بخصوص {crop.nameAr}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
