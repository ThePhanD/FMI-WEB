<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Socket implements MessageComponentInterface {

    protected $mapForUsers=array();
    protected $mapForRooms=array();	

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
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
		$userID=$data->userID;
		$valid_functions = ['connect','message','disconnect'];
		if(in_array($type,$valid_functions)) {
			$functionName = $type;
			$this->$functionName($from,$userID,$data);
			}
		else {
			$from->send("INVAILD REQUEST");
		}
	}
	
	private function connect(ConnectionInterface $from,$userID,$data) {
		$roomName=$data->roomName;
		$this->mapForUsers[$from->resourceId]=$userID;
		$this->mapForRooms[$userID]=$roomName;
	}
	
	private function message(ConnectionInterface $from,$userID,$data) {
		$message=$data->message;
		$fromUserID=$this->mapForUsers[$from->resourceId];
		  foreach ($this->clients as $client ) {
		   $clientUserID=$this->mapForUsers[$client->resourceId];
           if ($from->resourceId == $client->resourceId) {
               continue;
			}
		   else {
			  if($this->mapForRooms[$clientUserID] == $this->mapForRooms[$fromUserID]) {
					$toSend= array("message" => $message);
					$client->send(JSON_encode($toSend));
			   }
			}
		}
	}
	
	private function disconnect(ConnectionInterface $from,$userID,$data) {
		unset($this->mapForUsers[$from->resourceId]);
		unset($this->mapForRooms[$userID]);
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