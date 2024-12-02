<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Examens_asignado;
use App\Models\Respuesta;
use App\Models\RespuestaExamen;
use Illuminate\Support\Carbon;
class RevisaryTerminar extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'RevisaryTerminar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Este metodo revisa los examenes y termina aquellos que se excedieron en tiempo';

    /**
     * Execute the console command.
     */
    public function handle()
{
    $examenes = Examens_asignado::where('estado', 'realizando')->get();
    if ($examenes->isEmpty()) {
        $this->info('No hay examenes en estado "realizando".');
        return;
    }

    foreach ($examenes as $examen) {
        if ($examen->hora_limite <= Carbon::now()) {
            $count = 0;
            $correctas = 0;
            $calif = 0; // Initialize calif

            $examenId = $examen->id;
            $respuestas = RespuestaExamen::where('id_examen_asignado', $examenId)->get();

            foreach ($respuestas as $respuesta) {
                $count++;
                $respuestaesp = Respuesta::find($respuesta->id_respuesta);
                if ($respuestaesp && $respuestaesp->is_correct == 1) {
                    $correctas++;
                }
            }

            if ($count > 0) {
                $calif = ($correctas / $count) * 100;
            }

            $examen->estado = 'terminado';
            $examen->calificacion = $calif;
            $examen->hora_fin = Carbon::now();
            $examen->save();
        }
    }

    $this->info('Examenes terminados con éxito.');
}

}
