# Khanom Zand | Real Estate

A real estate website built with React, Vite, and Tailwind CSS, integrated with a Django REST API.

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Development server: http://localhost:5173

Build for production:

```bash
npm run build
```

Build output: `dist/`

## Routes

- **Public Website:** `/`
- **Admin Panel:** `/panel`

The admin panel uses JWT authentication through the Django REST API. Frontend route access alone does not provide security; protected operations and permissions must be enforced by the backend.

## Assets and SEO

- Profile photo: `public/images/profile.jpg`
- Replace the placeholder domain `https://example.com` with the actual website domain in:
  - `index.html`
  - `public/robots.txt`
  - `public/sitemap.xml`

## Environment Configuration

The frontend communicates with the Django REST API. Configure the API base URL in `frontend/.env` using `VITE_API_URL`.

Example development configuration:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Restart the Vite development server after changing environment variables.

## Django REST API Integration

### Authentication

- Admin login using `POST /api/token/`.
- Access and refresh token handling.
- Authenticated API requests using Bearer tokens.
- Access token refresh and logout handling.

### Portfolio Management

- Fetches portfolio data from `GET /api/portfolios/`.
- Maps backend portfolio records to the frontend project structure.
- Supports pagination with 10 portfolio items per page in the admin panel.
- Provides Previous and Next controls for admin portfolio navigation.
- Supports pagination in the public homepage portfolio section.
- Creates portfolio items through the admin panel.
- Updates portfolio availability.
- Deletes portfolio items through the admin panel.
- Handles deletion of the last item on a page without unnecessarily leaving an empty page.
- Fetches public portfolio data from the backend rather than merging stale projects from local storage.

### Contact Form

- Submits inquiries to the backend inquiry API.
- Sends required inquiry fields, including `full_name`, `number`, and `message`.
- Displays loading, success, and error states.
- Provides a WhatsApp follow-up link after successful submission.

### Customer and Inquiry Management

- Lists inquiries and customer records in the admin panel.
- Supports transferring inquiries to the customer list.
- Supports deleting inquiries and customer records.
- Supports editing existing customer records through PATCH API requests.
- Updates customer call status and persists changes through the API.
- Supports pagination for inquiries and customers, displaying up to 10 records per page.
- Provides Previous and Next controls for navigating inquiry and customer pages.
- Updates the page count after customer deletion.
- Handles deletion of the last record on a page without unnecessarily leaving an empty page.
- Detects duplicate customer phone numbers when creating customers directly or transferring inquiries.
- Displays a localized error message when a customer phone number is already registered.

## Internationalization

- Supports English and Persian interface translations.
- Includes localized pagination controls and contact form messages.
- Includes translations for portfolio area units and duplicate customer phone number errors.
- Provides localized customer budget validation errors in English and Persian.
- Validates customer budgets in both create and edit forms.
- Allows an empty budget or a non-negative whole number up to `999,999,999,999,999`.
- Rejects non-numeric, negative, decimal, and out-of-range budget values.
- Formats budget amounts with thousands separators and English digits.

## Testing

The following workflows have been tested as part of frontend development:

- Admin login using JWT authentication.
- Portfolio creation and deletion through the admin panel.
- Admin portfolio pagination and deletion from the last page.
- Homepage portfolio pagination.
- Public portfolio updates after portfolio changes.
- Contact form submission through the backend.
- Transferring inquiries to customers.
- Localized duplicate customer phone number errors.
- Inquiry pagination and deletion from the last page.
- Customer pagination, including navigating between pages and deleting the last customer on a page.
- Editing customer records using PATCH requests.
- Updating customer call status and verifying persistence after refreshing the page.
- Customer budget validation and formatting.
- Portfolio image selection with support for up to two images.
- Continuous technology marquee animation.
- Production build using `npm run build`.

## Project Status

The main frontend API integration workflows and admin panel improvements have been implemented. Pagination is available for inquiries, admin portfolios, homepage portfolios, and customer records.
