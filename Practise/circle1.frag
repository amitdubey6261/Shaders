#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float createCircle( float rad , float offset , vec2 uv , float x , float y ){
    uv.x += x ; 
    uv.y += y ; 
    return smoothstep( rad+offset , rad , length(uv) );
}

float createRectangle( float w , float h , float posx , float posy , vec2 uv , float offset ){
    uv.x -= posx ; 
    uv.y -= posy ;

    float mask ; 

    float sms1 = smoothstep( w+offset , w , uv.x );
    float sms2 = smoothstep( -w+offset , -w , uv.x );

    float sms3 = smoothstep( h+offset , h , uv.y );
    float sms4 = smoothstep( -h+offset , -h , uv.y );

    float mask1 , mask2 ; 

    mask1 += sms1 ; 
    mask1 -= sms2 ; 

    mask2 += sms3 ; 
    mask2 -= sms4 ; 

    return mask1 * mask2 ; 
}

void main(){
    vec2 fc = gl_FragCoord.xy ;
    vec2 uv = fc/u_resolution ;
    uv -= 0.5 ;
    uv *= 2.0 ;
    uv.x *= u_resolution.x/u_resolution.y ; 

    float c1 = createCircle( 0.2 , .04 , uv , .2 , .2 );
    float c2 = createCircle( 0.3 , .02 , uv , -.2 , -.2 );

    float r1 = createRectangle( .2 , .2 , .0 , .6 , uv , .01 ); 



    float mask ;

    // mask += c1 ;  
    // mask += c2 ;  
    mask += r1 ;

    gl_FragColor = vec4( mask , 0 , 0 , 1 );
}