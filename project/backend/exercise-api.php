<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once("orm/Exercise.php");


  if ($_SERVER['REQUEST_METHOD'] == "GET") {

    if (isset($_REQUEST['userId'])) {
      $userId = trim($_REQUEST['userId']);

      /* If only userid specified then get all exercises based on user */
      header("Content-type: application/json");
      print(json_encode(Exercise::getExercises($userId)));
      exit();
    } 


  } /* END GET */ 
  else if ($_SERVER['REQUEST_METHOD'] == "POST") {

    /* Use POST for delete because delete is not allowed on the classroom server */
    /* Get exercise id */
    if (isset($_REQUEST['eid'])) {
      $eid = trim($_REQUEST['eid']);
      Exercise::deleteExerciseById($eid);
      exit();
    }



    /* Create the new exercise */
    if (isset($_REQUEST['name'])) {
      $name = trim($_REQUEST['name']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing exercisename");
      exit();
    }

    if (isset($_REQUEST['muscleId'])) {
      $muscleId = trim($_REQUEST['muscleId']);
    } 

    if (isset($_REQUEST['userId'])) {
      $userId = trim($_REQUEST['userId']);
    } 
    // Either creating or updating


      // Create new User via ORM
    $exercise = Exercise::create($name, $userId, $muscleId);

      // Report if failed
    if ($exercise == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new Exercise.");
      exit();
    }
      
    //Generate JSON encoding of new User
    header("Content-type: application/json");
    print($exercise->getJSON());
    exit();
    
  } // END POST 

  // If here, none of the above applied and URL could
  // not be interpreted with respect to RESTful conventions.
  header("HTTP/1.0 400 Bad Request");
  print("Did not understand URL");

?>