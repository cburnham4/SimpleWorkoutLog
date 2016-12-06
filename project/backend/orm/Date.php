<?php
date_default_timezone_set('America/New_York');


  require_once("orm/Set.php");
class Date{

  private $did;
  private $date_lifted;

  public static function connect() {
    return new mysqli("classroom.cs.unc.edu", 
          "cvburnha", 
          "tiger", 
          "cvburnhadb");
  }

  public static function create($eid) {
    $mysqli = Date::connect();

    $date = date('Y-m-d');

    /* Insert date into dates */
    $result = $mysqli->query("INSERT INTO DaysTable (Date, EID)
     VALUES (" . "'" . $date . "', " .
			     "'" . $mysqli->real_escape_string($eid) . "') ");

    if ($result) {
      $did = $mysqli->insert_id;
      return new Date(intval($did),$date);
    }
    
    return null;
  }

  /* Return the date object of today for that date */
  public static function findDate($eid) {
    $mysqli = Date::connect();

    /* Create a date object for today */
    $date = date('Y-m-d');
    
    /* select the date into the database */
    $result = $mysqli->query("select DID, Date from DaysTable
      where EID = '" . $eid  ."' AND Date = '" . $date . "'");
    if ($result) {
      if ($result->num_rows == 0) {
	     return null;
      }

      /* If date is found then get the data and return it */
      $date_info = $result->fetch_array();
      $did = $date_info['DID'];
      $date = $date_info['Date'];
  
      return new Date(intval($did),$date);
    }

    print("No date found");
    return null;
  }

    /* Get all the sets and dates for that exercise Id */
  public static function getDateSets($eid){
    $mysqli = Date::connect();

    /* Get all the days for that exercise */
    $sql_dates = "select DID, Date from DaysTable
      where EID = '" . $eid  ."'";

    $result_dates = $mysqli->query($sql_dates);

    if($result_dates){
      if ($result_dates->num_rows == 0) {
        return null;
      }
      $days = array();

      while($next_row = $result_dates->fetch_array()){
        $did = $next_row['DID'];
        $date = $next_row['Date'];
        $past_sets = Set::getSetsByDay($did);


        $json_obj = array('did' => $did,
                  'date' => $date,
                  'past_sets' => $past_sets
                  );
        $days[] = $json_obj;  
      }

      return $days;
    }
    return null;
  }

  private function __construct($did, $date) {
    $this->did = $did;
    $this->date_lifted = $date;
  }




  public function getJSON() {
    $json_obj = array('did' => $this->did,
                      'date' => $this->date_lifted
                      );

    return json_encode($json_obj);
  }
}