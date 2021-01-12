<?php

class Db {

    private $connection;

    private $insertUserStatement;
    private $selectUserByUsernameStatement;
    private $selectUserByIdStatement;
    private $selectUserByEmailStatement;

    private $insertRoomStatement;
    private $selectRoomStatement;
    private $selectCapacityOfRoomStatement;


    public function __construct() {
	
		$config = parse_ini_file("../config/config.ini", true); //asoc masiv
	
		$dbhost = $config['db']['host'];
        $dbName = $config['db']['name'];
        $userName = $config['db']['user'];
        $userPassword = $config['db']['password']; 

        /*$dbhost = "localhost";
        $dbName = "webProject";
        $userName = "root";
        $userPassword = "";*/
			
		$this->init($dbhost, $dbName, $userName, $userPassword);
    }
	
	private function init($dbhost, $dbName, $userName, $userPassword) {
        try {
            $this->connection = new PDO("mysql:host=$dbhost;dbname=$dbName", $userName, $userPassword,
			  [
          		    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            
            $this->prepareStatements();

        } catch(PDOException $e) {
            return "Connection to Database failed: " . $e->getMessage();
        }
    }
	
    private function prepareStatements() {
        $sql = "INSERT INTO users(username, password, email,isAdmin) VALUES (:username, :password, :email, :isAdmin)";
        $this->insertUserStatement =  $this->connection->prepare($sql);

        $sql = "SELECT * FROM users WHERE username=:username";
        $this->selectUserByUsernameStatement =  $this->connection->prepare($sql);

        $sql = "SELECT * FROM users WHERE email=:email";
        $this->selectUserByEmailStatement =  $this->connection->prepare($sql);

        $sql = "SELECT * FROM users WHERE userid=:userid";
        $this->selectUserByIdStatement =  $this->connection->prepare($sql);

        $sql = "INSERT INTO rooms(room_number, capacity) VALUES (:room_number, :capacity)";
        $this->insertRoomStatement =  $this->connection->prepare($sql);

        $sql = "SELECT * FROM rooms WHERE room_number=:room_number";
        $this->selectRoomStatement =  $this->connection->prepare($sql);

        $sql = "SELECT capacity FROM rooms WHERE room_number=:room_number";
        $this->selectCapacityOfRoomStatement =  $this->connection->prepare($sql);
    }

    public function insertUserQuery($data) {
        try {
            // ["user" => "...", "password => "...", :email => ",,,"]
            $this->insertUserStatement->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function selectUserByUsernameQuery($data) {
        try {
            // ["user" => "..."]
            $this->selectUserByUsernameStatement->execute($data);

            return ["success" => true, "data" => $this->selectUserByUsernameStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
    public function selectUserByEmailQuery($data) {
        try {
            // ["email" => "..."]
            $this->selectUserByEmailStatement->execute($data);

            return ["success" => true, "data" => $this->selectUserByEmailStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function selectUserByIdQuery($data) {
        try {
            // ["id" => "..."]
            $this->selectUserByIdStatement->execute($data);

            return ["success" => true, "data" => $this->selectUserByIdStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function insertRoomQuery($data) {
        try {
            // ["room_number" => "...", "capacity => "..."]
            $this->insertRoomStatement->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function selectRoomQuery($data) {
        try {
            $this->selectRoomStatement->execute($data);

            return ["success" => true, "data" => $this->selectRoomStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function selectCapacityOfRoomQuery($data) {
        try {
            $this->selectCapacityOfRoomStatement->execute($data);

            return ["success" => true, "data" => $this->selectCapacityOfRoomStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

}
?>