
const idUserAPISuperHero = "3582460101979492";
//let prueba = [];

const consultarSuperHero = (idSuperHero, accessToken) => {
    return new Promise((resolve,rejected) => {
        $.ajax({
            type: "GET",
            url: "https://www.superheroapi.com/api.php/" + accessToken + "/" + idSuperHero,
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                const consultaSuperheroe = Object.values(data);
                consultaSuperheroe.splice(0,2);
                const powerstatsHero = consultaSuperheroe[1];
                //prueba = powerstatsHero;
                crearGraficoPoderes(powerstatsHero);
                //console.log(consultaSuperheroe);
                fillInfoHero(consultaSuperheroe);
                resolve(consultaSuperheroe);
            },
            error: function (data) {
                $("#errorConsulta").html("No exixte un Superheroe con ese ID")
                rejected(data);
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
    $("#nombreSuperHero").html(arrayHero[0]);
    $("#imgSuperHero").attr("src", arrayHero[6].url);
    let accordionItems = document.getElementsByClassName("accordion-item");
    let biography = "";
    let appearance  = "";
    let work  = "";
    let connections  = "";
    if(arrayHero[2]["full-name"] !== "") {biography += '<p class="m-0"><b>Nombre Completo</b>:</p><p>' + arrayHero[2]["full-name"] + '</p>'};
    if(arrayHero[2]["alter-egos"] !== "No alter egos found.") {biography += '<p class="m-0"><b>Alter Egos</b>:</p><p>' + arrayHero[2]["alter-egos"] + '</p>'};
    if(arrayHero[2]["aliases"].length !== 0) {biography += '<p class="m-0"><b>Alias</b>:</p><p>' + arrayHero[2]["aliases"].join(", ") + '</p>'};
    if(arrayHero[2]["place-of-birth"] !== "-") {biography += '<p class="m-0"><b>Lugar de Nacimiento</b>:</p><p>' + arrayHero[2]["place-of-birth"] + '</p>'};
    if(arrayHero[2]["first-appearance"] !== "") {biography += '<p class="m-0"><b>Primera Aparición</b>:</p><p>' + arrayHero[2]["first-appearance"] + '</p>'};
    if(arrayHero[2]["publisher"] !== "") {biography += '<p class="m-0"><b>Editorial</b>:</p><p>' + arrayHero[2]["publisher"] + '</p>'};
    if(arrayHero[2]["alignment"] !== "") {biography += '<p class="m-0"><b>Rol</b>:</p><p class="text-capitalize">' + arrayHero[2]["alignment"] + '</p>'};
    if(arrayHero[3]["gender"] !== "") {appearance += '<p class="m-0"><b>Género</b>:</p><p>' + arrayHero[3]["gender"] + '</p>'};
    if(arrayHero[3]["race"] !== "") {appearance += '<p class="m-0"><b>Raza</b>:</p><p>' + arrayHero[3]["race"] + '</p>'};
    if(arrayHero[3]["height"][1] !== "0 cm") {appearance += '<p class="m-0"><b>Estatura</b>:</p><p class="text-capitalize">' + arrayHero[3]["height"][1] + '</p>'};
    if(arrayHero[3]["weight"][1] !== "0 kg") {appearance += '<p class="m-0"><b>Peso</b>:</p><p class="text-capitalize">' + arrayHero[3]["weight"][1] + '</p>'};
    if(arrayHero[3]["eye-color"] !== "-") {appearance += '<p class="m-0"><b>Color de Ojos</b>:</p><p class="text-capitalize">' + arrayHero[3]["eye-color"] + '</p>'};
    if(arrayHero[3]["hair-color"] !== "-") {appearance += '<p class="m-0"><b>Color de Pelo</b>:</p><p class="text-capitalize">' + arrayHero[3]["hair-color"] + '</p>'};
    if(arrayHero[4]["occupation"] !== "-") {work += '<p class="m-0"><b>Ocupación</b>:</p><p class="text-capitalize">' + arrayHero[4]["occupation"] + '</p>'};
    if(arrayHero[4]["base"] !== "-") {work += '<p class="m-0"><b>Base</b>:</p><p class="text-capitalize">' + arrayHero[4]["base"] + '</p>'};
    if(arrayHero[5]["group-affiliation"] !== "-") {connections += '<p class="m-0"><b>Afiliaciones</b>:</p><p>' + arrayHero[5]["group-affiliation"] + '</p>'};
    if(arrayHero[5]["relatives"] !== "-") {connections += '<p class="m-0"><b>Parientes</b>:</p><p>' + arrayHero[5]["relatives"] + '</p>'};
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
    let valorIDHeroeInput = $("#idSuperhero").val();
    await consultarSuperHero(valorIDHeroeInput, idUserAPISuperHero);
    $("#cargando").css("display", "none");
    $(".resultados").css("display", "block");
}

$("#buscar").click(function () {
    $(".resultados").css("display", "none");
    let accordionItems = document.querySelectorAll("accordion-item");
    accordionItems.forEach(accordionItem => {
        accordionItem.style.display = "block";
    })
    clickBuscar();
});