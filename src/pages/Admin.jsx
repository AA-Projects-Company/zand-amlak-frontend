
import { useEffect, useState } from 'react';
import {
  toEn,
  phoneOk,
  btn,
  btnGhost,
  field,
} from '../lib';
import { useLang, LangSwitch } from '../i18n';
import {
  apiRequest,
  login,
  getAccessToken,
  clearTokens,
} from '../services/api';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '');

function rows(data) {
  if (Array.isArray(data)) return data;
  return data?.results || [];
}

function imageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

function errorText(error) {
  const message = error?.message;

  if (!message) {
    return 'خطایی رخ داد.';
  }

  try {
    const data = JSON.parse(message);

    if (data?.errors && typeof data.errors === 'object') {
      const firstFieldError = Object.values(data.errors)
        .flat()
        .find(value => typeof value === 'string');

      if (firstFieldError) {
        return firstFieldError;
      }
    }

    return data?.detail || data?.message || message;
  } catch {
    return message;
  }
}


function LoginPanel({ onLogin }) {
  const { t } = useLang();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username.trim(), password);
      onLogin();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-royal-l/50 px-4 py-8">
      <div className="blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-royal/10 blur-3xl" />
      <div className="blob absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-royal/10 blur-3xl" />

      <div className="absolute left-5 top-5 z-10">
        <LangSwitch />
      </div>

      <form  onSubmit={submit} className="pop relative z-10 w-full max-w-sm rounded-3xl border border-royal/10 bg-white p-7 shadow-2xl shadow-royal/15 sm:p-8">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-royal text-white shadow-lg shadow-royal/30">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
        </div>

        <h1 className="mb-1 text-center text-xl font-extrabold text-royal-d"> {t('ورود به پنل مدیریت')}</h1>
        <p className="mb-6 text-center text-sm text-slate-500"> {t('زند املاک')}</p>

        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="admin-username" > {t('نام کاربری ')}</label>
        <input
          id="admin-username"
          name="username"
          autoComplete="username"
          autoFocus
          required
          dir="auto"
          placeholder={t('نام کاربری  را وارد کنید')}
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={field + ' mb-4'}
        />

        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="admin-password" > {t('رمز عبور')}</label>

        <div className="relative">
          <input
            id="admin-password"
            name="password"
            autoComplete="current-password"
            type={show ? 'text' : 'password'}
            required
            dir="ltr"
            placeholder={t('رمز عبور را وارد کنید')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={field + ' pr-12'}
          />

          <button
            type="button"
            onClick={() => setShow(value => !value)}
            aria-label={show ? t('مخفی کردن رمز عبور') : t('نمایش رمز عبور')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-royal">

            <svg className="h-5 w-5"viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {!show && <path d="M3 3l18 18" />}
            </svg>
          </button>
        </div>

        <div className="mt-3 min-h-6" role="alert" aria-live="polite">
          {error && ( <p className="text-sm text-red-600">{error}</p>)}
        </div>

        <button type="submit" disabled={loading} className={btn + ' mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60'}>{loading ? t('در حال ورود...') : t('ورود به پنل')}</button>

        <a href="/"className="mt-5 block text-center text-sm text-royal hover:underline">
         {t('بازگشت به سایت')}
        </a>
      </form>
    </main>
  );
}

function Requests() {
  const { t, lang } = useLang();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  async function load(pageToLoad = page) {
    setLoading(true);
    setError('');

    try {
      const offset = pageToLoad * pageSize;
      const data = await apiRequest(
        `/inquiries/?limit=${pageSize}&offset=${offset}`
      );

      setLeads(rows(data));
      setTotal(data?.count ?? rows(data).length);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
  }, [page]);

  async function moveToCustomers(r) {
    setError('');

    try {
      await apiRequest('/customers/', {
        method: 'POST',
        body: JSON.stringify({
          full_name: r.full_name,
          number: toEn(String(r.number || '')),
          budget: null,
          description: r.message || '',
          is_called: false,
        }),
      });

      await apiRequest(`/inquiries/${r.id}/`, {
        method: 'DELETE',
      });

      setTotal(current => Math.max(0, current - 1));

      if (leads.length === 1 && page > 0) {
        setPage(current => current - 1);
      } else {
        load(page);
      }
   } catch (err) {
  const message = errorText(err);

  if (
    message.toLowerCase().includes(
      'customer with this number already exist'
    )
  ) {
    setError(t('این شماره موبایل قبلاً ثبت شده است'));
  } else {
    setError(message);
  }
}
  }

  async function remove(id) {
    setError('');

    try {
      await apiRequest(`/inquiries/${id}/`, {
        method: 'DELETE',
      });

      setTotal(current => Math.max(0, current - 1));

      if (leads.length === 1 && page > 0) {
        setPage(current => current - 1);
      } else {
        load(page);
      }
    } catch (err) {
      setError(errorText(err));
    }
  }

  if (loading) {
    return (
      <p className="p-8 text-center text-slate-500">
        {t('در حال بارگذاری...')}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {error && ( <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700"> {error} </p>)}

      {!leads.length && (
        <div className="rounded-3xl border border-dashed border-royal/30 p-12 text-center text-slate-500">
          {t('درخواستی نرسیده است.')}
        </div>
      )}

      {leads.map((r, i) => (
        <article
          key={r.id}
          className="pop flex flex-wrap justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-royal hover:shadow-lg"
          style={{ animationDelay: `${i * 60}ms` }}>

          <div className="min-w-0 flex-1">
            <b>{r.full_name}</b>

            <div
              className="text-xs text-slate-500"
              dir="ltr"
              style={{ textAlign: lang === 'en' ? 'left' : 'right' }}> <p> {r.number}</p> <p> {r.contact_date.slice(0, 16).replace("T", " ") || ''}</p>

            </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{r.message}</p>
          </div>

          <div className="flex items-start gap-2">
            <button
              onClick={() => moveToCustomers(r)}
              className={btnGhost + ' !px-4 !py-1.5 text-sm'}>{t('افزودن به مشتریان')}
            </button>

            <button
              onClick={() => remove(r.id)}
              className="rounded-full border-2 border-red-200 px-4 py-1.5 text-sm text-red-600 transition hover:bg-red-50"> {t('حذف')}
            </button>
          </div>
        </article>
      ))}

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-5">
          <button
            onClick={() => setPage(current => current - 1)}
            disabled={page === 0}
            className={ btnGhost + ' !px-4 !py-2 disabled:cursor-not-allowed disabled:opacity-40'}>{t('صفحه قبل')}
          </button>

          <span className="text-sm text-slate-600"> {t('صفحه')} {page + 1} {t('از')} {totalPages}</span>

          <button
            onClick={() => setPage(current => current + 1)}
            disabled={page >= totalPages - 1}
            className={btnGhost + '!px-4 !py-2 disabled:cursor-not-allowed disabled:opacity-40'}>{t('صفحه بعد')}
          </button>
        </div>
      )}
    </div>
  );
}

function Customers() {
  const { t, lang } = useLang();
  const [list, setList] = useState([]);const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const blank = { name: '', phone: '', budget: '', desc: '', called: false };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState({});

async function load(pageToLoad = page) {
  setLoading(true);
  setError('');

  try {
    const offset = pageToLoad * pageSize;
    const data = await apiRequest(
      `/customers/?limit=${pageSize}&offset=${offset}`
    );

    setList(rows(data));
    setTotal(data?.count ?? rows(data).length);
  } catch (e) {
    setError(errorText(e));
  } finally {
    setLoading(false);
  }
}

useEffect(() => { load(page);}, [page]);

  
async function submit(e) {
  e.preventDefault();

  const bad = {};
  const name = f.name.trim();
  const phone = toEn(f.phone.trim());
  const budgetValue = f.budget.trim();

  if (name.length < 2) { bad.name = t('نام را وارد کنید');
  }

  if (!phoneOk(phone)) { bad.phone = t('شماره موبایل معتبر وارد کنید');
  }
  
  setErr(bad);

  if (Object.keys(bad).length > 0) {
    return;
  }

  setBusy(true);
  setError('');

  const customerData = {
    full_name: name,
    number: phone,
    budget: budgetValue === '' ? null : budgetValue,
    description: f.desc.trim(),
    is_called: f.called,
  };

  try {
    if (editingId !== null) {
      const updated = await apiRequest(`/customers/${editingId}/`, {
        method: 'PATCH',
        body: JSON.stringify(customerData),
      });

      setList(current =>
        current.map(item =>
          item.id === editingId ? { ...item, ...updated } : item
        )
      );
    } else {
      await apiRequest('/customers/', {
        method: 'POST',
        body: JSON.stringify(customerData),
      });

      await load(); }

    setF(blank);
    setEditingId(null);
    setOpen(false);
    setErr({});
  } catch (e) {
    const message = errorText(e);

    if (message.toLowerCase().includes('customer with this number already exists')
    ) {
      setError(t('این شماره موبایل قبلاً ثبت شده است'));
    } else {
      setError(message);}
  } finally {
    setBusy(false);
  }}

  function editCustomer(c) {
      setEditingId(c.id);
      setF({
        name: c.full_name || '',
        phone: String(c.number || ''),
        budget: c.budget ?? '',
        desc: c.description || '',
        called: Boolean(c.is_called),
      });
      setErr({});
      setError('');
      setOpen(true);
    }

  async function toggle(c) {
  if (c.id == null) { setError(t('شناسه مشتری دریافت نشده است. لطفاً صفحه را تازه‌سازی کنید.'));
    return;}
     
    setError('');
    try {
      const updated = await apiRequest(`/customers/${c.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_called: !c.is_called }),
      });
      setList(current => current.map(item => item.id === c.id ? { ...item, ...updated } : item));
    } catch (e) {
      setError(errorText(e));
    }
  }

async function remove(id) {
  setError('');

  try {
    await apiRequest(`/customers/${id}/`, {
      method: 'DELETE',
    });

    const nextTotal = Math.max(0, total - 1);
    const nextTotalPages = Math.ceil(nextTotal / pageSize);
    const nextPage = Math.min(page, Math.max(0, nextTotalPages - 1));

    setTotal(nextTotal);

    if (nextPage !== page) { setPage(nextPage); } else {  await load(page); }
  } catch (e) {
    setError(errorText(e));
  }
}

  return (
    <div>
      {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mb-4 flex justify-end">
      <button
        onClick={() => {
          if (open) {
            setOpen(false);
            setEditingId(null);
            setF(blank);
            setErr({});
          } else {
            setEditingId(null);
            setF(blank);
            setOpen(true);
          }
        }} className={btn}>{t('ثبت مشتری جدید')}</button>
    </div>

      {open && (
        <form onSubmit={submit} noValidate className="mb-5 space-y-4 rounded-3xl border border-royal/15 bg-royal-l/50 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input placeholder={t('نام')} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} className={field} />
              <div className="min-h-4 text-xs text-red-600">{err.name}</div>
            </div>
            <div>
              <input placeholder={t('شماره تماس')} dir="ltr" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} className={field + ' rtl:text-right ltr:text-left'} />
              <div className="min-h-4 text-xs text-red-600">{err.phone}</div>
            </div>
          </div>
       <div>
         <input placeholder={t('بودجه')} value={f.budget} onChange={e => {setF({ ...f, budget: e.target.value }); setErr(current => ({ ...current, budget: '' })); }}
          className={field} aria-invalid={Boolean(err.budget)} aria-describedby={ err.budget ? 'customer-budget-error' : undefined } />
          <div id="customer-budget-error" className="min-h-4 text-xs text-red-600" > {err.budget} </div>
          </div>         
        <textarea rows="2" placeholder={t('توضیحات')} value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} className={field} />
          <label className="flex w-fit cursor-pointer items-center gap-3">
            <input type="checkbox" checked={f.called} onChange={e => setF({ ...f, called: e.target.checked })} className="h-5 w-5 accent-[#0b5d3b]" />
            {t('زنگ خورده')}
          </label>
          <div className="flex flex-wrap gap-3">
            <button disabled={busy} className={btn + ' disabled:opacity-60'} >
              {busy ? t('در حال ثبت...') : editingId !== null ? t('ذخیره تغییرات') : t('ثبت مشتری جدید')}
            </button>

            {editingId !== null && ( <button type="button" onClick={() => {
                  setEditingId(null);
                  setF(blank);
                  setErr({});
                  setOpen(false);
                }} className={btnGhost}>{t('انصراف')}
              </button>
                )}</div>
        </form>
      )}
      {loading ? ( <p className="p-8 text-center text-slate-500"> {t('در حال بارگذاری...')} </p>
        ) : (
         <>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-sm">
             <thead>
                <tr className="bg-royal text-white">
                  {['نام', 'شماره تماس', 'بودجه', 'توضیحات', 'زنگ خورده', 'عملیات'].map(h => (
                    <th key={h} className="whitespace-nowrap px-4 py-4 text-center font-semibold">
                      {t(h)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {list.map(c => ( <tr key={c.id}
                    className={ 'pop border-t border-slate-100 transition ' + (c.is_called ? 'bg-royal-l/60' : 'hover:bg-slate-50') }>
                    <td className="p-4 font-semibold">{c.full_name}</td>
                    <td className="p-4" dir="ltr" style={{ textAlign: lang === 'en' ? 'left' : 'right' }} > {c.number} </td>
                    <td className="p-4" dir="auto" style={{ textAlign: lang === 'en' ? 'left' : 'right' }} > {c.budget != null && String(c.budget).trim() !== '' ? String(c.budget) : '—'} </td>
                    <td className="max-w-[15rem] whitespace-pre-wrap p-4 leading-7 text-slate-500"> {c.description || '—'} </td>
                    <td className="p-4 text-center">
                      <button type="button" onClick={() => toggle(c)} className={ 'rounded-full px-3 py-1 text-xs font-semibold transition ' + (c.is_called ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') } >
                        {c.is_called ? t('زنگ خورده') : t('زنگ نخورده')}
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => editCustomer(c)} className={btnGhost + ' !px-3 !py-1'} > {t('ویرایش')} </button>

                        <button type="button" onClick={() => remove(c.id)} className="rounded-full border-2 border-red-200 px-3 py-1 text-red-600 transition hover:bg-red-50">
                          {t('حذف')}
                        </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!list.length && (
                  <div className="p-10 text-center text-slate-500">
                    {t('هنوز مشتری‌ای ثبت نشده.')}
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                  <button type="button" onClick={() => setPage(current => Math.max(0, current - 1))} disabled={page === 0}
                    className={`${btnGhost} disabled:cursor-not-allowed disabled:opacity-40`} >
                    {t('صفحه قبل')}
                  </button>

                  <span className="text-sm text-slate-600">
                    {t('صفحه')} {page + 1} {t('از')} {totalPages}
                  </span>

                  <button type="button" onClick={() => setPage(current => Math.min(totalPages - 1, current + 1)) }
                    disabled={page >= totalPages - 1}
                    className={`${btnGhost} disabled:cursor-not-allowed disabled:opacity-40`}>
                    {t('صفحه بعد')}
                  </button>
                </div>
              )}
          </>
        )}
      </div>
    );
  }

function Projects() {
  const { t } = useLang();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState({ name: '', size: '', desc: '', status: 'موجود' });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [err, setErr] = useState({});

 
  async function load(pageToLoad = page) {
    setLoading(true);
    setError('');

    try { const offset = pageToLoad * pageSize;

     const data = await apiRequest( `portfolios/?limit=${pageSize}&offset=${offset}`);

      setList(rows(data));
      setTotal(data?.count ?? rows(data).length);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(page); }, [page]); 


  function pick(e) {
    const selected = [...e.target.files].slice(0, 2);
    setFiles(selected);
    setPreviews(selected.map(file => URL.createObjectURL(file)));
    setErr(current => ({
      ...current,
      imgs: e.target.files.length > 2
        ? t('حداکثر ۲ عکس مجاز است؛ فقط ۲ عکس اول برداشته شد')
        : '',
    }));
  }

  async function submit(e) {
    e.preventDefault();
    const bad = {};
    if (f.name.trim().length < 2) bad.name = t('نام پروژه را وارد کنید');
    if (!f.size.trim() || Number(toEn(f.size)) < 0) bad.size = t('متراژ را وارد کنید');
    setErr(current => ({ ...current, ...bad }));
    if (Object.keys(bad).length) return;

    setBusy(true);
    setError('');

    try {
      const form = new FormData();
      form.append('title', f.name.trim());
      form.append('built_area_m2', toEn(f.size.trim()));
      form.append('description', f.desc.trim());
      form.append('is_available', String(f.status === 'موجود'));
      if (files[0]) form.append('img_1', files[0]);
      if (files[1]) form.append('img_2', files[1]);

      const created = await apiRequest('/portfolios/', {
        method: 'POST',
        body: form,
      });

      setList(current => [created, ...current]);
      setF({ name: '', size: '', desc: '', status: 'موجود' });
      setFiles([]);
      setPreviews([]);
      e.target.reset();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  async function toggle(p) {
    setError('');
    try {
      const updated = await apiRequest(`/portfolios/${p.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_available: !p.is_available }),
      });
      setList(current => current.map(item => item.id === p.id ? { ...item, ...updated } : item));
    } catch (e) {
      setError(errorText(e));
    }
  }

 async function remove(id) {
  setError('');

  try {
    await apiRequest(`/portfolios/${id}/`, {method: 'DELETE',});

    const nextTotal = Math.max(0, total - 1);
    const nextTotalPages = Math.ceil(nextTotal / pageSize);
    const nextPage = Math.min(page,Math.max(0, nextTotalPages - 1));

    setTotal(nextTotal);

    if (nextPage !== page) {
      setPage(nextPage);
    } else {
      await load(page);
    }
  } catch (e) {
    setError(errorText(e));
  }
}


  const download = () => {
    const data = list.map(p => ({
      id: p.id,
      name: p.title,
      size: p.built_area_m2,
      desc: p.description,
      status: p.is_available ? 'موجود' : 'ناموجود',
      imgs: [p.img_1, p.img_2].filter(Boolean).map(imageUrl),
    }));
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input placeholder={t('نام پروژه')} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} className={field} />
            <div className="min-h-4 text-xs text-red-600">{err.name}</div>
          </div>
          <div>
            <input inputMode="numeric" placeholder={t('متراژ')} value={f.size} onChange={e => setF({ ...f, size: e.target.value })} className={field} />
            <div className="min-h-4 text-xs text-red-600">{err.size}</div>
          </div>
        </div>

        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-royal/40 bg-royal-l/40 p-5 text-center text-sm text-slate-500 transition hover:border-royal">
          {t('عکس‌های پروژه (حداکثر ۲ عکس)')}
          <input type="file" accept="image/*" multiple onChange={pick} className="mt-3 block w-full text-sm" />
          <div className="mt-3 flex justify-center gap-3">
            {previews.map((src, i) => <img key={i} src={src} alt="" className="h-20 w-20 rounded-2xl border-2 border-royal/20 object-cover" />)}
          </div>
        </label>
        {err.imgs && <p className="text-xs text-red-600">{err.imgs}</p>}

        <textarea rows="3" placeholder={t('توضیحات')} value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} className={field} />

        <div className="relative grid w-56 grid-cols-2 rounded-2xl bg-royal-l p-1">
          <span className={'absolute inset-y-1 start-1 w-[calc(50%-.25rem)] rounded-xl bg-royal shadow transition-transform duration-500 ' + (f.status === 'ناموجود' ? 'rtl:-translate-x-full ltr:translate-x-full' : '')} />
          {['موجود', 'ناموجود'].map(s => (
            <button type="button" key={s} onClick={() => setF({ ...f, status: s })} className={'relative z-10 py-2 text-sm font-semibold transition-colors ' + (f.status === s ? 'text-white' : 'text-royal')}>
              {t(s)}
            </button>
          ))}
        </div>
        <button disabled={busy} className={btn + ' disabled:opacity-60'}>
          {busy ? t('در حال ثبت...') : t('ثبت نمونه کار')}
        </button>
      </form>

      {loading ? <p className="p-8 text-center text-slate-500">{t('در حال بارگذاری...')}</p> : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(p => { const imgs = [p.img_1, p.img_2].filter(Boolean).map(imageUrl);
            return (
              <article key={p.id} className="pop group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-royal/15">
                <div className="grid h-40 grid-flow-col auto-cols-fr overflow-hidden bg-royal-l">
                  {imgs.length ? imgs.map((src, i) => <img key={i} src={src} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />)
                    : <div className="grid place-items-center text-sm text-slate-500">{t('بدون عکس')}</div>}
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{p.title}</h3>
                  <div className="text-xs text-slate-500">{p.built_area_m2}</div>
                  <p className="my-3 text-sm leading-7 text-slate-500">{p.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <button onClick={() => toggle(p)} className={'rounded-full px-3 py-1 text-xs font-semibold ' + (p.is_available ? 'bg-royal-l text-royal' : 'bg-slate-100 text-slate-500')}>
                      {t(p.is_available ? 'موجود' : 'ناموجود')}
                    </button>
                    <button onClick={() => remove(p.id)} className="rounded-full border-2 border-red-200 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50">{t('حذف')}</button>
                  </div>
                </div>
              </article>
            );
          })}
          {!list.length && <div className="p-8 text-center text-slate-500">{t('هنوز نمونه‌کاری ثبت نشده.')}</div>}
           {totalPages > 1 && (<div className="col-span-full mt-4 flex items-center justify-center gap-4">
              <button type="button" onClick={() => setPage(current => Math.max(0, current - 1))}
                disabled={page === 0 || loading}
                className={`${btnGhost} disabled:cursor-not-allowed disabled:opacity-40`} > {t('قبلی')}
              </button>
              <span className="text-sm text-slate-600"> {page + 1} / {totalPages} </span>

              <button type="button" onClick={() => setPage(current => Math.min(totalPages - 1, current + 1))}
                disabled={page >= totalPages - 1 || loading}
                className={`${btnGhost} disabled:cursor-not-allowed disabled:opacity-40`}> {t('بعدی')} </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { t } = useLang();
  const [authenticated, setAuthenticated] = useState(Boolean(getAccessToken()));
  const [tab, setTab] = useState(0);

  function logout() {
    clearTokens();
    setAuthenticated(false);
  }

  if (!authenticated) return <LoginPanel onLogin={() => setAuthenticated(true)} />;

  const tabs = [
    ['درخواست‌های ارتباط', Requests],
    ['لیست مشتریان', Customers],
    ['افزودن نمونه کار', Projects],
  ];
  const Active = tabs[tab][1];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex h-16 items-center justify-between gap-3">
            <b className="text-lg font-extrabold text-royal-d">
              {t('پنل مدیریت')}<span className="text-royal"> · {t('خانم زند')}</span>
            </b>
            <div className="flex items-center gap-4">
              <LangSwitch />
              <a href="/" className="text-sm text-royal hover:underline">{t('مشاهده سایت')}</a>
              <button onClick={logout} className="rounded-full border-2 border-royal/30 px-4 py-1 text-sm font-semibold text-royal transition hover:bg-royal hover:text-white">
                {t('خروج')}
              </button>
            </div>
          </div>
          <nav className="relative flex gap-1 overflow-x-auto pb-3">
            {tabs.map(([label], i) => (
              <button key={label} onClick={() => setTab(i)} className={'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 ' + (tab === i ? 'bg-royal text-white shadow-md shadow-royal/30' : 'text-slate-600 hover:bg-royal-l')}>
                {t(label)}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24">
        <h2 className="mb-5 text-2xl font-extrabold text-royal-d">{t(tabs[tab][0])}</h2>
        <div key={tab} className="rise"><Active /></div>
      </main>
    </div>
  );
}
