#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution ; 
uniform float u_time ; 
uniform vec2 u_mouse; 

float createRectangle(float w , float h , float off , float posX , float posY , vec2 uv){
    uv.x -= posX ;
    uv.y -= posY ; 

    float time = .2 ; 
    float freq = 10. ; 
    float widt = .1 ; 

    uv.x -= sin((uv.y+u_time*time)*freq)*widt; 

    float b1 , b2 , b3 , b4 ; 

    b1 = smoothstep( w + off , w , uv.x ); 
    b2 = smoothstep( -w+off , -w , uv.x );
    b1 -= b2 ;

    b3 = smoothstep( h + off , h , uv.y );
    b4 = smoothstep( -h + off , -h , uv.y );
    b3 -= b4 ;

    return b1 * b3 ;
}

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution ; 
    uv -= 0.5 ; 
    uv *= 2.0 ;
    uv.x *= u_resolution.x/u_resolution.y ;

    float rec1 = createRectangle( .031 , .7 , .2 , .0 , .0 , uv );

    gl_FragColor = vec4( rec1 , 0 , 0 , 1 ) ; 
}