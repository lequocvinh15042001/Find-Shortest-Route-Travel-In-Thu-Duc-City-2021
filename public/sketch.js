var graph;
var dropdown;

function setup(){
  graph = new Graph();
  noCanvas();
  
  var vcthuduc= new Node(1, 10.85057100910172, 106.76551180270393);
  var suoitien= new Node(2, 10.866422852902515, 106.80296199010327);
  var langdaihoc= new Node(3, 10.876732325966648, 106.80012781644699);
  var vuonhuongduong= new Node(4, 10.845614707324316, 106.71458553777002);
  var gigamall= new Node(5, 10.82779514577795, 106.72141791260634);
  var nhatho= new Node(6, 10.851292746563344, 106.75712524714518);
  var chuanamthien= new Node(7, 10.843557879948808, 106.76266967331738);
  var chothuduc= new Node(8, 10.851137058878923, 106.75493335107943);
  var chuavanphuc= new Node(9, 10.863517729504036, 106.74230024089414);
  var skyview= new Node(10, 10.864493362902321, 106.74200350560602);
  var vuonco= new Node(11, 10.829083914976026, 106.83449616834137);

  graph.addNode(vcthuduc);
  graph.addNode(suoitien);
  graph.addNode(langdaihoc);
  graph.addNode(vuonhuongduong);
  graph.addNode(gigamall);
  graph.addNode(nhatho);
  graph.addNode(chuanamthien);
  graph.addNode(chothuduc);
  graph.addNode(chuavanphuc);
  graph.addNode(skyview);
  graph.addNode(vuonco);


  
  gigamall.addHeur(gigamall,vcthuduc,6);
  suoitien.addHeur(suoitien,vcthuduc,7);
  langdaihoc.addHeur(langdaihoc,vcthuduc,8);
  vuonhuongduong.addHeur(vuonhuongduong,vcthuduc,10);
  nhatho.addHeur(nhatho,vcthuduc,1);
  chuanamthien.addHeur(chuanamthien,vcthuduc,3);
  chothuduc.addHeur(chothuduc,vcthuduc,2);
  chuavanphuc.addHeur(chuavanphuc,vcthuduc,4);
  skyview.addHeur(skyview,vcthuduc,5);
  vuonco.addHeur(vuonco,vcthuduc,9);
  //ADD 
  skyview.addEdge(skyview,chuavanphuc,0.14);
  skyview.addEdge(skyview,vuonhuongduong,5.1);
  skyview.addEdge(skyview,chothuduc,2.2);

  vuonhuongduong.addEdge(vuonhuongduong,gigamall,3.7);
  vuonhuongduong.addEdge(vuonhuongduong,chothuduc,6.2);
  //vuonhuongduong.addEdge(vuonhuongduong,skyview,5.1);

  //chothuduc.addEdge(chothuduc,skyview,2.2);
  //chothuduc.addEdge(chothuduc,vuonhuongduong,6.2);
  chothuduc.addEdge(chothuduc,gigamall,6.2);
  chothuduc.addEdge(chothuduc,chuanamthien,1.4);
  //chothuduc.addEdge(chothuduc,nhatho,0.2);

  nhatho.addEdge(nhatho,chothuduc,0.2);
  nhatho.addEdge(nhatho,vcthuduc,0.9);
  
 // vcthuduc.addEdge(vcthuduc,nhatho,0.9);
  vcthuduc.addEdge(vcthuduc,chuanamthien,1.1);
  vcthuduc.addEdge(vcthuduc,suoitien,4.7);
  vcthuduc.addEdge(vcthuduc,vuonco,9.8);

  //suoitien.addEdge(suoitien,vcthuduc,4.7);
  suoitien.addEdge(suoitien,langdaihoc,2.5);
  suoitien.addEdge(suoitien,vuonco,7.2);
}
function bfs(a,b) { //đây là hàm duyệt theo Breath First Search
  graph.reset();
  var start = graph.setStart(a);//lấy giá trị bắt đầu
  var end = graph.setEnd(b);//lấy giá trị kết thúc
  console.log(graph);
  var queue = [];

  start.searched = true;//đã duyệt qua start
  queue.push(start);//đưa start vào hàng đợi

  while (queue.length > 0) {
    var current = queue.shift(); //lấy đỉnh đầu hàng đợi
    if (current== end) {//nếu mà nó bằng đỉnh mà ta muốn tới thì break ra
      console.log("Found " + current.nombre);
      break;
    }
    console.log('-----BFS tại nút: '+current.nombre);
    for (var i = 0; i < current.edges.length; i++) {//nếu không bằng thì duyệt qua các đỉnh kề khác
      var neighbor= current.edges[i];
      if(neighbor.searched==false)
      {
        console.log("Nút kề: "+ neighbor.nombre);
      }
      else {
        console.log("Nút kề đã duyệt: "+ neighbor.nombre);
      }
      if (!neighbor.searched) {
        neighbor.searched = true; 
        neighbor.parent = current;
        queue.push(neighbor);//bỏ nó vào hàng đợi
      }
    }
  }

  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  } 
  console.log(path);
  return path;
}
function dfs(a,b){ // duyệt theo Depth First Search
  graph.reset();
  var start = graph.setStart(a);//lấy giá trị bắt đầu
  var end = graph.setEnd(b);//lấy giá trị kết thúc

  console.log(graph);

  var stack = [];

  start.searched = true;
  stack.push(start);

  while (stack.length > 0) {
    var current = stack.pop();
    if (current== end) {
      console.log("Found " + current.nombre);
      break;
    }    
    console.log('-----DFS tại nút: '+current.nombre);
    for (var i = 0; i < current.edges.length; i++) {
      var neighbor= current.edges[i];
      if(neighbor.searched==false)
      {
        console.log("Nút kề: "+ neighbor.nombre);
      }
      else {
        console.log("Nút kề đã duyệt: "+ neighbor.nombre);
      }
      
      if (!neighbor.searched) {
        neighbor.searched = true;
      neighbor.parent = current;
      stack.push(neighbor);
      }
    }

  }
  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }  
  console.log(path);
  return path;
}
function costoU(inicio,fin){ // Đây là hàm duyệt theo chi phí
  graph.reset();
  var start = graph.setStart(inicio);//lấy điểm bắt đầu
 
  var end = graph.setEnd(fin);//lấy điểm đích

  console.log(graph);

  var queue = [];

  start.searched = true;
  queue.push(start);
  while (queue.length > 0) {
    var current = queue.shift(); //current =1
    if (current== end) {
      console.log("Found " + current.nombre);
      break;
    }
    console.log('-----Uniform Cost Search tại nút: '+current.nombre);
    for (var i = 0; i < current.edges.length; i++) {
      var neighbor= current.edges[i];
      if(neighbor.searched==true)
      {
        console.log("Nút đã duyệt: " + neighbor.nombre);
      }
      else { console.log("Nút: " + neighbor.nombre);
      console.log("Độ dài: " + neighbor.edgeCost[i]);
    }
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
        // if(neighbor.edgeCost[i]<current.edgeCost[i]){ //COST UNIFORM
        //   current=neighbor;
        // }
        queue.sort(function(a,b){return a.edgeCost - b.edgeCost});// sắp xếp queue từ nhỏ tới lớn
      }
    }
  }

  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }
  console.log(path);
  return path;
}
function dls(inicio,fin,limit){ 
  graph.reset();
  var start = graph.setStart(inicio);
  var end = graph.setEnd(fin);
  var stack = [];
  start.searched = true;
  stack.push(start);
  while (stack.length > 0 && limit>0) {
    var current = stack.pop();
    if (current== end) {
      console.log("Found " + current.nombre);
      //return current;
      break;
    }    
    console.log('-----IDDLS tại nút: '+current.nombre);  
    for (var i = 0; i < current.edges.length; i++) {
      var neighbor= current.edges[i];
      //console.log(neighbor);
      if(neighbor.searched==true)
      {
        console.log("Nút đã duyệt: "+neighbor.nombre);
      }
      if (!neighbor.searched) {
        //console.log(neighbor);
        neighbor.searched = true;
        neighbor.parent = current;

        console.log("Nút: " + neighbor.nombre);

        stack.push(neighbor);
        //limit--;
      }
    }
    
  }

  var path = [];
  path.push(end);
  var next = end.parent;
  if(next!=null){
    while (next != null) {
      path.push(next);
      next = next.parent;
    }    
    console.log(path);
    return path;      
  }else{
    console.log("Không có đường dẫn xác định!");
    return 0;
  }  
}
function iddfs(inicio,fin,maxD){  
  limit=0;
  while(limit<maxD){
    console.log('Độ sâu: '+limit);    
    if(dls(inicio,fin,limit)!=0){
      document.getElementById("iteracion").innerHTML="Tìm thấy trong Độ sâu: "+(limit+1);
      return dls(inicio,fin,limit);
      break;
    }
    limit++;//nếu không tìm thấy thì tăng giới hạn chiều sau thêm 1
  }
}
function greddyBFS(a,b){
  graph.reset();
  var start = graph.setStart(a);
  
  var end = graph.setEnd(b);

  console.log(graph);

  var priorityQueue = [];

  start.searched = true;
  priorityQueue.push(start);

  while (priorityQueue.length > 0) {
    var current = priorityQueue.shift(); //current =1
    if (current== end) {
      console.log("Found " + current.nombre);
      break;
    }
    console.log('-----Greddy BFS tại nút: '+current.nombre);
    for (var i = 0; i < current.edges.length; i++) {
      var neighbor= current.edges[i];
      //console.log(neighbor)
      if(neighbor.searched==true)
      {
        console.log("Nút: " + neighbor.nombre);
        console.log("Huer: " + neighbor.h);
      }
      else { 
        console.log("Nút: " + neighbor.nombre);
        console.log("Huer: " + neighbor.h);
    }
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        priorityQueue.push(neighbor);
        priorityQueue.sort(function(a,b){return a.h - b.h});/////////////////
        
      }
    }
  }
  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  } 
  console.log(path);
  return path;
}
function As(a,b){// đây là hàm duyệt A*
  graph.reset();

  var start = graph.setStart(a);
  var end = graph.setEnd(b);
  var openL=[];

  start.searched = true;
  openL.push(start);
  while(openL.length>0){
    var current = openL.shift();
    
    if (current== end) {
      console.log("Found " + current.nombre);
      break;
    }
    console.log('-----A star tại nút: '+current.nombre);
    for (var i = 0; i < current.edges.length; i++) {
      var neighbor= current.edges[i];
      if(neighbor.searched==true)
      {
        console.log("Nút vừa duyệt: " + neighbor.nombre);
      }
      if (!neighbor.searched) {
        neighbor.f = parseFloat(neighbor.h )+ parseFloat(current.edgeCost[i]);
        neighbor.searched = true;
        neighbor.parent = current;

        console.log("Nút: " + neighbor.nombre);
        console.log("Heur = " + neighbor.h);
        console.log("G = " + current.edgeCost[i]);
        console.log("F = " + (parseFloat(neighbor.h )+ parseFloat(current.edgeCost[i])));

        openL.push(neighbor);
        
        openL.sort(function(a,b){return a.f - b.f});
      }
    }
  }
  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  } 
  console.log(path);
  return path;
}