
	var app = new PIXI.Application({
		backSWidth:100,
		backSHeight:100,
	backgroundColor:0xffd700
	
	});
	document.body.appendChild(app.view);
	
	var style = new PIXI.TextStyle({
	fontFamily: 'Arial',
    fontSize: 40,
	fontWeight: 'bold',
	fill:'#ffd700',
   
	});

	


	var tile = PIXI.Sprite.fromImage('img/tile1.png');
	
	var tileWidth = 67;
	var numTiles = 16;
	var numCols = 4;
	var tileStartX = 225;
	var tileStartY = 125;
	var tiles = [];
	var positions = [];
	var startPositions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var currentPosition = [];
	var isTileMoving = false;
	var blankTileIndex = 15;
	var tileTweenTime = 15;
    
	
	for(var i=0; i<numTiles;i++){
		var tileHolder = new PIXI.Container();
		tileHolder.index = i;
		var newtile = PIXI.Sprite.fromImage('img/tile1.png');
		tile.anchor.set(0.5);

		var row = Math.floor(i/numCols);
		var col = Math.floor(i%numCols);
		tileHolder.x = tileStartX + col*tileWidth;
		tileHolder.y = tileStartY + row*tileWidth;

		var pt = new Point(tileHolder.x, tileHolder.y);
		positions.push(pt);

		currentPosition[i] = i ;

		tileHolder.interactive = true;
		tileHolder.buttonMode = true;

		tileHolder.on('pointerdown', onTileClick);

		var richText = new PIXI.Text(i+1, style);
		richText.x = 32;
		richText.y = 32;

		richText.anchor.set(0.5);

		tileHolder.addChild(newtile);
		tileHolder.addChild(richText);

		tiles.push(tileHolder);

		if(i==(numTiles-1)){
			tileHolder.visible = false;
		}

		app.stage.addChild(tileHolder);
	}


	for(var i=0; i<numTiles;i++)
	{
		currentPosition[i] = startPositions[i];

		var tilePos = startPositions[i];
		tiles[i].x = positions[tilePos].x;
		tiles[i].y = positions[tilePos].y;
	}
	function onTileClick() {
		if(isTileMoving)
			return;

		var tileIndex = this.index;

		var currentTilePos = currentPosition[tileIndex];
		var blankTilePos = currentPosition[blankTileIndex];
		var diff = Math.abs(currentTilePos-blankTilePos);

		
		if(diff==numCols || diff == 1){
			var tweenWithCallback1 = new Tween(this, "position.x", positions[blankTilePos].x, tileTweenTime, true);
			tweenWithCallback1.easing = Tween.outCubic;
			var tweenWithCallback2 = new Tween(this, "position.y", positions[blankTilePos].y, tileTweenTime, true);
			tweenWithCallback2.easing = Tween.outCubic;
			tweenWithCallback1.setOnComplete(onTweenComplete, this);

	
			var tempPos = currentPosition[blankTileIndex];
			currentPosition[blankTileIndex] = currentPosition[tileIndex];
			currentPosition[tileIndex] = tempPos;

			isTileMoving = true;
		}
	}

	// Listen for animate update
	app.ticker.add(function(delta) {
		Tween.runTweens();
	});
	function checkForGameWin() {
		var isGameWon = true;
		for(var i=0; i<numTiles;i++){
			if(currentPosition[i] !== i){
				isGameWon = false;
				break;
			}
		}
		
	}

	function onTweenComplete(param) {
		isTileMoving = false;
		checkForGameWin();
	}

	function Point(x,y) {
		this.x = x;
		this.y = y;
	}

function Tween(object, property, value, frames, autostart){
	this.object = object;
	
	var properties = property.split(".");
	this.property = properties[properties.length-1];
	for(var i=0;i<properties.length -1; i++){
		this.object = this.object[properties[i]]
	}
	
	this.targetValue = value;
	this.startValue;
	this.active = autostart;
	this.currentFrame = 0;
	this.endFrame = frames;
	this.onComplete;
	this.onCompleteParams;
	this.easing = Tween.noEase;
	
	Tween.tweens.push(this);
}

Tween.prototype.setOnComplete = function(callback, parameters){
	this.onComplete = callback;
	this.onCompleteParams = parameters;
}

Tween.prototype.start = function(){
	this.active = true;
}

Tween.prototype.initIterations = function(){
	if(this.property != ""){
		this.startValue = this.object[this.property];
		this.targetValue = this.targetValue - this.object[this.property];
	}
}

Tween.prototype.update = function(){
	if(!this.active){
		return false;
	}
	if(this.currentFrame == 0){
		this.initIterations();
	}
	this.currentFrame ++;
	if(this.currentFrame <= this.endFrame){
		if(this.property != ""){
			var oldValue = this.object[this.property];
			var newValue = this.easing(this.currentFrame, this.startValue, this.targetValue, this.endFrame);
			this.object[this.property] = newValue;
		}
		return false;
	}else{
		this.active = false;
		if(this.onComplete != null){
			this.onComplete(this.onCompleteParams);
			
		}
		return true;
	}
}

Tween.tweens = [];
// Call this every Frame of your Game/Application to keep the tweens running.
Tween.runTweens = function(){
	for(var i=0;i < Tween.tweens.length;i++){
		var tween = Tween.tweens[i];
		if(tween.update()){
			var index = Tween.tweens.indexOf(tween);
			if(index != -1){
				Tween.tweens.splice(index, 1);
			}
			i--;
		}
	}
};



Tween.outCubic = function(t, b, c, d) {
	var ts=(t/=d)*t;
	var tc=ts*t;
	return b+c*(tc + -3*ts + 3*t);
}

