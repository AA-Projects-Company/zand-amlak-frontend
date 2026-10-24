import { useInView, useCountUp, useTilt, useScrollProgress } from '../hooks';
import { fa } from '../lib';

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Count({ to }) {
  const [ref, seen] = useInView(0.3);
  const value = useCountUp(to, seen);
  return <span ref={ref}>{fa(value)}</span>;
}

export function TiltCard({ children, className = '' }) {
  const ref = useTilt();
  return <div ref={ref} className={className}>{children}</div>;
}

export function ScrollProgress() {
  const p = useScrollProgress();
  return <div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-royal rtl:origin-right" style={{ transform: `scaleX(${p})` }} />;
}
