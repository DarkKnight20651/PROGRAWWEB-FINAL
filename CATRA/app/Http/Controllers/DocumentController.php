<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function getDocumentDetails(Request $request)
    {
        $user = $request->user();

        $tiposDocumentos = ['ine', 'comprobante_domicilio', 'acta_nacimiento', 'curp'];
        $documentosDetalles = [];

        foreach ($tiposDocumentos as $tipo) {
            $documento = Document::where('user_id', $user->id)
                ->where('tipo', $tipo)
                ->first();

            if ($documento) {
                $documentosDetalles[$tipo] = [
                    'id' => $documento->id,
                    'subido' => true,
                    'estado' => $documento->estado,
                    'updated_at' => $documento->updated_at
                ];
            } else {
                $documentosDetalles[$tipo] = [
                    'subido' => false,
                ];
            }
        }

        return response()->json(['documentos' => $documentosDetalles], 200);
    }


    public function store(Request $request)
    {
        $response = Gate::inspect('upload', Document::class);

        if (!$response->allowed()) {
            return response()->json(["error" => "No autorizado para subir documentos"], 403);
        }

        $user = $request->user();

        $documentosExistentes = Document::where('user_id', $user->id)
            ->get()
            ->keyBy('tipo');

        if (
            $documentosExistentes->count() === 4 &&
            $documentosExistentes->every(fn($doc) => $doc->estado === 'aprobado')
        ) {
            return response()->json(['mensaje' => 'Todos los documentos ya han sido aprobados.'], 200);
        }

        $rules = [];
        $documentosAIngresar = [];

        foreach (['ine', 'comprobante_domicilio', 'acta_nacimiento', 'curp'] as $tipo) {
            $documentoExistente = $documentosExistentes[$tipo] ?? null;
            
            if(!$documentoExistente || $documentoExistente->estado !== 'aprobado') {
                $rules[$tipo] = 'file|mimes:pdf,jpg,jpeg,png,webp|max:5000';
                
                if(!$documentoExistente || $documentoExistente->estado === 'rechazado')
                    $rules[$tipo] = 'required|' . $rules[$tipo];

                $documentosAIngresar[$tipo] = $request->file($tipo);
            }
        }

        $request->validate($rules);

        try {
            DB::beginTransaction();
            foreach ($documentosAIngresar as $tipo => $archivo) {
                $documentoExistenteBd = $documentosExistentes[$tipo] ?? null;
                $extension = $archivo->getClientOriginalExtension();
                $mimeType = $archivo->getMimeType();

                if ($documentoExistenteBd) {
                    Storage::disk('private')->delete($documentoExistenteBd->ruta);
                }

                $path = $archivo->storeAs(
                    "documentos_clientes/{$user->id}",
                    "{$tipo}.{$extension}",
                    'private'
                );

                if ($documentoExistenteBd) {
                    $documentoExistenteBd->update([
                        'ruta' => $path,
                        'estado' => 'pendiente',
                        'mime_type' => $mimeType
                    ]);
                } else {
                    Document::create([
                        'user_id' => $user->id,
                        'ruta' => $path,
                        'tipo' => $tipo,
                        'estado' => 'pendiente',
                        'mime_type' => $mimeType
                    ]);
                }
            }

            DB::commit();
            return response()->json(['message' => 'Documentos subidos con éxito'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'mensaje' => 'Ocurrió un error al subir los documentos',
                'objeto_error' => $e
            ], 500);
        }
    }

    public function show(Request $request, $id)
    {
        $documento = Document::find($id);

        $mustDownload = $request->query('download') ? true : false;

        if (!$documento) {
            return response()->json(['error' => 'Documento no encontrado'], 404);
        }

        if (!Gate::allows('view', $documento)) {
            return response()->json(['error' => 'No autorizado para acceder a este documento'], 403);
        }

        $rutaArchivo = $documento->ruta;

        if (!Storage::disk('private')->exists($rutaArchivo)) {
            return response()->json(['error' => 'El archivo no existe en el servidor'], 404);
        }

        $mimeType = $documento->mime_type ?? 'application/octet-stream';

        if($mustDownload) {
            return response()->download(
                Storage::disk('private')->path($rutaArchivo),
                basename($rutaArchivo),
                [
                    'Content-Type' => $mimeType,
                    'Content-Disposition' => 'attachment; filename="' . basename($rutaArchivo) . '"',
                ]
            );
        }

        return response()->file(
            Storage::disk('private')->path($rutaArchivo),
            [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'inline; filename="' . basename($rutaArchivo) . '"',
            ]
        );
    }
}
