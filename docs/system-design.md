# 🚛 Truck Tracking System — System Design

## 1. High-Level Architecture Description

### 📡 Data Flow Overview

```
[Mobile GPS App (Driver)]
    |
    |  Sends GPS every 10 seconds
    v
[Node.js Ingestion API / WebSocket Server]
    |
    |  Validate + Process
    v
[PostgreSQL + PostGIS Database]
    |
    |  Latest locations + History
    v
[WebSocket Server]
    |
    |  Real-time updates
    v
[React Dashboard + Leaflet Map]
    |
    |  OpenStreetMap Tiles
```

### 🧩 Core Components

| Component | Description |
|-----------|-------------|
| **Mobile App** (React Native) | Sends truck GPS coordinates periodically |
| **Backend API** (Node.js + Express) | Handles authentication, booking, payments, and GPS ingestion |
| **WebSocket Server** (Socket.io / ws) | Pushes real-time truck location updates to dashboard clients |
| **Database** (PostgreSQL + PostGIS) | Stores trucks, users, live locations, history, bookings, payments |
| **Frontend Dashboard** (React + Leaflet) | Displays live map, bookings, truck status |
| **Map Provider** (OpenStreetMap) | Free map tiles |

## 2. Database Schema

### users
- `id` (UUID, PK)
- `name`
- `email` (unique)
- `password_hash`
- `role` (admin/dispatcher)
- `created_at`

### trucks
- `id` (UUID, PK)
- `plate_number`
- `driver_name`
- `status`
- `created_at`

### truck_locations (latest)
- `truck_id` (UUID, PK, FK)
- `location` (GEOGRAPHY Point)
- `speed`
- `heading`
- `updated_at`

### truck_location_history
- `id` (BIGSERIAL PK)
- `truck_id` (FK)
- `location` (GEOGRAPHY Point)
- `speed`
- `heading`
- `recorded_at`

### bookings
- `id` (UUID PK)
- `customer_name`
- `pickup_address`
- `dropoff_address`
- `truck_id` (FK)
- `status` (pending, assigned, en_route, completed, cancelled)
- `scheduled_at`
- `created_at`
- `updated_at`

### payments
- `id` (UUID PK)
- `booking_id` (FK)
- `provider` (bkash/nagad)
- `amount`
- `status` (pending, success, failed)
- `provider_payment_id`
- `created_at`
- `updated_at`

## 3. REST API List

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |

### Trucks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trucks` | List trucks |
| POST | `/api/trucks` | Create truck |
| PUT | `/api/trucks/:id` | Update truck |

### GPS Ingestion
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ingest/location` | Receive GPS data |

### Live Locations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/locations` | All latest locations |

### History
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/history/:truck_id?from=&to=` | Location history |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | List bookings |
| PATCH | `/api/bookings/:id/status` | Update booking status |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create` | Create payment |
| GET | `/api/payments/callback` | Payment callback |

## 4. WebSocket Events

### Client → Server
- `subscribe_live_trucks`
- `unsubscribe_live_trucks`

### Server → Client
**`location_update`**
```json
{
  "truck_id": "uuid",
  "lat": 0.0,
  "lng": 0.0,
  "speed": 0.0,
  "heading": 0.0,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 5. Folder Structure

```
truck-tracking-project/
│
├── frontend/                # React Dashboard
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── store/
│   └── package.json
│
├── backend/                 # Node.js API + WebSocket
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── websocket/
│   │   └── config/
│   └── package.json
│
├── mobile/                  # React Native GPS App
│   ├── App.js
│   └── package.json
│
└── docs/
    ├── requirements.md
    ├── system-design.md
    └── tech-stack.md
```

## 6. Scalability Notes

- **WebSocket Server**: Can scale horizontally using Redis Pub/Sub
- **Database**: PostgreSQL uses PostGIS indexing for fast geo queries
- **History Storage**: Location history table can be partitioned by date
- **Message Queue**: Redis/Kafka can be added later for heavy GPS traffic