
var LeaderBoard = function(){
    var leaderBoardButton = document.getElementById('leader-board');
    this.leaderBoardData = [];
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

  getData: function(){
    var url = "http://localhost:3000/markers";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
      if (request.status === 200) {
        var jsonString = request.responseText;
        var responseObject = JSON.parse(jsonString);
        var markersData = responseObject.markersData;

        var rawBoardData = [];

        for(var x of markersData){
           rawBoardData.push({
            color: markersData.color,
            playerName: markersData.playerName,
            countryName: markersData.countryName
          });

      }
    }.bind(this);
    request.send();
  },


  makeTableData: function(){
    var parentDiv = document.getElementById('table-data');
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

     //Create a HTML Table element.
     var table = document.createElement("TABLE");
     table.border = "1";

     //Get the count of columns.
     var columnCount = customers[0].length;
     var headers = ["Color", "Player Name", "Countries"];
     var cellData =
     //Add the header row.
     var row = table.insertRow(-1);
     for (var i = 0; i < columnCount; i++) {
         var headerCell = document.createElement("TH");
         headerCell.innerHTML = headers[0][i];
         row.appendChild(headerCell);
     }

     //Add the data rows.
     for (var i = 1; i < this.leaderBoardData.length; i++) {
         row = table.insertRow(-1);
         for (var j = 0; j < 3; j++) {
             var cell = row.insertCell(-1);
             cell.innerHTML = customers[i][j];
         }
     }

     var tableContainer = document.getElementById("table-data");
     dvTable.innerHTML = "";
     dvTable.appendChild(table);
 }
}

class="modal-body"

module.exports = LeaderBoard;
