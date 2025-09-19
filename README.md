📊 Lead Management System (CRM)

A production-ready **Lead Management System** (CRM-style project) built using **React + Vite (frontend)**, **Spring Boot (backend)**, and **MySQL (database)**.  
The system provides a complete solution to manage leads with a modern UI, analytics dashboard, and secure REST APIs.

🚀 Tech Stack
Frontend:React + Vite, TailwindCSS, Recharts, Axios  
Backend:Spring Boot, Spring Security (JWT), Spring Data JPA, Hibernate Validator  
Database:MySQL (hosted on [Aiven](https://aiven.io))  
Deployment:Frontend on [Vercel](https://vercel.com), Backend on [Render](https://render.com), Database on Aiven MySQL  

✨ Features
📊 Dashboard – Visualize lead metrics and trends  
➕ Add Lead – Create new leads with validation  
📋 All Leads – List, search, filter, and paginate leads  
📝 Update Lead – Edit existing lead information  
❌ Delete Lead – Remove leads securely  
🔒 Authentication – JWT-based security with role-based access (Admin/User)  
📈 Analytics – Interactive charts with insights into lead sources, statuses, and progress  

📂 Project Structure

lead-management-system/
│
├── frontend/        # React + Vite (Vercel deployment)
│   ├── src/
│   └── package.json
│
├── backend/         # Spring Boot (Render deployment)
│   ├── src/main/java/com/dl/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md        # Documentation

🔧 Prerequisites
- Node.js >= 18  
- Java 17+  
- Maven  
- MySQL (local or hosted on Aiven)  

🖥️ Backend Setup (Spring Boot)
1. Clone the repo and navigate to `backend/`.  
2. Update database credentials in `src/main/resources/application.properties`:

properties
spring.datasource.url=jdbc:mysql://<AIVEN_HOST>:<PORT>/<DB_NAME>
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3. Run the backend:

bash
mvn spring-boot:run

API will be available at: `http://localhost:8080/api`

🌐 Frontend Setup (React + Vite)

1. Navigate to `frontend/`.
2. Install dependencies:

bash
npm install

3. Update API base URL in `src/api.js`:

javascript
const API_BASE_URL = "http://localhost:8080/api";
export default API_BASE_URL;

4. Run the frontend:

bash
npm run dev

Frontend will be available at: `http://localhost:5173`

🔗 Live Deployment

Frontend (Vercel):[Live Demo](advance-java-project.vercel.app)
Backend (Render):[API Link](https://lead-management-system-latest.onrender.com/api)
Database:MySQL hosted on [Aiven](https://aiven.io)

📊 API Endpoints

| Method | Endpoint          | Description     | Role       |
| ------ | ----------------- | --------------- | ---------- |
| POST   | `/api/leads`      | Create new lead | Admin      |
| GET    | `/api/leads/{id}` | Get lead by ID  | Admin/User |
| PUT    | `/api/leads/{id}` | Update lead     | Admin      |
| DELETE | `/api/leads/{id}` | Delete lead     | Admin      |
| GET    | `/api/leads/all`  | Get all leads   | Admin/User |

📸 Screenshots
Login Page
<img width="1894" height="893" alt="Screenshot 2025-09-19 100115" src="https://github.com/user-attachments/assets/ad4332b4-d322-46ff-874b-f1c4e56a998b" />

DashBoard
<img width="1901" height="906" alt="Screenshot 2025-09-19 100052" src="https://github.com/user-attachments/assets/c825f622-cd14-4e66-ac47-939bdfe9956f" />

AllLeads
<img width="1893" height="886" alt="Screenshot 2025-09-19 100030" src="https://github.com/user-attachments/assets/5b32981a-b6ef-4647-90c0-73ef9124490e" />

Create Lead
<img width="1894" height="903" alt="Screenshot 2025-09-19 100011" src="https://github.com/user-attachments/assets/50c2e15c-97a7-4453-8efe-af045f2ab581" />

Analytics
<img width="1919" height="900" alt="Screenshot 2025-09-19 095939" src="https://github.com/user-attachments/assets/f2109e39-5468-4c00-b2bc-e980636ec33c" />


🙌 Contribution

Contributions, issues, and feature requests are welcome!
Fork the repo and submit a PR for improvements.

📜 License

This project is licensed under the "MIT License" – free to use and modify.

