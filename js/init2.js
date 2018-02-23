var WIKI_CONFIG={}
var CHAT_CONFIG={}
var DEVELOPER_CONFIG={}


$(function(){
	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('select').material_select();
	$('ul.tabs').tabs();

	$('a[href=#plugin]').on('click',function(){
		$('#plugin a.active').click();
		setTimeout(function(){ $('#plugin a.active').click(); }, 500);
	});

	$('a[href=#chat]').on('click',function(){
		$('#chat a.active').click();
		setTimeout(function(){ $('#chat a.active').click(); }, 500);
	});

	$('a[href=#wiki]').on('click',function(){
		$('#wiki a.active').click();
		setTimeout(function(){ $('#wiki a.active').click(); }, 500);
	});

	$('a[href=#developer]').on('click',function(){
		$('#developer a.active').click();
		setTimeout(function(){ $('#developer a.active').click(); }, 500);
	});

	use='online';
	if (use=='online'){

		$.getJSON("json/wiki.json",function(data){
			generateWiki(data);
		});

		generateOrga();
		generateRepos();
		generateTeam();

		$.getJSON("json/chat.json",function(data){
			generateChat(data);
		});
		$.getJSON("json/developer.json",function(data){
			generateDeveloper(data);
		});

	}

});

function convertCase(_string){
	return _string.charAt(0).toUpperCase()+_string.substr(1).toLowerCase();
}


function generateOrga(){

            requestJSON("json/organization.json", function(json) {

                // else we have a user and we display their info
                var fullname   = json.name;
                var username   = json.login;
                var aviurl     = json.avatar_url;
                var profileurl = json.html_url;
                var location   = json.location;
                var followersnum = json.followers;
                var followingnum = json.following;
                var reposnum     = json.public_repos;

                $('#repodata').html('<font size="5">'+reposnum+'</font>');

            }); // end requestJSON Ajax call
}

function generateRepos(){
var nbrissues =0;
        requestJSON("json/repos.json", function(data) {

               $.each(data, function(i) {$('#ul_listPluginThird').append('\
		                        <div class="col s8 m4">\
		                	        <div class="card medium hoverable sticky-action">\
				                        <span class="card-title center-align">'+data[i].name.substr(7)+'</span>\
					                    <div class="card-text">\
						                    <img src="'+data[i].html_url+'/blob/master/plugin_info/'+data[i].name.substr(7)+'_icon.png?raw=true" width="80" height="85" class="center">\
						                    <p>'+data[i].description+'</p>\
						                    <ul>\
					                    </div>\
					                        <div class="card-action center-align">\
					                            <a class = "btn-floating waves-effect waves-light blue-grey"  href='+data[i].owner.html_url+'/'+data[i].owner.login+'/wiki/03-Liste-Plugins-&-Roadmap#'+data[i].name+'><i class ="fas fa-info"></i></a>\
					                            <a class = "btn-floating waves-effect waves-light orange" href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'/issues><i class="fas fa-bug"></i></a>\
                                      <a class = "btn-floating waves-effect waves-light light-green"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR><i class = "fas fa-book"></i></a>\
						                        	<a class = "btn-floating waves-effect waves-light grey"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR/changelog><i class ="fas fa-history"></i></a>\
				                        	</div>\
				                        </div>\
			                        </div>\
		                        </div>');
														nbrissues = nbrissues + data[i].open_issues;

            });
            $('#issuesdata').html('<font size="5">'+nbrissues+'</font>');
        }); // end requestJSON Ajax call
}

function generateTeam(){
		var nbrmembres = 0;
        requestJSON("json/members.json", function(data) {
					$.each(data, function(i) {$('#ul_listMembers').append('\
		                        <div class="col m2">\
		                	        <div class="card hoverable sticky-action">\
				                        <span class="card-title center-align">'+data[i].login+'</span>\
					                    <div class="card-text">\
						                    <a  href='+data[i].html_url+'><img src="'+data[i].avatar_url+'" width="90" height="90" class="center"></a>\
								    <br>\
						                   </div>\
			                        </div>\
		                        </div>');
														nbrmembres = nbrmembres + 1;
            });
            $('#membersdata').html('<font size="5">'+nbrmembres+'</font>');
        }); // end requestJSON Ajax call
}

function generateWiki(_data){
	$('#ul_listWiki').empty();
	_data.wiki.docs.sort(function (a, b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		return 0;
	});
	for(var i in _data.wiki.docs){
		$('#ul_listWiki').append('<div class="col s4 m4"><div class="card horizontal hoverable sticky-action"><div class="card-text center-align"><p><a href="'+_data.wiki.docs[i].url+'" style="color:black; text-align:center; display:block">'+_data.wiki.docs[i].name+'</a></p></div></div></div></div>');
	}
}

function generateChat(_data){
	$('#ul_listChat').empty();
	_data.chat.docs.sort(function (a, b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		return 0;
	});
	for(var i in _data.chat.docs){
		$('#ul_listChat').append('<div class="col s4 m4"><div class="card horizontal hoverable sticky-action"><div class="card-text"><p><a href="'+_data.chat.docs[i].url+'" style="color:black; text-align:center; display:block">'+_data.chat.docs[i].name+'</a></p></div></div></div></div>');

	}
}

function generateDeveloper(_data){
	$('#ul_listDeveloper').empty();
	_data.developer.docs.sort(function (a, b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		return 0;
	});
	for(var i in _data.developer.docs){
		$('#ul_listDeveloper').append('<div class="col s4 m4"><div class="card horizontal hoverable sticky-action"><div class="card-text"><p><a href="'+_data.developer.docs[i].url+'" style="color:black; text-align:center; display:block">'+_data.developer.docs[i].name+'</a></p></div></div></div></div>');

	}
}

          function requestJSON(url, callback) {
            $.ajax({
              url: url,
              complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
              }
            });
          }
