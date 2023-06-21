# Campervan App Readme


Welcome to the Campervan App! This mobile application, built with MongoDB, React Native, Express, Node and Expo. Following Test Driven Development we used Jest and SuperTest. The app is designed to either find your perfect campervan for your trip or rent your campervan while your not using it.


## Features
The Campervan App offers the following key features:

Users can create an account, log in, and manage their personal profile.

Vehicle Listings: Browse all available campervans, with information about each vehicle, including descriptions, specifications, photos, and rental rates.

Search and Filters: Use search filters to find campervans that match specific criteria, such as location, make, model, price per night and sleeps.

Booking Management: Reserve campervans by selecting desired dates, reviewing pricing details, Users can view their bookings.



## Prerequisites
Before using the Campervan Rental App, ensure you have the following software and dependencies installed:

Node.js (v12 or higher)
Expo CLI
MongoDB (or a MongoDB cloud provider)
A code editor of your choice (e.g., Visual Studio Code)



## Installation

Clone the Campervan App repository from GitHub:


git clone https://github.com/779carney/camper-van-app
Navigate to the project directory:

cd camper-van-app
Install the required dependencies:


npm install
Create a .env file in the back-end directory and add the necessary environment variables:

makefile
MONGODB_URI=your_mongodb_uri
Replace your_mongodb_uri with the MongoDB connection string.

Create a .env.js file in the front-end directory and add the necessary environment variables:
export const IP = "your ip address"

## Start the application:

open a terminal and cd into back-end
npm run seed 
npm start

open another terminal and cd into front-end
npm start


Open the Expo DevTools in your browser and use the provided QR code or launch the app in an emulator or on your physical device.


