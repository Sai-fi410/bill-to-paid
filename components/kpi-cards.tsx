'use client'

import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { Area, AreaChart } from 'recharts'
import { ArrowDown, ArrowUpRight, CircleAlert, Clock3, FileText, Wallet } from 'lucide-react'
import { ChartContainer } from '@/components/ui/chart'
import { getMetricTrends, money, summarizeInvoices, type Invoice } from '@/lib/mock'

const metrics = [
  { label: 'Total billed', icon: FileText, color: 'blue', change: '12.8%', direction: 'up', caption: 'vs. previous period' },
  { label: 'Collected', icon: Wallet, color: 'green', change: '18.6%', direction: 'up', caption: 'vs. previous period' },
  { label: 'Outstanding', icon: Clock3, color: 'amber', change: '8.2%', direction: 'down', caption: 'vs. previous period' },
  { label: 'Overdue', icon: CircleAlert, color: 'rose', change: '14.3%', direction: 'down', caption: 'vs. previous period' },
]
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) { setDisplay(value); return }
    const controls = animate(0, value, { duration: 1.15, ease: 'easeOut', onUpdate: setDisplay })
    return () => controls.stop()
  }, [value, reduced])
  return <span>{money(Math.round(display))}<span className="metric-cents">.{Math.round(value % 1 * 100).toString().padStart(2, '0')}</span></span>
}
export function KpiCards({ invoices }: { invoices: Invoice[] }) {
  const values = summarizeInvoices(invoices)
  const trends = getMetricTrends()
  const reduced = useReducedMotion()
  return <section className="kpi-grid" aria-label="Invoice metrics">{metrics.map((metric, i) => <motion.article className={`kpi-card panel ${metric.color}`} key={metric.label} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }}><div className="kpi-label"><span>{metric.label}</span><span className="kpi-icon"><metric.icon size={15} /></span></div><div className="kpi-middle"><div className="kpi-value"><AnimatedNumber value={values[i]} /></div><ChartContainer className="sparkline" config={{ value: { label: metric.label, color: `var(--chart-${i + 1})` } }}><AreaChart accessibilityLayer data={trends[i]} margin={{ top: 5, right: 2, bottom: 0, left: 2 }}><defs><linearGradient id={`spark-${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-value)" stopOpacity={.25} /><stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={1.7} fill={`url(#spark-${i})`} isAnimationActive={!reduced} /></AreaChart></ChartContainer></div><div className="kpi-footer"><span className="metric-change">{metric.direction === 'up' ? <ArrowUpRight size={12} /> : <ArrowDown size={11} />}{metric.change}</span><span>{metric.caption}</span></div></motion.article>)}</section>
}
