Datetify is a JavaScript library for handling dates and times.

# Installation
```bash
npm install datetify
```

# Usage
```js
const Datetify = require('datetify');

// Create a new Datetify instance
let date = new Datetify();

// Get the current date
let currentDate = Datetify.date();

// Get the current date as a string
let dateString = Datetify.datestring('%Y-%m-%d');

// Get the current time
let currentTime = Datetify.time();

// Get the current time as a string
let timeString = Datetify.timestring('%H:%M:%S');

// Format a Datetify instance or parse a date string
let formattedDate = Datetify.format(date, '%Y-%m-%s %H:%M:%S');
let parsedDate = Datetify.format('2022-01-01', '%Y-%m-%s');
```

# API
```js
new Datetify(year, month, day, hours, minutes, seconds)
```
> Creates a new Datetify instance.

```js
Datetify.date()
```
> Returns the current date as a D8 instance.

```js
Datetify.datestring(format)
```
> Returns the current date as a string in the specified format.

```js
Datetify.time()
```
> Returns the current time as a Time instance.

```js
Datetify.timestring(format)
```
> Returns the current time as a string in the specified format.

```js
Datetify.format(input, format)
```
> Formats a Datetify instance or parses a date string based on the provided format string.