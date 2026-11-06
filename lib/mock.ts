export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE'
export type Invoice = { id: string; customer: string; email: string; initials: string; amount: number; status: InvoiceStatus; due: string; action: string; color: string; created: string }
export type LineItem = { id: string; name: string; quantity: number; price: number }
export type AgentActivity = { id: string; type: 'reminder' | 'paid' | 'sent' | 'scheduled'; title: string; description: string; time: string; reasoning: string }

const seedInvoices: Invoice[] = [
  { id: 'INV-1042', customer: 'Ravi Sharma', email: 'ravi@sharmastudio.com', initials: 'RS', amount: 850, status: 'OVERDUE', due: '2026-10-30', action: 'Firm reminder sent', color: 'violet', created: '2026-10-24' },
  { id: 'INV-1041', customer: 'Olivia Rhye', email: 'olivia@layers.design', initials: 'OR', amount: 2450, status: 'PAID', due: '2026-11-04', action: 'Payment confirmed', color: 'green', created: '2026-10-26' },
  { id: 'INV-1040', customer: 'Phoenix Baker', email: 'phoenix@baker.co', initials: 'PB', amount: 1280, status: 'SENT', due: '2026-11-08', action: 'Gentle reminder scheduled', color: 'blue', created: '2026-10-28' },
  { id: 'INV-1039', customer: 'Lana Steiner', email: 'lana@steiner.studio', initials: 'LS', amount: 1800, status: 'PAID', due: '2026-11-03', action: 'Thank-you sent', color: 'rose', created: '2026-10-23' },
  { id: 'INV-1038', customer: 'Demi Wilkinson', email: 'demi@wildflower.co', initials: 'DW', amount: 950, status: 'DRAFT', due: '2026-11-12', action: 'Ready for your review', color: 'amber', created: '2026-11-04' },
  { id: 'INV-1037', customer: 'Drew Cano', email: 'drew@cano.design', initials: 'DC', amount: 1300, status: 'OVERDUE', due: '2026-10-28', action: 'Follow-up scheduled', color: 'blue', created: '2026-10-20' },
  { id: 'INV-1036', customer: 'Natali Craig', email: 'natali@craig.co', initials: 'NC', amount: 3200, status: 'PAID', due: '2026-11-02', action: 'Payment confirmed', color: 'violet', created: '2026-10-20' },
  { id: 'INV-1035', customer: 'Orlando Diggs', email: 'orlando@diggs.co', initials: 'OD', amount: 3000, status: 'SENT', due: '2026-11-10', action: 'Invoice delivered', color: 'green', created: '2026-10-22' },
  { id: 'INV-1034', customer: 'Andi Lane', email: 'andi@lane.co', initials: 'AL', amount: 4850, status: 'PAID', due: '2026-10-31', action: 'Thank-you sent', color: 'rose', created: '2026-10-18' },
  { id: 'INV-1033', customer: 'Kate Morrison', email: 'kate@morrison.co', initials: 'KM', amount: 6120, status: 'PAID', due: '2026-10-29', action: 'Payment confirmed', color: 'amber', created: '2026-10-15' },
]
let invoices = [...seedInvoices]
const activities: AgentActivity[] = [
  { id: 'a1', type: 'reminder', title: 'A little nudge, right on time', description: 'Reminder sent to Ravi. Firm tone, overdue 5 days.', time: '2 min ago', reasoning: 'The invoice is 5 days overdue and a gentle reminder was already sent. A firm, respectful follow-up is the next step.' },
  { id: 'a2', type: 'paid', title: 'Another one, paid.', description: 'Olivia paid $2,450. Invoice marked as paid.', time: '12 min ago', reasoning: 'The simulated PayPal payment matches INV-1041 in amount and currency. No follow-up is needed.' },
  { id: 'a3', type: 'sent', title: 'Good relationships matter', description: 'A thank-you note sent to Lana after her payment.', time: '28 min ago', reasoning: 'Lana paid on time. A short thank-you acknowledges her payment and helps build a lasting customer relationship.' },
  { id: 'a4', type: 'scheduled', title: 'One step ahead', description: 'Gentle reminder scheduled for Phoenix on Nov 7.', time: '42 min ago', reasoning: 'This invoice is due on Nov 8. A friendly note one day before the due date gives the customer time to arrange payment.' },
  { id: 'a5', type: 'sent', title: 'Delivered. Now we wait.', description: 'Invoice sent to Orlando for $3,000 via PayPal.', time: '1 hour ago', reasoning: 'The invoice has a valid customer email and reviewed line items. Delivery starts the reminder schedule.' },
  { id: 'a6', type: 'paid', title: 'All taken care of', description: 'Natali’s $3,200 payment has been reconciled.', time: '2 hours ago', reasoning: 'The incoming payment was matched to the invoice reference and the outstanding balance is now zero.' },
]
const trends = [
  [18, 23, 19, 32, 26, 31, 27, 39, 36, 46, 42, 55, 51, 64, 60, 75],
  [13, 19, 17, 24, 22, 20, 31, 27, 34, 32, 42, 40, 53, 49, 63, 70],
  [43, 41, 50, 46, 52, 42, 47, 39, 42, 31, 37, 27, 30, 23, 29, 22],
  [52, 48, 50, 44, 46, 36, 40, 32, 38, 29, 31, 24, 28, 17, 21, 16],
]
const extractedItems: LineItem[] = [
  { id: 'item-1', name: 'Brand identity design', quantity: 1, price: 650 },
  { id: 'item-2', name: 'Business card design', quantity: 2, price: 75 },
  { id: 'item-3', name: 'Print preparation', quantity: 1, price: 50 },
]
const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms))
export const money = (value: number, decimals = 0) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value)
export async function getInvoices(): Promise<Invoice[]> { return invoices.map(invoice => ({ ...invoice })) }
export async function getActivity(): Promise<AgentActivity[]> { return activities.map(activity => ({ ...activity })) }
export function getMetricTrends() { return trends.map(points => points.map(value => ({ value }))) }
export async function scanBill(_file?: File): Promise<LineItem[]> { await delay(2300); return extractedItems.map(item => ({ ...item })) }
export async function sendInvoice(input: { email: string; customer: string; items: LineItem[]; due: string }): Promise<Invoice> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || !input.customer.trim()) throw new Error('Enter a customer name and a valid email address.')
  if (!input.due || !Number.isFinite(Date.parse(input.due))) throw new Error('Choose a valid due date.')
  if (!input.items.length || input.items.some(item => !item.name.trim() || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 999 || !Number.isFinite(item.price) || item.price <= 0 || item.price > 100000)) throw new Error('Each item needs a name, a quantity from 1–999, and a valid positive price.')
  await delay(1000)
  const invoice: Invoice = { id: `INV-${1043 + invoices.length - seedInvoices.length}`, customer: input.customer.trim(), email: input.email.trim(), initials: input.customer.trim().split(/\s+/).map(name => name[0]).slice(0, 2).join('').toUpperCase(), amount: Math.round(input.items.reduce((sum, item) => sum + item.quantity * item.price, 0) * 100) / 100, status: 'SENT', due: input.due, action: 'Invoice delivered (demo)', color: 'violet', created: new Date().toISOString().slice(0, 10) }
  invoices = [invoice, ...invoices]
  activities.unshift({ id: `a-${invoice.id}`, type: 'sent', title: 'Your next payment starts here', description: `Demo invoice sent to ${invoice.customer} for ${money(invoice.amount)}.`, time: 'Just now', reasoning: 'The line items and customer details were validated. This is a simulated send; no email or real PayPal invoice was created.' })
  return { ...invoice }
}
export async function getFlowInvoices(): Promise<Invoice[]> { return getInvoices() }
export function summarizeInvoices(list: Invoice[]) {
  const sum = (statuses: InvoiceStatus[]) => list.filter(invoice => statuses.includes(invoice.status)).reduce((total, invoice) => total + invoice.amount, 0)
  return [sum(['SENT', 'PAID', 'OVERDUE']), sum(['PAID']), sum(['SENT', 'OVERDUE']), sum(['OVERDUE'])]
}
export function exportInvoices(list: Invoice[]) {
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`
  return [['Invoice', 'Customer', 'Email', 'Amount (USD)', 'Status', 'Due date', 'Last AI action'], ...list.map(i => [i.id, i.customer, i.email, i.amount, i.status, i.due, i.action])].map(row => row.map(escape).join(',')).join('\n')
}
