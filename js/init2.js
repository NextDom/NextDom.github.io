var username;
var password;


    $(document).ready(function() {
      $('.modal').modal();
      
      $('#modalTrigger').on('click', function() {
        $('#modal1').modal('open');
      });
    });
  
$(function(){
	
	$.getJSON("json/user.json",function(data){
    	username = data.username;
		password = data.password;
});

	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('select').material_select();
	$('ul.tabs').tabs();



	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', 'https://api.github.com', true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function() {
		 if (xmlhttp.readyState === 4) {

		      if (xmlhttp.status === 403) { 	
		    	auth("generateRepos","json/repos.json");
				auth("generateTeam","json/members.json");
				auth("generateWiki","json/wiki.json");
				auth("generateChat","json/chat.json");
				auth("generateDeveloper","json/developer.json");
				auth("generateEvents","json/events.json");
			} else {
				auth("generateRepos", "https://api.github.com/orgs/Jeedom-Plugins-Extra/repos?per_page=100");
				auth("generateTeam", "https://api.github.com/orgs/Jeedom-Plugins-Extra/members");
				auth("generateWiki", "json/wiki.json");
				auth("generateChat", "json/chat.json");
				auth("generateDeveloper","json/developer.json");
				auth("generateEvents","https://api.github.com/orgs/Jeedom-Plugins-Extra/events?per_page=40");
			}
		}
	}
});

function auth(fonction, _url){
$.ajax
({
  type: "GET",
  url: _url,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(username + ":" + password)
  },
  data: {},
  success: function (reponse){
  switch (fonction){
      case "generateRepos":
      generateRepos(reponse);
      break;
      case "generateTeam":
		generateTeam(reponse);
		break;
		case "generateWiki":
		generateWiki(reponse);
		break;
		case "generateChat":
		generateChat(reponse);
		break;
		case "generateDeveloper":
		generateDeveloper(reponse);
		break;
		case "generateEvents":
		generateEvents(reponse);
		break;
  }


  }
});
}

function generateRepos(data){
var nbrissues = 0;
var nbrrepos = 0;
	//$.getJSON(_json,function(data){
		$.each(data, function(i) {
			$('#pluginmodal').append('\
		   <div id="modal'+i+'" class="modal">\
				<div class="modal-content">\
					<h4>Création issue</h4>\
					<div class="input-field col s6 offset-s1">\
                        <input id="username" type="text" class="validate">\
                        <label for="username">Username</label>\
                	</div>\
                	<div class="input-field col s6 offset-s1">\
                        <input id="password" type="text" class="validate">\
                        <label for="password">Password</label>\
                	</div>\
                	<div class="input-field col s6 offset-s1">\
                        <input id="titre" type="text" class="validate">\
                        <label for="titre">Titre</label>\
                	</div>\
                	<div class="input-field col s6 offset-s1">\
                        <textarea id="textarea1" class="materialize-textarea"></textarea>\
                        <label for="textarea1">Body</label>\
                	</div>\
				</div>\
				<div class="modal-footer">\
				    <a href="#" class=" modal-action modal-close waves-effect waves-green btn-flat">Envoyer</a>\
				    <a href="#" class=" modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>\
				</div>\
			</div><br>\
			\
		');
			if (data[i].name !='Jeedom-Plugins-Extra.github.io' && data[i].name !='Jeedom-Plugins-Extra' && data[i].name !='custom-jeedom'){
				$('#ul_listPluginThird').append('\
                	<div class="col s8 m4">\
        	        	<div style="padding:10px" class="card medium hoverable sticky-action">\
                        	<span class="card-title-2 center-align"><a href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'><img src="'+data[i].html_url+'/blob/master/plugin_info/'+data[i].name.substr(7)+'_icon.png?raw=true" width="35%" height="35%" class="center">\</a></span>\
		                    <div class="card-text">\
		                    	'+data[i].description+'\
		                    </div>\
                        	<div style="margin:15px" class="card-action center-align">\
                        	                                	<a class = "btn-floating btn waves-effect waves-light blue-grey"  href='+data[i].owner.html_url+'/'+data[i].owner.login+'/wiki/03-Liste-Plugins-&-Roadmap#'+data[i].name+'><i class ="fas fa-info"></i></a>\
                            	<a class = "btn-floating btn waves-effect waves-light bg-orange" href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'/issues><i class="fas fa-bug"></i></a>\
								<a class = "btn-floating btn waves-effect waves-light modal-trigger" id="modalTrigger" href="#modal1"><i class="fas fa-bug"></i></a>\
								<a class = "btn-floating btn waves-effect waves-light light-green"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR><i class = "fas fa-book"></i></a>\
	                        	<a class = "btn-floating btn waves-effect waves-light grey"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR/changelog><i class ="fas fa-history"></i></a>\
    		                <button class="btn-large" id="modalTrigger">Modal trigger 2</button>\
    		                </div>\
                        </div>\
                        ');
			nbrissues = nbrissues + data[i].open_issues;
			nbrrepos = nbrrepos + 1;
			}
        });
        $('#issuesdata').html('<font size="5">'+nbrissues+'</font>');
		$('#repodata').html('<font size="5">'+nbrrepos+'</font>');
				
    //}); // end requestJSON Ajax call
}


function createissue(repos, titre_issue, body_issue){
    $.each(repos, function(i) {
$.ajax
({
  type: "POST",
  url: 'https://api.github.com/repos/Jeedom-Plugins-Extra/'+ repos[i].name +'/issues',
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

function generateTeam(data){
	var nbrmembres = 0;
       // $.getJSON(_json,function(data){
			$.each(data, function(i) {$('#ul_listMembers').append('\
            	<div class="col m3">\
	        		<div style="padding:5px" class="card hoverable sticky-action">\
                    	<span class="card-title-2 center-align">'+data[i].login+'</span>\
	                    <div class="card-text ">\
	                    	<a href='+data[i].html_url+'><img src="'+data[i].avatar_url+'" width="90" height="90" class="center"></a>\
					    <br>\
	                   	</div>\
	                   		<div style="margin:5px" class="card-action center-align">\
					    <img src=https://img.shields.io/github/followers/'+data[i].login+'.svg?style=social&logo=github&label=Follow><br>\
	                	<a class = "btn-floating btn waves-effect waves-light blue-grey" href=https://github.com/Jeedom-Plugins-Extra/Jeedom-Plugins-Extra/wiki/02---Pr%C3%A9sentation-des-membres-de-la-Team#'+data[i].login+'><i class ="fas fa-user"></i></a>\
					    <a class = "btn-floating btn waves-effect waves-light pink lighten-2" href=https://gitter.im/'+data[i].login+'><i class ="fab fa-gitter"></i></a>\
					    <a class = "btn-floating btn waves-effect waves-light light-green" href=https://gitter.im/'+data[i].login+'><img src="img/Jeedom.png" style="height:45px"></img></a>\
					    <a class = "btn-floating btn waves-effect waves-light grey" href=https://github.com/'+data[i].login+'><i class ="fab fa-github"></i></a>\
                         		    <a class = "btn-floating btn waves-effect waves-light bg-orange" href=https://paypal.me/'+data[i].login+'><i class="fas fa-beer"></i></a>\
	                   		</div>\
                    </div>\
                </div>');
			nbrmembres = nbrmembres + 1;
            });
    	$('#membersdata').html('<font size="5">'+nbrmembres+'</font>');
  // }); // end requestJSON Ajax call
}

function generateWiki(data){
//	requestJSON(_json, function(data) {
//$.getJSON(_json,function(data){

		$('#ul_listWiki').empty();
		data.wiki.docs.sort(function (a, b) {
			if (a.name.toLowerCase() > b.name.toLowerCase())
				return 1;
			if (a.name.toLowerCase() < b.name.toLowerCase())
				return -1;
			return 0;
			});
		for(var i in data.wiki.docs){
			$('#ul_listWiki').append('\
			    <div class="col s6 m6">\
			        <div class="card hoverable">\
			            <div class="card-text">\
			            <br>\
			                <a class="center" href="'+data.wiki.docs[i].url+'" style="color:black; text-align:center">'+data.wiki.docs[i].name+'</a>\
		                <br>\
		                </div>\
	                </div>\
                </div>');
		}
//	});
}

function generateChat(data){
//$.getJSON(_json,function(data){
	$('#ul_listChat').empty();

	for(var i in data.chat.docs){
		$('#ul_listChat').append('\
			<div class="col s6 m6">\
				<div class="card hoverable">\
					<div class="card-text">\
					<br>\
						<a class="center" href="'+data.chat.docs[i].url+'" style="color:black; text-align:center">'+data.chat.docs[i].name+'</a>\
						<br>\
						</div>\
					</div>\
				</div>\
			</div>');
	}
	//});
}

function generateDeveloper(data){
//$.getJSON(_json,function(data){
		$('#ul_listDeveloper').empty();
		data.developer.docs.sort(function (a, b) {
			if (a.name.toLowerCase() > b.name.toLowerCase())
				return 1;
			if (a.name.toLowerCase() < b.name.toLowerCase())
				return -1;
			return 0;
		});
		for(var i in data.developer.docs){
			$('#ul_listDeveloper').append('\
				<div class="col s6 m6">\
					<div class="card hoverable">\
						<div class="card-text">\
						<br>\
							<a class="center" href="'+data.developer.docs[i].url+'" style="color:black; text-align:center; display:block">'+data.developer.docs[i].name+'</a>\
							<br>\
							</div>\
						</div>\
					</div>\
				</div>');
		}
//	});
}

function generateEvents(data){
    var events ="";
//$.getJSON(_json,function(data){
		$('#dataEvents').empty();
		$.each(data, function(i) {
		    switch( data[i].type){
		        case "PushEvent":
		              events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><font size="2"><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' <br>';
		        break;
		        case "IssuesEvent":
		            events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.issue.title + '<br>';
		        break;
		        case "GollumEvent":
		            events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.pages[0].title + '<br>';
		        break;
		        case "DeleteEvent":
		            events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.ref + ' <br>';
		        break;
		        case "IssueCommentEvent":
		             events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.issue.title + '<br>';
		        break;
		        case "ForkEvent":
		             events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : <br>';
		        break;
		         case "PullRequestEvent":
		             events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.pull_request.title + '<br>';
		        break;
		        default:
		            events = events + '<a href='+data[i].html_url+'><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><font-size:12px><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' <br>';
		    }
            $('#eventsdata').html(events);
		});
	//});
}
