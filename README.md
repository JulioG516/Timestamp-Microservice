# API Project: Timestamp Microservice for FCC

Build a full stack JavaScript app that is functionally similar to this: https://timestamp-microservice.freecodecamp.rocks. Working on this project will involve you writing your code using one of the following methods:

The API endpoint is `GET [url]/api/timestamp/:date_string?`
If the date string is **empty** the service uses the current timestamp.
If the date string is **valid** the api returns a JSON e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
API accepts unix time.
If the date string is **invalid** the api returns a JSON having the structure `{"error" : "Invalid Date" }`.
