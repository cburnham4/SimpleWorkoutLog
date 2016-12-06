<?php
date_default_timezone_set('America/New_York');
class Set{
  private $sid;
  private $reps;
  private $weight;
  private $did;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function insert($did, $reps, $weight) {
	    $mysqli = Set::connect();

    /* Insert date into dates */
    $result = $mysqli->query("INSERT INTO SetsTable (DID, Reps, Weight)
     VALUES (" . "'" . $mysqli->real_escape_string($did) . "', " .
     			"'" . $mysqli->real_escape_string($reps) . "', " .
			     "'" . $mysqli->real_escape_string($weight) . "') ");

    if ($result) {
      $sid = $mysqli->insert_id;
      return new Set(intval($sid), intval($reps), intval($weight), intval($did));
    }
    
    return null;
  }

  public static function getSetsByDay($did){
  	$mysqli = Set::connect();
  	$sql = "SELECT SID, DID, Reps, Weight FROM SetsTable WHERE DID = " . $did;

  	$result = $mysqli->query($sql);

    $sets = array();

    if($result){
      while($next_row = $result->fetch_array()){
        $json_obj = array('sid' => $next_row['SID'],
                  'reps' => $next_row['Reps'],
                  'weight' => $next_row['Weight'],
                  'did' => $next_row['DID']
                  );
        $sets[] = $json_obj;  
      }
    }

    return $sets;
  }

  /* Delete the set based on sid */
  public static function deleteSetById($sid){
	$mysqli = Set::connect();

    $result = $mysqli->query("DELETE FROM SetsTable WHERE SID = " . $sid);

    if($result == TRUE){
    	return "Successful Deletion";
    }else{
    	return "Deletion failed";
    }

    return "Deleted Set";
  }


  

  private function __construct($sid, $reps, $weight, $did) {
    $this->sid = $sid;
    $this->reps = $reps;
    $this->weight = $weight;
    $this->did = $did;
  }

  public function getJSON() {
    $json_obj = array('sid' => $this->sid,
                      'reps' => $this->reps,
                      'weight' => $this->weight,
                      'did' => $this->did
                      );

    return json_encode($json_obj);
  }
}