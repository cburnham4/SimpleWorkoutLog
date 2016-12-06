<?php
date_default_timezone_set('America/New_York');
class Routine
{
  private $rid;
  private $name;
  private $userId;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function getRoutines($uid){
    $mysqli = Routine::connect();

    $result = $mysqli->query("SELECT RID, RoutineName FROM Routines WHERE UserID = " . $uid);

    $routines = array();

    if($result){
      while($next_row = $result->fetch_array()){
        $json_obj = array('rid' => $next_row['RID'],
                  'name' => $next_row['RoutineName']
                  );
        $routines[] = $json_obj;  
      }
    }

    return $routines;
  }

  public static function create($name, $userId) {
    $mysqli = Routine::connect();

    /* Insert user into users */
    $result = $mysqli->query("INSERT INTO Routines (RoutineName, UserID)
     VALUES (" . "'" . $mysqli->real_escape_string($name) . "', " .
           "'" . $mysqli->real_escape_string($userId) . "' )" );
            

    if ($result) {
      $rid = $mysqli->insert_id;
      return new Routine($rid, $name, $userId);
    }
    return null;
  }

  /* Delete the set based on sid */
  public static function deleteRoutineById($rid){
  $mysqli = Routine::connect();

    $result = $mysqli->query("DELETE FROM Routines WHERE RID = " . $rid);

    if($result == TRUE){
      return "Successful Deletion";
    }else{
      return "Deletion failed";
    }

    return "Deleted Set";
  }

  private function __construct($rid, $name, $userId) {
    $this->rid = $rid;
    $this->name = $name;
    $this->userId = $userId;
  }

  public function getJSON() {
    $json_obj = array('rid' => $this->rid,
                      'name' => $this->name,
                      'uid' => $this->userId
                      );

    return json_encode($json_obj);
  }

}

?>