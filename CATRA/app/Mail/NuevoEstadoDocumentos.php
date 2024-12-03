<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NuevoEstadoDocumentos extends Mailable
{
    use Queueable, SerializesModels;

    private $name;
    private $estadoDocumentos;
    private $fromEmail;

    /**
     * Create a new message instance.
     */
    public function __construct(string $name, $estadoDocumentos, string $fromEmail)
    {
        $this->name = $name;
        $this->estadoDocumentos = $estadoDocumentos;
        $this->fromEmail = $fromEmail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->fromEmail, "Capacitación CATRA")
            ->subject('Nueva notificación sobre el estado de documentos CATRA')
            ->view('emails.nuevo-estado-documentos')
            ->with([
                'name' => $this->name,
                'estadoDocumentos' => $this->estadoDocumentos,
            ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
