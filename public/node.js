function Node(name,lat,lng) {
    this.nombre = name;
    this.lat=lat;
    this.lng=lng;
    this.edges=[];
    this.edgeCost=[];
    this.h=[];
    this.g=[];
    this.f=0;
   // this.lat=lat;
    //this.lng=lng;
    this.searched = false;
    this.parent = null;
  }
  
  Node.prototype.addEdge = function(node1,node2,cost) {
      node1.edges.push(node2);
      //this.edges[nodo2]=nodo1;
      node2.edges.push(node1);
      node1.edgeCost.push(cost);
      node2.edgeCost.push(cost);
  }
  
  Node.prototype.addHeur=function(node1,node2,distLR){
    node1.h.push(distLR);
    node2.h.push(distLR);
  }