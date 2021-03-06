<?php
date_default_timezone_set('America/New_York');
class Exercise
{
  private $eid;
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
      $eid = $mysqli->insert_id;
      return new Exercise($eid, $name, $userId, $mid);
    }
    return null;
  }

  public static function getExercises($userId){
    $mysqli = Exercise::connect();

    $result = $mysqli->query("SELECT EID, ExerciseName, MID FROM Exercises WHERE UserID = " .$userId);

    $exercises = array();

    if($result){
      while($next_row = $result->fetch_array()){
        $json_obj = array('eid' => $next_row['EID'],
                  'name' => $next_row['ExerciseName'],
                  'mid' => $next_row['MID'],
                  );
        $exercises[] = $json_obj;  
      }
    }

    return $exercises;
  }

  public static function getExercisesByEid($eid){
    $mysqli = Exercise::connect();

    $result = $mysqli->query("SELECT EID, ExerciseName, MID FROM Exercises WHERE EID = " . $eid);

    $exercises = array();

    if($result){
      $next_row = $result->fetch_array();

      $json_obj = array('eid' => $next_row['EID'],
                  'name' => $next_row['ExerciseName'],
                  'mid' => $next_row['MID']);

      return $json_obj; 
    }

    return null;
  }

  public static function deleteExerciseById($eid){
    $mysqli = Exercise::connect();

    $result = $mysqli->query("DELETE FROM Exercises WHERE EID = " . $eid);

    return "Deleted Exercise";
  }



  private function __construct($eid, $name, $userId, $mid) {
    $this->eid = $eid;
    $this->name = $name;
    $this->userId = $userId;
    $this->mid = $mid;
  }

  public function getJSON() {
    $json_obj = array('eid' => $this->eid,
                      'name' => $this->name,
                      'mid' => $this->mid
                      );

    return json_encode($json_obj);
  }
}