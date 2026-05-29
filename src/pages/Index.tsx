import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TEAM = [
  {
    name: "Арина Волкова",
    role: "Главный редактор и основатель",
    bio: "Литературный критик, автор трёх сборников прозы. Создала Silent Page как пространство подлинного творчества.",
    photo: "https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/2b28481b-7076-4dd1-9c32-be48650b64bd.jpg",
  },
  {
    name: "Даниил Серов",
    role: "Технический директор",
    bio: "Архитектор платформы. Превращает тишину текста в живой цифровой опыт.",
    photo: "https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/8f88b896-c660-4c3a-b8b2-8ebbb43e1d9f.jpg",
  },
  {
    name: "Миа Соловьёва",
    role: "Куратор сообщества и арт-директор",
    bio: "Создаёт визуальный язык платформы. Объединяет авторов вокруг общей эстетики молчания.",
    photo: "https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/91e49520-a569-422e-82d8-910a7b2c6a5f.jpg",
  },
];

const SERVICES = [
  {
    icon: "BookOpen",
    tag: "Товар",
    title: "Печатный сборник Silent Page",
    desc: "Ежемесячное издание лучших рассказов платформы. Бумага, запах типографии, вечность. Тираж 500 экземпляров.",
    price: "от 890 ₽",
  },
  {
    icon: "PenLine",
    tag: "Услуга",
    title: "Рецензия и редактура текста",
    desc: "Профессиональный разбор рукописи с литературным экспертом. Структура, стиль, атмосфера — всё встанет на место.",
    price: "от 2 500 ₽",
  },
  {
    icon: "Sparkles",
    tag: "Услуга",
    title: "Премиум-аккаунт автора",
    desc: "Расширенное хранилище черновиков, аудио-заметок и иллюстраций. Приоритет в еженедельных подборках редакции.",
    price: "490 ₽ / мес",
  },
];

const WORKS = [
  { title: "Глина после дождя", genre: "Роман", year: "2024", reads: "1 240" },
  { title: "Семь слов о потере", genre: "Повесть", year: "2023", reads: "876" },
  { title: "Мерцание", genre: "Сборник рассказов", year: "2023", reads: "2 103" },
  { title: "Где кончается луч", genre: "Эссе", year: "2022", reads: "541" },
];

const BLOG_POSTS = [
  {
    date: "18 мая 2024",
    title: "О тишине как инструменте",
    excerpt:
      "Писать — значит уметь молчать правильно. Каждый пропуск, каждое многоточие — это не пустота, а звучание...",
  },
  {
    date: "4 апреля 2024",
    title: "Что я прочла этой зимой",
    excerpt:
      "Три книги, которые изменили что-то в структуре моего предложения. И одна, которую я не смогла дочитать, — что тоже урок.",
  },
  {
    date: "19 февраля 2024",
    title: "Рукопись как дневник",
    excerpt:
      "Граница между личным дневником и художественным текстом — тончайшая. Иногда её вовсе нет.",
  },
];

const ILLUSTRATIONS = [
  {
    src: "https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/a3704141-8ee8-4613-ab23-12834b61633d.jpg",
    caption: "Портрет тишины",
  },
  {
    src: "https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/91e49520-a569-422e-82d8-910a7b2c6a5f.jpg",
    caption: "Атмосфера зимы",
  },
  {
    src: "https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/2b28481b-7076-4dd1-9c32-be48650b64bd.jpg",
    caption: "Автор в свете",
  },
];

const SOUNDTRACK = [
  { title: "Spiegel im Spiegel", artist: "Arvo Pärt", duration: "10:18" },
  { title: "Experience", artist: "Ludovico Einaudi", duration: "5:13" },
  { title: "Comptine d'un autre été", artist: "Yann Tiersen", duration: "2:38" },
  { title: "On the Nature of Daylight", artist: "Max Richter", duration: "6:01" },
];

const NAV_ITEMS = ["Главная", "Авторы", "Произведения", "Услуги", "Команда", "Контакты"];

const SECTION_MAP: Record<string, string> = {
  Главная: "home",
  Авторы: "authors",
  Произведения: "works-section",
  Услуги: "services",
  Команда: "team",
  Контакты: "contacts",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [profileTab, setProfileTab] = useState("works");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    const label = Object.keys(SECTION_MAP).find((k) => SECTION_MAP[k] === id);
    if (label) setActiveSection(label);
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen gradient-bg" style={{ backgroundColor: "var(--sp-dark-bg)" }}>

      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card" style={{ borderBottom: "1px solid rgba(123,94,167,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <button className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <img
              src="https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/bucket/479a1cbf-3d8b-4532-a0c4-12c6c391f239.png"
              alt="Silent Page"
              className="h-9 w-auto object-contain"
              style={{ mixBlendMode: "screen", filter: "brightness(1.1)" }}
            />
            <div className="text-left">
              <div className="font-cormorant font-semibold leading-none" style={{ fontSize: "1.2rem", color: "var(--sp-ash-white)" }}>
                Silent Page
              </div>
              <div style={{ color: "var(--sp-ash-grey)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Literary Platform
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(SECTION_MAP[item])} className={`sp-nav-link ${activeSection === item ? "active" : ""}`}>
                {item}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="btn-ghost" style={{ padding: "0.45rem 1.1rem" }}>Войти</button>
            <button className="btn-primary" style={{ padding: "0.45rem 1.1rem" }}>Начать писать</button>
          </div>

          {/* Burger */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--sp-ash-white)" }}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu md:hidden px-6 py-5 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(SECTION_MAP[item])} className="sp-nav-link text-left" style={{ fontSize: "0.9rem" }}>
                {item}
              </button>
            ))}
            <div className="flex gap-3 mt-1">
              <button className="btn-ghost flex-1">Войти</button>
              <button className="btn-primary flex-1">Начать писать</button>
            </div>
          </div>
        )}
      </header>

      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh" style={{ paddingTop: "80px" }}>

        {/* Decorative glows */}
        <div className="absolute top-1/3 left-1/4 opacity-10 pointer-events-none" style={{ width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, var(--sp-deep-purple), transparent)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/3 right-1/4 opacity-10 pointer-events-none" style={{ width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, var(--sp-violet), transparent)", filter: "blur(100px)" }} />
        <div className="absolute top-24 right-20 pointer-events-none" style={{ color: "var(--sp-lavender)", fontSize: "3rem", opacity: 0.08 }}>❧</div>
        <div className="absolute bottom-32 left-16 pointer-events-none" style={{ color: "var(--sp-violet)", fontSize: "2rem", opacity: 0.1, transform: "rotate(20deg)" }}>✦</div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

          <div className="section-label mb-6" style={{ letterSpacing: "0.3em", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            ✦ &nbsp; Literary Platform &nbsp; ✦
          </div>

          <h1
            className="font-cormorant font-light mb-4 leading-none"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--sp-ash-white)", letterSpacing: "-0.02em", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "all 0.75s ease 0.1s" }}
          >
            Silent<span className="purple-gradient-text"> Page</span>
          </h1>

          <div className="sp-divider mb-8" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }} />

          <p
            className="font-cormorant italic mb-10"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--sp-ash-grey)", letterSpacing: "0.05em", maxWidth: "500px", margin: "0 auto 2.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.75s ease 0.3s" }}
          >
            «Where the world fades, the story begins»
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.75s ease 0.4s" }}
          >
            <button className="btn-primary" onClick={() => scrollTo("authors")} style={{ fontSize: "0.85rem" }}>
              Войти в пространство
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("works-section")} style={{ fontSize: "0.85rem" }}>
              Читать произведения
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex justify-center gap-10 sm:gap-16 mt-16"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.75s ease 0.5s" }}
          >
            {[{ value: "2 400+", label: "Авторов" }, { value: "18 000+", label: "Произведений" }, { value: "94 000+", label: "Читателей" }].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-cormorant font-medium" style={{ fontSize: "2rem", color: "var(--sp-lavender)" }}>{stat.value}</div>
                <div className="font-golos" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "var(--sp-ash-grey)", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 scroll-indicator"
          onClick={() => scrollTo("authors")}
          style={{ color: "var(--sp-ash-grey)", opacity: 0.5 }}
        >
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Scroll</span>
          <Icon name="ChevronDown" size={15} />
        </button>
      </section>

      {/* ─── AUTHORS / PROFILE ──────────────────────────────────── */}
      <section id="authors" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Авторы</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--sp-ash-white)" }}>
              Профиль писателя
            </h2>
            <div className="sp-divider mt-6" />
          </div>

          {/* Profile card */}
          <div className="sp-card rounded-xl overflow-hidden max-w-4xl mx-auto sp-glow">

            {/* Cover band */}
            <div className="h-36 relative" style={{ background: "linear-gradient(135deg, var(--sp-deep-purple) 0%, var(--sp-midnight) 60%, rgba(123,94,167,0.25) 100%)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(155,142,196,0.3) 0px, rgba(155,142,196,0.3) 1px, transparent 1px, transparent 18px)" }} />
              <div className="absolute top-3 right-4 section-label" style={{ opacity: 0.4 }}>✦ Silent Page Profile ✦</div>
            </div>

            <div className="px-6 pb-8 relative">
              {/* Avatar row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 mb-6">
                <img
                  src="https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/files/a3704141-8ee8-4613-ab23-12834b61633d.jpg"
                  alt="Author avatar"
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                  style={{ border: "3px solid var(--sp-card-bg)", boxShadow: "0 0 24px rgba(123,94,167,0.35)" }}
                />
                <div className="flex-1 sm:mb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-cormorant font-medium" style={{ fontSize: "1.8rem", color: "var(--sp-ash-white)" }}>
                      Елена Ночная
                    </h3>
                    <span className="font-golos text-xs px-2.5 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg, rgba(45,27,105,0.7), rgba(123,94,167,0.4))", border: "1px solid rgba(155,142,196,0.3)", color: "var(--sp-lavender)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Писатель
                    </span>
                  </div>
                  <p className="font-golos" style={{ fontSize: "0.8rem", color: "var(--sp-ash-grey)" }}>@elena.nochnaya · Москва · Участник с 2022</p>
                </div>
                <div className="flex gap-2 sm:mb-2">
                  <button className="btn-primary flex items-center gap-1.5" style={{ padding: "0.45rem 0.9rem", fontSize: "0.75rem" }}>
                    <Icon name="UserPlus" size={12} />Добавить
                  </button>
                  <button className="btn-ghost flex items-center gap-1.5" style={{ padding: "0.45rem 0.9rem", fontSize: "0.75rem" }}>
                    <Icon name="Mail" size={12} />Написать
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6 p-4 rounded-lg" style={{ background: "rgba(8,6,15,0.5)", border: "1px solid rgba(123,94,167,0.1)" }}>
                <p className="sp-prose" style={{ fontSize: "1rem" }}>
                  «Пишу о том, что находится между словами. О пространстве, которое не поддаётся описанию, но именно в нём — вся суть. Три романа, два сборника, одна неоконченная пьеса.»
                </p>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto mb-6" style={{ borderBottom: "1px solid rgba(123,94,167,0.15)" }}>
                {[
                  { id: "works", label: "Произведения", icon: "BookOpen" },
                  { id: "blog", label: "Блог", icon: "FileText" },
                  { id: "illustrations", label: "Иллюстрации", icon: "Image" },
                  { id: "soundtrack", label: "Саундтрек", icon: "Music" },
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setProfileTab(tab.id)} className={`sp-tab flex items-center gap-1.5 whitespace-nowrap ${profileTab === tab.id ? "active" : ""}`}>
                    <Icon name={tab.icon as "BookOpen"} size={12} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: Works */}
              {profileTab === "works" && (
                <div className="grid gap-3">
                  {WORKS.map((work, i) => (
                    <div key={i} className="work-card rounded-lg p-4 flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-12 rounded flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--sp-deep-purple), var(--sp-violet))" }}>
                        <Icon name="BookOpen" size={15} style={{ color: "white" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-cormorant font-medium truncate" style={{ fontSize: "1.05rem", color: "var(--sp-ash-white)" }}>{work.title}</div>
                        <div className="font-golos" style={{ fontSize: "0.73rem", color: "var(--sp-ash-grey)" }}>{work.genre} · {work.year}</div>
                      </div>
                      <div className="font-golos flex items-center gap-1" style={{ fontSize: "0.73rem", color: "var(--sp-ash-grey)" }}>
                        <Icon name="Eye" size={11} />{work.reads}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Blog */}
              {profileTab === "blog" && (
                <div className="flex flex-col gap-5">
                  {BLOG_POSTS.map((post, i) => (
                    <div key={i} className="blog-card cursor-pointer group">
                      <div className="font-golos mb-1" style={{ fontSize: "0.7rem", color: "var(--sp-violet)", letterSpacing: "0.08em" }}>{post.date}</div>
                      <h4 className="font-cormorant font-medium mb-1" style={{ fontSize: "1.15rem", color: "var(--sp-ash-white)" }}>{post.title}</h4>
                      <p className="font-cormorant italic" style={{ fontSize: "0.95rem", color: "var(--sp-ash-grey)", lineHeight: 1.7 }}>{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Illustrations */}
              {profileTab === "illustrations" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ILLUSTRATIONS.map((ill, i) => (
                    <div key={i} className="illustration-card rounded-lg cursor-pointer relative group">
                      <img src={ill.src} alt={ill.caption} className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 flex items-end p-2.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" style={{ background: "linear-gradient(to top, rgba(8,6,15,0.85), transparent)" }}>
                        <span className="font-cormorant italic" style={{ fontSize: "0.85rem", color: "var(--sp-ash-white)" }}>{ill.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Soundtrack */}
              {profileTab === "soundtrack" && (
                <div className="flex flex-col gap-2">
                  {SOUNDTRACK.map((track, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all"
                      style={{ background: playingTrack === i ? "rgba(45,27,105,0.35)" : "rgba(8,6,15,0.35)", border: `1px solid ${playingTrack === i ? "rgba(123,94,167,0.4)" : "rgba(123,94,167,0.1)"}` }}
                      onClick={() => setPlayingTrack(playingTrack === i ? null : i)}
                    >
                      <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--sp-deep-purple), var(--sp-violet))" }}>
                        <Icon name={playingTrack === i ? "Pause" : "Play"} size={12} style={{ color: "white" }} />
                      </button>
                      {playingTrack === i && (
                        <div className="flex items-end gap-0.5" style={{ height: "16px" }}>
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="audio-bar" style={{ animationDelay: `${j * 0.12}s`, height: "100%" }} />
                          ))}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-golos truncate" style={{ fontSize: "0.85rem", color: "var(--sp-ash-white)" }}>{track.title}</div>
                        <div className="font-golos" style={{ fontSize: "0.72rem", color: "var(--sp-ash-grey)" }}>{track.artist}</div>
                      </div>
                      <span className="font-golos" style={{ fontSize: "0.73rem", color: "var(--sp-ash-grey)" }}>{track.duration}</span>
                    </div>
                  ))}
                  <p className="font-cormorant italic mt-3 text-center" style={{ fontSize: "0.9rem", color: "var(--sp-ash-grey)", opacity: 0.6 }}>
                    Музыка, которая звучала, пока писались эти тексты
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORKS ──────────────────────────────────────────────── */}
      <section id="works-section" className="py-24 px-6" style={{ borderTop: "1px solid rgba(123,94,167,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Произведения</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--sp-ash-white)" }}>
              Голоса платформы
            </h2>
            <div className="sp-divider mt-6" />
            <p className="font-cormorant italic mt-5" style={{ fontSize: "1.05rem", color: "var(--sp-ash-grey)", maxWidth: "440px", margin: "1.5rem auto 0" }}>
              Тексты, которые выбрали тишину вместо шума
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Молчание вещей", author: "Аркадий Тень", genre: "Рассказ", excerpt: "Первые слова всегда самые тяжёлые. Потом становится легче. Потом — невозможно остановиться..." },
              { title: "Пространство между нами", author: "Инга Лесная", genre: "Повесть", excerpt: "Она ушла в ноябре, когда деревья уже не знали, что делать с собственной наготой..." },
              { title: "Коллекция потерь", author: "Вадим Серый", genre: "Эссе", excerpt: "Каждый раз, когда что-то теряешь, это что-то становится частью тебя. Это странная математика..." },
              { title: "Последний свет маяка", author: "Алиса Рассвет", genre: "Роман", excerpt: "Маяк не освещает путь тем, кто уже пришёл. Он светит для тех, кто ещё в море..." },
              { title: "Записки без адреса", author: "Н. Молчанов", genre: "Сборник", excerpt: "Эти письма я никогда не отправлял. Они накапливались в ящике стола, как незаконченные жизни..." },
              { title: "Соль и время", author: "Маргарита К.", genre: "Стихи", excerpt: "Время пахнет солью. / Руки — старым деревом. / Мы всё ещё здесь..." },
            ].map((work, i) => (
              <div key={i} className="sp-card rounded-xl p-6 cursor-pointer flex flex-col gap-3">
                <div className="h-1.5 rounded-full w-10" style={{ background: "linear-gradient(90deg, var(--sp-deep-purple), var(--sp-violet))" }} />
                <div className="flex items-center justify-between">
                  <span className="font-golos" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--sp-violet)", textTransform: "uppercase" }}>{work.genre}</span>
                  <Icon name="BookMarked" size={13} style={{ color: "var(--sp-ash-grey)", opacity: 0.4 }} />
                </div>
                <h3 className="font-cormorant font-medium leading-tight" style={{ fontSize: "1.25rem", color: "var(--sp-ash-white)" }}>{work.title}</h3>
                <p className="font-cormorant italic flex-1" style={{ fontSize: "0.95rem", color: "var(--sp-ash-grey)", lineHeight: 1.75 }}>{work.excerpt}</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(123,94,167,0.1)" }}>
                  <span className="font-golos" style={{ fontSize: "0.8rem", color: "var(--sp-lavender)" }}>{work.author}</span>
                  <button className="font-golos flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--sp-ash-grey)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Читать <Icon name="ArrowRight" size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-ghost flex items-center gap-2 mx-auto">
              Все произведения <Icon name="ArrowRight" size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="py-24 px-6" style={{ background: "rgba(8,6,15,0.6)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Услуги</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--sp-ash-white)" }}>
              Для тех, кто пишет всерьёз
            </h2>
            <div className="sp-divider mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div key={i} className="sp-card rounded-xl p-7 flex flex-col gap-4 cursor-pointer">
                <div className="service-accent w-full" />
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--sp-deep-purple), var(--sp-violet))" }}>
                    <Icon name={service.icon as "BookOpen"} size={20} style={{ color: "white" }} />
                  </div>
                  <span className="font-golos" style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem", background: "rgba(123,94,167,0.15)", border: "1px solid rgba(123,94,167,0.25)", borderRadius: "3px", color: "var(--sp-lavender)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {service.tag}
                  </span>
                </div>
                <h3 className="font-cormorant font-medium leading-tight" style={{ fontSize: "1.2rem", color: "var(--sp-ash-white)" }}>{service.title}</h3>
                <p className="font-golos flex-1" style={{ fontSize: "0.85rem", color: "var(--sp-ash-grey)", lineHeight: 1.75 }}>{service.desc}</p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(123,94,167,0.12)" }}>
                  <span className="font-cormorant font-medium" style={{ fontSize: "1.1rem", color: "var(--sp-lavender)" }}>{service.price}</span>
                  <button className="btn-primary" style={{ padding: "0.38rem 0.9rem", fontSize: "0.72rem" }}>Подробнее</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ───────────────────────────────────────────────── */}
      <section id="team" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Команда</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--sp-ash-white)" }}>
              Те, кто хранит тишину
            </h2>
            <div className="sp-divider mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((person, i) => (
              <div key={i} className="sp-card rounded-xl overflow-hidden text-center cursor-pointer">
                <div className="h-2.5" style={{ background: "linear-gradient(90deg, var(--sp-deep-purple), var(--sp-violet), var(--sp-lavender))" }} />
                <div className="p-6">
                  <div className="relative inline-block mb-4">
                    <img src={person.photo} alt={person.name} className="w-20 h-20 rounded-full object-cover mx-auto" style={{ border: "2px solid rgba(123,94,167,0.4)" }} />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--sp-violet)", border: "2px solid var(--sp-card-bg)", fontSize: "0.5rem", color: "white" }}>✦</div>
                  </div>
                  <h3 className="font-cormorant font-medium mb-1" style={{ fontSize: "1.2rem", color: "var(--sp-ash-white)" }}>{person.name}</h3>
                  <div className="font-golos mb-4" style={{ fontSize: "0.7rem", color: "var(--sp-violet)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{person.role}</div>
                  <p className="font-cormorant italic" style={{ fontSize: "0.95rem", color: "var(--sp-ash-grey)", lineHeight: 1.75 }}>{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACTS ───────────────────────────────────────────── */}
      <section id="contacts" className="py-24 px-6" style={{ background: "rgba(8,6,15,0.6)", borderTop: "1px solid rgba(123,94,167,0.08)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Контакты</div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--sp-ash-white)" }}>
              Написать в тишину
            </h2>
            <div className="sp-divider mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Info + map */}
            <div className="flex flex-col gap-6">
              <div className="sp-card rounded-xl p-6 flex flex-col gap-5">
                {[
                  { icon: "Mail", label: "Email", value: "hello@silentpage.ru" },
                  { icon: "MapPin", label: "Адрес редакции", value: "Москва, ул. Пречистенка, 17, офис 4" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 10:00 — 19:00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(45,27,105,0.5)", border: "1px solid rgba(123,94,167,0.2)" }}>
                      <Icon name={item.icon as "Mail"} size={14} style={{ color: "var(--sp-lavender)" }} />
                    </div>
                    <div>
                      <div className="font-golos" style={{ fontSize: "0.68rem", color: "var(--sp-ash-grey)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</div>
                      <div className="font-golos mt-0.5" style={{ fontSize: "0.9rem", color: "var(--sp-ash-white)" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(123,94,167,0.2)", height: "220px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3869934890895!2d37.59736!3d55.74576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a4aadff88a5%3A0x15a30b1fa2e8c462!2z0J_RgNC10YfQuNGB0YLQtdC90LrQsCDRg9C7LiwgMTcsINCc0L7RgdC60LLQsCwgMTExOTE5!5e0!3m2!1sru!2sru!4v1716012345678"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(190deg) saturate(0.5) brightness(0.65)" }}
                  allowFullScreen
                  loading="lazy"
                  title="Карта редакции Silent Page"
                />
              </div>
            </div>

            {/* Form */}
            <div className="sp-card rounded-xl p-7">
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--sp-deep-purple), var(--sp-violet))" }}>
                    <Icon name="CheckCheck" size={26} style={{ color: "white" }} />
                  </div>
                  <h3 className="font-cormorant font-medium" style={{ fontSize: "1.5rem", color: "var(--sp-ash-white)" }}>Послание отправлено</h3>
                  <p className="font-cormorant italic" style={{ fontSize: "1rem", color: "var(--sp-ash-grey)", lineHeight: 1.7 }}>
                    Мы ответим в течение 24 часов. Тишина — это тоже ответ, но не в этот раз.
                  </p>
                  <button className="btn-ghost" onClick={() => setFormSent(false)}>Написать ещё</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div>
                    <div className="mb-5" style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, var(--sp-violet), transparent)" }} />
                    <h3 className="font-cormorant font-medium mb-1" style={{ fontSize: "1.4rem", color: "var(--sp-ash-white)" }}>Форма обратной связи</h3>
                    <p className="font-golos" style={{ fontSize: "0.8rem", color: "var(--sp-ash-grey)" }}>Каждое сообщение читается лично</p>
                  </div>

                  {[
                    { label: "Ваше имя", type: "text", placeholder: "Как вас зовут?", key: "name" },
                    { label: "Email", type: "email", placeholder: "your@email.com", key: "email" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="font-golos block mb-1.5" style={{ fontSize: "0.7rem", color: "var(--sp-ash-grey)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{field.label}</label>
                      <input
                        type={field.type}
                        className="sp-input"
                        placeholder={field.placeholder}
                        value={contactForm[field.key as "name" | "email"]}
                        onChange={(e) => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-golos block mb-1.5" style={{ fontSize: "0.7rem", color: "var(--sp-ash-grey)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Сообщение</label>
                    <textarea
                      className="sp-input"
                      rows={4}
                      placeholder="Что хотите сказать?"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" style={{ fontSize: "0.85rem" }}>
                    Отправить в тишину <Icon name="Send" size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(123,94,167,0.12)", background: "rgba(8,6,15,0.9)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.poehali.dev/projects/3bd6e43b-bd69-4f5a-9ded-2d3ae07198f1/bucket/479a1cbf-3d8b-4532-a0c4-12c6c391f239.png"
                  alt="Silent Page"
                  className="h-8 w-auto object-contain"
                  style={{ mixBlendMode: "screen", filter: "brightness(1.1)" }}
                />
              </div>
              <p className="font-cormorant italic mb-5" style={{ fontSize: "1rem", color: "var(--sp-ash-grey)", lineHeight: 1.8, maxWidth: "300px" }}>
                «Where the world fades, the story begins» — пространство для писателей и читателей, которые ценят тишину.
              </p>
              <div className="flex gap-3">
                {[{ icon: "Send", label: "Telegram" }, { icon: "Instagram", label: "Instagram" }, { icon: "BookOpen", label: "Библиотека" }].map((s) => (
                  <button key={s.label} title={s.label} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(45,27,105,0.4)", border: "1px solid rgba(123,94,167,0.2)" }}>
                    <Icon name={s.icon as "Send"} size={14} style={{ color: "var(--sp-lavender)" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div className="font-golos mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.16em", color: "var(--sp-violet)", textTransform: "uppercase" }}>Навигация</div>
              <div className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <button key={item} onClick={() => scrollTo(SECTION_MAP[item])} className="text-left sp-nav-link" style={{ fontSize: "0.85rem" }}>{item}</button>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div>
              <div className="font-golos mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.16em", color: "var(--sp-violet)", textTransform: "uppercase" }}>Контакты</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={13} style={{ color: "var(--sp-ash-grey)" }} />
                  <span className="font-golos" style={{ fontSize: "0.82rem", color: "var(--sp-ash-grey)" }}>hello@silentpage.ru</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={13} style={{ color: "var(--sp-ash-grey)", marginTop: "2px" }} />
                  <span className="font-golos" style={{ fontSize: "0.82rem", color: "var(--sp-ash-grey)" }}>Москва, ул. Пречистенка, 17</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: "1px solid rgba(123,94,167,0.1)" }}>
            <span className="font-golos" style={{ fontSize: "0.73rem", color: "var(--sp-ash-grey)", opacity: 0.5 }}>© 2024 Silent Page. Все права защищены.</span>
            <div className="flex items-center gap-5">
              {["Политика конфиденциальности", "Пользовательское соглашение"].map((link) => (
                <button key={link} className="font-golos" style={{ fontSize: "0.72rem", color: "var(--sp-ash-grey)", opacity: 0.5 }}>{link}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}