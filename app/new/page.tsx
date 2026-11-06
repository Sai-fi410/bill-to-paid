import { NewInvoice } from '@/components/new-invoice'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New invoice | Bill-to-Paid' }

export default function NewInvoicePage() {
  return <NewInvoice />
}
