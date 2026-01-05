<?php
// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (!empty($_POST['email']) && !empty($_POST['message'])) {
    
    $user_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $user_name = strip_tags($_POST['name']);
    $subject_orig = strip_tags($_POST['subject']);
    $message_orig = strip_tags($_POST['message']);

    // --- 1. EMAIL: for admin ---
    $to_admin = "info@crazydogcustom.com"; 
    $subject_admin = "New message from website: " . $subject_orig;
    $content_admin = "You have a new message via contact form:\n\n";
    $content_admin .= "Name: " . $user_name . "\n";
    $content_admin .= "Email: " . $user_email . "\n\n";
    $content_admin .= "Message:\n" . $message_orig;

    $headers_admin = "From: info@crazydogcustom.com\r\n";
    $headers_admin .= "Reply-To: " . $user_email . "\r\n";
    $headers_admin .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $admin_mail_sent = mail($to_admin, $subject_admin, $content_admin, $headers_admin);

    // --- 2. EMAIL: Customer  ---
    $subject_user = "Confirmation: We received your message - Crazy Dog Custom";
    
    $content_user = "Dear " . $user_name . ",\n\n";
    $content_user .= "Thank you for contacting us! This is an automated confirmation that we have received your message.\n\n";
    $content_user .= "--- Your Message ---\n";
    $content_user .= "Subject: " . $subject_orig . "\n";
    $content_user .= "Message: " . $message_orig . "\n\n";
    $content_user .= "We will get back to you as soon as possible.\n\n";
    $content_user .= "Best regards,\n";
    $content_user .= "The Crazy Dog Custom Team\n";
    $content_user .= "https://crazydogcustom.com";

    $headers_user = "From: info@crazydogcustom.com\r\n";
    $headers_user .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($user_email, $subject_user, $content_user, $headers_user);

    // Responses to Angular
    if ($admin_mail_sent) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Emails sent!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server failure."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing data."]);
}
?>