<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require_once '/home/helloly25579236/crazydog_config.php';

// CORS 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

class MailHandler
{

    private $data;
    private $smtpConfig;

    public function __construct($smtpConfig)
    {
        $this->smtpConfig = $smtpConfig;
        $this->parseIncomingData();
    }

    // 1. REading and Cleaning the data
    private function parseIncomingData()
    {
        $rest_json = file_get_contents("php://input");
        $json_data = json_decode($rest_json, true) ?? [];
        $raw_data = array_merge($_POST, $json_data);

        foreach ($raw_data as $key => $value) {
            $this->data[$key] = htmlspecialchars(strip_tags($value));
        }
        if (isset($this->data['email'])) {
            $this->data['email'] = filter_var($this->data['email'], FILTER_SANITIZE_EMAIL);
        }
    }
    // 2. Create the Message
    private function buildMessage()
    {
        // DSGVO
        $userIp = $_SERVER['REMOTE_ADDR'];
        $timestamp = date('d-m-Y H:i:s');
        $consentText = "The user has accepted the privacy policy";

        $templateFile = 'email_contact_template.html';
        if (!file_exists($templateFile)) return "Template error.";

        // DSGVO 
        $userIp = $_SERVER['REMOTE_ADDR'];
        $timestamp = date('d-m-Y H:i:s');
        $consentText = "The user has accepted the privacy policy";

        $message = file_get_contents($templateFile);
        $replace = [
            '{{name}}'            => $this->data['name'] ?? '',
            '{{email}}'           => $this->data['email'] ?? '',
            '{{subject}}'           => $this->data['subject'] ?? '',
            '{{message}}'           => $this->data['message'] ?? '',
            '{{gdpr_info}}'           => "<strong>GDPR Consent:</strong> $consentText<br>" .
                "<strong>IP Address:</strong> $userIp<br>" .
                "<strong>Timestamp:</strong> $timestamp"
        ];

        return str_replace(array_keys($replace), array_values($replace), $message);
    }

    // 3. E-mail sending
    public function sendEmails()
    {
        if (empty($this->data['email'])) {
            throw new Exception("Email field is required.");
        }

        $message = $this->buildMessage();
        $mail = new PHPMailer(true);

        // SMTP serevr settings
        $mail->isSMTP();
        $mail->Host       = 'crazydogcustom.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $this->smtpConfig['user'];
        $mail->Password   = $this->smtpConfig['pass'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';

        // 1. Letter to owner
        $mail->setFrom('info@crazydogcustom.com', 'CrazyDog Website');
        $mail->addAddress('info@crazydogcustom.com');
        $mail->addReplyTo($this->data['email'], $this->data['name']);
        $mail->isHTML(true);
        $mail->Subject = 'New Contact mail: ' . ($this->data['name'] ?? 'Unknown');
        $mail->Body    = $message;
        $mail->send();

        // 2. Letter to customer
        $mail->clearAddresses();
        $mail->clearReplyTos();
        $mail->addAddress($this->data['email']);
        $mail->setFrom('info@crazydogcustom.com', 'CrazyDog Custom');
        $mail->Subject = 'Confirmation: We received your message';
        $mail->Body    = $message;
        $mail->send();

        return ["status" => "success", "message" => "Thank You! We received your message."];
    }
}

// --- Execute ---

try {
    $handler = new MailHandler([
        'user' => $smtp_user,
        'pass' => $smtp_pass
    ]);

    $response = $handler->sendEmails();

    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
