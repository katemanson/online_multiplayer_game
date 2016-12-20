
var LeaderBoard = function(){
    var leaderBoardButton = document.getElementById('leader-board');
    leaderBoardButton.onclick = handleLeaderBoardButtonClick;

}

LeaderBoard.prototype = {

  handleLeaderBoardButtonClick: function(event){
    if (event.target == modal) {
        modal.style.display = "none";
      }
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("leader-board");
    var span = document.getElementsByClassName("close")[0];
    this.makeTableData();
  },

  makeTableData: function(){
    var parent = document.getElementById('table-data');

  }
}

class="modal-body"

module.exports = LeaderBoard;


// var modal = document.getElementById('myModal');
//
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
