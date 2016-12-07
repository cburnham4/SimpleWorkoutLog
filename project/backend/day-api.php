<?php
  /* Allow diplaying errors */
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once("orm/Date.php");


  if ($_SERVER['REQUEST_METHOD'] == "GET") {
  	/* Get exercise id */
    if (isset($_REQUEST['eid']) && isset($_REQUEST['all'])) {
      $eid = trim($_REQUEST['eid']);
      $all = trim($_REQUEST['all']);


      /* If all is 1 then return all dates */
      if(intval($all) == 1){
        header("Content-type: application/json");
        print(json_encode(Date::getDateSets($eid)));
        exit();
      }
      $date = Date::findDate($eid);
      
      /* If the date is in the database then return its json */
      if($date != null){
      	//Generate JSON encoding of new User
	    header("Content-type: application/json");
	    print($date->getJSON());
	    exit();
    } /* ELSE: create new date in the database */
      else{
      	$date  = Date::create($eid);

      	if($date == null){
      	  header("HTTP/1.0 500 Server Error");
  	      print("Server couldn't create new Date.");
  	      exit();
      	}
    	    header("Content-type: application/json");
    	    print($date->getJSON());
    	    exit();

      }

    } 
    print(trim($_REQUEST['eid']));

    header("HTTP/1.0 400 Bad Request");
    print("Missing Parameters");
    exit();

  }

?>