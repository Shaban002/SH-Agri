import React, { useState } from 'react';
import { Search, Wheat, ArrowRight } from 'lucide-react';
import { Crop } from '../../types';
import { CROPS_DATABASE } from '../../data/cropsData';
import { CropDetailModal } from './CropDetailModal';

interface CropCatalogProps {
  onAskAboutCrop: (cropName: string) => void;
  selectedCropId?: string | null;
  onClearSelectedCrop?: () => void;
}

export const CropCatalog: React.FC<CropCatalogProps> = ({
  onAskAboutCrop,
  selectedCropId,
  onClearSelectedCrop,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalCrop, setActiveModalCrop] = useState<Crop | null>(() => {
    if (selectedCropId) {
      return CROPS_DATABASE.find((c) => c.id === selectedCropId) || null;
    }
    return null;
  });

  // Filter crops based on query and category
  const filteredCrops = CROPS_DATABASE.filter((crop) => {
    const matchesSearch =
      crop.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.varieties.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || crop.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'جميع المحاصيل (10)' },
    { id: 'field_grains', label: 'محاصيل حبوب (قمح، ذرة، أرز، شعير)' },
    { id: 'forage', label: 'أعلاف (برسيم مصري وحجازي)' },
    { id: 'legumes', label: 'بقوليات (فول بلدي، عدس)' },
    { id: 'oil_fiber', label: 'ألياف وزيوت (قطن)' },
    { id: 'sugar', label: 'محاصيل سكرية (بنجر سكر)' },
  ];

  const handleOpenDetail = (crop: Crop) => {
    setActiveModalCrop(crop);
  };

  const handleCloseDetail = () => {
    setActiveModalCrop(null);
    if (onClearSelectedCrop) onClearSelectedCrop();
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              دليل المحاصيل الزراعية في مصر
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              أدلة إرشادية رسمية مفصلة للأصناف، مواعيد الزراعة، التسميد، الري، والمكافحة
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن محصول، صنف، أو اسم علمي..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl pr-9 pl-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Categories Filter Tabs (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => handleOpenDetail(crop)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col group"
          >
            {crop.image ? (
              <div className="h-44 overflow-hidden relative">
                <img
                  src={crop.image}
                  alt={crop.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium">
                  {crop.categoryAr}
                </div>
              </div>
            ) : (
              <div className="h-44 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Wheat className="w-12 h-12" />
              </div>
            )}

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {crop.nameAr}
                  </h2>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 italic">
                    {crop.scientificName}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {crop.summary}
                </p>
              </div>

              {/* Zero-Pill Metadata */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">الأصناف:</span>
                  <span className="truncate">{crop.varieties.slice(0, 2).join('، ')} ...</span>
                </div>

                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">التسميد:</span>
                  <span>{crop.fertilizerGuide.nitrogenUnits} وحدة N</span>
                  <span aria-hidden="true">·</span>
                  <span>{crop.fertilizerGuide.phosphorusUnits} وحدة P</span>
                  <span aria-hidden="true">·</span>
                  <span>{crop.fertilizerGuide.potassiumUnits} وحدة K</span>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-[-3px] transition-transform flex items-center gap-1">
                    <span>فتح الدليل الكامل</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    محدث: {crop.reviewDate.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Wheat className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">لم يتم العثور على محاصيل مطابقة</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            جرب تعديل كلمة البحث أو اختيار تصنيف آخر.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalCrop && (
        <CropDetailModal
          crop={activeModalCrop}
          onClose={handleCloseDetail}
          onAskAboutCrop={onAskAboutCrop}
        />
      )}
    </div>
  );
};
