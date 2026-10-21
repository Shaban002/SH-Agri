import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  FileText,
  Calendar,
  Building2,
} from 'lucide-react';
import { KNOWLEDGE_SOURCES_DATABASE } from '../../data/knowledgeSourcesData';

export const ReferenceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'جميع المصادر والمراجع' },
    { id: 'محاصيل حبوب استراتيجية', label: 'محاصيل الحبوب (قمح، ذرة، أرز)' },
    { id: 'أعلاف وإنتاج حيواني', label: 'محاصيل الأعلاف (برسيم)' },
    { id: 'وقاية نبات ومكافحة آفات', label: 'وقاية النبات والمبيدات' },
    { id: 'محاصيل صناعية وسكرية', label: 'المحاصيل السكرية والصناعية' },
    { id: 'إدارة المياه والري', label: 'إدارة المياه وترشيد الري' },
  ];

  const filteredDocs = KNOWLEDGE_SOURCES_DATABASE.filter((doc) => {
    const matchesSearch =
      doc.title.includes(searchQuery) ||
      doc.organization.includes(searchQuery) ||
      doc.summary.includes(searchQuery) ||
      doc.cropsCovered.some((c) => c.includes(searchQuery));

    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                مكتبة المراجع والتوصيات الزراعية الرسمية
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                قاعدة معرفية للنشرات والأدلة الإرشادية الصادرة عن المعاهد البحثية المصرية
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
              placeholder="ابحث في النشرات الرسمية والمراجع..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl pr-9 pl-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500 dark:hover:border-emerald-600 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{doc.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-medium">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{doc.organization}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">{doc.bulletinNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>موثق رسمياً</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {doc.summary}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-700 dark:text-slate-300">المحاصيل المشمولة:</span>
                <span>{doc.cropsCovered.join(' · ')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>تاريخ آخر مراجعة: <strong className="font-mono text-slate-700 dark:text-slate-300">{doc.lastReviewed}</strong></span>
                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    <span>الرابط المرجعي</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
