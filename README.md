# Leftovers
https://yente.xyz

## Pitch
Leftovers connects thrifty consumers with grocery stores, restaurants, and other food providers who need to sell their excess food quickly. Powered by TomTom's developer API.

## Built with
ReactJS, Gatsby, NodeJS, Express, NGINX, MariaDB, TomTom

## Inspiration
It's painful seeing perfectly good food being thrown away. We believe there is a good opportunity to connect thrifty consumers with food providers. Our service is similar to imperfectfoods, but instead of a delivery subscription our users can get their food immediately.

## What it does
Leftovers is an online marketplace for food providers like grocery stores and restaurants to sell their excess food quickly. Leftover's online map view works on iphones, tablets, and computers to provide consumers with cheaper food options.

## How we built it
Frontend
Our Frontend is a server side rendered progressive web application written in ReactJS styled by MaterialUI. 

Backend
Our backend is a NodeJS with Express server that serves the following endpoints which retrieve data from our MariaDB:

- GET `/api/offers`
- POST `/api/offers`
- GET `/api/offers/:id`
- GET `/api/donors`
- GET `/api/donors/:id`

Server
Our remote server is hosted on a DigitalOcean droplet running an NGINX webserver with a reverse proxy.

## Challenges we ran into
We had some challenges showing the TomTom mapview within our React app. To overcome this we created a separate component that loads the TomTom miniimzed script with vanilla JavaScript.

## Accomplishments that we're proud of
We successfully implemented many of our well-designed user stories in our live progressive web application. 

## What we learned
We learned a lot about TomTom's developer API and hooking the data into a server side rendered React frontend.

## What's next for Leftovers
We still need to add some UI elements to Update and Delete data from our database. We would also like to implement a better UI for food providers to add offers to their place of business. We also plan on using TomTom's fuzzy search for our lookahead.