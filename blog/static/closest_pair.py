from random import randint
from .coord_sort import *
import pdb

import matplotlib.pyplot as plt
import matplotlib.patches as patches

class StepsOfAlgorithm():

	def __init__(self):
		self.step_counter = 0
		self.stepsToSolving = {}

	def add(self, name, data):
		if (type(data) == list):
			data = tuple(data)
		self.stepsToSolving[self.step_counter] = {name:data}
		self.step_counter+=1
		# print("\n" + "Steps: " + str(self.stepsToSolving) + "\n")

	def return_steps(self):
		return self.stepsToSolving

	def clear(self):
		self.step_counter = 0
		self.stepsToSolving = {}

	def __str__(self):
		return "\n" + "Steps: " + str(self.stepsToSolving) + "\n"

steps_of_algorithm = StepsOfAlgorithm()

fig1 = plt.figure()
ax1 = fig1.add_subplot(111)
# center_point_xs = []

stepsToSolving = {}
step_counter = 0

def ClosestSplitPair(Px, Py, closest_non_split_pair):
	n = len(Px)
	no2 = int(len(Px)/2)
	x_hat = Px[no2][0]

	#steps_of_algorithm.add("SplitPairN", n)
	#steps_of_algorithm.add("SplitPairNover2", no2)
	#steps_of_algorithm.add("SplitPairX_hat", x_hat)

	small_delta = calculate_distance(closest_non_split_pair[0],closest_non_split_pair[1])
	lowest_val = float("inf")
	closesPair = [(0,0),(0,float("inf"))]

	#steps_of_algorithm.add("SmallDelta", small_delta)
	
	# List comprehension of all values inside the range that we want. Big-oh n
	print(f"This is Py {Py}")

	Sy = [val for val in Py if abs(val[0]- x_hat) <= small_delta]

	print(f"This is small delta {small_delta}")
	print(f"This is Sy {Sy}")
	print(f"This is x_hat {x_hat}")
	# print(f"Sy: {Sy}")
	Sy_n = len(Sy)

	steps_of_algorithm.add("SplitPx", Px)
	steps_of_algorithm.add("xhat", Px[no2])
	steps_of_algorithm.add("SplitPy", Py)
	steps_of_algorithm.add("Sy", Sy)
	steps_of_algorithm.add("SmallDelta", small_delta)
	
	#steps_of_algorithm.add("Announcement:", "Starting the test for split pairs.")
	#steps_of_algorithm.add("Announcement:", f"Units were split with {Px[no2]} being in the middle.")
	#steps_of_algorithm.add("Announcement:", f"Minimum distance between pairs to look for is {small_delta}")
	#steps_of_algorithm.add("Announcement:", f"Potential split pairs is narrowed down to {Sy}")
	
	# steps_of_algorithm.add("NumberOfPotentialSplitPairs", Sy_n)

	# Brute-force calculate the next points 7 in the y sorted coord list
	for i in range(Sy_n-1):

		for j in range(i+1, min(i+8, Sy_n)):

			# print(f"Comparing {Sy[i]} with  {Sy[j]}.")
			
			dist = calculate_distance(Sy[i], Sy[j])		
			#steps_of_algorithm.add("CoordinatesBeingCompared_1", Sy[i])
			#steps_of_algorithm.add("CoordinatesBeingCompared_2", Sy[j])
			#steps_of_algorithm.add("TheirDistance", dist)

			steps_of_algorithm.add("MeasuringDistOfPairs",[Sy[i],  Sy[j]])

			if dist < lowest_val:
				lowest_val = dist
				closesPair =  [Sy[i], Sy[j]] 

	#steps_of_algorithm.add("ClosestSplitPair", closesPair)
	#steps_of_algorithm.add("ClosestSplitPairDistance", lowest_val)
	return closesPair
	# plt.show()

def calculate_distance(coor1, coor2):
	'''
	Pass in a tuple of coords
	'''
	# print(f"Coor1: {coor1} and Coor2: {coor2}")
	x1 = coor1[0]
	y1 = coor1[1]

	x2 = coor2[0]
	y2 = coor2[1]

	dist = ((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) ** 0.5 

	# steps_of_algorithm.add("CoordinatesBeingCompared_LeftVsRight1",[coor1,coor2])
	# steps_of_algorithm.add("CoordinatesBeingCompared_LeftVsRight2",coor2)
	#steps_of_algorithm.add("TheirDistance",dist)
	return dist

def find_smallest(left, right):
	'''
	Returns a single tuple
	'''
	#print(f"left: {left} and right: {right}")
	leftmin =  calculate_distance(left[0], left[1])
	rightmin = calculate_distance(right[0], right[1])

	#steps_of_algorithm.add("LeftDist",leftmin)
	#steps_of_algorithm.add("RightDist",rightmin)
	#steps_of_algorithm.add("Announcement:","Distance of left pair is {}, distance of right pair is {} ".format(leftmin, rightmin))

	#print(f"Left: {leftmin} and Right: {rightmin} ")
	if leftmin<=rightmin:
		# print(f"Winner is {left}, with distance: {leftmin}")
		steps_of_algorithm.add("RightLeftComparisonWinner",[left, leftmin])
		return left
	else:
		steps_of_algorithm.add("RightLeftComparisonWinner",[right, rightmin])
		# print(f"Winner is {right}, with distance: {rightmin}")
		return right


def closest_pair(Px, Py):
	'''
	Takes in 2 args, Points in ascending order from their X coords and Points in ascending order from their Y coords.
	Px halves each time round the this recursive loop whilst Py stays the same.
	'''

	# Get number of coords, n
	n = len(Px) # max(len(Px), len(Py))
	n_over_2 = int(n/2)


	# Divide from X coordinate

	x_hat = Px[n_over_2]
	# center_point_xs.append(x_hat)

	left_side_x_ordered = Px[:n_over_2]
	right_side_x_ordered = Px[n_over_2:]

	#left_side_y_ordered = Py[:n_over_2]
	#right_side_y_ordered = Py[n_over_2:]

	
	# Base case:

	if n <= 3:
		#steps_of_algorithm.add("Announcement:",f"Hit a base case. No need to divide further. Coordinates = {n} in total.")
		#Return closest pair
		lowest_val = float("inf")
		closesPair = (-1,-1)

		# Save time and return the pair if n = 2
		if n < 3:
			steps_of_algorithm.add("ReturningPx", Px)
			#steps_of_algorithm.add("Announcement:","This side only has 2 coordinates, returning them: {}".format(Px))
			return Px

		# Brute-force compare distances
		steps_of_algorithm.add("BaseCaseWith3Coords",Px)
		for i in range(n-1):
			for j in range(i+1,n):

				dist = calculate_distance(Px[i], Px[j])

				steps_of_algorithm.add("MeasuringDistOfPairs",[Px[i],Px[j]])
				steps_of_algorithm.add("TheirDistance", dist)
				#steps_of_algorithm.add("Announcement:",f"Found distance between {Px[i]} and {Px[j]} to be {dist}")

				if dist < lowest_val:
					lowest_val = dist
					closesPair =  [Px[i],Px[j]] #[(x1,y1),(x2,y2)] 

		# print(f"Found closest pair: {closesPair}, with dist: {lowest_val}")
		steps_of_algorithm.add("ReturningWinner", [[closesPair, lowest_val]])
		# steps_of_algorithm.add("ReturningLowestValue", lowest_val)
		#steps_of_algorithm.add("Announcement:","Closest pair is: {}. Their result: {}".format(closesPair, lowest_val))
		return closesPair

	else:
		# steps_of_algorithm.add("ANNOUNCEMENT", "MIDDLE COORDINATE IS {}".format(x_hat))
		# Adding steps of algo to our list
		# steps_of_algorithm.add("Px", Px)
		# steps_of_algorithm.add("Py", Py)

		# steps_of_algorithm.add("n", n)
		# steps_of_algorithm.add("n_over_2", n_over_2)
		# steps_of_algorithm.add("x_hat", x_hat)



		#steps_of_algorithm.add("left_side_x_ordered", left_side_x_ordered)
		
		#steps_of_algorithm.add("right_side_x_ordered", right_side_x_ordered)
		divideVals = [(left_side_x_ordered), (right_side_x_ordered), x_hat]
		steps_of_algorithm.add("boardDivided", divideVals)
		#steps_of_algorithm.add("right_side_y_ordered", right_side_y_ordered)
		#steps_of_algorithm.add("Announcement:","Divided coordinate list in half.")
		#steps_of_algorithm.add("Announcement:",f"Left side coords: {left_side_x_ordered}")
		#steps_of_algorithm.add("Announcement:",f"Right side coords: {right_side_x_ordered}")

		# return find_smallest(closest_pair(left_side_x_ordered, left_side_y_ordered), closest_pair(right_side_x_ordered, right_side_y_ordered))
		ld = closest_pair(left_side_x_ordered, Py)
		rd = closest_pair(right_side_x_ordered, Py)

		steps_of_algorithm.add("LeftSideLowest", ld)
		steps_of_algorithm.add("RightSideLowest", rd)
		#steps_of_algorithm.add("Announcement:","Finished measuring left and right side. Left best is {}, right best is {}".format(ld, rd))


		# Calculate for split coordinates

		smallest_right_left =  find_smallest(ld,rd)
		#steps_of_algorithm.add("Announcement:","Smallest distance pair between those two is {}".format(smallest_right_left))
		d_split_pair = ClosestSplitPair(Px, Py, smallest_right_left)

		steps_of_algorithm.add("ThoroughlyCheckedCoords", Px)
		#steps_of_algorithm.add("SmallestOfRightLeft", smallest_right_left)
		#steps_of_algorithm.add("SmallestIncludingSplitPair", d_split_pair)

		cp = find_smallest(d_split_pair, smallest_right_left)

		#steps_of_algorithm.add("ClosestPairWinner", cp)
		#steps_of_algorithm.add("Announcement:","Calculated closest pair: {}".format(cp))

		# show_graph(Px, Py, cp)

		return cp

def show_graph(Px, Py, cp,):

	

	n = max(len(Px), len(Py))
	no2 = int(n/2)

	for points in Points:
		plt.plot(points[0], points[1], 'r.')
	
	plt.axis([0, graph_value_size, 0, graph_value_size])

	plt.plot(cp[0][0], cp[0][1], 'g.')
	plt.plot(cp[1][0], cp[1][1], 'g.')
	
	smallestdist = calculate_distance(cp[0], cp[1])
	nline = Px[no2][0]

	delta_over_2 = smallestdist / 2
	small_delta = smallestdist
	x_hat = Px[no2][0]

	
	count = 0
	for points in Points:
		# pdb.set_trace()
		if abs(points[0] - x_hat) < small_delta:

			if count%2 == 0:
					fc = "orange"
			else:
					fc = "orange"
			count+=1
			# Draw 8 squares starting at base of this point
			ypos = points[1]

			# for i in range(2):
			# 	xpos = x_hat-small_delta
			# 	for j in range(4):
			# 		ax1.add_patch(
			# 			patches.Rectangle(
			# 				(xpos,ypos),
			# 				delta_over_2,
			# 				delta_over_2,
			# 				alpha=0.3,
			# 				facecolor=fc, edgecolor="black", linewidth=2, linestyle="solid"))
			# 		xpos += delta_over_2
			# 	ypos+=delta_over_2

	# plt.plot([nline, nline], [0, graph_value_size], color='b', linestyle='-', linewidth=1)

	plt.show()
	plt.close()


class Coordinates():
	
	def __init__(self, coord_list):
		# Inits with a list object
		self.coord_list = coord_list
		self.x_coors = []

	def count(self):
		return len(self.coord_list)

	def add(self, x, y):
		'''
		Adds coordinates if
		doesn't exist corrently
		'''
		coord = (x, y)
		if coord not in self.coord_list:
			if coord[0] not in self.x_coors:
				self.coord_list.append(coord)
				self.x_coors.append(coord[0])
			else:
				
				# print("Couldn't add coord as there is already an X coord there!")
				# print(coord[0])
				# print(self.coord_list)
				return 'xerror'
		else:
			# print("Couldn't add coord as it already exists here!")
			return 'existerror'
		return 'pass'

	def clear(self):
		self.coord_list = []
		self.x_coors = []

	def cp(self):
		return find_closest_pair(self.coord_list)




def find_closest_pair(Points):
	print("\n\n")
	global steps_of_algorithm
	# (Create a step counting class- using this for my online Blog)
	# NOW IN GLOBAL steps_of_algorithm = StepsOfAlgorithm()
	steps_of_algorithm = StepsOfAlgorithm()
	steps_of_algorithm.add("Points", Points)

	# Step 1 is to arrange the points in X and Y order.
	#steps_of_algorithm.add("Announcement:","Ordering in X and Y using merge sort (O(nlogn)) time.")
	Px = merge_sort_coords(Points, 'x')
	Py = merge_sort_coords(Points, 'y')

	steps_of_algorithm.add("OrderedX", Px)
	steps_of_algorithm.add("OrderedY", Py)

	#steps_of_algorithm.add("Announcement:","Starting Recursive Loop")
	# Now divide and conquer:
	cp = closest_pair(Px, Py)
	steps_of_algorithm.add("CP", cp)
	# steps_of_algorithm.add("Announcement:",f"Finished calculation. Closest pair is {cp}")
	print("\n\n")
	return cp, steps_of_algorithm.return_steps()


if __name__ == '__main__':
	find_closest_pair(Points)