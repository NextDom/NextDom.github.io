$(function(){
	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('select').material_select();

	//use='local';
	use='online';
	DOC_CONFIG={}
	THIRD_CONFIG={}
	if (use=='online'){
		$.getJSON("site.json",function(data){
			DOC_CONFIG = data
			generateCatSite(DOC_CONFIG);
		});
		$.getJSON("site_third.json",function(data){
			THIRD_CONFIG = data
			generateThirdSite(THIRD_CONFIG);
		});
	}else{
		DOC_CONFIG = jQuery.parseJSON('{"main":{"name":{"fr_FR":"Général","en_US":"Main"},"icon":"","docs":[{"name":"installation","url":"installation/#language#/index.html"},{"name":"Compatibilité","url":"compatibility/#language#/index.html"}]},"howto":{"name":{"fr_FR":"Tutoriaux","en_US":"How to"},"icon":"","docs":[{"name":"Howto1","url":"installation/#language#/index.html"},{"name":"Howto2","url":"compatibility/#language#/index.html"}]},"plugins":{"name":{"fr_FR":"Plugins","en_US":"Plugins"},"icon":"","docs":[{"name":"plugin1","url":"installation/#language#/index.html"},{"name":"PLUGIN2","url":"compatibility/#language#/index.html"},{"name":"pLuGiN tOtO3","url":"compatibility/#language#/index.html"}]}}')
		generateCatSite(DOC_CONFIG);
		THIRD_CONFIG = jQuery.parseJSON('{"third_plugin":{"docs":[{"url":"third_plugin/ecowatt/#language#/index.html","name":"Eco-2-watt"},{"url":"third_plugin/ecowatt/#language#/index.html","name":"Test1"},{"url":"third_plugin/ecowatt/#language#/index.html","name":"Test2"},{"url":"third_plugin/ecowatt/#language#/index.html","name":"Test3"}],"name":{"en_US":"Thierd plugins","fr_FR":"Plugins tierces"}}}')
		generateThirdSite(THIRD_CONFIG);
	}

	$('#sel_language').on('change',function(){
		generateCatSite(DOC_CONFIG);
		generateThirdSite(THIRD_CONFIG);
	})
	$('#ul_listCategory').on('click','.collection-item',function(){
		generateDocSite(DOC_CONFIG[$(this).attr('data-key')]);
	})


	$('#in_search').keydown(function (e) {
		if (e.keyCode == 13) {
			var search = $(this).val();
			 window.open('https://github.com/search?l=AsciiDoc&q=org%3Ajeedom+path%3Adoc%2F'+$('#sel_language').val()+'+'+encodeURI(search)+'&type=Code&utf8=%E2%9C%93','_blank');
		}
	});

});


function convertCase(_string){
	return _string.charAt(0).toUpperCase()+_string.substr(1).toLowerCase();
}

function generateCatSite(data){
	$('#ul_listCategory').empty();
	$('#ul_listDoc').empty();
	for(var i in data){
		var name = data[i].name[$('#sel_language').val()];
		if(name == undefined){
			name = data[i].name['en_US'];
		}
		$('#ul_listCategory').append('<a class="collection-item waves-effect waves-jeedom" data-key="'+i+'">'+convertCase(name)+'<span class="badge">'+data[i].docs.length+'</span>'+'</a>');
	}
}

function generateDocSite(data){
	$('#ul_listDoc').empty();
	data.docs.sort(function (a, b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		return 0;
	});
	for(var i in data.docs){
		if(data.docs[i].name == 'equipement compatible'){
			$('#ul_listDoc').append('<a class="collection-item waves-effect waves-jeedom" target="_blank" href="'+data.docs[i].url.replace('#language#',$('#sel_language').val())+'">'+convertCase(data.docs[i].name)+'</a>');
		}
	}
	for(var i in data.docs){
		if(data.docs[i].name == 'equipement compatible'){
			continue;
		}
		$('#ul_listDoc').append('<a class="collection-item waves-effect waves-jeedom" target="_blank" href="'+data.docs[i].url.replace('#language#',$('#sel_language').val())+'">'+convertCase(data.docs[i].name)+'</a>');
	}
}

function generateThirdSite(data){
	$('#ul_listThird0').empty();
	$('#ul_listThird1').empty();
	$('#ul_listThird2').empty();
	data.third_plugin.docs.sort(function (a, b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		return 0;
	});
	for(var i in data.third_plugin.docs){
		colNb=i % 3;
		$('#ul_listThird'+colNb).append('<a class="collection-item waves-effect waves-jeedom" target="_blank" href="'+data.third_plugin.docs[i].url.replace('#language#',$('#sel_language').val())+'">'+convertCase(data.third_plugin.docs[i].name)+'</a>');
	}
}
