🍽️ Restaurant Inventory Management System 🍽️
-------------------------------------------
Overview

This project is a full-stack-inspired inventory management application built with React and Redux Toolkit. It is designed to simulate real-world restaurant inventory workflows, allowing users to manage food items, categories, and stock levels through a dynamic dashboard interface.
-------------------------------------------
Problem Statement
Working in the restaurant industry for over 10 years, i've noticed inventory has always been tracked manually.This leads to inefficiencies, inaccurate stock tracking, and operational delays.

Despite modern technology, many restaurants still track inventory using pen and paper
After seeing how difficult and time consuming that can be, I decided to build this project to deliver a modern, efficient inventory management solution that streamlines operations

-------------------------------------------
Features

Inventory Dashboard for product overview
Add new food items via modal interface
Edit and delete existing items
Categorization system for inventory organization
Dynamic food grid/list rendering
Item detail structure (in progress)
Responsive UI design
Mock backend integration using JSON Server

-------------------------------------------
Tech Stack

FontEnd:
  React 18
  Vite
  Redux Toolkit
  React Router DOM
  Reactstrap
  JavaScript (ES6+)

State Management:
  Redux Toolkit (createSlice)
  Async Thunks (createAsyncThunk)
  Redux Logger (development debugging) 

Backend (Mock / Development):
  JSON Server
  Express (experimental usage)
  REST-style API simulation

Planned Backend:
  Python (Flask)
  PostgreSQL
  REST API architecture

-------------------------------------------
Architecture
The application follows a modular Redux architecture:
  features/ → Redux slices and async logic
  food/ → Reusable UI components
  pages/ → Route-level views
  app/store.js → Central Redux store configuration

This structure was chosen to simulate scalable frontend architecture used in production applications.
-------------------------------------------
Key learnings

One of the most challenging aspects of this project was managing state consistency across multiple UI states, particularly when implementing edit and update workflows.

A key breakthrough was understanding how React state and Redux state interact, especially when comparing previous state vs updated state during CRUD operations.

Additionally, implementing dual UI states (view vs edit mode) improved understanding of conditional rendering and component lifecycle behavior.

-------------------------------------------
PROJECT STATUS

Frontend: ~70% complete
Backend: Planned (Flask + PostgreSQL integration)
UI Polish: In progress
-------------------------------------------
Author:
  Ulises Addison Tamayo

🚧 Under construction 🚧
Please be patient with me, currently I am the only developer working on this project, I'm currently transitioning from restaurant operations into full stack software development. 

 Currently looking for a software development role, 
 if interested, message me on my LinkedIn: Ulisws Tamayo 
 Link: https://www.linkedin.com/in/ulises-tamayo-796077145/

