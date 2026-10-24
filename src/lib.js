export const locale = { current: 'fa-IR' };
export const getCookie = name => document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] ?? '';
export const PHONE = '989126847057';
export const fa = n => Number(n).toLocaleString(locale.current, { useGrouping: false });
export const toEn = t => t.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
export const phoneOk = v => /^(\+98|0098|98|0)?9\d{9}$/.test(toEn(v).replace(/[\s-]/g, ''));

export const shrink = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    const img = new Image();
    img.onerror = reject;
    img.onload = () => {
      const s = Math.min(1, 900 / Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.width * s);
      cv.height = Math.round(img.height * s);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      resolve(cv.toDataURL('image/jpeg', 0.75));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

export const btn = 'inline-flex items-center justify-center gap-2 rounded-full bg-royal px-7 py-3 font-semibold text-white shadow-lg shadow-royal/25 transition duration-300 hover:-translate-y-0.5 hover:bg-royal-d hover:shadow-xl active:scale-95';
export const btnGhost = 'inline-flex items-center justify-center rounded-full border-2 border-royal px-7 py-3 font-semibold text-royal transition duration-300 hover:bg-royal hover:text-white active:scale-95';
export const field = 'w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/15';
