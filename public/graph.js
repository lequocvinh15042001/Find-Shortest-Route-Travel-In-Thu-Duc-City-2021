function Graph() {
    this.nodes = [];
    this.graph = {};
    this.edges={};
    this.end = null;
    this.start = null;
  }
  //prototype tạo các kế thừa properties, methods
  Graph.prototype.reset = function() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].searched = false;
      this.nodes[i].parent = null;
    }
  }
  
  Graph.prototype.setStart = function(node) {
    this.start = this.graph[node];
    return this.start;
  }
  
  Graph.prototype.setEnd = function(node) {
    this.end = this.graph[node];
    return this.end;
  }
  
  
  Graph.prototype.addNode = function(n) {
    // Node into array
    this.nodes.push(n);
    var nombreC = n.nombre;
    // Node into "hash"
    this.graph[nombreC] = n;
  }
  
  Graph.prototype.getNode = function(node) {
    var n = this.graph[node];
    return n;
  }
  
  Graph.prototype.addEdge = function(node1,node2) {
    if (this.graph[node1] && this.graph[node2]) {
      node1.edges.push(node2);
      node2.edges.push(node1);
    } else {
      throw new Error('Invalid node value.')
    }
  }
  
  Graph.prototype.retEdge=function(node1){
    var result=[];
    var iterate=[];
    var count=[];
    iterate=this.edges[node1]
    for(var i=0;i<this.edges[node1].length;i++){
      result[i]=iterate[i];
      count[i]=i;
    }
    return count;
  }
  
  Graph.prototype.hasEdge = function(node1,node2) {
    return node1.edges[node2]==node2;
  }