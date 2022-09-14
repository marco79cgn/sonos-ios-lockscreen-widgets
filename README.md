# sonos-ios-lockscreen-widgets
A collection of Scriptable Widgets for the iOS Lockscreen (introduced in iOS 16)


<img src="https://user-images.githubusercontent.com/9810829/190201505-2b73f30a-7b32-4e38-9152-2d705bdf8daa.jpg" width="400"/>

## Requirements

- iOS 16 (or later)
- [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) app 1.7 (188) or later - still in beta until now!

- [node-sonos-http-api](https://github.com/jishi/node-sonos-http-api) installed e.g. on a raspberry pi

## Installation
- copy the whole script source code (raw content of the desired *.js file)
- open the Scriptable app on your device
- click the "+" button on the upper right and paste the script code
- enter your node-sonos-http-api ip address and your desired room at the top of the sonos-display.sh script
- click on the title and choose a name (e.g. sonos-display)
- save the script and click "Done" on the upper left
- on your iOS Homescreen push long to get into "wiggle mode"
- while seeing your lockscreen, long press your display and click "edit" at the bottom 
- choose an element beneath the clock and add a scriptable widget placeholder
- tap the placeholder to choose the script you just saved earlier

## Thanks
Many thanks to [@simonbs](https://twitter.com/simonbs) who builds fantastic apps like [Scriptable](https://scriptable.app).

## Disclaimer
I have no affiliation with Sonos and built this just for fun on my free time. This is not an official product.

## Updates
14.09.2022, 17:41
- initial release
