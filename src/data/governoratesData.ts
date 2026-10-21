import { Governorate } from '../types';

export const EGYPTIAN_GOVERNORATES: Governorate[] = [
  // الوجه البحري والدلتا
  { id: 'dakahlia', nameAr: 'الدقهلية', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 31.0409, lon: 31.3785, dominantSoil: 'طينية ثقيلة خصبة' },
  { id: 'sharkia', nameAr: 'الشرقية', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 30.5877, lon: 31.5020, dominantSoil: 'طينية بالداخل ورملية بالأطراف' },
  { id: 'beheira', nameAr: 'البحيرة', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 31.0364, lon: 30.4699, dominantSoil: 'طينية ورملية مستصلحة (النوبارية)' },
  { id: 'gharbia', nameAr: 'الغربية', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 30.7865, lon: 31.0004, dominantSoil: 'طينية قديمة عالية الخصوبة' },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 31.1107, lon: 30.9388, dominantSoil: 'طينية مع وجود أراضي متأثرة بالأملاح شمالاً' },
  { id: 'menofia', nameAr: 'المنوفية', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 30.5972, lon: 30.9876, dominantSoil: 'طينية قديمة طميية' },
  { id: 'qalyubia', nameAr: 'القليوبية', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 30.3292, lon: 31.2168, dominantSoil: 'طميية وطينية خصبة' },
  { id: 'damietta', nameAr: 'دمياط', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 31.4175, lon: 31.8144, dominantSoil: 'طميية ساحلية ورطوبة عالية' },
  { id: 'alexandria', nameAr: 'الإسكندرية', region: 'delta', regionAr: 'الدلتا والوجه البحري', lat: 31.2001, lon: 29.9187, dominantSoil: 'طميية ورملية وجيرية غرباً' },
  { id: 'ismailia', nameAr: 'الإسماعيلية', region: 'desert_reclaimed', regionAr: 'مدن القناة والأراضي المستصلحة', lat: 30.5965, lon: 32.2715, dominantSoil: 'رملية خفيفة إلى طميية رملية' },

  // مصر الوسطى
  { id: 'giza', nameAr: 'الجيزة', region: 'middle_egypt', regionAr: 'مصر الوسطى', lat: 30.0131, lon: 31.2089, dominantSoil: 'طينية بالوادي ورملية بالواحات والظهير' },
  { id: 'fayoum', nameAr: 'الفيوم', region: 'middle_egypt', regionAr: 'مصر الوسطى', lat: 29.3084, lon: 30.8428, dominantSoil: 'طميية مع انحدارات وجيوب جيرية/ملحية' },
  { id: 'beni_suef', nameAr: 'بني سويف', region: 'middle_egypt', regionAr: 'مصر الوسطى', lat: 29.0661, lon: 31.0994, dominantSoil: 'طينية بالوادي ورملية بالظهير الصحراوي' },
  { id: 'minya', nameAr: 'المنيا', region: 'middle_egypt', regionAr: 'مصر الوسطى', lat: 28.1099, lon: 30.7503, dominantSoil: 'طينية بالوادي ورملية كلسية بالغرب' },

  // مصر العليا (الصعيد)
  { id: 'assiut', nameAr: 'أسيوط', region: 'upper_egypt', regionAr: 'مصر العليا (الصعيد)', lat: 27.1809, lon: 31.1837, dominantSoil: 'طينية رسوبية بالوادي ورملية بالظهير' },
  { id: 'sohag', nameAr: 'سوهاج', region: 'upper_egypt', regionAr: 'مصر العليا (الصعيد)', lat: 26.5591, lon: 31.6957, dominantSoil: 'طميية طينية عميقة' },
  { id: 'qena', nameAr: 'قنا', region: 'upper_egypt', regionAr: 'مصر العليا (الصعيد)', lat: 26.1551, lon: 32.7160, dominantSoil: 'طينية طميية جيدة الصرف' },
  { id: 'luxor', nameAr: 'الأقصر', region: 'upper_egypt', regionAr: 'مصر العليا (الصعيد)', lat: 25.6872, lon: 32.6396, dominantSoil: 'طينية بالوادي ورملية صحراوية' },
  { id: 'aswan', nameAr: 'أسوان', region: 'upper_egypt', regionAr: 'مصر العليا (الصعيد)', lat: 24.0889, lon: 32.8998, dominantSoil: 'طميية رملية ودرجات حرارة مرتفعة' },

  // المحافظات الصحراوية والمستصلحة
  { id: 'new_valley', nameAr: 'الوادي الجديد (الداخلة والخارجة والفرافرة)', region: 'desert_reclaimed', regionAr: 'الأراضي الصحراوية والواحات', lat: 25.4514, lon: 30.5472, dominantSoil: 'رملية خفيفة إلى رملية طينية، مياه جوفية' },
  { id: 'matrouh', nameAr: 'مطروح والساحل الشمالي', region: 'desert_reclaimed', regionAr: 'الساحل الشمالي والصحراء الغربية', lat: 31.3543, lon: 27.2373, dominantSoil: 'جيرية كلسية ورملية، زراعة مطرية ومروية' },
  { id: 'nubaria', nameAr: 'النوبارية وبنجر السكر', region: 'desert_reclaimed', regionAr: 'أراضي الاستصلاح الحديثة', lat: 30.6667, lon: 30.0667, dominantSoil: 'جيرية كلسية ورملية طميية، ري بالتنقيط والرش' },
  { id: 'toshka', nameAr: 'توشكى وشرق العوينات', region: 'desert_reclaimed', regionAr: 'المشروعات القومية الجنوبية', lat: 22.5000, lon: 31.5000, dominantSoil: 'رملية صحراوية بكر، ري محوري Pivot' },
];

export const SOIL_TYPES_EGYPT = [
  { id: 'clay_old', nameAr: 'أرض طينية قديمة (أراضي الوادي والدلتا)' },
  { id: 'sandy_light', nameAr: 'أرض رملية خفيفة (المناطق الصحراوية والمستصلحة)' },
  { id: 'calcareous', nameAr: 'أرض جيرية كلسية (محتوى عالي من كربونات الكالسيوم - النوبارية ومطروح)' },
  { id: 'saline_affected', nameAr: 'أرض متأثرة بالأملاح (شمال الدلتا والفيوم)' },
  { id: 'loamy_alluvial', nameAr: 'أرض طميية خصبة (جزر النيل وحواف المجرى)' },
];
