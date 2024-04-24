
# Party Easy App

## Overview

The app is designed to organize party easily but also include almost everything for holding a party

### Problem

City life is around "BUSY". We're all busy with work, kids and everyday work & life. Sometimes we really want to organize a party to reunion with old friends or team members, even a surprise party for kids or your family, but planning a party is time consuming. Here, our app is to the rescue.

### User Profile

Anyone who wants to organize a party, small or big.

### Features

- Based on the budget to recommend party packages
 -- package details including venue-food-drink-supplies based on user's form  answers
 -- venues holding the numbers of guests as user requested
 -- venues based on location to search
 -- show venue on the map
- User profile
-- User's saved party packages

## Implementation

### Tech Stack
- Frontend
--material UI
--React
--Scss
- Backend
--Typescript
--Express
- Database
-- MySQL
- ORM
-- TypeORM

### APIs

- unsplash api
- google map api

### Sitemap

- app front page
- form page
- list of packages page
- package detail page
- user login/signup page
- user profile page
- user saved packages

### Mockups



### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. (design database)
- venue
-- venue name
--  accommodate number of people
-- price 
--location
- drinks
--category : [alcohol, non alcohol]
--drink name
--price 
- food
-- category: [pizza, chicken, Mexico food , sea food, sushi]
--price for each category
- party supply
--party supply name
--price
- user
-- user name
-- user password
-- email
--saved package id
- package list (generated package list)
-- userId
-- price
--venueId
--drinkId (Id array)
--foodId (Id array)
--supplyId (Id array)
--likes
--saves

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
router.get("/venue/:venueId"  )
router.get("/drink/:drinkId"  )
router.get("/food/:foodId"  )
router.get("/supply/:supplyId"  )
router.post("/party") // generate party packages
router.get("/party/:partyId"  ) 
router.post ("/login")
router.post("/signup")
router.delete("/user/:partyId") //delete saved packages


### Auth

yes, JWT web token verify and hash password 


## Roadmap

- April 24-April 28: project skeleton backend, frontend, database, seed data preparation, API connection
- April 29-May 1st: package generation functions and user login/sign up function
- May 2nd- May 3rd save package and package detail page 
- May 4th - May 6th. debugging and add other diving deeper functions

## Nice-to-haves

- Web Scraping venue, drink, food, party supplies from website to get real-time data
- Discover page with recommended/popular party packages
- Social functions, like rate the packages, like, comment, share and
chat with other users