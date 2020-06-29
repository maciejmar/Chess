var clicked;
var inner;
var backColor;
var objexam;
var objexamFrom;
var bittenFigure;
var exam;
var examFrom;
var moves = 0;
const BLACK = 1;
const WHITE = 0;
var checkingFig = null;
var correctness = false;
$('#rB1').css('color', 'red');
$('#kW1').css('color', 'green');

var whites = ['rW1', 'kW1', 'bW1', 'KW1', 'qW1', 'bW2', 'kW2', 'rW2', 'pW1', 'pW2', 'pW3', 'pW4', 'pW5', 'pW6', 'pW7', 'pW8']; //0-15
var blacks = ['rB1', 'kB1', 'bB1', 'KB1', 'qB1', 'bB2', 'kB2', 'rB2', 'pB1', 'pB2', 'pB3', 'pB4', 'pB5', 'pB6', 'pB7', 'pB8']; //0-15

var posWhites = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']; //0-15
var posBlackes = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']; //0-15

var posW = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]];
var posB = [[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7]];

function activate(figure) {

    $('#a8').css('background-color', '#BF2F2F');
    $('h1').css('color', 'blue');
    var bl = false;
    var wh = false;
    var k = 16;
    var kfrom = 16;
    var examineFrom;
    var a;
    var m = $('h1').css("color");
    console.log(m);
}

function isOdd(num) {
    num = num % 2;
    if (num != 0)
        return true;
    else
        return false;
}

function Figure(id, team, xy, checkedK, alive) {
    this.id = id;
    this.team = team;
    this.xy = xy;
    this.checkedK = checkedK;
    this.alive = alive;
}
Figure.prototype.getId = function () {
    return this.id;
}
Figure.prototype.setId = function (id) {
    this.id = id;
}
Figure.prototype.getTeam = function () {
    return this.team;
}
Figure.prototype.setTeam = function (team) {
    this.team = team;
}
Figure.prototype.getXY = function () {
    return this.xy;
}
Figure.prototype.setXY = function (xy) {
    this.xy = xy;
}

function makeObj(n) {
    var figures = {}
    for (var i = 0; i < n; i++) {
        figures[i] = new Figure(whites[i], 0, posW[i], false, true);
        figures[i + 16] = new Figure(blacks[i], 1, posB[i], false, true);
    }

    return figures;
}

function Moves(nr, whites, fromM, moveFrom, moveTo) {
    this.nr = nr;
    this.whites = whites;
    this.fromM = fromM;
    this.moveFrom = [0, 0];
    this.moveTo = [0, 0];

}

var from = true;
//initializing movesObj - arrays of Objects
var movesObj = {}
movesObj[0] = new Moves(1, whites, 1, (0, 0), (0, 0));

//creating buttons:
var buttons = document.querySelectorAll(".fieldB,.fieldW");

//call the function:
figs = makeObj(16);

//function gaining object by specific value
function findById(ids) {
    for (let prop in figs) {
        console.log(`now id is          ${figs[prop].id}`);
        var abc = figs[prop].id.toString();
        if (figs[prop].id === ids) {
            //console.log('yes');
            return figs[prop];
        }
        //console.log(" this is it - id=" + figs[prop].id + " and ids=" + ids);

    }
    return "nothing";
}

//function of getting object by value and parameter
function findByParamValue(param, ids) {
    for (let prop in figs) {
        //console.log(`now id is          ${(figs[prop])[param]}`);
        let valueToCompare = (figs[prop])[param];
        if (JSON.stringify(valueToCompare) === JSON.stringify(ids)) {
            //console.log('yes');
            return figs[prop];
        }
        //console.log(" this is it - id=" + (figs[prop])[param] + " and ids=" + ids);

    }
    return "nothing";
}

var k = 16;
var objIndex;
// Buttons activation
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {

        if (from) {
            backColor = $(this).css('background-color');
            clicked = this; //clicked is now an clicked-div

            // exam has pair of coordinates (x,y) of this-object
            exam = changeToNumb($(this).attr('id'));

            objexam = findByParamValue('xy', exam); //objexam is an object in figs-array with coordinates of this-object


            var examine = $(this).attr('id');
            examineFrom = examine; //old, alpha-numeric position of figure witch will be moved fE: d2
            objexamFrom = objexam; // alpha-numieric position of figure
            examFrom = exam;

            
            if (clicked.innerHTML != "" && ((objexam.team == BLACK && isOdd(moves)) || (objexam.team == WHITE && !isOdd(moves)))) {
                this.style.backgroundColor = "blue";
                inner = this.innerHTML;
                from = false;
                movesObj[moves].fromM = 0;
            }

        }

        if (!from && this.innerHTML != inner) {
            examine = $(this).attr('id');
            exam = changeToNumb($(this).attr('id')); //numeric coordinates
            objexam = findByParamValue('xy', examFrom);

            //settle the figure on new position on dashboard
            bittenFigure = this.innerHTML;
            this.innerHTML = inner;

            clicked.innerHTML = "";
            clicked.backgroundColor = backColor;
            $(clicked).css('background', backColor);
            $(clicked).css('opacity', 1);

            //injection of new coords in figures properties
            for (var i = 0; i < Object.keys(figs).length; i++) {
                if (JSON.stringify(figs[i].xy) == JSON.stringify(objexam.xy))
                    break;
            }
            figs[i].xy = exam;

            a = proof(figs, exam)[0];
            b = proof(figs, exam)[1];
            var validation = false;
			
			
            if (validMoveNew(objexam, examFrom)) {
                // tu było : injection figure on new position, deleting on old
                validation = true;

                //if there is an alien on new position


                var bittenF = null;
                if (b != null) {
                    //if in b is captured figure
                    if (a.id == objexam.id)
                        objIndex = findObjByValue(b.id);

                    //if in a is captured figure
                    else
                        objIndex = findObjByValue(a.id);

                    //captured figure - has zeros as coords.
                    bittenF = figs[objIndex];
                    figs[objIndex].xy = [0, 0];
                    figs[objIndex].alive = false;

                }
                var regPawn = new RegExp("p..");
                var newQueenW = `<div> <i class= 'fas fa-chess-queen'   id='qW2' style='font-size:58px;color:white'></i></div>`;
                var newQueenB = `<div> <i class= 'fas fa-chess-queen'   id='qB2' style='font-size:58px;color:black'></i></div>`;

                if (regPawn.test(objexam.id) && (objexam.team && objexam.xy[1] == 1 || !objexam.team && objexam.xy[1] == 8)) {
                    if (objexam.team) {
                        findById(objexam.id).id = "qB2";
                        this.innerHTML = newQueenB;
                    } else {
                        findById(objexam.id).id = "qW2";
                        this.innerHTML = newQueenW;
                    }

                }

			
			
            
            //if (!a) then we on move with WHITES
            if (!figs[i].team)
                king = figs[findObjByValue("KW1")]; // if WHITES move - verifing if White King is not checked
            else
                king = figs[findObjByValue("KB1")]; // respectively for BLACKES

			  if ( ifChecked(figs, king)) {
				  validation=false;
				  king.checkedK = true;
			  }
			  else king.checkedK = false;
			}  
      
            if (validation) {
                if (figs[i].team)
                    king = figs[findObjByValue("KW1")]; // if Blackes are checking Whites this move
                else
                    king = figs[findObjByValue("KB1")]; // if Whites are checking Blackes this move

				moves++;
				var teams;

                if (isOdd(moves)) {
                    teams = 0;
                    $('h1').text("Chess. Blackes move");
                    if (ifChecked(figs, king)) {
						king.checkedK = true;
                        $('h1').text("Chess. A play for two brains. Blackes move. Check!");
                        
                    }
					else king.checked = false;
                } 
				else {
                    teams = 1;
                    $('h1').text("Chess. Whites move");
                    if (ifChecked(figs, king)) {
						king.checkedK = true;
                        $('h1').text("Chess. A play for two brains. Whites move. Check!");
                        
                    }
					else king.checked = false;
				}
					movesObj[moves] = new Moves(moves, teams, 1, examFrom, exam); 
					movesObj[moves].from = 1;
					//$('movesList').text(`examFrom : exam`); 


						//if (objexam.id[0] == 'K') king.xy = exam;
						if (king.checkedK) {
							if (ifMate(king) && chekingFigNotToBeat(checkingFig)) {

								$('h1').text("Chess. A play for two brains. Check Mate!!!");
								
								
								//sleep(4000);
								//location.reload();
							}
						}	
				
                } //end of inner validation block
 					
                
             
			
				
		      //FALSE MOVE
			  if (!validation) {
				
				
                //if there was an alien on not allowed position


                if (a.id != objexam.id) {
                    b = a;
                    a = objexam;
                }

                objIndex = findObjByValue(a.id);
                figs[objIndex].xy = examFrom;

                if (b) {

                    objIndex = findObjByValue(b.id);
                    figs[objIndex].xy = exam;
                    figs[objIndex].alive = true;
                    this.innerHTML = "";
                }

                //injection of new coords in figures properties
                for (var i = 0; i < Object.keys(figs).length; i++) {
                    if (JSON.stringify(figs[i].xy) == JSON.stringify(objexam.xy))
                        break;
                }
                figs[i].xy = examFrom;
                


                if (!b)
                    this.innerHTML = "";
                else {
                    this.innerHTML = bittenFigure;

                }
                clicked.innerHTML = inner;

            

				clicked.backgroundColor = backColor;
				$(clicked).css('background', backColor);
				$(clicked).css('opacity', 1);
			    
			  }
			
			from = true;
		}
		 
				
        
		

    });

}

function chekingFigNotToBeat(checkingFig) {

    var fig = new Figure;
	var xyz = [];

    for (var i = 0; i < Object.keys(figs).length; i++) {
	    xyz[0] = figs[i].xy[0];
	    xyz[1] = figs[i].xy[1];
        fig = Object.assign({},figs[i]);
        fig.xy[0] = checkingFig.xy[0];
        fig.xy[1] = checkingFig.xy[1];

        if (checkingFig.team != figs[i].team && validMoveNew(fig, xyz)) {
			figs[i].xy[0] = xyz[0];
			figs[i].xy[1] = xyz[1];
			return false;
		}
		figs[i].xy[0] = xyz[0];
		figs[i].xy[1] = xyz[1];
    }
    return true;
}

function findIndexOfFigureByPosition(examine) {
    for (var j = 0; j < posWhites.length; j++) {
        if (posWhites[j] == examine) {
            return j;
        } else if (posBlackes[j] == examine) {
            return j;
        }

    }
}

//veryfing, if moved object objexam, on position xy2, is valid.
function validMoveNew(objexam, xy1) {
    var xy2 = objexam.xy;
    var pomCoord = [0, 0];

    var regKnight = new RegExp("k..");
    var regRook = new RegExp("r..");
    var regPawn = new RegExp("p..");
    var regBishop = new RegExp("b..");
    var regKing = new RegExp("K..");
    var regQueen = new RegExp("q..");

    var dist = Math.max(Math.abs(xy2[1] - xy1[1]), Math.abs(xy2[0] - xy1[0]));
    for (i = 1; i < dist; i++) {
        pomCoord[0] = i * dividing(Math.abs(xy2[0] - xy1[0]), xy2[0]);
        pomCoord[1] = i * dividing(Math.abs(xy2[1] - xy1[1]), xy2[1]);
        if (xy2[0] > xy1[0])
            pomCoord[0] = xy1[0] + pomCoord[0];
        else
            pomCoord[0] = xy1[0] - pomCoord[0];
        if (xy2[1] > xy1[1])
            pomCoord[1] = xy1[1] + pomCoord[1];
        else
            pomCoord[1] = xy1[1] - pomCoord[1];
        var pomCoordStr = changeToId(pomCoord);
        var ifFound = findByParamValue("xy", pomCoord);

        if (ifFound != "nothing" && ifFound.id != objexam.id) {
            //var idf = ifFound.id[0];
            var idFig = objexam.id[0];
            if (idFig != 'k')
                return false;
        }

    }

    if (xy1 === xy2)
        return false;
    else {
        var twoFigures = proof(figs, xy2);
        var a,
        b;
        var a = twoFigures[0];
        if (Object.keys(twoFigures).length == 2) {

            if (twoFigures[1].id == objexam.id) {
                b = twoFigures[0];
                a = twoFigures[1];
            } else
                b = twoFigures[1];
        } else
            b = null;

        if (Object.keys(twoFigures).length == 2 && a.team === b.team)
            return false;

        var temp = b;
        if (regRook.test(objexam.id) && (abso(xy2, xy1, 0, 1) == 0 || abso(xy2, xy1, 1, 1) == 0))
            return true;
        if (regKnight.test(objexam.id) && ((abso(xy2, xy1, 0, 1) == 2 && abso(xy2, xy1, 1, 1) == 1) || (abso(xy2, xy1, 0, 1) == 1 && abso(xy2, xy1, 1, 1) == 2)))
            return true;
        if (regBishop.test(objexam.id) && (abso(xy2, xy1, 0, 1) == abso(xy2, xy1, 1, 1)))
            return true;
        if (regKing.test(objexam.id) && (abso(xy2, xy1, 1, 1) <= 1) && (abso(xy2, xy1, 0, 1) <= 1))
            return true;
        if (regQueen.test(objexam.id) && (abso(xy2, xy1, 0, 1) == abso(xy2, xy1, 1, 1) || abso(xy2, xy1, 0, 1) == 0 || abso(xy1, xy2, 1, 1) == 0))
            return true;
        if (regPawn.test(objexam.id) && dontGoBackPawn(objexam.team, xy1, xy2) &&
            ((temp == null && abso(xy2, xy1, 1, 1) == 2 && abso(xy2, xy1, 0, 1) == 0) && ((xy1[1] == 7 && objexam.team) || (xy1[1] == 2 && !objexam.team)) || (temp == null && abso(xy2, xy1, 1, 1) == 1 && abso(xy2, xy1, 0, 1) == 0)
                 || (abso(xy2, xy1, 0, 1) == 1 && abso(xy2, xy1, 1, 1) == 1 && temp != null && a != b)))
            return true;
        else
            return false;

    }

}

function dividing(a, b) {
    if (a / b > 0)
        return 1;
    else
        return 0;
}

function changeToNumb(position) {
    var xy = [0, 0];
    var kkk = position.charCodeAt(0) - 96;
    xy[0] = kkk;
    xy[1] = Number(position[1]);
    return xy;
}

function proof(figs, objexamXY) {

    var filtered = {};
    let j = 0;

    for (var i = 0; i < Object.keys(figs).length; i++) {
        if (JSON.stringify(figs[i].xy) == JSON.stringify(objexamXY))
            filtered[j++] = figs[i];
    }
    console.log('filtered here = ' + JSON.stringify(filtered));
    if (i == Object.keys(figs))
        return null;

    return filtered;

}

function findObjByValue(ids) {
    for (var i in figs) {
        if (figs[i].id == ids) {
            return i;
        }
    }
    return -1;
}

function abso(x, y, nr, a) {
    if (a)
        return Math.abs(x[nr] - y[nr]);
    else
        return x[nr] - y[nr];

}
function changeToId(xy) {
    var chr = [];
    chr[0] = String.fromCharCode(96 + xy[0]);
    chr += String.fromCharCode(48 + xy[1]);
    return chr;
}

function dontGoBackPawn(objTeam, xy1, xy2) {
    var ret;
    //objTeam ===0 ? ( (xy2[1]<xy1[1]) ? return true : return false) : ( (xy1[1]<xy2[1]) ? return true : return false);
    objTeam == 0 ? (xy2[1] > xy1[1] ? ret = true : ret = false) : (xy1[1] > xy2[1] ? ret = true : ret = false);
    return ret;

}

function ifChecked(figs, king) {
    var xy1 = king.xy;
	var pom;
    for (var j = 0; j < Object.keys(figs).length; j++) {
        if (figs[j].team != king.team && figs[j].alive) {
            pom = figs[j].xy;
            figs[j].xy = king.xy;

            if (validMoveNew(figs[j], pom)) {
                figs[j].xy = pom;
                checkingFig = figs[j];
                return true;
            }
            figs[j].xy = pom;
        }

    }
    return false;
}

function ifMate(king) {
    var xyt = [];
    var xy1 = [];
    xy1[0] = king.xy[0];
    xy1[1] = king.xy[1];

    var x = xy1[0];
    var y = xy1[1];
    kingPom = new Figure;
    kingPom = king;
    for (var i = 0; i < 7; i++) {

        xyt = [x, y + 1, x + 1, y + 1, x + 1, y, x + 1, y - 1, x, y - 1, x - 1, y - 1, x - 1, y, x - 1, y + 1];
        if ((0 < xyt[2 * i] && xyt[2 * i] < 9) && (0 < xyt[2 * i + 1] && xyt[2 * i + 1] < 9)) {
            kingPom.xy[0] = xyt[2 * i];
            kingPom.xy[1] = xyt[2 * i + 1];
            if (validMoveNew(kingPom, xy1) && !ifChecked(figs, kingPom)) {
                king.xy[0] = xy1[0];
                king.xy[1] = xy1[1];
                return false;
            }

        }
    }
    king.xy[0] = xy1[0];
    king.xy[1] = xy1[1];
    return true;
}

function coord(axisValue, i) {
    return (((axisValue + i) % 8) + 1);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
