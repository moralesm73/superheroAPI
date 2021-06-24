
const idUserAPISuperHero = "3582460101979492";
let prueba = [];

const consultarSuperHero = (stringBusqueda, accessToken) => {
    return new Promise(resolve => {
        $.ajax({
            type: "GET",
            url: "https://www.superheroapi.com/api.php/" + accessToken + "/search/" + stringBusqueda,
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                const consultaSuperheroe = Object.values(data);
                $("#stringBúsqueda").html(consultaSuperheroe[1]);
                consultaSuperheroe.splice(0,2);
                let arregloHeroes = Object.values(consultaSuperheroe[0]);
                //const powerstatsHero = consultaSuperheroe[1];
                prueba = arregloHeroes;
                //crearGraficoPoderes(powerstatsHero);
                //console.log(consultaSuperheroe);
                //fillInfoHero(consultaSuperheroe);
                resolve(arregloHeroes);
            },
            error: function (data) {
                $("#errorConsulta").html("No exixte un Superheroe con ese nombre")
            }
        })
    });
}

const crearGraficoPoderes = (powerstats) => {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Estadísticas del Héroe"
        },
        legend: {
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            //showInLegend: true,
            toolTipContent: "{name}: <strong>#percent%</strong>",
            indexLabel: "{name} - {y} ptos",
            dataPoints: [
                { y: +powerstats["intelligence"], name: "Inteligencia", exploded: true },
                { y: +powerstats["strength"], name: "Fuerza", exploded: true },
                { y: +powerstats["speed"], name: "Velocidad", exploded: true },
                { y: +powerstats["durability"], name: "Resistencia", exploded: true },
                { y: +powerstats["power"], name: "Poder", exploded: true },
                { y: +powerstats["combat"], name: "Combate", exploded: true }
            ]
        }]
    });
    chart.render();
}

const fillInfoHero = (arrayHero) => {
    $("#nombreSuperHero").html(arrayHero[1]);
    $("#imgSuperHero").attr("src", arrayHero[7].url);
    crearGraficoPoderes(arrayHero[2]);
    let accordionItems = document.getElementsByClassName("accordion-item");
    let biography = "";
    let appearance  = "";
    let work  = "";
    let connections  = "";
    if(arrayHero[3]["full-name"] !== "") {biography += '<p class="m-0"><b>Nombre Completo</b>:</p><p>' + arrayHero[3]["full-name"] + '</p>'};
    if(arrayHero[3]["alter-egos"] !== "No alter egos found.") {biography += '<p class="m-0"><b>Alter Egos</b>:</p><p>' + arrayHero[3]["alter-egos"] + '</p>'};
    if(arrayHero[3]["aliases"].length !== 0) {biography += '<p class="m-0"><b>Alias</b>:</p><p>' + arrayHero[3]["aliases"].join(", ") + '</p>'};
    if(arrayHero[3]["place-of-birth"] !== "-") {biography += '<p class="m-0"><b>Lugar de Nacimiento</b>:</p><p>' + arrayHero[3]["place-of-birth"] + '</p>'};
    if(arrayHero[3]["first-appearance"] !== "") {biography += '<p class="m-0"><b>Primera Aparición</b>:</p><p>' + arrayHero[3]["first-appearance"] + '</p>'};
    if(arrayHero[3]["publisher"] !== "") {biography += '<p class="m-0"><b>Editorial</b>:</p><p>' + arrayHero[3]["publisher"] + '</p>'};
    if(arrayHero[3]["alignment"] !== "") {biography += '<p class="m-0"><b>Rol</b>:</p><p class="text-capitalize">' + arrayHero[3]["alignment"] + '</p>'};
    if(arrayHero[4]["gender"] !== "") {appearance += '<p class="m-0"><b>Género</b>:</p><p>' + arrayHero[4]["gender"] + '</p>'};
    if(arrayHero[4]["race"] !== "") {appearance += '<p class="m-0"><b>Raza</b>:</p><p>' + arrayHero[4]["race"] + '</p>'};
    if(arrayHero[4]["height"][1] !== "0 cm") {appearance += '<p class="m-0"><b>Estatura</b>:</p><p class="text-capitalize">' + arrayHero[4]["height"][1] + '</p>'};
    if(arrayHero[4]["weight"][1] !== "0 kg") {appearance += '<p class="m-0"><b>Peso</b>:</p><p class="text-capitalize">' + arrayHero[4]["weight"][1] + '</p>'};
    if(arrayHero[4]["eye-color"] !== "-") {appearance += '<p class="m-0"><b>Color de Ojos</b>:</p><p class="text-capitalize">' + arrayHero[4]["eye-color"] + '</p>'};
    if(arrayHero[4]["hair-color"] !== "-") {appearance += '<p class="m-0"><b>Color de Pelo</b>:</p><p class="text-capitalize">' + arrayHero[4]["hair-color"] + '</p>'};
    if(arrayHero[5]["occupation"] !== "-") {work += '<p class="m-0"><b>Ocupación</b>:</p><p class="text-capitalize">' + arrayHero[5]["occupation"] + '</p>'};
    if(arrayHero[5]["base"] !== "-") {work += '<p class="m-0"><b>Base</b>:</p><p class="text-capitalize">' + arrayHero[5]["base"] + '</p>'};
    if(arrayHero[6]["group-affiliation"] !== "-") {connections += '<p class="m-0"><b>Afiliaciones</b>:</p><p>' + arrayHero[6]["group-affiliation"] + '</p>'};
    if(arrayHero[6]["relatives"] !== "-") {connections += '<p class="m-0"><b>Parientes</b>:</p><p>' + arrayHero[6]["relatives"] + '</p>'};
    if(biography == ""){accordionItems[0].style.display = "none"}else{$("#biographyHero .accordion-body").html(biography)};
    if(appearance == ""){accordionItems[1].style.display = "none"}else{$("#appearanceHero .accordion-body").html(appearance)};
    if(work == ""){accordionItems[2].style.display = "none"}else{$("#workHero .accordion-body").html(work)};
    if(connections == ""){accordionItems[3].style.display = "none"}else{$("#connectionsHero .accordion-body").html(connections)};
}

function explodePie(e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();

}
async function clickBuscar(){
    $("#cargando").css("display", "flex");
    let valorNameHeroeInput = $("#nameBusqueda").val();
    const superheroes = await consultarSuperHero(valorNameHeroeInput, idUserAPISuperHero);
    superheroes.forEach(superheroe => {
        let htmlLink = `<div class="mx-3 mb-3"><button class="btn btn-success btn-hero-${superheroe.id}">${superheroe.name}</button></div>`
        $("#eleccion .contiene-listado-querys").append(htmlLink);
        $(`.btn-hero-${superheroe.id}`).click(function(){
            let heroLoaded = Object.values(superheroe);
            prueba = heroLoaded;
            fillInfoHero(heroLoaded);
            $("#eleccion").css("display", "none");
            $(".resultados").css("display", "block");
        })
    })
    $("#cargando").css("display", "none");
    $("#eleccion").css("display", "block");
}

$("#buscar").click(function () {
    $("#eleccion").css("display", "none");
    $(".resultados").css("display", "none");
    $("#eleccion .contiene-listado-querys").html("");
    let accordionItems = document.querySelectorAll("accordion-item");
    accordionItems.forEach(accordionItem => {
        accordionItem.style.display = "block";
    })
    clickBuscar();
});