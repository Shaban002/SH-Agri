import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { FarmPlot, FarmOperation } from '../../types';
import { CROPS_DATABASE } from '../../data/cropsData';
import { EGYPTIAN_GOVERNORATES, SOIL_TYPES_EGYPT } from '../../data/governoratesData';

export const FarmManager: React.FC = () => {
  const [plots, setPlots] = useState<FarmPlot[]>([
    {
      id: 'plot_1',
      name: 'قطعة الحوض القبلي',
      cropId: 'wheat',
      cropName: 'القمح',
      variety: 'مصر 3 معتمد',
      governorate: 'الدقهلية',
      areaFeddans: 3.5,
      soilType: 'طينية قديمة عالية الخصوبة',
      irrigationMethod: 'flood',
      plantingDate: '2024-11-18',
      notes: 'تمت التسوية الدقيقة بالليزر والزراعة بالتسطير الآلي بمعدل 45 كجم تقاوي/فدان.',
    },
    {
      id: 'plot_2',
      name: 'حوشة البرسيم المستديم',
      cropId: 'berseem_egyptian',
      cropName: 'البرسيم المصري',
      variety: 'مسقاوي خضراوي',
      governorate: 'الدقهلية',
      areaFeddans: 2.0,
      soilType: 'طينية قديمة',
      irrigationMethod: 'flood',
      plantingDate: '2024-10-08',
      notes: 'تم أخذ الحشة الأولى والثانية، جودة العلف ممتازة.',
    },
  ]);

  const [operations, setOperations] = useState<FarmOperation[]>([
    {
      id: 'op_1',
      plotId: 'plot_1',
      date: '2024-12-10',
      type: 'irrigation',
      title: 'رية المحاياة في القمح',
      description: 'ري هادئ بعد 22 يوماً من الزراعة، مع إضافة 150 كجم نترات نشادر.',
      costEgp: 950,
      operator: 'الحاج إبراهيم وعمال الري',
    },
    {
      id: 'op_2',
      plotId: 'plot_1',
      date: '2024-12-28',
      type: 'weeding',
      title: 'نقاوة يدوية لبادرات الزمير',
      description: 'نقاوة مبكرة لحشائش الزمير والفلارس قبل التفريع واستطالة السيقان.',
      costEgp: 400,
      operator: 'عمالة زراعية',
    },
    {
      id: 'op_3',
      plotId: 'plot_2',
      date: '2025-01-10',
      type: 'harvest',
      title: 'الحشة الثانية للبرسيم المسقاوي',
      description: 'حش على ارتفاع 6 سم وإنتاجية 22 طن علف أخضر لقطعتي البرسيم.',
      costEgp: 600,
      operator: 'عمال الحش',
    },
  ]);

  // Form states for new Plot
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotCropId, setNewPlotCropId] = useState('wheat');
  const [newPlotVariety, setNewPlotVariety] = useState('');
  const [newPlotArea, setNewPlotArea] = useState<number>(2);
  const [newPlotGov, setNewPlotGov] = useState('الدقهلية');
  const [newPlotDate, setNewPlotDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPlotForm, setShowPlotForm] = useState(false);

  // Form states for new Operation
  const [selectedPlotForOp, setSelectedPlotForOp] = useState(plots[0]?.id || 'plot_1');
  const [newOpType, setNewOpType] = useState<FarmOperation['type']>('irrigation');
  const [newOpTitle, setNewOpTitle] = useState('');
  const [newOpDesc, setNewOpDesc] = useState('');
  const [newOpCost, setNewOpCost] = useState<number>(0);

  const handleAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotName) return;

    const cropObj = CROPS_DATABASE.find((c) => c.id === newPlotCropId);

    const newPlot: FarmPlot = {
      id: Date.now().toString(),
      name: newPlotName,
      cropId: newPlotCropId,
      cropName: cropObj ? cropObj.nameAr : 'محصول',
      variety: newPlotVariety || 'صنف معتمد',
      governorate: newPlotGov,
      areaFeddans: newPlotArea,
      soilType: 'طينية أو صفراء',
      irrigationMethod: 'flood',
      plantingDate: newPlotDate,
    };

    setPlots([...plots, newPlot]);
    setNewPlotName('');
    setNewPlotVariety('');
    setShowPlotForm(false);
  };

  const handleAddOperation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpTitle) return;

    const newOp: FarmOperation = {
      id: Date.now().toString(),
      plotId: selectedPlotForOp,
      date: new Date().toISOString().split('T')[0],
      type: newOpType,
      title: newOpTitle,
      description: newOpDesc,
      costEgp: newOpCost > 0 ? newOpCost : undefined,
    };

    setOperations([newOp, ...operations]);
    setNewOpTitle('');
    setNewOpDesc('');
    setNewOpCost(0);
  };

  const handleDeletePlot = (id: string) => {
    setPlots(plots.filter((p) => p.id !== id));
  };

  const handleDeleteOp = (id: string) => {
    setOperations(operations.filter((o) => o.id !== id));
  };

  const totalFeddans = plots.reduce((acc, p) => acc + p.areaFeddans, 0);
  const totalCostRecorded = operations.reduce((acc, o) => acc + (o.costEgp || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              إدارة المزرعة والسجل الزراعي الميداني
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              سجل القطع الزراعية، المحاصيل، والعمليات الميدانية اليومية (ري، تسميد، مكافحة، حصاد)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">إجمالي القطع المزروعة</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{plots.length}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">قطعة زراعية</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block">المساحة الإجمالية</span>
            <span className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 tabular-nums">{totalFeddans.toFixed(1)}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">فدان</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">إجمالي التكاليف المسجلة</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{totalCostRecorded.toLocaleString('ar-EG')}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">جنيه مصري</span>
          </div>
        </div>
      </div>

      {/* Plots Management Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">القطع الزراعية بالمزرعة</h2>
          <button
            onClick={() => setShowPlotForm(!showPlotForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة قطعة جديدة</span>
          </button>
        </div>

        {/* Add Plot Form */}
        {showPlotForm && (
          <form onSubmit={handleAddPlot} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">بيانات القطعة الزراعية:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">اسم القطعة أو الحوشة:</label>
                <input
                  type="text"
                  value={newPlotName}
                  onChange={(e) => setNewPlotName(e.target.value)}
                  placeholder="مثال: حوض الجنينة الشرقي"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">المحصول المنزرع:</label>
                <select
                  value={newPlotCropId}
                  onChange={(e) => setNewPlotCropId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
                >
                  {CROPS_DATABASE.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">الصنف:</label>
                <input
                  type="text"
                  value={newPlotVariety}
                  onChange={(e) => setNewPlotVariety(e.target.value)}
                  placeholder="مثال: جيزة 171"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">المساحة (فدان):</label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  value={newPlotArea}
                  onChange={(e) => setNewPlotArea(parseFloat(e.target.value) || 1)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">المحافظة:</label>
                <select
                  value={newPlotGov}
                  onChange={(e) => setNewPlotGov(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
                >
                  {EGYPTIAN_GOVERNORATES.map((g) => (
                    <option key={g.id} value={g.nameAr}>
                      {g.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">تاريخ الزراعة:</label>
                <input
                  type="date"
                  value={newPlotDate}
                  onChange={(e) => setNewPlotDate(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowPlotForm(false)}
                className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-500"
              >
                حفظ القطعة
              </button>
            </div>
          </form>
        )}

        {/* Plots List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plots.map((plot) => (
            <div
              key={plot.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{plot.name}</h3>
                  <div className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold mt-0.5">
                    {plot.cropName} ({plot.variety})
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePlot(plot.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 opacity-60 group-hover:opacity-100 transition-opacity"
                  title="حذف القطعة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3 pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>المساحة: <strong className="tabular-nums text-slate-900 dark:text-white">{plot.areaFeddans} فدان</strong></span>
                <span>·</span>
                <span>تاريخ الزراعة: <strong className="font-mono text-slate-900 dark:text-white">{plot.plantingDate}</strong></span>
              </div>
              {plot.notes && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">{plot.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural Operations Log */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          سجل العمليات الزراعية اليومية
        </h2>

        {/* Add Operation Form */}
        <form onSubmit={handleAddOperation} className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">تسجيل معاملة زراعية جديدة:</span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">القطعة المستهدفة:</label>
              <select
                value={selectedPlotForOp}
                onChange={(e) => setSelectedPlotForOp(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
              >
                {plots.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.cropName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">نوع المعاملة:</label>
              <select
                value={newOpType}
                onChange={(e) => setNewOpType(e.target.value as typeof newOpType)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5"
              >
                <option value="irrigation">ري ومياه</option>
                <option value="fertilization">تسميد وإضافة مغذيات</option>
                <option value="pesticide">رش مبيد أو مكافحة وقائية</option>
                <option value="weeding">عزيق ونقاوة حشائش</option>
                <option value="harvest">حصاد أو حش</option>
                <option value="soil_work">حرث وتجهيز أرض</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">عنوان المعاملة:</label>
              <input
                type="text"
                value={newOpTitle}
                onChange={(e) => setNewOpTitle(e.target.value)}
                placeholder="مثال: رية المحاياة، رش كوراجين"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">التكلفة الإجمالية (جنيه):</label>
              <input
                type="number"
                min="0"
                value={newOpCost}
                onChange={(e) => setNewOpCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 tabular-nums text-center font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1 text-xs">التفاصيل والملاحظات:</label>
            <input
              type="text"
              value={newOpDesc}
              onChange={(e) => setNewOpDesc(e.target.value)}
              placeholder="مثال: تم إضافة 2 شيكارة يوريا + الرش في الصباح الباكر مع هدوء الرياح"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg px-2.5 py-1.5 text-xs"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة العملية إلى السجل</span>
          </button>
        </form>

        {/* Operations Timeline List */}
        <div className="space-y-2">
          {operations.map((op) => {
            const plotObj = plots.find((p) => p.id === op.plotId);
            return (
              <div
                key={op.id}
                className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between text-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white">{op.title}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{plotObj?.name || 'قطعة بالمزرعة'}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">{op.date}</span>
                    {op.costEgp && (
                      <>
                        <span className="text-slate-400">·</span>
                        <span className="font-bold text-amber-800 dark:text-amber-400 tabular-nums">{op.costEgp.toLocaleString('ar-EG')} جنيه</span>
                      </>
                    )}
                  </div>
                  {op.description && <p className="text-slate-600 dark:text-slate-300">{op.description}</p>}
                </div>

                <button
                  onClick={() => handleDeleteOp(op.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
