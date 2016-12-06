<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once("orm/Set.php");


  if ($_SERVER['REQUEST_METHOD'] == "GET") {

    if (isset($_REQUEST['did'])){
      $did = trim($_REQUEST['did']);

      header("Content-type: application/json");
      print(json_encode(Set::getSetsByDay($did)));
      exit();
    }


  } /* END GET */ 
  else if ($_SERVER['REQUEST_METHOD'] == "POST") {

    /* First check for sid. If its set then delete that set */
    if(isset($_REQUEST['sid'])){
      $sid = trim($_REQUEST['sid']);
      $success = Set::deleteSetById($sid);
      print($success);
      exit();

    }

    /* Use POST for delete because delete is not allowed on the classroom server */
    /* Get exercise id */
    if (isset($_REQUEST['did']) && isset($_REQUEST['reps']) && isset($_REQUEST['weight'])) {
      $did = trim($_REQUEST['did']);
      $reps = trim($_REQUEST['reps']);
      $weight = trim($_REQUEST['weight']);

      $set = Set::insert($did, $reps, $weight);

      if($set == null){
        header("HTTP/1.0 500 Server Error");
        print("Server couldn't create new Date.");
        exit();
      }
      header("Content-type: application/json");
      print($set->getJSON());
      exit();

    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing exercise id");
      exit();
    }




  
    
  } // END POST 

  // If here, none of the above applied and URL could
  // not be interpreted with respect to RESTful conventions.
  header("HTTP/1.0 400 Bad Request");
  print("Did not understand URL");

?>