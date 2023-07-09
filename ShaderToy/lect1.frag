#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution ; 

void main(){
    vec2 fc = gl_FragCoord.xy ; 
    vec2 uv = fc/u_resolution ;
    uv = (uv-.5)*2.0 ;
    uv.x = uv.x*u_resolution.x/u_resolution.y;


    float rad = 0.4 ; 
    float distance = length(uv.xy); 
    float col = 1.0 ; 
    // if( distance < rad ){
    //     col = 1.0 ;
    // }
    // else{
    //     col = 0.5 ; 
    // }
    float sms = smoothstep( rad+0.01 , rad , distance);
    gl_FragColor = vec4( sms , 1 , 1 , 1.0 );
}
