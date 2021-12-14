/* Sounds of the City

I wanted to use PoseNet to detect movements of different body parts, like the wrists, shoulders, etc, and play a sound for each specific body part. 

I have chosen four points to focus on that would trigger sounds:
- Left Hand: sound of crouwd talking | mp3 from: https://www.soundjay.com/crowd-talking-1.html#google_vignette
- Right Hand: Parotia
- Left Shoulder: Nightingale 
- Right Shoulder: Raven

Inspired by:
https://experiments.withgoogle.com/ai/bird-sounds/view/

Bird Call Source:
https://www.xeno-canto.org/

Code references:
- https://editor.p5js.org/niccab/sketches/utn2z7iGW
- https://editor.p5js.org/son/sketches/rJcVOAI0Q

*/
// Code for snowflakes taken from: https://p5js.org/examples/simulate-snowflakes.html


let video;
let poseNet;
let poses = [];
let skeletons = [];
let talking, bells;
let snowflakes = [];

function preload() {

//  //loading sounds

  talking = loadSound("talking.mp3");
  bells = loadSound("bells.mp3");
 
}

function setup() {
    
  createCanvas(windowWidth, windowHeight);
//  video = createCapture(VIDEO);
//  video.size(width, height);
    
//  frameRate(30);
//  bg = loadImage('rainforest.jpg');
  
//  createCanvas(650, 742);

//  talking.loop();
//  bells.loop();

   
    

  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
//  background(bg);
//  strokeWeight(5);
//  stroke(0);
    
image(video, 0, 0, width, height);
    
    
    let s = 'Wave at the screen to listen to the sounds of the city!';
fill(255, 255, 255);
    textSize(32);
text(s, 100, 100, 400, 200); // Text wraps within text box
    
  

    
    //---------------------------------------------------------------------------------------
      let t = frameCount / 60; // update time
          
           // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
    
     //---------------------------------------------------------------------------------------
    
    for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {

      //Left Wrist
      let leftWrist = poses[i].pose.keypoints[9];
      if (leftWrist.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
   
        pop();

        //talking.rate(map(constrain(leftWrist.position.y, 0, height), height, 0, 0.25, 2));
         if (bells.isPlaying()){
              console.log("continue bells");
              getAudioContext().resume();
          }
          else{
              console.log("start bells");
              bells.play();
          }  
      }
//        else{
//            talking.stop()
//        }

      //Right Wrist
      let rightWrist = poses[i].pose.keypoints[10];
      if (rightWrist.score > 0.2) {
        push();
        fill(0, 0, 255);
        noStroke();
          
//        image attached to wrist
          
//        bopr.size(50, 50);
//        bopr.position(rightWrist.position.x, rightWrist.position.y, 10, 10, 10, 10);
          pop();

          //displaying "continue bells" in the console to find out whether motion is being detected according to the accuracy value specified in the code. My console displayed "continue bells" each time a hand was waved in front of the screen and sound was played as well. The only issue was that the sound would play at every instance when the motion of the hand was detected.
          
        //bells.rate(map(constrain(rightWrist.position.y, 0, height), height, 0, 0.25, 2));
          if (bells.isPlaying()){
              console.log("continue bells");
              getAudioContext().resume();
          }
          else{
              console.log("start bells");
              bells.play();
          }

      }
//        else{
//            bells.stop();
//        }
    }
  }    
} //draw function closes here

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  }
  
  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
