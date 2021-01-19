	<?php 
		isset($_SESSION['login_button'])) {
			session_start();
			require("src/db/users.php");
			$objUser = new users($_POST['username'],$_POST['password']);
			$userId  = $objUser->getId();
		}				
?>
