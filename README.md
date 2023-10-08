# IS-24 Full Stack Developer Position - Code Challenge

This repository contains a web application that tracks and manages Web Applications developed by the Province of BC.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Contact](#contact)

## Features

- **User Stories**: User stories.
- **Search Feature**: Search for product resource names.

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
    cd your-repo
    ```

2. Run Docker Compose.

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