var canvas;
var animation = true;
var gl;
var scene;
var fps = 0;

function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL isn't available"); }

  gl.viewport(0, 0, canvas.width, canvas.height);

  scene = new Scene(gl);
  scene.camera = new Camera(new Transform(0,0,3), 100, canvas.width/canvas.height, 0.1, 100);
  
  var myimage = new Image();
	
  myimage.crossOrigin = "anonymous";
  myimage.src = "https://webglfundamentals.org/webgl/resources/mip-low-res-example.png"

  myimage.onload = function() { 
      configureTexture( myimage );
  }
  
  function configureTexture( myimage ) {
      texture = gl.createTexture();
      gl.bindTexture( gl.TEXTURE_2D, texture );
  	// demo: comment out; gif image needs flip of y-coord
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 
           gl.RGB, gl.UNSIGNED_BYTE, myimage );
      gl.generateMipmap( gl.TEXTURE_2D );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                        gl.NEAREST_MIPMAP_LINEAR );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   
      gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
  }


  function quad(a, b, c, d) {
	  
       pointsArray.push(vertices[a]); 
       colorsArray.push(vertexColors[a]); 
       texCoordsArray.push(texCoord[0]);

       pointsArray.push(vertices[b]); 
       colorsArray.push(vertexColors[a]);
       texCoordsArray.push(texCoord[1]); 

       pointsArray.push(vertices[c]); 
       colorsArray.push(vertexColors[a]);
       texCoordsArray.push(texCoord[2]); 
   
       pointsArray.push(vertices[a]); 
       colorsArray.push(vertexColors[a]);
       texCoordsArray.push(texCoord[0]); 

       pointsArray.push(vertices[c]); 
       colorsArray.push(vertexColors[a]);
       texCoordsArray.push(texCoord[2]); 

       pointsArray.push(vertices[d]); 
       colorsArray.push(vertexColors[a]);
       texCoordsArray.push(texCoord[3]);   
  }
	
  var numVertices  = 36;
  var texSize = 64;
  var program;
  var pointsArray = [];
  var colorsArray = [];
  var texCoordsArray = [];
  var texture;
	
  var texCoord = [
      vec2(0, 0),
      vec2(0, 1),
      vec2(1,1),
      vec2(1, 0)
  ];

  var vertices = [
      vec4( -0.5, -0.5,  0.5, 1.0 ),
      vec4( -0.5,  0.5,  0.5, 1.0 ),
      vec4( 0.5,  0.5,  0.5, 1.0 ),
      vec4( 0.5, -0.5,  0.5, 1.0 ),
      vec4( -0.5, -0.5, -0.5, 1.0 ),
      vec4( -0.5,  0.5, -0.5, 1.0 ),
      vec4( 0.5,  0.5, -0.5, 1.0 ),
      vec4( 0.5, -0.5, -0.5, 1.0 )
  ];

  // could change some colors to be more visible in blended image
  var vertexColors = [
      vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
      vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
      vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
      vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
      vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
      vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
      vec4( 0.0, 1.0, 1.0, 1.0 ),  // white
      vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
  ];  

  function colorCube()
  {
      quad( 1, 0, 3, 2 );
      quad( 2, 3, 7, 6 );
      quad( 3, 0, 4, 7 );
      quad( 6, 5, 1, 2 );
      quad( 4, 5, 6, 7 );
      quad( 5, 4, 0, 1 );
  }

  let vaseMaterial = new PhongMat(gl, {
    ambient: vec3(0.05, 0.055, 0.09),
    diffuse: vec3(0.4, 0.4, 0.85),
    specular: vec3(1,1,1),
    constants: new PhongConst(1.0, 1.0, 0.0, 10)
  })

  let carpet2 = new PhongMat(gl, {
    ambient: vec3(0.05, 0.055, 0.09),
    diffuse: vec3(0.4, 0.4, 0.85),
    specular: vec3(1,1,1),
    constants: new PhongConst(1.0, 1.0, 0.0, 10)
  }, 'carpet2.jpg')
  
  var tow = surfaceOfRevolution(surfaceRevol.TOWER, bg, surfaceRevol.genatrix, surfaceRevol.rotation);
  let t = new Add(gl, tow, carpet2)
  t.transform.translate(3, 0, 0)
  t.transform.computeTransform()
  scene.nodes.push(t)
  
  var vase = surfaceOfRevolution(surfaceRevol.POT, bg, surfaceRevol.genatrix, surfaceRevol.rotation);
  let v = new Add(gl, vase, vaseMaterial)
  v.transform.translate(-2.75, 0, -2)
  v.transform.computeTransform()
  scene.nodes.push(v)

  let carpet = new PhongMat(gl, {
    ambient: vec3(0.05, 0.055, 0.09),
    diffuse: vec3(0.4, 0.4, 0.85),
    specular: vec3(1,1,1),
    constants: new PhongConst(1.0, 1.0, 0.0, 10)
  }, 'carpet.jpg')
  
  let floor = new Add(gl, planeY(1.5, 1, 16), carpet)
  floor.transform.setScale(10)
  floor.transform.translate(0,-1,0)
  floor.transform.computeTransform()
  scene.nodes.push(floor)

  // cat texture 
  let catFur = new PhongMat(gl, {
    ambient: vec3(0.08, 0.0625, 0.09),
    diffuse: vec3(0.85, 0.45, 0.4),
    specular: vec3(0.8, 0.35, 0.3),
    constants: new PhongConst(1.0, 1.0, 1.0, 100)
  }, 'catfur.jpg') 
  
  // lights 
  scene.lights.push(new Light(vec4(0,2,-3,1), vec3(1,1,1), 8))
  scene.lights.push(new Light(vec4(0,2.3,2.8,1), vec3(1,1,1), 8))
  scene.lights.push(new Light(vec4(0,2.1,-3,1), vec3(1,1,1), 8))
  
  // add tree nodes to avatar 
  let cat = new Add(gl, cube(3,.5,.5,1), catFur)
  {

    cat.transform.setScale(0.25)
    cat.transform.translate(0, -0.5, 0)
    cat.transform.computeTransform()
	  
    let head = new Add(gl, cube(1,1,1,0.5), catFur)
    {

      head.transform.setCenter(-0.5, 0, 0)
      head.transform.setScale(0.5)
      head.transform.rotate(20, vec3(0,0,1))
      head.transform.translate(1, 0.5, 0)
      head.transform.computeTransform()

      let rightEar = new Add(gl, cube(1,1,3,0.5), catFur)
      rightEar.transform.setCenter(0, -2.5, 0)
      rightEar.transform.setScale(0.25)
      rightEar.transform.translate(0, 0.25, 0.2)
      rightEar.transform.computeTransform()

      head.node.push(rightEar)
		
      let nose = new Add(gl, cube(1,1,1,.5), catFur)
      nose.transform.setCenter(-.5, 1.5, -1)
      nose.transform.setScale(0.4)
      nose.transform.translate(.5, 0.5, -.5)
      nose.transform.computeTransform()

      head.node.push(nose)
		
      let leftEar = new Add(gl, cube(1,1,3,0.5), catFur)
      leftEar.transform.setCenter(0, -2.5, 0)
      leftEar.transform.setScale(0.25)
      leftEar.transform.translate(0, 0.25, -0.2)
      leftEar.transform.computeTransform()

      head.node.push(leftEar)
    
    }
	  
    cat.node.push(head)
	
    let leg1 = new Add(gl, cube(1,1,4.5,0.5), catFur)
    leg1.transform.setCenter(0, 4, 0)
    leg1.transform.setScale(0.25)
    leg1.transform.translate(0.75, 0, 0.22)
    leg1.transform.computeTransform()

    cat.node.push(leg1)

    let leg2 = new Add(gl, cube(1,1,4.5,0.5), catFur)
    leg2.transform.setCenter(0, 4, 0)
    leg2.transform.setScale(0.25)
    leg2.transform.translate(0.75, 0, -0.22)
    leg2.transform.computeTransform()

    cat.node.push(leg2)

    let leg3 = new Add(gl, cube(1,1,4.5,0.5), catFur)
    leg3.transform.setCenter(0, 4, 0)
    leg3.transform.setScale(0.25)
    leg3.transform.translate(-0.75, 0, 0.25)
    leg3.transform.computeTransform()

    cat.node.push(leg3)

    let leg4 = new Add(gl, cube(1,1,4.5,0.5), catFur)
    leg4.transform.setCenter(0, 4, 0)
    leg4.transform.setScale(0.25)
    leg4.transform.translate(-0.75, 0, -0.25)
    leg4.transform.computeTransform()

    cat.node.push(leg4)
	
    let tail = new Add(gl, cube(7,.5,.5,0.5), catFur)
    tail.transform.setCenter(4, 0, -.5)
    tail.transform.setScale(0.25)
    tail.transform.translate(-0.75, 0, -0.25)
    tail.transform.computeTransform()
	  
    cat.node.push(tail)

  }
  scene.nodes.push(cat)

  render();
}

window.onload = init

var SHADER_PROGRAMS = {};

function createShaderProgram(gl, vShader, fragShader, uniformNames) {
  let program = initShaders(gl, vShader, fragShader)
  gl.useProgram(program)
  program.locs = {}
  uniformNames.forEach(name => {
    program.locs[name] = gl.getUniformLocation(program, name)
  })
	
  program.locs.texCoord = gl.getAttribLocation(program, 'a_texCoord')
  program.locs.strength = gl.getAttribLocation(program, 'a_lightStrength')
  program.locs.color = gl.getAttribLocation(program, 'a_vertexColor')
  program.locs.normal = gl.getAttribLocation(program, 'a_vertexNormal')
  program.locs.position = gl.getAttribLocation(program, 'a_vertexPosition')
  return program
}

function render() {
  // legs
  scene.nodes[3].node[1].transform.rotation = rotateZ(20 * Math.cos(fps/30))
  scene.nodes[3].node[1].transform.computeTransform()
  scene.nodes[3].node[3].transform.rotation = rotateZ(20 * Math.cos(fps/30))
  scene.nodes[3].node[3].transform.computeTransform()
  scene.nodes[3].node[2].transform.rotation = rotateZ(-20 * Math.cos(fps/30))
  scene.nodes[3].node[2].transform.computeTransform()
  scene.nodes[3].node[4].transform.rotation = rotateZ(-20 * Math.cos(fps/30))
  scene.nodes[3].node[4].transform.computeTransform()
	
  // tail
  scene.nodes[3].node[5].transform.rotation = rotateY(-20 * Math.cos(fps/30))
  scene.nodes[3].node[5].transform.computeTransform()
  scene.nodes[3].node[5].transform.rotation = rotateY(-20 * Math.cos(fps/30))
  scene.nodes[3].node[5].transform.computeTransform()
	
  scene.nodes[3].transform.translation = translate(1.2 * Math.sin(fps/300), -0.6, 1.2 * Math.sin(2 * fps/300))
  scene.nodes[3].transform.rotation = rotateY(170 / Math.PI * Math.atan2(Math.cos(2*fps/300), 2 * Math.cos(fps/300)))
  scene.nodes[3].transform.computeTransform()

  scene.draw(gl)
  if (animation) {
	  
	  fps++;
  }
  window.requestAnimationFrame(render);
}

function Scene(gl) {
  this.nodes = []
  this.lights = []
  this.blendFuncStack = [{s: gl.ONE, d: gl.NONE}]
  this.camera = null
  this.modelMatrixStack = [translate(0,0,0)]

	gl.clearColor(0.52, 0.53, 0.68, 1.0); 

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND)
  gl.depthFunc(gl.LEQUAL)
  
  SHADER_PROGRAMS.PHONG_TEXTURED = createShaderProgram(gl, "vertex-phong", "fragment-phong-textured", [
    'u_projMatrix', 'u_viewMatrix', 'u_modelMatrix',
    'matAmb', 'matDif', 'matSpec', 'constants',
    'lightPosition', 'lightColor', 'lightStrength', 'numLights',
    'u_texture'
  ]);

  SHADER_PROGRAMS.PHONG = createShaderProgram(gl, "vertex-phong", "fragment-phong", [
    'u_projMatrix', 'u_viewMatrix', 'u_modelMatrix',
    'matAmb', 'matDif', 'matSpec', 'constants',
    'lightPosition', 'lightColor', 'lightStrength', 'numLights'
  ]);

  SHADER_PROGRAMS.LIGHTS = createShaderProgram(gl, "vertex-light", "fragment-basic", [
    'u_projMatrix', 'u_viewMatrix', 'u_modelMatrix'
  ]);
  
  var animateBtn = document.getElementById('anim-toggle')
  animateBtn.onclick = (e) => {
    animation= !animation
  }

  this.lightsPosBuff = gl.createBuffer();
}

Scene.prototype.drawLights = function(gl) {
  gl.useProgram(SHADER_PROGRAMS.LIGHTS);
  let locs = SHADER_PROGRAMS.LIGHTS.locs

  this.sendMvpUniforms(gl, locs)

  gl.bindBuffer( gl.ARRAY_BUFFER, this.lightsPosBuff );
  gl.vertexAttribPointer( locs.position, 4, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( locs.position );

  let positions = this.lights.map(light => light.position)
  gl.bufferData( gl.ARRAY_BUFFER, flatten(positions), gl.DYNAMIC_DRAW );

  gl.bindBuffer( gl.ARRAY_BUFFER, this.lightsColorBuff );
  gl.vertexAttribPointer( locs.color, 3, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( locs.color );

  let colors = this.lights.map(light => light.color)
  gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.DYNAMIC_DRAW );

  gl.bindBuffer( gl.ARRAY_BUFFER, this.lightsStrengthBuff );
  gl.vertexAttribPointer( locs.strength, 1, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( locs.strength );

  let strengths = this.lights.map(light => light.strength)
  gl.bufferData( gl.ARRAY_BUFFER, flatten(strengths), gl.DYNAMIC_DRAW );

  gl.drawArrays(gl.POINTS, 0, this.lights.length);
}

Scene.prototype.sendMvpUniforms = function(gl, locs) {
  gl.uniformMatrix4fv(locs.u_projMatrix, false, flatten(this.camera.projectionMatrix));
  gl.uniformMatrix4fv(locs.u_viewMatrix, false, flatten(this.camera.viewMatrix));
  gl.uniformMatrix4fv(locs.u_modelMatrix, false, flatten(this.getModelMatrix()));
}
Scene.prototype.getModelMatrix = function() {
  return this.modelMatrixStack[this.modelMatrixStack.length - 1]
}

Scene.prototype.popBlendFunc = function(gl) {
  this.blendFuncStack.pop()
  let params = this.getBlendFunc()
  gl.blendFunc(params.s, params.d)
}

Scene.prototype.getBlendFunc = function() {
  return this.blendFuncStack[this.blendFuncStack.length - 1]
}


Scene.prototype.popModelMatrix = function() {
  return this.modelMatrixStack.pop()
}

Scene.prototype.pushModelMatrix = function(transform) {
  this.modelMatrixStack.push(transform)
}

Scene.prototype.pushBlendFunc = function(gl, params) {
  this.blendFuncStack.push(params)
  gl.blendFunc(params.s, params.d)
}

function PhongMat(gl, props, texturePath) {
  if (typeof texturePath !== 'undefined') {
    this.shaderProgram = SHADER_PROGRAMS.PHONG_TEXTURED
    this.texturePath = texturePath
    this.loadTexture()
  } else {
    this.shaderProgram = SHADER_PROGRAMS.PHONG
  }
  this.props = props
}


Scene.prototype.draw = function(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  this.nodes.forEach((entity) => {
    this._drawInner(gl, entity)
  })
}
function PhongConst(ka, kd, ks, s) {
  this.ka = ka
  this.kd = kd
  this.ks = ks
  this.s = s
}

function Camera(transform, fov, aspect, near, far) {
  this.transform = transform
  this.fov = fov
  this.aspect = aspect
  this.near = near || 0.5
  this.far = far || 50
  this.computeProjection()
  this.computeView()
}
Scene.prototype._drawInner = function(gl, entity) {
  entity.bind(gl)
  
  this.pushModelMatrix(mult(this.getModelMatrix(), entity.transform.transform))
  this.sendMvpUniforms(gl, entity.material.shaderProgram.locs)
  gl.uniform1f(entity.material.shaderProgram.locs.numLights, this.lights.length)
  
  this.lights.forEach((light, i) => {
    
    if (i === 1) {
      this.pushBlendFunc(gl, {s: gl.ONE, d: gl.ONE})
    }
    light.sendData(gl, entity.material.shaderProgram.locs)
    entity.draw(gl)
  })
  this.popBlendFunc(gl)
  entity.node.forEach(child => this._drawInner(gl, child))
  this.popModelMatrix()
}
function Light(position, color, strength) {
  this.position = position
  this.color = color
  this.strength = strength
}
function Transform(x, y, z) {
  this.rotation = rotateX(0)
  this.translation = translate(x, y, z)
  this.center = translate(0,0,0)
  this.transform = this.translation
  this.scaling = scalem(1, 1, 1)
}

Camera.prototype.computeView = function() {
  this.transform.computeTransform()
  this.viewMatrix = inverse4(this.transform.transform)
}

Camera.prototype.computeProjection = function() {
  this.projectionMatrix = perspective(this.fov, this.aspect, this.near, this.far);
}
function Add(gl, geometry, material) {
  this.transform = new Transform(0, 0, 0)
  this.geometry = geometry
  this.material = material
  this.node = []
  this.geometry.initGL(gl)
}

Light.prototype.sendData = function(gl, locs) {
  gl.uniform4fv(locs.lightPosition, flatten(this.position))
  gl.uniform3fv(locs.lightColor, flatten(this.color))
  gl.uniform1f(locs.lightStrength, this.strength)
}

Transform.prototype.translate = function (x, y, z) {
  this.translation = mult(this.translation, translate(x, y, z))
}

Transform.prototype.rotate = function (theta, axis) {
  this.rotation = mult(this.rotation, rotate(theta, axis))
}

Transform.prototype.setScale = function (scale) {
  this.scaling = scalem(scale, scale, scale)
}
Transform.prototype.getTransform = function () {
  return this.transform
}

Transform.prototype.setCenter = function (x,y,z) {
  this.center = inverse4(translate(x,y,z))
}

Transform.prototype.computeTransform = function () {
 
  this.transform = mult(this.translation, mult(mult(this.rotation, this.scaling), this.center))
}

PhongConst.prototype.asVec = function () {
  return vec4(this.ka, this.kd, this.ks, this.s)
}

PhongMat.prototype.loadTexture = function() {
  this.textureImage = new Image();
  this.textureImage.onload = this.configureTexture.bind(this)
  this.textureImage.src = this.texturePath;
}

PhongMat.prototype.configureTexture = function() {
  this.texture = gl.createTexture();
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 
       gl.RGB, gl.UNSIGNED_BYTE, this.textureImage );
  gl.generateMipmap( gl.TEXTURE_2D );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                    gl.NEAREST_MIPMAP_LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
}

PhongMat.prototype.sendData = function (gl) {
  gl.uniform3fv(this.shaderProgram.locs.matAmb, flatten(this.props.ambient));
  gl.uniform3fv(this.shaderProgram.locs.matDif, flatten(this.props.diffuse));
  gl.uniform3fv(this.shaderProgram.locs.matSpec, flatten(this.props.specular));
  gl.uniform4fv(this.shaderProgram.locs.constants, flatten(this.props.constants.asVec()));
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.uniform1i(this.shaderProgram.locs.u_texture, 0);
}

Add.prototype.sendData = function (gl) {
  this.material.sendData(gl)
  this.geometry.sendData(gl)
}

Add.prototype.bind = function(gl) {
  gl.useProgram(this.material.shaderProgram)
  this.material.sendData(gl)
  this.geometry.enableAttributes(gl, this.material.shaderProgram.locs)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.buffers.index)
}

Add.prototype.draw = function (gl) {
  gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0)
}
