<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    public function view(User $user, Document $documento): Response
    {
        return $user->id === $documento->user_id || in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('No tienes los permisos o no eres dueño de este documento.');
    }

    public function upload(User $user): Response
    {
        return Response::allow();
        return $user->role === 'cliente'
            ? Response::allow()
            : Response::deny('Solo los clientes pueden subir documentación.');
    }

    /* public function updateEstado(User $user): Response
    {
        return in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('Solo administradores y secretarias pueden actualizar el estado de la documentación.');
    } */
}
