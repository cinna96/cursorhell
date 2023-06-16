let cursorElement=document.getElementById("cursor")
let duckPosX = 128;
let duckPosY = 128;
let diffX = 0;
let diffY = 0;
let distance=0;
let duckspeed=1;
let duckcount=6;
//let changed=false;
var direction = "";
let crumbs=[], mouse={
    x:0,y:0,lastX:0,lastY:0
};

var crumb=function(){
    this.x=0;
    this.y=0;
    this.node=(function(){
        var n=document.createElement("div");
        
        n.className="cursor";
        //document.body.appendChild(n);
        document.body.prepend(n);
        return n;
    }());
};
crumb.prototype.draw = function() {
    this.node.style.left = (this.x-64) + "px";
    this.node.style.top = (this.y-64) + "px";
};
for  (var i=0; i<duckcount;i++){
    var c = new crumb();
    crumbs.push(c);   
}

function draw(){
    var x=mouse.x,y=mouse.y;
    // crumbs.lastIndexOf("cursor");
    crumbs.forEach(function(crumb,index,crumbs){
        var nextCrumb=crumbs[index+1]||crumbs[0];
        crumb.x=x;
        crumb.y=y;
        crumb.draw();
        x+=(nextCrumb.x-crumb.x)*.9;
        y+=(nextCrumb.y-crumb.y)*.9;
    });

   
          
}
    

function animate(){
    draw();
    requestAnimationFrame(animate);
}
document.onscroll=(event)=>{
    //proximity=;
    crumbs.forEach(function(crumb,index,crumbs){
        prox=Math.sqrt(((mouse.x-crumb.x)**2)+((mouse.y-crumb.y)**2))
        
        document.getElementById("cursor").style.width=(0.8*prox);
    })
    
}
document.onclick=(event)=>{
    let lastcrumb=crumbs[duckcount];
    
    duckcount-=1;
}
document.onmousemove = (event) => {
    mouse.lastX=mouse.x;
    mouse.lastY=mouse.y;
    mouse.x = event.x;
    mouse.y = event.y;
    if (mouse.y > mouse.lastY) {
        // if(direction=="up"){
        //     changed=true;
        // }else{
        //     changed=false;
        //}
    
        direction = "down"
    } else if (mouse.y > mouse.lastY) {
        // if(direction=="down"){
        //     changed=true;
        // }else{
        //     changed=false;
        // }
        direction = "up"
    }
    

    console.log(mouse.x, mouse.y)
};

animate();