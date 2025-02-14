# Job Board App

## Overview
The **Job Board App** is a full-stack job listing platform built using **Next.js (App Router), Redux Toolkit, Tailwind CSS, and TypeScript**. It allows users to browse jobs, search by title, filter by category, and apply directly.

## Features
- **Job Listing**: Displays all available job postings from an API.
- **Search Functionality**: Users can search for jobs based on titles.
- **Category-Based Filtering**: Filter jobs by different categories.
- **Job Details Page**: View detailed information about a job.
- **Apply Now**: Users can apply for a job through a dedicated page.
- **Fully Responsive**: Works seamlessly on desktop and mobile devices.
- **Server-Side Rendering (SSR)**: Improves SEO and performance.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: API integration (Free API for job listings)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**

### Clone the Repository
```sh
git clone https://github.com/Smit4545/job_board_app.git
cd job_board_app
```

### Install Dependencies
Using npm:
```sh
npm install
```
Or using yarn:
```sh
yarn install
```

### Environment Variables
Create a **.env.local** file in the project root and add any required API keys:
```sh

URL=https://your-api-url.com
```

### Running the Application

#### Development Mode
To start the app in development mode:
```sh
npm run dev
```
Or:
```sh
yarn dev

The app will be available at **http://localhost:3000**.

#### Production Build
To build and start the production version:
```sh
npm run build
npm start
```
Or using yarn:
```sh
yarn build
yarn start

## Functionality Details

### 1. Job Listing Page (`/`)
- Fetches jobs from an API.
- Displays job details (title, company, category, location).
- Allows search and filtering.

### 2. Search & Filter
- **Search Bar**: Users can search jobs by title.
- **Category Filter**: Users can filter jobs based on category.

### 3. Job Details Page (`/job/[id]`)
- Displays full details of a job posting.
- Shows company name, job title, location, and description.
- Includes an **Apply Now** button leading to an application page.

### 4. Apply Page (`/apply/[id]`)
- Provides a form for users to apply for the job.
- Submits application data to localState.

### 5. generateResume Page (`/generateResume`)
- Provides a form for users where user can enter required details and can generate resume.
- And can also download the resume.

### 6. Analysis Page (`/analysis`)
- User can the see the Analysis with the help of a bar chart on the job count based based on the filters applied.
