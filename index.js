const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// Text Decoration Codes
let bold = "\u001b[1m"
// Font Colors
  let black = "\u001b[30m"
  let red = "\u001b[31m"
  let green = "\u001b[32m"
  let yellow = "\u001b[33m"
  let blue = "\u001b[34m"
  let magenta = "\u001b[35m"
  let cyan = "\u001b[36m"
  let white = "\u001b[37m"
  let brightYellow = "\u001b[33;1m";
  let brightBlack =  "\u001b[30;1m";
  let brightRed = "\u001b[31;1m";
  let brightGreen = "\u001b[32;1m";
  let brightBlue = "\u001b[34;1m";
  let brightMagenta = "\u001b[35;1m";
  let brightCyan = "\u001b[36;1m";
  let brightWhite = "\u001b[37;1m";
  let reset = "\u001b[0m";
// Background Color Codes
  let backgroundBlack = "\u001b[40m";
  let backgroundRed = "\u001b[41m";
// Cursor Navigation Codes
  let up = "\u001b[{n}A" // n = number of spaces
  let down = "\u001b[{n}B"
  let right = "\u001b[{n}C"
  let left = "\u001b[{n}D"
// Backspace Code
  let backspace = "\u001b[010"
// Clear Screen Codes
  let clearScreen = "\u001b[2J"
  // "\u001b[{n}J"
  // n=0 clears from cursor until end of screen,
  // n=1 clears from cursor to beginning of screen
  // n=2 clears entire screen
// Clear Line Codes
// "\u001b[{n}K"
  // n=0 clears from cursor to end of line
  // n=1 clears from cursor to start of line
  // n=2 clears entire line

//!---------------------------------- Global Variables -------------------------------//
let nameInput;
let input = [];
let item = [];
let itemToTake;
let z = 0;
let x = 9;
let y = 9;
let playerLocation = [z, x, y];
let cL = [];
let i = 0;
let inventory = ["keycard"];
let locationArray = []; // This will store all constructed location objects

// Intro Welcome Message
const welcomeMessage = `Welcome to the\n${brightYellow}UprightEd ${brightGreen}Zorkington${reset}${white} ${brightYellow}Project${reset}${white}!\nBefore we get started...\nPlease enter your ${brightYellow}name?${reset}${white}\n`

async function askName() {
  if (nameInput == undefined) {
    nameInput = await ask(welcomeMessage)
    // start()
  }
}

//!------------------ Commands to be included in the help function: ----------------------
let commands = `\nTo ${brightGreen}move:${reset}, type ${brightYellow}go${reset}, ${brightYellow}"walk"${reset}, or ${brightYellow}"move"${reset}\nYou can also use ${brightYellow}move north${reset}, etc.\nTo return home, ask to "warp"\nLook around using "look".`

//!Search function for finding the playerLocation coordinates in the locationArray(object)
function search() {
  // console.log("searching...")
  // Search the locationArray coordinate until the coordinate of the playerLocation is found, then return the index

  // console.log("locationarrayicoordinate & playerlocation",JSON.stringify(locationArray[i].coordinate), (JSON.stringify(playerLocation)))
  for (i = 0; i < locationArray.length; i++) {
  // for (let i = 0; i < locationArray.length; i++) {
    if (JSON.stringify(locationArray[i].coordinate) != JSON.stringify(playerLocation)) {
      // console.log("searching...");
    } 
    else if (JSON.stringify(locationArray[i].coordinate) == JSON.stringify(playerLocation)) {
      console.log("found it. I =",i)
      popCL()
      return i;
    }
      else if (locationArray[i].coordinate == undefined) {
        console.log(red,"undefined i coordinate:",i,reset)
    //   console.log(green,"defined i coordinate:",i,reset)
    //   return i;
        onTheFlyLocation()
    } else { 
      console.log ("run outta options")
      // console.log(red,"undefined i coordinate:",i,reset)
      // return i = undefined;
    }
  }
}

//!-------------------------------Location Class Constructor------------------------------
class Location {
  constructor(coordinate, name, description, north, east, south, west, up, down, item, lock, funct) {
        this.coordinate = coordinate; // Location on map
        this.description = description; // wordy description from looking around
        this.north = north; 
        this.east = east;
        this.south = south;
        this.west = west;
        this.up = up;// Default direction to closed
        this.down = down;// Default direction to closed
        this.name = name; // quick name of location
        this.item = item;
        this.lock = lock; // holds a string that matches a key used to unlock it
        this.funct = funct;
  }
}

//!-------------------------- Standard Location Creation Function ------------------------
// createLocation function to construct each location and push them to the locationArray
function createLocation(newLocation, coordinate, name, description, north, east, south, west, up, down, item, lock, funct) {
  newLocation = new Location(coordinate, name, description, north, east, south, west, up, down, item, lock, funct);
return locationArray.push(newLocation)
}

/*//!-------------------------------- Locations indices-----------------------------------
  0 = newLocation variable
  1 = coordinate
  2 = name
  3 = description
  4 = north
  5 = east
  6 = south
  7 = west
  8 = up
  9 = down
  10 = item
  11 = lock
  12 = funct
 */

//!------------------------ Locations to Populate locationArray---------------------------
// Create Start Location
createLocation(
  "start", // 0 newLocation
  [0,9,9], // 1 Coordinate
  "home", // 2 name
  // `\nYou're at the entrance to the ${brightYellow}PTSB January Cohort${reset}.\nYou see a ${brightGreen}magnetic stripe reader${reset}.`, // 3
  `\nYou're at the entrance to the ${brightYellow}PTSB January Cohort${reset}.\nYou see a ${brightGreen}magnetic stripe reader${reset}.ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg`, // 
  "blocked",  // 4 North
  undefined,  // 5 East
  undefined,  // 6 South
  undefined, //7 West
  undefined, //8 Up
  undefined, //9 Down
  [`keycard`, `crayon`, `index`, `football`], //10 Item
  "keycard", //11 Lock
  undefined, //12 Function
);

// Create Hallway
createLocation(
  "hallway", // 0 newLocation Variable
  [0,9,10], // 1 name
  'hallway', //2 description
  `\nThere are doors up and down the hallway.\nThrough a window to your left, you can see ${green}Morgan Walker${reset}.\nShe appears to be meeting with a ${green}student${reset}.\nBest not disturb them.\nTo the right is a door to an ${yellow}office${reset}.`,
  undefined, //4 north
  undefined, //5 east
  undefined, //6 south
  "blocked", //7 west
  undefined, //8 up
  undefined, //9 down
  [], //10 item
  undefined, //11 lock
  undefined // 12 funct
);

// Create topOfStairway
createLocation(
  "stairwell", //0
  [0,8,11],//1
  `stairwell`,//2
  `\nYou are at a stairwell going ${yellow}down${reset}.`,//3
  "blocked",//4 north
  undefined,//5 east
  "blocked",//6 south
  "blocked",//7 west
  undefined,//8 up
  "open",//9 down
  [],//10 item
  undefined, //11 lock
  undefined // 12 funct
)

// Create dungeon
createLocation(
  "dungeon",//0
  [-1,8,11],//1
  `stairwell`,//2
  `\nYou have stumbled on a ${green}dungeon${reset}.\nThere is a narrow path to your ${yellow}right${reset}`,//3
  "blocked",//4 north
  undefined,//5 east
  "blocked",//6 south
  "blocked",//7 west
  "open",//8 up
  undefined,//9 down
  [],//10 item
  undefined, //11 lock
  undefined // 12 funct
)

// Create Traproom
createLocation(
    "trapRoom", // 0 newLocation Variable
    [-1,9,11], // 1 name
    'trapRoom', //2 description
    `\nIt's a ${yellow}trap!${reset}\n"The door ${green} has closed and locked${reset} behind you! It isn't budging. \nYou see a ${yellow}note${reset} that reads: Speak the magic word, and you may exit.`,
    "blocked", //4 north
    "blocked", //5 east
    "blocked", //6 south
    "blocked", //7 west
    undefined, //8 up
    undefined, //9 down
    [], //10 item
    undefined, //11 lock
    undefined // 12 funct
);

// Create Kate's Office
createLocation(
  "katesOffice",//0
  [0,9,12], //1
  'katesOffice', //2
  `${green}Kate${reset} waiving hello.\na${green} desklamp${reset} on Kate's desk.`,//3
  "blocked",//4 north
  "blocked",//5 east
  undefined,//6 south
  "blocked",//7 west
  undefined,//8 up
  undefined,//9 down
  [],//10 item
  undefined, //11 lock
  undefined // 12 funct
);

// Create End of Hall
createLocation(
  "endOfHall",//0
  [0,9,11],//1
  "endOfHall",//2
  `You reach the end of the hall.\nIn front of you is ${green}Kate's${reset} office.\nTo the left is a ${yellow}stairwell${reset}`,//3
  undefined,//4 north
  "blocked",//5 east
  undefined,//6 south
  undefined,//7 west
  undefined,//8 up
  undefined,//9 down
  [],//10 item
  undefined, //11 lock
  undefined // 12 funct
)

// Create Ben's Office
createLocation(
  "bensOffice", //0
  [0,10,10], //1
  'bensOffice', //2
  `\nYou enter the office.\nYou see${green} Ben${reset} sitting at his computer leading a help session.\nHe offers you ${yellow}sympathy${reset}`,//3
  "blocked",//4 north
  "blocked",//5 east
  "blocked",//6 south
  undefined,//7 west
  undefined,//8 up
  undefined,//9 down
  ["tissue"],//10 item
  undefined, //11 lock
  undefined // 12 funct
);

//! ------------------------- Populate Current Location Array ----------------------------
function popCL(){
  cL = []
    // if (cL.length == 0) {
  // Check if there is location data at the index found
    if (locationArray[i]) {
      // If found, push directions at the current index to the cL array.
      cL.push(locationArray[i].north);
      cL.push(locationArray[i].east);
      cL.push(locationArray[i].south);
      cL.push(locationArray[i].west);
      cL.push(locationArray[i].up);
      cL.push(locationArray[i].down);
      // }
  } else {
    console.log("gonna have to make something up in the popcl function")
    // create a new location and populate the cl
  }
};

begin();

//!--------------- Display opening message and call the start function -----------------
async function begin() {
  await askName();
  console.log(`\nHi, ${brightYellow}${nameInput}${reset}!\nWe are happy that you have come to take a tour of our ${brightGreen}Zorkington${reset} project!\nYou're at the entrance to the ${brightYellow}PTSB January Cohort${reset}.\nYou see a ${brightGreen}magnetic stripe reader${reset}.`)
  //! ------------ Push directional data from starting location into the CL array -------
  cL.push(locationArray[0].north);
  cL.push(locationArray[0].east);
  cL.push(locationArray[0].south);
  cL.push(locationArray[0].west);
  cL.push(locationArray[0].up);
  cL.push(locationArray[0].down);

  start()}

async function start() {
// Get input, split it into an array, search the array for keywords, call functions based on those keywords.

  let response = await ask(`\nWhat would you like to do?\n`);

  input = response.split(" ");

//!--------------------- Sanitize input (lowercase, remove: the)-------------------------
  input = input.map(item => item.toLowerCase()); 
  if (input.includes("the")) {
    input.splice(input.indexOf("the"), 1)
  }

//!------------------------------ Search input for keywords ------------------------------

//----------------------------- Help Command (finish this later):-------------------------
if (input.includes("help")) {
  console.log("\nThis is unfinished\n",commands)
  start()}

//------------------------------ Display Current Location Array --------------------------
else if (input.includes("cl")) {
  console.log("cL")
  cLFunction()
}

//------------------------------- Populate the Current Location --------------------------
//---------------------- Use if there is no location for the coordinates -----------------
else if (input.includes("popcl")) {
  popCL()
  start()
}

//-------------------- Display the array of location objects for debugging ---------------
  else if (input.includes("location")) {
    console.log(playerLocation,"\n",locationArray);
    start()}

//------------------------------------- Look command: ------------------------------------
  else if (input.includes("look") || input.includes("search")) {
    describe();}

//-------------------------------------- Where am I? -------------------------------------
//--Display Location coordinate (locationArray[i].coordinate), and Current Location (cL)--

  else if (input.includes("where")) {
    whereAmI();
  }
  
//-------------------------------------- Move north: -------------------------------------
  else if (input.includes("go") && input.includes("north")|| input.includes("move") && input.includes("north") || input.includes("walk") && input.includes("north")|| input.includes("go") && input.includes("forward")|| input.includes("move") && input.includes("forward") || input.includes("walk") && input.includes("forward")) {
    go("north") 
  } 

//--------------------------------------- Move south: ------------------------------------
  else if (input.includes("go") && input.includes("south")|| input.includes("move") && input.includes("south") || input.includes("walk") && input.includes("south") || input.includes("go") && input.includes("backward")|| input.includes("move") && input.includes("backward") || input.includes("walk") && input.includes("backward")) {
  go("south") 

} 

//--------------------------------------- Move east: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (input.includes("go") && input.includes("east")|| input.includes("move") && input.includes("east") || input.includes("walk") && input.includes("east")|| input.includes("go") && input.includes("right")|| input.includes("move") && input.includes("right") || input.includes("walk") && input.includes("right")) {
    go("east") 
  }

// -------------------------------------- Move west: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (input.includes("go") && input.includes("west")|| input.includes("move") && input.includes("west") || input.includes("walk") && input.includes("west")|| input.includes("go") && input.includes("left")|| input.includes("move") && input.includes("left") || input.includes("walk") && input.includes("left")) {
    go("west") 

  }

// --------------------------------------- Move up: --------------------------------------
  // Search input for keywords go, move, walk, south
  else if (input.includes("go") && input.includes("up")|| input.includes("move") && input.includes("up") || input.includes("walk") && input.includes("up")) {
    go("up") 
  }

// -------------------------------------- Move down: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (input.includes("go") && input.includes("down")|| input.includes("move") && input.includes("down") || input.includes("walk") && input.includes("down")) {
  go("down")}

// ------------------------- Move Without a Direction Specified: -------------------------
// Search input for keywords go, move, walk
  else if (input.includes("go" || input.includes("move") || input.includes("walk"))) {
  let moveDirection = await ask("Which direction would you like to move?\n")
    if (moveDirection == "up" || moveDirection == "down" || moveDirection == "north" || moveDirection == "east" || moveDirection == "south" || moveDirection == "west" ||moveDirection == "left" || moveDirection == "right" || moveDirection == "forward" || moveDirection == "backward") {
      go(moveDirection);
    } else {
      console.log("You can't move in that direction")
    }
  }

// ------------------------------------ Warp to start: -----------------------------------
  else if (input.includes("please")|| input.includes("abracadabra") || input.includes("hocus")) {
  warp();
  }

// -------------------------------------- Exit game: -------------------------------------
  else if (input.includes("quit") || input.includes("exit")) {
  exitGame();
  }

// --------------------------------- Take/pick up items: ---------------------------------
/* 
Check to see if an item exists in the current location
If it does, add it to the inventory and remove it from the current location object.
*/
  else if (input.includes("take") || input.includes("pick")) {
    let itemToTake;
    if (input.includes("take")) {
      itemToTake = input[input.indexOf("take")+1]
      take(itemToTake);
    }
    else if (input.includes("pick")) {
      itemToTake = input[input.indexOf("pick")+2]
      take(itemToTake);
    }
    else {
      take()
    }
  }

// ------------------------------------- Drop Item: --------------------------------------
// Use the splice command to remove the dropped item from the inventory
  else if (input.includes("drop") || input.includes("leave")) {
    let itemToDrop;
    if (input.includes("drop")) {
      itemToDrop = input[input.indexOf("drop")+1]
      drop (itemToDrop);

    } else if (input.includes("leave")) {
      let itemToDrop = input[input.indexOf("leave")+1] // Takes the next word in the input index to use as an item argument
      itemToDrop = input[indexOf("leave")+1]
      drop(itemToDrop);
    }
  }

// This works for unlocking doors, but doesn't work for detecting if there is nothing to unlock
  else if (input.includes("unlock")|| input.includes("swipe")) {
  unlock()}

//------------------------------------ View Inventory: -----------------------------------
  else if (input.includes("inventory") || input.includes("items") || input.includes("i")) {
    if (inventory.length == 0) {
      console.log(`You have nothing in your inventory`)
    start()
    }  else {
    console.log(inventory);
    start() 
    }
  } 

// ------------------------------------ Exit the game ------------------------------------
  else if (input.includes("exit" || input.includes("quit"))) {
    let quitQuestion = await ask(`Are you sure want to quit the game?`)
      if (quitQuestion == "y" || quitQuestion == "yes") {
      process.exit();} 
      else {
      start();
    }
  }

// ------------------------------------ Open the door ------------------------------------
  else if (input.includes("open") && locationArray[i].funct) {
    locationArray[i].funct()
    start()}
  else if (input.includes("open") && !locationArray[i].funct) {
    console.log(`There's nothing to ${brightYellow}open${reset} here!`)
    start()
  }

// ------------------------------- Command not recognized: -------------------------------
  else {
  console.log(`\nI don't understand what you're saying.\n`)
  start()
  }

//! Functions Section:

// ------------------- Creating a new location if none is present. -----------------------
function onTheFlyLocation() {
  if (!playerLocation[i])
  console.log("about to create a new playerLocation",playerLocation)
  let newLocation = (`_${playerLocation}`)
  createLocation(newLocation, playerLocation, undefined, "nothing special about this area",undefined,undefined,undefined,undefined,undefined,undefined, [])
}

// -------------------------------- Take Items function: ---------------------------------
async function take(itemToTake) {
    search()
// If there is no current location object in the locationArray, or if the location item array is 0 length, say there's nothing to pick up.
    if (locationArray[i] == undefined || locationArray[i].item.length == 0) {
      console.log(`There's nothing to pick up.`)
      start();}
    else {
      let localItem = locationArray[i].item;
// If there is a defined item requested and the requested item matches the location's item, move it to the inventory, erase it from the location, and reset the itemToTake global variable to undefined
      if (itemToTake != undefined && localItem[localItem.indexOf(itemToTake)]) {
        inventory.push(localItem[localItem.indexOf(itemToTake)])
        localItem.splice(localItem.indexOf(itemToTake), 1);
        console.log(`You pick up the ${yellow}${itemToTake}${reset}`)
        itemToTake = undefined;
        start();}
  // If there is a defined item requested, and the requested item doesn't match the local item, say you can't take that.
      else if (itemToTake != undefined && !localItem[localItem.indexOf(itemToTake)]) {
          console.log(`You can't take that.`)
          itemToTake = undefined;
        start();} 

  // If there is no text entered for what to take, ask what the user would like to pick up.
      else if (itemToTake == undefined) {
        console.log(`Which item would you like to pick up?`)
        for (item of localItem) {
          console.log(`${yellow}`+item+`${reset}`)
        }
        itemToTake = await ask("")
        console.log(itemToTake)
  // If the user wants to cancel picking up an item, type cancel
        if (itemToTake == "cancel") {
          console.log("cancelled")
          itemToTake = undefined;
          start();
        }
        else {
  // restart the take function with the new itemToTake set.
        take(itemToTake);
        }
      }
    }
}

// ---------------------------- Confirm Drop Items Function ------------------------------
async function dropYN (item) {
  console.log("dropsielocation:",locationArray[i])
  let dropItemQuestion = await ask(`Are you sure you want to drop the ${yellow}${item}${reset}?\n`);
      if (dropItemQuestion == "y" || dropItemQuestion == "yes") {
// If the answer is yes, push the item to the locationArray item array, and splice it from the inventory
        let currentLocation = locationArray[i];
        console.log("Current Location:",currentLocation)
        currentLocation.item.push(item);
        inventory.splice([inventory.indexOf(item)], 1)
        start()
      }
      else {
// If the answer is no, go to the start again.        
        start();
      }
}

// --------------------------------- Drop Items Function ---------------------------------
async function drop(item) {
    search()

// -------------------------------- Drop Inventory Check ---------------------------------
// If the user tries to drop something that is not in the inventory, tell them they can't drop it.
    if (!inventory.includes(item)) {
      console.log(`You can't drop what you don't have.`) 
      start();}

// If there is no object in the locationArray for the current location, create a new object, push it to the locationArray, splice the item from the inventory, and say there is nothing special about the area.
// console.log(locationArray[i]);

    else {
      dropYN(item)
    }
        start();
}

// ---------------------------------- Movement Function ----------------------------------
async function go(text) {
    search() /* Search for the index of the current location in the locations array
    */
    // If the text is "blocked", do not move, but display a message.
    if (text == "north" || text == "forward") {
      if (cL[0] == 'blocked') {
        console.log(`\nThe way is ${red}blocked.${reset}\n`)
      } else {
        // search();
      console.log(`You move ${text}`);
      y++
      playerLocation = [z, x, y];
        // search();

        //! if i is undefined, create a location, and populate the current location array
      // console.log("playerLocation after moving",playerLocation)
      // popCL();
      // console.log(locationArray[i])
    }
  } else if (text == "east" || text == "right") {
    if (cL[1] == "blocked") {
      console.log(`The way is ${red}blocked${reset}.`);
      playerLocation = locationArray[i].coordinate;
    } else {
    console.log(`You move ${text}`);
    x++
    playerLocation = [z, x, y];
    // popCL();
    // i = locationArray.indexOf(playerLocation)
    }

  } else if (text == "south" || text == "backward") {
    if (cL[2] == "blocked") {
      console.log(`The way is ${red}blocked${reset}.`);
      playerLocation = locationArray[i].coordinate;
    } else {
    console.log(`You move ${text}`);
    y--
    playerLocation = [z, x, y];
    // popCL();
    // i = locationArray.indexOf(playerLocation)
    // console.log("locationarrays length before creating one on the fly",locationArray.length)
    // console.log("locationarrays length after creating one on the fly",locationArray.length)
    // console.log("locationarrays after creating one on the fly",locationArray)
    // cLFunction()
    }

  } else if (text == "west" || text == "left") {
    if (cL[3] == "blocked") {
      console.log(`The way is ${red}blocked${reset}.`)
      playerLocation = locationArray[i].coordinate;
    } else {
    console.log(`You move ${text}`);
    x--
    playerLocation = [z, x, y];
    // popCL();
    // i = locationArray.indexOf(playerLocation)
    }

  } else if (text == "up") {
    if (cL[4] != "open") {
      console.log(`You ${red}can't go up${reset} from here.`)
      if(locationArray[i]) {playerLocation = locationArray[i].coordinate;}
    } else {
    console.log(`You move ${text}`);
    z++
    playerLocation = [z, x, y];
    // popCL();
    // i = locationArray.indexOf(playerLocation)
    }

  } else if (text == "down") {
    if (cL[5] != "open") {
      console.log(`You ${red}can't go down${reset} from here.`)
      if (locationArray[i]) {playerLocation = locationArray[i].coordinate;}
    } else {
    console.log(`You move ${text}`);
    z--
    // console.log(z, x, y)
    playerLocation = [z, x, y];
    // popCL();
    // i = locationArray.indexOf(playerLocation)
    }

  } else if (text == "warp") {
  if (cL[6] == "blocked") {
    console.log("You cannot warp out of here.")
    playerLocation = locationArray[i].coordinate;
console.log("locationArray[i].coordinate:",locationArray[i].coordinate)

    } else {
      [z, x, y] = [0, 9, 9];
      playerLocation = [z, x, y];
      // popCL();
      console.log(`You have ${green}warped${reset} to safety. ${yellow}Congratulations${reset}, ${blue}${nameInput}${reset}, on escaping!`);
  }
};
  onTheFlyLocation()
  popCL();
  describe();
}

// ----------------------------------- Looking around ------------------------------------
function describe() 
{
  console.log("i before search",i)
  search()
  console.log("i after search",i)
    // Search the locationArray for the existence of the current location at the search index
    // If there is no object at the index:
    if (!locationArray[i]){
        console.log(`You don't see anything interesting...`); 
        start();

    // If the coordinate has been discovered in the locationArray, display the description.
    } else if (locationArray[i].item.length > 0 && locationArray[i].description) {
      let items = [];
        for (let c = 0; c < locationArray[i].item.length; c++) {
          items.push(`${yellow}`+locationArray[i].item[c]+`${reset},`)
          }
        word = items[(items.length-1)];
        word = word.slice(0,-1);
        let itemList = "";
        if (items.length > 1) {
          items[(items.length-1)] = (`${reset}and a ${yellow}`+word);
          for (item of items) {
            itemList += item,
            itemList += " "}
          itemList = (itemList.slice(0,-1)+`${reset}.`);
        } else {
          itemList = items[0];
          itemList = (itemList.slice(0,-1)+`${reset}.`);
        }
        let description = (`You look around and see ${locationArray[i].description}.`)
// Progress toward line character limit of 80
        /*         let description = "";
        
          for (let i = 0; i < 361; i++) {
            description += i
          }
            description = description.split(" ");
            // console.log("fghjfgj",description)
            let tempDesc = "";
            let tempArray = [];
              for (let index = 0; index < description.length; index++) {
                // if (!description) {
                //   console.log("description is missing")
                // }
                if (tempDesc.length + description[index].length < 80) {
                // else if (tempDesc.length + description[i].length < 80) {
                  tempDesc += description[index];
                  console.log("tempdesclength",tempDesc.length)
                } else {
                  tempArray.push(tempDesc)
                  tempArray.push("\n")
                  tempDesc = "";}
                }
                console.log(tempArray)
                console.log(tempArray.length)
            // description = */
        console.log(`You look around and see ${locationArray[i].description}.\nYou also see a ${yellow}${itemList}${reset}`);
          start();

    } else if (locationArray[i].description) {
        console.log(`You look around and see ${locationArray[i].description}`);
        start();
    }
}

// ----------------------------- Unlocking doors function: -------------------------------
function unlock(){
if (!locationArray[i]){
  console.log("There's nothing to unlock.")
  start();

// If the coordinate has been discovered in the locationArray, display the description.
} else if (locationArray[i].lock == undefined) {
  console.log("There's nothing to unlock.")
// If the way is blocked in any of the nesw directions, if the inventory contains an item with the same name as the lock, delete from the inventory and change the value of the lock to undefined
} else if (inventory.includes(locationArray[i].lock)) {
    if (locationArray[i].north == "blocked") {
      locationArray[i].north = undefined
    } else if (locationArray[i].east == "blocked") {
      locationArray[i].east = undefined
    } else if (locationArray[i].south == "blocked") {
      locationArray[i].south = undefined
    } else if (locationArray[i].west == "blocked") {
      locationArray[i].west = undefined
  }
  console.log(`You hear a mechanism ${blue}click${reset}.`)
  inventory.splice(inventory.indexOf(locationArray[i].lock), 1)
  locationArray[i].lock = undefined;
  cL[cL.indexOf("blocked")] = undefined;
  start()
}
}

// -------------------------------- Warp Home function: ----------------------------------
async function warp(){
let warpQuestion = await ask("Would you like to warp home?") 
if (warpQuestion == "y" || warpQuestion == "yes") {
  go("warp");
  } else {
    start() 
  }
}

// --------------------------------- Exit Game function ----------------------------------
async function exitGame() {
  let exitQuestion = await ask ("Are you sure you want to exit the game?\n")
  if (exitQuestion == "y" || exitQuestion == "yes") {
    process.exit();
  } else {
    start();
  }
}

//! ---------------------------- Debugging commands Section ------------------------------

// -------------------- Display information about current location -----------------------
function whereAmI(){
  let i = locationArray.indexOf(playerLocation)
  console.log("playerLocation:",playerLocation)
  if (locationArray[i]) {
    console.log("locationArray[i].coordinate:",locationArray[i].coordinate)
    console.log("cL:",cL);
  }else {
    console.log("else...")
    // console.log("locationArray[i].coordinate:",locationArray[i].coordinate)
    console.log("cL:",cL);
  }
  start();
}

// ------------------- Display Current Location Directional Information ------------------
function cLFunction() {
console.log(red,"cL Array:",reset,cL)
if (locationArray[i]) {
  console.log(locationArray[i])
} else {
  console.log(`there is no information at locationArray, index ${i}`)
}
start()
}
}