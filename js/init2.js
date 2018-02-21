var WIKI_CONFIG={}
var PLUGINS_CONFIG={}
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
			WIKI_CONFIG = data;
			generateWiki(WIKI_CONFIG);
		});
		$.getJSON("json/plugins.json",function(data){
			PLUGINS_CONFIG = data;
			generatePlugins(PLUGINS_CONFIG);
		});
		$.getJSON("json/chat.json",function(data){
			CHAT_CONFIG = data;
			generateChat(CHAT_CONFIG);
		});
		$.getJSON("json/developer.json",function(data){
			DEVELOPER_CONFIG = data;
			generateDeveloper(DEVELOPER_CONFIG);
		});
	}

});

function convertCase(_string){
	return _string.charAt(0).toUpperCase()+_string.substr(1).toLowerCase();
}


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
			<div class="card small hoverable sticky-action">\
				<span class="card-title center-align">'+_data.third_plugin.docs[i].name+'</span>\
					<div class="card-text">\
						<img src=https://github.com/Jeedom-Plugins-Extra/plugin-'+_data.third_plugin.docs[i].name+'/blob/master/plugin_info/'+_data.third_plugin.docs[i].name+'_icon.png?raw=true" width="80" height="85" class="center">\
						<p>'+_data.third_plugin.docs[i].description+'</p>\
					</div>\
					<div class="card-action center-align">\
						<a class="waves-effect waves-light btn" href=https://github.com/Jeedom-Plugins-Extra/Jeedom-Plugins-Extra/wiki/03-Liste-Plugins-&-Roadmap#'+_data.third_plugin.docs[i].name+'>Présentation</a>\
						<a class="waves-effect waves-light btn" href=https://jeedom-plugins-extra.github.io/plugin-'+_data.third_plugin.docs[i].name+'/fr_FR>Doc</a>\
						<a class="waves-effect waves-light btn" href=https://github.com/Jeedom-Plugins-Extra/plugin-'+_data.third_plugin.docs[i].name+'/issues>Issues</a>\
						<a class="waves-effect waves-light btn" href=https://jeedom-plugins-extra.github.io/plugin-'+_data.third_plugin.docs[i].name+'/fr_FR/changelog>Changelog</a>\
					</div>\
				</div>\
			</div>\
		</div>');

	}
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
