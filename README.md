# Simple Service with SSO - Complete Setup

A full-stack SaaS application with React TypeScript frontend, Python FastAPI backend, and comprehensive SSO integration using Keycloak (customer IdP simulation) and Ory Kratos.

## Architecture

- **Frontend**: React with TypeScript and Vite
- **Backend**: Python FastAPI
- **Customer IdP (Mock)**: Keycloak
- **SSO/Identity Management**: Ory Kratos
- **API Gateway**: Ory Oathkeeper
- **Database**: PostgreSQL
- **Email Testing**: MailSlurper

## Features

- **Multi-tenant SSO**: Customers can use their own identity providers
- **Mock Customer IdP**: Keycloak simulates customer's identity provider
- **Session Management**: Ory Kratos handles user sessions and authentication
- **API Protection**: Oathkeeper proxies and protects API endpoints
- **CRUD Operations**: Full item management with user context
- **Email Integration**: Password recovery and verification emails

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.10+ (for local development)

### Option 1: Full Docker Setup (Recommended)

1. **Start Authentication Services**:
   ```bash
   docker-compose -f docker-compose.auth.yml up -d
   ```

2. **Wait for services to be ready** (about 30 seconds), then start the application:
   ```bash
   docker-compose up --build
   ```

3. **Access the services**:
   - **Application**: http://localhost:5173
   - **API (via Oathkeeper)**: http://localhost:4455
   - **Kratos Public API**: http://localhost:4433
   - **Kratos Admin API**: http://localhost:4434
   - **Customer Keycloak**: http://localhost:8080
   - **MailSlurper (Email)**: http://localhost:4436

### Option 2: Development Setup

1. Start auth services:
   ```bash
   docker-compose -f docker-compose.auth.yml up -d
   ```

2. Start backend locally:
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

3. Start frontend locally:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Authentication Flow

### Customer SSO Flow
1. User visits application
2. Clicks "Login with Customer SSO"
3. Redirected to Ory Kratos
4. Kratos redirects to customer's Keycloak
5. User authenticates with customer credentials
6. Keycloak returns to Kratos with user info
7. Kratos creates session and redirects to application
8. User is logged in with customer identity

### Test Credentials

**Customer Keycloak Users**:
- `customer.user1` / `password`
- `customer.admin` / `admin123`
- `customer.manager` / `manager123`

**Keycloak Admin**:
- Username: `admin`
- Password: `admin`

## API Endpoints

All API endpoints are protected by Oathkeeper and require authentication:

- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get specific item
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item
- `GET /api/user` - Get current user info

## Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React application |
| API Gateway | http://localhost:4455 | Oathkeeper proxy |
| Backend Direct | http://localhost:8000 | FastAPI (development) |
| Kratos Public | http://localhost:4433 | Authentication API |
| Kratos Admin | http://localhost:4434 | Admin API |
| Customer IdP | http://localhost:8080 | Keycloak |
| MailSlurper | http://localhost:4436 | Email testing |
| PostgreSQL | localhost:5432 | Database |

## Project Structure

```
simple_service/
├── auth/                           # Authentication configuration
│   ├── keycloak/
│   │   └── realm-export.json      # Customer IdP realm
│   ├── kratos/
│   │   ├── kratos.yml              # Kratos configuration
│   │   ├── identity.schema.json    # User schema
│   │   └── oidc.customer.jsonnet   # OIDC mapping
│   ├── oathkeeper/
│   │   ├── config.yaml             # Oathkeeper config
│   │   └── access-rules.yml        # API access rules
│   └── init-db.sql                 # Database initialization
├── frontend/                       # React TypeScript application
├── backend/                        # FastAPI application
├── docker-compose.yml              # Main application
├── docker-compose.auth.yml         # Authentication services
└── README.md
```

## Troubleshooting

1. **Services not starting**: Ensure all ports are available
2. **Authentication not working**: Check Kratos and Keycloak logs
3. **CORS issues**: Verify allowed origins in configurations
4. **Database connection**: Ensure PostgreSQL is running and accessible
