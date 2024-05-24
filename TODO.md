# For the developer: 
## TODO
Date Calculations: Include functions to add or subtract time from a date, such as adding days, months, or years.

Date Comparisons: Functions to compare dates can be very useful. This could include checking if one date is before or after another, or if two dates are the same day.

Time Zone Support: Handling time zones can be one of the trickiest parts of date manipulation. Your library could provide functions to convert dates between different time zones.

Localization: Consider providing support for different languages and locales. This could include localized month names, day names, etc.

## Configure semantic-release
> Run in shell
```shell
export GH_TOKEN=<personal_access_token>
```

## Update changelog and publish updates
```shell
git commit -m "fix: "
git commit -m "feat: "
git commit -m "BREAKING CHANGE: "

npm run release
```