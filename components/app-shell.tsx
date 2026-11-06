'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Bell, ChevronDown, ChevronRight, CircleHelp, Command, FileText, LayoutDashboard, Menu, Plus, Search, ShieldCheck, Sparkles, X, Zap } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isNew = pathname === '/new'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [panel, setPanel] = useState<'notifications' | 'help' | null>(null)
  return <div className="app-shell">
    <aside className={cn('sidebar', mobileOpen && 'sidebar-open')}>
      <Link href="/dashboard" className="brand" onClick={() => setMobileOpen(false)} aria-label="Bill-to-Paid home"><span className="brand-mark"><ArrowUpRight /></span><span>bill<span className="brand-to">to</span>paid<span className="brand-period">.</span></span></Link>
      <div className="workspace-switch"><div className="workspace-avatar">S<span /></div><div><strong>Studio workspace</strong><span>Merchant account</span></div><ChevronDown size={14} /></div>
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation" className="main-nav">
        <Link href="/dashboard" className={cn('nav-item', !isNew && 'active')} onClick={() => setMobileOpen(false)}><LayoutDashboard size={17} /><span>Overview</span><span className="nav-shortcut">G D</span></Link>
        <Link href="/dashboard#invoices" className="nav-item" onClick={() => setMobileOpen(false)}><FileText size={17} /><span>Invoices</span><span className="nav-count">10</span></Link>
        <Link href="/new" className={cn('nav-item', isNew && 'active')} onClick={() => setMobileOpen(false)}><Plus size={17} /><span>New invoice</span></Link>
        <Link href="/dashboard#agent-activity" className="nav-item" onClick={() => setMobileOpen(false)}><Sparkles size={17} /><span>AI activity</span><span className="nav-live-dot" /></Link>
      </nav>
      <div className="sidebar-bottom"><div className="autopilot-card"><div className="autopilot-icon"><Sparkles size={17} /></div><strong>Your follow-ups. On autopilot.</strong><p>You do the work.<br />Let your agent do the chasing.</p><div><span className="status-dot" /> Agent is working for you</div></div>
      <div className="paypal-connection"><span className="paypal-mini">P</span><div><strong>PayPal sandbox</strong><span><span className="status-dot" /> Demo connected</span></div><ShieldCheck size={15} /></div>
      <button className="nav-item help-link" onClick={() => setPanel('help')}><CircleHelp size={17} /><span>Help & getting started</span><ArrowUpRight size={14} /></button>
      <div className="profile"><div className="profile-avatar">SC</div><div><strong>Sam Carter</strong><span>Studio owner · Demo</span></div><ChevronDown size={14} /></div></div>
    </aside>
    {mobileOpen && <button className="mobile-overlay" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <div className="app-content"><header className="topbar"><div className="breadcrumbs"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><span>Workspace</span><ChevronRight size={13} /><strong>{isNew ? 'New invoice' : 'Overview'}</strong></div><div className="topbar-actions"><span className="demo-label">DEMO WORKSPACE</span><span className="topbar-divider" /><Link href="/dashboard#invoice-search" aria-label="Search invoices"><Search size={17} /></Link><button aria-label="View notifications" className="notification-button" onClick={() => setPanel(panel === 'notifications' ? null : 'notifications')}><Bell size={18} /><i /></button><div className="small-avatar">SC</div></div></header>
      <main>{children}</main><footer className="app-footer"><span><span className="status-dot" /> All systems operational <span className="footer-dot">·</span> Demo data</span><span>Less chasing. More creating. <ArrowUpRight size={12} /></span></footer>
    </div>
    {panel && <div className="info-overlay" onClick={() => setPanel(null)}><section className="info-panel panel" role="dialog" aria-modal="true" aria-labelledby="info-title" onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setPanel(null) }}><div className="section-heading"><h2 id="info-title">{panel === 'help' ? 'From bill to paid.' : 'You’re all caught up'}</h2><Button variant="ghost" size="icon" aria-label="Close dialog" autoFocus onClick={() => setPanel(null)}><X /></Button></div>{panel === 'help' ? <><p>1. Upload a photo of your paper bill, or try a sample.</p><p>2. Review the extracted line items and enter customer details.</p><p>3. Send a demo invoice and track it on your dashboard.</p><div className="demo-notice"><ShieldCheck size={18} /> This is a mock workspace. Scanning, AI actions, and PayPal payments are simulated. Changes reset on refresh.</div><Link href="/new" className={buttonVariants()} onClick={() => setPanel(null)}>Create your first invoice <ArrowUpRight data-icon="inline-end" /></Link></> : <><p>Your agent is keeping an eye on your invoices. View the activity feed for the latest simulated reminders and payments.</p><Link href="/dashboard#agent-activity" className={buttonVariants({ variant: 'outline' })} onClick={() => setPanel(null)}>View activity <ArrowDownLeft data-icon="inline-end" /></Link></>}</section></div>}
    <Toaster theme="dark" richColors position="bottom-right" />
  </div>
}
