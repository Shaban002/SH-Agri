import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import { askSmartAssistant, AssistantContext } from '../../services/geminiService';
import { CROPS_DATABASE } from '../../data/cropsData';
import { EGYPTIAN_GOVERNORATES, SOIL_TYPES_EGYPT } from '../../data/governoratesData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface SmartAssistantProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const SmartAssistant: React.FC<SmartAssistantProps> = ({
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `أهلاً بك يا فندم في المساعد الزراعي الذكي (SH-Agri).
أنا هنا لمساعدتك بكل ما يخص محاصيلك في مصر:
• توصيات التسميد والري بحسب محافظتك ونوع أرضك.
• تشخيص الأعراض المرضية والآفات ودودة الحشد.
• التعامل مع الحشائش المتطفلة كالهالوك في الفول والحامول في البرسيم.
• مواعيد الزراعة وأفضل الأصناف المعتمدة من مركز البحوث الزراعية.

يمكنك تحديد بيانات حقلك من شريط الإعدادات أعلاه للحصول على توصية دقيقة ومخصصة!`,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);

  // Field Context
  const [context, setContext] = useState<AssistantContext>({
    cropId: 'wheat',
    cropName: 'القمح',
    governorate: 'الدقهلية',
    soilType: 'أرض طينية قديمة (أراضي الوادي والدلتا)',
    variety: 'مصر 3 / جيزة 171',
    plantingDate: '',
    growthStage: 'التفريع والنمو الخضري',
    irrigationMethod: 'الغمر',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const history = messages.slice(-4).map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.text }],
      }));

      const reply = await askSmartAssistant(text, context, history);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'عذراً، حدث خطأ أثناء معالجة السؤال. يرجى المحاولة مرة أخرى.',
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'أزرع القمح في الأقصر، فما التوصيات السمادية وموعد رية المحاياة؟',
    'أوراق البرسيم ظهرت عليها خيوط صفراء متسلقة، كيف أتعامل مع الحامول؟',
    'ما الجرعة المعتمدة لمبيد دودة الحشد الخريفية في الذرة الشامية؟',
    'ما كمية التقاوي المعتمدة للفدان عند زراعة بنجر السكر؟',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header and Context Drawer */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-3 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                المساعد الزراعي الذكي
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>RAG مدعوم بنشرات مركز البحوث الزراعية المصرية</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">نشط ومحدث</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setContextOpen(!contextOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>تحديد سياق الحقل {context.cropName ? `(${context.cropName} - ${context.governorate})` : ''}</span>
              {contextOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    sender: 'assistant',
                    text: 'مرحباً بك مجدداً. تفضل بطرح أي سؤال وسأجيبك بأدق التوصيات المعتمدة.',
                    timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              title="محادثة جديدة"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Context Drawer */}
        {contextOpen && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-50/70 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">المحصول:</label>
              <select
                value={context.cropId}
                onChange={(e) => {
                  const c = CROPS_DATABASE.find((crop) => crop.id === e.target.value);
                  setContext((prev) => ({
                    ...prev,
                    cropId: e.target.value,
                    cropName: c ? c.nameAr : '',
                  }));
                }}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs"
              >
                {CROPS_DATABASE.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">المحافظة والموقع:</label>
              <select
                value={context.governorate}
                onChange={(e) => setContext((prev) => ({ ...prev, governorate: e.target.value }))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs"
              >
                {EGYPTIAN_GOVERNORATES.map((g) => (
                  <option key={g.id} value={g.nameAr}>
                    {g.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">نوع التربة:</label>
              <select
                value={context.soilType}
                onChange={(e) => setContext((prev) => ({ ...prev, soilType: e.target.value }))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs"
              >
                {SOIL_TYPES_EGYPT.map((s) => (
                  <option key={s.id} value={s.nameAr}>
                    {s.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">مرحلة النمو:</label>
              <select
                value={context.growthStage}
                onChange={(e) => setContext((prev) => ({ ...prev, growthStage: e.target.value }))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs"
              >
                <option value="الإنبات والبادرات الأولى">الإنبات والبادرات الأولى</option>
                <option value="التفريع والنمو الخضري">التفريع والنمو الخضري</option>
                <option value="الاستطالة وبدء التزهير">الاستطالة وبدء التزهير</option>
                <option value="طرد السنابل أو عقد الثمار">طرد السنابل أو عقد الثمار</option>
                <option value="امتلاء الحبوب أو تضخم الجذور">امتلاء الحبوب أو تضخم الجذور</option>
                <option value="النضج وقبل الحصاد والفطام">النضج وقبل الحصاد والفطام</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 min-h-[460px] max-h-[600px] overflow-y-auto flex flex-col gap-4 transition-colors">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse self-end max-w-[85%]' : 'self-start max-w-[92%]'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                m.sender === 'user' ? 'bg-slate-700 dark:bg-slate-600' : 'bg-emerald-600'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-slate-800 text-white rounded-tl-none'
                  : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tr-none'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
              <span
                className={`block text-[10px] mt-2 font-mono ${
                  m.sender === 'user' ? 'text-slate-400 text-left' : 'text-slate-400 dark:text-slate-500 text-right'
                }`}
              >
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 self-start max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-tr-none text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>جاري استرجاع النشرات الزراعية وصياغة الإجابة المعتمدة...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap shrink-0 text-[11px]">
          مقترحات سريعة:
        </span>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 text-xs shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative"
      >
        <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
          <textarea
            rows={2}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="اكتب سؤالك هنا بالتفصيل... (مثال: ألاحظ اصفرار في أوراق القمح، ما السبب وطريقة المعالجة؟)"
            className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors shrink-0 flex items-center justify-center self-end mb-0.5"
            aria-label="إرسال"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};
