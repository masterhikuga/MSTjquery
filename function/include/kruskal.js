var kruskal = require(['node_modules/node-kruskal/kruskal.js']);

var d = [ [0,1,2,3],
      [1,0,1,2],
      [2,1,0,1],
      [3,2,1,0] ];

kruskal.kruskalMST(d, function(results){
	console.log(results);
});