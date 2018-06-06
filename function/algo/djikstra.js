class Djikstra {
    constructor(coordinates, vertices) {
        this.graph = coordinates;
        this.V = vertices;
        this.INT_MAX = 9999999999999;
    }

    _minDistance(dist, sptSet){
    // Initialize min value
    var min = this.INT_MAX, min_index;
    
    for (var v = 0; v < this.V; v++)
        if (sptSet[v] == false && dist[v] <= min)
            min = dist[v], min_index = v;
    
    return min_index;
    }
    
    // A utility function to print the constructed distance array
    _printSolution(dist){
        var a = new Array();
        //console.log(dist);
        for (var i = 0; i < this.V; i++){
            a[i] = dist[i];
        }
        return a;
    }
    
    // Function that implements Dijkstra's single source shortest path algorithm
    // for a this.graph represented using adjacency matrix representation
    start(src)
    {
        var dist=[];     // The output array.  dist[i] will hold the shortest
                        // distance from src to i
    
        var sptSet=[]; // sptSet[i] will true if vertex i is included in shortest
                        // path tree or shortest distance from src to i is finalized
    
        // Initialize all distances as INFINITE and stpSet[] as false
        for (var i = 0; i < this.V; i++){
            dist[i] = this.INT_MAX, sptSet[i] = false;
        }
    
        // Distance of source vertex from itself is always 0
        dist[src] = 0;
    
        // Find shortest path for all vertices
        for (var count = 0; count < this.V-1; count++){
        // Pick the minimum distance vertex from the set of vertices not
        // yet processed. u is always equal to src in the first iteration.
        var u = this._minDistance(dist, sptSet);
    
        // Mark the picked vertex as processed
        sptSet[u] = true;
    
        // Update dist value of the adjacent vertices of the picked vertex.
        for (var v = 0; v < this.V; v++){

    
            // Update dist[v] only if is not in sptSet, there is an edge from 
            // u to v, and total weight of path from src to  v through u is 
            // smaller than current value of dist[v]
            if (!sptSet[v] && this.graph[u][v] && dist[u] != this.INT_MAX && dist[u]+this.graph[u][v] < dist[v])
                dist[v] = dist[u] + this.graph[u][v];
        }
        }
    
        // print the constructed distance array
        return this._printSolution(dist);
    }
}