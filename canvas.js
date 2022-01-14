

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


const colors = ['#0069C4', '#0087E0', '#00ADF7', '#00D8DB', '#FAE900'
  , '#F2059F', '#00DFB3', '#6805F2', '#F2E205', '#F24405']

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// particles
class Particles {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * 2 * Math.PI;
    this.velocity = 0.05;
    this.distanceFromOrigin = randomIntFromRange(50, 120);
    this.lastMouse = {
      x: x,
      y: y
    }

    this.update = () => {
      const lastPoint = {
        x: this.x,
        y: this.y
      }
      this.radians += this.velocity

      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05
      console.log((mouse.x - this.lastMouse.x) * 0.05);

      this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromOrigin
      this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromOrigin

      this.draw(lastPoint)

    }
    this.draw = lastPoint => {
      c.beginPath()
      c.strokeStyle = this.color;
      c.lineWidth = this.radius;
      c.moveTo(lastPoint.x, lastPoint.y);
      c.lineTo(this.x, this.y);
      c.stroke();
      c.closePath()
    }
  }



}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 60; i++) {
    particles.push(new Particles(canvas.width / 2, canvas.height / 2,
      randomIntFromRange(1, 3), randomColor(colors)))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(255,255,255,0.03'
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(part => {
    part.update()
  })
}

init()
animate()
