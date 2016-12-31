function ShareLinks(fbname) {
  var firebase = new Firebase("https://" + fbname + ".firebaseio.com/");
  this.firebase = firebase;

  var linksRef = firebase.child('links');

  this.submitLink = function(url, title) {
    url = url.substring(0,4) !== "http" ? "http://" + url : url;
    console.log('url 11:' , url);
    linksRef.child(btoa(url)).set({
      title: title,
      url: url
    });
    console.log('url 12:' , url);
  };

  this.onLinksChanged = function() {};

  linksRef.on('value', function(snapshot) {
    var links = snapshot.val();
    var preparedLinks = [];
    // var url2 = decodeURIComponent(escape(window.atob(url)));
    // console.log(str2);
    
    for (var url in links) {
      console.log('url 10:' , url);
      if (links.hasOwnProperty(url)) {
        console.log('url 1:' , url);
        preparedLinks.push({
          title: links[url].title,
          url: links[url].url
        });
        console.log('url 2:' , url);
        console.log('url 22:' , links[url]);
        console.log('url 23:' , links[url].url);
      }
    }
    this.onLinksChanged(preparedLinks);
  }.bind(this));

}

$(document).ready(function() {

  var ll = new ShareLinks('sharelinks-3d726');

  $(".link-form form").submit(function(event) {
    event.preventDefault();
    ll.submitLink($(this).find('input.link-url').val(), $(this).find('input.link-title').val());
    $(this).find("input[type=text]").val("").blur();
    return false;
  });  

  ll.onLinksChanged = function(links) {
    $(".links-list").empty();
    links.map(function(link) {
      var linkElement = "<li><a href='" + link.url + "'>" + link.title + "</a></li>";
      $(".links-list").append(linkElement);
    });
  };

});    

