import { NextResponse } from 'next/server';
import { pp } from '@/lib/paypal';

export async function POST(request) {
  try {
    const { customerEmail, items } = await request.json();

    if (!customerEmail || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'customerEmail and items array are required' },
        { status: 400 }
      );
    }

    const invoicePayload = {
      detail: {
        currency_code: 'USD',
      },
      primary_recipients: [
        {
          billing_info: {
            email_address: customerEmail,
          },
        },
      ],
      items: items.map(item => ({
        name: item.name,
        quantity: String(item.qty ?? item.quantity ?? 1),
        unit_amount: {
          currency_code: 'USD',
          value: Number(item.price).toFixed(2),
        },
      })),
    };

    const draft = await pp('/v2/invoicing/invoices', 'POST', invoicePayload);
    const id = draft.id || (draft.href ? draft.href.split('/').pop() : null) || (draft.links?.find(link => link.rel === 'self')?.href?.split('/').pop());

    if (!id) {
      throw new Error('Failed to retrieve invoice ID from PayPal response');
    }

    await pp(`/v2/invoicing/invoices/${id}/send`, 'POST', {
      send_to_recipient: true,
    });

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Failed to create/send PayPal invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error', details: error.data },
      { status: error.status || 500 }
    );
  }
}
