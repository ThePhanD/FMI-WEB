<?php
    require_once "Db.php";

    class Room {

        private $roomName;
        private $rowNumber;
        private $colNumber;
        private $creator;
        private $music;
        private $places;

        private $db;

        public function __construct($roomName, $rowNumber, $colNumber) {

            $this->roomName = $roomNumber;
            $this->rowNumber = $rowNumber;
            $this->colNumber = $colNumber;

            $this->db = new Db();
        }

        public function getRoomName() {
            return $this->roomName;
        }
        public function getRowNumber() {
            return $this->rowNumber;
        }
        public function getColNumber() {
            return $this->colNumber;
        }
        public function getCreator() {
            return $this->creator;
        }
        public function getMusic() {
            return $this->music;
        }
        public function getPlaces() {
            return $this->places;
        }
        public function setCreator($creator) {
            $this->creator = $creator;
        }
        public function setPlaces($places) {
            $this->places = $places;
        }
        public function setMusic($music) {
            $this->music = $music;
        }

        public function createRoom($creator, $music, $places) 
        {
            $query = $this->db->insertRoomQuery(["room_name" => $this->roomName, "colNumber" => $this->colNumber, "rowNumber" => $this->rowNumber,
                                                 "creator" => $creator, "music" => $music, "places" => $places]);

            if ($query["success"]) 
            {
                $this->creator = $creator;
                $this->music = $music;
                $this->places = $places;

                return $query;
            } 
            else {
                return $query;
            }
        }

        public function roomExists() 
        {
            $query = $this->db->selectRoomQuery(["room_name" => $this->roomName]);

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