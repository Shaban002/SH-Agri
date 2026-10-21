import { WeatherData, Governorate } from '../types';

export async function fetchGovWeather(gov: Governorate): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${gov.lat}&longitude=${gov.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,et0_fao_evapotranspiration,precipitation_probability_max&timezone=Africa%2FCairo`;

  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) {
      throw new Error(`Open-Meteo API returned status ${res.status}`);
    }
    const data = await res.json();

    const currentTemp = Math.round(data.current?.temperature_2m ?? 24);
    const humidity = Math.round(data.current?.relative_humidity_2m ?? 55);
    const windSpeed = Math.round(data.current?.wind_speed_10m ?? 14);
    const weatherCode = data.current?.weather_code ?? 0;

    const daily = data.daily ?? {};
    const tempMax = Math.round(daily.temperature_2m_max?.[0] ?? currentTemp + 4);
    const tempMin = Math.round(daily.temperature_2m_min?.[0] ?? currentTemp - 6);
    const et0 = parseFloat((daily.et0_fao_evapotranspiration?.[0] ?? 4.2).toFixed(1));
    const rainProbability = Math.round(daily.precipitation_probability_max?.[0] ?? 5);

    const conditionText = getWeatherConditionArabic(weatherCode);

    // Formulate agricultural alerts based on actual agronomic thresholds
    const alerts: string[] = [];
    if (tempMax >= 36) {
      alerts.push('تنبيه موجة حارة: يرجى تقريب فترات الري للصباح الباكر أو المساء والامتناع عن رش المبيدات وقت الظهيرة.');
    }
    if (tempMin <= 8) {
      alerts.push('تنبيه صقيع وبرودة ليلية: يفضل ري خفيف للمحاصيل الحساسة (طماطم، خضر) أو رش سليكات البوتاسيوم لرفع المناعة.');
    }
    if (windSpeed >= 28) {
      alerts.push('تحذير رياح نشطة: يمنع منعاً باتاً ري محصول القمح والذرة تجنباً لرقاد النباتات وضياع المحصول.');
    }
    if (rainProbability >= 60) {
      alerts.push('توقع هطول أمطار: يرجى إيقاف الري فوراً وتفقد مصارف الحقل لمنع ركود المياه واختناق الجذور.');
    }
    if (humidity >= 80 && tempMax <= 24 && tempMin >= 12) {
      alerts.push('تنبيه رطوبة عالية وندى كثيف: ظروف مهيأة لانتشار الأمراض الفطرية (كصدأ القمح والتبقع البني)، يلزم الفحص الدوري.');
    }

    const forecastDays = ['اليوم', 'غداً', 'بعد غد', 'اليوم الرابع', 'اليوم الخامس'];
    const forecast = (daily.time || []).slice(0, 5).map((t: string, idx: number) => ({
      day: forecastDays[idx] || t,
      tempMax: Math.round(daily.temperature_2m_max?.[idx] ?? 26),
      tempMin: Math.round(daily.temperature_2m_min?.[idx] ?? 14),
      condition: getWeatherConditionArabic(daily.weather_code?.[idx] ?? 0),
    }));

    return {
      governorateName: gov.nameAr,
      currentTemp,
      tempMin,
      tempMax,
      humidity,
      windSpeed,
      rainProbability,
      et0,
      conditionText,
      weatherCode,
      lastUpdated: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      alerts,
      forecast,
    };
  } catch (error) {
    console.warn('Weather API fetch failed, using realistic calibrated Egyptian model:', error);
    return getFallbackWeatherData(gov);
  }
}

function getWeatherConditionArabic(code: number): string {
  if (code === 0) return 'سماء صافية ومشمسة';
  if (code === 1 || code === 2) return 'مشمس إلى غائم جزئياً';
  if (code === 3) return 'غائم تماماً';
  if (code === 45 || code === 48) return 'شبورة مائية وندى صباحي كثيف';
  if (code >= 51 && code <= 55) return 'رذاذ خفيف متفرق';
  if (code >= 61 && code <= 65) return 'أمطار شتوية متفرقة';
  if (code >= 80 && code <= 82) return 'زخات مطر نشطة';
  if (code >= 95) return 'عواصف رعدية محتملة';
  return 'أجواء زراعية معتدلة';
}

function getFallbackWeatherData(gov: Governorate): WeatherData {
  const isUpperEgypt = gov.region === 'upper_egypt';
  const baseTemp = isUpperEgypt ? 29 : 24;
  return {
    governorateName: gov.nameAr,
    currentTemp: baseTemp,
    tempMin: baseTemp - 8,
    tempMax: baseTemp + 5,
    humidity: isUpperEgypt ? 38 : 62,
    windSpeed: 15,
    rainProbability: 10,
    et0: isUpperEgypt ? 5.4 : 4.1,
    conditionText: 'مشمس وأجواء زراعية مستقرة (تقديري)',
    weatherCode: 1,
    lastUpdated: 'بيانات استرشادية',
    alerts: [
      'توصية إرشادية: احرص على الري في الصباح الباكر وتجنب رش الأسمدة والمبيدات في فترات هبوب الرياح.',
    ],
    forecast: [
      { day: 'اليوم', tempMax: baseTemp + 5, tempMin: baseTemp - 8, condition: 'مشمس' },
      { day: 'غداً', tempMax: baseTemp + 6, tempMin: baseTemp - 7, condition: 'صافٍ' },
      { day: 'بعد غد', tempMax: baseTemp + 4, tempMin: baseTemp - 8, condition: 'غائم جزئياً' },
    ],
  };
}
