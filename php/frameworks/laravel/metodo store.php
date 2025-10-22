public function store(Request $request)
    {
        // Validación
        $validator = Validator::make($request->all(), [
            'id_evento' => 'required|exists:eventos,id_evento',
            'nombre' => 'required|string|max:100',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error al crear tipo de entrada',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        // Crear tipo de entrada
        $tipoEntrada = TipoEntrada::create([
            'id_evento' => $request->id_evento,
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion
        ]);

        if (!$tipoEntrada) {
            return response()->json([
                'message' => 'Error interno al crear tipo de entrada',
                'data' => false,
                'status' => 500
            ], 500);
        }

        // Cargar relación antes de devolver respuesta
        $tipoEntrada->load('evento');

        return response()->json([
            'message' => 'Tipo de entrada creado exitosamente',
            'data' => $tipoEntrada,
            'status' => 201
        ], 201);
    }