import random

def check_possible_win(arr, arr_oposto):

    n=0
    result=[False]
    val=[]

    #Checks horizontally

    for coordinates in arr:
        n=0

        for x in range(3):
            if [coordinates[0],x] in arr:
                n += 1
            elif [coordinates[0],x] in arr_oposto:
                val=[]
            elif not [coordinates[0],x] in arr_oposto:
                val=[coordinates[0],x]

        if(n == 2) and val != []:
            result=[True, val, "horizontal"]
            break
        else:
            result=[False, False]
    
    #Checks vertically

    if result[0] == False:

        val=[]

        for coordinates in arr:
            n=0

            for y in range(3):
                if [y, coordinates[1]] in arr:
                    n += 1
                elif [y,coordinates[1]] in arr_oposto:
                    val=[]
                elif not [y,coordinates[1]] in arr_oposto:
                    val=[y,coordinates[1]]

            if(n == 2) and val != []:
                result=[True, val, "vertical"]
                break
            else:
                result=[False, False]

    #Checks main diagonal

    if result[0] == False:

        val=[]

        for coordinates in arr:
            n=0

            for i in range(3):
                if [i,i] in arr:
                    n += 1
                elif [i,i] in arr_oposto:
                    val=[]
                elif not [i,i] in arr_oposto:
                    val=[i,i]

            if(n == 2) and val != []:
                result=[True, val, "diagonal"]
                break
            else:
                result=[False, False]


    #Checks anti diagonal

    if result[0] == False:

        val=[]

        for coordinates in arr:
            n=0

            y=2

            for x in range(3):
                if [y,x] in arr:
                    n += 1
                elif [y,x] in arr_oposto:
                    val=[]
                elif not [y,x] in arr_oposto:
                    val=[y,x]
                y-=1

            if(n == 2) and val != []:
                result=[True, val, "anti-diagonal"]
                break
            else:
                result=[False, False]


    with open("output.txt","w") as f:
        f.write(str(arr))
        f.write(str(result))

    return result 

def get_possible_moves(arr):
    row = 0
    possible_choices = []
    cross_tiles = []
    circle_tiles = []
    for index in arr:
        col = 0
        for item in index:
            if (item == '0'):
                possible_choices.append([row,col])
            elif (item == '1'):
                cross_tiles.append([row,col])
            elif (item == '2'):
                circle_tiles.append([row,col])
            col += 1
        row += 1
    return [possible_choices, cross_tiles, circle_tiles]

def get_move(arr):
    return_array = []
    tiles = get_possible_moves(arr)
    possible_moves = tiles[0]
    cross_tiles = tiles[1]
    circle_tiles = tiles[2]

    #Checks win conditions
    return_array = check_possible_win(circle_tiles, cross_tiles)
    if return_array[0] == True:
        val = return_array[1]
    else:
        return_array = check_possible_win(cross_tiles, circle_tiles)
        if return_array[0] == True:
            val = return_array[1]
        else:
            val = random.choice(possible_moves)

    # Returns next move
    return val
