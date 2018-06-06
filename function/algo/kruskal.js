class Kruskal {
    constructor(coordinates, vertices) {
      this.coordinates = coordinates;
      this.vertices = vertices;
      this.parent = new Array();
      this.rank = new Array();
      this.A = new Array();

    }

    start(){
        //this._removeloops();
        //this._removepararel();
        for(var i = 0; i < this.vertices; i++){
            this._makeset(i);
        }
        this._sort();
        for(var i = 0; i < this.coordinates.length; i++){
            var root1 = this._find(this.coordinates[i][8]);
            var root2 = this._find(this.coordinates[i][9]);
            if(root1 != root2){
                this.A.push(this.coordinates[i]);
                this._union(root1, root2);
            }
        }
        return this.A;

    }

    _removeloops(){
        var kordinat = this.coordinates;
        for (var i = 0; i<kordinat.length; i++){
            if(kordinat[i][8] == kordinat[i][9]){
                kordinat.splice(i, 1);
            }
        }
        this.coordinates = kordinat;
    }

    _removepararel(){
        var kordinat = this.coordinates;
        for (var i = 0; i < kordinat.length; i++) {
            for (var k = i+1; k < kordinat.length; k++) {
                if (kordinat[i][8] == kordinat[k][8] && kordinat[i][9] == kordinat[k][9]) {
                    kordinat.splice(i, 1);
                }
            }
        }
        this.coordinates = kordinat;
    }

    _sort(){
        var kordinat = this.coordinates;
        for (var i = 0; i < kordinat.length; i++) {
            for (var k = i+1; k < kordinat.length; k++) {
                if(kordinat[i][4] > kordinat[k][4]){
                    var temp = kordinat[i];
                    kordinat[i] = kordinat[k];
                    kordinat[k] = temp;
                }
            }
        }
        this.coordinates = kordinat;
    }

    _find(vertex){
        if(this.parent[vertex] == vertex)
            return this.parent[vertex];
        else
            return this._find(this.parent[vertex]);
    }

    _union(root1, root2){
        if (this.rank[root1] > this.rank[root2]){
            this.parent[root2] = root1;
        } else if(this.rank[root2] > this.rank[root1]){
            this.parent[root1] = root2;
        } else {
            this.parent[root1] = root2;
            this.rank[root2]++;
        }
    }

    _makeset(vertex){
        this.parent[vertex] = vertex;
        this.rank[vertex] = 0;

    }
}