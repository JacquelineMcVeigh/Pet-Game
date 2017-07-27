// bubble minigame
// bubble minigame: rare prize-sponge/soap=another life
  // blue, red, green

// golden leash gives you another life

// game events with timer in the top left that tell you what's going on
  // oven timer; things take a long time to cook

// mythology version witch shop, transform pet and buy potions (and MAKE POTIONS)

// remove grocery inventory items on use

// finish recipe code

// cooking screen
  // recipe book w/ recipes you found or bought
  // bowl
    // put ingredients in bowl

// grocery store
  // carrots
  // steak
  // chocolate

// hook up map icons
// kitchen combining

// map-click on location then click on separate locations inside location
// more expensive leashes last longer
// add clifford, even rarer than hotdog
// falling powerup that doubles worth of everything

// BUGS
// - an object left over after walking mini game

// oven in kitchen can bake biscuits and you can sell some for money and you can feed your pet with them
// continue removing falling objects

// don't show obstacles at end game screen
// chart for picking out dog
// coins go off screen:fix
// hearts fall that add life, they usually only fall if you have, and very rarely if you have 2
// draw red border around dogs when they get hit
// add more dogs
// bedroom / kitchen / bathroom

// gender symbols
// enter pet into competition
// cat 2; http://www.alsointocats.com/wp-content/uploads/2013/01/lordmeowington.png
// poop emoji; http://emojipedia-us.s3.amazonaws.com/cache/8c/65/8c65e5de808ec301754508366480250c.png
// park; http://science-all.com/images/park/park-08.jpg
// win first place medal; http://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Transparent_Gold_Cup_Trophy_PNG_Picture.png?m=1432204038
// win second place medal; http://www.mirpurblogs.com/southasia/wp-content/uploads/2011/09/p81-04L.gif
// win third place ribbon; http://3.bp.blogspot.com/-h3iLFtdLjro/VYN5cMxeEnI/AAAAAAAABSA/dhPK5ABMImw/s1600/Blue-Ribbon-shorter-post.gif
// cat 2; http://www.vividpetpals.com/wp-content/uploads/2012/12/Kitten-Ginger-1.png
// cat 3; http://www.alsointocats.com/wp-content/uploads/2013/01/lordmeowington.png
// frisbee; http://cdn.fivebelow.com/media/catalog/product/cache/1/base_image/654x/9df78eab33525d08d6e5fb8d27136e95/f/r/frisbee-purple.png
// hamster 1; http://www.feathersnfurshoppe.com/images/smallanimaldocs/Hamster.gif
// food bags
// shampoo bottles (for baths)
// fashion-box 

// inventory

// dog walking game, you play the dog and collect coin

// red apple; http://www.clipartbest.com/cliparts/bcy/odK/bcyodK7Mi.png

// fire hydrant:
// http://worldartsme.com/images/fire-hydrant-free-clipart-1.jpg

// tuna fish; http://clipartfreefor.com/cliparts/files3/tuna-clipart-4TbL4y4Tg.gif

// cat bed; http://www.catsbestfriend.co.uk/ekmps/shops/d94fa4/images/dream-premium-snuggle-slumber-cat-bed-sandalwood-or-grey-stone-colour-grey-stone-size-66cm-26-1706-p.png

var playerMoney = 700;
var items = [];
var flyingItems = [];

var gameState = false;

var leftPressed = false;
var rightPressed = false;

var selectedPet = false;
selectedPet = 'cat';

var navigation = document.getElementById('navigation');
var moneyCountElement = document.getElementById('playerMoneyCount');
var selectDogButton = document.getElementById('selectDog');
var selectableDogs = document.getElementById('selectableDogs');
var selectCatButton = document.getElementById('selectCat');
var selectableCats = document.getElementById('selectableCats');
var petStore = document.getElementById('petStore');
var house = document.getElementById('house');
var catA = document.getElementById('catA');
var livingRoom = document.getElementById('livingRoom');
// var thinkBubble = document.getElementById('thinkBubble');
var petCarrier = document.getElementById('petCarrier');
var inventoryScreen = document.getElementById('inventory');
var sidewalk = document.getElementById('sidewalk');
var walkMiniGameOverScreen = document.getElementById('walkMiniGameOverScreen');

var currentScreen = document.getElementById('playerInstructions');
currentScreen.style.display = 'block';
var lastScreen = false;

var petName = false;

var isBowlFull = false;
var fullBowl = document.getElementById('fullBowl');
var emptyBowl = document.getElementById('emptyBowl');

var isWaterBowlFull = false;
var fullWaterBowl = document.getElementById('fullWaterBowl');
var emptyWaterBowl = document.getElementById('emptyWaterBowl');
var redScreen = document.getElementById('redScreen');
var petHealth = 3;
var petHunger = 4;
var petThirst = 4;
var petDirtLevel = 4;
var petBathroom = 4;

var animalSpeed = 3;
var xDirection = 0;
var yDirection = 0;
var animalX = 19;
var animalY = -379;
// thinkBubble.style.left = '69px';
// thinkBubble.style.top = '296px';

var myPet = false;
// var myPet.img = false;

var mixingBowlContents = [];
var recipes = [];

var tastes = ['egg yolks', 'carrots', 'chicken', 'broccoli', 'duck', 'rabbit', 'shrimp', 'buffalo'];

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {
  changeScreen('petStore');
  navigation.style.display = 'block';
  startButton.style.display = 'none';
});

var inventoryScreen = document.getElementById('inventory');
var inventoryButton = document.getElementById('inventoryButton');
inventoryButton.addEventListener('click', function() {
    if(currentScreen != inventoryScreen) {
      changeScreen('inventory');
    } else {
      goBack();
    }
});

var shopButton = document.getElementById('shopButton');
var supplyShop = document.getElementById('supplyShop');
shopButton.addEventListener('click', function() {
	supplyShop.style.display = 'block';
  if(currentScreen != supplyShop) {
      changeScreen('supplyShop');
    } else {
      goBack();
    }
});

var replayWalkGameButton = document.getElementById('replayWalkGame');
replayWalkGameButton.addEventListener('click', function() {
  changePetHealth(3);
  initializeWalking();
});

var kitchenButton = document.getElementById('kitchenButton');
kitchenButton.addEventListener('click', function() {
  changeScreen('kitchen');
});

var ovenButton = document.getElementById('ovenButton');
ovenButton.addEventListener('click', function() {
  changeScreen('cookingScreen');
});

var mixButton = document.getElementById('mixButton');
mixButton.addEventListener('click', function() {
  var validRecipe = false;

  for(var recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
    var recipe = recipes[recipeIndex];
    // ARE ALL THE INGREDIENTS FOR THIS RECIPE IN THE BOWL

    var haveIngredients = true;
    console.log(recipe.ingredients)
    console.log(mixingBowlContents)
    for(var ingredientIndex = 0; ingredientIndex < recipe.ingredients.length; ingredientIndex++) {
      var ingredient = recipe.ingredients[ingredientIndex];
      if(mixingBowlContents.indexOf(ingredient) == -1) {
        console.log(ingredient)
        haveIngredients = false;
        break;
      }
    }

    if(haveIngredients == false) {
      continue;
    } else {
      validRecipe = true;
      for (var ingredientIndex = recipe.ingredients.length - 1; ingredientIndex >= 0; ingredientIndex--) {
        var ingredient = recipe.ingredients[ingredientIndex];
        items[ingredient].changeCount(-1);
      }

      items[recipe.item.title].changeCount(1);
      alert("You can now find a " + recipe.item.title + " in your inventory");
      break;
    }
  }

  if(validRecipe == false) {
    // NO RECIPE WAS FOUND
    alert('Those are not valid ingredients for a recipe.');
  }
});

var toLivingRoomButtons = document.getElementsByClassName('toLivingRoom');
for(var buttonIndex = 0; buttonIndex < toLivingRoomButtons.length; buttonIndex++) {
  var eachButton = toLivingRoomButtons[buttonIndex];
  eachButton.addEventListener('click', function(){
    changeScreen('livingRoom');
  });
}

var toBathroomButtons = document.getElementsByClassName('toBathroom');
for(var buttonIndex = 0; buttonIndex < toBathroomButtons.length; buttonIndex++) {
  var eachButton = toBathroomButtons[buttonIndex];
  eachButton.addEventListener('click', function(){
    changeScreen('bathroom');
  });
}

var toKitchenButtons = document.getElementsByClassName('toKitchen');
for(var buttonIndex = 0; buttonIndex < toKitchenButtons.length; buttonIndex++) {
  var eachButton = toKitchenButtons[buttonIndex];
  eachButton.addEventListener('click', function(){
    changeScreen('kitchen');
  });
}

var goBackButtons = document.getElementsByClassName('goBack');
for(var buttonIndex = 0; buttonIndex < goBackButtons.length; buttonIndex++) {
  var eachButton = goBackButtons[buttonIndex];
  eachButton.addEventListener('click', function(){
      goBack();
  });
}

// MAP STUFF
var mapButton = document.getElementById('mapButton');
mapButton.addEventListener('click', function() {
  changeScreen("mapScreen");
});

houseInMap.addEventListener('click', function() {
  changeScreen('house');
});

groceryStoreInMap.addEventListener('click', function() {
  changeScreen('groceryStore');
});

groceryStore.addEventListener('click', function() {
  changeScreen('groceryStoreInternal');
});

marketStallInMap.addEventListener('click', function() {
  changeScreen('marketStall');
});

var marketSellButton = document.getElementById("marketSellButton");
marketSellButton.addEventListener('click', function() {
  gameState = 'choosingItemsToSell'; // left off here
  
  changeScreen('inventory');
});

var startBubbleMiniGame = document.getElementById('startBubbleMiniGame');
startBubbleMiniGame.addEventListener('click', function() {
  var playerYes = confirm("Are you sure that you would like to give your dog a bath");
  if (playerYes == true) {
    for (var i = 0; i < 10; i++) {
      var bubble = new Bubble();
      bubble.y = -500;
      bubble.x = Math.random() * 500;
    }

    gameState = "bubbleGame";
  }
});


var walkButton = document.getElementById('walkButton');
walkButton.addEventListener('click', function() {
  if(items["Leash"].ownedAmount > 0) {
    var playerYes = confirm("Are you sure that you want to go on a walk?");

    if(playerYes) {
      initializeWalking();
    }
  } else {
    alert('To go for a walk, you must have at least one leash.');
  }
});

var petStatusScreen = document.getElementById('petStatus');
var petStatusButton = document.getElementById('petStatusButton');
petStatusButton.addEventListener('click', function() {
 
    if(currentScreen != petStatusScreen) {
      changeScreen('petStatus');
    } else {
      goBack();
    }
});

selectDogButton.addEventListener('click', function(){
  selectableDogs.style.display = 'block';
  selectDogButton.style.display = 'none';
  selectCatButton.style.display = 'none';
});

selectCatButton.addEventListener('click', function() {
  selectableCats.style.display = 'block';
  selectDogButton.style.display = 'none';
  selectCatButton.style.display = 'none';
});

petStore.addEventListener('click', function(){
  selectDogButton.style.display = 'block';
  selectCatButton.style.display = 'block';
  petStore.style.display = 'none';
});

catA.addEventListener('click', function(){
  catA.style.display = 'none';
  changeScreen('house');
  
  myPet.img = catA;
});
                      
house.addEventListener('click', function(){
  changeScreen('livingRoom');
});                    

petCarrier.addEventListener('click', function() {
  myPet.show();
  myPet.screen = 'livingRoom';

  // move him to the carrier!
  myPet.img.style.left = '19px';
  myPet.img.style.top = '399px';
  myPet.caged = false;
  petCarrier.style.display = 'none';

  petThink();
});

function changeScreen(screen) {
  lastScreen = currentScreen;
  currentScreen.style.display = "none";
  currentScreen = document.getElementById(screen);
  currentScreen.style.display = "block";


  if(screen == 'sidewalk' || screen == 'livingRoom') {
    if(myPet.caged == false) {
      console.log(screen);
      myPet.screen = screen;
    }
  }

  if(myPet != false) {
    console.log(myPet.screen);
    if(myPet.screen == screen) {
      myPet.show();
    } else {
      myPet.hide();
    }
  }
}

function goBack() {
  changeScreen(lastScreen.id);
}

function changePetHealth(amount) {
  petHealth += amount;
  if(petHealth <= 0) {
    changeScreen('walkMiniGameOverScreen');
    gameState = false;
    for(var fallingObjectIndex = 0, fallingObjectCount = fallingObjects.length; fallingObjectIndex < fallingObjectCount; fallingObjectIndex++) {
      // var currentObject = fallingObjects[fallingObjectIndex];
      var removedObjects = fallingObjects.splice(0, 1);
      var object = removedObjects[0];
      console.log(object);
      object.image.parentNode.removeChild(object.image);
    }
  }

  var lifeHearts = document.getElementById('lifeHearts');
  var walkHearts = lifeHearts.getElementsByTagName('img');
  // var walkHearts = document.getElementsByClassName('walkHeart');
  for(var i=1; i<=3; i++) {
    if(petHealth < i) {
      walkHearts[i - 1].src = 'images/greyheart.png';
    } else {
      walkHearts[i - 1].src = 'images/heart.png';
    }
  }
}

function changePlayerMoney(amount) {
  playerMoney += amount;
  moneyCountElement.innerHTML = playerMoney;
  // change the number that the player sees
}

// BRAIN!
function petThink() {
  var foodBowlX = 200;
  var waterBowlX = 220;
  petHunger += Math.random();
  petThirst += Math.random();

  var hungerBar = document.getElementById('hungerBar');
  var decimal = petHunger / 1500;
  var percentage = 100 - (decimal * 100);
  hungerBar.style.width = percentage + "%";

  var thirstBar = document.getElementById('thirstBar');
  var decimal = petThirst / 1500;
  var percentage = 100 - (decimal * 100);
  thirstBar.style.width = percentage + "%";

  var dirtBar = document.getElementById('dirtBar');
  var decimal = petDirtLevel / 1500;
  var percentage = 100 - (decimal * 100);
  dirtBar.style.width = percentage + "%";

  var bathroomBar = document.getElementById('bathroomBar');
  var decimal = petBathroom / 1500;
  var percentage = 100 - (decimal * 100);
  bathroomBar.style.width = percentage + "%";

  if(petHunger > 1000) {
    if(animalX > foodBowlX) {
      moveAnimal(-1, 0);
    } else if(animalX < foodBowlX) {
      moveAnimal(1, 0);
    } else {
      // EAT THE FOOD
      
      if(isBowlFull) {
        petHunger = 4;
        fullBowl.style.display = 'none';
        emptyBowl.style.display = 'block';
        isBowlFull = false;
      }
    }

    petThinkBubble('apple');
  } else if(petThirst > 400) {
    if(gameState == 'walkingGame') {
      return;
    }

    if(animalX > waterBowlX) {
      moveAnimal(-1, 0);
    } else if(animalX < waterBowlX) {
      moveAnimal(1, 0);
    } else {
      // DRINK THE WATER!
      
      if(isWaterBowlFull) {
        petThirst = 4;
        fullWaterBowl.style.display = 'none';
        emptyWaterBowl.style.display = 'block';
        isWaterBowlFull = false;
      }
    }

    petThinkBubble('waterdrop');
  } else {
    myPet.thinkBubble.style.display = 'none';
  }
  
  setTimeout(petThink, 30);
}

function petThinkBubble(thought) {
  // show the think bubble
  // change the text in the think bubble
  var hungerThought = myPet.thinkBubble.getElementsByClassName('hunger thought')[0];
  var thirstThought = myPet.thinkBubble.getElementsByClassName('thirst thought')[0];

  if(myPet.img.style.display == 'none') { // if the pet is not visible, don't show its think bubble
    return false;
  }

  myPet.thinkBubble.style.display = 'block';

  switch(thought) {
    case 'apple': {
      thirstThought.style.display = 'none';
      hungerThought.style.display = 'block';
    } break;
      
    case 'waterdrop': {
      hungerThought.style.display = 'none';
      thirstThought.style.display = 'block';
    } break;
  }
}

//bubbles are my friends ;)
var bubbles = [];
function Bubble(type) {
  var me = this;
  bubbles.push(me);

  me.x = 0;
  me.y = 0;

  me.image = document.createElement('img');
  me.speed = Math.random() * 3.1;
  me.active = true;
  me.type = type;

  document.body.appendChild(me.image);
  me.image.style.width = '100px';
  me.image.style.height = '100px';
  me.image.style.position = 'absolute';
  me.image.style.zIndex = 100;

  me.image.src = 'images/BUBBLE.png';
}

var fallingObjects = [];
function FallingObject(type) {
  var me = this;

  fallingObjects.push(me);

  me.x = 0;
  me.y = 0;
  me.image = document.createElement('img');
  me.speed = 1;
  me.active = true;
  me.type = type;

  document.body.appendChild(me.image);
  me.image.style.width = '100px';
  me.image.style.height = '100px';
  me.image.style.position = 'absolute';
  me.image.style.zIndex = 100;

  switch(type) {
    case 'rock': {
      me.image.src = "images/rock-003.jpg";
      me.speed = 5;
    } break;

    case 'goldenLeash': {
      me.image.src = "images/GOLDENLEASH.png";
      me.speed = 1;
    } break;

    case 'tennisBall': {
      me.image.src = "images/tennisBall.png";
      me.speed = 2;
    } break;

    case 'coin': {
      me.image.src = "images/coin-1-hi.png";
      me.speed = 3;
    } break;

    case 'squirrel': {
      me.image.src = 'images/squirrel.png';
      me.speed = 6;
    } break;


  }
}

function getSum(arrayOfNumbers) {
  var sum = 0;

  for(var index = 0; index < arrayOfNumbers.length; index += 1) {
    var value = arrayOfNumbers[index];
    sum += value;
  }

  return sum;  
}

function getAverage(arrayOfNumbers) {
  var sum = getSum(arrayOfNumbers);

  return sum / arrayOfNumbers.length;
}

function generateObject() {
    var randomNumber = Math.random();

    // var tennisBallChance = 1;
    // var rockChance = 0.9;
    // var coinChance = 0.7;
    // var squirrelChance = 0.5;
    // getAverage([tennisBallChance, rockChance, coinChance, squirrelChance]);

    var type = false;
    if(randomNumber > 0.7) {
      type = 'tennisBall';
    } else if(randomNumber > 0.4) {
      type = 'rock';
    } else if(randomNumber > 0.2) {
      type = 'coin';
    } else if(randomNumber > 0.001) {
      type = 'squirrel';
    } else {
      type = 'goldenLeash';
    }

    var myNewObject = new FallingObject(type);
    var randomX = Math.floor(Math.random() * 1045);
    myNewObject.x = randomX;
}

function initializeWalking() {
  gameState = 'walkingGame';

  changeScreen('sidewalk');

  animalY = -475;
  // myPet.img.style.top = 475 + 'px';
  // myPet.img.style.zIndex = 4;

  for(var objectIndex = 0; objectIndex < 5; objectIndex++) {
    generateObject();
  }
}

function checkCollisionWithPlayer(object) {
  var playerLeftX = animalX;
  var playerRightX = playerLeftX + 120;
  var playerTopY = animalY + 50;
  var playerBottomY = playerTopY - 120;

  var playerPoints = [playerLeftX, playerRightX, playerTopY, playerBottomY];


  var objectLeftX = object.x;
  var objectRightX = objectLeftX + 100;
  var objectTopY = object.y;
  var objectBottomY = objectTopY - 100;

  // compare points and see if they hit
  if(playerLeftX < objectRightX &&
   playerRightX > objectLeftX &&
   playerBottomY < objectBottomY &&
   playerTopY > objectTopY) {
    return true;
  } else {
    return false
  }
}

function tickBubbleGame() {
  for(var bubbleIndex = 0; bubbleIndex < bubbles.length; bubbleIndex++) {
    var bubble = bubbles[bubbleIndex];
    bubble.y += bubble.speed;
    bubble.image.style.left = bubble.x + 'px';
    bubble.image.style.top = -bubble.y + 'px';
  }
}

function tickWalkingGame() {
    for(var fallingObjectIndex = 0; fallingObjectIndex < fallingObjects.length; fallingObjectIndex++) {
    var currentObject = fallingObjects[fallingObjectIndex];

    if(currentObject.active) {
      currentObject.y -= currentObject.speed;
      currentObject.image.style.left = currentObject.x + 'px';
      currentObject.image.style.top = -currentObject.y + 'px';

      if(currentObject.y < -550) {
        currentObject.active = false;
        generateObject();
        currentObject.image.style.display = 'none';
      }
    }

    // check if we're hitting the player
    if(currentObject.active) {
      var collidingWithPlayer = checkCollisionWithPlayer(currentObject);
      if(collidingWithPlayer) {
        switch(currentObject.type) {
          case 'coin': {
            changePlayerMoney(5);
          } break;

          case 'tennisBall': {
            changePlayerMoney(1);
          } break;

          case 'squirrel': {
            changePlayerMoney(10);
          } break;

          case 'rock': {
            changePetHealth(-1);
            redScreen.style.display = 'block';
            setTimeout(function() {
              redScreen.style.display = 'none';
            }, 330);

            if(petHealth <= 0) {
              changeScreen('walkMiniGameOverScreen');
              continue;
            }
          } break;

          case 'goldenLeash': {
            items["Golden Leash"].changeCount(1);
          } break;
        }

        currentObject.active = false;
        generateObject();
        currentObject.image.style.display = 'none';
      }
    }
  }

  var xDirection = 0;
  if(leftPressed) {
    xDirection -= 1;
  }

  if(rightPressed) {
    xDirection += 1;
  }

  moveAnimal(xDirection * animalSpeed, yDirection);
}

function update() {
  if(gameState == 'walkingGame') {
    tickWalkingGame();
  }

  if(gameState == 'bubbleGame') {
    tickBubbleGame();
  }

  // move all the current flying images
  for(var imageIndex = 0; imageIndex < flyingItems.length; imageIndex++) {
    var flyingItem = flyingItems[imageIndex];
    var currentTop = parseInt(flyingItem.style.top);
    if(currentTop < 90) {
      flyingItem.parentNode.removeChild(flyingItem);
      flyingItems.splice(imageIndex, 1);
      imageIndex -= 1;
    }

    flyingItem.style.top = currentTop - 10 + 'px';
  }

  setTimeout(update, 10);
}

update();

function moveAnimal(x, y) {
  animalX += x;
  animalY += y;

  if(animalX < 0) {
    animalX = 0;
  } else if(animalX > 1045 - 120) {
    animalX = 1045 - 120;
  }

  myPet.img.style.left = animalX + 'px';
  myPet.img.style.top = -animalY + 'px';
  myPet.thinkBubble.style.left = animalX + 50 + 'px';
  myPet.thinkBubble.style.top = -animalY - 83 + 'px';
}

var dogImages = [
  'bowdog.png',
  'dog.gif',
  'beagledog_2.png',
  'peanut.png',
  'mainPagePuppy.png',
  'husky.png',
  'blackeared.jpeg',
  'Unknown-1.png',
  'harryPotterDog.png'
  // 'funnydog.jpeg',
  // 'hotdog.jpeg'
];

for(var dogIndex = 0; dogIndex < dogImages.length; dogIndex++) {
  new Dog(dogImages[dogIndex]);
}

if(Math.random() > 0.8) {
  new Dog('hotdog.png');
} else {
  new Dog('funnydog.png');
}

var imageIndex = Math.floor(Math.random() * 3);
if(imageIndex == 3) {
  imageIndex = 2;
}

// for(var dogIndex = 0; dogIndex < 5; dogIndex++) {
//   dogImages[imageIndex]
//   new Dog();
// }

// var badStuff = [];

function Dog(image) {
  var me = this;

  me.image = image;

  me.name = false;
  me.age = Math.floor(2 + (Math.random() * 7));
  me.price = Math.floor(400 + (Math.random() * 280));
  me.gender = Math.random() > 0.5 ? 'male' : 'female';
  me.screen = false;
  me.caged = true;

  var tastesClone = tastes.slice(0);

  me.likes = [];
  me.dislikes = [];

  for(var tasteIndex = 0; tasteIndex < 3; tasteIndex++) {
    var randomIndex = Math.floor(Math.random() * tastesClone.length - 1);
    var randomTaste = tastesClone[randomIndex];
    tastesClone.splice(randomIndex, 1);
    me.likes.push(randomTaste);
  }

  for(var tasteIndex = 0; tasteIndex < 3; tasteIndex++) {
    var randomIndex = Math.floor(Math.random() * tastesClone.length - 1);
    var randomTaste = tastesClone[randomIndex];
    me.dislikes.push(randomTaste);
  }

  var someTaste = tastes.pop();

  me.img = document.createElement('img');
  me.img.src = 'images/dogs/' + me.image;

  me.thinkBubble = document.createElement('div');
  me.thinkBubble.className = 'thinkBubble';

  var bubble = document.createElement('img');
  bubble.className = 'bubble';
  bubble.src = 'images/thinkBubble.png';
  me.thinkBubble.appendChild(bubble);

  var hungerThought = document.createElement('img');
  hungerThought.className = 'hunger thought';
  hungerThought.src = 'images/hunger.png';
  var thirstThought = document.createElement('img');
  thirstThought.className = 'thirst thought';
  thirstThought.src = 'images/Water_Droplet_Pin.PNG';
  me.thinkBubble.appendChild(hungerThought);
  me.thinkBubble.appendChild(thirstThought);
  document.body.appendChild(me.thinkBubble);

  var dogSelection = document.getElementById('selectableDogs');
  dogSelection.appendChild(me.img);

  me.show = function() {
    me.img.style.display = 'block';
    me.thinkBubble.style.display = 'block';
  }

  me.hide = function() {
    me.img.style.display = 'none';
    me.thinkBubble.style.display = 'none';
  }

  me.img.addEventListener('click', function() {
    if(petName == false) {
      var temporaryName = prompt("Name your dog.");

      if(!temporaryName) {
        return false;
      }

      petName = temporaryName;

      changePlayerMoney(-me.price);

      var petAgeElement = document.getElementById('petAge');
      petAgeElement.innerHTML = "Age: " + me.age + " months";

      me.name = petName;
      var petNameElement = document.getElementById('petName');
      petNameElement.innerHTML = petName;

      dogSelection.style.display = 'none';
      changeScreen('house');

      myPet = me;
      me.img.className = 'petImage';
      me.img.style.display = 'none';
      document.body.appendChild(me.img);
      // myPet.img = img;
    }
  });
}

// Dear Computer,
// Please make a class for me!

//   Thanks,
//     Your Friend,
//                 Jacqueline McVeigh

var carrotCake = new ShopItem('Carrot Cake', 18, 'carrotCake.png', 'marketStall');
var carrotCakeRecipe = new Recipe(carrotCake, ['Carrots', 'Flour', 'Sugar']);
var chocolateCake = new ShopItem('Chocolate Cake', 20, 'chocolateCake.png', 'marketStall');
var chocolateCakeRecipe = new Recipe(chocolateCake, ['Chocolate Chips', 'Chocolate Chips', 'Flour', 'Sugar']);
function Recipe(item, ingredients) {
  this.item = item;
  this.ingredients = ingredients;
  recipes.push(this);
}

var shampoo = new ShopItem('Shampoo', 6, 'shampoo 1.png', 'supply');
var leash = new ShopItem('Leash', 8, 'BasicDogLeash.png', 'supply');
var goldenLeash = new ShopItem('Golden Leash', 5000000000, 'GOLDENLEASH.png', 'supply');
var dogFood = new ShopItem('Dog Food', 5, 'bag-original.png', 'supply');
var water = new ShopItem('Water', 2, 'Plastic-water-bottle.png', 'supply');

var blueberries = new ShopItem('Blueberries', 5, 'blueberries.png', 'grocery');
var carrots = new ShopItem('Carrots', 10, 'carrots!.png', 'grocery');
var flour = new ShopItem('Flour', 12, 'flour.png', 'grocery');
var sugar = new ShopItem('Sugar', 4, 'sugar.png', 'grocery', 'SUGARCUBES.png');
var chocolateChips = new ShopItem('Chocolate Chips', 7, 'chocolateChips.png', 'grocery');

function ShopItem(title, price, imageURL, whichShop, portionImageURL) {
  if(portionImageURL == null) {
    portionImageURL = imageURL;
  }

  var me = this;

  me.title = title;
  me.price = price;
  me.ownedAmount = 0;
  items[me.title] = this;

  var div = document.createElement('div');
  div.className = 'shopItem';

  var inventoryDiv = document.createElement('div');
  inventoryDiv.className = 'item';

  var imgTag = document.createElement('img');
  imgTag.src = 'images/' + imageURL;

  inventoryDiv.appendChild(imgTag);

  var nameDiv = document.createElement('div');
  nameDiv.innerHTML = title;
  nameDiv.className = 'title';
  inventoryDiv.appendChild(nameDiv);

  var amountOfItem = document.createElement('div');
  amountOfItem.innerHTML = "1";
  inventoryDiv.appendChild(amountOfItem);
  inventoryDiv.style.display = 'none';

  if(whichShop == 'grocery') {
    ingredientShelf.appendChild(inventoryDiv);
  } else {
    inventoryScreen.appendChild(inventoryDiv);

    // if(whichShop == 'marketStall') {
    //   // also add to marketStall
    //   var marketStallDisplay = document.getElementById('marketStallDisplay');
    //   marketStallDisplay.appendChild(inventoryDiv);
    // }
  }

  this.changeCount = function(amount) {
    items[me.title].ownedAmount += amount;
    inventoryDiv.style.display = 'inline-block';
    // console.log(items[title]);
    amountOfItem.innerHTML = items[title].ownedAmount;

    if(items[title].ownedAmount == 0) {
      // remove from my inventory
      inventoryDiv.style.display = 'none';
    } else {
      inventoryDiv.style.display = 'inline-block';
    }
  }

  inventoryDiv.addEventListener('click', function(event) {
      amountOfItem.innerHTML = items[title].ownedAmount;

      if(gameState == 'choosingItemsToSell') {
        changePlayerMoney(me.price);
        me.changeCount(-1);
        alert('You have now earned ' + me.price + ' coins!');
      } else {

        switch(title) {
          case 'Dog Food': {
            items[title].ownedAmount -= 1;
            fullBowl.style.display = 'block';
            emptyBowl.style.display = 'none';
            isBowlFull = true;
          } break;

          case 'Water' : {
            items[title].ownedAmount -= 1;
            fullWaterBowl.style.display = 'block';
            emptyWaterBowl.style.display = 'none';
            isWaterBowlFull = true;
          } break;

          case 'Leash' : {
            // inventoryItems[title] -= 1;
            alert('To go for a walk, click on the door.');
          } break;

          case 'Shampoo': {
            // inventoryItems[title] -= 1;
            alert('warning!! not done yet');
          } break;
        }

        if(whichShop == 'grocery') {
            var flyingItem = document.createElement('img');
            flyingItem.src = 'images/' + portionImageURL;
            flyingItem.className = 'flyingItem';
            flyingItem.style.left = event.clientX + 'px';
            flyingItem.style.top = event.clientY + 'px';
            flyingItems.push(flyingItem);
            document.body.appendChild(flyingItem);

            mixingBowlContents.push(title);
        }

        if(whichShop != 'grocery') {
          goBack();
        }
      }
  });

  div.addEventListener('click', function() {
    var playerAnswer = confirm('Are you sure that you would like to buy this item?');

    if(playerAnswer == true) {
      if(price > playerMoney) {
        alert("Sorry, you don't have enough coins to buy this item. You will need to get more coins if you would like to buy this item.");
      } else {
        // give the player one of those items and take money from them

        changePlayerMoney(-price);
        alert("You can now find this item in your inventory");

        var noItemDiv = document.getElementById('noItems');
        noItemDiv.style.display = 'none';

        me.changeCount(1);
      }
    }
  });

  me.image = document.createElement('img');
  me.image.src = 'images/' + imageURL;

  var nameDiv = document.createElement('div');
  nameDiv.innerHTML = '<b>' + title + '</b>';
  var priceDiv = document.createElement('div');
  priceDiv.innerHTML = '<b>' + price + '</b>';

  div.appendChild(me.image);
  div.appendChild(nameDiv);
  div.appendChild(priceDiv);

  if(whichShop == "supply") {
    supplyShop.appendChild(div);
  } else if(whichShop == 'grocery') {
    groceryStoreInternal.appendChild(div);
  }
}

function keyDown(eventData) {
  if(eventData.keyCode == 37) {
    // left arrow

    // moveAnimal(-5, 0);
    leftPressed = true;
  } else if(eventData.keyCode == 39) {
    // right arrow
    rightPressed = true;
  } else if(eventData.keyCode == 38) {
    // up arrow
  } else if(eventData.keyCode == 40) {
    // down arrow
  }
}

function keyUp(eventData) {
  if(eventData.keyCode == 37) {
    // left arrow
    // moveAnimal(-5, 0);
    leftPressed = false;
  } else if(eventData.keyCode == 39) {
    // right arrow
    // moveAnimal(5, 0);
    rightPressed = false;
  } else if(eventData.keyCode == 38) {
    // up arrow
  } else if(eventData.keyCode == 40) {
    // down arrow
  }
}
