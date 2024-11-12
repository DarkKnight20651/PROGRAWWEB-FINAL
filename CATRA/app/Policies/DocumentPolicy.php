<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    public function view(User $user, Document $documento)
    {
        return $user->id === ($documento->user_id || in_array($user->rol, ['admin', 'secre']))
            ? Response::allow()
            : Response::deny('No eres dueño de este documento.');
    }

    public function upload(User $user)
    {
        return $user->rol === "cliente"
            ? Response::allow()
            : Response::deny('Solo los clientes pueden subir documentación.');
    }

    public function updateEstado(User $user)
    {
        return in_array($user->rol, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('Solo administradores y secretarias pueden actualizar el estado de la documentación.');
    }
}
