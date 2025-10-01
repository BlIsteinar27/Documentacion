<?php
namespace App\Core;

class Router
{
    private array $routes = [];

    public function add(string $method, string $pattern, callable $handler): void
    {
        $this->routes[] = compact('method', 'pattern', 'handler');
    }

    public function dispatch(string $method, string $uri)
    {
        foreach ($this->routes as $route) {
            if ($method === $route['method'] && preg_match($route['pattern'], $uri, $matches)) {
                return call_user_func_array($route['handler'], array_slice($matches, 1));
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada']);
    }
}
