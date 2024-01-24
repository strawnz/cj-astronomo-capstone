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

- As a user, I want to be able to map my route from any given location to the event venue based on my desired arrival time 
- As a user, I want the flexibility to choose my preferred mode(s) of transportation to the venue, whether it's driving, public transit, walking or biking
- As a user, I want to be able to consider parking options if I choose to drive within a 1.6km or 1-mile radius of the venue
- As a user, I want to be able to select a parking lot from the options if I choose to drive and add it to the itinerary
- As a user, I want to be able to search for restaurant options if I want to eat before the event within a 1.6km or 1-mile radius of the venue
- As a user, I want to be able to select a restaurant from the options if I want to eat before the event and add it to the itinerary
- As a user, I want to be able to dynamically calculate the total distance and time required for the entire journey, factoring in all selected pre-event locations
- As a user, I want to be able to receive a detailed itinerary that includes transportation details, parking information (if needed), selected restaurant, and estimated arrival times at each location **

## Implementation

### Tech Stack

- React
- Express (TBD)
- Client libraries:
    - react
    - react-router-dom
    - axios
    - sass
- Server libraries (TBD):
    - express
    - nodemon
    - cors
    - dotenv

### APIs

- This project will use the Google Maps Platform API

### Sitemap

- Home page
- Build itinerary form
- Parking options
- Restaurant options 
- Completed itinerary

### Mockups 

#### Home Page
![handdrawn mockup of homepage](/assets/HomePage.jpg)

#### Build Itinerary Form Page
![handdrawn mockup of build itinerary form page](/assets/BuildItineraryForm.jpg)

#### Parking Options Page
![handdrawn mockup of parking options page](/assets/ParkingOptions.jpg)

#### Restaurant Options Page
![handdrawn mockup of restaurant options page](/assets/RestaurantOptions.jpg)

#### Completed Itinerary Page
![handdrawn mockup of completed itinerary page](/assets/CompletedItinerary.jpg)

### Data

I'm not sure at this time if I'll use a database for the first version of this project.
I have an idea that I'm going to list in the nice-to-haves. Open to discussing further.

### Endpoints

Currently N/A for the first version of this project

### Auth

Currently N/A for the first version of this project

## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Test Google Maps API(s)
    - read documentation and test APIs in Postman

- Set up global styles, mixins, variables, and typography

- Feature: Home Page

- Feature: Build Itinerary Form Page
    - Add form input
    - Create optional route to Parking Options page
    - Create optional route to Restaurant Options page

- Feature: Parking Options Page
    - Add form selection
    - Create optional route to Restaurant Options page

- Feature: Restaurant Options Page
    - Add form selection

- Feature: Completed Itinerary Page
    - Output results from user selection

- Bug fixes

- In-Class Presentations

- Final tweaks

- DEMO DAY

## Nice-to-haves

- Create animated Loading Page before navigating to the Completed Itinerary Page
- Sync itinerary to a user's calendar 
- Ability to share itinerary with other people's calendars or via a link
- Ability to save restaurant and parking lot options for future reference
- Integrate a weather app widget