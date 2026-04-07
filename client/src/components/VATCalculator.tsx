import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

export default function VATCalculator() {
  const [revenue, setRevenue] = useState<number>(25000000);
  const [businessType, setBusinessType] = useState<'retail' | 'wholesale' | 'production' | 'services'>('retail');
  const [marginPercent, setMarginPercent] = useState<number>(20);
  const [showDetails, setShowDetails] = useState(false);

  // Constants
  const VAT_THRESHOLD_2026 = 20000000;
  const VAT_RATE_2026 = 0.22;
  const VAT_RATE_OLD = 0.18;

  // Calculate metrics
  const calculations = useMemo(() => {
    const isAboveThreshold = revenue > VAT_THRESHOLD_2026;
    
    // Current situation (before 2026)
    const currentVAT = revenue * VAT_RATE_OLD;
    const currentNetRevenue = revenue / (1 + VAT_RATE_OLD);
    const currentMargin = currentNetRevenue * (marginPercent / 100);
    const currentProfit = currentMargin;

    // After 2026 - same price (price increase scenario)
    const newVATIfSamePrice = revenue * VAT_RATE_2026;
    const newNetRevenueIfSamePrice = revenue / (1 + VAT_RATE_2026);
    const newMarginIfSamePrice = newNetRevenueIfSamePrice * (marginPercent / 100);
    const profitLossIfSamePrice = newMarginIfSamePrice - currentMargin;

    // After 2026 - price adjustment (maintain margin)
    const priceIncreaseNeeded = ((VAT_RATE_2026 - VAT_RATE_OLD) / (1 - VAT_RATE_2026)) * 100;
    const newRevenueWithPriceIncrease = revenue * (1 + priceIncreaseNeeded / 100);
    const newGrossRevenueWithPriceIncrease = newRevenueWithPriceIncrease * (1 + VAT_RATE_2026);
    const newVATWithPriceIncrease = newGrossRevenueWithPriceIncrease - newRevenueWithPriceIncrease;
    const newNetRevenueWithPriceIncrease = newRevenueWithPriceIncrease / (1 + VAT_RATE_2026);
    const newMarginWithPriceIncrease = newNetRevenueWithPriceIncrease * (marginPercent / 100);

    // Cost of VAT burden
    const vatBurdenIfSamePrice = newVATIfSamePrice - currentVAT;
    const vatBurdenAsPercentOfProfit = (vatBurdenIfSamePrice / currentMargin) * 100;

    // Break-even analysis
    const minRevenueToBreakEven = VAT_THRESHOLD_2026 + 1;
    const maxRevenueBeforeVAT = VAT_THRESHOLD_2026;

    return {
      isAboveThreshold,
      currentVAT,
      currentMargin,
      currentProfit,
      newVATIfSamePrice,
      newMarginIfSamePrice,
      profitLossIfSamePrice,
      priceIncreaseNeeded,
      newRevenueWithPriceIncrease,
      newVATWithPriceIncrease,
      newMarginWithPriceIncrease,
      vatBurdenIfSamePrice,
      vatBurdenAsPercentOfProfit,
      minRevenueToBreakEven,
      maxRevenueBeforeVAT,
    };
  }, [revenue, marginPercent]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const businessTypeLabels = {
    retail: 'Розница / E-commerce',
    wholesale: 'Оптовая торговля',
    production: 'Производство',
    services: 'Услуги / Консалтинг',
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-8 shadow-lg mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Рассчитайте влияние НДС‑2026 на ваш бизнес</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Revenue Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Годовой оборот (руб.)
            </label>
            <div className="relative">
              <input
                type="range"
                min="1000000"
                max="200000000"
                step="1000000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full mt-3 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 font-semibold text-slate-900"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Диапазон: 1 млн — 200 млн руб.
            </p>
          </div>

          {/* Margin Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Средняя маржа (%)
            </label>
            <div className="relative">
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={marginPercent}
                onChange={(e) => setMarginPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <input
                type="number"
                value={marginPercent}
                onChange={(e) => setMarginPercent(Number(e.target.value))}
                className="w-full mt-3 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 font-semibold text-slate-900"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Диапазон: 5% — 50%
            </p>
          </div>

          {/* Business Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Тип бизнеса
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(businessTypeLabels) as Array<keyof typeof businessTypeLabels>).map((type) => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-sm ${
                    businessType === type
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {businessTypeLabels[type]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Threshold Warning */}
        {calculations.isAboveThreshold && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>⚠️ Важно:</strong> Ваш оборот превышает 20 млн руб., поэтому с 2026 года вы будете обязаны платить НДС по ставке 22%.
            </p>
          </div>
        )}
        {!calculations.isAboveThreshold && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>✓ Хорошая новость:</strong> При текущем обороте вы не попадаете под НДС‑2026. Но планируйте развитие с учётом этого порога.
            </p>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Current Situation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h4 className="text-lg font-bold text-slate-900 mb-4">Сейчас (до 2026)</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">НДС (18%)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(calculations.currentVAT)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Маржа</span>
              <span className="font-semibold text-slate-900">{formatCurrency(calculations.currentMargin)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-600 font-medium">Ваша прибыль</span>
              <span className="font-bold text-lg text-teal-600">{formatCurrency(calculations.currentProfit)}</span>
            </div>
          </div>
        </div>

        {/* After 2026 - Same Price */}
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <h4 className="text-lg font-bold text-slate-900 mb-4">С 2026 (если не менять цены)</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">НДС (22%)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(calculations.newVATIfSamePrice)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-600">Маржа</span>
              <span className="font-semibold text-slate-900">{formatCurrency(calculations.newMarginIfSamePrice)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-600 font-medium">Убыток прибыли</span>
              <span className={`font-bold text-lg ${calculations.profitLossIfSamePrice < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {calculations.profitLossIfSamePrice < 0 ? '−' : '+'}{formatCurrency(Math.abs(calculations.profitLossIfSamePrice))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200 p-6 mb-8">
        <h4 className="text-lg font-bold text-slate-900 mb-4">📊 Анализ влияния НДС</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-600 mb-2">Дополнительный налог</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(calculations.vatBurdenIfSamePrice)}</p>
            <p className="text-xs text-slate-500 mt-1">в год при неизменных ценах</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Это составит от прибыли</p>
            <p className="text-2xl font-bold text-red-600">{formatPercent(calculations.vatBurdenAsPercentOfProfit)}</p>
            <p className="text-xs text-slate-500 mt-1">вашей текущей маржи</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Нужно поднять цены на</p>
            <p className="text-2xl font-bold text-teal-600">{formatPercent(calculations.priceIncreaseNeeded)}</p>
            <p className="text-xs text-slate-500 mt-1">чтобы сохранить маржу</p>
          </div>
        </div>
      </div>

      {/* Scenario Comparison */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors mb-6"
      >
        <span className="font-semibold text-slate-900">Сценарий: Повышение цен на {formatPercent(calculations.priceIncreaseNeeded)}</span>
        <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </button>

      {showDetails && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h4 className="font-bold text-slate-900 mb-4">Если вы поднимете цены на {formatPercent(calculations.priceIncreaseNeeded)}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-2">Новый годовой оборот</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(calculations.newRevenueWithPriceIncrease)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">НДС к уплате</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(calculations.newVATWithPriceIncrease)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Ваша маржа останется</p>
              <p className="text-xl font-bold text-teal-600">{formatCurrency(calculations.newMarginWithPriceIncrease)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Изменение прибыли</p>
              <p className="text-xl font-bold text-green-600">±0 руб. (сохранено)</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Совет:</strong> Это оптимальный сценарий, если ваши клиенты готовы к повышению цен. Однако нужно учитывать конкуренцию и спрос на рынке.
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white text-center">
        <h4 className="text-xl font-bold mb-2">Нужна помощь с планированием?</h4>
        <p className="text-teal-100 mb-4">
          Наши консультанты помогут вам выбрать оптимальную стратегию и подготовиться к НДС‑2026.
        </p>
        <a
          href="#signup"
          className="inline-block px-6 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
        >
          Записаться на диагностику
        </a>
      </div>
    </div>
  );
}
