# React CRUD Application

## Setup and Start

Clone this repo and run `npm install`.

Start the node server for the ReactJS application with `npm start`. The server starts on localhost port 3000

Start the development API server with `npm run start:server`. The server starts on localhost port 3001

## Overview

1. Login and Register pages and functionality (email, password, first name, last name)
2. Logout
3. Edit profile page (where user can edit all of the above)
4. Full CRUD on the entity `artworks`:
   - The entity has 11 properties/fields, of different types (text, numbers, select from a list, checkbox)
   - Only viewing the entity can be public. Editing, adding and deleting an entity is protected by the auth functionality
5. Image-Rasterizer
6. Responsive web design (2 breakpoints: mobile and desktop)

### Home page

In this page are displayed the following:

1. Navigation meniu
2. A drop-down menu with social media links
3. Footer with two modals that display the Terms & Condition and the Privacy Policy of the web application

### Discover artowrks

Page which lists all the artworks

In this page:

1. Is displayed a grid of artworks (in cards) with poster image and underneath that the title
2. Each card in the grid is a link to the ArtworkDetails.js ( page which lists all the details of a single artwork)
3. Pagination (each page has 4 items)

### Play with canvas

Page which displays a image rasterization: Canvas.js

### Login and Register pages and functionality

In these pages:

1. Are displayed forms for user's login and registration
2. All forms are validated, error messages are displayed to the user, same as success messages where appropriate
3. When a user's logged in, a drop-down menu will be displayed with the following options:

- Manage database, if the user's also an admin, where he can edit, add and delete items in DB
- Manage profile with profile page and edit functionality associated
- Logout
