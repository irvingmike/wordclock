# Word Clock
This is just a little project I did to work on my knowledge of AngularJS. It is far from done, but right now it is functional.

My goal would be to make it so that you could include include it in a web page with a single tag and ti would scale to the size of it's container.

**Things to know if you want to use this:**
1. You need to have a css size directly on the containing element for sizing.
2. in that element include: `<word-clock ng-app="WordClock" ng-controller="WordClockController"></word-clock>`

## TODO List:
1. ~Just type to scale with size.~
2. Move settings to JSON file to make it somethings easily changeable.
3. Add settings bar to bottom to be able to change things like:
    * Font color, both dimmed and lit
    * Background color (Photo?)
    * toggle birthday wish
    * toggle glow on illuminated characters

Very new to AngularJS, and constructive criticism is always welcome.

---
### Update Log

[04/18/17 - 4:30pm] Basic functionality for the scaling type is in. I don't think it is perfect for extreme cases but should work a for most common sizes.