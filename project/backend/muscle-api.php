<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

    require_once("orm/Muscle.php");

  /* Check for GET request */
  if ($_SERVER['REQUEST_METHOD'] == "GET") {

    header("Content-type: application/json");
    print(json_encode(Muscle::getMuscles()));
    exit();


  } 
?>