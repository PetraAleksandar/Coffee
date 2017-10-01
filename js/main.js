var latitude, longitude, link;
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      latitude = pos.lat;
      longitude = pos.lng;
      link = 'https://api.foursquare.com/v2/venues/explore?client_id=XEDDHYATVRKSYW13C5HAEETLPRYAQTAPYRWWUEBZ4WZ3PRNY &client_secret=5TSQ0XOYK4HDVPJSLWC30I5DADXHHPFG54GHU30IBGYNHUKJ &ll='+latitude+','+longitude+' &query=coffee &radius=1000 &openNow=1 &venuePhotos=1 &sortByDistance=1 &v=20171001';
      var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
            }
          };
        xhr.send();
      };
      var result = document.getElementById('cont');
      var i;
      getJSON(link, function(err, data) {
        var length, img;
        var locals = [];
        if (err !== null) {
          alert('Something went wrong: ' + err);
        } else {
          for (i = 0; i < 15; i++) {
            locals.push(data.response.groups[0].items[i]);
          }
          length = locals.length;
          if(length >10){
            for(i = 0; i < 10; i++){
              img = data.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix+"300x300"+data.response.groups[0].items[i].venue.photos.groups[0].items[0].suffix;
              result.innerHTML += "<div class='list'><div class='info'><h1>" + data.response.groups[0].items[i].venue.name + "</h1><h3>" + data.response.groups[0].items[i].venue.location.distance + " m</h3></div><img src="+img+"></div>";
            }
          } else{
            for(i = 0; i < length; i++){
              img = data.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix+"300x300"+data.response.groups[0].items[i].venue.photos.groups[0].items[0].suffix;
              result.innerHTML += "<div class='list'><div class='info'><h1>" + data.response.groups[0].items[i].venue.name + "</h1><h3>" + data.response.groups[0].items[i].venue.location.distance + " m</h3></div><img src="+img+"></div>";
            }
          }
          $('#cont').on('click', '.list', function(event){
            event.preventDefault();
            $('.detailsContainer').remove();
            $name = $('h1', this).html();
            for (i = 0; i < 10; i++) {
              if ($name == data.response.groups[0].items[i].venue.name) {
                $position = i;
              }
            }
            $venueId = data.response.groups[0].items[$position].venue.id;
            $photoLink = 'https://api.foursquare.com/v2/venues/'+$venueId+'/photos?v=20171001';
            $tips = [];
            if(data.response.groups[0].items[$position].tips[0].text.indexOf("kafa") != -1){
              $tips.push(data.response.groups[0].items[$position].tips[0].text);
            }else{
              $tips.push("There is no cofee related tips");
            }
            $("#cont").append( "<div class='detailsContainer'><div class='info'><h1>"+ data.response.groups[0].items[$position].venue.name +"</h1><h3> distance: " + data.response.groups[0].items[$position].venue.location.distance + " m</h3><h3>prices: "+data.response.groups[0].items[$position].venue.price.message+"<h3><h3>tips: "+$tips+"</div><span class='close'>&times;</span></div>");
            $('.close').on('click', function(){
              $('.detailsContainer').remove();
            })
          });
        }
        var expense = document.getElementById('expense');
        expense.onclick = function() {
          var divs = [];
          var removeDiv = document.getElementsByClassName('list');
          while(removeDiv[0]){
            removeDiv[0].parentNode.removeChild(removeDiv[0]);
          }
          if(length >10){
            for (i = 0; i < 10; i++) {
              if(typeof(data.response.groups[0].items[i].venue.price) != "undefined")
              divs.push(data.response.groups[0].items[i]);
            }
          } else{
            for (i = 0; i < length; i++) {
              if(typeof(data.response.groups[0].items[i].venue.price) != "undefined")
              divs.push(data.response.groups[0].items[i]);
            }
          }
          divs.sort(function (a,b){
            return b.venue.price.tier - a.venue.price.tier;
          });
          for (i = 0; i < divs.length; i++) {
            img = divs[i].venue.photos.groups[0].items[0].prefix+"300x300"+divs[i].venue.photos.groups[0].items[0].suffix;
            result.innerHTML += "<div class='list'><div class='info'><h1>" + divs[i].venue.name + "</h1><h3>" + divs[i].venue.location.distance + " m</h3></div><img src="+img+"></div>";
          }
        };
      });
    },function() {
         alert('Error: The Geolocation service failed. Refresh page and allow geolocation');
      });
  } else {
      alert('Error: Your browser doesn\'t support geolocation.');
    }
}
