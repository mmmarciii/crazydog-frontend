<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    

    $to = "info@crazydogcustom.com"; 
    $subject = "New quotes";
    $uploadDir = "uploads/"; 
    $maxFileSize = 5 * 1024 * 1024; 
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // --- Data cleaning ---
    $data = $_POST;
    $firstName = htmlspecialchars(strip_tags($data['firstName'] ?? ''));
    $lastName = htmlspecialchars(strip_tags($data['lastName'] ?? ''));
    $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($data['phone'] ?? '');
    $shoeSource = htmlspecialchars($data['shoeSource'] ?? '');
    $shoeType = htmlspecialchars($data['shoeType'] ?? '');
    $shoeSize = htmlspecialchars($data['shoeSize'] ?? '');
    $notes = htmlspecialchars($data['notes'] ?? '');

    // Adddress datas
    $city = htmlspecialchars($data['billingCity'] ?? '');
    $zip = htmlspecialchars($data['billingZip'] ?? '');
    $street = htmlspecialchars($data['billingStreet'] ?? '');

    // --- File handling
    $fileLinks = "";
    if (!empty($_FILES['images'])) {
        foreach ($_FILES['images']['name'] as $key => $name) {
            $fileType = $_FILES['images']['type'][$key];
            $fileSize = $_FILES['images']['size'][$key];
            $tmpName = $_FILES['images']['tmp_name'][$key];

            if (in_array($fileType, $allowedTypes) && $fileSize <= $maxFileSize) {
                $fileExt = pathinfo($name, PATHINFO_EXTENSION);
                $newName = uniqid('img_', true) . "." . $fileExt;
                $targetPath = $uploadDir . $newName;

                if (move_uploaded_file($tmpName, $targetPath)) {
                    $actualLink = "https://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/" . $targetPath;
                    $fileLinks .= "<li><a href='$actualLink'>$newName</a></li>";
                }
            }
        }
    }

    // --- E-MAIL Body ---
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { width: 80%; margin: 20px auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
            .header { background: #f8f9fa; padding: 10px; border-bottom: 2px solid #ff6600; }
            h2 { color: #ff6600; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Quote</h2>
            </div>
            
            <div class='section'>
                <h3>Customer details:</h3>
                <p><span class='label'>Name:</span> $lastName $firstName</p>
                <p><span class='label'>Email:</span> $email</p>
                <p><span class='label'>Phone:</span> $phone</p>
                <p><span class='label'>Address:</span> $zip $city, $street</p>
            </div>

            <div class='section'>
                <h3>Product configuration:</h3>
                <p><span class='label'>Source:</span> $shoeSource</p>
                <p><span class='label'>Model:</span> $shoeType</p>
                <p><span class='label'>Size:</span> $shoeSize</p>
                <p><span class='label'>Information:</span><br> $notes</p>
            </div>

            <div class='section'>
                <h3>Moodboard:</h3>
                <ul>" . ($fileLinks ?: "<li>No uploaded picture</li>") . "</ul>
            </div>
        </div>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Crazydogcustom <info@crazydogcustom.com>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    // --- Sending ---
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank You! We received your quote."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Something went wrong to send the quote."]);
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Just POST request is allowed"]);
}
?>