<?php
date_default_timezone_set('America/New_York');
class Muscle
{
  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function getMuscles(){
    $mysqli = Muscle::connect();

    $result = $mysqli->query("SELECT MID, MuscleName FROM Muscles");

    $muslces = array();

    if($result){
      while($next_row = $result->fetch_array()){
        $json_obj = array('mid' => $next_row['MID'],
                  'name' => $next_row['MuscleName']
                  );
        $muslces[] = $json_obj;  
      }
    }

    return $muslces;
  }

  public static function getExercisesByMid($uid, $mid) {
    $mysqli = Muscle::connect();

    $result = $mysqli->query("SELECT EID, ExerciseName FROM Exercises Where MID = 
      " . $mysqli->real_escape_string($mid) ." AND UserID = " . $mysqli->real_escape_string($uid));

    $exercises = array();

    if($result){
      while($next_row = $result->fetch_array()){
        $json_obj = array('eid' => $next_row['EID'],
                  'name' => $next_row['ExerciseName'], 
                  'mid' => $mid
                  );
        $exercises[] = $json_obj;  
      }
    }

    return $exercises;


  }

}