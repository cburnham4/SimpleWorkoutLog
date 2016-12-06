<?php
date_default_timezone_set('America/New_York');
class User
{
  private $id;
  private $name;
  private $muscleId;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function create($name, $muscleId) {
    $mysqli = User::connect();

    /* Insert user into users */
    $result = $mysqli->query("INSERT INTO Users (UserName, muscleId)
     VALUES (" . "'" . $mysqli->real_escape_string($name) . "', " .
			     "'" . $mysqli->real_escape_string($muscleId) . "') ");

    if ($result) {
      $id = $mysqli->insert_id;
      return new User($id, $name, $password);
    }
    return null;
  }

  public static function findUser($name, $password) {
    $mysqli = User::connect();

    $result = $mysqli->query("select UserID from Users 
      where UserName = '" . $name  ."' AND UserPassword = '" . $password . "'");
    if ($result) {
      if ($result->num_rows == 0) {
	     return null;
      }


      $User_info = $result->fetch_array();
      $user_id = $User_info['UserID'];

  
      return new User(intval($user_id),$name, $password);
    }
    print("No user found");
    return null;
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