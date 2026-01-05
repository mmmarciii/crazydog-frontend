<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (!empty($_POST['email'])) {

    $mail = new PHPMailer(true);
    $smtp_password = getenv('SMTP_PASS');
    $smtp_user = getenv('SMTP_USER');

    try {
        // --- Server settings ---
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER; // error handling
        $mail->isSMTP();
        $mail->Host       = 'crazydogcustom.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_user;
        $mail->Password   = $smtp_password; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';

        // --- 1. EMAIL: to owner ---
        $mail->setFrom('info@crazydogcustom.com', 'CrazyDog Website');
        $mail->addAddress('info@crazydogcustom.com'); 
        $mail->addReplyTo($_POST['email'], $_POST['name']);

        $mail->isHTML(false);
        $mail->Subject = 'New Message: ' . $_POST['subject'];
        $mail->Body    = "Name: {$_POST['name']}\nEmail: {$_POST['email']}\n\nMessage:\n{$_POST['message']}";

        $mail->send();

        // --- 2. EMAIL: to customer ---
        $mail->clearAddresses(); 
        $mail->addAddress($_POST['email']);
        $mail->addReplyTo('info@crazydogcustom.com', 'CrazyDog Custom');
        
        $mail->Subject = 'Confirmation: We received your message';
        $mail->Body    = "Dear {$_POST['name']},\n\nThank you for reaching out! We have received your message and will get back to you soon.\n\nBest regards,\nCrazyDog Custom Team";

        $mail->send();

        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
    }
}
?>