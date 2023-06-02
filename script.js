class chess {
  constructor() {
    this.root = document.body.querySelector("#root")
    this.container = document.createElement("div");
    this.container.className = "container";
    this.secArr = [];
    this.moves = [];
    this.turn = "white";
    this.check = false;
    this.checkMate = false;
  }

  createBoard() {
    for(let rank = 8; rank >= 1; rank--) {
      for(let file = 1; file <= 8; file++) {
        let sec = document.createElement("section");
        sec.setAttribute("data-file",file);
        sec.setAttribute("data-rank",rank);
        let bgcolor = (file + rank) % 2 == 0 ? "saddlebrown" : "#e3e3e3";
        sec.style.backgroundColor = bgcolor;
        this.secArr.push(sec);
        this.container.appendChild(sec);
      }
    }
    this.root.appendChild(this.container);
  }

  addPieces() {
    for (let sec of this.secArr) {
      let file = sec.getAttribute("data-file");
      let rank = sec.getAttribute("data-rank");
      let img = document.createElement("img");
      img.classList.add("piece");
      let points = 0;
      let colour = " ";
      // Adding pawn
      if (rank == 2 || rank == 7) {
        img.src = rank == 2 ? "images/white/pawn.png" : "images/black/pawn.png";
        points = rank ==2 ? -1 : 1;
        colour = rank == 2 ? "white" : "black";
        img.setAttribute("data-name","pawn");
        img.setAttribute("data-colour",colour);
        img.setAttribute("data-points",points);
        sec.appendChild(img);
      }
      // Adding knight
      else if ( (rank == 1 || rank == 8) && (file == 2 || file == 7) ) {
        img.src = (rank == 1 && (file == 2 || file == 7) ) ? "images/white/knight.png" : "images/black/knight.png";
        points = (rank == 1 && (file == 2 || file == 7) ) ? -3 : 3;
        colour = (rank == 1 && (file == 2 || file == 7) ) ? "white" : "black";
        img.setAttribute("data-name","knight");
        img.setAttribute("data-colour",colour);
        img.setAttribute("data-points",points);
        sec.appendChild(img);
      }
      // Adding bishop
      else if ( (rank == 1 || rank == 8) && (file == 3 || file == 6) ) {
        img.src = (rank == 1 && (file == 3 || file == 6) ) ? "images/white/bishop.png" : "images/black/bishop.png";
        points = (rank == 1 && (file == 3 || file == 6) ) ? -3 : 3;
        colour = (rank == 1 && (file == 3 || file == 6) ) ? "white" : "black";
        img.setAttribute("data-name","bishop");
        img.setAttribute("data-colour",colour);
        img.setAttribute("data-points",points);
        sec.appendChild(img);
      }
      // Adding rook
      else if ( (rank == 1 || rank == 8) && (file == 1 || file == 8) ) {
        img.src = (rank == 1 && (file == 1 || file == 8) ) ? "images/white/rook.png" : "images/black/rook.png";
        points = (rank == 1 && (file == 1 || file == 8) ) ? -5 : 5;
        colour = (rank == 1 && (file == 1 || file == 8) ) ? "white" : "black";
        img.setAttribute("data-name","rook");
        img.setAttribute("data-colour",colour);
        img.setAttribute("data-points",points);
        sec.appendChild(img);
      }
      // Adding queen
      else if ( (rank == 1 || rank == 8) && file == 4 ) {
        img.src = (rank == 1 && file == 4 ) ? "images/white/queen.png" : "images/black/queen.png";
        points = (rank == 1 && file == 4 ) ? -9 : 9;
        colour = (rank == 1 && file == 4 ) ? "white" : "black";
        img.setAttribute("data-name","queen");
        img.setAttribute("data-colour",colour);
        img.setAttribute("data-points",points);
        sec.appendChild(img);
      }
      // Adding king
      else if ( (rank == 1 || rank == 8) && file == 5 ) {
      img.src = (rank == 1 && file == 5 ) ? "images/white/king.png" : "images/black/king.png";
      points = (rank == 1 && file == 5 ) ? -Infinity : Infinity;
      colour = (rank == 1 && file == 5 ) ? "white" : "black";
      img.setAttribute("data-name","king");
      img.setAttribute("data-colour",colour);
      img.setAttribute("data-points",points);
      sec.appendChild(img);
      }
    }
  }

  move(currentPlace, newPlace) {
    let currentFile = currentPlace[0];
    let currentRank = currentPlace[1];
    let newFile = newPlace[0];
    let newRank = newPlace[1];
    let currentSquare = this.container.querySelector(`[data-file = "${currentFile}"][data-rank = "${currentRank}"]`)
    let newSquare = this.container.querySelector(`[data-file = "${newFile}"][data-rank = "${newRank}"]`);
    newSquare.innerHTML = currentSquare.innerHTML;
    currentSquare.innerHTML = "";
    this.turn = this.turn == "white" ? "black" : "white";
  }

  defaultBg() {
    this.secArr.forEach(sec => {
      let f = parseInt(sec.dataset.file);
      let r = parseInt(sec.dataset.rank);
      sec.style.backgroundColor = (f+r)%2==0? "saddlebrown" : "#e3e3e3";
    });
  }

  showMoves(name, currentPlace, colour) {
    let currentFile = currentPlace[0];
    let currentRank = currentPlace[1];
    let square = "";
    let file;
    let Rank;
    this.moves = [];
    // For pawn
    if(name == "pawn") {
      let d = colour == "white" ? 1 : -1;
      let possible_moves = currentRank==2 && colour=="white"? [[0,1], [0,2]]: currentRank==7 && colour=="black"?[[0,-1],[0,-2]]: [[0,d]];
      Outerloop:
      for (let possible_move of possible_moves) {
        file = currentFile;
        Rank = currentRank;
        file += possible_move[0];
        Rank += possible_move[1];
        square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`);
        if ( (file > 0 && file < 9) && (Rank > 0 && Rank < 9) ) {
          if (square.innerHTML == "") {
            this.moves.push([file,Rank]);
          }
          else if(square.innerHTML != "") break Outerloop
        }
      }
      let diagonal_moves = [ [-1,d],[1,d] ];
      for (let diagonal_move of diagonal_moves) {
        file = currentFile;
        Rank = currentRank;
        file += diagonal_move[0];
        Rank += diagonal_move[1];
        if (file > 0 && file < 9 && Rank > 0 && Rank < 9) {
          square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`)
          if (square.innerHTML && square.querySelector("img").dataset.colour != colour) this.moves.push([file,Rank]);
        }     
      }
    }
    // For knight
    else if(name == "knight") {
      let possible_moves = [ [2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2] ]
      for (let possible_move of possible_moves) {
        file = currentFile + possible_move[0];
        Rank = currentRank + possible_move[1];
        square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`)
        if (file > 0 && file < 9 && Rank >0  && Rank < 9) {
          if (square.innerHTML == "") {
            this.moves.push([file,Rank]);
          }
          else if(square.querySelector("img").dataset.colour != colour) {
            this.moves.push([file,Rank]);
          }
        }
      }
    }
    // For bishop
    else if(name == "bishop") {
      let possible_moves = [ [1,1], [1,-1], [-1,1], [-1,-1] ]
      for (let possible_move of possible_moves) {
        file = currentFile;
        Rank = currentRank;
        Outerloop:
        for (let i = 1; i <= 8; i++) {
          file += possible_move[0];
          Rank += possible_move[1];
          square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`);
          if ( (file > 0 && file < 9) && (Rank > 0 && Rank < 9) ) {
            if (square.innerHTML == "") {
              this.moves.push([file,Rank]);
            }
            else if (square.querySelector("img").dataset.colour != colour) {
              this.moves.push([file,Rank]);
              break Outerloop;
            }
            else {
              break Outerloop;
            }
          }
        }
      }
    }
    // For rook
    else if(name == "rook") {
      let possible_moves = [ [1,0], [0,1], [-1,0], [0,-1] ]
      for (let possible_move of possible_moves) {
        file = currentFile;
        Rank = currentRank;
        Outerloop:
        for (let i = 1; i <= 8; i++) {
          file += possible_move[0];
          Rank += possible_move[1];
          square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`);
          if ( (file > 0 && file < 9) && (Rank > 0 && Rank < 9) ) {
            if (square.innerHTML == "") {
              this.moves.push([file,Rank]);
            }
            else if (square.querySelector("img").dataset.colour != colour) {
              this.moves.push([file,Rank]);
              break Outerloop;
            }
            else {
              break Outerloop;
            }
          }
        }
      }
    }
    // For queen
    else if(name == "queen") {
      let possible_moves = [ [1,1], [1,-1], [-1,1], [-1,-1], [1,0], [0,1], [-1,0], [0,-1] ]
      for (let possible_move of possible_moves) {
        file = currentFile;
        Rank = currentRank;
        Outerloop:
        for (let i = 1; i <= 8; i++) {
          file += possible_move[0];
          Rank += possible_move[1];
          square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`);
          if ( (file > 0 && file < 9) && (Rank > 0 && Rank < 9) ) {
            if (square.innerHTML == "") {
              this.moves.push([file,Rank]);
            }
            else if (square.querySelector("img").dataset.colour != colour) {
              this.moves.push([file,Rank]);
              break Outerloop;
            }
            else {
              break Outerloop;
            }
          }
        }
      }
    }
    // For king
    else if(name == "king") {
      let possible_moves = [ [1,1], [1,-1], [-1,1], [-1,-1], [1,0], [-1,0], [0,1], [0,-1] ]
      for (let possible_move of possible_moves) {
        file = currentFile + possible_move[0];
        Rank = currentRank + possible_move[1];
        square = this.container.querySelector(`[data-file = "${file}"][data-rank = "${Rank}"]`)
        if (file > 0 && file < 9 && Rank >0  && Rank < 9) {
          if (square.innerHTML == "") {
            this.moves.push([file,Rank]);
          }
          else if(square.querySelector("img").dataset.colour != colour) {
            this.moves.push([file,Rank]);
          }
        }
      }
    }
  }

  IsgameOver() {
    let king = this.container.querySelectorAll(`[data-name = 'king'][data-colour = '${this.turn}']`);
    if (king) {}
  }

  start() {
    let cFile = null;
    let cRank = null;
    let nRank = null;
    let nFile = null;
    let name = " ";
    let color = " ";
    this.secArr.forEach(sec => {
      sec.addEventListener("click",()=>{
        if(cFile !== null && cRank !== null) {
          nFile = parseInt(sec.dataset.file);
          nRank = parseInt(sec.dataset.rank);
          if(cFile == nFile && cRank == nRank) return;
          for (let m of this.moves) {
            if (nFile == m[0] && nRank == m[1])
            this.move([cFile,cRank],[nFile,nRank])
          }
          cFile = null;
          cRank = null;
          this.defaultBg();
        } 
        else {
          if(sec.innerHTML !== "" && sec.querySelector("img").dataset.colour == this.turn) {
            cFile = parseInt(sec.dataset.file);
            cRank = parseInt(sec.dataset.rank);
            name = sec.querySelector("img").dataset.name;
            color = sec.querySelector("img").dataset.colour;
            this.showMoves(name,[cFile,cRank],color)
            this.container.querySelector(`[data-file = "${cFile}"][data-rank = "${cRank}"]`).style.backgroundColor = "yellow";
            for (let m of this.moves) {
              this.container.querySelector(`[data-file = "${m[0]}"][data-rank = "${m[1]}"]`).style.backgroundColor = (m[0]+m[1])%2==0?"#d00":"red";
            }
          }
        }
      })
    })
  }

}
  
let Chess = new chess();
Chess.createBoard();
Chess.addPieces();
Chess.start();
