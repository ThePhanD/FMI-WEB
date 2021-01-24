<?php

class Db {

    private $connection;

    private $insertUserStatement;
    private $selectUserByUsernameStatement;
    private $selectUserByIdStatement;
    private $selectUserByEmailStatement;

    private $insertRoomStatement;
    private $selectRoomStatement;
    private $selectAllRoomStatement;
    private $selectActiveRoomsStatement;
	private $selectExampleRoomsStatement;
	private $selectCreatorRoomStatement;

    public function __construct() {
	
	    $config = parse_ini_file("../config/config.ini", true); //asoc masiv
	
	    $dbhost = $config['db']['host'];
        $dbName = $config['db']['name'];
        $userName = $config['db']['user'];
        $userPassword = $config['db']['password']; 
			
		$this->init($dbhost, $dbName, $userName, $userPassword);
    }
	
	private function init($dbhost, $dbName, $userName, $userPassword) {
        try {
            $this->connection = new PDO("mysql:host=$dbhost", $userName, $userPassword,
			  [
          		    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);

            $sql = "CREATE DATABASE IF NOT EXISTS $dbName DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;";
            $this->connection->exec($sql);
            $sql = "USE $dbName";
            $this->connection->exec($sql);

            $sql = "CREATE TABLE  IF NOT EXISTS users (
                userid INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(32) NOT NULL UNIQUE,
                password VARCHAR(64) NOT NULL,
                email VARCHAR(64) NOT NULL UNIQUE,
                isAdmin INT(1) NOT NULL
            )";
            $this->connection->exec($sql);
        
            $sql = "CREATE TABLE  IF NOT EXISTS rooms (
                room_name VARCHAR(16) PRIMARY KEY,
                rowNumber int NOT NULL,
                colNumber int NOT NULL,
                creator VARCHAR(32) NOT NULL,
                music VARCHAR(64) NOT NULL,
                places VARCHAR(2056) NOT NULL,
                isActive INT(1) NOT NULL
            )";
            $this->connection->exec($sql);
            
            $this->prepareStatements();
		
	        $passwordHash = password_hash('webProject2021', PASSWORD_DEFAULT);
            $this->insertUserStatement->execute(["username" => 'user', "password" => $passwordHash, "email" => 'user@gmail.com', "isAdmin" => 0]);
            $this->insertUserStatement->execute(["username" => 'admin_user', "password" => $passwordHash, "email" =>'user_admin@gmail.com', "isAdmin" => 1]);

            $this->insertRoomStatement->execute(["room_name" => 'room101', "rowNumber" => 5, "colNumber" => 4, "creator" => 'admin_user',
                                                 "music" => 'WebIsTheBest', "places" => '11110100111001101101' , "isActive" => 1 ]);

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

        $sql = "INSERT INTO rooms(room_name, rowNumber, colNumber, creator, music, places, isActive) 
					VALUES (:room_name, :rowNumber, :colNumber, :creator, :music, :places, :isActive)";
        $this->insertRoomStatement =  $this->connection->prepare($sql);

        $sql = "SELECT * FROM rooms WHERE room_name=:room_name";
        $this->selectRoomStatement =  $this->connection->prepare($sql);
		
		$sql = "SELECT * FROM rooms";
        $this->selectAllRoomStatement = $this->connection->prepare($sql);

        $sql = "SELECT * FROM rooms WHERE isActive=1";
        $this->selectActiveRoomsStatement = $this->connection->prepare($sql);
		
		$sql = "SELECT * FROM rooms WHERE isActive=0";
        $this->selectExampleRoomsStatement = $this->connection->prepare($sql);
		
		$sql = "SELECT * FROM rooms WHERE creator=:creator AND isActive=:isActive";
        $this->selectCreatorRoomStatement = $this->connection->prepare($sql);
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
            // ["room_name" => "...", "rolNumber => "..."]
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
	
	public function selectAllRoomQuery() {
        try {
            $this->selectAllRoomStatement->execute();

            return ["success" => true, "data" => $this->selectAllRoomStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
    
    public function selectAllActiveRoomQuery() {
        try {
            $this->selectActiveRoomsStatement->execute();

            return ["success" => true, "data" => $this->selectActiveRoomsStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
	
	public function selectAllExampleRoomQuery() {
        try {
            $this->selectExampleRoomsStatement->execute();

            return ["success" => true, "data" => $this->selectExampleRoomsStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
	
	public function getAllRooms() {
		$query = $this->selectAllRoomQuery();

        if ($query["success"]) 
        {
			$rooms = $query["data"]->fetchAll(PDO::FETCH_ASSOC);
			return $rooms;
        } else {
			return $query;
        }
    }

    public function getAllActiveRooms() {
        $query = $this->selectAllActiveRoomQuery();

        if ($query["success"]) 
        {
			$activeRooms = $query["data"]->fetchAll(PDO::FETCH_ASSOC);
			return $activeRooms;
        } else {
			return $query;
        }
    }
	
	public function getAllExampleRooms() {
        $query = $this->selectAllExampleRoomQuery();

        if ($query["success"]) 
        {
			$exampleRooms = $query["data"]->fetchAll(PDO::FETCH_ASSOC);
			return $exampleRooms;
        } else {
			return $query;
        }
    }
	
	public function selectCreatorActiveRoomQuery($data) {
        try {
            $this->selectCreatorRoomStatement->execute($data);;

            return ["success" => true, "data" => $this->selectCreatorRoomStatement];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }
	
	public function getCreatorActiveRoom($data) {
        $query = $this->selectCreatorActiveRoomQuery($data);;

        if ($query["success"]) 
        {
			$room = $query["data"]->fetch(PDO::FETCH_ASSOC);
			return $room;
        } else {
			return $query;
        }
    }
}

?>
