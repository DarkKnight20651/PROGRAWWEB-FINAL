/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as NuestrosCursosImport } from './routes/nuestros-cursos'
import { Route as LoginImport } from './routes/login'
import { Route as InfoCatraImport } from './routes/info-catra'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthPerfilImport } from './routes/_auth/perfil'
import { Route as AuthDashboardImport } from './routes/_auth/dashboard'
import { Route as AuthUsuariosRouteImport } from './routes/_auth/usuarios/route'
import { Route as AuthClientesRouteImport } from './routes/_auth/clientes/route'
import { Route as AuthClienteRouteImport } from './routes/_auth/_cliente/route'
import { Route as AuthAdminRouteImport } from './routes/_auth/_admin/route'
import { Route as AuthUsuariosIndexImport } from './routes/_auth/usuarios/index'
import { Route as AuthClientesIndexImport } from './routes/_auth/clientes/index'
import { Route as AuthUsuariosCrearImport } from './routes/_auth/usuarios/crear'
import { Route as AuthClientesCrearImport } from './routes/_auth/clientes/crear'
import { Route as AuthClienteSubirDocumentosImport } from './routes/_auth/_cliente/subir-documentos'
import { Route as AuthClienteRealizarExamenImport } from './routes/_auth/_cliente/realizar-examen'
import { Route as AuthAdminSoloAdminImport } from './routes/_auth/_admin/solo-admin'
import { Route as AuthUsuariosEditarUserIdImport } from './routes/_auth/usuarios/editar.$userId'
import { Route as AuthClientesEditarCurpImport } from './routes/_auth/clientes/editar.$curp'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const NuestrosCursosRoute = NuestrosCursosImport.update({
  id: '/nuestros-cursos',
  path: '/nuestros-cursos',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const InfoCatraRoute = InfoCatraImport.update({
  id: '/info-catra',
  path: '/info-catra',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthPerfilRoute = AuthPerfilImport.update({
  id: '/perfil',
  path: '/perfil',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthDashboardRoute = AuthDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthUsuariosRouteRoute = AuthUsuariosRouteImport.update({
  id: '/usuarios',
  path: '/usuarios',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthClientesRouteRoute = AuthClientesRouteImport.update({
  id: '/clientes',
  path: '/clientes',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthClienteRouteRoute = AuthClienteRouteImport.update({
  id: '/_cliente',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthAdminRouteRoute = AuthAdminRouteImport.update({
  id: '/_admin',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthUsuariosIndexRoute = AuthUsuariosIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthUsuariosRouteRoute,
} as any)

const AuthClientesIndexRoute = AuthClientesIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthClientesRouteRoute,
} as any)

const AuthUsuariosCrearRoute = AuthUsuariosCrearImport.update({
  id: '/crear',
  path: '/crear',
  getParentRoute: () => AuthUsuariosRouteRoute,
} as any)

const AuthClientesCrearRoute = AuthClientesCrearImport.update({
  id: '/crear',
  path: '/crear',
  getParentRoute: () => AuthClientesRouteRoute,
} as any)

const AuthClienteSubirDocumentosRoute = AuthClienteSubirDocumentosImport.update(
  {
    id: '/subir-documentos',
    path: '/subir-documentos',
    getParentRoute: () => AuthClienteRouteRoute,
  } as any,
)

const AuthClienteRealizarExamenRoute = AuthClienteRealizarExamenImport.update({
  id: '/realizar-examen',
  path: '/realizar-examen',
  getParentRoute: () => AuthClienteRouteRoute,
} as any)

const AuthAdminSoloAdminRoute = AuthAdminSoloAdminImport.update({
  id: '/solo-admin',
  path: '/solo-admin',
  getParentRoute: () => AuthAdminRouteRoute,
} as any)

const AuthUsuariosEditarUserIdRoute = AuthUsuariosEditarUserIdImport.update({
  id: '/editar/$userId',
  path: '/editar/$userId',
  getParentRoute: () => AuthUsuariosRouteRoute,
} as any)

const AuthClientesEditarCurpRoute = AuthClientesEditarCurpImport.update({
  id: '/editar/$curp',
  path: '/editar/$curp',
  getParentRoute: () => AuthClientesRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/info-catra': {
      id: '/info-catra'
      path: '/info-catra'
      fullPath: '/info-catra'
      preLoaderRoute: typeof InfoCatraImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/nuestros-cursos': {
      id: '/nuestros-cursos'
      path: '/nuestros-cursos'
      fullPath: '/nuestros-cursos'
      preLoaderRoute: typeof NuestrosCursosImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_admin': {
      id: '/_auth/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthAdminRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/_cliente': {
      id: '/_auth/_cliente'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthClienteRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/clientes': {
      id: '/_auth/clientes'
      path: '/clientes'
      fullPath: '/clientes'
      preLoaderRoute: typeof AuthClientesRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/usuarios': {
      id: '/_auth/usuarios'
      path: '/usuarios'
      fullPath: '/usuarios'
      preLoaderRoute: typeof AuthUsuariosRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/perfil': {
      id: '/_auth/perfil'
      path: '/perfil'
      fullPath: '/perfil'
      preLoaderRoute: typeof AuthPerfilImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/_admin/solo-admin': {
      id: '/_auth/_admin/solo-admin'
      path: '/solo-admin'
      fullPath: '/solo-admin'
      preLoaderRoute: typeof AuthAdminSoloAdminImport
      parentRoute: typeof AuthAdminRouteImport
    }
    '/_auth/_cliente/realizar-examen': {
      id: '/_auth/_cliente/realizar-examen'
      path: '/realizar-examen'
      fullPath: '/realizar-examen'
      preLoaderRoute: typeof AuthClienteRealizarExamenImport
      parentRoute: typeof AuthClienteRouteImport
    }
    '/_auth/_cliente/subir-documentos': {
      id: '/_auth/_cliente/subir-documentos'
      path: '/subir-documentos'
      fullPath: '/subir-documentos'
      preLoaderRoute: typeof AuthClienteSubirDocumentosImport
      parentRoute: typeof AuthClienteRouteImport
    }
    '/_auth/clientes/crear': {
      id: '/_auth/clientes/crear'
      path: '/crear'
      fullPath: '/clientes/crear'
      preLoaderRoute: typeof AuthClientesCrearImport
      parentRoute: typeof AuthClientesRouteImport
    }
    '/_auth/usuarios/crear': {
      id: '/_auth/usuarios/crear'
      path: '/crear'
      fullPath: '/usuarios/crear'
      preLoaderRoute: typeof AuthUsuariosCrearImport
      parentRoute: typeof AuthUsuariosRouteImport
    }
    '/_auth/clientes/': {
      id: '/_auth/clientes/'
      path: '/'
      fullPath: '/clientes/'
      preLoaderRoute: typeof AuthClientesIndexImport
      parentRoute: typeof AuthClientesRouteImport
    }
    '/_auth/usuarios/': {
      id: '/_auth/usuarios/'
      path: '/'
      fullPath: '/usuarios/'
      preLoaderRoute: typeof AuthUsuariosIndexImport
      parentRoute: typeof AuthUsuariosRouteImport
    }
    '/_auth/clientes/editar/$curp': {
      id: '/_auth/clientes/editar/$curp'
      path: '/editar/$curp'
      fullPath: '/clientes/editar/$curp'
      preLoaderRoute: typeof AuthClientesEditarCurpImport
      parentRoute: typeof AuthClientesRouteImport
    }
    '/_auth/usuarios/editar/$userId': {
      id: '/_auth/usuarios/editar/$userId'
      path: '/editar/$userId'
      fullPath: '/usuarios/editar/$userId'
      preLoaderRoute: typeof AuthUsuariosEditarUserIdImport
      parentRoute: typeof AuthUsuariosRouteImport
    }
  }
}

// Create and export the route tree

interface AuthAdminRouteRouteChildren {
  AuthAdminSoloAdminRoute: typeof AuthAdminSoloAdminRoute
}

const AuthAdminRouteRouteChildren: AuthAdminRouteRouteChildren = {
  AuthAdminSoloAdminRoute: AuthAdminSoloAdminRoute,
}

const AuthAdminRouteRouteWithChildren = AuthAdminRouteRoute._addFileChildren(
  AuthAdminRouteRouteChildren,
)

interface AuthClienteRouteRouteChildren {
  AuthClienteRealizarExamenRoute: typeof AuthClienteRealizarExamenRoute
  AuthClienteSubirDocumentosRoute: typeof AuthClienteSubirDocumentosRoute
}

const AuthClienteRouteRouteChildren: AuthClienteRouteRouteChildren = {
  AuthClienteRealizarExamenRoute: AuthClienteRealizarExamenRoute,
  AuthClienteSubirDocumentosRoute: AuthClienteSubirDocumentosRoute,
}

const AuthClienteRouteRouteWithChildren =
  AuthClienteRouteRoute._addFileChildren(AuthClienteRouteRouteChildren)

interface AuthClientesRouteRouteChildren {
  AuthClientesCrearRoute: typeof AuthClientesCrearRoute
  AuthClientesIndexRoute: typeof AuthClientesIndexRoute
  AuthClientesEditarCurpRoute: typeof AuthClientesEditarCurpRoute
}

const AuthClientesRouteRouteChildren: AuthClientesRouteRouteChildren = {
  AuthClientesCrearRoute: AuthClientesCrearRoute,
  AuthClientesIndexRoute: AuthClientesIndexRoute,
  AuthClientesEditarCurpRoute: AuthClientesEditarCurpRoute,
}

const AuthClientesRouteRouteWithChildren =
  AuthClientesRouteRoute._addFileChildren(AuthClientesRouteRouteChildren)

interface AuthUsuariosRouteRouteChildren {
  AuthUsuariosCrearRoute: typeof AuthUsuariosCrearRoute
  AuthUsuariosIndexRoute: typeof AuthUsuariosIndexRoute
  AuthUsuariosEditarUserIdRoute: typeof AuthUsuariosEditarUserIdRoute
}

const AuthUsuariosRouteRouteChildren: AuthUsuariosRouteRouteChildren = {
  AuthUsuariosCrearRoute: AuthUsuariosCrearRoute,
  AuthUsuariosIndexRoute: AuthUsuariosIndexRoute,
  AuthUsuariosEditarUserIdRoute: AuthUsuariosEditarUserIdRoute,
}

const AuthUsuariosRouteRouteWithChildren =
  AuthUsuariosRouteRoute._addFileChildren(AuthUsuariosRouteRouteChildren)

interface AuthRouteRouteChildren {
  AuthAdminRouteRoute: typeof AuthAdminRouteRouteWithChildren
  AuthClienteRouteRoute: typeof AuthClienteRouteRouteWithChildren
  AuthClientesRouteRoute: typeof AuthClientesRouteRouteWithChildren
  AuthUsuariosRouteRoute: typeof AuthUsuariosRouteRouteWithChildren
  AuthDashboardRoute: typeof AuthDashboardRoute
  AuthPerfilRoute: typeof AuthPerfilRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthAdminRouteRoute: AuthAdminRouteRouteWithChildren,
  AuthClienteRouteRoute: AuthClienteRouteRouteWithChildren,
  AuthClientesRouteRoute: AuthClientesRouteRouteWithChildren,
  AuthUsuariosRouteRoute: AuthUsuariosRouteRouteWithChildren,
  AuthDashboardRoute: AuthDashboardRoute,
  AuthPerfilRoute: AuthPerfilRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthClienteRouteRouteWithChildren
  '/info-catra': typeof InfoCatraRoute
  '/login': typeof LoginRoute
  '/nuestros-cursos': typeof NuestrosCursosRoute
  '/signup': typeof SignupRoute
  '/clientes': typeof AuthClientesRouteRouteWithChildren
  '/usuarios': typeof AuthUsuariosRouteRouteWithChildren
  '/dashboard': typeof AuthDashboardRoute
  '/perfil': typeof AuthPerfilRoute
  '/solo-admin': typeof AuthAdminSoloAdminRoute
  '/realizar-examen': typeof AuthClienteRealizarExamenRoute
  '/subir-documentos': typeof AuthClienteSubirDocumentosRoute
  '/clientes/crear': typeof AuthClientesCrearRoute
  '/usuarios/crear': typeof AuthUsuariosCrearRoute
  '/clientes/': typeof AuthClientesIndexRoute
  '/usuarios/': typeof AuthUsuariosIndexRoute
  '/clientes/editar/$curp': typeof AuthClientesEditarCurpRoute
  '/usuarios/editar/$userId': typeof AuthUsuariosEditarUserIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthClienteRouteRouteWithChildren
  '/info-catra': typeof InfoCatraRoute
  '/login': typeof LoginRoute
  '/nuestros-cursos': typeof NuestrosCursosRoute
  '/signup': typeof SignupRoute
  '/dashboard': typeof AuthDashboardRoute
  '/perfil': typeof AuthPerfilRoute
  '/solo-admin': typeof AuthAdminSoloAdminRoute
  '/realizar-examen': typeof AuthClienteRealizarExamenRoute
  '/subir-documentos': typeof AuthClienteSubirDocumentosRoute
  '/clientes/crear': typeof AuthClientesCrearRoute
  '/usuarios/crear': typeof AuthUsuariosCrearRoute
  '/clientes': typeof AuthClientesIndexRoute
  '/usuarios': typeof AuthUsuariosIndexRoute
  '/clientes/editar/$curp': typeof AuthClientesEditarCurpRoute
  '/usuarios/editar/$userId': typeof AuthUsuariosEditarUserIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/info-catra': typeof InfoCatraRoute
  '/login': typeof LoginRoute
  '/nuestros-cursos': typeof NuestrosCursosRoute
  '/signup': typeof SignupRoute
  '/_auth/_admin': typeof AuthAdminRouteRouteWithChildren
  '/_auth/_cliente': typeof AuthClienteRouteRouteWithChildren
  '/_auth/clientes': typeof AuthClientesRouteRouteWithChildren
  '/_auth/usuarios': typeof AuthUsuariosRouteRouteWithChildren
  '/_auth/dashboard': typeof AuthDashboardRoute
  '/_auth/perfil': typeof AuthPerfilRoute
  '/_auth/_admin/solo-admin': typeof AuthAdminSoloAdminRoute
  '/_auth/_cliente/realizar-examen': typeof AuthClienteRealizarExamenRoute
  '/_auth/_cliente/subir-documentos': typeof AuthClienteSubirDocumentosRoute
  '/_auth/clientes/crear': typeof AuthClientesCrearRoute
  '/_auth/usuarios/crear': typeof AuthUsuariosCrearRoute
  '/_auth/clientes/': typeof AuthClientesIndexRoute
  '/_auth/usuarios/': typeof AuthUsuariosIndexRoute
  '/_auth/clientes/editar/$curp': typeof AuthClientesEditarCurpRoute
  '/_auth/usuarios/editar/$userId': typeof AuthUsuariosEditarUserIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/info-catra'
    | '/login'
    | '/nuestros-cursos'
    | '/signup'
    | '/clientes'
    | '/usuarios'
    | '/dashboard'
    | '/perfil'
    | '/solo-admin'
    | '/realizar-examen'
    | '/subir-documentos'
    | '/clientes/crear'
    | '/usuarios/crear'
    | '/clientes/'
    | '/usuarios/'
    | '/clientes/editar/$curp'
    | '/usuarios/editar/$userId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/info-catra'
    | '/login'
    | '/nuestros-cursos'
    | '/signup'
    | '/dashboard'
    | '/perfil'
    | '/solo-admin'
    | '/realizar-examen'
    | '/subir-documentos'
    | '/clientes/crear'
    | '/usuarios/crear'
    | '/clientes'
    | '/usuarios'
    | '/clientes/editar/$curp'
    | '/usuarios/editar/$userId'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/info-catra'
    | '/login'
    | '/nuestros-cursos'
    | '/signup'
    | '/_auth/_admin'
    | '/_auth/_cliente'
    | '/_auth/clientes'
    | '/_auth/usuarios'
    | '/_auth/dashboard'
    | '/_auth/perfil'
    | '/_auth/_admin/solo-admin'
    | '/_auth/_cliente/realizar-examen'
    | '/_auth/_cliente/subir-documentos'
    | '/_auth/clientes/crear'
    | '/_auth/usuarios/crear'
    | '/_auth/clientes/'
    | '/_auth/usuarios/'
    | '/_auth/clientes/editar/$curp'
    | '/_auth/usuarios/editar/$userId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  InfoCatraRoute: typeof InfoCatraRoute
  LoginRoute: typeof LoginRoute
  NuestrosCursosRoute: typeof NuestrosCursosRoute
  SignupRoute: typeof SignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  InfoCatraRoute: InfoCatraRoute,
  LoginRoute: LoginRoute,
  NuestrosCursosRoute: NuestrosCursosRoute,
  SignupRoute: SignupRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/_auth",
        "/info-catra",
        "/login",
        "/nuestros-cursos",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/_auth": {
      "filePath": "_auth/route.jsx",
      "children": [
        "/_auth/_admin",
        "/_auth/_cliente",
        "/_auth/clientes",
        "/_auth/usuarios",
        "/_auth/dashboard",
        "/_auth/perfil"
      ]
    },
    "/info-catra": {
      "filePath": "info-catra.jsx"
    },
    "/login": {
      "filePath": "login.jsx"
    },
    "/nuestros-cursos": {
      "filePath": "nuestros-cursos.jsx"
    },
    "/signup": {
      "filePath": "signup.jsx"
    },
    "/_auth/_admin": {
      "filePath": "_auth/_admin/route.jsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_admin/solo-admin"
      ]
    },
    "/_auth/_cliente": {
      "filePath": "_auth/_cliente/route.jsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_cliente/realizar-examen",
        "/_auth/_cliente/subir-documentos"
      ]
    },
    "/_auth/clientes": {
      "filePath": "_auth/clientes/route.jsx",
      "parent": "/_auth",
      "children": [
        "/_auth/clientes/crear",
        "/_auth/clientes/",
        "/_auth/clientes/editar/$curp"
      ]
    },
    "/_auth/usuarios": {
      "filePath": "_auth/usuarios/route.jsx",
      "parent": "/_auth",
      "children": [
        "/_auth/usuarios/crear",
        "/_auth/usuarios/",
        "/_auth/usuarios/editar/$userId"
      ]
    },
    "/_auth/dashboard": {
      "filePath": "_auth/dashboard.jsx",
      "parent": "/_auth"
    },
    "/_auth/perfil": {
      "filePath": "_auth/perfil.jsx",
      "parent": "/_auth"
    },
    "/_auth/_admin/solo-admin": {
      "filePath": "_auth/_admin/solo-admin.jsx",
      "parent": "/_auth/_admin"
    },
    "/_auth/_cliente/realizar-examen": {
      "filePath": "_auth/_cliente/realizar-examen.jsx",
      "parent": "/_auth/_cliente"
    },
    "/_auth/_cliente/subir-documentos": {
      "filePath": "_auth/_cliente/subir-documentos.jsx",
      "parent": "/_auth/_cliente"
    },
    "/_auth/clientes/crear": {
      "filePath": "_auth/clientes/crear.jsx",
      "parent": "/_auth/clientes"
    },
    "/_auth/usuarios/crear": {
      "filePath": "_auth/usuarios/crear.jsx",
      "parent": "/_auth/usuarios"
    },
    "/_auth/clientes/": {
      "filePath": "_auth/clientes/index.jsx",
      "parent": "/_auth/clientes"
    },
    "/_auth/usuarios/": {
      "filePath": "_auth/usuarios/index.jsx",
      "parent": "/_auth/usuarios"
    },
    "/_auth/clientes/editar/$curp": {
      "filePath": "_auth/clientes/editar.$curp.jsx",
      "parent": "/_auth/clientes"
    },
    "/_auth/usuarios/editar/$userId": {
      "filePath": "_auth/usuarios/editar.$userId.jsx",
      "parent": "/_auth/usuarios"
    }
  }
}
ROUTE_MANIFEST_END */
