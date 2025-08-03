# Pixisphere Backend

A Node.js + Express backend for Pixisphere, leveraging MongoDB for user/inquiry data and PostgreSQL for relational modules. Provides authentication (JWT + OTP), inquiry management, partner portfolios, and admin verification workflows.

---

## Features

* **Authentication**: Signup/Login with email/password, OTP verification, JWT-based sessions
* **User Roles**: `client`, `partner`, `admin`
* **Inquiries**: Clients can create inquiries; auto-assigned to the first available partner
* **Portfolios**: Partners can add portfolio entries
* **Verification**: Partners submit documents; admins can list and update statuses
* **Databases**:

  * MongoDB (Atlas or local) for primary data models
  <!-- * PostgreSQL (managed or local) for relational modules (future: subscriptions, admin) --> Working on this
* **Middleware**:

  * CORS, JSON parsing
  <!-- * Morgan logging -->Working on this
  * JWT protection and role-based authorization
  <!-- * (Planned) Rate limiting  --> working on this
* **Env Config**: Centralized via `.env`
* **Testing**: Jest and Supertest ready (no tests written yet)
* **Documentation**: Swagger/OpenAPI planned
* **Docker**: Dockerization planned

---

## Prerequisites

* Node.js v16+ and npm
* MongoDB instance (Atlas or local)
* PostgreSQL instance (managed like Heroku/ELE or local)

---

## Getting Started

1. **Clone repository**

   ```bash
   git clone https://github.com/your-org/pixisphere-backend.git
   cd pixisphere-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   Copy `.env.example` to `.env` and update values:

   ```dotenv
   MONGO_URI=<your MongoDB connection string>
   POSTGRES_URI=<your PostgreSQL connection string>
   JWT_SECRET=<your JWT secret>
   PORT=5000
   ```

4. **Set up databases**

   * **MongoDB Atlas**: Provision a cluster and whitelist your IP.
   * **PostgreSQL**:

     * Managed (Heroku, ElephantSQL, Supabase, etc.): Provision and grab URI
     * Local:

       ```sql
       CREATE DATABASE pixisphere;
       CREATE USER pixuser WITH ENCRYPTED PASSWORD 'pixpass';
       GRANT ALL PRIVILEGES ON DATABASE pixisphere TO pixuser;
       ```

5. **Run the server**

   ```bash
   npm run dev
   ```

   Server will be available at `http://localhost:5000`.

---

## API Endpoints

| Method | Path                           | Access        | Description                |
| ------ | ------------------------------ | ------------- | -------------------------- |
| POST   | `/api/auth/signup`             | Public        | Register new user + OTP    |
| POST   | `/api/auth/login`              | Public        | Login + JWT                |
| POST   | `/api/inquiry`                 | Client        | Create new inquiry         |
| GET    | `/api/inquiry`                 | Admin/Partner | List all inquiries         |
| POST   | `/api/partner/portfolio`       | Partner       | Add portfolio entry        |
| POST   | `/api/partner/verify`          | Partner       | Submit verification docs   |
| GET    | `/api/admin/verifications`     | Admin         | List all verifications     |
| PATCH  | `/api/admin/verifications/:id` | Admin         | Update verification status |

---

## Roadmap

* **Relational Modules**: Build admin dashboard tables and subscription plan models in PostgreSQL
* **Rate Limiting**: Integrate `express-rate-limit`
* **Swagger Docs**: Add `swagger-ui-express` and annotations
* **Docker**: Create `Dockerfile` & `docker-compose.yml`
* **Testing**: Write unit & integration tests with Jest and Supertest

---

## Contributing

Feel free to open issues or pull requests. Please follow coding standards and include tests for new features.

---

## License

[MIT](LICENSE) Mayank Sagar
