# Ghack-Tech Dashboard Design

This project is a Job Sheet Management System built using **Node.js** and **Express.js**. The system allows users to manage job sheets and clients. Users can create, view, update, delete, and generate PDFs for job sheets. Additionally, users can manage client data through various API endpoints.

## Features

- Create, view, edit, and delete job sheets.
- Generate PDF versions of job sheets.
- Manage clients by adding, viewing, updating, and deleting client data.
- RESTful API for clients and job sheets.

## Technologies Used

- **Node.js**
- **Express.js**
- **Handlebars.js** (for templating)
- **Puppeteer** (for generating PDFs)
- **MongoDB** (for database)
- **Mongoose** (for database interaction)
- **Moment.js** (for handling dates)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gaurav-G-Bro/ghack-tech-dashboard-design.git
2. Navigate to the project directory:
    ```bash
    cd ghack-tech-dashboard-design
3. Install the dependencies:
    ```bash
    npm install
4. Set up environment variables by creating a .env file in the root directory. You can copy the structure from .env.example.

5. Run the MongoDB server locally or provide a remote MongoDB URI in the .env file.

6. Start the server:
    ```bash
    npm run start
        or
    npm run dev
## API Endpoints
### Job Sheets
* GET /jobsheet - Retrieve all job sheets
* GET /jobsheet/new - Render form to create a new job sheet
* POST /jobsheet - Create a new job sheet
* GET /jobsheet/:id - View a single job sheet
* GET /jobsheet/:id/edit - Render form to edit a job sheet
* PUT /jobsheet/:id/edit - Update an existing job sheet
* DELETE /jobsheet/:id - Delete a job sheet
* GET /jobsheet/:id/pdf - Generate a PDF of the job sheet
### Clients
* GET /api/clients - Retrieve all clients
* GET /api/clients/:id - Get a single client
* POST /api/clients - Add a new client
* PUT /api/clients/:id - Update a client
* DELETE /api/clients/:id - Delete a client
## License
This project is free to use for everyone.
##### LinkedIn: https://www.linkedin.com/in/gaurav-kumar-a945231b0/
