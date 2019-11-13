var players = ["Red","Blue"];
var colours = ["Red","Blue"];
players[0] = prompt("Welcome To Jan's Connect4.\nPlayer 1 you are red. Enter your name: ");
players[1] = prompt("2 you are blue. Enter your name: ");
rows = $("td");
turn = 0; //0 is red, 1 is blue

function announcementHeader()
{
	$("#toplevelannouncement").text(players[turn%2] + "'s turn. Drop your "+colours[turn%2]+" chip.");
}

announcementHeader();



//It's a 7x6 grid
totalColumns = 7;
totalRows = 6;

//Grid is labelled as such; 
//1st row; 0-6
//2nd row: 7-13
//...
//6th row: 35-41

//Creating columns
var columns = [[],[],[],[],[],[],[]];
var chips = {};

for (var i = 0;i<rows.length;i++) //iterate through all possible cells on board
{
	var index = i % 7;
	var className = "row-"+index;
	var chipNumber = "chip-"+i;
	$(rows[i]).addClass(className); //adding row number class to the cells.
	$(rows[i]).addClass(chipNumber); //adding chip number class to cells

}

$("td").on("click",addTile);

function addTile()
{
	var clickedItemClassNames = "." + $(this).attr("class"); //acquiring row name
	var rowNumber = clickedItemClassNames.split(" ")[0]; //element 0 is row number
	var rowElements = $(rowNumber);

	for (var i=rowElements.length-1;i>=0;i--) //iterate cells starting from bottom of collumn and going up
	{	
		var rowElementClassNames = rowElements.eq(i).attr("class"); //get class names of the current cell under test
		if(rowElementClassNames.includes("colourRed") || rowElementClassNames.includes("colourBlue")) //check if cell has a chip
		{
			//do nothing, already have a red or blue chip here
		}
		else
		{
			//is an empty cell, fill it with either a blue or red chip
			if (turn%2==0)
			{
				$(rowElements.eq(i)).addClass("colourRed").removeClass("colourBlue");
			}
			else
			{
				$(rowElements.eq(i)).addClass("colourBlue").removeClass("colourRed");
			}
			turn++;	
			announcementHeader();
			checkIfWinner(rowElements.eq(i))
			break;
		}
}

function getChipValue(cell,value)
//Pass in cell object and what we are after. Value could be "cellNumber" or "cellColour" 
{
	var chipDetails = cell.attr("class");

	if (value == "cellNumber")
	{
		return + (chipDetails.split(" ")[1].split("-")[1]);
	}
	else if (value == "cellColour")
	{
		return chipDetails.split(" ")[2];
	}
}

function checkTextFor4InARow(str)
{
	if (str.includes("colourRed".repeat(4)))
	{
		endGame();
		$("#winnerannounce").text("Winner is " + players[(turn-1)%2] +"!")
		
	}
	else if (str.includes("colourBlue".repeat(4)))
	{
		endGame();
		$("#winnerannounce").text("Winner is " + players[(turn-1)%2] +"!")
		
	}
}

function endGame(){
	$("td").off("click");
	$("#instruction").text("Restart browser to play again!")
	$("#toplevelannouncement").text("Game Over!");
}

function checkIfWinner(cell)
{
	//Find column and row coordinates for "cell" (see below) and check the whole row, whole column and both diagonals from "cell"
	var rows = $("td");
	var chipNumber = (getChipValue(cell, "cellNumber")); //+ converts chipNumber to integer
	var colour = getChipValue(cell, "cellColour");

	colNumber = chipNumber%7;
	rowNumber = Math.floor(chipNumber/7);

	//Checking column
	var cellColoursColumn = "";
	for (var i = 0; i< totalColumns ; i++)
	{
		var rowIndexUnderTest = chipNumber-colNumber + i; //go to very left, and increment by 1
		cellColoursColumn += getChipValue($(rows[rowIndexUnderTest]),"cellColour");
	}
	checkTextFor4InARow(cellColoursColumn);

	//Checking row
	var cellColoursRow = "";
	for (var i = 0; i< totalRows ; i++)
	{
		var rowIndexUnderTest = chipNumber - (rowNumber*7) + (i*7); //go to very top, and increment in multiples of 7
		cellColoursRow += getChipValue($(rows[rowIndexUnderTest]), "cellColour");
	}
	checkTextFor4InARow(cellColoursRow);

	//Checking positive diagonal (here we first get the chip at the top end of diagonal, then at bottom end of diagonal.)
	topDiagonalChipValue = -1;
	bottomDiagonalChipValue = -1;
	counter = 0;
	chipUnderTest = chipNumber;

	while(true) //bottom diagonal chip value
	{
		if ( Math.floor(chipUnderTest/7) == 5 || chipUnderTest%7 == 0) //condition checks if we are at border. bottom or left border
		{
			 //we are at the border
			bottomDiagonalChipValue = chipUnderTest;
			break;
		}
		chipUnderTest+=6;

		//breaks out of while if val too big means theres a mistake
		if (chipUnderTest > 1000){
			console.log("Error stuck in while loop. #1")
			break;
		}
	}
	chipUnderTest = chipNumber;
	while(true) //top, positive, diagonal chip value
	{
		if ( Math.floor(chipUnderTest/7) == 0 || chipUnderTest%7 == 6) //condition checks if we are at border- top or right border
		{
			topDiagonalChipValue = chipUnderTest;
			break;
		}
		chipUnderTest-=6;
		if (chipUnderTest < 0){
			console.log("Error stuck in while loop. #2")
			break;
		}
	}

	//Do we have 4 same colours in positive diag?
	var cellColoursPositiveDiagonal = "";
	for (var i = bottomDiagonalChipValue; i>= topDiagonalChipValue; i-=6)
	{
		//Go down from bottom diagonal up to top diagonal (this means take away cell number by 6)
		cellColoursPositiveDiagonal += getChipValue($(rows[i]),"cellColour");
	}
	checkTextFor4InARow(cellColoursPositiveDiagonal); //pass in text of colours to see if we have won


	//Checking negative diagonal
	negDiagonalChipUnderTest = chipNumber;
	negBottomDiag = 0;
	negTopDiag = 0;
	while(true) //bottom diagonal chip value
	{
		if ( Math.floor(negDiagonalChipUnderTest/7) == 5 || negDiagonalChipUnderTest%7 == 6) //check if at right or bottom border.
		{
			negBottomDiag = negDiagonalChipUnderTest;
			break;
		}
		negDiagonalChipUnderTest+=8;

		//breaks out of while if val too big means theres a mistake
		if (negDiagonalChipUnderTest > 100){
			console.log("Error stuck in while loop. #3")
			break;
		}
	}

	negDiagonalChipUnderTest = chipNumber;
	while(true) //top diagonal chip value
	{
		if ( Math.floor(negDiagonalChipUnderTest/7) == 0 || negDiagonalChipUnderTest%7 == 0) //check if at left or top border
		{
			negTopDiag = negDiagonalChipUnderTest;
			break;
		}
		negDiagonalChipUnderTest-=8;

		//breaks out of while if val too big means theres a mistake
		if (negDiagonalChipUnderTest < 0){
			console.log("Error stuck in while loop. #4")
			break;
		}
	}

	cellColoursNegativeDiagonal = "";
	for (var i=negBottomDiag; i>=negTopDiag; i-=8)
	{	
		cellColoursNegativeDiagonal += getChipValue($(rows[i]),"cellColour");
	}

	checkTextFor4InARow(cellColoursNegativeDiagonal);

}

}

