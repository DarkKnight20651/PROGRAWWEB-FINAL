## subsistema adaptado para la materia de Programacion web 
- Pacheco Infanzon Daniel
- Santos Vengas Victor Adrian

# CRATRA-SYSTEM
Este repositorio esta enfocado al desarrollo de un sistema web para la empresa de tramites de licencias federales en estado de oaxaca de juarez, oaaxca




# Tecnologias utilizadas
  En la metodologia de desarrollo se implementaros dos frameworks diferentes, laravel que es un servicio para desarrollar apps y servicios web en base a php
  y react que es una biblioteca de javascript de codigo abierto con el objetivo de facilitar el desarrollo de apss en una sola pagina
![image](https://github.com/user-attachments/assets/16baec6e-ca2b-46c4-b197-be7509654320)


# Funicionalidaddes del proyceto 

- Inicio de sesión
- Perfiles con imagenes
- Creacion de examenes
- Eliminacion de examnes
- Creacion de preguntas en examen

  # Roles
  - Administtrador
  - Secretaria 
  - Cliente 
# Modelos del proyecto

Al utilizar laravel en nuestro proyecto utilizaremos MVC, es decir modelo vista controlador, en este caso estos son nuestros modelos

![image](https://github.com/user-attachments/assets/72da2ef3-aa12-465e-b687-74d680bb3b46)

Los mas relevantes para este proyecto serán 

![image](https://github.com/user-attachments/assets/6105642c-4b76-42dc-a532-37a25b71db3c)
![image](https://github.com/user-attachments/assets/517ceeb3-f099-44be-8463-e0b8851f90c2)
![image](https://github.com/user-attachments/assets/7bbdf661-582c-4101-8687-b577022fd3a9)
![image](https://github.com/user-attachments/assets/b34655a6-cfb2-4004-bcc8-424ef38675f6)

# Controladores del proyecto
Nuestros controladores principales serán los siguientes:
-UserController
-ExamenController
-PreguntaController
-RespuestaController

Algunos de los métodos más importantes son los siguientes

-Login:
El usuario ingresa sus credenciales y el sistema lo busca en la bd, en caso de existir permite el acceso, en caso contrario manda un error

-Logout:
Se elimina el token del usuario y se cierra la sesion

-Store:
Se usa para crear nuevos elementos de algún modelo

-Update: actualiza elementos de algún modelo

-destroy: elimina elementos de algún modelo

-Show: devuelve la información de algún modelo

-notas:
El proceso de almacenar imagenes hace que los métodos y empaquetado de información deba ser modificado ya que Php por defecto no hace un parseo de las imagenes enviadas en los formularios, además es necesario habilitar el link del storage de laravel para poder acceder a las imagenes.
![image](https://github.com/user-attachments/assets/a65f8525-dbf9-445d-91c0-87638b20031b)
![image](https://github.com/user-attachments/assets/b5126acc-1ace-4cd4-b43f-4f2a27927b21)
![image](https://github.com/user-attachments/assets/9308c745-4667-4705-b6eb-691855dea591)
![image](https://github.com/user-attachments/assets/039fcd4c-9887-4daa-a20c-256b3ba324c4)
![image](https://github.com/user-attachments/assets/46333ae7-5bf6-4367-8c40-6d85d7ee37f0)

![image](https://github.com/user-attachments/assets/d79cfdb7-ad2b-4bfa-87c4-da7bd7c7fbbb)
![image](https://github.com/user-attachments/assets/b918dc8d-38cb-40fe-bb4d-e5aede640e1c)

![image](https://github.com/user-attachments/assets/c68b1bbd-f8cd-4e13-a846-69cc968ff2d2)

![image](https://github.com/user-attachments/assets/2df6b22c-8a03-4295-83a5-bbc21d7f9da7)

![image](https://github.com/user-attachments/assets/7ae15d71-5aa3-490c-b63d-b6431e53f35e)

![image](https://github.com/user-attachments/assets/409f6882-9d12-43cf-9444-f88de24ca936)

Cada uno de los modelos tiene funciones que nos permiten administrarlas, es decir, cada modelo tiene un Create, Update, Show y Delete, para manejar estos métodos desde el frontend creamos un api por medio del cual comunicamos nuestro frontend con nuestro backend



![image](https://github.com/user-attachments/assets/95fc8687-b871-4a0a-8e52-8c08220e5a41)

![image](https://github.com/user-attachments/assets/c1bf3038-71d3-4fb5-a7b9-df231ff5ae06)

#Vista

En el frontend utilizamos react, en este caso para el login implementamos un formulario en el que se recibirá la información de acceso del usuario y se enviará al backend por medio del api

![image](https://github.com/user-attachments/assets/2a2dbf6f-f78d-4cc9-beb6-3ffc580fcea5)

Al recibir la respuesta apropiada el sistema nos permitirá acceder

de lo contrario se mostrará un mensaje de error


![image](https://github.com/user-attachments/assets/bc540145-6b7a-4c33-a1d7-b75cf927f307)


![image](https://github.com/user-attachments/assets/a8ca0b1f-5e2c-4d93-b956-cc6b891f6931)

![image](https://github.com/user-attachments/assets/4f07234b-a667-4e3c-918c-6431947c04a5)


![image](https://github.com/user-attachments/assets/040be61d-f92a-438e-92d7-6b4a90b0ae88)

Para administrar los examenes de la plataforma se implemento un modulo en el cual se pueden visualizar, editar, agregar o eliminar los examenes

![image](https://github.com/user-attachments/assets/e89c7138-e358-4808-86e1-29ac92fac862)

![image](https://github.com/user-attachments/assets/ddede237-226f-4293-a238-1d01883d1047)
![image](https://github.com/user-attachments/assets/85e65f12-2741-4953-8ced-ea90f112d7de)

Para cada examen corresponde un grupo de preguntas, estas pueden administrarse de la misma manera
![image](https://github.com/user-attachments/assets/7614428c-5561-45da-82a2-54d33811da34)
![image](https://github.com/user-attachments/assets/225bc9b5-e9db-47b7-b23e-77cd91264872)
![image](https://github.com/user-attachments/assets/5fcd857e-9ff3-4fcd-a4e3-d5837e29d739)

De la misma manera a cada pregunta le corresponden un grupo de respuestas que se administran de la misma manera

![image](https://github.com/user-attachments/assets/32f2f00d-1c87-4b90-8893-4f9cef77202e)
![image](https://github.com/user-attachments/assets/d2083f9f-103f-4880-8576-4f5449ba0be2)
![image](https://github.com/user-attachments/assets/47755283-d3a1-4da1-8010-0ad33e3dc079)


Para utilizar nuestra API de manera más sencilla implementamos Axios lo cual nos permite comunicarnos sencillamente optimizando bastante el código

![image](https://github.com/user-attachments/assets/0e1f9fc0-60f1-4602-bc14-cded842bfa13)

Para implementar rutas protegidas usamos Tanstack Router la cual es una libreria que nos ayuda y simplifica mucho el proceso
Ya que las rutas se manejan como archivos y se crean automaticamente de la siguiente manera
![image](https://github.com/user-attachments/assets/99aa6bdb-fce3-476b-8fd6-46cf8a54ec57)
![image](https://github.com/user-attachments/assets/9a603806-d6c6-4f72-abcb-638c0a393994)

De manera general, el proceso es el siguiente

El usuario realiza una consulta en react desde su navegador, react envia una peticion al backend usando Axios que se comunica con el API, el backend en este caso laravel procesa la peticion y devuelve una respuesta que es recibida por Axios y procesada por React.

















