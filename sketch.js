let primes_raw
let amount = 1
let fps = 60
let capturer = new CCapture({ format: 'png', framerate: fps });

function preload() {
  //Load primes from txt
  primes_raw = loadStrings('primes1.txt')
}

function setup() {
  createCanvas(1080, 1080);
  capturer.start();
  //Formating the string
  pre = " "
  cur_numb = ""
  primes = []
  for (line of primes_raw) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] == -" " && pre == " ") {
        pre = line[i]
        continue
      } else if (line[i] == " " && pre != " ") {
        primes.push(cur_numb)
        cur_numb = ""
        pre = line[i]
        continue
      } else if (line[i] != " ") {
        pre = line[i]
        cur_numb = cur_numb + line[i]
      }
    }
  }

}

function draw() {
  //Creating zooming out effect
  amount -= amount / 100
  //Adding an endpoint
  if (amount < 0.00001) {
    noLoop()
    print("Finished")
    capturer.stop()
    capturer.save()
  }
  background(0);
  //Drawing Spirals
  push()
  translate(width / 2, height / 2)
  fill(255)
  noStroke()
  for (numb of primes) {
    let x = numb * cos(numb) * amount
    let y = numb * sin(numb) * amount
    ellipse(x, y, 2, 2)
    //Stoping the drawing of points not on canvas
    if (dist(0, 0, x, y) * amount > width / 2) {
      break
    }
  }
  pop()
  //Capturing the frame
  capturer.capture(document.getElementById('defaultCanvas0'));

}
