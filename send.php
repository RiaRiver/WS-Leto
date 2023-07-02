<?php
$formName = $_POST['formName'];
$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$policyCheckbox = $_POST['policyCheckbox'];
$cardPeriod = $_POST['period'];
$club = $_POST['club'];

require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';
require 'phpmailer/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'webstartleto@gmail.com';                     // SMTP username
    $mail->Password   = 'ytrewq040420';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('wsrepdes@gmail.com', 'Спорт-клуб "Лето"');
    $mail->addAddress('riria.river@gmail.com');

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    
    switch ($formName) {
        case "Visit":
        case "Callback":
            $mail->Subject = "Форма ${formName}";
            $mail->Body    =
            "
            Имя пользователя: ${userName}<br>
            Телефон пользователя: ${userPhone}<br>
            Политика безопасности: ${policyCheckbox}<br>
            ";
            break;

         case "Card":
            $mail->Subject = "Форма ${formName}";
            $mail->Body    =
            "
            Период: ${cardPeriod}<br>
            Клуб: ${club}<br>
            Имя пользователя: ${userName}<br>
            Телефон пользователя: ${userPhone}<br>
            Политика безопасности: ${policyCheckbox}<br>
            ";
            break;
    }

    ($mail->send());
    //     echo 'Ok';
    // } else {
    //     echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    // }

 
} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}
