# wellness-hub-4142-4152

Backend (Express) quickstart:
- Start: npm start or npm run dev in backend
- Docs: Swagger UI available at /docs, OpenAPI JSON at /openapi.json (generated dynamically from JSDoc)
- Health check: GET /
- Wellness:
  - GET /wellness/resources
  - POST /wellness/track
  - GET /wellness/track?limit=20&offset=0

Notes:
- This project uses in-memory storage for demo. Replace services with persistent store when ready.
- Add environment variables in a .env file (PORT, HOST as needed). The server defaults to HOST=0.0.0.0 and PORT=3000 unless overridden by the runner.