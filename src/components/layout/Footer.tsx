import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, Leaf } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span>SH-Agri | المساعد الزراعي</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              منصة رقمية موثوقة تستهدف المزارع والمهندس الزراعي في جمهورية مصر العربية، لتقديم توصيات علمية من واقع نشرات وزارة الزراعة ومركز البحوث الزراعية.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>جميع التوصيات مستندة إلى أبحاث محكمة ومعتمدة</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3">الأقسام الرئيسية</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('crops')} className="hover:text-emerald-400 transition-colors">
                  دليل المحاصيل المصرية
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ipm')} className="hover:text-emerald-400 transition-colors">
                  المكافحة المتكاملة والمبيدات
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diagnosis')} className="hover:text-emerald-400 transition-colors">
                  التشخيص الزراعي والتفريقي
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('fertilizer')} className="hover:text-emerald-400 transition-colors">
                  حاسبة التسميد الدقيقة
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('berseem')} className="hover:text-emerald-400 transition-colors">
                  إدارة البرسيم المصري والحجازي
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Institutes in Egypt */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3">الجهات والمصادر العلمية</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>وزارة الزراعة واستصلاح الأراضي المصرية</li>
              <li>مركز البحوث الزراعية (ARC)</li>
              <li>معهد بحوث المحاصيل الحقلية</li>
              <li>معهد بحوث وقاية النباتات</li>
              <li>معهد بحوث الأراضي والمياه والبيئة (SWERI)</li>
              <li>لجنة مبيدات الآفات الزراعية (APC)</li>
            </ul>
          </div>

          {/* Col 4: Important Regulatory Disclaimer */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 space-y-2">
            <h4 className="text-amber-300 font-semibold text-xs flex items-center gap-1.5">
              <span>إخلاء مسؤولية استرشادي</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              المعلومات والتوصيات المقدمة عبر المنصة هي أدلة استرشادية مبنية على المراجع الرسمية المتاحة. تختلف ظروف كل حقل ومزرعة وفق نتائج تحليل التربة والطقس الميداني؛ ويجب مراجعة المهندس الزراعي المشرف قبل تطبيق المعاملات الكيميائية الدقيقة.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} منصة المساعد الزراعي الذكي (SH-Agri) - جمهورية مصر العربية.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('library')} className="hover:text-slate-300 transition-colors">
              المكتبة التوثيقية
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('admin')} className="hover:text-slate-300 transition-colors">
              لوحة الإدارة والتحكم
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
