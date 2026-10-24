import { useEffect, useRef, useState } from 'react';

export function useStore(key) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  });
  const save = next => {
    setItems(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [items, save];
}

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

export function useCountUp(to, start, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return value;
}

export function useTilt(max = 8) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(hover: none)').matches) return;
    const move = e => {
      const b = el.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-8px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [max]);
  return ref;
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1));
    };
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  return p;
}


export function useProjects(page = 0, pageSize = 10) {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setLoading(true);

      try {
        const offset = page * pageSize;
        const response = await fetch( `${import.meta.env.VITE_API_URL}portfolios/?limit=${pageSize}&offset=${offset}`);
        if (!response.ok) { throw new Error('Failed to fetch portfolios');}

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];

        const mappedProjects = items.map(p => ({
          id: p.id,
          name: p.title,
          size: p.built_area_m2 || '',
          desc: p.description || '',
          imgs: [p.img_1, p.img_2].filter(Boolean),
          status: p.is_available ? 'موجود' : 'ناموجود',
        }));

        if (!cancelled) {
          setProjects(mappedProjects);
          setTotal( Array.isArray(data) ? data.length : data.count ?? items.length );}
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching portfolios:', error);
          setProjects([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize]);

  return {
    projects,
    loading,
    totalPages: Math.ceil(total / pageSize),
  };
}

