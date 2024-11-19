<?php

namespace App\Policies;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ClientePolicy
{
    public function viewAny(User $user)
    {
        return $user->id === in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('No puedes ver la lista de usuarios.');
    }

    public function view(User $user, Cliente $cliente)
    {
        return $user->id === $cliente->user_id || in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('No puedes ver información de otro usuario.');
    }

    public function update(User $user, Cliente $cliente)
    {
        return $user->id === $cliente->user_id || in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('No puedes modificar la información de otro.');
    }

    public function delete(User $user)
    {
        return in_array($user->role, ['admin', 'secre'])
            ? Response::allow()
            : Response::deny('No puedes eliminar usuarios.');
    }
}
