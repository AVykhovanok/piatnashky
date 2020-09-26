
let Application     =     PIXI.Application,
    loader          =     PIXI.loader,
    resources       =     PIXI.loader.resources,
    Sprite          =     PIXI.Sprite;


let app = new Application({ 

    width: 500, 
    height: 500,                       
    antialias: true, 
    transparent: false, 
    resolution: 1

  }
);


document.body.appendChild(app.view);


loader

  .add("img/tile.png")
  .load( fBackPuzzleBox)
  .load( fTilePuzzle)


  let startPuzzleX=10;
  let startPuzzleY=10; 
  let tileSize=65;
  let numCols=4;
  let empty={
      top:270,
      left:270
  };
  var currentPosition = [];
  var isTileMoving = false;
  var blankTileIndex = 15;
  var tileTweenTime = 15;
  var tiles = [];
 






function fBackPuzzleBox() {

let backPuzzleBox = new PIXI.Graphics();

  backPuzzleBox.lineStyle(2, 0xffd700);
  backPuzzleBox.drawRoundedRect(0, 0, 265, 265, 10);
  backPuzzleBox.x = 5;
  backPuzzleBox.y = 5;
  app.stage.addChild(backPuzzleBox);

}


function fTilePuzzle() {
  
   let styleTextTilePuzzle = new PIXI.TextStyle({

    fontFamily: 'Arial',
    fontSize: 48,
    fontWeight: 'bold',
    fill: '#ffd700',
   
});
   
  
    
              for(let i=0; i<15;i++){

                var tileHolder = new PIXI.Container();
                var nullTile = new PIXI.Container();
                nullTile.x=205;
                nullTile.y=205;

                tileHolder.index = i;

                let tilePuzzle = new PIXI.Graphics();
                tilePuzzle.lineStyle(2, 0xffd700);
                tilePuzzle.drawRoundedRect(0, 0, 60, 60, 10);
                          
                let textPuzzleText = new PIXI.Text(i+1,styleTextTilePuzzle);    
                textPuzzleText.x = 30;
		        textPuzzleText.y = 30;
                textPuzzleText.anchor.set(0.5);
                
                var row = Math.floor(i/numCols);
                var col = Math.floor(i%numCols)
                tileHolder.x= startPuzzleX+col*tileSize;
                tileHolder.y= startPuzzleY+row*tileSize;
                              
                // var pt = new Point(tileHolder.x, tileHolder.y);
                // positions.push(pt);            
                
                currentPosition[i] = i ;

               
                tileHolder.interactive = true;
                tileHolder.buttonMode = true;

                
                
                tileHolder.on('pointerdown', onTileClick);
                tileHolder.addChild(tilePuzzle,textPuzzleText);                        
                app.stage.addChild(tileHolder);
                
                tiles.push(tileHolder);

                function Point(x,y) {
                    this.x = x;
                    this.y = y;
                }
               

function onTileClick() {
    let currentTilePos = new PIXI.Graphics();
   let tileIndex=[this.index];
    tileHolder.addChild(currentTilePos);
  
    var currentTilePosX;
    var currentTilePosY;

     currentTilePos.x = nullTile.x ;
     currentTilePos.y = nullTile.y;
      
    nullTile.x=tileHolder.x;
    nullTile.y=tileHolder.y;
     
    tileHolder.x=currentTilePos.x;
    tileHolder.y=currentTilePos.y;


           }
              
        }

    }








