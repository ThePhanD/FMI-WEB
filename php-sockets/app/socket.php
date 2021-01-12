<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Socket implements MessageComponentInterface {

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
        foreach ( $this->clients as $client ) {
			$data = JSON_decode($msg);
            if ( $from->resourceId == $client->resourceId ) {
                continue;
			}
			$col=$data->code;
			$message=array("code" => $col);
			$client->send(JSON_encode($message));
			}
    }
	

    public function onClose(ConnectionInterface $conn) {
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
    }
	
}