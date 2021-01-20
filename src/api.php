<?php
    require_once "users.php";
    require_once "utility.php";

    session_start();

    header("Content-type: application/json");

    $requestURL = $_SERVER["REQUEST_URI"];

    if(preg_match("/login$/", $requestURL)) {
        login();
    } elseif(preg_match("/register$/", $requestURL)) {
        register();
    } elseif(preg_match("/dashboard$/", $requestURL)) {
        dashboard();
    } elseif(preg_match("/logout$/", $requestURL)) {
        logout();
    } else {
        echo json_encode(["error" => "URL not found"]);
    }

    function login() {
        $errors = [];
        $response = [];
        $user;

        if ($_POST) 
        {
            $data = json_decode($_POST["data"], true);

            $username = isset($data["username"]) ? testInput($data["username"]) : "";
            $password = isset($data["password"]) ? testInput($data["password"]) : "";

            if (!$username) {
                $errors[] = "You should input username";
            }

            if (!$password) {
                $errors[] = "You should input password";
            }

            if ($username && $password) 
            {
                $user = new User($username, $password); 
                $isUserValid = $user->isValid(); //dali imame takuv potrebitel i parolata mu e vqrna

                if ($isUserValid["success"]) {
                    $_SESSION["username"] = $username;
                    $_SESSION["userid"] = $user->getUserId();
                    $isAdmin =  $user->getIsAdmin();
                    $_SESSION["isAdmin"] = $isAdmin;

                    $expires = time() + 60 * 60 * 24;
                    setcookie("isAdmin", $isAdmin, $expires, "/" );
                } 
                else {
                    $errors[] = $isUserValid["error"];
                }
            } 
        } 
        else {
            $errors[] = "Invalid type of request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true];
        }

        echo json_encode($response);
    }

    function register() {
        $errors = [];
        $response = [];

        if ($_POST) {
            
            $data = json_decode($_POST["data"], true);

            $username = testInput($data["username"]);
            $email = testInput($data["email"]);
            $password = testInput($data["password"]);
            $confirm_password = testInput($data["confirm_password"]);
        
            if (!$username) {
                $errors[] = "Username is required";
            }

            if (!$password) {
                $errors[] = "Password is required";
            }
            if(strlen($password) < 6) {
                $errors[] = "Your password must contain at least 8 characters!";
            }
            if(!preg_match("/[0-9]+/",$password)) {
                $errors[] = "Your password must contain at least 1 number!";
            }
            if(!preg_match("/[A-Z]+/",$password)) {
                $errors[] = "Your password must contain at least 1 capital letter!";
            }
            if(!preg_match("/[a-z]+/",$password)) {
                $errors[] = "your password must contain at least 1 lowercase letter!";
            }

            if (!$confirm_password) {
                $errors[] = "Confirm Password is required";
            }

            if(!$email) {
                $errors[] ="Email is required";
            }
            elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Invalid email format";
            }

            if ($username && $password && $confirm_password && $email) {
                if ($password !== $confirm_password) {
                    $errors[] = "The two passwords don't match";
                } 
                else {
                    $user = new User($username, $password); 
                   
                    if(!strncmp($username,"admin_",6)) {
                        $user->setIsAdmin(1);
                    }
                    else {
                        $user->setIsAdmin(0);
                    }

                    $usernameUsed = $user->userExists(); //dali sushtestvuva potrebitel s vuvedenoto potreb ime
                    $emailUsed = $user->emailUsed($email); //dali veche e registriran potrebitel s tozi email
        
                    if($usernameUsed) {
                        $errors[] = "This username already exists";
                    } 
                    if($emailUsed) {
                        $errors[] = "This email already has been used";
                    }
                    if(!$usernameUsed && !$emailUsed) {
                        $passwordHash = password_hash($password, PASSWORD_DEFAULT); //heshirane na parolata
                        $isAdmin = $user->getIsAdmin();
                        $user->createUser($passwordHash, $email,$isAdmin); //suzdavane na nov potrebitel 
                    }
                }
            }
        } 
        else {
            $errors[] = "Invalid request";
        }

        if($errors) {
            $response = ["success" => false, "error" => $errors];
        } else {
            $response = ["success" => true]; //echo "User is successfully registered!";
        }

        echo json_encode($response);
    }

    function dashboard() {
        $response = [];

        if($_SESSION) {
            if($_SESSION["username"]) {
                $response = ["success" => true, "data" => $_SESSION["username"]]; //moje da se sloji v data $_SESSION["isAdmin"] ??
            } else {
                $response = ["success" => false, "error" => "Unauthorized access"];
            }
        } 
        else {
            $response = ["success" => false, "error" => "Session expired"];
        }

        echo json_encode($response);
    }

    function logout() {
        if ($_SESSION) {
            session_unset();
            session_destroy();

            setcookie("isAdmin", "", time() - 60, "/");
    
            echo json_encode(["success" => true]);
        } 
        else {
             echo json_encode(["success" => false]);
        }
    }