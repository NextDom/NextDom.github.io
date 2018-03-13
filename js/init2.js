$(document).ready(function() {
    $('.tooltipped').tooltip({delay: 50});
});

document.addEventListener("DOMContentLoaded", function(){
    $('.preloader-background').delay(1700).fadeOut('slow');

    $('.preloader-wrapper')
    .delay(1700)
    .fadeOut();
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
            generateRepos("json/repos.json");
            generateTeam("json/members.json");
            generateWiki("json/wiki.json");
            generateTuto("json/tuto.json");
            generateChat("json/chat.json");
            generateDeveloper("json/developer.json");
            generateEvents("json/events.json");
        } else {
            generateRepos("https://api.github.com/orgs/Jeedom-Plugins-Extra/repos?per_page=100");
            generateTeam("json/members.json");
            generateWiki("json/wiki.json");
            generateTuto("json/Tuto.json");
            generateChat("json/chat.json");
            generateDeveloper("json/developer.json");
            generateEvents("https://api.github.com/orgs/Jeedom-Plugins-Extra/events?per_page=40");
        }
    }
}

function generateRepos(_json){
    var nbrissues = 0;
    var nbrrepos = 0;
    $.getJSON(_json,function(data){
        data.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
            return 0;
        });
        $.each(data, function(i) {
            if (data[i].name !='Jeedom-Plugins-Extra.github.io' && data[i].name !='Jeedom-Plugins-Extra' && data[i].name !='custom-jeedom'  && data[i].name !='extra-tools'){
                $('#ul_listPluginThird').append('\
                <div class="col s3 m3">\
                <div style="padding:10px" class="card medium hoverable sticky-action">\
                <span class="card-title-2 center-align badge1" data-badge="'+data[i].open_issues+'"><a href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'><img src="'+data[i].html_url+'/blob/master/plugin_info/'+data[i].name.substr(7)+'_icon.png?raw=true" width="35%" height="35%" class="center">\</a></span>\
                <div class="card-text">\
                '+data[i].description+'\
                </div>\
                <div style="margin:15px" class="card-action center-align">\
                <div class="tooltip">\
                <a class = "btn-floating btn blue-grey" data-position="bottom" data-delay="50" data-tooltip="I am a tooltip" href='+data[i].owner.html_url+'/'+data[i].owner.login+'/wiki/03-Liste-Plugins-&-Roadmap#'+data[i].name+'><i class ="fas fa-info"></i></a>\
                <span class="tooltiptext">Roadmap</span>\
                </div>\
                <div class="tooltip">\
                <a class = "btn-floating btn waves-effect waves-light bg-orange" href=https://github.com/Jeedom-Plugins-Extra/'+data[i].name+'/issues><i class="fas fa-bug"></i></a>\
                <span class="tooltiptext">Issues</span>\
                </div>\
                <div class="tooltip">\
                <a class = "btn-floating btn waves-effect waves-light light-green"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR><i class = "fas fa-book"></i></a>\
                <span class="tooltiptext">Documentation</span>\
                </div>\
                <div class="tooltip">\
                <a class = "btn-floating btn waves-effect waves-light grey"  href=https://jeedom-plugins-extra.github.io/'+data[i].name+'/fr_FR/changelog><i class ="fas fa-history"></i></a>\
                <span class="tooltiptext">Changelog</span>\
                </div>\
                </div>\
                </div>\
                ');
                nbrissues = nbrissues + data[i].open_issues;
                nbrrepos = nbrrepos + 1;
            }
        });
        $('#issuesdata').html('<font size="5">'+nbrissues+'</font>');
        $('#repodata').html('<font size="5">'+nbrrepos+'</font>');

    }); // end requestJSON Ajax call
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

function generateTeam(_json){
    var nbrmembres = 0;
    $.getJSON(_json,function(data){
        data.sort(function (a, b) {
            if (a.login.toLowerCase() > b.login.toLowerCase())
            return 1;
            if (a.login.toLowerCase() < b.login.toLowerCase())
            return -1;
            return 0;
        });
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
        <div class="tooltip">\
        <a class = "btn-floating btn-xs waves-effect waves-light blue-grey" href=https://github.com/Jeedom-Plugins-Extra/Jeedom-Plugins-Extra/wiki/02---Pr%C3%A9sentation-des-membres-de-la-Team#'+data[i].login+'><i class ="fas fa-user"></i></a>\
        <span class="tooltiptext">Présentation</span>\
        </div>\
        <div class="tooltip">\
        <a class = "btn-floating btn-xs waves-effect waves-light pink lighten-2" href=https://gitter.im/'+data[i].login+'><i class ="fab fa-gitter"></i></a>\
        <span class="tooltiptext">Chat</span>\
        </div>\
        <div class="tooltip">\
        <a class = "btn-floating btn-xs waves-effect waves-light light-green" href=https://gitter.im/'+data[i].login+'><img src="img/Jeedom.png" style="height:40px"></img></a>\
        <span class="tooltiptext">Jeedom</span>\
        </div>\
        <div class="tooltip">\
        <a class = "btn-floating btn-xs waves-effect waves-light grey" href=https://github.com/'+data[i].login+'><i class ="fab fa-github"></i></a>\
        <span class="tooltiptext">Github</span>\
        </div>\
        <div class="tooltip">\
        <a class = "btn-floating btn-xs waves-effect waves-light bg-orange" href=https://paypal.me/'+data[i].login+'><i class="fas fa-beer"></i></a>\
        <span class="tooltiptext">Dons</span>\
        </div>\
        </div>\
        </div>\
        </div>');
        nbrmembres = nbrmembres + 1;
    });
    $('#membersdata').html('<font size="5">'+nbrmembres+'</font>');
}); // end requestJSON Ajax call
}

function generateWiki(_json){
    //	requestJSON(_json, function(data) {
    $.getJSON(_json,function(data){

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

function generateTuto(_json){
    //	requestJSON(_json, function(data) {
    $.getJSON(_json,function(data){

        $('#ul_listTuto').empty();
        data.tuto.docs.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
            return 0;
        });
        for(var i in data.tuto.docs){
            $('#ul_listTuto').append('\
            <div class="col s6 m6">\
            <div class="card hoverable">\
            <div class="card-text">\
            <br>\
            <a class="center" href="'+data.tuto.docs[i].url+'" style="color:black; text-align:center">'+data.tuto.docs[i].name+'</a>\
            <br>\
            </div>\
            </div>\
            </div>');
        }
    });
}

function generateChat(_json){
    $.getJSON(_json,function(data){
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
    $.getJSON(_json,function(data){
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

function generateEvents(_json){
    var events ="";
    $.getJSON(_json,function(data){
        $('#dataEvents').empty();
        $.each(data, function(i) {
            switch( data[i].type){
                case "PushEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'"class="circle responsive-img"></a><font size="2"><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + '</div><br>';
                break;
                case "IssuesEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.issue.title + '</div><br>';
                break;
                case "GollumEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.pages[0].title + '</div><br>';
                break;
                case "DeleteEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' +  data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.ref + '</div><br>';
                break;
                case "IssueCommentEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.issue.title + '</div><br>';
                break;
                case "ForkEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + '</div><br>';
                break;
                case "PullRequestEvent":
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + ' : ' + data[i].payload.pull_request.title + '</div><br>';
                break;
                default:
                events = events + '<div class="chip"><img src="'+data[i].actor.avatar_url+'" width="30" height="30" style="vertical-align:middle; padding-top:5px" class="circle responsive-img"></a><font-size:12px><b> ' + data[i].created_at.substr(0, 10) + ' ' + data[i].type.replace("Event", "") + '</b> - ' + data[i].repo.name.substr(21) + '</div><br>';
            }
            $('#eventsdata').html(events);
        });
    });
}
