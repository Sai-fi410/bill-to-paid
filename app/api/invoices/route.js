import { NextResponse } from 'next/server';
import { pp } from '@/lib/paypal';

export async function GET() {
  try {
    const data = await pp('/v2/invoicing/invoices?page=1&page_size=20&total_required=true', 'GET');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch PayPal invoices:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error', details: error.data },
      { status: error.status || 500 }
    );
  }
}
