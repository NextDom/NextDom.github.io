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

	$('a[href=#developpement]').on('click',function(){
		$('#developer a.active').click();
		setTimeout(function(){ $('#developer a.active').click(); }, 500);
	});

	use='online';
	if (use=='online'){
		generateRepos("https://api.github.com/orgs/Jeedom-Plugins-Extra/repos?per_page=100");
		generateTeam("json/members.json");
		generateWiki("json/wiki.json");
		generateChat("json/chat.json");
		generateDeveloper("json/developer.json");

	} else {
		generateRepos("json/repos.json");
		generateTeam("json/members.json");
		generateWiki("json/wiki.json");
		generateChat("json/chat.json");
		generateDeveloper("json/developer.json");
	}

});

function convertCase(_string){
	return _string.charAt(0).toUpperCase()+_string.substr(1).toLowerCase();
}

function generateRepos(_json){
var nbrissues = 0;
var nbrrepos = 0;
	requestJSON(_json, function(data) {
		$.each(data, function(i) {
			if (data[i].name !='Jeedom-Plugins-Extra.github.io' && data[i].name !='Jeedom-Plugins-Extra' && data[i].name !='custom-jeedom'){
				$('#ul_listPluginThird').append('\
                	<div class="col s8 m4">\
        	        	<div class="card medium hoverable sticky-action">\
                        	<span class="card-title center-align"><img src="'+data[i].html_url+'/blob/master/plugin_info/'+data[i].name.substr(7)+'_icon.png?raw=true" width="50%" height="50%" class="center">\</a></span>\
		                    <div class="card-text">\
		                    	'+data[i].description+'\
		                    </div>\
                        	<div class="card-action center-align">\
                        	    <a href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'/issues><img src=https://img.shields.io/github/issues/Jeedom-Plugins-Extra/'+data[i].name+'.svg?longCache=true&style=flat-square></a>\
		                    	 <img src=https://img.shields.io/github/stars/Jeedom-Plugins-Extra/'+data[i].name+'.svg?longCache=true&style=flat-square><br>\
                            	<a class = "btn-floating waves-effect waves-light blue-grey"  href='+data[i].owner.html_url+'/'+data[i].owner.login+'/wiki/03-Liste-Plugins-&-Roadmap#'+data[i].name+'><i class ="fas fa-info"></i></a>\
                            	<a class = "btn-floating waves-effect waves-light bg-orange" href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'/issues><i class="fas fa-bug"></i></a>\
								<a class = "btn-floating waves-effect waves-light light-green"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR><i class = "fas fa-book"></i></a>\
	                        	<a class = "btn-floating waves-effect waves-light grey"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR/changelog><i class ="fas fa-history"></i></a>\
    		                   </div>\
                        </div>\
                </div>');
			nbrissues = nbrissues + data[i].open_issues;
			nbrrepos = nbrrepos + 1;
			}
        });
        $('#issuesdata').html('<font size="5">'+nbrissues+'</font>');
		$('#repodata').html('<font size="5">'+nbrrepos+'</font>');
    }); // end requestJSON Ajax call
}

function generateTeam(_json){
	var nbrmembres = 0;
        requestJSON(_json, function(data) {
			$.each(data, function(i) {$('#ul_listMembers').append('\
            	<div class="col m2">\
	        		<div class="card hoverable sticky-action">\
                    	<span class="card-title center-align">'+data[i].login+'</span>\
	                    <div class="card-text ">\
	                    	<a href='+data[i].html_url+'><img src="'+data[i].avatar_url+'" width="90" height="90" class="center"></a>\
					    <br>\
	                   	</div>\
	                   		<div class="card-action center-align">\
	                   		    <a class = "btn-floating waves-effect waves-light blue-grey"  href=https://github.com/Jeedom-Plugins-Extra/Jeedom-Plugins-Extra/wiki/02---Pr%C3%A9sentation-des-membres-de-la-Team#'+data[i].login+'><i class ="fas fa-user"></i></a>\
                                <a class = "btn-floating waves-effect waves-light light-green" href=https://paypal.me/'+data[i].login+'><i class="fas fa-beer"></i></a>\
	                   		</div>\
                    </div>\
                </div>');
			nbrmembres = nbrmembres + 1;
            });
    	$('#membersdata').html('<font size="5">'+nbrmembres+'</font>');
    }); // end requestJSON Ajax call
}

function generateWiki(_json){
	requestJSON(_json, function(data) {
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
	});
}

function generateChat(_json){
	requestJSON(_json, function(data) {
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
	});
}

function generateDeveloper(_json){
	requestJSON(_json, function(data) {
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
	});
}

function requestJSON(url, callback) {
	$.ajax({
  		url: url,
  		complete: function(xhr) {
    		callback.call(null, xhr.responseJSON);
      	}
    });
}
