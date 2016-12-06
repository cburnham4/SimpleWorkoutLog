<?php
date_default_timezone_set('America/New_York');
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