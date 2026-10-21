# SH-Agri | منصة المساعد الزراعي الذكي في مصر

منصة رقمية زراعية متكاملة تستهدف المزارعين والمهندسين الزراعيين في جمهورية مصر العربية، صُممت وبُنيت وفق أعلى معايير الجودة العلمية والهندسية، معتمدة على التوصيات الرسمية الصادرة عن **وزارة الزراعة واستصلاح الأراضي المصرية** و**مركز البحوث الزراعية (ARC)**.

---

## 🌟 المزايا والأقسام الرئيسية

1. **دليل المحاصيل المصرية الشامل:**
   - تغطية تفصيلية لـ 10 محاصيل رئيسية: القمح، البرسيم المصري، البرسيم الحجازي، الذرة الشامية، الأرز، الفول البلدي، العدس، الشعير، القطن المصري، وبنجر السكر.
   - لكل محصول: الأصناف المعتمدة، مواعيد الزراعة بحسب المحافظة والمنطقة (الدلتا، مصر الوسطى، الصعيد، الأراضي المستصلحة)، متطلبات التربة ودرجة الملوحة، معدلات التقاوي بالفدان، مراحل النمو والري، وبرامج التسميد، والحصاد والأخطاء الشائعة.

2. **المساعد الزراعي الذكي (RAG + AI):**
   - واجهة محادثة ذكية باللغة العربية مدعومة بنموذج Gemini عبر مسار خلفي آمن (`/api/generate-content`).
   - استرجاع دقيق من النشرات الإرشادية (RAG Context) مع ربط الإجابة بسياق الحقل المحدد (المحصول، المحافظة، نوع التربة، مرحلة النمو).
   - توثيق مصادر التوصيات وفصل الحقائق العلمية عن الاحتمالات الاسترشادية دون اختراع جرعات عشوائية.

3. **قسم التشخيص الزراعي والتفريقي:**
   - فحص الأعراض المرضية، الآفات الحشرية، الحشائش، نقص العناصر، والإجهاد الفسيولوجي.
   - دعم رفع صورة للنبات المصاب للتحليل البصري التلقائي.
   - تقديم نتائج مرتبة تشمل: الاحتمالات ونسب الرجحان، الأعراض الداعمة، الأسباب والظروف المساعدة، الإجراء الأولي الآمن، وخطوات الفحص الميداني للتأكد.

4. **قسم المكافحة المتكاملة (IPM) وسجل المبيدات (APC):**
   - هرم المكافحة المتكاملة المعتمد: وقاية زراعية ← رصد وعتبة اقتصادية حرجة ← مكافحة ميكانيكية ← حيوية ← تدخل كيميائي.
   - تغطية شاملة للأمراض الفطرية (كصدأ القمح والتبقع البني)، الحشرات الجارفة (كدودة الحشد الخريفية ودودة ورق القطن)، والحشائش المتطفلة (الهالوك في الفول والحامول في البرسيم).
   - قاعدة بيانات المبيدات المسجلة رسمياً لدى لجنة مبيدات الآفات الزراعية المصرية (APC) تتضمن الاسم التجاري، المادة الفعالة، الجرعة المعتمدة للفدان، فترة الأمان (PHI)، وفترة إعادة الدخول (REI).

5. **حاسبة التسميد الدقيقة:**
   - تحويل الوحدات الصافية (N, P₂O₅, K₂O) إلى أسمدة تجارية شائعة بمصر (يوريا 46%، نترات نشادر 33.5%، سلفات نشادر 20.6%، سوبر فوسفات 15.5% و 46%، سلفات بوتاسيوم 50%).
   - دعم وحدات المساحة المصرية: الفدان (4200 م²)، القيراط (24/1 فدان)، السهم (576/1 فدان)، والهكتار.
   - خصم ما أضيف سابقاً للحقل وحساب عدد الشكاير (50 كجم و 25 كجم) وبرنامج التوزيع مع الري ومحاذير الخلط الترسيبية.

6. **إدارة الري والاحتياجات المائية (FAO Penman-Monteith):**
   - ربط حي بمحطات الطقس في محافظات مصر عبر **Open-Meteo API**.
   - حساب استهلاك المحصول المائي الاسترشادي: $ET_c = ET_0 \times K_c$ وفق مراحل النمو وكفاءة نظام الري (غمر 55%، رش 78%، تنقيط 88%).
   - تقدير الفترات بين الريات وسجل رقمي لعمليات الري الميدانية.

7. **إدارة البرسيم ومتابعة الحشات:**
   - دعم البرسيم المصري المسقاوي (4-5 حشات)، صنف فحل (حشة واحدة)، والبرسيم الحجازي المعمر (8-10 حشات سنوياً).
   - تسجيل كمية الحش بالطن الأخضر والدريس، فترات تجدد النمو بالأيام، وتوصيات التسميد والري بعد كل حش لسرعة التفريع ومكافحة الحامول.

8. **إدارة المزرعة والسجل الزراعي:**
   - تسجيل القطع الزراعية (Plots)، المحاصيل والأصناف، ومساحات الفدان.
   - سجل العمليات الزراعية اليومية وتوثيق تكاليفها وملاحظاتها.

9. **الإنتاجية والتكاليف والعائد الاقتصادي:**
   - حساب إجمالي تكاليف الفدان (تقاوي، أسمدة، مبيدات، وقود وري، عمالة، وإيجار الأرض).
   - احتساب الإيرادات من الإنتاجية الفعلية وأسعار التوريد الرسمية بالوحدات المصرية (إردب، طن، قنطار)، مع احتساب المنتجات الثانوية (التبن والقش).
   - حساب صافي العائد للفدان ونسبة العائد على الاستثمار (ROI %).

10. **المكتبة التوثيقية ولوحة تحكم الإدارة:**
    - مكتبة للنشرات الرسمية بروابطها وأرقامها وتاريخ مراجعتها.
    - لوحة تحكم للمشرف لمراجعة حالات الاعتماد (مسودة، قيد المراجعة، موثقة ومعتمدة، موقوفة)، وإدارة تسجيلات المبيدات وسجل التدقيق.

---

## 🏗️ البنية التقنية (Tech Stack)

- **Frontend:** React 19 + TypeScript + Vite.
- **Styling:** Tailwind CSS v4 مع خطوط Google الخطية (Cairo و Tajawal).
- **Icons:** Lucide React.
- **Weather API:** Open-Meteo API لجلب بيانات الطقس ودرجات الحرارة و ET₀ لمحافظات مصر الحية.
- **AI Integration:** Google Gemini API (`gemini-3.8-flash`) عبر نقطة نهاية خلفية آمنة على الخادم `/api/generate-content`.

---

## 🗄️ مخطط قاعدة بيانات PostgreSQL المقترح (Supabase Migration)

الملف التالي يوضح الجداول والعلاقات وسياسات الأمان RLS الموصى بها عند التوصيل بقاعدة Supabase:

```sql
-- 1. جدول المستخدمين والملفات الشخصية
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  governorate TEXT NOT NULL,
  role TEXT DEFAULT 'farmer' CHECK (role IN ('farmer', 'agronomist', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول المزارع والقطع الزراعية
CREATE TABLE farm_plots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plot_name TEXT NOT NULL,
  area_feddans NUMERIC(6,2) NOT NULL CHECK (area_feddans > 0),
  crop_id TEXT NOT NULL,
  variety TEXT,
  soil_type TEXT NOT NULL,
  irrigation_method TEXT NOT NULL CHECK (irrigation_method IN ('flood', 'drip', 'sprinkler')),
  planting_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. سجل العمليات الزراعية
CREATE TABLE farm_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_id UUID REFERENCES farm_plots(id) ON DELETE CASCADE,
  operation_date DATE NOT NULL,
  operation_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  cost_egp NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. سجل حشات البرسيم
CREATE TABLE berseem_harvest_cuts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plot_id UUID REFERENCES farm_plots(id) ON DELETE CASCADE,
  cut_number INT NOT NULL,
  cut_date DATE NOT NULL,
  regrowth_days INT NOT NULL,
  yield_green_tons NUMERIC(6,2) NOT NULL,
  yield_hay_tons NUMERIC(6,2),
  fertilizer_applied TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. جدول المبيدات المسجلة رسمياً
CREATE TABLE official_pesticides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_name TEXT NOT NULL,
  active_ingredient TEXT NOT NULL,
  concentration TEXT NOT NULL,
  target_problem TEXT NOT NULL,
  crops_registered TEXT[] NOT NULL,
  approved_dose TEXT NOT NULL,
  phi_days INT NOT NULL,
  rei_hours INT NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  verified_by_apc BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- سياسات الأمان على مستوى الصفوف (Row Level Security - RLS)
ALTER TABLE farm_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE berseem_harvest_cuts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own plots"
  ON farm_plots FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own operations"
  ON farm_operations FOR ALL
  USING (EXISTS (
    SELECT 1 FROM farm_plots WHERE farm_plots.id = farm_operations.plot_id AND farm_plots.user_id = auth.uid()
  ));
```

---

## 🚀 كيفية التشغيل المحلي

```bash
# تثبيت الاعتماديات
npm install

# تشغيل بيئة التطوير
npm run dev

# بناء النسخة الإنتاجية
npm run build
```
