$(document).ready( function(){
    main();
});

var coordinates = new Array();
var tempident = 0;
var vertices = 0;

var width = 0, height = 0;
var maxedgess = 0;
var timerend = new Array();

function main(){
//    MouseXY();
//    MouseCreateRound();
    widthcanvas();
    createRound();
    algo_click();

}

function widthcanvas(){
    width = $( ".canvas" ).width();
    height = $( ".canvas" ).height();
}

function MouseXY() {
    $( ".canvas" ).on( "mousemove", function( event ) {

        // MouseCreateRound(event.pageX, event.pageY);
        $(".draw").attr("MouseX", event.pageX);
        $(".draw").attr("MouseY", event.pageY);
    });    
}

function createRound() {
    $(".inputround").change(function(){
        $(".externalround").remove();
        var countclick = 0; 
        vertices = $(this).val();
        for (var i = 0; i<vertices; i++){
            var roundwidth = Math.floor(Math.random() * width) + 1;
            var roundheight = Math.floor(Math.random() * height) + 1;
        
            $( ".draw" ).append( '<div class="externalround" style="left:'+roundwidth+'px;top:'+roundheight+'px;"><span class="rounds rounded-'+countclick+' blue white-text" posx="'+roundwidth+'" posy="'+roundheight+'"  identify="'+countclick+'">'+countclick+'</span></div>' );       
            countclick++;
        }
        createEdge();
    });
}


function MouseCreateRound(){
    $(".canvas").on("click", function(e){

        var MouseX = $(".draw").attr("mousex")-375;
        var MouseY = $(".draw").attr("mousey")-110;	
        $( ".draw" ).append( '<div class="externalround" style="left:'+MouseX+'px;top:'+MouseY+'px;"><span class="rounds rounded-'+countclick+' blue white-text" posx="'+MouseX+'" posy="'+MouseY+'"  identify="'+countclick+'">'+countclick+'</span></div>' );
        countclick++;
        e.preventDefault();
        rounded(e);
    });

}

function rounded(e){
    var clicked, temp = 0;
    tempident = 0;
    $(".rounds").each(function(){
        $(this).click(function(e){
                var identify = $(this).attr("identify");
                if (tempident === 0){      
                    $(this).css("border","2px solid red");
                    tempident = identify;
                } else {     
                    edge($(".rounded-"+tempident).attr("posX"), $(".rounded-"+tempident).attr("posY"), $(this).attr("posX"), $(this).attr("posY"));
                    $(".rounded-"+tempident).css("border","0px");
                    //$(this).css("border","0px");

                        //console.log(tempident); 
                    delete tempident;
                    tempident = 0;
                }

 //           console.log(clicked);
        });
    });
}

function pemfaktoran(input){
    var hasil = 0;
    for(var i = 1; i<input; i++){
        hasil += input-i;
    }
    return hasil;
}

function createEdge(){
    var jumround = $(".rounds").length;
    var maxedges = pemfaktoran(jumround);
    coordinates = new Array();
    for(var i = 0; i < jumround; i++){
        for(var k = i+1; k < jumround; k++){
            // var y =Math.random();
            // if(y<0.5)
            //     y =Math.floor(y)
            // else
            //     y= Math.ceil(y)
            // if(y >= 1){
                // maxedgess++;
                var py = pythagoras($(".rounded-"+i).attr("posX"), $(".rounded-"+i).attr("posY"), $(".rounded-"+k).attr("posX"), $(".rounded-"+k).attr("posY"));
                var text = locationtext($(".rounded-"+i).attr("posX"), $(".rounded-"+i).attr("posY"), $(".rounded-"+k).attr("posX"), $(".rounded-"+k).attr("posY"));
                edge($(".rounded-"+i).attr("posX"), $(".rounded-"+i).attr("posY"), $(".rounded-"+k).attr("posX"), $(".rounded-"+k).attr("posY"), py, text, i, k);
            // }

        }
    }
//    console.log(jumedges);
}

function edge(posX1, posY1, posX2, posY2, py, text, startnumber, endnumber){
    // coordinates.push([(posX1-0)+45, (posY1-0)+30, (posX2-0)+45, (posY2-0)+30, py, 0, (text[0]-0)+25, (text[1]-0)+20, 1, 2]);
    coordinates.push([(posX1-0)+35, (posY1-0)+30, (posX2-0)+35, (posY2-0)+30, parseInt(py), 0, (text[0]-0)+25, (text[1]-0)+20, startnumber, endnumber]);
    //refreshedge(coordinates);   
    var jumround = $(".rounds").length;
    var maxedges = pemfaktoran(jumround);
    if(maxedges === coordinates.length){
        refreshedge(coordinates);
    }
}

function refreshedge(coordinatesz){
    $(".canvas").remove();
    $(".draw").append('<canvas class="canvas" width="958" height="450" style="height:100%;width:100%;" id="canvas"></canvas>');
    var canvas, context;
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    context.strokeStyle = '#000';
    for (var i = 0; i<coordinatesz.length; i++){
        // if(!coordinatesz[i][5]){
            context.beginPath();
            context.font = "15px Arial";
            context.fillStyle = "blue";
            context.fillText(""+coordinatesz[i][4]+"",coordinatesz[i][6],coordinatesz[i][7]);
            context.moveTo(coordinatesz[i][0], coordinatesz[i][1]);
            context.lineTo(coordinatesz[i][2], coordinatesz[i][3]);
            context.stroke();
            context.closePath();
            coordinatesz[i][5] = 1;
        //  }
     }
}
 
function algo_click(){
    $(".algo-0").click(function(e){
        sendtoalgo(0);
    });
    $(".algo-1").click(function(e){
        sendtoalgo(1);
    });  
    $(".algo-2").click(function(e){
        sendtoalgo(2);
    });  
}

function pythagoras(X1, Y1, X2, Y2){
    var X = X2-X1;
    var Y = Y2-Y1;
    return Math.floor(Math.sqrt((X*X)+(Y*Y)));
}

function locationtext(X1, Y1, X2, Y2){
    var text = new Array();
    text[0] = Math.ceil(((X2-X1)/2));
    text[1] = Math.ceil(((Y2-Y1)/2));
    text[0] = parseInt(text[0])+parseInt(X1);
    text[1] = parseInt(text[1])+parseInt(Y1);
    return text;
}

function sendtoalgo(type){
    var jumround = $(".rounds").length;
    var coordinatesx = new Array();
    $('.wektu').text("");
    if(type == 0){
        var timer = new Timer();
        timer.start();
        var kruskal = new Kruskal(coordinates, jumround);
        coordinatesx = kruskal.start();
        timerend[0] = timer.end();
        $('.wektu').text(timerend[0]+"ms");
        refreshedge(coordinatesx);
    } else if(type == 1){
        var hasil = _convert_awal();
        var timer = new Timer();
        timer.start();
        var prims = new Prims(hasil, jumround);
        coordinatesx = prims.start();
        coordinatesx = _convert_akhir_prims(coordinatesx);
        timerend[1] = timer.end();
        $('.wektu').text(timerend[1]+"ms");
        refreshedge(coordinatesx);
    } else if(type == 2){
        var hasil = _convert_awal();
        var timer = new Timer();
        timer.start();
        var djikstra = new Djikstra(hasil, jumround);
        coordinatesx = djikstra.start(0);
        coordinatesx = _convert_akhir_djikstra(coordinatesx);
        timerend[2] = timer.end();
        $('.wektu').text(timerend[2]+"ms");
        refreshedge(coordinatesx);
    }

    if(timerend.length == 3){
        charts();
    }

}

function _convert_akhir_prims(coordinatesx){
    var a = new Array();
    for(var k = 0; k<coordinates.length; k++){
        if(coordinates[k][9]<=coordinatesx.length || coordinates[k][8]<=coordinatesx.length){
            //console.log(coordinates[k][8]+" = "+coordinatesx[coordinates[k][9]][0]+" ||| "+coordinates[k][9]+" = "+coordinatesx[coordinates[k][8]][0]);
            if(coordinatesx[coordinates[k][8]][0] === coordinates[k][9] || coordinatesx[coordinates[k][9]][0] === coordinates[k][8]){
                a.push(coordinates[k]);                 
            }    
        }
    }
    
    return a;
}

function _convert_akhir_djikstra(dist){
    var a = new Array();
    for(var k = 0; k<coordinates.length; k++){
        if(coordinates[k][9]<=dist.length || coordinates[k][8]<=dist.length){
            //console.log(coordinates[k][4]+" = "+dist[coordinates[k][9]]+" ||| "+coordinates[k][4]+" = "+dist[coordinates[k][8]]);
            if(dist[coordinates[k][8]] === coordinates[k][4] || dist[coordinates[k][9]] === coordinates[k][4]){
                a.push(coordinates[k]);                 
            }    
        }
    }
    
    return a;
}

function _convert_awal(){
    var jumround = $(".rounds").length;
    var a = zeros(jumround);
    //console.log(zeros(jumround));
    for(var i = 0; i<coordinates.length; i++){
        a[coordinates[i][8]][coordinates[i][9]]=coordinates[i][4];
        a[coordinates[i][9]][coordinates[i][8]]=coordinates[i][4];
    }
    return a;
}

function zeros(dimensions) {
    var array = [...Array(dimensions)].map(e => Array(dimensions));

    return array;
}

function charts(){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" } ],
        ["Kruskal", parseInt(timerend[0]), "#2196F3"],
        ["Prims", parseInt(timerend[1]), "#4CAF50"],
        ["Djikstra", parseInt(timerend[2]), "#FF5722"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Kecepatann algoritma MST",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      chart.draw(view, options);
  }
}