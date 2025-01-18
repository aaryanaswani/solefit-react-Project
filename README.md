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

![Screenshot](C:\Users\aarya\Desktop\images\Home.png)

