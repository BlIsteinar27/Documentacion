<?php
// config/db.php
namespace App\Config;

use PDO;
use PDOException;

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = '127.0.0.1';
            $port = 3306;
            $db   = 'demo_crud';
            $user = 'root';
            $pass = ''; // laragon default often empty; ajusta si tienes contraseña
            $charset = 'utf8mb4';

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // lanza excepciones
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // arrays asociativos
                PDO::ATTR_EMULATE_PREPARES   => false,                  // usar prepares nativos
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // En un entorno real no muestres detalles, aquí sí para dev.
                throw new \RuntimeException('DB connection failed: ' . $e->getMessage());
            }
        }
        return self::$instance;
    }
}
