vals = [[]]
cols = []


number_of_points = 0

previous_cp = {0: [], 1: []}
var algorithmSteps = {}

function points_list(action)
{
	if (action === "add")
	{
		number_of_points++
	}
	return number_of_points
}

// Change colour when bg is clicked

// Add value
count = 0;
countMaxReached = false;

function reverse(){

	$(".compute_btn").text("Step " + count.toString() + "/" + totalSteps.toString())
	count-=2
	if (count<0)
	{
		count=0
	}
	play_algo()
}


function play_algo()
{	
	totalSteps =  Object.keys(algorithmSteps).length
	console.log(algorithmSteps)
	console.log(algorithmSteps[0])
	
	// console.log(algorithmSteps)
	console.log(algorithmSteps == undefined)

	if (algorithmSteps[0] == undefined)
	{
		$(".announcement").children().text("We need at least 2 points to find the closest pair!")
	}
	else
	{
		if (count >= totalSteps || count< 0)
		{
			count = 0;
			return 0;
		}

		console.log(algorithmSteps[count])
		// Show steps on button
		$(".compute_btn").text("Step " + count.toString() + "/" + totalSteps.toString())
		$(".compute_btn").text("Step " + count.toString() + "/" + totalSteps.toString())

		if (Object.keys(algorithmSteps[count]) == "Points")
		{
			cellCounter = 0
			for (cell of algorithmSteps[count].Points)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("color", "white")
				$(c).css("background", "black")
				$(c).text(cellCounter) //counter)
				cellCounter++;
			}
			$(".announcement").children().text("Lets begin! This is the order that the coordinates were inputted.")
		}
		if (Object.keys(algorithmSteps[count]) == "OrderedX")
		{
			cellCounter = 0
			for (cell of algorithmSteps[1].OrderedX)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("color", "white")
				$(c).text(cellCounter) //counter)
				cellCounter++;
			}
			$(".announcement").children().text("First we must sort and store the coordinates in ascending X order like so (using the merge sort algorithm).")
		}
		if (Object.keys(algorithmSteps[count]) == "OrderedY")
		{
			cellCounter = 0
			for (cell of algorithmSteps[2].OrderedY)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("color", "white")
				$(c).text(cellCounter) //counter)
				cellCounter++;
			}
			$(".announcement").children().text("...and by their Y coordinates (0 is at the top!). This will be used later.")
		}

		if (Object.keys(algorithmSteps[count]) == "left_side_x_ordered")
		{

			// Ordering cells again by their x coordinate
			cellCounter = 0
			for (cell of algorithmSteps[1].OrderedX)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("color", "white")
				$(c).text(cellCounter) //counter)
				cellCounter++;
			}

			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "0px solid black")
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}

			for (cell of algorithmSteps[count].left_side_x_ordered)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "blue")
				//$(c).text(cell[0]) //counter)
			}
			$(".announcement").children().text("The coordinates are divided in half. This is the left side.")
	
		}

		if (Object.keys(algorithmSteps[count]) == "right_side_x_ordered")
		{
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "0px solid black")
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}

			for (cell of algorithmSteps[count].right_side_x_ordered)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "green")
				//$(c).text(cell[0]) //counter)
			}
			$(".announcement").children().text("...and this is the right side.")
	
		}

		if (Object.keys(algorithmSteps[count]) == "BaseCaseWith3Coords")
		{
			$(".announcement").children().text("Starting calculating distance amongst these 3 pairs.")
	
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}
			for (cell of algorithmSteps[count].BaseCaseWith3Coords)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "brown")
				//$(c).text(cell[0]) //counter)
			}
		}

		if (Object.keys(algorithmSteps[count]) == "MeasuringDistOfPairs")
		{
			$(".announcement").children().text("Measuring this pair now.")
	
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
					$(c).css("border", "0px solid black")
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}
			for (cell of algorithmSteps[count].MeasuringDistOfPairs)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				//$(c).css("background-color", "brown")
				$(c).css("border", "5px solid brown")
				//$(c).text(cell[0]) //counter)
			}
		}

		if (Object.keys(algorithmSteps[count]) == "TheirDistance")
		{
			$(".announcement").children().text("Their distance: " + (algorithmSteps[count].TheirDistance).toFixed(2) + ".")	
		}

		if (Object.keys(algorithmSteps[count]) == "ReturningPx")
		{
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}
			for (cell of algorithmSteps[count].ReturningPx)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "brown")
				//$(c).text(cell[0]) //counter)
			}

			$(".announcement").children().text("Only 2 coordinates left on this side. Returning this.")
		}

		if (Object.keys(algorithmSteps[count]) == "ReturningWinner")
		{
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "0px solid black")
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}

			for (cell of algorithmSteps[count].ReturningWinner[0][0]) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				// $(c).css("background-color", "black")
				$(c).css("border", "5px solid red")
				$(c).css("background-color", "red")
				//$(c).text(cell[0]) //counter)
			}

			pairItem1 = algorithmSteps[count].ReturningWinner[0][0][0]	
			pairItem2 = algorithmSteps[count].ReturningWinner[0][0][1]	
			pairDist = algorithmSteps[count].ReturningWinner[0][1]

			$(".announcement").children().text("Closest pair out of those compared was " +
				"(" + pairItem1.toString() + ")" + " and (" + pairItem2.toString() + ")" +
				" with distance " + pairDist.toFixed(2))
			
		}

		if (Object.keys(algorithmSteps[count]) == "LeftSideLowest")
		{
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "0px solid black")
				$(c).css("background-color", "black")
				//$(c).text(cell[0]) //counter)
			}
			for (cell of algorithmSteps[count].LeftSideLowest)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "5px solid red")
				$(c).css("background-color", "blue")
				//$(c).text(cell[0]) //counter)
			}
			$(".announcement").children().text("Comparing the 'best' from left side with the best from right side.")
		}
		if (Object.keys(algorithmSteps[count]) == "RightSideLowest")
		{
			for (cell of algorithmSteps[count].RightSideLowest)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "5px solid red")
				$(c).css("background-color", "green")
				//$(c).text(cell[0]) //counter)
			}
			$(".announcement").children().text("...the best from the right side.")
		}
		if (Object.keys(algorithmSteps[count]) == "RightLeftComparisonWinner")
		{
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "black")
				$(c).css("border", "0px solid black")
			}
			for (cell of algorithmSteps[count].RightLeftComparisonWinner[0])
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "0px solid red")
				$(c).css("background-color", "red")
			}

			firstCoord = algorithmSteps[count].RightLeftComparisonWinner[0][0]
			secondCoord = algorithmSteps[count].RightLeftComparisonWinner[0][1]

			$(".announcement").children().text("Out of all those tested the closest pair is this region is " + "("
				+ firstCoord + ") and (" + secondCoord + ")" +
				" with a distance of " + (algorithmSteps[count].RightLeftComparisonWinner[1]).toFixed(2) + ".")
		}

		if (Object.keys(algorithmSteps[count]) == "xhat")
		{
			cell = algorithmSteps[count].xhat
			c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
			
			$(c).css("border", "5px solid black")
			$(c).css("background-color", "pink")

			$(".announcement").children().text("We had divided the coordinates left/right from this point.")
		}
		if (Object.keys(algorithmSteps[count]) == "SplitPx")
		{
			for (cell of algorithmSteps[count].SplitPx) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "5px solid black")
				$(c).css("background-color", "brown")
			}

			$(".announcement").children().text("Testing for split pairs.")
		}

		if (Object.keys(algorithmSteps[count]) == "SplitPy")
		{
			cellCounter = 0
			for (cell of algorithmSteps[2].OrderedY)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("color", "white")
				$(c).text(cellCounter) //counter)
				cellCounter++;
			}

			$(".announcement").children().text("Looking at coordinates from Y ascending order...")

		}
		if (Object.keys(algorithmSteps[count]) == "Sy")
		{
			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "black")
				$(c).css("border", "0px solid black")
			}
			for (cell of algorithmSteps[count].Sy)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("border", "5px solid black")
				$(c).css("background-color", "brown")
			}

			cell = algorithmSteps[count-2].xhat
			c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
			
			$(c).css("border", "5px solid black")
			$(c).css("background-color", "pink")

			$(".announcement").children().text("These are the possible split pairs.")
		}

		if (Object.keys(algorithmSteps[count]) == "SmallDelta")
		{
			smDelta = algorithmSteps[count].SmallDelta
			
			$(".announcement").children().text("Here, we excluded the coordinates who's x value is more than our current minimum distance of " +
				smDelta.toFixed(2) + " from the center point shown in pink here. Next step is to measure the 7 units up from ascending Y. (See other post as to why it's always 7!)")
		}

		if (Object.keys(algorithmSteps[count]) == "CP")
		{
			$(".announcement").children().text("Test finished! Closest pair is " +
				"(" + algorithmSteps[count].CP[0] + ") and (" + algorithmSteps[count].CP[1] + ")")

			for (cell of algorithmSteps[0].Points) //this just colours all cells black at the start of loop
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				$(c).css("background-color", "black")
				$(c).css("border", "0px solid black")
				$(c).text("") //counter)
				//$(c).text(cell[0]) //counter)
			}
			for (cell of algorithmSteps[count].CP)
			{
				c = $(".cells").closest("tr").eq(cell[1]).children().eq(cell[0])
				
				// $(c).css("border", "5px solid red")
				$(c).css("background-color", "red")
				$(c).text("") 
				//$(c).text(cell[0]) //counter)
			}
		}
		console.log("Count = " + count.toString())
		count++;
		
	}	
}

$(".cells").on('mousedown', function()
 {

  	//Get data on where user just clicked
    row = $(this).closest("tr").index()
    col = $(this).closest("td").index()
    item_clicked = $(this)
    //Just for debugging, print this
    total = points_list("add")

    // Create XHR object
    var xhr = new XMLHttpRequest();

    //We want a JSON response
    xhr.responseType = "json"

    // OPEN - method, url/file, async(bool)
    //Request GET method with following URL and make is asyncronous
    xhr.open('GET', 'process/col=' + col.toString() + 
    				"&row=" + row.toString() + 
    				"&total=" + 
    				total.toString()
    				, true);
    
    // Sends request
    xhr.send(); 
    var result;

    xhr.onload = function () 
	    {
	    //Request complete
	    if (xhr.readyState === 4) // 4 is xhr.DONE
	    { 
	        if (xhr.status === 200) // 200 is "OK"
	        { 
	        	result = xhr.response;
	        	console.log(xhr)
	        	console.log(result)

	        	//Check if coordinate position was valid
	        	if (result.error == 'pass')
	        	{
	        		//Remove error message
	        		$(".announcement").children().text("")

	        		//Change colour of clicked item to black
					bgcolor = "black"
	    			item_clicked.css("background-color", bgcolor)

	    			//Check if more than 1 coordinate, means we can display our closest pair.
	        		if (result.total_coords > 1)
	        		{
		    			//Store the pair of coordinates
						firstItemInPair = result.cp[0]
						secondItemInPair = result.cp[1]
						$(".result").text("Min result found: " + firstItemInPair.toString() + " and " + secondItemInPair.toString())

						// Get object model of winning pair
						// First pass in ROW then COL. Eg: $(".rows").eq(ROW).children().(COL)
						objectmodelOfPairItem1 = $(".rows").eq(firstItemInPair[1]).children().eq(firstItemInPair[0])
						objectmodelOfPairItem22 = $(".rows").eq(secondItemInPair[1]).children().eq(secondItemInPair[0])

						// Change colour of previous winner back to black
						previousWinnerItem1 = previous_cp[0] 
						previousWinnerItem2 = previous_cp[1] 

						$(".rows").eq(previousWinnerItem1[1]).children().eq(previousWinnerItem1[0]).css("background-color", bgcolor)
						$(".rows").eq(previousWinnerItem2[1]).children().eq(previousWinnerItem2[0]).css("background-color", bgcolor)

						//Change colour of winner to gold
						$(objectmodelOfPairItem1).css("background-color", "red")
						$(objectmodelOfPairItem22).css("background-color", "red")

						// Add current winner to list of prev winners
						previous_cp[0] = firstItemInPair;
						previous_cp[1] = secondItemInPair;

						// Save list of steps
						
						algorithmSteps = result.steps;
						console.log(algorithmSteps)
					}
	        	}
	        	else if (result.error == 'xerror')
	        	{
	        		$(".announcement").children().text("That X coordinate is already full, please try a different coordinate!")

	     //    		for items in item_clicked
	     //    				// First pass in ROW then COL. Eg: $(".rows").eq(ROW).children().(COL)
						// objectmodelOfPairItem1 = $(".rows").eq(firstItemInPair[1]).children().eq(firstItemInPair[0])
	        	}
	    	}
	    }
};
     //200: "OK"
     //403: "Forbidden"
     //404: "Not Found"

})



