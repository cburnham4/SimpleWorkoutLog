<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require_once("orm/Routine.php");
  require_once("orm/Exercise.php");


  if ($_SERVER['REQUEST_METHOD'] == "GET") {
    
     if (isset($_REQUEST['rid'])) {
        $rid = trim($_REQUEST['rid']);

        $json_array = Routine::getExercisesByRoutine($rid);
        print(json_encode($json_array));
        exit();
     }else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing parameters");
      exit();
    }


  } else if ($_SERVER['REQUEST_METHOD'] == "POST") {

     if (isset($_REQUEST['rid']) && isset($_REQUEST['eid'])) {
        $rid = trim($_REQUEST['rid']);
        $eid = trim($_REQUEST['eid']);

        $exercise = Routine::addExerciseToRoutine($rid, $eid);
        print(json_encode($exercise));
        exit();
     }else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing parameters");
      exit();
    }


  }


?>