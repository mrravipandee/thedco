# THE DCO Backend

The secure, production-hardened backend content management and enquiry system for **THE DCO** premium luxury hospitality advisory platform.

---

## 🛠️ Stack

*   **Framework**: Next.js (App Router, React 19)
*   **Language**: TypeScript
*   **Database**: MongoDB
*   **ODM**: Mongoose
*   **Validation**: Zod (Strict Payload parsing)
*   **Authentication**: Stateless secure HTTP-only cookies signed via HMAC-SHA256 (JWT architecture)
*   **Rate Limiting**: Sliding-window memory-swept rate-limiter

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (based on `.env.example`):
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/thedco
NEXT_PUBLIC_SITE_URL=http://localhost:3000
AUTH_SECRET=a-secure-secret-minimum-16-characters
```

### 3. Initialize Admin Account
To create or update the initial admin credentials in the database:
Ensure your `.env` contains the desired `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` (defaults to `.env.example` if omitted), then run:
```bash
npx tsx scripts/create-admin.ts
```

### 4. Start Development Server
```bash
npm run dev
```

---

## ⚙️ Environment Variables

The backend validates the following environment variables on startup. If any are missing or malformed, the process fails fast:

*   `MONGODB_URI`: Valid MongoDB connection string URL.
*   `AUTH_SECRET`: Cookie signature secret key (minimum 16 characters).
*   `NEXT_PUBLIC_SITE_URL`: Valid canonical URL of the application.

---

## 🏛️ Authentication & Roles

*   **Public**: Unauthenticated users.
    *   Can submit enquiries.
    *   Can view published blog posts and public case studies.
*   **Editor**: Authenticated CMS operator.
    *   Can create, read, and update all blogs and case studies.
    *   Can list and update submitted contact enquiries.
    *   Cannot delete blogs, case studies, or enquiries (blocked at the authorization layer).
*   **Admin**: Super-user.
    *   Full CRUD access to all collections.
    *   Sole permission tier allowed to perform deletion (`DELETE`) requests.

---

## 📋 API Inventory

All API endpoints follow standardized JSON structures.

### Success Format (Single)
```json
{
  "success": true,
  "data": {}
}
```

### List Format
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": {
      "email": "Please enter a valid email address."
    }
  }
}
```

---

### Endpoints List

#### 1. HEALTH
*   `GET /api/health` — Returns status of the database connectivity safely without exposing credentials or configuration details.

#### 2. AUTHENTICATION
*   `POST /api/auth/login` — Authenticates admin/editor, signs session, and returns secure HTTP-only cookie. (Rate-limited: 5 failed attempts per IP per 15 mins).
*   `GET /api/auth/session` — Decodes and verifies the active session cookie, returning logged-in user context.
*   `POST /api/auth/logout` — Sets session cookie expiration to epoch, immediately clearing the credentials client-side.

#### 3. ENQUIRIES
*   `POST /api/enquiries` — Public submission endpoint. Assigns status `"new"` server-side. Strict validation prevents parameter injection. (Rate-limited: 5 submissions per IP per 10 mins).
*   `GET /api/enquiries` — List enquiries. (Protected: Admin/Editor. Supports optional `page`, `limit`, `status`, and `search` parameters).
*   `GET /api/enquiries/[id]` — Retrieve single enquiry details. (Protected: Admin/Editor).
*   `PATCH /api/enquiries/[id]` — Update enquiry status. (Protected: Admin/Editor).
*   `DELETE /api/enquiries/[id]` — Delete enquiry from database. (Protected: Admin only).

#### 4. BLOGS
*   `POST /api/blogs` — Create blog post. (Protected: Admin/Editor).
*   `GET /api/blogs` — List blog posts. (Public listing returns published items; Admin session returns all statuses. Supports `page`, `limit`, `status`, `category`, and `search` queries).
*   `GET /api/blogs/[id]` — Retrieve full blog content by ID. (Protected: Admin/Editor).
*   `PATCH /api/blogs/[id]` — Partial update of blog details. (Protected: Admin/Editor).
*   `DELETE /api/blogs/[id]` — Delete blog post. (Protected: Admin only).
*   `GET /api/blogs/slug/[slug]` — Retrieve complete published blog post details. (Public).

#### 5. CASE STUDIES
*   `POST /api/case-studies` — Create case study. (Protected: Admin/Editor).
*   `GET /api/case-studies` — List case studies. (Public listing returns published items; Admin session returns all statuses. Supports `page`, `limit`, `status`, `propertyType`, `projectType`, `location`, and `search` queries).
*   `GET /api/case-studies/[id]` — Retrieve full case study content by ID. (Protected: Admin/Editor).
*   `PATCH /api/case-studies/[id]` — Partial update of case study details. (Protected: Admin/Editor).
*   `DELETE /api/case-studies/[id]` — Delete case study. (Protected: Admin only).
*   `GET /api/case-studies/slug/[slug]` — Retrieve complete published case study details. (Public).

---

## 🛡️ Production & Security Hardening

*   **Strict Zod Schema Rejectors**: Object inputs append `.strict()` constraints to block unrecognized keys at the route boundary, preventing parameter poisoning or privilege injection attempts.
*   **State-Masked Error Handling**: Uncaught runtime errors log internally on the server but return generic `"Something went wrong"` status responses to client applications, completely stripping stack traces or driver details.
*   **In-Memory Rate Limiting**: The sliding-window rate limit is kept in local server memory.
    > [!IMPORTANT]
    > **Serverless Limitation Warning**: In-memory rate limiting is instance-local. It is NOT a globally consistent distributed rate limiter. Multi-instance Vercel serverless environments or cold starts will reset local limits. For globally consistent rate limiting in highly scaled production instances, integration with a remote distributed registry (such as Redis) is recommended.
*   **Database Indices**: High-performance indexes are configured on unique lookups (`slug`), sort sequences (`publishedAt`, `createdAt`), and common filtering selectors (`status`, `category`, `propertyType`, `projectType`, `location`).
*   **CORS Configuration**: If the frontend and backend run on the same domain context, wildcard CORS headers are bypassed. Authenticated API endpoints never output `Access-Control-Allow-Origin: *`.

---

## 🧪 Integrated Quality Assurance

Verify TypeScript compilation, ESLint rules, and E2E flow tests prior to committing production changes:

```bash
# Run ESLint validation
npm run lint

# Run full API E2E integrated flows
npx tsx scripts/test-flows.ts

# Compile production bundle
npm run build
```

---

## 📥 Postman Collection

Define the following environment variables in your Postman collection:
*   `baseUrl`: `http://localhost:3000`
*   `adminEmail`: `admin@example.com`
*   `adminPassword`: `correct-password`
*   `blogId` (set dynamically from POST response)
*   `blogSlug` (set dynamically from POST response)
*   `caseStudyId` (set dynamically from POST response)
*   `caseStudySlug` (set dynamically from POST response)

### Directory Structure
```
01 Health
  └ GET {{baseUrl}}/api/health
02 Authentication
  ├ POST {{baseUrl}}/api/auth/login
  ├ GET  {{baseUrl}}/api/auth/session
  └ POST {{baseUrl}}/api/auth/logout
03 Enquiries
  ├ POST   {{baseUrl}}/api/enquiries (Public submission)
  ├ GET    {{baseUrl}}/api/enquiries (List)
  ├ GET    {{baseUrl}}/api/enquiries/:id
  ├ PATCH  {{baseUrl}}/api/enquiries/:id
  └ DELETE {{baseUrl}}/api/enquiries/:id
04 Blogs
  ├ POST   {{baseUrl}}/api/blogs (Create)
  ├ GET    {{baseUrl}}/api/blogs (List)
  ├ GET    {{baseUrl}}/api/blogs/:id
  ├ PATCH  {{baseUrl}}/api/blogs/:id
  ├ DELETE {{baseUrl}}/api/blogs/:id
  └ GET    {{baseUrl}}/api/blogs/slug/:slug (Public details)
05 Case Studies
  ├ POST   {{baseUrl}}/api/case-studies (Create)
  ├ GET    {{baseUrl}}/api/case-studies (List)
  ├ GET    {{baseUrl}}/api/case-studies/:id
  ├ PATCH  {{baseUrl}}/api/case-studies/:id
  ├ DELETE {{baseUrl}}/api/case-studies/:id
  └ GET    {{baseUrl}}/api/case-studies/slug/:slug (Public details)
```
