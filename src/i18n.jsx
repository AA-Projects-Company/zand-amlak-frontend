import { createContext, useContext, useEffect, useState } from 'react';
import { locale } from './lib';

const EN = {
  'خانم زند': 'Mrs Zand',
  'املاک چیتگر': 'Chitgar Real Estate',
  'خدمات': 'Services',
  'سوابق': 'Track Record',
  'تماس': 'Contact',
  'مشاوره رایگان': 'Free Consultation',
  'مشاور املاک · چیتگر منطقه ۲۲': 'Real Estate Advisor · Chitgar, District 22',
  'مشاور املاک چیتگر؛ خانه‌ای که شایسته': 'Chitgar real estate advisor: a home worthy of',
  'زندگی شماست': 'your life',
  'با ۷ سال سابقه در منطقه ۲۲ چیتگر؛ خرید، فروش و پیش‌فروش با صداقت و تخصص.': 'With 7 years of experience in Chitgar, District 22: buying, selling and pre-sales with honesty and expertise.',
  'درخواست مشاوره': 'Request a Consultation',
  'تماس مستقیم': 'Call Directly',
  'خانم زند، مشاور املاک چیتگر منطقه ۲۲': 'Khanom Zand, real estate advisor in Chitgar, District 22',
  'پیش‌فروش معتبر': 'Trusted Pre-sales',
  'چیتگر، منطقه ۲۲': 'Chitgar, District 22',
  'صداقت': 'Honesty',
  'تخصص': 'Expertise',
  'چیتگر': 'Chitgar',
  'منطقه ۲۲': 'District 22',
  'سال سابقه': 'Years of Experience',
  'معامله موفق': 'Successful Deals',
  'درصد رضایت': 'Percent Satisfaction',
  'خرید و فروش آپارتمان در چیتگر': 'Apartment Sales & Purchase in Chitgar',
  'برآورد دقیق قیمت و معامله‌ای مطمئن، از بازدید تا تحویل کلید.': 'Accurate price estimates and a secure deal, from viewing to handing over the keys.',
  'پیش‌فروش آپارتمان منطقه ۲۲': 'Apartment Pre-sales in District 22',
  'معرفی پروژه‌های معتبر منطقه ۲۲ با قرارداد و شرایط شفاف.': 'Trusted District 22 projects with clear contracts and transparent terms.',
  'ارزیابی و قیمت‌گذاری ملک': 'Property Valuation & Pricing',
  'تعیین ارزش واقعی ملک شما بر اساس بازار روز چیتگر.': "Your property's true value, based on today's Chitgar market.",
  'خدمات ما': 'Our Services',
  'نام خود را وارد کنید': 'Please enter your name',
  'شماره موبایل معتبر وارد کنید': 'Enter a valid mobile number',
  'چند کلمه درباره نیازتان بنویسید': 'Tell us a little about what you need',
  'با من در ارتباط باشید': 'Get in Touch',
  'فرم را پر کنید تا در سریع‌ترین زمان تماس بگیرم.': 'Fill in the form and I will call you back as soon as possible.',
  'نام': 'Name',
  'متر': 'm',
  'درخواست شما با موفقیت ثبت شد': 'Your request has been submitted successfully',
  'ثبت درخواست ناموفق بود؛ دوباره تلاش کنید': 'Failed to submit your request. Please try again',
  'در حال ارسال...': 'Submitting...',
  'شماره تماس': 'Phone',
  'توضیحات': 'Details',
  'ثبت درخواست': 'Submit Request',
  'ارسال در واتساپ': 'Send on WhatsApp',
  'مشاور املاک منطقه ۲۲ چیتگر': 'Real estate advisor, Chitgar District 22',
  'پنل مدیریت': 'Admin Panel',
  'مشاهده سایت': 'View Site',
  'درخواست‌های ارتباط': 'Contact Requests',
  'لیست مشتریان': 'Customers',
  'زنگ خورده': 'Called',
  'عملیات': 'Actions',
  'زنگ نخورده': 'Not called',
  'افزودن نمونه کار': 'Add Portfolio Project',
  'درخواستی نرسیده است.': 'No requests yet.',
  'صفحه قبل': 'Previous',
  'صفحه بعد': 'Next',
  'قبلی': 'Previous',
  'بعدی': 'Next',
  'صفحه': 'Page',
  'از': 'of',
  'این شماره موبایل قبلاً ثبت شده است': 'This phone number is already registered.',
  'افزودن به مشتریان': 'Add to Customers',
  'حذف': 'Delete',
  'ثبت مشتری جدید': 'New Customer',
  'بودجه': 'Budget',
  'هنوز مشتری‌ای ثبت نشده.': 'No customers yet.',
  'هنوز نمونه‌کاری ثبت نشده.': 'No portfolio projects yet.',
  'بودجه باید عدد صحیحی بین صفر تا ۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹٬۹۹۹ باشد.':
  'Budget must be a non-negative whole number no greater than 999,999,999,999,999.',
  'نام را وارد کنید': 'Enter a name',
  'نام پروژه را وارد کنید': 'Enter the project name',
  'متراژ را وارد کنید': 'Enter the area',
  'نام پروژه': 'Project Name',
  'ذخیره تغییرات': 'Save Changes',
  'انصراف': 'Cancel',
  'ویرایش': 'Edit',
  'متراژ': 'Area',
  'عکس‌های پروژه (حداکثر ۲ عکس)': 'Project photos (max 2)',
  'حداکثر ۲ عکس مجاز است؛ فقط ۲ عکس اول برداشته شد': 'Maximum 2 photos allowed; only the first 2 were kept',
  'موجود': 'Available',
  'ناموجود': 'Unavailable',
  'ثبت نمونه کار': 'Save Project',
  'بدون عکس': 'No photo',
  'خروج': 'Sign Out',
  'شناسه مشتری دریافت نشده است. لطفاً صفحه را تازه‌سازی کنید.':
  'Customer ID was not received. Please refresh the page.',
  'ورود به پنل مدیریت': 'Admin Login',
  'زند املاک': 'Zand Real Estate',
  'نام کاربری ': 'Username ',
  'رمز عبور': 'Password',
  'نام کاربری  را وارد کنید': 'Enter your username ',
  'رمز عبور را وارد کنید': 'Enter your password',
  'نمایش رمز عبور': 'Show password',
  'مخفی کردن رمز عبور': 'Hide password',
  'در حال ورود...': 'Signing in...',
  'ورود به پنل': 'Sign in to dashboard',
  'بازگشت به سایت': 'Back to website',
  'نمونه کارها': 'Portfolio',
  'دانلود projects.json': 'Download projects.json',
  'برای نمایش نمونه‌کارها به همه بازدیدکنندگان، این فایل را در public/projects.json بگذارید و دوباره build بگیرید.': 'To show the portfolio to every visitor, put this file in public/projects.json and build again.',
  'سوالات متداول': 'FAQ',
  'خرید، فروش و پیش‌فروش آپارتمان در چیتگر و منطقه ۲۲ تهران': 'Apartment buying, selling and pre-sales in Chitgar and District 22, Tehran',
  "چطور برای خرید آپارتمان در چیتگر مشاوره بگیرم؟": "How do I get advice on buying an apartment in Chitgar?",
  "کافی است فرم تماس را پر کنید یا با شماره ۰۹۱۲۶۸۴۷۰۵۷ تماس بگیرید؛ در سریع‌ترین زمان برای مشاوره رایگان با شما هماهنگ می‌کنم.": "Fill in the contact form or call 09126847057 and I will arrange a free consultation as soon as possible.",
  "پیش‌فروش آپارتمان در منطقه ۲۲ چه مزایایی دارد؟": "What are the benefits of pre-sale apartments in District 22?",
  "قیمت اولیه معمولاً پایین‌تر از ملک آماده است و امکان انتخاب واحد و پرداخت مرحله‌ای وجود دارد؛ اما انتخاب سازنده معتبر و بررسی دقیق قرارداد اهمیت زیادی دارد.": "The starting price is usually lower than a ready property and you can choose your unit and pay in stages, but a reputable builder and a carefully reviewed contract are essential.",
  "قبل از خرید ملک در چیتگر چه مدارکی را باید بررسی کرد؟": "Which documents should I check before buying property in Chitgar?",
  "سند مالکیت، پایان‌کار، مجوز ساخت برای پروژه‌ها، نبود بدهی و محدودیت ثبتی و شفاف بودن قرارداد؛ بهتر است همه این موارد پیش از پرداخت بیعانه بررسی شوند.": "The ownership deed, completion certificate, building permit for projects, absence of debts or registry restrictions, and a clear contract; ideally check all of them before paying a deposit.",
  "برای ارزیابی و فروش ملک چه کار کنم؟": "What should I do to value and sell my property?",
  "قیمت واقعی ملک بر اساس بازار روز چیتگر و ویژگی‌های ملک شما تعیین می‌شود؛ برای ارزیابی و فروش با من تماس بگیرید.": "The real price is set from today's Chitgar market and your property's features; contact me for a valuation and sale.",
  "چند سال سابقه فعالیت در منطقه ۲۲ دارید؟": "How many years of experience do you have in District 22?",
  "من ۷ سال سابقه فعالیت در چیتگر و منطقه ۲۲ تهران دارم و در خرید، فروش و پیش‌فروش ملک همراه شما هستم.": "I have 7 years of experience in Chitgar and District 22 of Tehran, helping with buying, selling and pre-sales."
};

const LangContext = createContext({ lang: 'fa', setLang: () => {}, t: s => s });
export const useLang = () => useContext(LangContext);

const META = {
  fa: ["مشاور املاک چیتگر | خرید و پیش‌فروش آپارتمان منطقه ۲۲ تهران", "مشاور املاک چیتگر با ۷ سال سابقه؛ خرید، فروش و پیش‌فروش آپارتمان در منطقه ۲۲ تهران، ارزیابی قیمت ملک و مشاوره رایگان با خانم زند."],
  en: ['Chitgar Real Estate Advisor | Apartment Sales & Pre-sales in District 22, Tehran', 'Real estate advisor in Chitgar with 7 years of experience: buying, selling and pre-sales of apartments in District 22 Tehran, property valuation and free consultation with Khanom Zand.']
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('zand_lang') === 'en' ? 'en' : 'fa'; } catch { return 'fa'; }
  });
  locale.current = lang === 'en' ? 'en-US' : 'fa-IR';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.title = META[lang][0];
    const d = document.querySelector('meta[name=description]');
    if (d) d.content = META[lang][1];
    try { localStorage.setItem('zand_lang', lang); } catch {}
  }, [lang]);

  const t = s => (lang === 'en' && EN[s]) || s;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <button onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} aria-label="Language" className="rounded-full border-2 border-royal/30 px-3 py-1 text-sm font-semibold text-royal transition hover:bg-royal hover:text-white active:scale-95">
      {lang === 'fa' ? 'EN' : 'فا'}
    </button>
  );
}
