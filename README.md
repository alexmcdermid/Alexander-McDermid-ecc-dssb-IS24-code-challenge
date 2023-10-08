# IS-24 Full Stack Developer Position - Code Challenge

This repository contains a web application that tracks and manages mock Web Applications developed by the Province of BC.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

## Features

### API Component
- **Health Endpoint**: Includes a health endpoint at `http://localhost:3000/api/health` that returns an HTTP 200 response, indicating the API component is healthy.
- **CRUD Operations**: Supports all basic CRUD operations (`GET`, `POST`, `PUT`, `DELETE`) with appropriate HTTP status codes. For example, retrieving a specific product using `GET http://localhost:3000/api/product/:productId`.
- **Sample Data**: The API is pre-populated with up to 40 sample products.
### Frontend Features (User Stories)
- **View All Products**: Any user can view a list of all products within ECC along with relevant details such as Product Number, Product Name, Scrum Master, Product Owner, Developer Names, Start Date, Methodology, and Location (GitHub repository link).
- **Switch Between Personas**: Switch between two distinct personas, Lisa and Alan. Different features are available to each user.
- **Add New Product**: Lisa can add a new product to the list. They must fill in all necessary information including Product Name, Scrum Master, Product Owner, Developer Names, Start Date, and Methodology.
- **Edit Existing Product**: Alan can edit existing product details. Fields available for editing include Product Name, Scrum Master, Product Owner, Developer Names, Methodology, and Location (GitHub repository link).

### Bonus Features
- **Search by Scrum Master**: Lisa can search for products by the name of the Scrum Master. The list will update to only show products where the searched Scrum Master is involved.
- **Search by Developer**: Alan can search for products by the name of a Developer. The list will update to only show products where the searched Developer is involved.
- **Toggle Product ID Order**: A toggle on the Product ID table header to order by Ascending or Descending.
- **Swagger Documentation**: All API endpoints are documented using Swagger and can be accessed locally at `http://localhost:3000/api/api-docs`.

### Additional Information
- **Automatic Product Number Generation**: When adding a new product, the Product Number is automatically generated and will not collide with existing Product Numbers.
- **Data Persistence**: Any added or edited data persists even after a page refresh.

## Technologies

- Backend: Rails (Ruby)
- Frontend: React (Leveraging react-bootstrap)

## Prerequisites

- Docker
- Ruby, Rails, npm (optional, if you are running outside Docker)

## Getting Started

### Using Docker Compose

To run the solution using Docker Compose, you'll find a `docker-compose.yml` file at the top-level directory of this repository. You need to:

1. Clone this repository.

    ```bash
    git clone https://github.com/alexmcdermid/Alexander-McDermid-ecc-dssb-IS24-code-challenge.git
    ```

2. Navigate into the cloned repository.

    ```bash
    cd Alexander-McDermid-ecc-dssb-IS24-code-challenge
    ```

3. Run Docker Compose. This will start up all the necessary services as defined in the `docker-compose.yml` file.

    ```bash
    docker-compose up
    ```

4. Navigate to `http://localhost:3001/` in your browser of choice.

    ```bash
    http://localhost:3001/
    ```

### Without Docker (Optional)

#### For Backend (Rails)

If you want to run the Rails backend without Docker, you'll need Ruby and Rails installed on your machine. Follow these steps:

1. Navigate to the backend directory.

    ```bash
    cd rails_api
    ```

2. Install dependencies.

    ```bash
    bundle install
    ```

3. Start the Rails server.

    ```bash
    rails s
    ```

#### For Frontend

If you're running the frontend without Docker, you will need npm. Run the following commands:

```bash
cd react_frontend
npm install
npm start
```
