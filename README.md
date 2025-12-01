# Vehicle Monitoring Dashboard

A real-time vehicle safety monitoring system with sensor data ingestion, alerts, and analytics.

## Features

✅ **Real-time Telemetry** - Live sensor data streaming via WebSocket  
✅ **6 Alert Types** - Over Speed, Sudden Acceleration, Sudden Braking, Tilt Alert, Sharp Turn, Crash Detection  
✅ **Live Dashboard** - Mission Control interface with real-time charts and metrics  
✅ **Alert Management** - Complete alert history with filtering by severity  
✅ **System Logs** - Raw telemetry data logging for auditing  
✅ **Analytics** - Trend analysis and historical data visualization  
✅ **Settings** - Configurable alert thresholds  

---

## Publish Your App

Your dashboard is ready to go live! Click the **Publish** button in the Replit menu to get a public URL anyone can access.

### Deployment Options:
- **Autoscale Deployment** (Recommended) - Auto-scales based on traffic
- **Static Deployment** - For static sites
- **Reserved VM** - Always-on deployment with guaranteed resources

Once published, you'll get a `.replit.app` URL to share!

---

## API Documentation

### Telemetry Endpoint
```
POST /api/telemetry
Content-Type: application/json
```

**Request Body:**
```json
{
  "speed": 75.5,
  "acceleration": 2.3,
  "braking": 1.2,
  "tilt": 5.0,
  "rotationRate": 12.5,
  "isCrash": false
}
```

**Response:**
```json
{
  "success": true,
  "reading": { ... },
  "alerts": [
    {
      "id": 123,
      "type": "Over Speed",
      "severity": "High",
      "value": 75.5,
      "unit": "km/h",
      "message": "Speed exceeded 120 km/h",
      "timestamp": "2025-11-30T..."
    }
  ]
}
```

### Query Endpoints
- `GET /api/sensor-readings?limit=50` - Get recent sensor readings
- `GET /api/sensor-readings/latest` - Get latest reading
- `GET /api/alerts?limit=50` - Get recent alerts

### WebSocket
- `ws://your-app-url/ws` - Real-time updates

---

## Simulator

Test the dashboard with generated sensor data:

```bash
npx tsx scripts/simulate.ts
```

The simulator sends data every second and randomly generates all 6 alert types.

---

## Alert Thresholds

Default thresholds (configurable in Settings):
- **Max Speed**: 120 km/h
- **Acceleration**: 4 m/s²
- **Braking**: 4 m/s²
- **Tilt Angle**: 45°
- **Sharp Turn**: 35 °/s

---

## Integration Examples

### Arduino/ESP32
See **Device Guide** page in the dashboard for complete Arduino code with WiFi integration.

### Python (Raspberry Pi)
See **Device Guide** page in the dashboard for Python example.

### cURL Test
```bash
curl -X POST https://your-app.replit.dev/api/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "speed": 85,
    "acceleration": 2,
    "braking": 1,
    "tilt": 5,
    "rotationRate": 10,
    "isCrash": false
  }'
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Recharts, Wouter
- **Backend**: Express.js, PostgreSQL, Drizzle ORM, WebSocket
- **Deployment**: Replit Publishing
- **Design System**: Custom glassmorphism theme with Mission Control aesthetic

---

## Project Structure

```
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Dashboard.tsx
│       │   ├── Alerts.tsx
│       │   ├── Analytics.tsx
│       │   ├── Settings.tsx
│       │   ├── Logs.tsx
│       │   └── DeviceGuide.tsx
│       ├── components/
│       │   ├── layout/
│       │   │   └── DashboardLayout.tsx
│       │   └── dashboard/
│       │       ├── StatCard.tsx
│       │       ├── AlertFeed.tsx
│       │       └── LiveChart.tsx
│       └── lib/
│           └── vehicleService.ts
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── db.ts
├── shared/
│   └── schema.ts
└── scripts/
    └── simulate.ts
```

---

## Getting Started

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Access the dashboard:**
   Open http://localhost:5000

3. **Run the simulator:**
   ```bash
   npx tsx scripts/simulate.ts
   ```

4. **Deploy to production:**
   Click "Publish" in Replit to get your public URL

---

## Next Steps

After publishing:
- Share your dashboard URL with team members
- Connect your actual hardware (Arduino/ESP32/Raspberry Pi)
- Configure alert thresholds for your vehicle
- Monitor real-time data and alerts
