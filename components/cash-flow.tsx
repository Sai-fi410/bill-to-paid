'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CircleCheck, FileText, Maximize2, Minimize2, Pause, Play, Sparkles, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { money, type Invoice } from '@/lib/mock'
import { cn } from '@/lib/utils'

export function CashFlow({ invoices }: { invoices: Invoice[] }) {
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(true)
  const [tick, setTick] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<Invoice | null>(null)
  useEffect(() => {
    if (!playing || reduced) return
    const timer = setInterval(() => setTick(value => value + 1), 6500)
    return () => clearInterval(timer)
  }, [playing, reduced])
  const unpaid = invoices.filter(i => i.status === 'SENT' || i.status === 'OVERDUE')
  const paid = invoices.filter(i => i.status === 'PAID')
  const left = [0, 1, 2].map((_, i) => unpaid[(i + tick) % Math.max(unpaid.length, 1)]).filter(Boolean)
  const right = [0, 1, 2].map((_, i) => paid[(i + tick) % Math.max(paid.length, 1)]).filter(Boolean)
  const recent = paid[tick % Math.max(paid.length, 1)]
  return <section className={cn('cash-flow panel', expanded && 'cash-flow-expanded', (!playing || reduced) && 'flow-paused')} aria-labelledby="cash-flow-title"><div className="section-heading"><div className="heading-with-description"><div className="heading-line"><h2 id="cash-flow-title">Cash flow</h2><span className="live-badge"><span className="status-dot" /> {playing ? 'LIVE DEMO' : 'PAUSED'}</span></div><p>A little less chasing. A lot more getting paid.</p></div><div className="flow-controls"><Button variant="ghost" size="icon-sm" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause cash flow' : 'Play cash flow'}>{playing ? <Pause /> : <Play />}</Button><Button variant="ghost" size="icon-sm" onClick={() => setExpanded(!expanded)} aria-label={expanded ? 'Minimize cash flow' : 'Expand cash flow'}>{expanded ? <Minimize2 /> : <Maximize2 />}</Button></div></div>
    <div className="flow-stage"><div className="flow-column-label left"><FileText size={12} /> YOUR INVOICES</div><div className="flow-column-label right"><CircleCheck size={12} /> MONEY IN</div>
      <svg className="flow-connections" viewBox="0 0 800 300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="flow-blue"><stop stopColor="#536ac9" stopOpacity=".15" /><stop offset="1" stopColor="#5d77fb" stopOpacity=".9" /></linearGradient><linearGradient id="flow-green"><stop stopColor="#536ee8" /><stop offset="1" stopColor="#3bd9a1" stopOpacity=".55" /></linearGradient></defs>{[70, 150, 230].map((y, index) => <g key={y}><path d={`M 190 ${y} C 285 ${y}, 280 150, 360 150`} fill="none" stroke="url(#flow-blue)" strokeWidth="1.1" /><path className="flow-travel blue-travel" style={{ animationDelay: `${index * -1.6}s` }} d={`M 190 ${y} C 285 ${y}, 280 150, 360 150`} fill="none" stroke="#82a0ff" strokeWidth="2" /><path d={`M 440 150 C 520 150, 515 ${y}, 610 ${y}`} fill="none" stroke="url(#flow-green)" strokeWidth="1.1" /><path className="flow-travel green-travel" style={{ animationDelay: `${index * -1.9}s` }} d={`M 440 150 C 520 150, 515 ${y}, 610 ${y}`} fill="none" stroke="#5bf2c2" strokeWidth="2" /></g>)}</svg>
      <div className="flow-nodes incoming">{left.map((invoice, i) => <AnimatePresence mode="wait" key={i}><motion.button key={invoice.id} className={cn('flow-invoice', invoice.status === 'OVERDUE' ? 'overdue' : 'pending')} initial={reduced ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: .4 }} onClick={() => setSelected(invoice)}><span className="invoice-node-icon"><FileText size={15} /></span><span><strong>{invoice.customer.split(' ')[0]} <span className="node-status-dot" /></strong><small>{invoice.id}</small></span><b>{money(invoice.amount)}</b></motion.button></AnimatePresence>)}</div>
      <div className="paypal-hub"><div className="hub-orbit orbit-outer" /><div className="hub-orbit orbit-inner" /><div className="hub-core"><span className="paypal-symbol">P<span>P</span></span><strong>PayPal</strong></div><span className="hub-connection"><span className="status-dot" /> Connected</span></div>
      <div className="flow-nodes settled">{right.map((invoice, i) => <AnimatePresence mode="wait" key={i}><motion.button key={invoice.id} className="flow-invoice paid" initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: .4, delay: .12 }} onClick={() => setSelected(invoice)}><span className="invoice-node-icon"><Check size={16} /></span><span><strong>{invoice.customer.split(' ')[0]}</strong><small>Payment received</small></span><b>{money(invoice.amount)}</b></motion.button></AnimatePresence>)}</div>
      <div className="flow-bottom-note"><Sparkles size={12} /><span>Your agent is moving things along.</span></div>
    </div>
    <div className="flow-footer"><div className="flow-legend"><span><i className="legend-dot amber" /> Awaiting payment</span><span><i className="legend-dot rose" /> Overdue</span><span><i className="legend-dot green" /> Paid</span></div>{recent && <span className="recent-payment"><Zap size={12} /><strong>{money(recent.amount)}</strong> received <span>· demo</span></span>}</div>
    {selected && <div className="flow-detail"><div><strong>{selected.customer}</strong><span>{selected.id} · {money(selected.amount, 2)} · {selected.status.toLowerCase()}</span></div><Button size="icon-sm" variant="ghost" aria-label="Close invoice detail" onClick={() => setSelected(null)}><X /></Button></div>}
  </section>
}
