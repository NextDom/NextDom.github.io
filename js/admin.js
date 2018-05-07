var _username = "";
var _password = "";
var _titre = "";
var _body = "";

function createissuemanu(){
    console.log("cr�ation issue 1");
_titre = document.getElementById("titre").value; 
_body = document.getElementById("textarea1").value;
_username = document.getElementById("username").value;
_password = document.getElementById("password").value;
auth("https://api.github.com/orgs/NextDom/repos?per_page=100");
}

function auth(_url){
     console.log("authentification");
$.ajax
({
  type: "GET",
  url: _url,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(_username + ":" + _password)
  },
  data: {},
  success: function (reponse){
  createissue(reponse,_titre,_body);
  }
});
}

function createissue(repos, titre_issue, body_issue){
    $.each(repos, function(i) {
$.ajax
({
  type: "POST",
  url: 'https://api.github.com/repos/NextDom/'+ repos[i].name +'/issues',
  dataType: 'json',
  async: false,
  headers: {"Authorization": "Basic " + btoa(username + ":" + password)},
  data: JSON.stringify({title: titre_issue, body: body_issue}),
  success: function (body) {
		        console.log(JSON.stringify({title: titre_issue, body: body_issue}));
		    },
   error: function (response) {
						  console.log(response);
					  },

});
});
}