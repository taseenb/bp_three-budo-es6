const isMobile = require('ismobilejs').any
const OrbitControls = require('three-orbit-controls')(THREE)
const UI = require('./ui')
const stats = require('./stats')
const createBackground = require('./bg/bg')

let time, delta, clock
let renderer, scene, camera, controls
let ambientLight, pointLight
let width, height
let bg, cube

function init () {
  // Setup ui (optional)
  const ui = new UI().appendStats(stats.dom).removeLoader()

  // Setup resize events
  window.addEventListener('resize', onResize, false)
  onResize()

  // Setup three.js
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  })
  renderer.setPixelRatio(1)
  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)
  camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 50)
  controls = new OrbitControls(camera, document.body)
  camera.position.z = 5

  // Background (only on desktop > buggy on mobile)
  if (!isMobile) {
    bg = createBackground({
      colors: ['#FFFFFF', '#CCCCCC'] // colors: ['#666666', '#333333']
    })
    scene.add(bg)
  }

  // Test mesh
  scene.add(new THREE.AmbientLight())
  const p1 = new THREE.PointLight('#FFF', 1, 20, 2)
  const p2 = new THREE.PointLight('#FFF', 1, 20, 2)
  p1.position.set(0, 4, 0)
  p2.position.set(-4, 0, 0)
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#325453' })
  )
  scene.add(p1, p2, cube)

  clock = new THREE.Clock()
}

function onResize () {
  const w = (width = window.innerWidth)
  const h = (height = window.innerHeight)

  if (renderer && camera) {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
}

function update () {
  stats.begin()
  delta = Math.min(clock.getDelta() * 4, 1) // safety cap on large deltas
  time = clock.elapsedTime
  render(time, delta)
  stats.end()

  window.requestAnimationFrame(update)
}

function render (time, delta) {
  cube.rotation.y += 0.02
  cube.rotation.z += 0.01
  renderer.render(scene, camera)
}

init()
update()
