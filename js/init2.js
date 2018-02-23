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


<<<<<<< HEAD
function generateOrga(){
=======
function generatePlugins(_data){
	$('#ul_listPluginThird').empty();
	_data.third_plugin.docs.sort(function (a, b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		return 0;
	});
	for(var i in _data.third_plugin.docs){
		$('#ul_listPluginThird').append('\
		<div class="col s8 m4">\
			<div class="card medium hoverable sticky-action">\
				<span class="card-title center-align">'+_data.third_plugin.docs[i].name+'</span>\
					<div class="card-text">\
						<img src=https://github.com/Jeedom-Plugins-Extra/plugin-'+_data.third_plugin.docs[i].name+'/blob/master/plugin_info/'+_data.third_plugin.docs[i].name+'_icon.png?raw=true" width="80" height="85" class="center">\
						<p align="center">'+_data.third_plugin.docs[i].description+'</p>\
					</div>\
					<div class="card-action center-align">\
						<a class="waves-effect waves-light btn" href=https://github.com/Jeedom-Plugins-Extra/Jeedom-Plugins-Extra/wiki/03-Liste-Plugins-&-Roadmap#plugin-'+_data.third_plugin.docs[i].name+'>Présentation</a>\
						<a class="waves-effect waves-light btn" href=https://jeedom-plugins-extra.github.io/plugin-'+_data.third_plugin.docs[i].name+'/fr_FR>Doc</a>\
						<a class="waves-effect waves-light btn" href=https://github.com/Jeedom-Plugins-Extra/plugin-'+_data.third_plugin.docs[i].name+'/issues>Issues</a>\
						<a class="waves-effect waves-light btn" href=https://jeedom-plugins-extra.github.io/plugin-'+_data.third_plugin.docs[i].name+'/fr_FR/changelog>Changelog</a>\
						<a href=https://waffle.io/Jeedom-Plugins-Extra/'+_data.third_plugin.docs[i].name+'><img src=https://badge.waffle.io/Jeedom-Plugins-Extra/plugin-'+_data.third_plugin.docs[i].name+'.svg?columns=To%20Do,In%20Progress,Done class="center"></a>\
					</div>\
				</div>\
			</div>\
		</div>');
>>>>>>> 5cd0f7a40b62d5b1646f9fb3b751cc72a96e363d

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

                 // $('#issuesdata').html('<font size="6">'+nbrissues+'</font>');
                  $('#repodata').html('<font size="6">'+reposnum+'</font>');

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
					                            <a class = "btn-floating waves-effect waves-light blue"  href='+data[i].owner.html_url+'/'+data[i].owner.login+'/wiki/03-Liste-Plugins-&-Roadmap#'+data[i].name+'><i class ="fas fa-info"></i></a>\
					                            <a class = "btn-floating waves-effect waves-light red" href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'/issues><i class="fas fa-exclamation"></i></a>\
                                      <a class = "btn-floating waves-effect waves-light green"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR><i class = "material-icons">library_books</i></a>\
						                        	<a class = "btn-floating waves-effect waves-light grey"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR/changelog><i class ="fas fa-code"></i></a>\
				                        	</div>\
				                        </div>\
			                        </div>\
		                        </div>');
														nbrissues = nbrissues + data[i].open_issues;

            });
             // $('#issuesdata').html('<font size="6">'+nbrissues+'</font>');
                  $('#issuesdata').html('<font size="6">'+nbrissues+'</font>');
        }); // end requestJSON Ajax call
}

function generateTeam(){
		var nbrmembres = 0;
        requestJSON("json/members.json", function(data) {
					$.each(data, function(i) {$('#ul_listMembers').append('\
		                        <div class="col s8 m4">\
		                	        <div class="card small hoverable sticky-action">\
				                        <span class="card-title center-align">'+data[i].login+'</span>\
					                    <div class="card-text">\
						                    <a  href='+data[i].html_url+'><img src="'+data[i].avatar_url+'" width="120" height="120" class="center"></a>\
						                   </div>\
			                        </div>\
		                        </div>');
														nbrmembres = nbrmembres + 1;
            });
             $('#membersdata').html('<font size="6">'+nbrmembres+'</font>');
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
