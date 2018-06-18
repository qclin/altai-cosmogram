var canvas;

var agent;
var envFig;
var imgMode;
var palette = [];
var chooseIndex
var vector;
var gradients = [];

var constant = 250;
var angle = 0.05;
var scalar = 400;
var speed = 0.005;
var t;

var agentX;
var agentY;
var agent_type = [ "common", "elemental", "isolation", "recognition", "social", "couple", "influencer", "predator", "sensor", "trans"]
var agent_family = ["animal", "humanoid", "min", "spirit", "electronic", "mechanic", "plant"]

// TODO: refactor to network request for image
var env_type = ["apline_meadow", "highland_forest", "lowland_prairie", "tundra", "glacier", "highland_prairie", "swamp_forest"]
var env_mode = ["land", "por"]


function preload() {
  var chooseAgentType = agent_type[Math.floor(Math.random(agent_type.length) * agent_type.length)]
  var chooseAgentFamily = agent_family[Math.floor(Math.random(agent_family.length) *agent_family.length)]
  // var agentPath = `./assets/agents/${chooseAgentType}/${chooseAgentFamily}.svg`
  var agentPath = "./assets/test_mask.png"


  var chooseEnvType = env_type[Math.floor(Math.random(env_type.length) * env_type.length)]
  imgMode = env_mode[Math.floor(Math.random(env_mode.length) * env_mode.length)]
  var envPath = `./assets/environment/${chooseEnvType}/${imgMode}/00.jpg`
    // environment = loadImage("../assets/environment/apline_meadow/64112719-shavlinskoe-lake-in-the-altai-mountains-ust-koksinsky-district-in-september.jpg");
  // agent = loadImage("./assets/test_agent.png");
  agent = loadImage("./assets/grass.jpg");
  agentMask = loadImage(agentPath);

  envFig = loadImage(envPath);
}


function setup() {
  // here we extract some colors from environment
  canvas = createCanvas(1280, 1280);
  image(envFig, 0, 0);
  image(agent, 0, 0);

  for(var i=0; i<10; i++){
    var x = floor(random(0, envFig.width))
    var y = floor(random(0, envFig.height))
    var color = get(x, y);
    palette.push(color);
  }
  // canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

  // choose vector & setup conditions
  // vector = new Diffuser(width, height);
  // vector = new Conway(width, height);

  vector = new gLife(width, height, palette);
  vector.setup();

  setInterval(addDialog, 2000);


  chooseIndex = Math.floor(Math.random(palette.length) * palette.length)

  agentX = 0
  agentY = 0
  t=0;

  agent.mask(agentMask);
}

function addDialog(){
  // var dialogAmt = floor(random(1, 7));
  //
  // for(var i = 0; i < dialogAmt; i++){
    if(gradients.length > 10){
      gradients.splice(0, 1);
    }
    var dialogRange = [2, 4, 6]
    var quantity = dialogRange[floor(random(dialogRange.length))];
    var gradient = new Gradient(palette, quantity);
    gradient.setup();
    gradients.push(gradient)
  // }
}


function draw() {
  // Step 1 Environment
  // background(palette[chooseIndex]);
  background(255);
  if(imgMode == 'land'){
    image(envFig, 0, 280);
  }else{
    image(envFig, 0, 0);
  }

  // Step 2 Imprint
  // vector.display();

  // Step 2.1 Dialogs
  for(var i =0; i < gradients.length; i ++){
    gradients[i].display();
  }

    // Step 3 Agent

  push();
  translate(width/2, height/2);
	for (var i = 0; i < 6; i++) {
		push();
		rotate(TWO_PI * i / 6);

		// line(0, 0, height/3,height/3);
    for(var j =0; j < height/3; j+= 50){
      stroke(0);
      strokeWeight(1);
      line(j, j, j+30, j+30);
      line(j+40, j+40, j+45, j+45);
    }
		pop();
	}
  print(noise(t));
  agentX = sin(angle) * scalar //* noise(t);
  agentY = cos(angle) * scalar //* noise(t);
  image(agent, agentX, agentY ,agent.width/8, agent.height/8);
  angle = angle + speed;
  pop();

  t = t + 0.01;

  if (frameCount % 600 == 0) {
  	background(255);
  }
}
