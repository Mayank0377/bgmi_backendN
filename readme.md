# BGMI BUZZ - Esports Tournament Platform

A full-stack web application designed to manage and display real-time results for Battlegrounds Mobile India (BGMI) esports tournaments. This platform provides a public interface for viewers to track live standings and a secure administrative dashboard for organizers to manage all aspects of a tournament.

---

## Core Features Implemented

-   **Admin Dashboard:** Secure, login-protected panel for tournament management.
-   **Tournament CRUD:** Admins can create, read, update, and delete tournament details.
-   **Team Management:** Admins can create teams and register them for specific tournaments.
-   **Live Match Updates:** Admins can submit match-by-match results (placements and kills).
-   **Automated Standings:** The backend automatically calculates and ranks teams for both individual matches and the overall tournament based on the official BGMI point system.
-   **Stateless JWT Authentication:** The backend API is secured using JSON Web Tokens.

---

## Tech Stack

-   **Frontend:** React.js, Tailwind CSS, Axios
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with Mongoose)
-   **Authentication:** JSON Web Tokens (JWT), bcryptjs

---

## Local Setup and Installation

To run this project locally, you will need to run the backend server and the frontend client in two separate terminals.

### 1. Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the backend root
#    and add your MONGO_URI and JWT_SECRET, refer .env.sample
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

# 4. Start the server (with nodemon for development)
npm run dev

```

---

## Project Roadmap (Future Features)

This project is under active development. Planned features include:
-   [ ] **Real-Time Updates with Socket.IO:** Push live score updates to the frontend without needing a refresh.
-   [ ] **Role-Based Access Control (RBAC):** Allow tournament creators to assign other admins as managers.
-   [ ] **Player Profiles & Stats:** Track and display individual player statistics.
-   [ ] **Public-Facing Team Creation:** Allow users to create and manage their own teams.
-   [ ] **Advanced Data Visualization:** Incorporate libraries like Recharts or D3.js to create graphs for performance analysis.
