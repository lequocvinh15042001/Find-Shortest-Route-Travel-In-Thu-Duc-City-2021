// Khởi chạy gg map
function initMap() {
    // gọi dịch vụ
    var directionsService = new google.maps.DirectionsService;//dịch vụ tính toán các tuyến đường
    var directionsDisplay = new google.maps.DirectionsRenderer;//các tính năng vị trí, vẽ đường, get vị trí
    // VẼ BẢN ĐỒ BAN ĐẦU Ở TRUNG TÂM VÀO ĐIỂM CHỈ ĐỊNH VÀ ZOOM
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 10.850184000683903, lng: 106.77196521203722}// địa điểm ban đầu ở trường
    });
    directionsDisplay.setMap(map);
    // THỰC HIỆN CHỨC NĂNG BẰNG CÁCH NHẤP VÀO NÚT GỬI
    document.getElementById('submit_bfs').addEventListener('click', function() {
      // THỰC HIỆN CHỨC NĂNG TẢI ĐƯỜNG, CÁC DỊCH VỤ ĐƯỢC GỬI LÀM THAM SỐ
      var startE=document.getElementById('start').value;
      var finalE=document.getElementById('final').value;
      if(startE==12 || finalE==12){
        alert("Địa điểm chưa được cập nhật!");
      }else{
        if(startE!=finalE){
          var path= bfs(startE,finalE); //bắt đầu vô bfs
          console.time("Thời gian chức năng BFS");//trả về thời gian thực thi
          calculateAndDisplayRoute(directionsService, directionsDisplay,startE,finalE,path);
          console.timeEnd("Thời gian chức năng BFS");
          document.getElementById('iteracion').innerHTML=" ";
        }else{
          alert("Địa điểm bị trùng!");
        }      
      }          
    });
    document.getElementById('submit_dfs').addEventListener('click', function() {
      // THỰC HIỆN CHỨC NĂNG TẢI ĐƯỜNG, CÁC DỊCH VỤ ĐƯỢC GỬI LÀM THAM SỐ
      var startE=document.getElementById('start').value;          
      var finalE=document.getElementById('final').value;
      if(startE==12 || finalE==12){
        alert("Địa điểm chưa được cập nhật!");
      }else{      
        if(startE!=finalE){
          var path= dfs(startE,finalE); //bắt đầu vô dfs
          console.time("Thời gian chức năng DFS");      //trả về thời gian thực thi       
          calculateAndDisplayRoute(directionsService, directionsDisplay,startE,finalE,path);
          console.timeEnd("Thời gian chức năng DFS");
          document.getElementById('iteracion').innerHTML=" ";
        }else{
          alert("Địa điểm bị trùng!");
        }
      }         
    });
    document.getElementById('submit_iddfs').addEventListener('click', function() {
      // THỰC HIỆN CHỨC NĂNG TẢI ĐƯỜNG, CÁC DỊCH VỤ ĐƯỢC GỬI LÀM THAM SỐ
      var startE=document.getElementById('start').value;          
      var finalE=document.getElementById('final').value;
      var maxd=document.getElementById('maxd').value;
      if(startE==12 || finalE==12){
        alert("Địa điểm chưa được cập nhật!");
      }else{    
        if(startE!=finalE){              
          console.time("Thời gian chức năng IDDFS");         
          var path= iddfs(startE,finalE,maxd);       //bắt đầu vô iddfs               
          console.log(path);
          calculateAndDisplayRoute(directionsService, directionsDisplay,startE,finalE,path);
          console.timeEnd("Thời gian chức năng IDDFS");//trả về thời gian thực thi
        }else{
          alert("Địa điểm bị trùng!");
        }
      }          
    });
    document.getElementById('submit_cost').addEventListener('click', function() {
      // THỰC HIỆN CHỨC NĂNG TẢI ĐƯỜNG, CÁC DỊCH VỤ ĐƯỢC GỬI LÀM THAM SỐ
      var startE=document.getElementById('start').value;          
      var finalE=document.getElementById('final').value;
      if(startE==12 || finalE==12){
        alert("Địa điểm chưa được cập nhật!");
      }else{    
        if(startE!=finalE){
          var path= costoU(startE,finalE); //bắt đầu vô hàm chi phí
          console.time("Thời gian chức năng COST");     //trả về thời gian thực thi                 
          calculateAndDisplayRoute(directionsService, directionsDisplay,startE,finalE,path);
          console.timeEnd("Thời gian chức năng COST");//trả về thời gian thực thi
          document.getElementById('iteracion').innerHTML=" ";
        }else{
          alert("Địa điểm bị trùng!");
        }          
      }
    });
    document.getElementById('submit_greddy').addEventListener('click', function() {
      // THỰC HIỆN CHỨC NĂNG TẢI ĐƯỜNG, CÁC DỊCH VỤ ĐƯỢC GỬI LÀM THAM SỐ
      var startE=document.getElementById('start').value;          
      var finalE=document.getElementById('final').value;
      if(startE==12 || finalE==12){
        alert("Địa điểm chưa được cập nhật!");
      }else{      
        if(startE!=finalE){
          var path= greddyBFS(startE,finalE); //Bắt đầu vô hàm BFS
          console.time("Thời gian chức năng Greddy");             
          calculateAndDisplayRoute(directionsService, directionsDisplay,startE,finalE,path);
          console.timeEnd("Thời gian chức năng Greddy");//trả về thời gian thực thi
          document.getElementById('iteracion').innerHTML=" ";
        }else{
          alert("Địa điểm bị trùng!");
        }
      }         
    });
    document.getElementById('submit_as').addEventListener('click', function() {
      // THỰC HIỆN CHỨC NĂNG TẢI ĐƯỜNG, CÁC DỊCH VỤ ĐƯỢC GỬI LÀM THAM SỐ
      var startE=document.getElementById('start').value;          
      var finalE=document.getElementById('final').value;
      if(startE==12 || finalE==12){
        alert("Địa điểm chưa được cập nhật!");
      }else{      
        if(startE!=finalE){
          var path= As(startE,finalE); //vô hàm A*
          console.time("Thời gian chức năng A star");             
          calculateAndDisplayRoute(directionsService, directionsDisplay,startE,finalE,path);
          console.timeEnd("Thời gian chức năng A star");//trả về thời gian thực thi
          document.getElementById('iteracion').innerHTML=" ";
        }else{
          alert("Địa điểm bị trùng!");
        }
      }         
    });
  }
  
  //tính toán khoảng cách và hiển thị đường đi
  function calculateAndDisplayRoute(directionsService, directionsDisplay,start,final,path) {
  // TẠO SẮP XẾP VỚI WAYPOINT (CÁC ĐIỂM TRUNG GIAN KHI BẮT ĐẦU VÀ KẾT THÚC CHUYẾN ĐI)
    var waypts = [];
    var cont=0;
    for (var i2 = path.length-2; i2 >= 1; i2--) {
      var n = path[i2];          
      cont=cont+n.edgeCost;
      waypts.push({
        location: {lat: n.lat, lng: n.lng},
        stopover: true
      });
    }  
    var items = [
      [0,0],//vacio
      [10.85057100910172, 106.76551180270393,'Vincom Thủ Đức'],
      [10.866422852902515, 106.80296199010327,'Khu Du lịch Suối Tiên'],
      [10.876732325966648, 106.80012781644699,'Chợ đêm Làng Đại học'],
      [10.845614707324316, 106.71458553777002,'Vườn Hướng Dương Vạn Phúc'],
      [10.82779514577795, 106.72141791260634,'Giga Mall Thủ Đức'],
      [10.851292746563344, 106.75712524714518,'Nhà thờ Thủ Đức'],
      [10.843557879948808, 106.76266967331738,'Chùa Nam Thiên Nhất Trụ'],
      [10.851137058878923, 106.75493335107943,'Chợ Thủ Đức'],
      [10.863517729504036, 106.74230024089414,'Chùa Vạn Phúc'],
      [10.864493362902321, 106.74200350560602,'Dragon Sky View'],
      [10.829083914976026, 106.83449616834137,'Vườn Cò Thủ Đức'],
    ];
    var selector = document.getElementById('start');
    var value = selector[selector.selectedIndex].text;    
    const selectedMode = document.getElementById("mode").value;

    
    // TRAVEL MODE: CÓ THỂ THAY ĐỔI THEO TÙY CHỌN CỦA GOOGLE
    directionsService.route({
      origin: {lat:items[start][0],lng: items[start][1]},
      destination: {lat:items[final][0],lng: items[final][1]},
      waypoints: waypts,
      optimizeWaypoints: true,
      //travelMode: 'DRIVING'
      travelMode: google.maps.TravelMode[selectedMode],

    }, function(response, status) {
      var total=0;
      if (status === 'OK') {
        // VẼ ĐƯỜNG ĐI TRÊN BẢN ĐỒ
        directionsDisplay.setDirections(response);
        // ĐƯỜNG ĐI CỤ THỂ
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        for (var i2 = path.length-2; i2 >= 1; i2--) {
          var n = path[i2];          
          cont=cont+n.edgeCost;
          waypts.push({
            location: {lat: n.lat, lng: n.lng},
            stopover: true
          });
        }
        // Đối với mỗi tuyến đường, hiển thị thông tin tóm tắt.
        //document.getElementById('tuyenduong').innerHTML="Tuyến đường";
        for (var i = route.legs.length; i >= 0; i--) {            
          var n=path[i];       
          summaryPanel.innerHTML+='<div class="style_item"><div class="ruta_indicacion" id="ciudad'+i+'">'+items[n.nombre][2]+'</div><div id="posicion'+i+'"></div></div>';        
        }
        var datoC=route.legs.length-1;
        var datoC2=route.legs.length-1;
        for(var i = 0; i<route.legs.length;i++){
          console.log(route.legs[i].distance.text);
          total+=parseFloat(route.legs[i].distance.text);
          document.getElementById('posicion'+datoC--).innerHTML=route.legs[i].distance.text;
        }
      } else {
        window.alert('Gần đó chưa có tuyến đường dành riêng cho phương tiện này!');
      }
      document.getElementById('total').innerHTML="Tổng khoảng cách khoảng: "+total+" km";
    });
  }
  function refreshPage(){
    window.location.reload();
} 