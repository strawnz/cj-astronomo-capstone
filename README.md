# Project Title
Pre-Event Planner (PEP)

## Overview
Pre-Event Planner (PEP) is an itinerary builder that transforms planning chaos into coordinated elegance, ensuring patrons reach their live events seamlessly. 

### Problem

Planning the journey to a live event such as a concert, theatre show or sports game, can become a time-consuming endeavour in trying to answer questions like: What's the fastest way to get there? What are my transportation options? Is there parking nearby? Where should I eat? This can become even more challenging when a patron is travelling to an unfamiliar area and has to do ample research beforehand.

### User Profile

- Live event enthusiasts:
    - seeking a streamlined solution for efficient pre-event planning
    - who prefer a centralized platform for mapping out their event-related logistics
    - desiring a hassle-free experience by consolidating event-related information

### Features

- As a user, I want to be able to map my route from a selected parking lot or selected restaurant to the event venue based on my desired arrival time 
- As a user, I want to be able to consider parking options if I choose to drive within a 1.6km radius (equivalent to 1-mile) of the venue
- As a user, I want to be able to select a parking lot from the options if I choose to drive and add it to the itinerary
- As a user, I want to be able to search for restaurant options if I want to eat before the event within a 1.6km radius (equivalent to 1-mile) of the venue
- As a user, I want to be able to select a restaurant from the options if I want to eat before the event and add it to the itinerary
- As a user, I want to be able to dynamically calculate the total time required for the entire journey, factoring in all selected pre-event locations
- As a user, I want to be able to receive a detailed itinerary that includes parking information (if desired), selected restaurant, and estimated arrival times at each location

## Implementation

### Installation
Download the client repository from GitHub:
https://github.com/strawnz/cj-astronomo-capstone

Download the server repository from GitHub:
https://github.com/strawnz/cj-astronomo-capstone-api

Once both repositories are downloaded locally, npm install the libraries below.

### Tech Stack

- React
- Express
- Client libraries:
    - react
    - react-router-dom
    - axios
    - sass
    - react-datepicker
    - react-time-picker
- Server libraries:
    - express
    - nodemon
    - cors
    - dotenv
    - mysql2
    - knex

### APIs

- This project uses a custom API built in Express

### Sitemap

- Home page
- Build itinerary form
- Completed itinerary

### Mockups 

#### Home Page
![screenshot of homepage](/src/assets/readme/HomePage.JPG)

#### Build Itinerary Form Page
![screenshot of build itinerary form page](/src/assets/readme/BuildItineraryForm.JPG)

#### Parking Options Component (rendered on form page if 'Yes' is selected)
![screenshot of parking options component](/src/assets/readme/ParkingOptions.JPG)

#### Restaurant Options Component (rendered on form page if 'Yes' and a price level is selected)
![screenshot of restaurant options component](/src/assets/readme/RestaurantOptions.JPG)

#### Completed Itinerary Page
![screenshot of completed itinerary page](/src/assets/readme/CompletedItineraryPage.JPG)

### Data

This project uses a custom database with 6 tables and multiple endpoints.

Tables:
    
    - Venues: lists 10 of the most popular live event venues in Toronto

    - Restaurants: includes restaurant details such as cuisine type, price level, website

    - Restaurants/Venues: include distance and time information between each restaurant and a specific venue

    - Parking: includes parking lot details such as address, distance and time information related to a specific venue

    - Parking/Restaurants: includes distance and time information between each parking lot and a specific restaurant

    - Forms: stores choices that the user selects when a form is submitted

### Auth

Currently N/A for the first version of this project

### Usage

Initiate npm start on the server before initiating npm start on the client.

The client is best viewed on a mobile screen size of 320px x 568px or a desktop screen size of 1920px x 1080px.

Please note that the database is still a work in progress. To successfully use the current version of the application, follow the user map below.

#### Usermap
- From the Home page, click the START button

- On the Build Itinerary Form page:
    - Select BMO Field as a venue
    - Choose any current or future date 
    - Input any preferred time (e.g. 7:30 PM)
    - Choose 'Yes' that you would like to park near the venue
    - Choose the first parking option (defaulted in a blue card)
    - Choose 'Yes' that you would like to eat near the venue
    - Choose any price range 
    - Choose any restaurant
    - Click the Submit button

- On the Completed Itinerary page:
    - Review that the itinerary has incorporated your choices
    - You will also have the option to change your answers in the form (currently needs further debugging)
    - You also have the option to return to the Home page

## Lessons Learned

I have learned many things while trying to execute the first sprint in this ambitious project within a limited amount of time. 
Some of the key takeaways include:

    - How to pivot and reconsider the scope of this project once I realized that my initial hopes of using the Google Maps API was going to require more time for research and testing before implementation

    - Have a robust map of how to structure data tables, especially when they include many-to-many relationships

    - Ensure that any imported third-party libraries has comprehensive documentation to ease any potential troubleshooting

    - Ensure that if using date or time values, that they can adhere to CRUD operations between the client and server 

## Next Steps

- Continue fleshing out the database (goal to complete by Demo Day)
- Incorporate Google Maps API so a user can select any venue of their choosing
- Sync itinerary to a user's calendar 
- Ability to share the itinerary with other people's calendars or via a link
- Ability to save restaurant and parking lot options for future reference