import { CommercialFertilizer } from '../types';

export const EGYPTIAN_COMMERCIAL_FERTILIZERS: CommercialFertilizer[] = [
  // أسمدة آزوتية (نيتروجينية)
  {
    id: 'urea_46',
    nameAr: 'يوريا (محببة أو مبلورة)',
    nitrogenPercent: 46.0,
    phosphorusPercent: 0,
    potassiumPercent: 0,
    sackWeightKg: 50,
    commonInEgypt: true,
    notes: 'تحتوي على 46 وحدة أزوت لكل 100 كجم (الشيكارة بها 23 وحدة N). لا يفضل استخدامها في الأراضي الرملية أو الجيرية لسرعة تطاير الأمونيا، وممتازة في الأراضي الطينية.',
  },
  {
    id: 'ammonium_nitrate_33_5',
    nameAr: 'نترات نشادر (نترات أمونيوم)',
    nitrogenPercent: 33.5,
    phosphorusPercent: 0,
    potassiumPercent: 0,
    sackWeightKg: 50,
    commonInEgypt: true,
    notes: 'تحتوي على 33.5 وحدة أزوت لكل 100 كجم (الشيكارة 16.75 وحدة N). سريعة الامتصاص وتناسب الأراضي الجيرية والمحاصيل الحساسة كالبنجر والبطاطس والقمح.',
  },
  {
    id: 'ammonium_sulfate_20_6',
    nameAr: 'سلفات نشادر (كبريتات أمونيوم - الملح)',
    nitrogenPercent: 20.6,
    phosphorusPercent: 0,
    potassiumPercent: 0,
    sackWeightKg: 50,
    commonInEgypt: true,
    notes: 'تحتوي على 20.6 وحدة أزوت + 24% كبريت. ذات تأثير حامضي ممتاز يخفض قلوية التربة المصرية ويرفع إتاحة العناصر الصغرى والفوسفور.',
  },
  {
    id: 'calcium_nitrate_15_5',
    nameAr: 'نترات كالسيوم',
    nitrogenPercent: 15.5,
    phosphorusPercent: 0,
    potassiumPercent: 0,
    sackWeightKg: 25,
    commonInEgypt: true,
    notes: 'تحتوي على 15.5% N و 19% كالسيوم ذائب. تقوي جدران الخلايا، تحمي من عفن الطرف الزهري، وممنوع خلطها في نفس السمادة مع السلفات أو الفوسفات.',
  },

  // أسمدة فوسفاتية
  {
    id: 'single_superphosphate_15_5',
    nameAr: 'سوبر فوسفات كالسيوم أحادي محبب',
    nitrogenPercent: 0,
    phosphorusPercent: 15.5,
    potassiumPercent: 0,
    sackWeightKg: 50,
    commonInEgypt: true,
    notes: 'السماد الفوسفاتي التقليدي الرئيسي بمصر، يضاف أثناء خدمة الأرض وتجهيزها قبل الزراعة. بطيء الذوبان ويوفر الكالسيوم والكبريت أيضاً.',
  },
  {
    id: 'triple_superphosphate_46',
    nameAr: 'سوبر فوسفات ثلاثي (تربل)',
    nitrogenPercent: 0,
    phosphorusPercent: 0,
    potassiumPercent: 0,
    sackWeightKg: 50,
    commonInEgypt: true,
    notes: 'يحتوي على 46% خامس أكسيد الفوسفور (P2O5). مركز، ممتاز للمساحات الكبيرة والمشروعات الاستثمارية.',
  },
  {
    id: 'phosphoric_acid_85',
    nameAr: 'حمض فوسفوريك (80-85%)',
    nitrogenPercent: 0,
    phosphorusPercent: 58.0,
    potassiumPercent: 0,
    sackWeightKg: 25, // جركن 25-35 كجم
    commonInEgypt: true,
    notes: 'سائل يستخدم حقناً في شبكات الري بالتنقيط (الفرتيجيشن). يمنع انسداد النقاطات ويغذي المحصول بالفوسفور مع خفض pH ماء الري.',
  },

  // أسمدة بوتاسية
  {
    id: 'potassium_sulfate_50',
    nameAr: 'سلفات بوتاسيوم (بودرة أو محبب 0-0-50)',
    nitrogenPercent: 0,
    phosphorusPercent: 0,
    potassiumPercent: 50.0,
    sackWeightKg: 50,
    commonInEgypt: true,
    notes: 'تحتوي على 50 وحدة K2O لكل 100 كجم (الشيكارة بها 25 وحدة بوتاسيوم). أساسي لتحجيم الثمار، نقل الكربوهيدرات، ورفع مقاومة النبات للإجهاد.',
  },
  {
    id: 'potassium_nitrate_13_0_46',
    nameAr: 'نترات بوتاسيوم (13-0-46)',
    nitrogenPercent: 13.0,
    phosphorusPercent: 0,
    potassiumPercent: 46.0,
    sackWeightKg: 25,
    commonInEgypt: true,
    notes: 'سماد تام الذوبان ممتاز للرش الورقي والري بالتنقيط في فترات التزهير والعقد والتحجيم.',
  },

  // أسمدة مركبة
  {
    id: 'npk_19_19_19',
    nameAr: 'سماد مركب متوازن NPK (19-19-19 + TE)',
    nitrogenPercent: 19.0,
    phosphorusPercent: 19.0,
    potassiumPercent: 19.0,
    sackWeightKg: 25,
    commonInEgypt: true,
    notes: 'سماد متوازن تام الذوبان، يناسب مراحل النمو الخضري الأولى في شبكات الري الحديثة.',
  },
];

// Area conversion utilities in Egypt:
// 1 فدان (Feddan) = 24 قيراط (Kirat) = 576 سهم (Sahm) = 4200.83 متر مربع
// 1 هكتار (Hectare) = 2.38 فدان = 10,000 متر مربع
export function convertToFeddans(value: number, unit: 'feddan' | 'kirat' | 'sahm' | 'hectare'): number {
  switch (unit) {
    case 'feddan':
      return value;
    case 'kirat':
      return value / 24;
    case 'sahm':
      return value / 576;
    case 'hectare':
      return value * 2.38095;
    default:
      return value;
  }
}
