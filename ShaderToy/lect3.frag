#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time ; 
uniform vec2 u_resolution ; 

float createRectangle( vec2 uv  , float x1 , float x2 , float y1 , float y2){
    float mask1 = smoothstep( x1 , x1 , uv.x );
    mask1 -= smoothstep(x2 , x2 , uv.x) ;

    float mask2 = smoothstep( y1 , y1 , uv.y );
    mask2 -= smoothstep( y2 , y2 , uv.y );

    return mask1*mask2 ; 
}

float rectTile( vec2 uv , vec2 pos , float scale ){
    uv -= pos ; 
    uv /= scale ;
    float cRec = createRectangle( uv , -0.4 , 0.4 , -0.4 , 0.4 ) ; 
    cRec  -= createRectangle( uv , -0.39 , 0.39 , -0.39 , 0.39 ) ; 
    return cRec ; 
}

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= 0.5 ; 
    uv *= 2.0 ; 
    uv.x *= u_resolution.x/u_resolution.y ;

    vec3 pattern = vec3( 1.,.2,.8 )*rectTile(uv , vec2( 0 , 0 ) , .5);
    
    gl_FragColor = vec4( vec3(pattern) ,1.0 );   
}