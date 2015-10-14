<?php
mb_internal_encoding("UTF-8");
if( $_POST ){
    $name = $_POST['register-name'];
    $email = $_POST['register-email'];
    $ticket = $_POST['register_ticket'];

    $to = "hithemestarz@gmail.com";
    $subject = 'New ticket registration';

    $body = "";
    $body .= "Name: ";
    $body .= $name;
    $body .= "\n\n";

    $body .= "";
    $body .= "Email: ";
    $body .= $email;
    $body .= "\n\n";

    $body .= "";
    $body .= "Ticket: ";
    $body .= $ticket;
    $body .= "\n\n";

    $headers = 'From: ' .$email . "\r\n";

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        mb_send_mail($to, $subject, $body, $headers);
        echo "<span id='valid'>Thank you " . $name .  ". We've got your ticket!</span>";
    }
    else{
        echo '<span id="invalid">Something gets wrong. Please try again.</span>';
    }

}