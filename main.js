// Load fonts
//require("Font7x11Numeric7Seg").add(Graphics);
// X/Y are the position of the bottom right of the HH:MM text - make it central!
var X = g.getWidth()/2,
    Y = g.getHeight()/2;

//X = g.getWidth()/2,
//Y = g.getHeight()/2;

var dot = g.theme.fg2;
dot = 0xFFFF;

function drawBase() {
  var xX=17;
  g.setColor(0xFFFFCDCDCD);
  for (let i = 0; i < 6; i++) {
    g.fillCircle(xX,15,10);
    xX=xX+28;
  }
  xX=17;
  for (let i = 0; i < 6; i++) {
    g.fillCircle(xX,40,10);
    xX=xX+28;
  }
  var yY = 60;
  for (let i = 0; i < 6; i++) {
    xX=13;
    for (let i = 0; i < 10; i++) {
      g.fillCircle(xX,yY,6);
      xX=xX+16.5;
    }
    yY=yY+17;
  } 
}

function parseTime(timeString) {
  // Trim any extra spaces from the input
  timeString = timeString.trim();
  
  // Use a more flexible regular expression to capture the parts of the time string
  const timePattern = /^(\d{1,2}):(\d{2})\.(\d{2})\s?(am|pm)?$/i;
  const match = timeString.match(timePattern);

  // Debugging info to see what the input is and whether it matched
  if (!match) {
    console.error("Input string:", timeString);
    throw new Error("Invalid time format");
  }

  // If matched, extract hour, minutes, seconds
  let hour = parseInt(match[1], 10); // Get the hour
  let minutes = parseInt(match[2], 10); // Get the minutes
  let seconds = parseInt(match[3], 10); // Get the seconds
  let period = match[4]; // am or pm (optional)

  // Adjust for 12-hour time format
  if (period && period.toLowerCase() === 'pm' && hour !== 12) {
    hour += 12;
  } else if (period && period.toLowerCase() === 'am' && hour === 12) {
    hour = 0; // Midnight case
  }

  return {
    hour: hour,
    minutes: minutes,
    seconds: seconds
  };
}

// Example usage:
let timeString = "01:00.29 am";  // Adjust this to test with different inputs
let parsedTime = parseTime(timeString);
console.log(parsedTime); // Should show { hour: 1, minutes: 0, seconds: 29 }


function draw() {
  // work out how to display the current time
  var d = new Date();
  var clock = require("locale").time(d);
  var meridian = require("locale").meridian(d);
  var time = clock + " " + meridian;
  
  var hour = 2;
  
  var xX=17;
  for (let i = 0; i < hour; i++) {
    g.setColor(0xFF4400FF);
    g.fillCircle(xX,15,10);
    xX=xX+28;
  }
  xX=17;
  for (let i = 0; i < 6; i++) {
    g.fillCircle(xX,40,10);
    xX=xX+28;
  }
  var yY = 60;
  for (let i = 0; i < 6; i++) {
    xX=13;
    for (let i = 0; i < 10; i++) {
      g.setColor(0xFFE5FF00);
      g.fillCircle(xX,yY,6);
      xX=xX+16.5;
    }
    yY=yY+17;
  } 
  // draw the current time (4x size 7 segment)
  g.setColor(0xFF000000);
  g.setFontAlign(0,0); 
  g.setFont("Vector:30");
  g.drawString(clock, X, Y);
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
drawBase();
draw();
// now draw every second
//var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
/*Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    //draw(); // draw immediately
  }
});
*/

/* Show launcher when middle button pressed
This should be done *before* Bangle.loadWidgets so that
widgets know if they're being loaded into a clock app or not */
////Bangle.setUI("clock");
// Load widgets
////Bangle.loadWidgets();
////Bangle.drawWidgets();
