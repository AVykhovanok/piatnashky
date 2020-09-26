let stageWidth = 1920;
let stageHeight = 965;
let posButtonBoxX = 868;
let posButtonBoxY = 385;
let posTextButtonX = 880;
let posTextButtonY = 400;

let anim1 = new PIXI.Application({
width:stageWidth,
height:stageHeight,

antialias:true
});

let startButton = new PIXI.Graphics();
startButton.lineStyle(2, 0xffd700);
startButton.drawRoundedRect(0, 0, 200, 100, 20);
startButton.endFill();
startButton.x = posButtonBoxX;
startButton.y = posButtonBoxY;


const styleTextButton = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 48,
    fontStyle: 'italic',
    fontWeight: 'bold',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#ffd700',
    dropShadowBlur: 8,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6
});
const basicText = new PIXI.Text('START',styleTextButton);
basicText.x = posTextButtonX;
basicText.y = posTextButtonY;

anim1.stage.addChild(basicText,startButton);
document.body.appendChild(anim1.view);


const starTexture = PIXI.Texture.from('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ea231e53-e17c-4265-83b5-552457fc0505/d94djkj-f965812f-6a1e-4efd-a595-8ffe08f1cbfa.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VhMjMxZTUzLWUxN2MtNDI2NS04M2I1LTU1MjQ1N2ZjMDUwNVwvZDk0ZGprai1mOTY1ODEyZi02YTFlLTRlZmQtYTU5NS04ZmZlMDhmMWNiZmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XotPt6xy73Sy3ExDBZRCXLVFjVvoJzT2ZEMG3o5sWkM');

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.05;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.05;


const stars = [];
for (let i = 0; i < starAmount; i++) {
    const star = {
        sprite: new PIXI.Sprite(starTexture),
        z: 0,
        x: 0,
        y: 0,
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    anim1.stage.addChild(star.sprite);
    stars.push(star);
}

function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}




anim1.ticker.add((delta) => {
    
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
        const star = stars[i];
        if (star.z < cameraZ) randomizeStar(star);

       
        const z = star.z - cameraZ;
        star.sprite.x = star.x * (fov / z) * anim1.renderer.screen.width + anim1.renderer.screen.width / 2;
        star.sprite.y = star.y * (fov / z) * anim1.renderer.screen.width + anim1.renderer.screen.height / 2;

        
        const dxCenter = star.sprite.x - anim1.renderer.screen.width / 2;
        const dyCenter = star.sprite.y - anim1.renderer.screen.height / 2;
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        const distanceScale = Math.max(0, (2000 - z) / 2000);
        star.sprite.scale.x = distanceScale * starBaseSize;
        
        star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / anim1.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
    
});

















