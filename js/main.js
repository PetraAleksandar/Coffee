var link = 'https://api.foursquare.com/v2/venues/explore?client_id=XEDDHYATVRKSYW13C5HAEETLPRYAQTAPYRWWUEBZ4WZ3PRNY &client_secret=5TSQ0XOYK4HDVPJSLWC30I5DADXHHPFG54GHU30IBGYNHUKJ &ll=44.8,20.46 &query=coffee &radius=1000 &openNow=1 &sortByDistance=1 &venuePhotos=1&oauth_token=MKKKAZSMP4C3CCJUPHGERNQFSMUNRPSLTNEAUQKIYEITBBJR&v=20170930';
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
getJSON(link,
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    for(var i=0;i<10;i++){
      var img = data.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix+"300x300"+data.response.groups[0].items[i].venue.photos.groups[0].items[0].suffix;
      result.innerHTML += "<div class='list'><div class='info'><h1>" + data.response.groups[0].items[i].venue.name + "</h1><h3>" + data.response.groups[0].items[i].venue.location.distance + " m</h3></div><img src="+img+"></div>";
    }
  }
});
