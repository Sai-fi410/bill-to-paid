# Bill-to-Paid

Turn a paper bill into a PayPal invoice in seconds, and watch the money move on a live dashboard.

Built for the PayPal AI Hackathon.

## The problem
Small merchants, freelancers and tutors still write bills by hand, retype them into an invoicing tool, and chase late payers. Bill-to-Paid removes the retyping.

## How it works
1. Upload a photo of a paper bill.
2. Gemini reads the customer's line items from the image.
3. You review and edit the items, then send.
4. The app creates and sends a real invoice through the PayPal Invoicing API (sandbox).
5. The dashboard lists invoices from PayPal with their status.

## PayPal APIs used
- OAuth 2.0 client-credentials token (`/v1/oauth2/token`)
- Invoicing v2: create draft invoice, send invoice, list invoices (`/v2/invoicing/invoices`)

## AI used
- Google Gemini (vision) extracts customer and line items from a bill photo (`app/api/scan/route.js`).

## Tech stack
Next.js (App Router), React, Tailwind, shadcn/ui, Recharts, Framer Motion, PayPal REST API, Google Gemini API, Vercel. UI generated with v0 and wired to live APIs.

## Run locally
```
git clone https://github.com/Sai-fi410/bill-to-paid.git
cd bill-to-paid
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000

### Environment variables (`.env.local`)
```
PAYPAL_CLIENT_ID=        # PayPal Developer > Apps & Credentials > Sandbox app
PAYPAL_CLIENT_SECRET=
PAYPAL_BASE=https://api-m.sandbox.paypal.com
GEMINI_API_KEY=          # Google AI Studio
GEMINI_MODEL=            # optional, defaults to a current Gemini Flash model
```
The PayPal app must have the **Invoicing** feature enabled. Never commit `.env.local`.

## Testing as a judge
- Live demo: <YOUR VERCEL URL>
- Open **New invoice**, upload a bill photo (or use the sample bill), review the items, enter a customer email and due date, and click Send.
- Open **Overview** to see the invoice listed from PayPal.
- Verify it in the PayPal Sandbox: log in at https://sandbox.paypal.com with the Business test account given in the Devpost testing instructions, then open Invoicing.
- Sandbox only. No real money moves.

## Current limitations
- The "AI agent activity" feed and the cash-flow animation on the dashboard use sample data. Payment-reminder automation is not yet connected.
- One bill per upload.

## License
MIT
