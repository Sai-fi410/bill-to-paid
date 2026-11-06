'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Clock3, Mail, Send, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type AgentActivity } from '@/lib/mock'
import { cn } from '@/lib/utils'

const icons = { reminder: Mail, paid: Check, sent: Send, scheduled: Clock3 }
export function ActivityFeed({ activities }: { activities: AgentActivity[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const reduced = useReducedMotion()
  return <aside id="agent-activity" className="activity-panel panel"><div className="activity-title"><span className="agent-heading-icon"><Sparkles size={17} /></span><h2>AI agent activity</h2><span className="activity-online"><span className="status-dot" /> Live</span></div><div className="agent-summary"><div><span className="agent-orb"><Sparkles size={18} /></span><div><strong>Your quiet advantage.</strong><p>Working in the background, for you.</p></div></div><div className="agent-summary-stats"><span><Zap size={12} /><b>24</b> actions today</span><span><Clock3 size={12} /><b>3.2h</b> saved</span></div></div><div className="activity-day"><span>TODAY</span><span>WED, NOV 4</span></div><div className="activity-list">{(showAll ? activities : activities.slice(0, 5)).map((activity, index) => { const Icon = icons[activity.type]; return <motion.article className={cn('activity-item', activity.type)} key={activity.id} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}><div className="timeline-icon"><Icon size={13} /></div><div className="activity-copy"><div className="activity-time">{activity.time}<span /></div><h3>{activity.title}</h3><p>{activity.description}</p><button className="reason-button" aria-expanded={open === activity.id} aria-controls={`reason-${activity.id}`} onClick={() => setOpen(open === activity.id ? null : activity.id)}>Why this action <ChevronDown size={11} className={cn(open === activity.id && 'rotate-180')} /></button><AnimatePresence>{open === activity.id && <motion.div id={`reason-${activity.id}`} className="activity-reason" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}>{activity.reasoning}</motion.div>}</AnimatePresence></div></motion.article> })}</div><div className="activity-all"><Button variant="ghost" size="sm" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show recent activity' : 'View all activity'}<ArrowUpRight data-icon="inline-end" /></Button></div><div className="agent-trust"><ShieldCheck size={13} /><span>Thoughtful follow-ups. Always in your control.</span></div></aside>
}
