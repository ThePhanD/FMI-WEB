<?php
    require_once "Db.php";

    class Room {

        private $roomNumber;
        private $capacity;

        private $db;

        public function __construct($roomNumber, $capacity) {

            $this->roomNumber = $roomNumber;
            $this->capacity = $capacity;

            $this->db = new Db();
        }

        public function getRoomNumber() {
            return $this->roomNumber;
        }

        public function getCapacity() {
            return $this->capacity;
        }

        public function createRoom($roomNumber, $capacity) 
        {
            $query = $this->db->insertRoomQuery(["room_number" => $roomNumber, "capacity" => $capacity]);

            if ($query["success"]) 
            {
                $this->roomNumber = $roomNumber;
                $this->capacity = $capacity;

                return $query;
            } 
            else {
                return $query;
            }
        }

        public function roomExists() 
        {
            $query = $this->db->selectRoomQuery(["room_number" => $this->roomNumber]);

            if ($query["success"]) 
            {
                $room = $query["data"]->fetch(PDO::FETCH_ASSOC);

                if ($room) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return $query;
            }
        }
    }

?>