var canvas;

var agent;
var environment;
var palette = [];

var agent_type = [ "common", "elemental", "isolation", "recognition", "social", "couple", "influencer", "predator", "sensor", "trans"]
var agent_family = ["animal", "humanoid", "min", "spirit", "electronic", "mechanic", "plant"]

var agentPath = `./assets/agents/${random(agent_type)}/${random(agent_family)}.svg`
print(agent)

var env_type = ["apline_meadow", "highland_forest", "lowland_prairie", "tundra", "glacier", "highland_prairie", "swamp_forest"]



function preload() {
    environment = loadImage("../assets/environment/apline_meadow/64112719-shavlinskoe-lake-in-the-altai-mountains-ust-koksinsky-district-in-september.jpg");
    agent = loadImage("../assets/agents/elemental/elemental_02.png");
}


function setup() {
  // here we extract some colors from environment
  image(environment, 0, 0);

  for(var i=0; i<5; i++){
    var color = get(random(0, width), random(0, height));
    palette.push(color);
  }
  canvas = createCanvas( 0.618 * window.innerHeight, window.innerHeight); // create a protrait frame with golden ratio

}


function draw() {

  // Step 1 Environment
  image(environment, 0,0);

  // Step 2 Imprint


  // Step 3 Agent
  image(agent, width/2 - agent.width/2, height/2 - agent.height/2);

}
