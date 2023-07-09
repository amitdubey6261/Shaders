#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_mouse;

float createCircle(vec2 uv,float rad,float blur,vec2 pos){
    float distance=length(uv-pos);
    float circle=smoothstep(rad+blur,rad,distance);
    return circle;
}

float createSmiley(vec2 uv,vec2 smileyPosition,float smilySize){

    uv-=smileyPosition;
    uv/=smilySize ; 

    float mask=createCircle(uv,.6,.01,vec2(0,0));
    mask-=createCircle(uv,.1,.01,vec2(.2,.3));
    mask-=createCircle(uv,.1,.01,vec2(-.2,.3));
    
    float mouth=createCircle(uv,.3,.01,vec2(0,-.2));
    mouth-=createCircle(uv,.3,.01,vec2(0,-.1));
    
    mask-=mouth;

    return mask ; 
}

void main(){
    vec2 uv=gl_FragCoord.xy/u_resolution;
    uv-=.5;
    uv*=2.;
    uv.x*=u_resolution.x/u_resolution.y; 
    
    float smiley = createSmiley( uv , vec2( .0 , .0 ) , 1.1 ) ;

    gl_FragColor=vec4( vec3(smiley) , 1.0 ) ; 
}