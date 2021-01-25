<?php

// namespace MyApp;

require_once "rooms.php";
require_once "Db.php";


use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Socket implements MessageComponentInterface {

    protected $connToRoom=array();
	protected $connToSeat=array();
	protected $roomToAdminConn=array();
	protected $db;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
		$this->db = new Db();
    }

//creates a connection
    public function onOpen(ConnectionInterface $conn) {
		
        // Store the new connection in $this->clients
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

//sending a message in JSON
    public function onMessage(ConnectionInterface $from, $msg) {
		$data = JSON_decode($msg);
		$type=$data->type;
		$user=$data->user;
		$valid_functions = ['connect','message','disconnect'];
		if(in_array($type,$valid_functions)) {
			$functionName = $type;
			$this->$functionName($from,$user,$data);
			}
		else {
			$from->send("INVALID REQUEST");
		}
	}
	
	private function updateAdminNumbers($roomName, $seats) {
		$freeSeat = '1';
		$count = 0;
		for($seat = 0; $seat < count($seats); $seat++) {
			if($seats[$seat] == $freeSeat) {
				$count++;
			}
		}
		$currentCnt = 0;
		foreach ($this->clients as $client) {
			if (!array_key_exists($client->resourceId, $this->connToRoom)) {
				continue;
			}
			if ($this->connToRoom[$client->resourceId] == $roomName) {
				$currentCnt++;
			}
		}
		if (!array_key_exists($roomName, $this->roomToAdminConn)) {
			return;
		}
		$currentCnt--;
		$totalCnt = $currentCnt + $count;
		$data = array("type" => "numberMessage", "current" => $currentCnt, "total" => $totalCnt, "places" => implode($seats));
		$adminResId = $this->roomToAdminConn[$roomName];
		$encoded_data = JSON_encode($data);
		echo "Sending {$encoded_data} to {$adminResId} \n";
		foreach ($this->clients as $client) {
			if ($client->resourceId == $adminResId) {
				$client->send($encoded_data);
				break;
			}
		}
	}
	
	private function sendSeatNumber($client, $seat) {
		$seat += 1; // 0 to 1 based indexing.
		$data = array("type" => "seatMessage", "seatNumber" => $seat);
		$encoded_data = JSON_encode($data);
		echo "Sending {$encoded_data} \n";
		$client->send($encoded_data);
	}
	
	private function sendRoomFull($client) {
		$data = array("type" => "roomFull");
		$encoded_data = JSON_encode($data);
		echo "Sending {$encoded_data} \n";
		$client->send($encoded_data);
	}
	
	function sendToAllRoom($data) {
		$room=$data["room"];
		foreach ($this->clients as $client ) {
		   $adminRes = $this->roomToAdminConn[$room];
		   if($client->resourceId !=$adminRes &&$this->connToRoom[$from->resourceId] == $this->connToRoom[$client->resourceId]) {
				$msg=JSON_encode($data);
				$client->send($msg);
		   }
		}
	}
	
	private function connect(ConnectionInterface $from,$user,$data) {
		$roomName=$data->roomName;
		$isAdmin=$data->isAdmin == "yes";
		echo "Room name: {$roomName} \n";
		$this->connToRoom[$from->resourceId]=$roomName;
		
		// Select room from db
		$roomData = $this->db->selectRoomQuery(array("room_name" => $roomName))["data"]->fetch(PDO::FETCH_ASSOC);
		echo json_encode($roomData);
		// Get places & creator from result
		$places = $roomData["places"];
		$creator= $roomData["creator"];
		echo "\n Places: {$places}, creator: {$creator} \n";
		
		$seats = str_split($places);
		
		if ($creator == $user && $isAdmin) {
			echo "\n Admin connected \n";
			$this->roomToAdminConn[$roomName] = $from->resourceId;
			$this->updateAdminNumbers($roomName, $seats);
			return;
		}
		
		// Choose next seat
		$freeSeat = "1";
		$takenSeat = "0";
		for($seat = 0; $seat < count($seats); $seat++) {
			if($seats[$seat] == $freeSeat) {
				break;
			}
		}
		if ($seat == count($seats)) {
			$this->sendRoomFull($from);
			return;
		}
		echo "Chosen index {$seat} \n";
		$this->connToSeat[$from->resourceId] = $seat;
		$seats[$seat] = $takenSeat;
		$newPlaces = implode($seats);
		$this->db->updateRoomsQuery(array("places" =>$newPlaces, "room_name" => $roomName));
		$this->updateAdminNumbers($roomName, $seats);
		$this->sendSeatNumber($from, $seat);
	}
	
	private function sendMess($client, $message) {
	    echo "Sending message {$message} to client {$client->resourceId} \n";
		$toSend= array("type" => "message", "message" => $message);
		$client->send(JSON_encode($toSend));
	}
	
	private function message(ConnectionInterface $from, $user, $data) {
		$message=$data->message;
		$seats=$data->seats;
		echo "Received message {$message} \n";
		foreach ($this->clients as $client ) {
           if ($from->resourceId == $client->resourceId) {
               continue;
		   }
		   if (!array_key_exists($client->resourceId, $this->connToSeat)) {
			   continue;
		   }
		   $seat = $this->connToSeat[$client->resourceId];
		   if($this->connToRoom[$from->resourceId] == $this->connToRoom[$client->resourceId] &&
			  (!isset($seats) || in_array($seat, $seats))) {
				$this->sendMess($client,$message);
		   }
		}
	}
	
	
	private function disconnect(ConnectionInterface $from,$user,$data) {
		echo "Received disconnect message \n";
		$roomName = $this->connToRoom[$from->resourceId];
		$seats = array();
		
		unset($this->connToRoom[$from->resourceId]);
		if (array_key_exists($from->resourceId, $this->connToSeat)) {
			$seat = $this->connToSeat[$from->resourceId];
			unset($this->connToSeat[$from->resourceId]);
			
			
			$roomData = $this->db->selectRoomQuery(array("room_name" => $roomName))["data"]->fetch(PDO::FETCH_ASSOC);
			$places = $roomData["places"];
			$seats = str_split($places);
			$freeSeat = "1";
			$seats[$seat] = $freeSeat;
			$newPlaces = implode($seats);
			echo $newPlaces;
			$this->db->updateRoomsQuery(array("places" =>$newPlaces, "room_name" => $roomName));
			
			echo "Removed seat {$seat} \n";
		}
		if (array_key_exists($roomName, $this->roomToAdminConn)) {
			$adminRes = $this->roomToAdminConn[$roomName];
			if ($from->resourceId == $adminRes) {
				unset($this->roomToAdminConn[$roomName]);
			} else {
				// Subtract one for what we're currently removing.
				$this->updateAdminNumbers($roomName, $seats);
			}
		}
	}
	
    public function onClose(ConnectionInterface $conn) {
		$this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
		echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}