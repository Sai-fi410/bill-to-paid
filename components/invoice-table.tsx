'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowRight, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { exportInvoices, money, type Invoice, type InvoiceStatus } from '@/lib/mock'
import { cn } from '@/lib/utils'

export function InvoiceTable({ invoices, search, setSearch }: { invoices: Invoice[]; search: string; setSearch: (value: string) => void }) {
  const [status, setStatus] = useState<InvoiceStatus | 'ALL'>('ALL')
  const [page, setPage] = useState(0)
  const [descending, setDescending] = useState<boolean | null>(null)
  const [detail, setDetail] = useState<Invoice | null>(null)
  const filtered = invoices.filter(i => (status === 'ALL' || i.status === status) && `${i.customer} ${i.email} ${i.id}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => descending === null ? 0 : descending ? b.amount - a.amount : a.amount - b.amount)
  const totalPages = Math.ceil(filtered.length / 6)
  const safePage = Math.min(page, Math.max(totalPages - 1, 0))
  const visible = filtered.slice(safePage * 6, safePage * 6 + 6)
  function download() {
    const url = URL.createObjectURL(new Blob([exportInvoices(filtered)], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a'); a.href = url; a.download = 'bill-to-paid-invoices.csv'; a.click(); URL.revokeObjectURL(url)
  }
  return <section id="invoices" className="invoice-panel panel"><div className="section-heading"><div className="heading-line"><h2>Recent invoices</h2><span className="count-badge">{invoices.length}</span></div><Button variant="ghost" size="sm" onClick={download}><ArrowDownToLine data-icon="inline-start" /> Export</Button></div><div className="invoice-toolbar"><div className="invoice-tabs" role="tablist" aria-label="Filter invoices by status">{(['ALL', 'SENT', 'PAID', 'OVERDUE', 'DRAFT'] as const).map(value => <button role="tab" aria-selected={status === value} className={cn(status === value && 'selected')} key={value} onClick={() => { setStatus(value); setPage(0) }}>{value === 'ALL' ? 'All invoices' : value.charAt(0) + value.slice(1).toLowerCase()}{value === 'OVERDUE' && <span>{invoices.filter(i => i.status === 'OVERDUE').length}</span>}</button>)}</div><div className="table-search"><Search size={13} /><input id="invoice-search" aria-label="Search invoices" placeholder="Search invoices..." value={search} onChange={e => { setSearch(e.target.value); setPage(0) }} /></div></div>
    <div className="table-scroll"><table><thead><tr><th>Customer</th><th><button className="sort-button" onClick={() => setDescending(descending === null ? true : !descending)}>Amount <ArrowDown size={11} className={cn(descending === false && 'rotate-180')} /><span className="sr-only">Sort by amount</span></button></th><th>Status</th><th>Due date</th><th><Sparkles size={11} /> Last AI action</th><th><span className="sr-only">Details</span></th></tr></thead><tbody>{visible.map(invoice => <tr key={invoice.id}><td><div className="customer-cell"><span className={cn('customer-avatar', invoice.color)}>{invoice.initials}</span><div><button className="customer-name" onClick={() => setDetail(invoice)}>{invoice.customer}</button><span>{invoice.id}</span></div></div></td><td className="amount-cell">{money(invoice.amount, 2)}</td><td><Badge variant="outline" className={cn('invoice-status', invoice.status.toLowerCase())}><i />{invoice.status}</Badge></td><td className={cn('date-cell', invoice.status === 'OVERDUE' && 'overdue-date')}>{new Date(`${invoice.due}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}</td><td><span className="ai-action">{invoice.action}</span></td><td><Button variant="ghost" size="icon-xs" aria-label={`View ${invoice.id}`} onClick={() => setDetail(invoice)}><ChevronRight /></Button></td></tr>)}</tbody></table>{visible.length === 0 && <div className="empty-invoices"><Search size={25} /><strong>No invoices found</strong><p>Try another name or choose a different status.</p><Button variant="outline" size="sm" onClick={() => { setSearch(''); setStatus('ALL'); setPage(0) }}>Clear filters</Button></div>}</div>
    <div className="table-footer"><span>Showing <strong>{filtered.length ? safePage * 6 + 1 : 0}–{Math.min((safePage + 1) * 6, filtered.length)}</strong> of <strong>{filtered.length}</strong> invoices</span><div><Button size="icon-xs" variant="outline" aria-label="Previous page" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}><ChevronLeft /></Button><span>{safePage + 1} / {Math.max(totalPages, 1)}</span><Button size="icon-xs" variant="outline" aria-label="Next page" disabled={safePage + 1 >= totalPages} onClick={() => setPage(safePage + 1)}><ChevronRight /></Button></div></div>
    {detail && <div className="invoice-detail-inline"><div className="section-heading"><h3>{detail.id} · {detail.customer}</h3><Button size="icon-xs" variant="ghost" aria-label="Close invoice" onClick={() => setDetail(null)}><X /></Button></div><div><span>{detail.email}</span><strong>{money(detail.amount, 2)}</strong><span>{detail.status} · Due {detail.due}</span></div><p><Sparkles size={13} /> {detail.action}</p></div>}
  </section>
}
