# Adalo GeoLocation component

This component allows reading the current location information of the device your app is running on.

The interaction for the component is a button to request the location of a user and pass the information to the app via an action. From the action you can update the database, or simply display the information on the screen. When the component loads it will get the location. Unless you are using `continous mode` then the location will not be retrieved again until the user clicks the button.

This component has not been published to the marketplace at the time of this writting so the only way to use it is private.

## Motivation

The motivation behind this component is to retrieve a users location data. This allows you to calculate the distance between users and display a list of `users near me` or pass the data into a map component or web view to show the current location.

You can also get live updates that can be used for tracking movement, speed, and direction.

## Running private

Prerequisites

- NodeJS
- Yarn
- Linux/macOS/WSL

Clone the respository and run
``` bash
$ yarn                # install dependencies
$ yarn build          # build typescript project
$ npx adalo login     # login to your adalo account
$ npx adalo publish   # deploy the component privately to your account
```

### Troubleshooting

The component needs the users permission for location data. The first time the app is run it will request permission to access location information. If the user denies the request you will be unable to read location data.

## How to use the component

Once the component is installed, you can drag and drop the location component onto the app screen and configure it.

| Name | Type | Description |
| --- | --- | --- |
| `Label for the button` | text | This is the text that will be displayed on the button. It supports formating the font family, font weight, and color |
| `Icon` | icon | This is the icon that will appear to the right of the button text |
| `Background Color` | color | The background color of the button |
| `How many milliseconds to wait before giving up` | number | This is the location timeout in milliseconds. If a location request is made and it does not reply in this amount of time and error will be raised |
| `How many milliseconds olf can a location be?` | number | Location data is sometimes cached, rather than making a new lookup for the location you might get cached data as a reply. This settings indicates how old the cached location can be and still be considered good. |
| `use high accuracy location?` | boolean | This indicates if you want to use the devices high accuracy mode. If you do not need pinpoint locations you can turn this off |
| `Only update on significant changes (iOS)` | boolean | On an iOS phone, while watching the location in real-time, this flag will only notify the app if location has moved a significant amount. Using this in your app will reduce the number of refreshes your app will make if the user does not move |
| `Continuously read the location` | boolean | This flag will put the component into watch mode and continuously stream the location information to the app. |
| `Number of miliseconds before refresh` | number | When `continuously reading the location` is enabled, this is the interval time to read the locations.
| `Trigger when there is an error reading the location` | action | This event gets fired when there is an error reading a location.
| `Trigger when the location has been updated` | action | This event gets fired when new location data is available |


