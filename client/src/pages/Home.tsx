import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <div className="font-bold text-sm tracking-wider text-slate-900">MAXIMA CONSULTING</div>
                <div className="text-xs tracking-widest text-slate-500 uppercase">Финансовый консалтинг</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => document.getElementById('ndsv-block')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors hidden md:block"
              >
                НДС‑2026
              </button>
              <button 
                onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm px-4 py-2 border border-teal-200 text-teal-700 rounded-full hover:bg-teal-50 transition-colors hidden md:block"
              >
                Кейсы
              </button>
              <a href="#signup" className="text-sm px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
                Записаться
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Финансы без тумана</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Вы знаете, сколько зарабатывает бизнес — <span className="text-teal-600">но не знаете, куда уходят деньги</span>?
              </h1>
              <p className="text-lg text-slate-600 mb-4 max-w-2xl">
                Помогаем собственникам с выручкой от 5 до 100 млн руб. наконец увидеть реальную картину:
                где прибыль, где дыры, как выжить под НДС‑2026 — и принимать решения с холодной головой.
              </p>
              <p className="text-slate-600 mb-8 max-w-2xl">
                Без бухгалтерского птичьего языка. Без «сначала нужно посмотреть документы» на три месяца.
                Первый результат — уже после диагностики.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#signup" className="px-6 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-colors text-center">
                  Узнать, где утечки денег — бесплатно
                </a>
                <a href="#signup" className="px-6 py-3 border-2 border-teal-200 text-teal-700 rounded-full font-semibold hover:bg-teal-50 transition-colors text-center">
                  Получить финансовый разбор
                </a>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  Диагностика — 60 минут · без обязательств
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  Работаем с торговлей, производством, e‑commerce, HoReCa
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  Конфиденциально · NDA по запросу
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Что вы получите</p>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                    <div className="font-bold text-lg text-slate-900">1 встреча</div>
                    <div className="text-xs text-slate-600">Диагностика P&L и денежных потоков</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                    <div className="font-bold text-lg text-slate-900">3 сценария</div>
                    <div className="text-xs text-slate-600">Как жить с НДС‑2026 и не сжечь маржу</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200 mb-6">
                <p className="text-sm text-slate-700">
                  <strong className="text-teal-700">Без переплаты за «финансового директора в штат».</strong> Мы подключаемся как CFO‑light.
                </p>
              </div>
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full text-sm text-slate-600 hover:text-slate-900 transition-colors border-b border-dashed border-slate-400 pb-2"
              >
                Поговорить о своей ситуации →
              </button>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section id="audience" className="bg-white py-20 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2">Для кого эта услуга</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Вы узнаете себя в одном из этих портретов?</h2>
              <p className="text-slate-600 max-w-2xl">
                Работаем с собственниками малого и среднего бизнеса — когда обороты уже заметные,
                а системности в финансах пока нет.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Собственник торговой компании или ИП</h3>
                <p className="text-slate-600 text-sm">
                  Выручка есть — денег нет. Приходит НДС, и вы не понимаете, как перестроить схему, чтобы не переплатить.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Владелец производства или сервиса</h3>
                <p className="text-slate-600 text-sm">
                  Компания выросла: сотрудники, аренда, несколько направлений. Но какой продукт реально зарабатывает — не видно.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">E‑commerce и оптовик</h3>
                <p className="text-slate-600 text-sm">
                  Деньги зависают в товаре, кассовые разрывы стали нормой. Банк просит пояснения по оборотам.
                </p>
              </div>
              <div id="ndsv-block" className="p-6 bg-teal-50 rounded-lg border border-teal-200">
                <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold mb-3">
                  Фокус на НДС‑2026
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Предприниматель перед переходом на НДС</h3>
                <p className="text-slate-600 text-sm">
                  С 2026 года НДС начинается с 20 млн руб. оборота по ставке 22%. Как перестроить ценообразование?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="problems" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2">Какие боли закрываем</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Что вас сюда привело?</h2>
              <p className="text-slate-600 max-w-2xl">
                Почти всегда история начинается с одной из этих ситуаций.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: "₽", title: "Деньги в бизнесе «есть», но вывести нечего", desc: "Счёт загружен оборотом, а у собственника на личной карте пусто." },
                { icon: "📋", title: "Отчётность есть — управленческих цифр нет", desc: "Бухгалтер делает отчёты для налоговой, но они не помогают принимать решения." },
                { icon: "📊", title: "P&L вы никогда не видели в глаза", desc: "Прибыль «по ощущениям» есть, но где она рождается — неизвестно." },
                { icon: "⚠️", title: "Налоговая нагрузка вызывает панику", desc: "НДС, страховые взносы — цифры приходят постфактум, а не просчитываются заранее." },
                { icon: "🧩", title: "Непонятно, какие направления реально тянут бизнес", desc: "Часть продуктов вывозит компанию, а часть системно «съедает» маржу." },
                { icon: "🏦", title: "Нужны деньги на рост — а финкартина не готова", desc: "Банк, партнёры или инвесторы ждут понятные цифры и модель." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-sm text-slate-600">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="bg-white py-20 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2">Процесс</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Четыре шага от хаоса к ясности</h2>
              <p className="text-slate-600 max-w-2xl">
                Мы не просим вас месяцами готовить данные — начинаем с разговора, быстро собираем картину и выдаём решения.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { num: "1", title: "Диагностика · 60 минут", desc: "Обсуждаем ваш бизнес, выручку, структуру расходов. Без домашних заданий — достаточно честного разговора." },
                { num: "2", title: "Аудит и сборка картины · 3–7 дней", desc: "Работаем с вашими данными: 1С, Excel, выгрузки из банка. Собираем реальную P&L и Cash Flow." },
                { num: "3", title: "Разбор и решения · встреча 90 минут", desc: "Показываем, что нашли, объясняем на человеческом языке, предлагаем конкретные шаги." },
                { num: "4", title: "Сопровождение (опционально)", desc: "Ежемесячный мониторинг, ответы на вопросы, помощь в переговорах с банком и партнёрами." },
              ].map((step, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                      {step.num}
                    </div>
                    <div className="font-semibold text-slate-900">{step.title}</div>
                  </div>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section id="cases" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2">Кейсы</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Примеры из реальной практики</h2>
              <p className="text-slate-600 max-w-2xl">
                Цифры изменены, но логика и последствия сохранены.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  badge: "Торговля · НДС",
                  title: "Как перейти на НДС‑2026 и не потерять маржу",
                  situation: "Оптовая компания с выручкой 23 млн руб. попадает под НДС 22%.",
                  result: "Собственник принял взвешенное решение, сохранил ключевых клиентов и маржу выше плановой.",
                  time: "2 недели"
                },
                {
                  badge: "Производство · Учёт",
                  title: "Почему две продуктовые линейки съедали прибыль",
                  situation: "Производство с тремя продуктовыми линейками. По ощущениям все были прибыльными.",
                  result: "Две линейки оказались в минусе. После перераспределения ресурсов маржа выросла без увеличения выручки.",
                  time: "5 недель"
                },
                {
                  badge: "E‑commerce · Cash Flow",
                  title: "Как уменьшить кассовые разрывы и получить кредит",
                  situation: "Интернет‑магазин с выручкой 15 млн руб. Постоянные кассовые разрывы, банк отказал в кредите.",
                  result: "Кредит одобрен, кассовые разрывы сократились вдвое за квартал.",
                  time: "4 недели"
                },
              ].map((caseItem, idx) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold mb-3">
                    {caseItem.badge}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{caseItem.title}</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong className="text-slate-900">Ситуация.</strong> {caseItem.situation}</p>
                    <p><strong className="text-slate-900">Результат.</strong> {caseItem.result}</p>
                    <p><strong className="text-slate-900">Срок.</strong> {caseItem.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-white py-20 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2">FAQ</p>
              <h2 className="text-3xl font-bold text-slate-900">Ответы на частые вопросы</h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              {[
                { q: "Вы ведёте бухгалтерию?", a: "Нет. Мы занимаемся управленческим учётом и финансовым анализом — это другой уровень работы." },
                { q: "Нужно ли мне что‑то готовить заранее?", a: "Для первой диагностики — ничего. Просто приходите и рассказывайте, как есть." },
                { q: "Мой бизнес небольшой, вам это интересно?", a: "Да, мы работаем с компаниями от 5 млн руб. выручки. На этом уровне финансовые ошибки особенно дороги." },
                { q: "Сколько стоит работа?", a: "Диагностика — бесплатно. Стоимость дальнейшей работы зависит от формата: разовый аудит, проект под НДС‑2026 или ежемесячное сопровождение." },
                { q: "У меня уже есть бухгалтер. Зачем вы?", a: "Ваш бухгалтер ведёт учёт для государства. Мы помогаем управлять деньгами для вас." },
                { q: "Работаете ли вы онлайн?", a: "Да, основной формат — онлайн по всей России. Для клиентов в Тверской области возможны очные встречи." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-2">{item.q}</div>
                  <p className="text-sm text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="signup" className="py-20 bg-gradient-to-br from-teal-50 via-white to-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                ● Финансовая диагностика · 60 минут · бесплатно
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Разберём, где в вашем бизнесе теряются деньги — за одну встречу
              </h2>
              <p className="text-slate-600 mb-8">
                Заполните короткую форму, и мы свяжемся с вами, чтобы согласовать удобное время.
                Никакого давления и продаж: сначала разберёмся в вашей ситуации, а потом вы сами решите.
              </p>
              <form className="space-y-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                <input 
                  type="text" 
                  placeholder="Телефон или Telegram" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                <input 
                  type="text" 
                  placeholder="Оборот бизнеса в год (примерно)" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
                <textarea 
                  placeholder="Кратко опишите вашу ситуацию" 
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 resize-none"
                />
                <button type="submit" className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                  Записаться на диагностику
                </button>
              </form>
              <p className="text-xs text-slate-500 text-center">
                Первая встреча бесплатна. Ваши данные не передаются третьим лицам, по запросу подписываем NDA.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div>
              © <span id="year"></span> MAXIMA CONSULTING. Финансовый консалтинг для собственника бизнеса.
            </div>
            <div className="flex gap-6">
              <span>Работаем онлайн по всей России</span>
              <span>Тверская область — возможны встречи офлайн</span>
            </div>
          </div>
        </div>
      </footer>

      <script>{`document.getElementById('year').textContent = new Date().getFullYear();`}</script>
    </div>
  );
}
