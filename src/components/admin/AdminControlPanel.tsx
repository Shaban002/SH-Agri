import React, { useState } from 'react';
import {
  ShieldAlert,
  Settings,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck2,
  Plus,
  RefreshCw,
  Search,
  Database,
  Lock,
} from 'lucide-react';
import { PESTICIDES_DATABASE } from '../../data/pestsDiseasesData';
import { KNOWLEDGE_SOURCES_DATABASE } from '../../data/knowledgeSourcesData';
import { PesticideRegistration } from '../../types';

interface RecommendationItem {
  id: string;
  title: string;
  cropName: string;
  source: string;
  status: 'draft' | 'in_review' | 'verified' | 'outdated' | 'suspended';
  lastEdited: string;
}

export const AdminControlPanel: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'recommendations' | 'pesticides' | 'sources' | 'audit_logs'>('recommendations');
  const [searchFilter, setSearchFilter] = useState('');

  // Recommendations state
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([
    {
      id: 'rec_1',
      title: 'توصيات رية المحاياة والتسميد الأزوتي للقمح بالدلتا',
      cropName: 'القمح',
      source: 'معهد بحوث المحاصيل الحقلية 2024',
      status: 'verified',
      lastEdited: '2024-11-15',
    },
    {
      id: 'rec_2',
      title: 'مكافحة دودة الحشد الخريفية في العروة الصيفية للذرة الشامية',
      cropName: 'الذرة الشامية',
      source: 'لجنة مبيدات الآفات الزراعية (APC) 2024',
      status: 'verified',
      lastEdited: '2024-06-20',
    },
    {
      id: 'rec_3',
      title: 'مقررات التسميد البوروني لبنجر السكر بالأراضي الجيرية',
      cropName: 'بنجر السكر',
      source: 'مجلس المحاصيل السكرية',
      status: 'in_review',
      lastEdited: '2024-08-10',
    },
    {
      id: 'rec_4',
      title: 'توصيات مكافحة سوسة ورق البرسيم الحجازي بالواحات',
      cropName: 'البرسيم الحجازي',
      source: 'قسم بحوث الأعلاف',
      status: 'draft',
      lastEdited: '2024-09-02',
    },
    {
      id: 'rec_5',
      title: 'استخدام مبيد محظور لتسريع نضج القطن (توصية قديمة ملغاة)',
      cropName: 'القطن المصري',
      source: 'نشرة قديمة سابقة',
      status: 'suspended',
      lastEdited: '2023-01-10',
    },
  ]);

  // Pesticides registry state for admin
  const [pesticides, setPesticides] = useState<PesticideRegistration[]>(PESTICIDES_DATABASE);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { id: '1', action: 'اعتماد توصية', item: 'نشرة القمح لموسم 2024-2025', user: 'د. رئيس قسم بحوث القمح', time: '2024-11-15 11:30' },
    { id: '2', action: 'تحديث حالة مبيد', item: 'تيلت 250 EC - ساري', user: 'مشرف لجنة المبيدات', time: '2024-10-12 14:15' },
    { id: '3', action: 'إيقاف توصية قديمة', item: 'إيقاف مركبات مبيدات غير مسجلة في القطن', user: 'المشرف العام للأمن الزراعي', time: '2024-09-05 09:40' },
  ]);

  const handleStatusChange = (id: string, newStatus: RecommendationItem['status']) => {
    setRecommendations(
      recommendations.map((r) => (r.id === id ? { ...r, status: newStatus, lastEdited: new Date().toISOString().split('T')[0] } : r))
    );
  };

  const handleTogglePesticide = (id: string) => {
    setPesticides(
      pesticides.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'active' ? 'suspended' : 'active';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const getStatusBadge = (status: RecommendationItem['status']) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">موثقة ومعتمدة للنشر</span>;
      case 'in_review':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">قيد المراجعة العلمية</span>;
      case 'draft':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">مسودة جديدة</span>;
      case 'outdated':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">قديمة وتحتاج تحديث</span>;
      case 'suspended':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">موقوفة / محظورة</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-700 text-white flex items-center justify-center shadow-sm">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                لوحة تحكم وإدارة المحتوى والتوصيات
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مراجعة واعتماد التوصيات الزراعية، التحقق من المبيدات، وسجل التغييرات التدقيقي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>صلاحيات المشرف الزراعي</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
          {[
            { id: 'recommendations', label: 'مراجعة واعتماد التوصيات' },
            { id: 'pesticides', label: 'إدارة تسجيلات المبيدات (APC)' },
            { id: 'audit_logs', label: 'سجل التغييرات (Audit Logs)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as typeof activeAdminTab)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeAdminTab === tab.id
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* View 1: Recommendations Review */}
      {activeAdminTab === 'recommendations' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">التوصيات الزراعية المسجلة بالنظام</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                لا تنشر التوصيات الحساسة إلا بعد المراجعة وتأكيد حالتها كـ "موثقة ومعتمدة للنشر"
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{rec.title}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-medium text-emerald-800 dark:text-emerald-400">{rec.cropName}</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-[11px] flex-wrap">
                    <span>المرجع: {rec.source}</span>
                    <span>·</span>
                    <span className="font-mono">آخر تعديل: {rec.lastEdited}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(rec.status)}
                  <select
                    value={rec.status}
                    onChange={(e) => handleStatusChange(rec.id, e.target.value as RecommendationItem['status'])}
                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="draft">مسودة</option>
                    <option value="in_review">قيد المراجعة</option>
                    <option value="verified">موثقة ومعتمدة</option>
                    <option value="outdated">قديمة للتحديث</option>
                    <option value="suspended">موقوفة</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Pesticides Registry Control */}
      {activeAdminTab === 'pesticides' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">سجل المبيدات المسجلة بلجنة الآفات (APC)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                يمكن للمشرف إيقاف أو تفعيل أي منتج تجاري عند انتهاء تسجيله أو صدور قرار وزاري بشأنه
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            {pesticides.map((pest) => (
              <div key={pest.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{pest.tradeName}</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                    المادة الفعالة: {pest.activeIngredient} ({pest.concentration}) · رقم التسجيل: {pest.registrationNumber}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      pest.status === 'active'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
                    }`}
                  >
                    {pest.status === 'active' ? 'تسجيل سارٍ ومعتمد' : 'موقوف ومجمد'}
                  </span>
                  <button
                    onClick={() => handleTogglePesticide(pest.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      pest.status === 'active'
                        ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/70'
                        : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/70'
                    }`}
                  >
                    {pest.status === 'active' ? 'إيقاف التسجيل' : 'تفعيل التسجيل'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Audit Logs */}
      {activeAdminTab === 'audit_logs' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">سجل التغييرات والتدقيق (Audit Trail)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تسجيل غير قابل للتعديل لجميع إجراءات الاعتماد والإيقاف لحماية موثوقية المنصة
            </p>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">{log.action}: <span className="font-normal text-slate-700 dark:text-slate-300">{log.item}</span></div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">المستخدم المسؤول: {log.user}</div>
                </div>
                <span className="font-mono text-slate-400 dark:text-slate-500 text-xs shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
