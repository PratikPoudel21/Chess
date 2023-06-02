// function minimax(node, depth, alpha, beta, maximizingPlayer) {
//     if (depth === 0 || /* check if node is terminal */) {
//       return /* evaluate node score */;
//     }
  
//     if (maximizingPlayer) {
//       let maxEval = -Infinity;
//       for (/* each child node */) {
//         let eval = minimax(child, depth - 1, alpha, beta, false);
//         maxEval = Math.max(maxEval, eval);
//         alpha = Math.max(alpha, eval);
//         if (beta <= alpha) {
//           break; // Beta cutoff
//         }
//       }
//       return maxEval;
//     } else {
//       let minEval = Infinity;
//       for (/* each child node */) {
//         let eval = minimax(child, depth - 1, alpha, beta, true);
//         minEval = Math.min(minEval, eval);
//         beta = Math.min(beta, eval);
//         if (beta <= alpha) {
//           break; // Alpha cutoff
//         }
//       }
//       return minEval;
//     }
//   }

//   console.log("Hello world!");
// const select = (element, all = false) => {
//     element = element.trim()
//     if (all) {
//       return [...document.querySelectorAll(element)]
//     } else {
//       return document.querySelector(element)
//     }
//   }
