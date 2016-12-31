function ShareLinks(fbname) {
  let firebase = new Firebase("https://" + fbname + ".firebaseio.com/");
  this.firebase = firebase;

  let linksRef = firebase.child('links');

  this.submitLink = function(url, title) {
    url = url.substring(0,4) !== "http" ? "http://" + url : url;
    linksRef.child(btoa(url)).set({
      title: title
    });
  };

};
