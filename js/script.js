function esborrar(item) {
    $(item).closest('article').remove();
};

$(document).ready(function () {

    $('input:image').click(esborrar(this));

    // Funció que quan es clica un botó del nav, es desplega el formulari
    $('.btnNav').on('click', function () {
        $('#formulari').fadeToggle("slow");
        $('.paperera').fadeToggle("slow");
    });


    // Funció que crea la notícia
    $("#crearNoticia").on('click', function () {
        if (($("#titolNotica").val() != '') && ($("#textNoticia").val() != '')) {

            var avui = new Date();

            var vdata = avui.getDate() + '/' + (avui.getMonth() + 1) + '/' + avui.getFullYear() + ' - ' + avui.getHours() + ':' + (avui.getMinutes()<10?'0':'') + avui.getMinutes();
            var vtitol = $("#titolNoticia").val();
            var vtext = $("#textNoticia").val();
            var noticia;
            if ($("#seccio").val() == "Principal") {
                // Creem la notícia a la web
                $("section").prepend('<article><h2>' + vtitol + '<span class="paperera" style="display:inline"><input onclick="esborrar(this)" type=image src="paperera1.png"></span></h2><small>' + vdata + '</small><p>' + vtext + '</p></article>');
                // Guardem la noticia al localStorage
                // Recuparem les noticies que hi ha al localStorage
                var noticiesSection = JSON.parse(localStorage.getItem("noticiesS"));
                // Guardem la notícia nova en una variable
                noticia = { "titol": vtitol, "data": vdata, "text": vtext };
                // Afegim la notícia al JSON
                noticiesSection.push(noticia);
                // Puguem el JSON al localStorage
                localStorage.setItem("noticiesS", JSON.stringify(noticiesSection));
            } else {
                // Creem la notícia a la web
                $("aside").prepend('<article><h3>' + vtitol + '<span class="paperera" style="display:inline"><input onclick="esborrar(this)" type=image src="paperera1.png"></span></h3><small>' + vdata + '</small><p>' + vtext + '</p></article>');
                // Guardem la noticia al localStorage
                // Recuparem les noticies que hi ha al localStorage
                var noticiesAside = JSON.parse(localStorage.getItem("noticiesA"));
                // Guardem la notícia nova en una variable
                noticia = { "titol": vtitol, "data": vdata, "text": vtext };
                // Afegim la notícia al JSON
                noticiesAside.push(noticia);
                // Puguem el JSON al localStorage
                localStorage.setItem("noticiesA", JSON.stringify(noticiesAside));
            }
            //Guardem la notícia al localStorage

        }
    });

    // Visites al localStorage
    if (localStorage.numvisites) {
        localStorage.numvisites = Number(localStorage.numvisites) + 1;
    } else {
        localStorage.numvisites = 1;
    }
    if (localStorage.numvisites == 1) {
        document.getElementById("visites").innerHTML = "<h5>Ens has visitat <span class='badge badge-secondary'>" + localStorage.numvisites + "</span> vegada.</h5>";
    } else {
        document.getElementById("visites").innerHTML = "<h5>Ens has visitat <span class='badge badge-secondary'>" + localStorage.numvisites + "</span> vegades.</h5>";
    }

    // Si és el primer cop es guarden les primeres notícies al localStorage
    if (!localStorage.noticiesS) {
        var noticiesSection1 = [];
        localStorage.setItem("noticiesS", JSON.stringify(noticiesSection1));
    }
    if (!localStorage.noticiesA) {
        var noticiesAside1 = [];
        localStorage.setItem("noticiesA", JSON.stringify(noticiesAside1));
    }

    // Si ja havia entrat, es carreguen totes les notícies
    if (localStorage.noticiesS) {
        // Recuparem les noticies que hi ha al localStorage
        var noticiesSection = JSON.parse(localStorage.getItem("noticiesS"));
        // Posem les notícies de section
        noticiesSection.forEach(element => {
            $("section").prepend('<article><h2>' + element.titol + '<span class="paperera" style="display:none"><input onclick="esborrar(this)" type=image src="paperera1.png"></span></h2><small>' + element.data + '</small><p>' + element.text + '</p></article>');
        });
    }
    if (localStorage.noticiesA) {
        // Recuparem les noticies que hi ha al localStorage
        var noticiesAside = JSON.parse(localStorage.getItem("noticiesA"));
        // Posem les notícies de section
        noticiesAside.forEach(element => {
            $("aside").prepend('<article><h3>' + element.titol + '<span class="paperera" style="display:none"><input onclick="esborrar(this)" type=image src="paperera1.png"></span></h3><small>' + element.data + '</small><p>' + element.text + '</p></article>');
        });
    }


});

