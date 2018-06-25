function buildDoc() {
    var title = 'zwave';
    title = title.replace('plugin-', '');
    $('#doc_title').append(title[0].toUpperCase() + title.substring(1))
    document.title = 'Documentation Jeedom | ' + title[0].toUpperCase() + title.substring(1)
    $(".button-collapse").sideNav();
    $('meta[name=description]').remove();
    $('head').append('<meta name="description" content="Ceci est la documentation du plugin "' + title[0].toUpperCase() + title.substring(1) + '", lier à la solution domotique Jeedom.">');
    $('img').addClass('responsive-img');
    $('#div_content table').addClass('striped');
    init();
    var regex = /\/([a-z]{2}_[A-Z]{2})\//g;
    var corresp = regex.exec(window.location.href)
    if (corresp !== null && corresp[1]) {
        $('.sel_lang').val(corresp[1])
    }
    $('select').material_select();
    $('.sel_lang').on('change', function () {
        var regex = /\/([a-z]{2}_[A-Z]{2})\//g;
        var corresp = regex.exec(window.location.href);
        var url = window.location.href.replace(corresp[1], $(this).find('option:selected').attr('value'));
        if (url.endsWith('/')) {
            url += 'index';
        }
        window.location.href = url;
    })
    $('#bt_up').on('click', function () {
        window.scrollTo(0, 0);
    })
    $(window).on("orientationchange", function (event) {
        init();
    });
    $(window).on("resize", function (event) {
        init();
    });

    function init() {
        $('#div_summary2,#div_summary').empty();
        var titlePlugin = title.charAt(0).toUpperCase() + title.substring(1).toLowerCase()
        if (window.innerWidth < 992) {
            $('#div_main').addClass('container');
            $('#div_content').toc({
                renderIn: "#div_summary2",
                selectors: 'h1,h2'
            });
        } else {
            $('#div_main').removeClass('container');
            $('#div_content').toc({
                renderIn: "#div_summary",
                selectors: 'h1,h2'
            });
        }
        $('#toctitle').html('<h2 style="padding-left:5px !important;">' + titlePlugin + '</h2>');
        $('.toclevel-2').parent().css('color', 'blue');
    }

    var i = 1, j = 1;
    $('h1, h2', $('#div_content')).each(function () {
        if ($(this)[0].tagName.toLowerCase() == 'h1') {
            $('#' + $(this).attr('id')).text(i + ') ' + $(this).text());
            i++;
        }
        if ($(this)[0].tagName.toLowerCase() == 'h2') {
            $('#' + $(this).attr('id')).text((i - 1) + '.' + j + ') ' + $(this).text());
            j++;
        } else {
            j = 1;
        }
    });
}

$(document).ready(function () {
    window.setTimeout(buildDoc,1000);});

var idChapitre = null, nbrChapitre = 0, idAncre = null;
$('#div_content h1, #div_content h2').on('inview', function (event, isInView) {
    nbrChapitre = $('a.active').length;
    idAncre = $(this).attr('id');
    if (isInView) {
        $('a[href="#' + idAncre + '"]').addClass('active');
        if (idChapitre != null) {
            $('a[href="#' + idChapitre + '"]').removeClass('active');
            idChapitre = null;
        }
    } else if (nbrChapitre > 1) {
        $('a[href="#' + idAncre + '"]').removeClass('active');
    } else {
        idChapitre = idAncre;
    }
});