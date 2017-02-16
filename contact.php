<?php
// error_reporting(0);
	if($_SERVER["REQUEST_METHOD"] == "POST") {	

		function check_input($input){
			$input = trim($input);
			$input = stripslashes($input);
			$input = htmlspecialchars($input);
			return $input;
		}
			
		$name          = check_input($_POST['name']);	
		$email         = check_input($_POST['email']);		
		$message       = check_input($_POST['message']);
		$validation_OK = true;
		$email_to      = "hubertborowczyk@gmail.com";
		$email_subject = "Wiadomość ze strony nowis.tech";
				
		$string_exp = "/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u";
		
		if(!preg_match($string_exp,$name)) {			
			$validation_OK = false;
			echo('Sprawdź pole "imię i nazwisko" <br>');			
		}

		$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
		
		if(!preg_match($email_exp,$email)) {
			$validation_OK = false;		
			echo ('Podany adres email jest nieprawidłowy <br>');		
		}
		
		if(strlen($message) < 5) {	
			$validation_OK = false;
			echo('Wiadomość musi posiadać minimum 5 znaków <br>');	
		}

		if($validation_OK){
			$email_message = "Masz nową wiadomość wysłaną przez formularz na twojej stronie nowis.tech:\r\n\r\n<br><br>";	
			$email_message .= "Wiadomość od: ".$name."\r\n<br>";		
			$email_message .= "Email: ".$email."\r\n<br><br>";		
			$email_message .= "Treść wiadomości: ".$message."\r\n";
			
			// create email structure
			$headers = 'From: '.$email."\r\n";
			$headers .= "MIME-Version: 1.0" . "\r\n";
			$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
			$headers .='Reply-To: '.$email."\r\n";

			mail($email_to, $email_subject, $email_message, $headers);	

			echo('Twoja wiadomość została wysłana <br>');	
		}
	}
?>