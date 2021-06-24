<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encuentra tu Superheroe por ID</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/base.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="assets/images/sh2.jpg" width="30" height="24" class="d-inline-block align-text-top">
                    Encuentra tu Superheroe
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="buscar-nombre.php">Por Nombre</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Por ID</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <section>
        <div class="container">
            <img src="assets/images/sh1.jpg" class="img-fluid d-block mx-auto">
            <h1>Encuentra tu SuperHero</h1>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="idSuperhero" placeholder="Ingresa el ID de tu superheroe">
                <label for="floatingInput">Ingresa el ID de tu superheroe</label>
            </div>
            <button id="buscar" class="btn btn-primary" role="button">Buscar</button>
            <span class="badge bg-danger" id="errorConsulta"></span>
        </div>
    </section>

    <section class="resultados mb-5">
        <h2 class="text-center">SuperHéroe encontrado</h2>
        <div class="container">
            <div class="row no-gutters align-items-center">
                <div class="col-lg-8 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row no-gutters">
                                <div class="col-6">
                                    <img id="imgSuperHero" class="img-fluid">
                                </div>
                                <div class="col-6">
                                    <h4>Nombre: <span id="nombreSuperHero"></span></h4>
                                    <div class="accordion" id="accordionHero">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="referencia01">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#biographyHero" aria-expanded="true" aria-controls="biographyHero">
                                                    Biografía
                                                </button>
                                            </h2>
                                            <div id="biographyHero" class="accordion-collapse collapse show" aria-labelledby="referencia01" data-bs-parent="#accordionHero">
                                                <div class="accordion-body"></div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="referencia02">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#appearanceHero" aria-expanded="false" aria-controls="appearanceHero">
                                                    Apariencia
                                                </button>
                                            </h2>
                                            <div id="appearanceHero" class="accordion-collapse collapse" aria-labelledby="referencia02" data-bs-parent="#accordionHero">
                                                <div class="accordion-body"></div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="referencia03">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#workHero" aria-expanded="false" aria-controls="workHero">
                                                    Trabajo
                                                </button>
                                            </h2>
                                            <div id="workHero" class="accordion-collapse collapse" aria-labelledby="referencia03" data-bs-parent="#accordionHero">
                                                <div class="accordion-body"></div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="referencia04">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#connectionsHero" aria-expanded="false" aria-controls="connectionsHero">
                                                    Conexiones
                                                </button>
                                            </h2>
                                            <div id="connectionsHero" class="accordion-collapse collapse" aria-labelledby="referencia04" data-bs-parent="#accordionHero">
                                                <div class="accordion-body"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                </div>
            </div>
        </div>
    </section>

    <section id="cargando">
        <div class="contenedor">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" stroke-width="2">
                    <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
                    <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
                </circle>
                <circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" stroke-width="2">
                    <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                    <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                </circle>
                <!-- [ldio] generated by https://loading.io/ -->
            </svg>
            <h5 class="text-center">Buscando tu superheroe</h5>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
    <script src="assets/js/custom-id.js"></script>
</body>

</html>