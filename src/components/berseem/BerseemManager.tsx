import React, { useState } from 'react';
import {
  Layers,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  TrendingUp,
  Wheat,
  Scale,
  Sparkles,
} from 'lucide-react';
import { BerseemCut } from '../../types';

export const BerseemManager: React.FC = () => {
  const [varietyType, setVarietyType] = useState<'egyptian_mesqawi' | 'egyptian_fahl' | 'alfalfa_hijazi'>('egyptian_mesqawi');
  const [areaFeddans, setAreaFeddans] = useState<number>(2);

  // Cuts state
  const [cuts, setCuts] = useState<BerseemCut[]>([
    {
      id: 'cut_1',
      plotId: 'plot_1',
      varietyType: 'egyptian_mesqawi',
      cutNumber: 1,
      cutDate: '2024-12-05',
      regrowthDays: 58,
      yieldGreenTons: 15.5,
      yieldHayTons: 2.8,
      irrigationAfterDays: 3,
      fertilizerAdded: '100 كجم سوبر فوسفات أحادي نثراً قبل الرية',
      notes: 'تم الحش على ارتفاع 6 سم فوق سطح الأرض لضمان سلامة التاج والبراعم، العلف ممتاز وعصيري.',
    },
    {
      id: 'cut_2',
      plotId: 'plot_1',
      varietyType: 'egyptian_mesqawi',
      cutNumber: 2,
      cutDate: '2025-01-10',
      regrowthDays: 36,
      yieldGreenTons: 22.0,
      yieldHayTons: 4.1,
      irrigationAfterDays: 2,
      fertilizerAdded: '50 كجم سلفات بوتاسيوم مع ماء الري',
      notes: 'تفريع كثيف جداً وخلو تام من بؤر الحامول بعد الفحص الدقيق، تم تجفيف نصف الكمية كدريس شتوي.',
    },
  ]);

  // Form for new cut
  const [newCutNumber, setNewCutNumber] = useState<number>(3);
  const [newCutDate, setNewCutDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newRegrowthDays, setNewRegrowthDays] = useState<number>(32);
  const [newYieldGreenTons, setNewYieldGreenTons] = useState<number>(18);
  const [newFertilizer, setNewFertilizer] = useState<string>('50 كجم سوبر فوسفات أحادي');
  const [newNotes, setNewNotes] = useState<string>('');

  const currentCuts = cuts.filter((c) => c.varietyType === varietyType);
  const totalGreenYield = currentCuts.reduce((acc, c) => acc + c.yieldGreenTons, 0);
  const avgYieldPerFeddan = areaFeddans > 0 ? (totalGreenYield / areaFeddans).toFixed(1) : '0';

  const handleAddCut = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: BerseemCut = {
      id: Date.now().toString(),
      plotId: 'plot_custom',
      varietyType,
      cutNumber: newCutNumber,
      cutDate: newCutDate,
      regrowthDays: newRegrowthDays,
      yieldGreenTons: newYieldGreenTons,
      yieldHayTons: parseFloat((newYieldGreenTons * 0.18).toFixed(1)),
      irrigationAfterDays: 3,
      fertilizerAdded: newFertilizer,
      notes: newNotes || 'تم الحش بنجاح وفق التوصية.',
    };

    setCuts([...cuts, newEntry]);
    setNewCutNumber(newCutNumber + 1);
    setNewNotes('');
  };

  const handleDeleteCut = (id: string) => {
    setCuts(cuts.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              إدارة البرسيم ومتابعة الحشات والإنتاجية
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              متابعة متخصصة للبرسيم المصري (مسقاوي / فحل) والبرسيم الحجازي المعمر
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 mt-3 leading-relaxed">
          البرسيم هو حجر الزاوية للأمن العلفي والخصوبة الحيوية في مصر. يدعم هذا القسم تسجيل كل حشة وتاريخها وكمية المحصول وتوصيات التسميد والري بعد كل حش لسرعة تجدد التفريع.
        </p>
      </div>

      {/* Variety Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">نوع الصنف المزروع:</span>
            <div className="flex items-center gap-1.5 text-xs flex-wrap">
              <button
                type="button"
                onClick={() => setVarietyType('egyptian_mesqawi')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  varietyType === 'egyptian_mesqawi'
                    ? 'bg-green-700 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                برسيم مصري مسقاوي (4-5 حشات)
              </button>
              <button
                type="button"
                onClick={() => setVarietyType('egyptian_fahl')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  varietyType === 'egyptian_fahl'
                    ? 'bg-green-700 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                برسيم مصري فحل (حشة واحدة غزيرة)
              </button>
              <button
                type="button"
                onClick={() => setVarietyType('alfalfa_hijazi')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  varietyType === 'alfalfa_hijazi'
                    ? 'bg-green-700 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                برسيم حجازي معمر (8-10 حشات/سنة)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="text-slate-600 dark:text-slate-400 font-medium">المساحة:</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={areaFeddans}
              onChange={(e) => setAreaFeddans(parseFloat(e.target.value) || 1)}
              className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2 py-1 text-center font-bold tabular-nums"
            />
            <span className="text-slate-600 dark:text-slate-400">فدان</span>
          </div>
        </div>

        {/* Aggregate KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block mb-1">إجمالي الحشات المسجلة</span>
            <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 tabular-nums">{currentCuts.length}</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">حشة مسجلة</span>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/40 rounded-xl border border-green-200 dark:border-green-900/60">
            <span className="text-[11px] text-green-800 dark:text-green-300 block mb-1">إجمالي العلف الأخضر المحصود</span>
            <div className="text-2xl font-bold text-green-950 dark:text-green-200 tabular-nums">{totalGreenYield}</div>
            <span className="text-[10px] text-green-600 dark:text-green-400">طن علف أخضر للمساحة</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">متوسط إنتاجية الفدان</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{avgYieldPerFeddan}</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">طن/فدان تراكمي حتى الآن</span>
          </div>
        </div>
      </div>

      {/* Cuts List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <span>سجل الحشات الميداني</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            {varietyType === 'egyptian_mesqawi' ? 'برسيم مسقاوي' : varietyType === 'egyptian_fahl' ? 'صنف فحل' : 'برسيم حجازي'}
          </span>
        </h2>

        {/* New Cut Form */}
        <form onSubmit={handleAddCut} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">تسجيل حشة جديدة:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">رقم الحشة:</label>
              <input
                type="number"
                min="1"
                max="12"
                value={newCutNumber}
                onChange={(e) => setNewCutNumber(parseInt(e.target.value) || 1)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">تاريخ الحش:</label>
              <input
                type="date"
                value={newCutDate}
                onChange={(e) => setNewCutDate(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">فترة النمو (أيام):</label>
              <input
                type="number"
                value={newRegrowthDays}
                onChange={(e) => setNewRegrowthDays(parseInt(e.target.value) || 30)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums text-center"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">الإنتاج الكلي (طن أخضر):</label>
              <input
                type="number"
                step="0.5"
                value={newYieldGreenTons}
                onChange={(e) => setNewYieldGreenTons(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-emerald-800 dark:text-emerald-400 rounded-lg px-2.5 py-1.5 tabular-nums text-center font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">السماد المضاف بعد الحش (فوسفات / بوتاسيوم):</label>
              <input
                type="text"
                value={newFertilizer}
                onChange={(e) => setNewFertilizer(e.target.value)}
                placeholder="مثال: 50 كجم سوبر فوسفات + رية خفيفة"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">ملاحظات حقلية (فحص الحامول، جودة العلف):</label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="مثال: الحش على ارتفاع 6 سم، لا توجد بؤر حامول"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>حفظ بيانات الحشة</span>
          </button>
        </form>

        {/* Cuts list */}
        <div className="space-y-3">
          {currentCuts.map((cut) => (
            <div
              key={cut.id}
              className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 hover:border-green-400 dark:hover:border-green-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    الحشة رقم {cut.cutNumber}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{cut.cutDate}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">فترة النمو: {cut.regrowthDays} يوماً</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800 tabular-nums">
                    {cut.yieldGreenTons} طن أخضر
                  </span>
                  <button
                    onClick={() => handleDeleteCut(cut.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-750">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">التسميد بعد الحش:</span> {cut.fertilizerAdded}
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-750">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">ملاحظات:</span> {cut.notes}
                </div>
              </div>
            </div>
          ))}

          {currentCuts.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
              لا توجد حشات مسجلة لهذا الصنف بعد. يمكنك تسجيل الحشة الأولى أعلاه.
            </div>
          )}
        </div>
      </div>

      {/* Critical Agronomic Rules for Berseem Harvesting */}
      <div className="bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 p-5 space-y-2 text-xs text-emerald-950 dark:text-emerald-200">
        <h3 className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>القواعد الذهبية لحش البرسيم المصري والحجازي:</span>
        </h3>
        <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 leading-relaxed">
          <li><strong>ارتفاع الحش:</strong> يجب الحش على ارتفاع 5-7 سم فوق سطح التربة لحماية التاج الحامل للبراعم، والحش الجائر قرب الأرض يتلف الحقل.</li>
          <li><strong>الري بعد الحش:</strong> يروى الحقل بعد رفع العلف الأخضر بـ 2-3 أيام لتفادي تعفن الجذور.</li>
          <li><strong>ممنوع الأزوت:</strong> لا يضاف أي سماد نيتروجيني (يوريا أو نترات) بعد الحشات، ويكتفى فقط بإضافة 50 كجم سوبر فوسفات أو سلفات بوتاسيوم.</li>
          <li><strong>مكافحة الحامول:</strong> التفتيش الدوري بعد كل حشة، وتقليع أي بؤرة صفراء وحرقها فوراً قبل انتشارها مع مياه الري.</li>
        </ul>
      </div>
    </div>
  );
};
