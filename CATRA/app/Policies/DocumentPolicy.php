<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class DocumentPolicy
{
    public function view(User $user, Document $documento): Response
    {
        return $user->id === $documento->user_id || in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('No eres dueño de este documento.');
    }

    public function upload(User $user): Response
    {
        Log::info("información de upload");
        return $user->role === 'cliente'
            ? Response::allow()
            : Response::deny('Solo los clientes pueden subir documentación.');
    }

    public function updateEstado(User $user): Response
    {
        return in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('Solo administradores y secretarias pueden actualizar el estado de la documentación.');
    }
}
