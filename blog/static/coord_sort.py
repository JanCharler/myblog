'''
Used to sort coordinates
'''
import pdb

def merge(arr1, arr2, x_or_y_index):
	'''
	Takes in 2 sorted arrays and merges them
	'''

	global inversion

	n = max(len(arr1), len(arr2))
	C = [None]*(len(arr1) + len(arr2))
	i =0
	j=0

	for k in range(len(C)):

		# End case
		if i >= len(arr1):
			C[k] = arr2[j]
			j+=1
			continue
		elif j >= len(arr2):
			C[k] = arr1[i]
			i+=1
			continue

		# Sorting
		if arr1[i][x_or_y_index] <= arr2[j][x_or_y_index]:		
			C[k] = arr1[i]
			i+=1
		elif arr2[j][x_or_y_index] <= arr1[i][x_or_y_index]:
			C[k] = arr2[j]
			j+=1	

			# Inversion counter

			# Element of second array is added
			# Add to counter the amount of elements remaining in first array
			# inversion += len(arr1)-i
			# print(f"arr: {arr1,arr2} , i: {i} j: {j}")
			# print(f"Inversion. Val: {inversion}")

	return C
	
def merge_sort_coords(arr, coords):

	x_or_y_index = None

	if coords.lower() == 'x':
		x_or_y_index = 0
	elif coords.lower() == 'y':
		x_or_y_index = 1
	else:
		raise Exception("Please pass in a valid coordinate x or y as a string.")

	sorted_list = None
	


	def merge_sort(arr):

		# Find length of array
		n = len(arr)
		no2 = int(n/2)

		# Base case, return raw value when element size is 1
		if len(arr) == 1:
			return arr

		# Acquire halves

		left_half = arr[:no2]
		right_half = arr[no2:]


		# Recursive statement
		return merge( merge_sort(left_half), merge_sort(right_half), x_or_y_index )


	# Start recursion
	return merge_sort(arr)




if __name__ == "__main__":
	a = merge_sort_coords([(1,2),(0,3)], 'x')
	print(a)