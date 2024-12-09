# **E-commerce Application**

An E-commerce platform built with **React** (frontend) and **Node.js** (backend), featuring an intuitive user interface and a powerful admin dashboard. The application supports user authentication, product management, cart functionality, and order placement. The backend uses **Sequelize ORM** with a **MySQL database**.

---

## **Features**

### User Functionality:
- **User Authentication**: Secure login and registration system.
- **Product Browsing**: View a catalog of products with details.
- **Cart Management**: Add, update, or remove items in the cart.
- **Order Placement**: Place orders and track status (Pending, Paid, Delivered).

### Admin Functionality:
- **Manage Products**: Add, update, and delete products.
- **Manage Orders**: View and update order statuses.
- **Manage Customers**: View and manage customer accounts.

---

## **Project Structure**

### **Backend**
- **`models/`**: Sequelize models for database schema.
- **`routes/`**: API routes for handling user and admin functionalities.
- **`db.js`**: Database connection setup.
- **`.env`**: Configuration for environment variables.
- **`cartsy_db.sql`**: Database schema file for initializing MySQL.

### **Frontend**
- **`src/components/`**: Reusable UI components.
- **`src/context/`**: Context API for state management.
- **`src/Styles/`**: Styling files for the application.
- **`src/api.js`**: API integration for backend communication.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/Cartsy-react-Project.git
cd Cartsy-react-Project

2. Install Dependencies

- Backend: bash cd backend
   npm install

- Frontend:bash cd frontend
   npm install

also install SQL and NODE

3 configure the database
set up the XAMp for sql and then load your database in PHPmyadmin 


4. Run the Application
Backend:  Node index.js
Frontend: npm start

The application will run at:
Frontend: http://localhost:3000
Backend: http://localhost:5000
