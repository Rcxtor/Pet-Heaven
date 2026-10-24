<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public string $token;

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = config('app.frontend_url')
            . '/reset-password?token=' . $this->token
            . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Your Pet Heaven Password')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('You requested a password reset for your Pet Heaven account.')
            ->action('Reset Password', $url)
            ->line('This password reset link will expire soon.')
            ->line('If you did not request a password reset, you can ignore this email.');
    }
}