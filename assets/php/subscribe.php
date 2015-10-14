<?php
mb_internal_encoding("UTF-8");
if( $_POST ){
    $name = $_POST['subscribe-name'];
    $email = $_POST['subscribe-email'];

    $to = $email;
    $subject = 'You have new subscriber from EVENTˣ!';

    $body = "";
    $body .= "Name: ";
    $body .= $name;
    $body .= "\n\n";

    $body .= "";
    $body .= "Email: ";
    $body .= $email;
    $body .= "\n\n";

    $headers = 'From: ' .$email . "\r\n";

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        mb_send_mail($to, $subject, $body, $headers);
        echo '<span id="valid">Thank you for your subscription!</span>';
    }
    else{
        echo '<span id="invalid">Something gets wrong. Please try again.</span>';
    }

}