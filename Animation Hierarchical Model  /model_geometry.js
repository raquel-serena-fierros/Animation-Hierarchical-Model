function cube(w, l, h, r) {
	
    let coords = [
      vec2(0, r), vec2(r * w/l, r),
      vec2(0, 0), vec2(r * w/l, 0),
      vec2(0, r), vec2(r * w/l, r),
      vec2(0, 0), vec2(r * w/l, 0),
      vec2(0, r), vec2(r * l/h, r),
      vec2(0, 0), vec2(r * l/h, 0),
      vec2(0, r), vec2(r * l/h, r),
      vec2(0, 0), vec2(r * l/h, 0),
      vec2(0, r), vec2(r * w/h, r),
      vec2(0, 0), vec2(r * w/h, 0),
      vec2(0, r), vec2(r * w/h, r),
      vec2(0, 0), vec2(r * w/h, 0)
    ]
	
    let indices = []
    for (let i = 0; i < 6; i++) {
      indices.push(0 + i * 4)
      indices.push(1 + i * 4)
      indices.push(2 + i * 4)
      indices.push(2 + i * 4)
      indices.push(1 + i * 4)
      indices.push(3 + i * 4)
    }
  
  let col = [
    vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0),
    vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0),
    vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0),
    vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0),
    vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0),
    vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0), vec3(1.0, 0, 0),
  ]
 
  let norm = [
    vec4(0, 1, 0, 0), vec4(0, 1, 0, 0), vec4(0, 1, 0, 0), vec4(0, 1, 0, 0),
    vec4(0, -1, 0, 0), vec4(0, -1, 0, 0), vec4(0, -1, 0, 0), vec4(0, -1, 0, 0),
    vec4(-1, 0, 0, 0), vec4(-1, 0, 0, 0), vec4(-1, 0, 0, 0), vec4(-1, 0, 0, 0),
    vec4(1, 0, 0, 0), vec4(1, 0, 0, 0), vec4(1, 0, 0, 0), vec4(1, 0, 0, 0),
    vec4(0, 0, 1, 0), vec4(0, 0, 1, 0), vec4(0, 0, 1, 0), vec4(0, 0, 1, 0),
    vec4(0, 0, -1, 0), vec4(0, 0, -1, 0), vec4(0, 0, -1, 0), vec4(0, 0, -1, 0)
  ]
 
  let vert = [
    vec4(-w/2, h/2, l/2, 1), vec4(w/2, h/2, l/2, 1),
    vec4(-w/2, h/2, -l/2, 1), vec4(w/2, h/2, -l/2, 1),
    vec4(-w/2, -h/2, l/2, 1), vec4(w/2, -h/2, l/2, 1),
    vec4(-w/2, -h/2, -l/2, 1), vec4(w/2, -h/2, -l/2, 1),
    vec4(-w/2, h/2, l/2, 1), vec4(-w/2, h/2, -l/2, 1),
    vec4(-w/2, -h/2, l/2, 1), vec4(-w/2, -h/2, -l/2, 1),
    vec4(w/2, h/2, l/2, 1), vec4(w/2, h/2, -l/2, 1),
    vec4(w/2, -h/2, l/2, 1), vec4(w/2, -h/2, -l/2, 1),
    vec4(-w/2, h/2, l/2, 1), vec4(w/2, h/2, l/2, 1),
    vec4(-w/2, -h/2, l/2, 1), vec4(w/2, -h/2, l/2, 1),
    vec4(-w/2, h/2, -l/2, 1), vec4(w/2, h/2, -l/2, 1),
    vec4(-w/2, -h/2, -l/2, 1), vec4(w/2, -h/2, -l/2, 1),
  ]
  return new Geometry(vert, col, norm, coords, indices)
}

var surfaceRevol = 
  {

	 input: 0,	
	 rotation: 80,
     genatrix: 40,

	  TOWER: { curve: HanoiTowerVase_Curve, derivative: HanoiTowerVase_Derivative },
	  POT: { curve: pot_Curve, derivative: pot_Derivative }

  }

function HanoiTowerVase_Curve(t) {
  return Math.sin(-.5 * t*Math.PI) / 4 + Math.sin(t*5*Math.PI + Math.PI) / 5.5 + .45
}

function HanoiTowerVase_Derivative(t) {
  return -Math.PI *.5/ 4 * (Math.cos(Math.PI * t) + 5 * Math.cos(4.5*Math.PI*t))
}

function pot_Curve(t) {

 return 0.3 * Math.sin(-1 * t*Math.PI) + 0.35
}

function pot_Derivative(t) {

  return -Math.PI / 7* Math.cos(Math.PI * t)
}

function bg(t, s) {
  return vec4(0.3, 0.3, 0.8, 1.0)
}

function multMatVec(u, v) {
  for ( var i = 0; i < u.length; ++i ) {
      if ( u[i].length != v.length ) {
      }
  }

  let res = [];
  for ( var i = 0; i < u.length; ++i ) {
    let sum = 0;
    for ( var j = 0; j < u[i].length; ++j ) {
      sum += u[i][j] * v[j];
    }
    res.push( sum );
  }

  return res;
}
function planeY(w,l,texRepeat) {
  let vertices = [
    vec4(-w/2, 0, l/2, 1), vec4(w/2, 0, l/2, 1),
    vec4(-w/2, 0, -l/2, 1), vec4(w/2, 0, -l/2, 1)
  ]
  let normals = [vec4(0, 1, 0, 0), vec4(0, 1, 0, 0), vec4(0, 1, 0, 0), vec4(0, 1, 0, 0)]
  let colors = [vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)]
  let texCoords = [
    vec2(0, texRepeat), vec2(texRepeat * w/l, texRepeat),
    vec2(0, 0), vec2(texRepeat * w/l, 0)
  ]
  let indices = [0,1,2,2,1,3];
  return new Geometry(vertices, colors, normals, texCoords, indices)
}

function surfaceOfRevolution(surface, col, f, r) {
 
  let indices = [];
  
  let colors = [];
  
  let coords = [];
  let wire = [];
  let ndv = [];
  let nt = 0;
 
  let vs = [];
  let maxZ = 0;
  let normals = [];
  for (let t = 1; t >= -1.01; t -= 2 / (f)) {
    let gen = surface.curve(t);
    maxZ = Math.max(maxZ, gen);
    const baseVec = vec4(gen, t, 0, 1);
    for (let theta = 0; theta <= 360; theta += 360 / r) {
      const rot = rotateY(theta)
      let vert = multMatVec(rot, baseVec);
      let slope = surface.derivative(t);
      const norm = normalize(vec4(Math.cos(radians(theta)), -slope, Math.sin(radians(theta)), 0), true);
      normals.push(norm);
	   colors.push(col(theta, t));
	  vs.push(vert);
      
     
      let ss = theta/360 * 2 * Math.PI
      let tt = (t + 1) / 2
      coords.push(vec2(ss * 2, tt * 2));
      ndv.push(vert);
      ndv.push(add(vert, scale(0.1, norm)));
    }
  }
  const sub = [0,1,2,2,1,3];
  const ws = [1,0,0,2,2,1,1,3,3,2];
  for (let i = 0; i < f; i++) {
    for (let j = 0; j < r; j++) {
      let quad = [
        (r + 1) * (i) + j, (r + 1) * (i) + (j + 1),
        (r + 1) * (i + 1) + j, (r + 1) * (i+1) + (j + 1)
      ];
      for (let k = 0; k < ws.length; k++) {
        wire.push(quad[ws[k]])
      }
      for (let k = 0; k < sub.length; k++) {
        indices.push(quad[sub[k]])
      }
      nt += 2;
    }
  }
  return new Geometry(vs, colors, normals, coords, indices)
}

function Geometry(positions, colors, normals, texCoords, indices) {
  this.positions = positions
  this.colors = colors
  this.normals = normals
  this.texCoords = texCoords
  this.indices = indices
  this.initialized = false
}

Geometry.prototype.initGL = function (gl) {
  if (!this.initialized) {
    this.buffers = {
      position: gl.createBuffer(),
      color: gl.createBuffer(),
      normal: gl.createBuffer(),
      texCoord: gl.createBuffer(),
      index: gl.createBuffer()
    }
  }
  this.sendData(gl)
}

Geometry.prototype.sendData = function (gl) {
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position)
  gl.bufferData(gl.ARRAY_BUFFER, flatten(this.positions), gl.STATIC_DRAW)

  if (typeof this.colors !== 'undefined') {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW)
  }

  if (typeof this.normals !== 'undefined') {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), gl.STATIC_DRAW)
  }

  if (typeof this.texCoords !== 'undefined') {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.texCoords), gl.STATIC_DRAW)
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(this.indices)), gl.STATIC_DRAW)
}

Geometry.prototype.enableAttributes = function (gl, locs) {
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position)
  gl.vertexAttribPointer(locs.position, 4, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(locs.position)

  if (locs.color !== -1) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color)
    gl.vertexAttribPointer(locs.color, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(locs.color)
  }

  if (locs.normal !== -1) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal)
    gl.vertexAttribPointer(locs.normal, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(locs.normal)
  }

  if (locs.texCoord !== -1) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord)
    gl.vertexAttribPointer(locs.texCoord, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(locs.texCoord)
  }
}