function ShareLinks(fbname) {
  var firebase = new Firebase("https://" + fbname + ".firebaseio.com/");
  this.firebase = firebase;
};
