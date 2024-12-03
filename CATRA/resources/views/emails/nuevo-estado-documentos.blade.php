<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualización del estado de tus documentos</title>
    <style>
        * {
            box-sizing: border-box;
        }

        /* Estilos generales */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
        }

        .content {
            margin-top: 20px;
        }

        .document-section {
            margin-bottom: 15px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #fafafa;
        }

        .document-header {
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 10px;
            color: #333;
        }

        .document-status {
            font-size: 1.1em;
            font-weight: bold;
            padding: 5px;
            color: white;
            border-radius: 3px;
            text-align: center;
        }

        .status-pendiente {
            background-color: #ff9800;
        }

        .status-aprobado {
            background-color: #4CAF50;
        }

        .status-rechazado {
            background-color: #f44336;
        }

        .comments {
            font-style: italic;
            color: #555;
            margin-top: 10px;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }

        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }

        .separator {
            border-top: 2px solid #ddd;
            margin: 20px 0;
        }

        /* Media Queries para pantallas pequeñas (teléfonos y tabletas) */
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }

            .document-header {
                font-size: 1em;
            }

            .document-status {
                font-size: 1em;
                padding: 4px;
            }

            .footer {
                font-size: 0.8em;
            }
        }

        /* Media Queries para pantallas muy pequeñas (teléfonos más pequeños) */
        @media (max-width: 400px) {
            h2 {
                font-size: 1.5em;
            }

            .container {
                padding: 10px;
            }

            .document-section {
                padding: 10px;
            }

            .document-header {
                font-size: 1em;
            }

            .document-status {
                font-size: 0.9em;
                padding: 3px;
            }

            .comments {
                font-size: 0.9em;
            }

            .footer {
                font-size: 0.7em;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>¡Hola, {{ $name }}!</h2>
        <p>Te notificamos que el estado de los siguientes documentos ha sido actualizado. A continuación, te mostramos el estado actual de cada uno:</p>

        <div class="content">
            @foreach ($estadoDocumentos as $tipo => $documento)
            <div class="document-section">
                <div class="document-header">{{ ucfirst(str_replace('_', ' ', $tipo)) }}</div>

                <!-- Estado del documento -->
                <div class="document-status @if($documento['estado'] == 'pendiente') status-pendiente
                                                 @elseif($documento['estado'] == 'aprobado') status-aprobado
                                                 @else status-rechazado
                                                 @endif">
                    {{ ucfirst($documento['estado']) }}
                </div>

                <!-- Comentarios -->
                @if (!empty($documento['comentarios']))
                <div class="comments">
                    Comentarios: {{ $documento['comentarios'] }}
                </div>
                @else
                <div class="comments">
                    No hay comentarios adicionales.
                </div>
                @endif
            </div>

            <!-- Separador entre documentos -->
            <div class="separator"></div>
            @endforeach
        </div>


        <p>Si tienes alguna duda o necesitas más información, no dudes en contactarnos. Estamos a tu disposición para cualquier aclaración.</p>

        <div class="footer">
            <p>Saludos cordiales,</p>
            <p>El equipo de CATRA</p>
        </div>
    </div>
</body>

</html>