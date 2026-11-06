'use client'

import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import { CalendarDays, ChevronDown, Plus, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { KpiCards } from '@/components/kpi-cards'
import { CashFlow } from '@/components/cash-flow'
import { InvoiceTable } from '@/components/invoice-table'
import { ActivityFeed } from '@/components/activity-feed'
import { getActivity, getInvoices } from '@/lib/mock'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const { data: invoices = [], isLoading, error } = useSWR('/api/invoices', getInvoices)
  const { data: activity = [] } = useSWR('/api/invoices/activity', getActivity)
  const [period, setPeriod] = useState('30')
  const [search, setSearch] = useState('')
  const filtered = period === '30' ? invoices : invoices.filter(invoice => invoice.created >= '2026-10-29')
  return <div className="dashboard page-container"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR BUSINESS, IN MOTION</div><h1>Good things are flowing<span>.</span></h1><p>Less time following up. More time doing what you love.</p></div><div className="page-actions"><label className="period-select"><CalendarDays size={14} /><select aria-label="Reporting period" value={period} onChange={e => setPeriod(e.target.value)}><option value="30">Last 30 days</option><option value="7">Last 7 days</option></select><ChevronDown size={12} /></label><Link href="/new" className={cn(buttonVariants(), 'new-invoice-button')}><Plus data-icon="inline-start" /> New invoice</Link></div></div>
    {error ? <div className="demo-notice">Could not load invoices. Please refresh to retry.</div> : <><KpiCards invoices={filtered} /><div className="dashboard-columns"><div className="dashboard-primary"><CashFlow invoices={filtered} /><InvoiceTable invoices={filtered} search={search} setSearch={setSearch} /><div className="insight-bar"><span className="insight-icon"><Sparkles size={15} /></span><p><strong>A little follow-up goes a long way.</strong> Your agent is here to help turn outstanding invoices into your next opportunity.</p><span className="insight-label">BILL-TO-PAID INSIGHT</span></div></div><ActivityFeed activities={activity} /></div></>}
    {isLoading && <span className="sr-only" role="status">Loading your demo workspace</span>}
  </div>
}
