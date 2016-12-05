<?php
date_default_timezone_set('America/New_York');

class User
{
  private $id;
  private $name;
  private $password;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function create($name, $password) {
    $mysqli = User::connect();

    /* Insert user into users */
    $result = $mysqli->query("INSERT INTO Users (UserName, UserPassword)
     VALUES (" . "'" . $mysqli->real_escape_string($name) . "', " .
			     "'" . $mysqli->real_escape_string($password) . "') ";

    

    
    if ($result) {
      $id = $mysqli->insert_id;
      return new User($id, $name, $password);
    }
    return null;
  }

  public static function findUser($name, $password) {
    $mysqli = User::connect();

    $result = $mysqli->query("select UserID from Users where UserName = " . $name  ." AND UserPassword " . $password);
    if ($result) {
      if ($result->num_rows == 0) {
	     return null;
      }

      $User_info = $result->fetch_array();
      $user_id = $User_info['UserID'];

    

      return new User(intval($user_id),$name, $password);
    }
    return null;
  }

  public static function getAllIDs() {
    $mysqli = User::connect();

    $result = $mysqli->query("select id from User");
    $id_array = array();

    if ($result) {
      while ($next_row = $result->fetch_array()) {
	$id_array[] = intval($next_row['id']);
      }
    }
    return $id_array;
  }

  private function __construct($id, $name, $password) {
    $this->id = $id;
    $this->name = $name;
    $this->password = $password;
  }

  public function getID() {
    return $this->id;
  }


  public function getName() {
    return $this->name;
  }


  public function getUserId() {
    $json_obj = array('id' => $this->id);

    return json_encode($json_obj);
  }
}