class Prims {
    constructor(coordinates, vertices) {
        this.graph = coordinates;
        this.V = vertices;
        this.INT_MAX = 9999999999999;
    }

    start(){
        var parent = []; // Array to store constructed MST
        var key = [];   // Key values used to pick minimum weight edge in cut
        var mstSet = [];  // To represent set of vertices not yet included in MST
    
        // Initialize all keys as INFINITE
        for (var i = 0; i < this.V; i++)
            key[i] = this.INT_MAX, mstSet[i] = false;
    
        // Always include first 1st vertex in MST.
        key[0] = 0;     // Make key 0 so that this vertex is picked as first vertex
        parent[0] = -1; // First node is always root of MST 
    
        // The MST will have this.V vertices
        for (var count = 0; count < this.V-1; count++){
            var u = this._minKey(key, mstSet);
    
            mstSet[u] = true;
    
            for (var v = 0; v < this.V; v++){
                if (this.graph[u][v] && mstSet[v] == false && this.graph[u][v] <  key[v])
                    parent[v]  = u, key[v] = this.graph[u][v];
            }
        }
    
        // print the constructed MST
        return this._printMST(parent, this.graph);
    }

    _minKey(key, mstSet){
        // Initialize min value
        var min = this.INT_MAX, min_index;
        
        for (var v = 0; v < this.V; v++)
            if (mstSet[v] == false && key[v] < min)
                min = key[v], min_index = v;
        
        return min_index;
    }

    _printMST(parent, graph){
        var a = [...Array(this.V)].map(e => Array(2));
        a[0] = [-1, -1];
        for (var i = 1; i < this.V; i++){
            
            a[i][0] = parent[i];
            a[i][1] = this.graph[i][parent[i]];
            
        }

        return a;
    }

}
