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

/**
 * Quote Class
 */
class QuoteHandler
{
    private $data;
    private $fileLinks = "";
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

    // 2. File handling
    public function handleUploads($uploadDir = "uploads/")
    {
        if (empty($_FILES['images'])) return;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        foreach ($_FILES['images']['name'] as $key => $name) {
            $allowed = ['image/jpeg', 'image/png', 'image/webp'];
            if (in_array($_FILES['images']['type'][$key], $allowed) && $_FILES['images']['size'][$key] <= 5 * 1024 * 1024) {

                $fileExt = pathinfo($name, PATHINFO_EXTENSION);
                $newName = uniqid('img_', true) . "." . $fileExt;
                $targetPath = $uploadDir . $newName;

                if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $targetPath)) {
                    $actualLink = "https://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/" . $targetPath;
                    $this->fileLinks .= "<li><a href='$actualLink' target='_blank'>$newName</a></li>";
                }
            }
        }
    }

    // 3. Create the Message
    private function buildMessage($templateFile = 'email_template.html')
    {
        if (!file_exists($templateFile)) return "Template error: $templateFile not found.";

        // DSGVO
        $userIp = $_SERVER['REMOTE_ADDR'];
        $timestamp = date('d-m-Y H:i:s');
        $consentText = "The user has accepted the privacy policy";

        $sameAsShipping = isset($this->data['sameAsShipping']) &&
            ($this->data['sameAsShipping'] === true ||
                $this->data['sameAsShipping'] === 'true' ||
                $this->data['sameAsShipping'] === '1');

        $message = file_get_contents($templateFile);
        $replace = [
            '{{fileLinks}}'           => ($this->fileLinks ?: "<li>No uploaded pictures</li>"),
            '{{firstName}}'           => $this->data['firstName'] ?? '',
            '{{lastName}}'            => $this->data['lastName'] ?? '',
            '{{email}}'               => $this->data['email'] ?? '',
            '{{phone}}'               => $this->data['phone'] ?? '',

            '{{billingCountry}}'      => $this->data['billingCountry'] ?? '',
            '{{billingZip}}'          => $this->data['billingZip'] ?? '',
            '{{billingCity}}'         => $this->data['billingCity'] ?? '',
            '{{billingStreet}}'       => $this->data['billingStreet'] ?? '',
            '{{billingHouseNumber}}'  => $this->data['billingHouseNumber'] ?? '',

            '{{shippingCountry}}'     => ($sameAsShipping) ? $this->data['billingCountry'] : $this->data['shippingCountry'] ?? '',
            '{{shippingZip}}'         => ($sameAsShipping) ? $this->data['billingZip'] : $this->data['shippingZip'] ?? '',
            '{{shippingCity}}'        => ($sameAsShipping) ? $this->data['billingCity'] : $this->data['shippingCity'] ?? '',
            '{{shippingStreet}}'      => ($sameAsShipping) ? $this->data['billingStreet'] : $this->data['shippingStreet'] ?? '',
            '{{shippingHouseNumber}}' => ($sameAsShipping) ? $this->data['billingHouseNumber'] : $this->data['shippingHouseNumber'] ?? '',

            '{{shoeSource}}'          => $this->data['shoeSource'] ?? '',
            '{{shoeType}}'            => $this->data['shoeType'] ?? '',
            '{{shoeSize}}'            => $this->data['shoeSize'] ?? '',
            '{{notes}}'               => nl2br($this->data['notes'] ?? ''),
            '{{gdpr_info}}'           => "<strong>GDPR Consent:</strong> $consentText<br>" .
                "<strong>IP Address:</strong> $userIp<br>" .
                "<strong>Timestamp:</strong> $timestamp",
            '{{fileLinks}}'  => ($this->fileLinks ?: "<li>No uploaded pictures</li>")
        ];

        $message = file_get_contents($templateFile);
        return str_replace(array_keys($replace), array_values($replace), $message);
    }

    // 4. E-mail sending
    public function sendEmails()
    {
        if (empty($this->data['email'])) {
            throw new Exception("Email field is required.");
        }

        $message = $this->buildMessage();
        $mail = new PHPMailer(true);

        // SMTP serevr settings
        $ownerMessage = $this->buildMessage('email_template.html');

        $mail->isSMTP();
        $mail->Host       = 'crazydogcustom.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $this->smtpConfig['user'];
        $mail->Password   = $this->smtpConfig['pass'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';

        // 1. Letter to owner
        $ownerMessage = $this->buildMessage('email_template.html');

        $mail->setFrom('info@crazydogcustom.com', 'CrazyDog Website');
        $mail->addAddress('info@crazydogcustom.com');
        $mail->addReplyTo($this->data['email'], $this->data['lastName']);
        $mail->isHTML(true);
        $mail->Subject = 'New Quote: ' . ($this->data['lastName'] ?? 'Unknown');
        $mail->Body    = $ownerMessage;
        $mail->send();

        // 2. Letter to customer
        $customerMessage = $this->buildMessage('email_template_customer.html');

        $mail->clearAddresses();
        $mail->clearReplyTos();
        $mail->addAddress($this->data['email']);
        $mail->setFrom('info@crazydogcustom.com', 'CrazyDog Custom');
        $mail->Subject = 'Confirmation: We received your message';
        $mail->Body    = $customerMessage;
        $mail->send();

        return ["status" => "success", "message" => "Thank You! We received your quote."];
    }
}

// --- Execute ---

try {
    $handler = new QuoteHandler([
        'user' => $smtp_user,
        'pass' => $smtp_pass
    ]);

    $handler->handleUploads();
    $response = $handler->sendEmails();

    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
