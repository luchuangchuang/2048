var nums= new Array();

$(function(){
	newGame();
});
 
 function newGame(){
 	init();
 	generateOneNumber();
 	generateOneNumber();
 }
 function init(){
 	for(var i=0;i<4;i++){
        for(var j= 0;j<4;j++){
            var cell= $('#cell-'+i+'-'+j);
            cell.css('top',getPosTop(i,j));
            cell.css('left',getPosLeft(i,j));
        }
 	}

    for(var i=0;i<4;i++){
    	 nums[i] = new Array();
         for(var j=0;j<4;j++){
           nums[i][j]=0;
         }
    }
    updateView();

 }

 function updateView(){

   $('.number-cell').remove();
  	for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
         $('#container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`);
         var numberCell = $(`#number-cell-${i}-${j}`);
         if(nums[i][j]!=0){
            numberCell.css('width','100px');
            numberCell.css('height','100px');
            numberCell.css('top',getPosTop(i,j));
            numberCell.css('left',getPosLeft(i,j));
            numberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
			numberCell.css('color',getNumberColor(nums[i][j]));
            numberCell.text(nums[i][j]);

         }else{
         	numberCell.css('width','0');
            numberCell.css('height','0');
            numberCell.css('top',getPosTop(i,j)+50);
            numberCell.css('left',getPosLeft(i,j)+50);
         }
      }
 	}
 }
 function generateOneNumber(){
 	if(noSpace(nums)){
       return;
 	}
 	var count=0;
 	var array =new Array();
 	 for(var i=0;i<4;i++){
       for(var j=0;j<4;j++){
             if(nums[i][j]==0){
             	array[count]=i*4+j;//记录空白格子位置
             	count++;

             }
       }
 	 }

 	 var n= Math.floor(Math.random()*count);
 	 var randX= Math.floor(array[n]/4);
 	 var randY= Math.floor(array[n]%4);
 	 var randNumber=Math.random()>0.5?2:4;

 	 nums[randX][randY]= randNumber;
 	 showNumber(randX,randY,randNumber);
 }

 $(document).keydown(function(event){
	 
	event.preventDefault();
	switch(event.keyCode){
		case 37:  
			if(canMoveLeft(nums)){  
				moveLeft();
				setTimeout(generateOneNumber,210);
			}
			break;
		case 38:  
			if(canMoveUp(nums)){  
				moveUp();
				setTimeout(generateOneNumber,210);
			}
			break;
		case 39:  
			if(canMoveRight(nums)){  
				moveRight();
				setTimeout(generateOneNumber,210);
			}
			break;
		case 40:  
			if(canMoveDown(nums)){  
				moveDown();
				setTimeout(generateOneNumber,210);
			}
			break;			
	}
});
 
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){ 
					if(nums[i][k]==0&&noBlockH(i,k,j,nums)){
						
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j]; 
						nums[i][j]=0; 
						break;
					}else if(nums[i][k]==nums[i][j]&&noBlockH(i,k,j,nums)){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0; 
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
}


function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				for(var k=3;k>j;k--){ 
					if(nums[i][k]==0&&noBlockH(i,j,k,nums)){
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j]; 
						nums[i][j]=0; 
						break;
					}else if(nums[i][k]==nums[i][j]&&noBlockH(i,j,k,nums)){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0; 
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
}

function moveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){ 
					if(nums[k][j]==0&&noBlockV(j,k,i,nums)){
						
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j]; 
						nums[i][j]=0; 
						break;
					}else if(nums[k][j]==nums[i][j]&&noBlockV(j,k,i,nums)){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0; 
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
	 
}
function moveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){ 
					if(nums[k][j]==0&&noBlockV(j,i,k,nums)){
						
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j]; 
						nums[i][j]=0; 
						break;
					}else if(nums[k][j]==nums[i][j]&&noBlockV(j,i,k,nums)){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0; 
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
}
	 
 
