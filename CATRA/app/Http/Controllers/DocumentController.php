<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class DocumentController extends Controller
{

    public function getDocumentDetails(Request $request)
    {
        $user = $request->user();

        $tiposDocumentos = ['ine', 'comprobante_domicilio', 'curp'];
        $documentosDetalles = [];

        foreach ($tiposDocumentos as $tipo) {
            $documento = Document::where('user_id', $user->id)
                ->where('tipo', $tipo)
                ->first();

            if ($documento) {
                $documentosDetalles[$tipo] = [
                    'subido' => true,
                    'estado' => $documento->estado,
                ];
            } else {
                $documentosDetalles[$tipo] = [
                    'subido' => false,
                    'estado' => null,
                ];
            }
        }

        return response()->json(['documentos' => $documentosDetalles], 200);
    }


    public function store(Request $request)
    {
        Gate::authorize('upload');

        $request->validate([
            'ine' => 'nullable|file|mimes:pdf|max:5000',
            'comprobante_domicilio' => 'nullable|file|mimes:pdf|max:5000',
            'curp' => 'nullable|file|mimes:pdf|max:5000',
        ]);

        $user = $request->user();
        $folder = "documentos_usuarios/{$user->id}";

        DB::beginTransaction();

        try {
            $documentos = [
                'ine' => $request->file('ine'),
                'comprobante_domicilio' => $request->file('comprobante_domicilio'),
                'curp' => $request->file('curp')
            ];

            foreach ($documentos as $tipo => $archivo) {
                if ($archivo) {
                    $extension = $archivo->getClientOriginalExtension();
                    $path = "{$folder}/{$tipo}.{$extension}";

                    $archivo->storeAs($folder, "{$tipo}.{$extension}", 'private');

                    $documentoExistente = Document::where('user_id', $user->id)->where('tipo', $tipo)->first();

                    if ($documentoExistente) {
                        $documentoExistente->update([
                            'estatus' => 'pendiente',
                        ]);
                    } else {
                        Document::create([
                            'user_id' => $user->id,
                            'ruta' => $path,
                            'tipo' => $tipo,
                            'estatus' => 'pendiente',
                        ]);
                    }
                }
            }

            DB::commit();
            return response()->json(['message' => 'Documentos subidos con éxito'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Ocurrió un error al subir los documentos'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['error' => 'ID no válido'], 400);
        }

        $documento = Document::findOrFail($id);

        Gate::authorize('view', $documento);

        return response()->file(storage_path("app/private/{$documento->ruta}"));
    }

    public function update(Request $request, $id)
    {
        if (!is_numeric($id)) {
            return response()->json(['error' => 'ID no válido'], 400);
        }

        Gate::authorize('updateEstado');

        $documento = Document::findOrFail($id);

        $validated = $request->validate([
            'estado' => 'required|in:pendiente,aprobado,rechazado',
        ]);

        $documento->estado = $validated['estado'];
        $documento->save();

        return response()->json(['message' => 'Se actualizó el estado del documento con éxito'], 201);
    }
}