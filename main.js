const cursor = document.querySelector("#cursor");
const hov_sub = document.querySelector(".hov_sub");
const axisX = document.querySelector("#axisX");
const axisZ = document.querySelector("#axisZ");
const paramS = document.querySelector("#paramS");
const paramL = document.querySelector("#paramL");
const paramA = document.querySelector("#paramA");
const graf = document.querySelector("#graf");
const rectangle__item = document.querySelectorAll(".rectangle__item");

let L = 0;

hov_sub.addEventListener("mousemove", function(e){

    if (e.pageX == null && e.clientX != null) { // если нет pageX..
        var html = document.documentElement;
        var body = document.body;
    
        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;
    
        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }
   
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";

    let maxS = 21;
    let minS = 1;
    let X = Math.round( ( ( cursor.offsetTop - hov_sub.offsetTop - ( cursor.style.height / 2 ) ) / 4 ) );  
    let Z = Math.round( 54 - ( (cursor.offsetTop / 10 ) - 5) );
    let S = Math.floor(Math.random() * (maxS - minS + 1) + minS);

    let maxA = 3;
    let minA = -6;
    let A = Math.floor(Math.random() * (maxA - minA + 1) + minA);
    
    // 1051 - 1134 // зона дефекта
    if( ( cursor.offsetLeft > 1051 ) && ( cursor.offsetLeft < 1074 ) && ( cursor.offsetTop < 515 ) && ( cursor.offsetTop > 449 ) ){

        maxA = 17;  
        let К = 25;
        A = Math.floor( Z *  maxA  / К);

        maxS = 18;
        minS = 14;
        S = Math.floor(Math.random() * (maxS - minS + 1) + minS);

    }

    L += ( hov_sub.offsetWidth / 50 );



    let minH = 5;
    let maxH = 15;

    for( let i = 0; i < rectangle__item.length; i++){
        rectangle__item[i].style.height = Math.floor(Math.random() * (maxH - minH + 1) + minH)+ "px";
        rectangle__item[i].style.borderRadius = "";
        rectangle__item[i].style.backgroundColor = "";


    }

    let minus = 0;
    let Kp0 = 1;
    let Kp1 = 0.9;
    let Kp2 = 0.7;
    let Ka = 25; // один дБ в пикселях

    if( A < 0 ){
        minus = -1;
    }else{
        minus = 1;

    if( X > 47){

        X = 47;
    }

        rectangle__item[X-2].style.height = Math.floor( minus * A * Ka * Kp2) + "px";
        rectangle__item[X-2].style.borderRadius = "10px 0 0 0";

        rectangle__item[X-1].style.height = Math.floor( minus * A * Ka * Kp1) + "px";
        rectangle__item[X-1].style.borderRadius = "5px 0 0 0";

        rectangle__item[X].style.height = Math.floor( minus * A * Ka * Kp0) + "px";
        rectangle__item[X].style.borderRadius = "3px 3px 0 0";
        rectangle__item[X].style.backgroundColor = "red";

        rectangle__item[X+1].style.height = Math.floor( minus * A * Ka * Kp1) + "px";
        rectangle__item[X+1].style.borderRadius = "0 5px 0  0";

        rectangle__item[X+2].style.height = Math.floor( minus * A * Ka * Kp2) + "px";
        rectangle__item[X+2].style.borderRadius = "0 10px 0  0";

    }

    // границы 
    if( X < 0 || ( cursor.offsetLeft < hov_sub.offsetLeft) || ( cursor.offsetLeft > (hov_sub.offsetLeft + hov_sub.offsetWidth) ) ){
        X = 0;
        L = 0;
        S = 0;
        A = 0;
    }else if( X > 50 ){
        X = 50;
    }
    
    if( cursor.offsetTop < hov_sub.offsetTop ){
        Z = 20;
    }else if( cursor.offsetTop > ( hov_sub.offsetTop + hov_sub.offsetHeight ) ){
        Z = 0;
        S = 0;
        A = 0;
    }

    axisX.innerHTML = X; 
    axisZ.innerHTML = Z; 
    paramS.innerHTML = S; 
    paramL.innerHTML = Math.round(L / 40); 
    paramA.innerHTML = A;

});