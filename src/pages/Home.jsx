import { useState, useEffect } from "react";
import { fa, toEn, phoneOk, PHONE, locale, btn, btnGhost, field } from "../lib";
import { useStore, useProjects } from "../hooks";
import { useLang, LangSwitch } from "../i18n";
import { Reveal, Count, TiltCard, ScrollProgress } from "../components/Motion";

const services = [
  [
    "خرید و فروش آپارتمان در چیتگر",
    "برآورد دقیق قیمت و معامله‌ای مطمئن، از بازدید تا تحویل کلید.",
  ],
  [
    "پیش‌فروش آپارتمان منطقه ۲۲",
    "معرفی پروژه‌های معتبر منطقه ۲۲ با قرارداد و شرایط شفاف.",
  ],
  [
    "ارزیابی و قیمت‌گذاری ملک",
    "تعیین ارزش واقعی ملک شما بر اساس بازار روز چیتگر.",
  ],
];

const stats = [
  [7, "سال سابقه"],
  [320, "معامله موفق"],
  [98, "درصد رضایت"],
];

const words = [
  "صداقت",
  "تخصص",
  "پیش‌فروش معتبر",
  "چیتگر",
  "منطقه ۲۲",
  "مشاوره رایگان",
];

const faqs = [
  [
    "چطور برای خرید آپارتمان در چیتگر مشاوره بگیرم؟",
    "کافی است فرم تماس را پر کنید یا با شماره ۰۹۱۲۶۸۴۷۰۵۷ تماس بگیرید؛ در سریع‌ترین زمان برای مشاوره رایگان با شما هماهنگ می‌کنم.",
  ],
  [
    "پیش‌فروش آپارتمان در منطقه ۲۲ چه مزایایی دارد؟",
    "قیمت اولیه معمولاً پایین‌تر از ملک آماده است و امکان انتخاب واحد و پرداخت مرحله‌ای وجود دارد؛ اما انتخاب سازنده معتبر و بررسی دقیق قرارداد اهمیت زیادی دارد.",
  ],
  [
    "قبل از خرید ملک در چیتگر چه مدارکی را باید بررسی کرد؟",
    "سند مالکیت، پایان‌کار، مجوز ساخت برای پروژه‌ها، نبود بدهی و محدودیت ثبتی و شفاف بودن قرارداد؛ بهتر است همه این موارد پیش از پرداخت بیعانه بررسی شوند.",
  ],
  [
    "برای ارزیابی و فروش ملک چه کار کنم؟",
    "قیمت واقعی ملک بر اساس بازار روز چیتگر و ویژگی‌های ملک شما تعیین می‌شود؛ برای ارزیابی و فروش با من تماس بگیرید.",
  ],
  [
    "چند سال سابقه فعالیت در منطقه ۲۲ دارید؟",
    "من ۷ سال سابقه فعالیت در چیتگر و منطقه ۲۲ تهران دارم و در خرید، فروش و پیش‌فروش ملک همراه شما هستم.",
  ],
];

function Header() {
  const { t } = useLang();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 20);

    window.addEventListener("scroll", on, { passive: true });

    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 transition duration-300 " +
        (solid ? "bg-white/85 shadow-sm backdrop-blur-md" : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="text-lg font-extrabold text-royal-d">
          {t("خانم زند")}
          <span className="text-royal"> · {t("املاک چیتگر")}</span>
        </a>

        <nav className="hidden gap-8 text-sm text-slate-600 md:flex">
          {[
            ["#services", "خدمات"],
            ["#stats", "سوابق"],
            ["#faq", "سوالات متداول"],
            ["#contact", "تماس"],
          ].map(([h, label]) => (
            <a key={h} href={h} className="transition hover:text-royal">
              {t(label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <a href="#contact" className={btn + " !px-5 !py-2 text-sm"}>
            {t("مشاوره رایگان")}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-royal-l blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-14 md:grid-cols-2 md:py-24">
        <div>
          <p className="rise mb-4 text-sm font-semibold tracking-widest text-royal rtl:tracking-normal">
            {t("مشاور املاک · چیتگر منطقه ۲۲")}
          </p>

          <h1
            className="rise text-4xl font-extrabold leading-[1.4] text-royal-d md:text-5xl"
            style={{ animationDelay: ".12s" }}
          >
            {t("مشاور املاک چیتگر؛ خانه‌ای که شایسته")}{" "}
            <span className="shimmer">{t("زندگی شماست")}</span>
          </h1>

          <p
            className="rise mt-6 max-w-md leading-8 text-slate-500"
            style={{ animationDelay: ".24s" }}
          >
            {t(
              "با ۷ سال سابقه در منطقه ۲۲ چیتگر؛ خرید، فروش و پیش‌فروش با صداقت و تخصص.",
            )}
          </p>

          <div
            className="rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: ".36s" }}
          >
            <a href="#contact" className={btn}>
              {t("درخواست مشاوره")}
            </a>

            <a href={"tel:+" + PHONE} className={btnGhost}>
              {t("تماس مستقیم")}
            </a>
          </div>
        </div>

        <div
          className="rise flex justify-center"
          style={{ animationDelay: ".3s" }}
        >
          <div>
            <div className="relative mx-auto w-64 md:w-80">
              <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[2rem] border-2 border-royal/30" />

              <div className="h-80 overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-royal-l shadow-2xl shadow-royal/25 md:h-[26rem]">
                <img
                  src={`${(import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "")}/static/img/profile.jpg`}
                  alt={t("خانم زند، مشاور املاک چیتگر منطقه ۲۲")}
                  width="640"
                  height="832"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="floaty rounded-2xl bg-royal px-4 py-2.5 text-sm font-semibold text-white shadow-lg">
                {t("پیش‌فروش معتبر")}
              </span>

              <span
                className="floaty rounded-2xl border border-royal/20 bg-white px-4 py-2.5 text-sm font-semibold text-royal shadow-lg"
                style={{ animationDelay: "1.2s" }}
              >
                {t("چیتگر، منطقه ۲۲")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { t } = useLang();

  return (
    <div
      className="overflow-hidden border-y border-royal/10 bg-royal-l py-4"
      dir="ltr"
    >
      <div className="marquee-track">
        {[0, 1, 2, 3].map((group) => (
          <div key={group} className="marquee-group" aria-hidden={group !== 0}>
            {words.map((word, index) => (
              <span key={`${group}-${index}`}>◆ {t(word)}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const { t } = useLang();

  return (
    <section id="stats" className="bg-royal-d text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-5 py-14 text-center">
        {stats.map(([n, label], i) => (
          <Reveal key={label} delay={i * 120}>
            <div className="text-4xl font-extrabold md:text-6xl">
              <Count to={n} />
            </div>
            <div className="mt-2 text-sm text-white/70">{t(label)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <h2 className="mb-10 text-center text-3xl font-extrabold text-royal-d">
          {t("خدمات ما")}
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map(([label, d], i) => (
          <Reveal key={label} delay={i * 120}>
            <TiltCard className="group h-full rounded-3xl border border-slate-200 bg-white p-8 transition duration-500 hover:-translate-y-2 hover:border-royal hover:bg-royal hover:shadow-2xl hover:shadow-royal/30">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-royal-l font-extrabold text-royal transition group-hover:bg-white/15 group-hover:text-white">
                {fa(i + 1)}
              </div>

              <h3 className="mb-2 text-lg font-bold text-royal-d transition group-hover:text-white">
                {t(label)}
              </h3>

              <p className="text-sm leading-7 text-slate-500 transition group-hover:text-white/80">
                {t(d)}
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  const { t } = useLang();
  const [page, setPage] = useState(0);

  const { projects, loading, totalPages } = useProjects(page, 10);

  return (
    <section id="portfolio" className="bg-royal-l/50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="mb-10 text-center text-3xl font-extrabold text-royal-d">
            {t("نمونه کارها")}
          </h2>
        </Reveal>

        {loading ? (
          <p className="p-8 text-center text-slate-500">
            {t("در حال بارگذاری...")}
          </p>
        ) : (
          <>
            {projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 100}>
                    <article className="group h-full overflow-hidden rounded-3xl border border-royal/10 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-royal/20">
                      <div className="grid h-52 auto-cols-fr grid-flow-col overflow-hidden bg-royal-l">
                        {p.imgs?.length ? (
                          p.imgs.map((src, k) => (
                            <img
                              key={k}
                              src={src}
                              alt={`${p.name} ${p.size}`}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                          ))
                        ) : (
                          <div className="grid place-items-center text-sm text-slate-500">
                            {t("بدون عکس")}
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-bold text-royal-d">{p.name}</h3>

                          <span
                            className={
                              "shrink-0 rounded-full px-3 py-1 text-xs font-semibold " +
                              (p.status === "موجود"
                                ? "bg-royal-l text-royal"
                                : "bg-slate-100 text-slate-500")
                            }
                          >
                            {t(p.status)}
                          </span>
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          {p.size ? `${p.size} ${t("متر مربع")}` : ""}
                        </div>

                        {p.desc && (
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {p.desc}
                          </p>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="p-8 text-center text-slate-500">
                {t("هنوز نمونه‌کاری ثبت نشده.")}
              </p>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setPage((current) => current - 1)}
                  disabled={page === 0}
                  className="rounded-full border-2 border-royal/30 px-5 py-2 text-sm font-semibold text-royal transition hover:bg-royal hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("قبلی")}
                </button>

                <span className="text-sm text-slate-600">
                  {page + 1} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setPage((current) => current + 1)}
                  disabled={page >= totalPages - 1}
                  className="rounded-full border-2 border-royal/30 px-5 py-2 text-sm font-semibold text-royal transition hover:bg-royal hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("بعدی")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const { t, lang } = useLang();
  const [leads, saveLeads] = useStore("zand_leads");
  const [f, setF] = useState({
    name: "",
    phone: "",
    desc: "",
  });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const set = (k) => (e) => {
    setF({ ...f, [k]: e.target.value });
    setErr({ ...err, [k]: "" });
    setApiMessage("");
    setSent(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    const bad = {};

    if (f.name.trim().length < 2) {
      bad.name = t("نام خود را وارد کنید");
    }

    if (!phoneOk(f.phone)) {
      bad.phone = t("شماره موبایل معتبر وارد کنید");
    }

    if (f.desc.trim().length < 5) {
      bad.desc = t("چند کلمه درباره نیازتان بنویسید");
    }

    setErr(bad);
    setApiMessage("");
    setSent(null);

    if (Object.keys(bad).length) return;

    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}inquiries/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: f.name.trim(),
            number: toEn(f.phone.trim()),
            message: f.desc.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      saveLeads([
        {
          id: Date.now(),
          name: f.name.trim(),
          phone: toEn(f.phone.trim()),
          desc: f.desc.trim(),
          date: new Date().toLocaleDateString("fa-IR"),
        },
        ...leads,
      ]);

      const text =
        lang === "en"
          ? `Hello, I'm ${f.name.trim()}.\nPhone: ${toEn(f.phone.trim())}\nDetails: ${f.desc.trim()}`
          : `سلام، من ${f.name.trim()} هستم.\nشماره تماس: ${toEn(f.phone.trim())}\nتوضیحات: ${f.desc.trim()}`;

      setApiMessage(t("درخواست شما با موفقیت ثبت شد"));
      setSent(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`);
      setF({ name: "", phone: "", desc: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setApiMessage(t("ثبت درخواست ناموفق بود؛ دوباره تلاش کنید"));
    } finally {
      setSubmitting(false);
    }
  };

  const english = lang === "en";

  return (
    <section id="contact" className="bg-royal-l/60 py-20">
      <div className="mx-auto max-w-xl px-5">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-extrabold text-royal-d">
            {t("با من در ارتباط باشید")}
          </h2>

          <p className="mb-8 text-center text-slate-500">
            {t("فرم را پر کنید تا در سریع‌ترین زمان تماس بگیرم.")}
          </p>

          <form
            onSubmit={submit}
            noValidate
            className="space-y-4 rounded-3xl border border-royal/10 bg-white p-7 shadow-xl shadow-royal/10"
          >
            {[
              ["name", "نام"],
              ["phone", "شماره تماس"],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="mb-1.5 block text-sm font-semibold">
                  {t(l)}
                </label>

                <input
                  value={f[k]}
                  onChange={set(k)}
                  dir={k === "phone" || english ? "ltr" : "rtl"}
                  className={
                    field +
                    (k === "phone" || english ? " text-left" : " text-right") +
                    (err[k] ? " !border-red-500" : "")
                  }
                />

                <div className="min-h-4 text-xs text-red-600">{err[k]}</div>
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                {t("توضیحات")}
              </label>

              <textarea
                rows="3"
                value={f.desc}
                onChange={set("desc")}
                dir={english ? "ltr" : "rtl"}
                className={
                  field +
                  (english ? " text-left" : " text-right") +
                  (err.desc ? " !border-red-500" : "")
                }
              />

              <div className="min-h-4 text-xs text-red-600">{err.desc}</div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={
                btn + " w-full disabled:cursor-not-allowed disabled:opacity-60"
              }
            >
              {submitting ? t("در حال ارسال...") : t("ثبت درخواست")}
            </button>

            {apiMessage && (
              <p
                role="status"
                className={
                  "text-center text-sm " +
                  (sent ? "text-green-600" : "text-red-600")
                }
              >
                {apiMessage}
              </p>
            )}

            {sent && (
              <a
                href={sent}
                target="_blank"
                rel="noreferrer"
                className={btnGhost + " pop w-full"}
              >
                {t("ارسال در واتساپ")}
              </a>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useLang();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <Reveal>
        <h2 className="mb-10 text-center text-3xl font-extrabold text-royal-d">
          {t("سوالات متداول")}
        </h2>
      </Reveal>

      <div className="space-y-3">
        {faqs.map(([q, a], i) => (
          <Reveal key={q} delay={i * 80}>
            <details className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 open:border-royal open:shadow-lg open:shadow-royal/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-bold text-royal-d">{t(q)}</h3>

                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-royal-l text-royal transition duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 leading-8 text-slate-600">{t(a)}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Portfolio />
        <Faq />
        <Contact />
      </main>

      <section className="flex justify-center bg-white px-5 py-10">
          <a href="/panel" className={btn + " inline-flex items-center justify-center"}>{t('پنل مدیریت')}</a>
        </section>

      <footer className="bg-royal-d py-8 text-center text-xs text-white/60">
        <p className="mb-2">
          {t("خرید، فروش و پیش‌فروش آپارتمان در چیتگر و منطقه ۲۲ تهران")}
        </p>
        ©{" "}
        {new Date().toLocaleDateString(locale.current, {
          year: "numeric",
        })}{" "}
        {t("خانم زند")} · {t("مشاور املاک منطقه ۲۲ چیتگر")}
      </footer>
    </>
  );
}
