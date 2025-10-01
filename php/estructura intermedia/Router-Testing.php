<?php
// Router mínimo experimental

class Router {
    private array $routes = [];

    // Agregar una ruta
    public function add(string $method, string $path, callable $handler): void {
        $this->routes[] = [
            'method'  => strtoupper($method),
            'path'    => $path,
            'handler' => $handler
        ];
    }

    // Ejecutar la ruta
    public function dispatch(string $method, string $uri): void {
        foreach ($this->routes as $route) {
            if ($route['method'] === strtoupper($method) && $route['path'] === $uri) {
                call_user_func($route['handler']);
                return;
            }
        }
        // Si no encontró coincidencia
        http_response_code(404);
        echo "Ruta no encontrada";
    }
}

// -------------------
// PRUEBA DEL ROUTER
// -------------------

$router = new Router();

// Definir rutas
$router->add('GET', '/hola', function() {
    echo "👋 Hola mundo desde el router!";
});

$router->add('GET', '/adios', function() {
    echo "👋 Adiós, hasta luego!";
});

// Simular la petición actual
$method = $_SERVER['REQUEST_METHOD'];
$uri    = strtok($_SERVER['REQUEST_URI'], '?'); 

// ✅ cortar hasta después del router-test.php
$base = '/formulario/backend/router-test.php';
if (strpos($uri, $base) === 0) {
    $uri = substr($uri, strlen($base));
}

// si el resultado queda vacío, lo forzamos a "/"
if ($uri === '') {
    $uri = '/';
}


$router->dispatch($method, $uri);
