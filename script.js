
const canvas = document.getElementById("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

let particleArray

let mouse ={
    x:null,
    y:null,
    radius:(canvas.height/80)*(canvas.width/80)
}

canvas.addEventListener("mousemove",(event)=>{
    mouse.x=event.x
    mouse.y=event.y
})



class Particle{
    constructor(x,y,directionX,directionY,radius,color){
        this.x=x
        this.y=y
        this.directionX=directionX
        this.directionY=directionY
        this.radius=radius
        this.color=color
    }

    //TO DRAW PARTICLE
    draw(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        ctx.fillStyle='rgb(0,255,255)'
        ctx.fill()
    }
    // CHECK PARTICLE POSITION
    update(){
        // console.log("update called")
        if(this.x>canvas.width|| this.x<0){
            this.directionX=-this.directionX
        }
        if(this.y>canvas.height||this.y<0){
            this.directionY=-this.directionY
        }
        let dx=mouse.x-this.x
        let dy=mouse.y-this.y
        let distance = Math.sqrt(dx*dx + dy*dy)

        if(distance<mouse.radius+this.radius){
            // console.log("ener i")
            if(mouse.x<this.x && this.x<canvas.width-this.radius*10){
                this.x+=10
            }
            if(mouse.x>this.x && this.x>this.radius*10){
                this.x-=10
            }
            if(mouse.y<this.y && this.y<canvas.height-this.radius*10){
                this.y+=10
            }
            if(mouse.y>this.y && this.y>this.radius*10){
                this.y-=10;
            }
        }
        this.x+=this.directionX
        this.y+=this.directionY
        this.draw()
    }
}


function fillParticleArray(){
    particleArray=[]
    let number = (canvas.height*canvas.width)/3000;
    for(let i=0;i<number;i++){
        const radius = (Math.random()*5)+1
        const x = (Math.random()*(canvas.width-radius*2)-(radius*2)+radius*2)
        const y = (Math.random()*(canvas.height-radius*2)-(radius*2)+radius*2)
        let directionX = (Math.random()*5)-2.5
        let directionY = (Math.random()*5)-2.5
        particleArray.push(new Particle(x,y,directionX,directionY,radius,"white"))
    }
}


function connect(){
    let opacityValue=1
    for(let a=0;a<particleArray.length;a++){
        for(let b=a;b<particleArray.length;b++){
            let distance =((particleArray[a].x-particleArray[b].x)*(particleArray[a].x-particleArray[b].x))
            +((particleArray[a].y-particleArray[b].y)*(particleArray[a].y-particleArray[b].y))
            if(distance<(canvas.width/7)*(canvas.height/7)){
                opacityValue=1-distance/20000
                ctx.strokeStyle=`rgba(0,255,255,${opacityValue}`
                ctx.beginPath()
                ctx.lineWidth=1
                ctx.moveTo(particleArray[a].x,particleArray[a].y)
                ctx.lineTo(particleArray[b].x,particleArray[b].y)
                ctx.stroke()
            }
        }
    }
}


function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)

    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update()
    }
    connect()
}

addEventListener("resize",function(){
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    mouse.radius=(canvas.height/80)*(canvas.width/80)
    // console.log("this is called")
    fillParticleArray()
})

window.addEventListener("mouseout",function(){
    mouse.x=undefined
    mouse.y=undefined
})


fillParticleArray()
animate()
