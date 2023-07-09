#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution ; 
uniform vec4 u_mouse ; 
uniform float u_time ; 

void main(){
    float col = sin(u_time*20.0);
    gl_FragColor = vec4( col , 0 , 0 , 1 );
}
