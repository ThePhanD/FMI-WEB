<?php
	require_once "Db.php";

	class User  
	{
		private $username;
		private $password;
		private $email;
		private $userid;
		private $isAdmin;

		private $db;

		public function __construct($username, $password) { 
			$this->username = $username;
			$this->password = $password;
           
			$this->db = new Db();
        }

		public function getUsername() {
			return $this->username;
		}

		public function getEmail() {
			return $this->email;
		}

		public function getUserId() {
			return $this->userid;
		}
		
		public function getIsAdmin() {
			return $this->isAdmin;
		}

		public function setEmail($email) {
			$this->email = $email;
		}
		
		public function setIsAdmin($isAdmin) {
			$this->isAdmin = $isAdmin;
		}

		public function createUser($passwordHash, $email, $isAdmin) 
		{
			$query = $this->db->insertUserQuery(["username" => $this->username, "password" => $passwordHash,
                                                 "email" => $email, "isAdmin" => $isAdmin]);

			if ($query["success"]) {
				$this->password = $passwordHash;
				$this->email = $email;
				$this->isAdmin = $isAdmin;

				return $query;
			} 
			else {
				return $query;
			}
		}

		public function userExists() 
		{
			$query = $this->db->selectUserByUsernameQuery(["username" => $this->username]);

			if ($query["success"]) {
				$user = $query["data"]->fetch(PDO::FETCH_ASSOC);

				if ($user) {
					return true;
				} else {
					return false;
				}
			} 
			else {
				return $query;
			}
		}

		public function emailUsed($email) 
		{
			$query = $this->db->selectUserByEmailQuery(["email" => $email]);

			if($query["success"]) {
				$userWithEmail = $query["data"]->fetch(PDO::FETCH_ASSOC);

				if ($userWithEmail) {
					return true;
				} else {
					return false;
				}
			} 
			else {
				return $query;
			}
		}

		public function isValid() 
		{
			$query = $this->db->selectUserByUsernameQuery(["username" => $this->username]);

			if ($query["success"]) 
			{
				$user = $query["data"]->fetch(PDO::FETCH_ASSOC);

				if ($user) 
				{
					if (password_verify($this->password, $user["password"])) 
					{
						$this->password = $user["password"];
						$this->email = $user["email"];
						$this->userid = $user["userid"];
						$this->isAdmin = $user["isAdmin"];

						return ["success" => true];
					} else {
						return ["success" => false, "error" => "Invalid password"];
					}
				} 
                else {
					return ["success" => false, "error" => "Invalid username"];
				}
			} 
			else {
				return $query;
			}
		}
	}  
?>