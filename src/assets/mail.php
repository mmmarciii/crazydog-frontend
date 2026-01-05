<?php
// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// If OPTIONS request (preflight), stop
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// Angular send the data in JSON format
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (!empty($_POST['email']) && !empty($_POST['message'])) {
    
    $to = "info@crazydogcustom.com"; 
    $subject = "You have a new message: " . $_POST['subject'];
    
    $email_content = "Name: " . $_POST['name'] . "\n";
    $email_content .= "Email: " . $_POST['email'] . "\n\n";
    $email_content .= "Message:\n" . $_POST['message'];

    $headers = "From: info@crazydogcustom.com\r\n";
    $headers .= "Reply-To: " . $_POST['email'] . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Email send!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server failure."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing data."]);
}
?>