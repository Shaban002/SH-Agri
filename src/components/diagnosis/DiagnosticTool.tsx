import React, { useState } from 'react';
import {
  Stethoscope,
  Upload,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { CROPS_DATABASE } from '../../data/cropsData';
import { EGYPTIAN_GOVERNORATES, SOIL_TYPES_EGYPT } from '../../data/governoratesData';
import { runAgriculturalDiagnosis, DiagnosisResult } from '../../services/geminiService';

export const DiagnosticTool: React.FC = () => {
  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [selectedGov, setSelectedGov] = useState('الدقهلية');
  const [selectedSoil, setSelectedSoil] = useState('أرض طينية قديمة (أراضي الوادي والدلتا)');
  const [problemCategory, setProblemCategory] = useState('مرض نباتي (فطري أو بكتيري أو فيروسي)');
  const [affectedPlantPart, setAffectedPlantPart] = useState('الأوراق والمجموع الخضري');
  const [spreadScope, setSpreadScope] = useState('بؤر موضعية متفرقة بالحقل');
  const [symptomDetails, setSymptomDetails] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const selectedCrop = CROPS_DATABASE.find((c) => c.id === selectedCropId);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 8 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomDetails.trim() && !imagePreview) {
      alert('يرجى كتابة وصف للأعراض أو رفع صورة للنبات المصاب.');
      return;
    }

    setLoading(true);
    setResult(null);

    const description = `نوع المشكلة المختار: ${problemCategory}
العضو المصاب في النبات: ${affectedPlantPart}
مدى انتشار الإصابة: ${spreadScope}
تفاصيل ووصف الأعراض: ${symptomDetails}`;

    try {
      const res = await runAgriculturalDiagnosis(
        description,
        {
          cropId: selectedCropId,
          cropName: selectedCrop?.nameAr,
          governorate: selectedGov,
          soilType: selectedSoil,
          problemType: problemCategory,
        },
        imagePreview || undefined
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptomDetails('');
    setImagePreview(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              قسم التشخيص الزراعي والتفريقي
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تحليل أعراض المحاصيل (أمراض فطرية، آفات، حشائش، نقص عناصر، أو إجهاد ملوحة)
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 mt-4">
          يساعدك هذا القسم على حصر الاحتمالات التشخيصية قبل تفاقم الإصابة. نجمع أولاً بيانات الحقل، العضو المصاب، ونمط الانتشار، مع إمكانية إرفاق صورة لتحليلها بنموذج الرؤية الحاسوبية.
        </p>
      </div>

      {/* Diagnosis Form */}
      <form onSubmit={handleRunDiagnosis} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 transition-colors">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <span>1. بيانات الحقل والحالة المرضية</span>
          {(symptomDetails || imagePreview || result) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-normal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين</span>
            </button>
          )}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المحصول المصاب:</label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CROPS_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameAr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">المحافظة / الموقع:</label>
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {EGYPTIAN_GOVERNORATES.map((g) => (
                <option key={g.id} value={g.nameAr}>
                  {g.nameAr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">نوع التربة:</label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SOIL_TYPES_EGYPT.map((s) => (
                <option key={s.id} value={s.nameAr}>
                  {s.nameAr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">نوع المشكلة المبدئي:</label>
            <select
              value={problemCategory}
              onChange={(e) => setProblemCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="مرض نباتي (فطري أو بكتيري أو فيروسي)">مرض نباتي (فطري أو بكتيري أو فيروسي)</option>
              <option value="آفة حشرية أو ديدان أو حلم وأكاروس">آفة حشرية أو ديدان أو حلم وأكاروس</option>
              <option value="حشيشة منافسة أو متطفلة (هالوك / حامول)">حشيشة منافسة أو متطفلة (هالوك / حامول)</option>
              <option value="نقص عناصر غذائية واضطراب فسيولوجي">نقص عناصر غذائية واضطراب فسيولوجي</option>
              <option value="مشكلة ري أو ملوحة بالتربة أو مياه الآبار">مشكلة ري أو ملوحة بالتربة أو مياه الآبار</option>
              <option value="أعراض مختلطة أو غير محددة">أعراض مختلطة أو غير محددة</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">مكان ظهور الأعراض:</label>
            <select
              value={affectedPlantPart}
              onChange={(e) => setAffectedPlantPart(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="الأوراق والمجموع الخضري">الأوراق والمجموع الخضري</option>
              <option value="الساق ومنطقة التاج">الساق ومنطقة التاج</option>
              <option value="الجذور وباطن التربة">الجذور وباطن التربة</option>
              <option value="السنابل أو الكيزان أو الثمار">السنابل أو الكيزان أو الثمار</option>
              <option value="كامل النبات بشكل عام (ذبول أو تقزم)">كامل النبات بشكل عام (ذبول أو تقزم)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">مدى انتشار الإصابة بالحقل:</label>
            <select
              value={spreadScope}
              onChange={(e) => setSpreadScope(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="بؤر موضعية متفرقة بالحقل">بؤر موضعية متفرقة بالحقل</option>
              <option value="منتشرة على حواف الحقل المجاورة للمساقي">منتشرة على حواف الحقل المجاورة للمساقي</option>
              <option value="شاملة لجميع أرجاء الحقل بانتظام">شاملة لجميع أرجاء الحقل بانتظام</option>
              <option value="في الأماكن المنخفضة التي تتجمع بها مياه الري">في الأماكن المنخفضة التي تتجمع بها مياه الري</option>
            </select>
          </div>
        </div>

        {/* Symptoms Description & Image Upload */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-700 dark:text-slate-300 font-medium mb-1.5">
              وصف مفصل للأعراض المرئية وملاحظاتك الميدانية:
            </label>
            <textarea
              rows={3}
              value={symptomDetails}
              onChange={(e) => setSymptomDetails(e.target.value)}
              placeholder="مثال: ظهور بقع صفراء مسحوقية في خطوط متوازية على أوراق القمح السفلية بعد الرطوبة الصباحية الكثيفة..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Photo attachment */}
          <div>
            <label className="block text-xs text-slate-700 dark:text-slate-300 font-medium mb-1.5">
              إرفاق صورة للنبات أو العضو المصاب (اختياري - يدعم التحليل البصري الذكي):
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold cursor-pointer border border-dashed border-slate-300 dark:border-slate-700 transition-colors">
                <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>اختر صورة من الهاتف أو الحاسوب</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs">
                  <img src={imagePreview} alt="معاينة الإصابة" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-0 right-0 bg-slate-900/80 text-white text-[10px] p-0.5"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || (!symptomDetails.trim() && !imagePreview)}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>جاري الفحص واستدعاء النشرات والتشخيص التفريقي...</span>
            </>
          ) : (
            <>
              <Stethoscope className="w-4 h-4" />
              <span>تشغيل الفحص والتشخيص التفريقي</span>
            </>
          )}
        </button>
      </form>

      {/* Results Display */}
      {result && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block mb-0.5">نتيجة الفحص الأولي:</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{result.primaryDiagnosis}</h2>
            </div>
            {result.confidenceScore && (
              <span className="text-xs px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800/60 font-semibold self-start sm:self-auto">
                درجة الرجحان: {result.confidenceScore}
              </span>
            )}
          </div>

          {/* Possibilities List */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">الاحتمالات التشخيصية المرتبة:</h3>
            {result.possibilities.map((p, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {idx + 1}. {p.name}
                    </span>
                    {p.scientificName && (
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 italic">({p.scientificName})</span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      p.probabilityLevel === 'عالية'
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                        : p.probabilityLevel === 'متوسطة'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    احتمالية: {p.probabilityLevel}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">الأعراض الداعمة:</span>{' '}
                    {p.supportingSymptoms.join('، ')}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">الأسباب والظروف المساعدة:</span> {p.causes}
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-800/40 text-xs text-emerald-950 dark:text-emerald-300 font-medium">
                  <span className="font-bold text-emerald-800 dark:text-emerald-400">الإجراء الأولي الآمن:</span> {p.urgentSafeAction}
                </div>
              </div>
            ))}
          </div>

          {/* Verification Steps */}
          {result.verificationSteps && result.verificationSteps.length > 0 && (
            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60 space-y-2">
              <h3 className="font-bold text-sky-950 dark:text-sky-200 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>خطوات الفحص الميداني للتأكد من الإصابة بالحقل</span>
              </h3>
              <ul className="space-y-1 text-xs text-sky-900 dark:text-sky-300 list-disc list-inside">
                {result.verificationSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional questions to narrow down */}
          {result.additionalQuestionsNeeded && result.additionalQuestionsNeeded.length > 0 && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-2">
              <h3 className="font-bold text-amber-950 dark:text-amber-200 text-xs flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>معلومات إضافية مفيدة لتدقيق التشخيص</span>
              </h3>
              <ul className="space-y-1 text-xs text-amber-900 dark:text-amber-300 list-disc list-inside">
                {result.additionalQuestionsNeeded.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Official References */}
          {result.officialReferences && result.officialReferences.length > 0 && (
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">المراجع المستند إليها:</span>
              <span>{result.officialReferences.join(' · ')}</span>
            </div>
          )}

          {/* Regulatory Disclaimer */}
          <div className="flex items-start gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
            <span>{result.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
