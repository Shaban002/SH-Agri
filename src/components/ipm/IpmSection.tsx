import React, { useState } from 'react';
import {
  Bug,
  ShieldCheck,
  Search,
  Filter,
  AlertTriangle,
  FileCheck2,
  Sprout,
  Eye,
  Crosshair,
  Beaker,
  Clock,
  Wheat,
} from 'lucide-react';
import { PESTS_AND_DISEASES_DATABASE, PESTICIDES_DATABASE } from '../../data/pestsDiseasesData';
import { PestOrDisease, PesticideRegistration } from '../../types';

export const IpmSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all_problems' | 'diseases' | 'pests' | 'weeds' | 'pesticides' | 'ipm_pyramid'>('all_problems');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');
  const [selectedPestModal, setSelectedPestModal] = useState<PestOrDisease | null>(null);

  // Filter problems
  const filteredProblems = PESTS_AND_DISEASES_DATABASE.filter((item) => {
    const matchesSearch =
      item.nameAr.includes(searchQuery) ||
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetCrops.some((c) => c.includes(searchQuery));

    const matchesCrop =
      selectedCropFilter === 'all' || item.targetCrops.some((c) => c === selectedCropFilter);

    if (activeTab === 'diseases') {
      return matchesSearch && matchesCrop && item.type === 'fungal';
    }
    if (activeTab === 'pests') {
      return matchesSearch && matchesCrop && (item.type === 'pest_caterpillar' || item.type === 'pest_sucking');
    }
    if (activeTab === 'weeds') {
      return matchesSearch && matchesCrop && (item.type === 'weed_grassy' || item.type === 'weed_parasitic');
    }

    return matchesSearch && matchesCrop;
  });

  // Filter pesticides
  const filteredPesticides = PESTICIDES_DATABASE.filter((pest) => {
    return (
      pest.tradeName.includes(searchQuery) ||
      pest.activeIngredient.includes(searchQuery) ||
      pest.targetProblem.includes(searchQuery) ||
      pest.cropsRegistered.some((c) => c.includes(searchQuery))
    );
  });

  const cropsList = [
    { id: 'all', label: 'جميع المحاصيل' },
    { id: 'القمح', label: 'القمح' },
    { id: 'البرسيم المصري', label: 'البرسيم المصري' },
    { id: 'البرسيم الحجازي', label: 'البرسيم الحجازي' },
    { id: 'الذرة الشامية', label: 'الذرة الشامية' },
    { id: 'الأرز', label: 'الأرز' },
    { id: 'الفول البلدي', label: 'الفول البلدي' },
    { id: 'القطن المصري', label: 'القطن المصري' },
    { id: 'بنجر السكر', label: 'بنجر السكر' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                الأمراض والآفات والحشائش والمكافحة المتكاملة (IPM)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                الدليل المتكامل لوقاية المحاصيل وقاعدة بيانات المبيدات المسجلة رسمياً بمصر
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن آفة، مرض، حشيشة، أو مبيد..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl pr-9 pl-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Navigation Tabs (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1">
          {[
            { id: 'all_problems', label: 'جميع الآفات والأمراض' },
            { id: 'diseases', label: 'الأمراض النباتية والفطرية' },
            { id: 'pests', label: 'الحشرات والديدان' },
            { id: 'weeds', label: 'الحشائش (بما فيها الهالوك والحامول)' },
            { id: 'pesticides', label: 'سجل المبيدات المسجلة (APC)' },
            { id: 'ipm_pyramid', label: 'هرم المكافحة المتكاملة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-rose-700 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Crop Filter Bar */}
        {activeTab !== 'pesticides' && activeTab !== 'ipm_pyramid' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap shrink-0">
              تصفية حسب المحصول:
            </span>
            {cropsList.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCropFilter(c.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-colors whitespace-nowrap shrink-0 ${
                  selectedCropFilter === c.id
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white font-medium'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View 1: Pests and Diseases Grid */}
      {(activeTab === 'all_problems' || activeTab === 'diseases' || activeTab === 'pests' || activeTab === 'weeds') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{problem.nameAr}</h3>
                    <span className="text-xs font-mono text-slate-400 italic">
                      {problem.scientificName}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                    {problem.typeAr}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">المحاصيل العائلة:</span>
                  <span>{problem.targetCrops.join(' · ')}</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                  <span className="font-bold text-slate-900 dark:text-white block text-[11px]">الأعراض المميزة:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
                    {problem.symptoms.slice(0, 2).map((s, idx) => (
                      <li key={idx} className="line-clamp-2">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* IPM Summary & Button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                  <span className="font-bold block text-[11px]">التشخيص والحد الحرج:</span>
                  <p className="line-clamp-2">{problem.economicThreshold}</p>
                </div>

                <button
                  onClick={() => setSelectedPestModal(problem)}
                  className="w-full py-2 bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>عرض خطوات المكافحة المتكاملة الكاملة</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Registered Pesticides Table */}
      {activeTab === 'pesticides' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                قاعدة بيانات المنتجات والمبيدات المسجلة رسمياً (APC)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                بيانات معتمدة من لجنة مبيدات الآفات الزراعية - وزارة الزراعة المصرية
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              <FileCheck2 className="w-4 h-4" />
              <span>بيانات موثقة رسمياً</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">الاسم التجاري والمادة الفعالة</th>
                  <th className="px-4 py-3">الآفة أو المرض المستهدف</th>
                  <th className="px-4 py-3">المحاصيل المسجلة</th>
                  <th className="px-4 py-3">الجرعة المعتمدة</th>
                  <th className="px-4 py-3 text-center">فترة الأمان (PHI)</th>
                  <th className="px-4 py-3">الشركة ورقم التسجيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-300">
                {filteredPesticides.map((pest) => (
                  <tr key={pest.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white">{pest.tradeName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{pest.activeIngredient} ({pest.concentration})</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-rose-800 dark:text-rose-400">
                      {pest.targetProblem}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {pest.cropsRegistered.map((c, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[11px] text-slate-700 dark:text-slate-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-800 dark:text-emerald-400 tabular-nums">
                      {pest.approvedDose}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                      {pest.phiDays} يوماً
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <div>{pest.manufacturer}</div>
                      <div className="font-mono text-slate-400 dark:text-slate-500">{pest.registrationNumber}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border-t border-amber-200 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              تنبيه قانوني وتنظيمي: لا يتم استخدام أي مبيد زراعي إلا بالجرعة المقررة والمدونة على البطاقة الاستدلالية الرسمية وللمحصول المسجل عليه فقط. يراعى الالتزام الصارم بفترة ما قبل الحصاد (PHI) لحماية صحة المستهلك المصري وسلامة الصادرات الزراعية.
            </p>
          </div>
        </div>
      )}

      {/* View 3: IPM Pyramid & Best Practices */}
      {activeTab === 'ipm_pyramid' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              هرم المكافحة المتكاملة لآفات المحاصيل (IPM) في مصر
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ترتيب خيارات المكافحة تصاعدياً من الأساس الوقائي حتى التدخل الكيميائي كحل أخير
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
                <span>الوقاية والممارسات الزراعية السليمة (الأساس الراسخ)</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed pr-8">
                زراعة أصناف معتمدة ومقاومة للأمراض (مثل قمح جيزة 171 وفول جيزة 843 المقاوم للهالوك)، اتباع دورة زراعية ثلاثية متوازنة، ضبط ميعاد الزراعة دون تبكير أو تأخير، التسوية الدقيقة بالليزر لضبط توزيع المياه، والتخلص من بقايا المحصول السابق.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">2</span>
                <span>الرصد والتعرف وتحديد الحد الاقتصادي الحرج</span>
              </div>
              <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed pr-8">
                فحص الحقول دورياً كل أسبوع، فحص أوراق القمح السفلية لاكتشاف الصدأ الأصفر مبكراً، واستخدام المصائد الفرمونية والضوئية لرصد فراشات دودة الحشد وديدان اللوز، وعدم الرش إلا عند تجاوز الإصابة للعتبة الاقتصادية الحرجة.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">3</span>
                <span>الوسائل الميكانيكية والفيزيائية</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed pr-8">
                النقاوة اليدوية للحشائش (كالزمير في القمح والحامول في البرسيم)، جمع وإعدام لطع بيض دودة ورق القطن في الصباح الباكر، واستخدام الشباك والمصائد اللاصقة الملونة داخل الصوب.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">4</span>
                <span>الوسائل الحيوية والأعداء الطبيعية</span>
              </div>
              <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed pr-8">
                تشجيع المفترسات الحشرية المحلية (مثل حشرة أبو العيد وأسد المن وذباب السيرفس)، واستخدام بكتيريا الباسيلس (Bacillus thuringiensis) لمكافحة دودة الحشد باليرقات الأولى، ومستحضرات فطر التريكوديرما لمكافحة أعفان الجذور.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">5</span>
                <span>الوسائل الكيميائية كخيار أخير وبمبيدات مسجلة فقط</span>
              </div>
              <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed pr-8">
                استخدام المبيدات المتخصصة ذات آلية التأثير المحددة، تبديل مجاميع المبيدات لتجنب تكوين المناعة الحشرية، الالتزام بالجرعة دون زيادة، ومراعاة فترة ما قبل الحصاد (PHI).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Problem */}
      {selectedPestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{selectedPestModal.nameAr}</h3>
                <span className="text-xs font-mono text-slate-400 italic">
                  {selectedPestModal.scientificName}
                </span>
              </div>
              <button
                onClick={() => setSelectedPestModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">الأعراض التفصيلية:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  {selectedPestModal.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">التشخيص التفريقي:</h4>
                <p className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  {selectedPestModal.differentialDiagnosis}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">برنامج المكافحة المتكاملة (IPM) المعتمد:</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">1. الوقاية الزراعية:</span> {selectedPestModal.ipmSteps.prevention}
                  </div>
                  <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-100 dark:border-sky-900/50">
                    <span className="font-bold text-sky-800 dark:text-sky-300">2. الرصد والمتابعة:</span> {selectedPestModal.ipmSteps.monitoring}
                  </div>
                  <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-100 dark:border-purple-900/50">
                    <span className="font-bold text-purple-800 dark:text-purple-300">3. المكافحة الحيوية:</span> {selectedPestModal.ipmSteps.biological}
                  </div>
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-100 dark:border-rose-900/50">
                    <span className="font-bold text-rose-800 dark:text-rose-300">4. التدخل الكيميائي المعتمد:</span> {selectedPestModal.ipmSteps.chemical}
                  </div>
                </div>
              </div>

              {selectedPestModal.approvedPesticides.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">المبيدات المسجلة لهذه الآفة:</h4>
                  <div className="space-y-2">
                    {selectedPestModal.approvedPesticides.map((pest) => (
                      <div key={pest.id} className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">{pest.tradeName} ({pest.activeIngredient})</div>
                        <div className="text-slate-600 dark:text-slate-400 mt-1">الجرعة: {pest.approvedDose} · فترة الأمان PHI: {pest.phiDays} يوماً</div>
                        <div className="text-[11px] text-amber-800 dark:text-amber-400 mt-1">تحذير: {pest.warnings}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
              <button
                onClick={() => setSelectedPestModal(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
