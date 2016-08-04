<?php

class Db {
  function Db($username="NOT_SET", $password="NOT_SET", $db="NO_DB") {
    $this->username = $username;
    $this->password = $password;
    $this->db = $db;
  }
  
  function connect() {
    // Suppress the warnings
    set_error_handler("warning_handler", E_WARNING);
    // Connect to DB
    $this->mysqli = mysqli_connect("localhost", $this->username, $this->password, $this->db);
    if (mysqli_connect_errno()) {
      // Connection error
      $result = array(
        'error' => TRUE,
        'errorNumber' => $mysqli->connect_errno,
        'msg'         => 'Connection error'
      );
    } else {
      // No connection error
      $result = array(
        'error' => FALSE
      );
    }
    return $result;
  }
  
  function query($query) {
    $result = $this->connect();
    $mysqli_query = mysqli_query($this->mysqli, $query);
    if ($mysqli_query) {
      $result['data'] = array();
      while ($rec = $mysqli_query->fetch_assoc()) {
        array_push($result['data'], $rec);
      }
    } else {
      $result = array('error' => TRUE, 'msg' => 'Query failed');
    }
    return $result;
  }
}

function warning_handler() {
  // No-Op function to trap warnings
}

?>