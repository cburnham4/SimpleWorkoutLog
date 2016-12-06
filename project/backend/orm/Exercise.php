<?php
date_default_timezone_set('America/New_York');
class Exercise
{
  private $id;
  private $name;
  private $userId;
  private $mid;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function create($name, $userId, $mid) {
    $mysqli = Exercise::connect();

    /* Insert user into users */
    $result = $mysqli->query("INSERT INTO Exercises (ExerciseName, UserID, MID)
     VALUES (" . "'" . $mysqli->real_escape_string($name) . "', " .
			     "'" . $mysqli->real_escape_string($userId) . "', " .
           "'" . $mysqli->real_escape_string($mid) . "')");
            

    if ($result) {
      $id = $mysqli->insert_id;
      return new Exercise($id, $name, $userId, $mid);
    }
    return null;
  }



  private function __construct($id, $name, $userId, $mid) {
    $this->id = $id;
    $this->name = $name;
    $this->userId = $userId;
    $this->mid = $mid;
  }

  public function getID() {
    return $this->id;
  }


  public function getName() {
    return $this->name;
  }


  public function getJSON() {
    $json_obj = array('id' => $this->id,
                      'name' => $this->name,
                      'mid' => $this->mid
                      );

    return json_encode($json_obj);
  }
}