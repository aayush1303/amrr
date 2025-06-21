# AMRR Internship Assignment

This is a full-stack web application developed as part of the AMRR TechSols Pvt Ltd internship assignment. The application allows users to add items and view them, with features like authentication, image uploads, and email enquiries.

## Features

### Add Items Page
- Form to add:
  - Item name
  - Item type (e.g., Shirt, Pant, Shoes, etc.)
  - Item description
  - Cover image
  - Additional images
- Form validations
- Displays success toast notification on submission

### View Items Page
- Displays all added items (name + cover image)
- Clicking an item opens a modal with:
  - Item details
  - Image carousel (cover + additional images)
  - Enquiry form to send an email to admin

### Bonus Features
- JWT-based authentication
- MongoDB database integration for persisting items
- Cloudinary image uploads (cover and additional images)
- Nodemailer integration to send enquiry emails
- React Toastify for real-time notifications

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- Swiper.js (for image carousel)
- React Toastify
- Headless UI (for modal)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (with multer-storage-cloudinary)
- Cloudinary
- JWT (jsonwebtoken)
- Nodemailer
- dotenv

## Live Demo

- Frontend: [https://amrr-frontend.vercel.app/](https://amrr-frontend.vercel.app/)
- Backend: [https://amrr-backend.vercel.app/](https://amrr-backend.vercel.app/)

## GitHub Repository

[https://github.com/aayush1303/amrr](https://github.com/aayush1303/amrr)

## Setup Instructions

### Prerequisites

- Node.js (v18 or above recommended)
- MongoDB account (use MongoDB Atlas or local instance)
- Cloudinary account
- Gmail account (for email feature) with app password enabled

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/aayush1303/amrr.git
   cd amrr/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in backend folder with the following:
    ```bash
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ADMIN_EMAIL=receiver_email@example.com
    ```
4. Run the server:
    The server should run on http://localhost:4000
    ```bash
    npx run server.js
    ```

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    Copy code
    cd ../frontend
    Install dependencies:
    ```

2. Install Dependencies:
    ```bash
    npm install
    ```

3. Start the frontend:
    It will be available at http://localhost:5173.
    ```bash
    npm run dev
    ```
