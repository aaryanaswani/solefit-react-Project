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
- **Manage User Requests**:View and review User Related Queries

---

## **Project Structure**

### **Backend**
- **`models/`**: Sequelize models for database schema.
- **`routes/`**: API routes for handling user and admin functionalities.
- **`db.js`**: Database connection setup.
- **`.env`**: Configuration for environment variables.
- **`solefit_db.sql`**: Database schema file for initializing MySQL.

### **Frontend**
- **`src/components/`**: Reusable UI components.
- **`src/context/`**: Context API for state management.
- **`src/styles/`**: Styling files for the application.
- **`src/api.js`**: API integration for backend communication.

---

## **Setup Instructions**

Follow these steps to set up the project locally:

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/solefit-react-Project.git
cd solefit-react-Project
```

### 2. **Install Dependencies**

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

### 3. **Set Up the Database**

1. Install **XAMPP** (or any MySQL server of your choice).
2. Start Apache and MySQL from the XAMPP Control Panel.
3. Open **phpMyAdmin** in your browser (usually available at `http://localhost/phpmyadmin`).
4. Create a new database named `solefit_db`.
5. Import the `solefit_db.sql` file into the newly created database:
   - Go to the "Import" tab in phpMyAdmin.
   - Select the `solefit_db.sql` file from the `backend` folder.
   - Click "Go" to execute the import.

### 4. **Configure Environment Variables**

Create a `.env` file in the `backend` directory with the following contents:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=solefit_db
DB_PORT=3306
EMAIL=your_email_address.gmail.com
EMAIL_PASSWORD=your_email_app_password
JWT_SECRET=any_secret_key
```
Replace `your_password` and `your_email_password` with your MySQL root password and email password, respectively.

### 5. **Run the Application**

#### Start the Backend Server:
```bash
cd backend
node index.js
```

#### Start the Frontend Development Server:
```bash
cd ../frontend
npm start
```

The application will be available at the following URLs:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)

---

## **Database Tables**

### **1. Admins**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| admin_id     | Primary Key     | Auto Increment       |
| username     | String          | Not Null             |
| email        | String          | Unique, Not Null     |
| password     | String          | Not Null             |

### **2. Users**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| user_id      | Primary Key     | Auto Increment       |
| username     | String          | Not Null             |
| email        | String          | Unique, Not Null     |
| password     | String          | Not Null             |
| created_at   | Date            | Default: Current Date|

### **3. Products**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| product_id   | Primary Key     | Auto Increment       |
| product_name | String          | Not Null             |
| price        | Decimal/Float   | Not Null             |
| stock        | Integer         | Not Null             |
| image        | String          | URL/Path             |
| description  | String          | Optional             |

### **4. Cart**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| cart_id      | Primary Key     | Auto Increment       |
| user_id      | Foreign Key     | References Users     |
| product_id   | Foreign Key     | References Products  |
| quantity     | Integer         | Not Null             |

### **5. Orders**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| order_id     | Primary Key     | Auto Increment       |
| user_id      | Foreign Key     | References Users     |
| total_price  | Decimal/Float   | Not Null             |
| address      | String          | Not Null             |
| payment_method | String        | Not Null             |
| status       | String          | Default: 'Pending'   |
| created_at   | Date            | Default: Current Date|

### **6. Order Items**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| order_item_id| Primary Key     | Auto Increment       |
| order_id     | Foreign Key     | References Orders    |
| product_id   | Foreign Key     | References Products  |
| quantity     | Integer         | Not Null             |
| price        | Decimal/Float   | Not Null             |

### **7. Requests**
| Column       | Type            | Constraints          |
|--------------|-----------------|----------------------|
| request_id   | Primary Key     | Auto Increment       |
| user_id      | Foreign Key     | References Users     |
| name         | String          | Not Null             |
| email        | String          | Not Null             |
| phone        | String          | Optional             |
| message      | Text            | Not Null             |
| created_at   | Date            | Default: Current Date|

---

Enjoy building and customizing your E-commerce application!


## **Screenshots**

**Customer Panel**

<img width="365" alt="Customer-Register" src="https://github.com/user-attachments/assets/f4afd4e2-5b0c-48f5-bd6a-742f07453e1d" />
<img width="960" alt="Customer-Login" src="https://github.com/user-attachments/assets/ea9b8b33-a901-485d-81cf-88ae9b45bc68" />
<img width="949" alt="Home" src="https://github.com/user-attachments/assets/a192a94e-6663-4c2a-9b41-d1cc501d431d" />
<img width="949" alt="Products-Page" src="https://github.com/user-attachments/assets/29efeceb-d60d-4a57-9591-1c2cfc312d5b" />
<img width="960" alt="About-Us" src="https://github.com/user-attachments/assets/b394b3db-a79a-4d9f-bcde-0d5ceca27428" />
<img width="947" alt="Contact-Us " src="https://github.com/user-attachments/assets/4bfd6aa7-d00e-4bc0-b36d-2d542b4e0692" />

**Admin Panel**

<img width="949" alt="Admin-Register" src="https://github.com/user-attachments/assets/08720220-d436-48c2-8734-2f5b644a956b" />
<img width="960" alt="Admin-Login" src="https://github.com/user-attachments/assets/31c89466-c56a-4215-8c29-20cb7ef17a6c" />
<img width="960" alt="Admin-Dashboard" src="https://github.com/user-attachments/assets/d14d4552-a9ce-4c8b-af9b-c8a346315cac" />
<img width="947" alt="Manage-Products" src="https://github.com/user-attachments/assets/f9249870-2141-4659-afbd-0686c6ea4081" />
<img width="948" alt="Manage-Orders" src="https://github.com/user-attachments/assets/c3c66c3c-99fb-437d-ac9e-c35de76230fa" />
<img width="960" alt="mange-customers" src="https://github.com/user-attachments/assets/8eca9bc5-63de-4bf2-ad0e-79caf1de8742" />
<img width="960" alt="Manage-Requests" src="https://github.com/user-attachments/assets/7ec359cd-4d4a-4c79-a738-fec93824b13b" />
