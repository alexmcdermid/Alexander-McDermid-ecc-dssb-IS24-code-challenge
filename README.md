# IS-24 Full Stack Developer Position - Code Challenge

This repository contains a web application that tracks and manages Web Applications developed by the Province of BC.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Contact](#contact)

## Features
### Core Features
- **View All Products**: Any user can view a list of all products within ECC along with relevant details such as Product Number, Product Name, Scrum Master, Product Owner, Developer Names, Start Date, Methodology, and Location (GitHub repository link).
- **Add New Product**: Lisa can add a new product to the list. They must fill in all necessary information including Product Name, Scrum Master, Product Owner, Developer Names, Start Date, and Methodology.
- **Edit Existing Product**: Alan can edit existing product details. Fields available for editing include Product Name, Scrum Master, Product Owner, Developer Names, Methodology, and Location (GitHub repository link).

### Bonus Features
- **Search by Scrum Master**: Users can search for products by the name of the Scrum Master. The list will update to only show products where the searched Scrum Master is involved.
- **Search by Developer**: Users can search for products by the name of a Developer. The list will update to only show products where the searched Developer is involved.

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

3. Run Docker Compose.

    ```bash
    docker-compose up
    ```

This will start up all the necessary services as defined in the `docker-compose.yml` file.

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

If you're running the frontend without Docker, you will npm. Run the following commands:

```bash
cd react_frontend
npm install
npm start