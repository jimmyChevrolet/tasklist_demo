# Todo List Application

A simple and elegant Todo List application built with **Laravel 8** (PHP 8.2) and **Vue 3**. This application allows users to manage their tasks efficiently with features like descriptions and due dates.

## Table of Contents

- [Todo List Application](#todo-list-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
      - [PHP Dependencies](#php-dependencies)
      - [JavaScript Dependencies](#javascript-dependencies)
    - [Environment Setup](#environment-setup)
    - [Database Migration](#database-migration)
    - [Running the Application](#running-the-application)
      - [Compile Assets](#compile-assets)
      - [Start the Development Server](#start-the-development-server)
  - [Usage](#usage)

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Task Description**: Add detailed descriptions to tasks.
- **Due Dates**: Set due dates for tasks and see overdue tasks highlighted.
- **Completion Status**: Mark tasks as completed or incomplete.
- **Responsive UI**: Built with Bootstrap 5 for a clean and responsive design.
- **Single-Page Application**: Utilizes Vue 3 for a seamless user experience.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP**: Version 8.2 or higher
- **Composer**: Dependency management for PHP
- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js
- **MySQL** or **PostgreSQL**: Database management system

## Installation

Follow these steps to set up the application locally.

### Clone the Repository

`git clone https://github.com/jimmyChevrolet/tasklist_demo.git

### Install Dependencies

#### PHP Dependencies

`composer install`

#### JavaScript Dependencies

`npm install`

### Environment Setup

1. **Copy the `.env` file**

    
    `cp .env.example .env`
    
2. **Generate Application Key**

    
    `php artisan key:generate`
    
3. **Configure Environment Variables**
    
    Open the `.env` file and set your database credentials.
	 **For simplicity, you can just use the Sqlite option for file based DB hosting
    
    

### Database Migration

Create the database and run migrations:
        
2. **Run Migrations**
    
    `php artisan migrate`
    

### Running the Application

#### Compile Assets

`npm run dev`

#### Start the Development Server

`php artisan serve`

The application will be accessible at `http://localhost:8000`.

## Usage

1. **Access the Application and register
    
    Open your web browser and navigate to `http://localhost:8000`.
    
	 You'll want to register a user account at this point by going to register at the top right hand corner of the screen.
	 
	 After this point, you'll be logged in and presented with the main task management interface
    
2. **Adding a New Task**
    - Enter the task title in the "Task Title" field (required).
    - Optionally, add a description in the "Task Description" field.
    - Optionally, select a due date using the date picker.
    - Click the **Add Task** button to save the task.
3. **Viewing Tasks**
    - All tasks will be displayed in a list.
    - Tasks with descriptions and due dates will show additional information.
    - Overdue tasks will have the due date highlighted in red.
4. **Marking Tasks as Completed**
    - Click the checkbox next to a task to mark it as completed.
5. **Deleting Tasks**
    - Click the trash icon button next to a task to delete it.
