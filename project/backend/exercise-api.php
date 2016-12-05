<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once("orm/User.php");


  if ($_SERVER['REQUEST_METHOD'] == "GET") {

    /* Get request parameters */
    if (isset($_GET['username'])) {
      $username = trim($_GET['username']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }

    if (isset($_GET['password'])) {
      $password = trim($_GET['password']);;
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing password");
      exit();
    }

    /* Find the user */
    $User = User::findUser($username, $password);


    if ($User == null) {
      // User not found.
      header("HTTP/1.0 404 Not Found");
      print("User: " . $username . " not found.");
      exit();
    }

    //Generate JSON encoding of new User
    header("Content-type: application/json");
    print($User->getUserId());
    exit();

  } else if ($_SERVER['REQUEST_METHOD'] == "POST") {

    /* Create the new exercise */
    if (isset($_REQUEST['name'])) {
      $username = trim($_REQUEST['name']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing exercisename");
      exit();
    }

    if (isset($_REQUEST['muscleId'])) {
      $muscleId = trim($_REQUEST['muscleId']);
    } 
    // Either creating or updating


      // Create new User via ORM
    $Exercise = Exercise::create($username, $password);

      // Report if failed
    if ($Exercise == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new Exercise.");
      exit();
    }
      
    //Generate JSON encoding of new User
    header("Content-type: application/json");
    print($exercise->getJSON());
    exit();
    
  }

  // If here, none of the above applied and URL could
  // not be interpreted with respect to RESTful conventions.
  header("HTTP/1.0 400 Bad Request");
  print("Did not understand URL");

?>