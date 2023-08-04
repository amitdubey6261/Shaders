#ifdef GL_ES
precision mediump float;
#endif

#define AMIT_DUBEY_GLSL_WARSHIPS6261

uniform vec2 u_resolution ; 
uniform float u_time ;
uniform vec2 u_mouse ; 

vec3 circle(float rad , float smooth , vec2 uv , vec2 pos , vec3 color ){
    uv -= pos ; 
    return color * smoothstep( rad+smooth , rad , length(uv) );
}

vec3 rectangle(vec2 dimensions , float smooth , vec2 uv , vec2 pos , vec3 col ){
    uv -= pos ; 

    float b1 , b2 , b3 , b4 ; 
    b1 = smoothstep( dimensions.x+smooth , dimensions.x , uv.x ) ; 
    b2 = smoothstep( -dimensions.x+smooth , -dimensions.x , uv.x ) ; 
    b1 -= b2 ;

    b3 =smoothstep( dimensions.y+smooth , dimensions.y , uv.y ) ;
    b4 =smoothstep( -dimensions.y+smooth , -dimensions.y , uv.y ) ;
    b3 -= b4 ;

    col *= b1*b3 ; 

    return col ; 
}

vec3 createFace(vec2 uv){
    vec2 facePos = vec2( .0 , .6 );
    float face_outRad = .3 ; 
    float face_smooth = .01 ;

    vec3 faceColor = vec3( 1. , 0 , 0 ) ; 

    vec3 face_outer = circle( face_outRad , face_smooth , uv , facePos , faceColor ) ; 
    return face_outer ;
}

vec3 createMid( vec2 uv ){
    vec2 MidPos = vec2( .0 , .0 );
    float Mid_outRad = .4 ; 
    float Mid_smooth = .01 ;

    vec3 MidColor = vec3( 1. , 0 , 0 ) ; 

    vec3 Mid_outer = circle( Mid_outRad , Mid_smooth , uv , MidPos , MidColor ) ; 
    return Mid_outer ;
}


vec3 createCharachter(vec2 uv ){
    uv -= vec2( .0 , -.3 ) ;
    vec3 ans ; 
    ans += createFace(uv);
    ans += createMid(uv) ;
    return ans ;
}

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution ;
    uv -= .5 ; 
    uv *= 2. ; 
    uv.x *= u_resolution.x / u_resolution.y ;

    vec3 r1 = createCharachter(uv) ;

    gl_FragColor = vec4( r1 , 1 );
}