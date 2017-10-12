var glslify = require('glslify')
var vert = glslify('./bg.vert')
var frag = glslify('./bg.frag')

function createBackground (opt) {
  opt = opt || {}

  // Geometry
  var geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(-3, -3, 0),
    new THREE.Vector3(3, -3, 0)
  )
  geometry.faces.push(new THREE.Face3(0, 1, 2))

  // Maetrial with default values
  var material = new THREE.RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    side: THREE.FrontSide,
    uniforms: {
      aspectCorrection: { type: 'i', value: true },
      aspect: { type: 'f', value: 1 },
      grainScale: { type: 'f', value: 0.001 },
      grainTime: { type: 'f', value: 0 },
      noiseAlpha: { type: 'f', value: 0.5 },
      offset: { type: 'v2', value: new THREE.Vector2(0, 0) },
      scale: { type: 'v2', value: new THREE.Vector2(1, 1) },
      smoother: { type: 'v2', value: new THREE.Vector2(0.0, 0.5) },
      // smoother: { type: 'v2', value: new THREE.Vector2(0.0, orientation === 'landscape' ? 0.5 : 5) },
      color1: { type: 'c', value: new THREE.Color('#333333') },
      color2: { type: 'c', value: new THREE.Color('#FFFFFF') }
    },
    depthTest: false
  })

  var mesh = new THREE.Mesh(geometry, material)
  mesh.rotateZ(45 * Math.PI / 180)
  mesh.frustumCulled = false
  mesh.style = style
  mesh.name = 'background'
  if (opt) mesh.style(material, opt)

  return mesh
}

function style (material, opt) {
  opt = opt || {}

  if (Array.isArray(opt.colors)) {
    var colors = opt.colors.map(function (c) {
      if (typeof c === 'string' || typeof c === 'number') {
        return new THREE.Color(c)
      }
      return c
    })
    material.uniforms.color1.value.copy(colors[0])
    material.uniforms.color2.value.copy(colors[1])
  }

  if (typeof opt.aspect === 'number') {
    material.uniforms.aspect.value = opt.aspect
  }

  if (typeof opt.grainScale === 'number') {
    material.uniforms.grainScale.value = opt.grainScale
  }
  if (typeof opt.grainTime === 'number') {
    material.uniforms.grainTime.value = opt.grainTime
  }

  if (opt.smooth) {
    var smooth = fromArray(opt.smooth, THREE.Vector2)
    material.uniforms.smooth.value.copy(smooth)
  }

  if (opt.offset) {
    var offset = fromArray(opt.offset, THREE.Vector2)
    material.uniforms.offset.value.copy(offset)
  }

  if (typeof opt.noiseAlpha === 'number') {
    material.uniforms.noiseAlpha.value = opt.noiseAlpha
  }

  if (typeof opt.scale !== 'undefined') {
    var scale = opt.scale
    if (typeof scale === 'number') {
      scale = [scale, scale]
    }
    scale = fromArray(scale, THREE.Vector2)
    material.uniforms.scale.value.copy(scale)
  }

  if (typeof opt.aspectCorrection !== 'undefined') {
    material.uniforms.aspectCorrection.value = Boolean(opt.aspectCorrection)
  }
}

function fromArray (array, VectorType) {
  if (Array.isArray(array)) {
    return new VectorType().fromArray(array)
  }
  return array
}

module.exports = createBackground
