<?php
date_default_timezone_set('America/New_York');
class Routine
{
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

}