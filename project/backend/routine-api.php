<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

    require_once("orm/Routine.php");


  if ($_SERVER['REQUEST_METHOD'] == "GET") {

    if (isset($_REQUEST['userId'])) {
      $userId = trim($_REQUEST['userId']);

      /* If only userid specified then get all exercises based on user */
      header("Content-type: application/json");
      print(json_encode(Routine::getRoutines($userId)));
      exit();
    } 

  } else if ($_SERVER['REQUEST_METHOD'] == "POST") {


     if (isset($_REQUEST['rid'])) {
        $rid = trim($_REQUEST['rid']);
        $success = Routine::deleteRoutineById($rid);
        print($success);
        exit();
     }

        /* Create the new exercise */
    if (isset($_REQUEST['name'])) {
      $name = trim($_REQUEST['name']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing routine name");
      exit();
    }

    if (isset($_REQUEST['userId'])) {
      $userId = trim($_REQUEST['userId']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing user id");
      exit();
    }



    // Create new User via ORM
    $routine = Routine::create($name, $userId);

      // Report if failed
    if ($routine == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new Routine.");
      exit();
    }
      
    //Generate JSON encoding of new User
    header("Content-type: application/json");
    print($routine->getJSON());
    exit();

  }


?>