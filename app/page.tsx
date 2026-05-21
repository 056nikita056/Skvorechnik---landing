"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import {
  Banknote,
  Clock3,
  Coffee,
  CreditCard,
  HeartHandshake,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
  Star,
  Store,
  Timer,
} from "lucide-react";

type Drink = {
  name: string;
  desc: string;
  price: string;
  tag: "Хит" | "Новинка" | "Авторский" | "Тренд" | "Специальный" | null;
};

type TabKey = "classic" | "special" | "nonCoffee";

const navItems = [
  { label: "Меню", href: "#menu" },
  { label: "О нас", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const menuTabs: Array<{ key: TabKey; label: string }> = [
  { key: "classic", label: "☕ Classic Coffee" },
  { key: "special", label: "✨ Special Coffee" },
  { key: "nonCoffee", label: "🍫 Non-Coffee" },
];

const menuItems: Record<TabKey, Drink[]> = {
  classic: [
    {
      name: "Ристретто",
      desc: "Короткий и плотный кофейный глоток",
      price: "70 / 110 / 140 ₽",
      tag: null,
    },
    {
      name: "Американо / Эспрессо / Лунго",
      desc: "База кофейной классики в трёх характерах",
      price: "100 / 130 / 160 ₽",
      tag: null,
    },
    {
      name: "Flat White / Long Black",
      desc: "Плотный кофейный вкус без лишней сладости",
      price: "110 / 150 / 190 ₽",
      tag: null,
    },
    {
      name: "Капучино",
      desc: "Эспрессо и молочная текстура. Главная классика",
      price: "100 / 140 / 180 ₽",
      tag: "Хит",
    },
    {
      name: "Раф",
      desc: "Кофе со сливочной мягкостью",
      price: "120 / 160 / 200 ₽",
      tag: null,
    },
    {
      name: "Латте Макиато",
      desc: "Молочный, высокий, мягкий",
      price: "120 / 160 ₽",
      tag: null,
    },
    {
      name: "Сироп / мёд / шоколад",
      desc: "Добавка к напитку на ваш вкус",
      price: "20 / 30 / 40 ₽",
      tag: null,
    },
  ],
  special: [
    {
      name: "Джанго",
      desc: "Эспрессо, молочный шоколад",
      price: "140 / 180 ₽",
      tag: "Авторский",
    },
    {
      name: "Хьюстон",
      desc: "Американо, лимон, мёд",
      price: "120 / 160 / 200 ₽",
      tag: "Авторский",
    },
    {
      name: "Фил",
      desc: "Два сиропа, корица, газировка",
      price: "120 / 170 / 220 ₽",
      tag: "Авторский",
    },
    {
      name: "Торонто",
      desc: "Капучино, сливки, пряности",
      price: "120 / 170 / 220 ₽",
      tag: "Авторский",
    },
    {
      name: "Стокгольм",
      desc: "Халва, мёд",
      price: "220 ₽",
      tag: "Авторский",
    },
    {
      name: "Полли",
      desc: "Латте макиато, молочный шоколад",
      price: "140 / 200 ₽",
      tag: "Авторский",
    },
    {
      name: "Босоногий пёс",
      desc: "Пина колада, бабл гам",
      price: "140 / 200 ₽",
      tag: "Авторский",
    },
    {
      name: "Кеплер",
      desc: "Шоколадное печенье, курасао",
      price: "120 / 170 / 220 ₽",
      tag: "Авторский",
    },
    {
      name: "Пряный раф",
      desc: "Острый манго, кардамон",
      price: "120 / 170 / 220 ₽",
      tag: "Авторский",
    },
    {
      name: "Кокер",
      desc: "Яблоко, бадьян, мускат, имбирь, кардамон",
      price: "120 / 170 / 220 ₽",
      tag: "Авторский",
    },
    {
      name: "Почти безголовый Ник",
      desc: "Очень крепкий кофе, мёд",
      price: "180 / 240 ₽",
      tag: "Авторский",
    },
    {
      name: "Миссис Коллинс",
      desc: "Апельсин, ваниль, имбирь",
      price: "140 / 200 ₽",
      tag: "Авторский",
    },
    {
      name: "16-ый",
      desc: "Миндальное печенье, банан, шоколад",
      price: "170 / 220 ₽",
      tag: "Авторский",
    },
    {
      name: "Бруно",
      desc: "Бобы тонка, миндаль, мускат",
      price: "170 / 220 ₽",
      tag: "Авторский",
    },
  ],
  nonCoffee: [
    {
      name: "Горячий шоколад",
      desc: "Плотный шоколадный напиток",
      price: "150 / 180 ₽",
      tag: null,
    },
    {
      name: "Какао",
      desc: "Миндальное, карамельное или тыквенное",
      price: "120 / 150 ₽",
      tag: null,
    },
    {
      name: "Пряный чай",
      desc: "Зелёный или матча",
      price: "110 / 180 / 220 ₽",
      tag: null,
    },
    {
      name: "Стимер",
      desc: "Молочный напиток без кофе",
      price: "130 ₽",
      tag: null,
    },
  ],
};

const tagClass: Record<NonNullable<Drink["tag"]>, string> = {
  Хит: "bg-caramel text-white",
  Новинка: "bg-green-500 text-white",
  Авторский: "bg-coffee-800 text-caramel-light",
  Тренд: "bg-violet-500 text-white",
  Специальный: "bg-blue-500 text-white",
};

const stats = [
  { value: "5,0 ★", label: "рейтинг" },
  { value: "500+", label: "оценок" },
  { value: "360+", label: "отзывов" },
  { value: "от 70 ₽", label: "кофе" },
];

const perks = [
  {
    icon: HeartHandshake,
    title: "Приветливые бариста",
    text: "Подскажут напиток и настроят вкус под ваше настроение.",
  },
  {
    icon: Timer,
    title: "Быстро с собой",
    text: "Формат без столиков: зашли, заказали, забрали и побежали дальше.",
  },
  {
    icon: Sparkles,
    title: "Огромный выбор",
    text: "Классика, авторские сиропы и необычные сочетания вкусов.",
  },
  {
    icon: Navigation,
    title: "Удобно в центре",
    text: "Толмачёва, 21: рядом остановка «Площадь Труда» и метро.",
  },
  {
    icon: Banknote,
    title: "Доступные цены",
    text: "Кофе от 70 ₽, средний счёт около 170 ₽.",
  },
  {
    icon: CreditCard,
    title: "Оплата картой",
    text: "Без лишней суеты: берите кофе так, как удобно.",
  },
];

const reviews = [
  {
    author: "Михаил С.",
    text: "Безоговорочно лучшая кофейня в городе. Огромный выбор, персонал невероятно внимательный.",
  },
  {
    author: "Анастасия М.",
    text: "Необычное сочетание вкусов сиропов — очень вкусно! Спросят, как сделать именно так, как нравится.",
  },
  {
    author: "Евгений",
    text: "Приветливые бариста всегда помогут с выбором. Капучино отличный, цены радуют.",
  },
];

const aboutHighlights = [
  { title: "Авторские сиропы", icon: Sparkles },
  { title: "Необычные вкусы", icon: Coffee },
  { title: "Средний счёт ~170 ₽", icon: Banknote },
];

function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MotionLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
  ariaLabel?: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(13, 7, 5, 0.78)" : "rgba(13, 7, 5, 0)",
        boxShadow: scrolled ? "0 18px 60px rgba(0, 0, 0, 0.24)" : "none",
      }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel text-coffee-950 shadow-glow">
            <Coffee className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-black">Скворечник</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-caramel-light"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <MotionLink
            href="https://wa.me/79655014400"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-coffee-950 transition hover:bg-caramel-light"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </MotionLink>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          <MenuIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-coffee-950/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}

function Hero() {
  const smoke = [
    { className: "left-[7%] top-[18%] h-64 w-64", duration: 10 },
    { className: "right-[8%] top-[34%] h-80 w-80", duration: 12 },
    { className: "bottom-[10%] left-1/2 h-72 w-72 -translate-x-1/2", duration: 14 },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-coffee-950 px-4 py-24 text-center text-white"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {smoke.map((item) => (
          <motion.div
            key={item.className}
            animate={{ y: [0, -40, 0], opacity: [0.26, 0.48, 0.26] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute rounded-full bg-caramel/10 blur-[100px] ${item.className}`}
          />
        ))}
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-coffee-950/95" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-caramel/30 bg-white/10 px-4 py-2 text-sm font-semibold text-caramel-light backdrop-blur-md">
          <Star className="h-4 w-4 fill-caramel-light text-caramel-light" aria-hidden="true" />
          5,0 · Лучшая кофейня Екатеринбурга
        </div>
        <h1 className="font-serif text-[clamp(4rem,13vw,8rem)] font-black leading-[0.9] text-white">
          Скворечник
        </h1>
        <p className="mt-6 text-xl font-semibold text-caramel-light sm:text-2xl">
          Кофе с собой в сердце города
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
          Авторские сиропы, необычные вкусы и бариста, которые помнят: идеальный
          кофе начинается с вопроса «как вам больше нравится?».
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MotionLink
            href="#menu"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-caramel px-7 py-3 font-bold text-coffee-950 shadow-glow transition hover:bg-caramel-light"
          >
            Смотреть меню
          </MotionLink>
          <MotionLink
            href="https://yandex.ru/profile/1931220183"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 py-3 font-bold text-white transition hover:border-caramel-light hover:text-caramel-light"
          >
            Открыть на карте
          </MotionLink>
        </div>
      </motion.div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section id="stats" className="bg-white px-4 py-8">
      <SectionReveal className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="text-center">
            <div className="font-serif text-3xl font-black text-coffee-800 md:text-4xl">
              {item.value}
            </div>
            <div className="mt-1 text-sm font-semibold uppercase text-stone-400">
              {item.label}
            </div>
          </div>
        ))}
      </SectionReveal>
    </section>
  );
}

function MenuSection() {
  const [active, setActive] = useState<TabKey>("classic");

  return (
    <section id="menu" className="bg-cream-dark px-4 py-24">
      <SectionReveal className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase text-caramel">Меню</span>
          <h2 className="mt-3 font-serif text-4xl font-black text-coffee-900 sm:text-5xl">
            Наше меню
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Классика и авторские напитки для тех, кто берёт все свои дела в руки
            вместе со стаканом.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {menuTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`relative rounded-full px-5 py-3 text-sm transition ${
                active === tab.key
                  ? "font-semibold text-coffee-900"
                  : "font-medium text-stone-500 hover:text-coffee-800"
              }`}
            >
              {tab.label}
              {active === tab.key ? (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-x-4 -bottom-0.5 h-1 rounded-full bg-caramel"
                />
              ) : null}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {menuItems[active].map((drink) => (
            <motion.article
              key={drink.name}
              whileHover={{ y: -4, boxShadow: "0 22px 46px rgba(59, 31, 14, 0.16)" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative flex min-h-52 flex-col rounded-2xl bg-white p-6 transition"
            >
              {drink.tag ? (
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${tagClass[drink.tag]}`}
                >
                  {drink.tag}
                </span>
              ) : null}
              <div className={drink.tag ? "pr-20" : ""}>
                <h3 className="font-serif text-2xl font-bold text-coffee-800">
                  {drink.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-500">{drink.desc}</p>
              </div>
              <div className="mt-auto pt-8 text-lg font-bold text-caramel">
                {drink.price}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-white/70 p-5 text-center shadow-sm backdrop-blur sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-stone-600">
            Цены указаны по размерам L / XL / XXL. Точный состав и наличие уточняйте у бариста — меню обновляется.
          </p>
          <MotionLink
            href="https://wa.me/79655014400"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-coffee-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-coffee-800"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Спросить о меню
          </MotionLink>
        </div>
      </SectionReveal>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-white px-4 py-24">
      <SectionReveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-coffee-950 p-8 text-white shadow-glow sm:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/coffee-cup.png')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-coffee-950/92 via-coffee-900/72 to-black/28" />
          <div className="relative z-10 font-serif text-7xl leading-none text-caramel-light">“</div>
          <p className="relative z-10 mt-2 font-serif text-3xl font-bold leading-tight">
            Кофе с собой, который хочется сделать маленьким ежедневным ритуалом.
          </p>
          <div className="relative z-10 mt-8 flex items-center gap-3 text-caramel-light">
            <Store className="h-5 w-5" aria-hidden="true" />
            ул. Толмачёва, 21, этаж 1
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase text-caramel">О нас</span>
          <h2 className="mt-3 font-serif text-4xl font-black text-coffee-900 sm:text-5xl">
            Небольшая кофейня в центре, где вкус не делают «на автомате»
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            «Скворечник» — формат кофе с собой без столиков: всё внимание уходит
            в напиток, скорость и разговор с бариста. Здесь любят необычные
            сиропы, честную классику и вопрос «послаще, покрепче или помягче?».
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-caramel/20 bg-cream p-5 font-semibold text-coffee-800"
                >
                  <span>{item.title}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-caramel/15 text-caramel">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-coffee-950 px-4 py-24 text-white">
      <SectionReveal className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-sm font-bold uppercase text-caramel-light">
            Почему мы
          </span>
          <h2 className="mt-3 font-serif text-4xl font-black sm:text-5xl">
            За кофе, который понимает ваш маршрут и вкус
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <motion.article
                key={perk.title}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-caramel/15 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-caramel/15 text-caramel-light">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-bold">{perk.title}</h3>
                <p className="mt-3 leading-7 text-white/70">{perk.text}</p>
              </motion.article>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="bg-cream px-4 py-24">
      <SectionReveal className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase text-caramel">Отзывы</span>
          <h2 className="mt-3 font-serif text-4xl font-black text-coffee-900 sm:text-5xl">
            Гости возвращаются за вкусом и вниманием
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.author} className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="font-serif text-6xl leading-none text-caramel">“</div>
              <div className="mt-1 flex text-yellow-400" aria-label="5 из 5 звёзд">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-5 leading-7 text-stone-600">{review.text}</p>
              <p className="mt-6 font-bold text-coffee-800">{review.author}</p>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="contacts" className="bg-white px-4 py-24">
      <SectionReveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <span className="text-sm font-bold uppercase text-caramel">Контакты</span>
          <h2 className="mt-3 font-serif text-4xl font-black text-coffee-900 sm:text-5xl">
            Забегайте за стаканом на Толмачёва
          </h2>
          <div className="mt-8 space-y-5">
            <a
              href="https://yandex.ru/profile/1931220183"
              className="flex gap-4 rounded-2xl border border-stone-200 p-5 transition hover:border-caramel/60"
            >
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-caramel" aria-hidden="true" />
              <span>
                <span className="block font-bold text-coffee-800">Адрес</span>
                <span className="mt-1 block text-stone-600">
                  ул. Толмачёва, 21, этаж 1, Екатеринбург
                </span>
              </span>
            </a>
            <a
              href="tel:+79655014400"
              className="flex gap-4 rounded-2xl border border-stone-200 p-5 transition hover:border-caramel/60"
            >
              <Phone className="mt-1 h-6 w-6 shrink-0 text-caramel" aria-hidden="true" />
              <span>
                <span className="block font-bold text-coffee-800">Телефон</span>
                <span className="mt-1 block text-stone-600">+7 (965) 501-44-00</span>
              </span>
            </a>
            <div className="flex gap-4 rounded-2xl border border-stone-200 p-5">
              <Clock3 className="mt-1 h-6 w-6 shrink-0 text-caramel" aria-hidden="true" />
              <span>
                <span className="block font-bold text-coffee-800">Как добраться</span>
                <span className="mt-1 block text-stone-600">
                  метро «Площадь 1905 года» — 930 м, остановка «Площадь Труда» — 156 м
                </span>
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MotionLink
              href="https://wa.me/79655014400"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-caramel px-6 py-3 font-bold text-coffee-950 transition hover:bg-caramel-light"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Написать в WhatsApp
            </MotionLink>
            <MotionLink
              href="https://yandex.ru/profile/1931220183"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-coffee-800/20 px-6 py-3 font-bold text-coffee-800 transition hover:border-caramel hover:text-caramel"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Яндекс Карты
            </MotionLink>
          </div>
        </div>
        <a
          href="https://yandex.ru/profile/1931220183"
          className="group relative min-h-[420px] overflow-hidden rounded-2xl bg-cream-dark p-8 text-white shadow-glow"
          aria-label="Открыть Скворечник на Яндекс Картах"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/map-screenshot.png')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/0 to-coffee-950/82" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coffee-950/95 to-transparent" />
          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-coffee-800 shadow-sm backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Центр Екатеринбурга
            </div>
            <div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-caramel text-coffee-950 transition group-hover:scale-105">
                <Coffee className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-4xl font-black">Толмачёва, 21</h3>
              <p className="mt-3 max-w-md text-white/70">
                Нажмите, чтобы открыть карточку кофейни на Яндекс Картах.
              </p>
            </div>
          </div>
        </a>
      </SectionReveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-coffee-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel text-coffee-950">
            <Coffee className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-serif text-xl font-black">Скворечник</span>
            <span className="text-sm text-white/50">Кофе с собой</span>
          </span>
        </a>
        <div className="flex flex-wrap gap-5 text-sm text-white/70">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-caramel-light">
              {item.label}
            </a>
          ))}
        </div>
        <div className="text-sm text-white/70 md:text-right">
          <a href="tel:+79655014400" className="block transition hover:text-caramel-light">
            +7 (965) 501-44-00
          </a>
          <p className="mt-1">© 2026 Скворечник</p>
        </div>
      </div>
    </footer>
  );
}

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Скворечник",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Толмачёва, 21, этаж 1",
      addressLocality: "Екатеринбург",
      addressCountry: "RU",
    },
    telephone: "+79655014400",
    url: "https://yandex.ru/profile/1931220183",
    servesCuisine: "Coffee",
      priceRange: "₽",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: 500,
      reviewCount: 360,
      bestRating: "5",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    })),
    sameAs: ["https://wa.me/79655014400", "https://yandex.ru/profile/1931220183"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <MenuSection />
        <AboutSection />
        <WhySection />
        <ReviewsSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
}
