<?php
  $path_components = explode('/', $_SERVER['PATH_INFO']);

  // Note that since extra path info starts with '/'
  // First element of path_components is always defined and always empty.

  if ($_SERVER['REQUEST_METHOD'] == "GET") {
    // GET means either instance look up, index generation, or deletion

    // Following matches instance URL in form
    // /User.php/<id>
    if (isset($_REQUEST['username'])) {
      $username = trim($_REQUEST['username']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }

    if (isset($_REQUEST['password'])) {
      $password = trim($_REQUEST['password']);
    } else{
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }

    $User = User::findUser($username, $password);


    if ($User == null) {
      // User not found.
      header("HTTP/1.0 404 Not Found");
      print("User: " . $username . " not found.");
      exit();
    }

    //Generate JSON encoding of new User
    header("Content-type: application/json");
    print($new_User->getUserId());
    exit();

  } else if ($_SERVER['REQUEST_METHOD'] == "POST") {

    if (isset($_REQUEST['username'])) {
      $username = trim($_REQUEST['username']);
    } else {
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }

    if (isset($_REQUEST['password'])) {
      $password = trim($_REQUEST['password']);
    } else{
      header("HTTP/1.0 400 Bad Request");
      print("Missing username");
      exit();
    }
    // Either creating or updating


      // Create new User via ORM
    $new_User = User::create($username, $password);

      // Report if failed
    if ($new_User == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new User.");
      exit();
    }
      
    //Generate JSON encoding of new User
    header("Content-type: application/json");
    print($new_User->getUserId());
    exit();
    
  }

  // If here, none of the above applied and URL could
  // not be interpreted with respect to RESTful conventions.
  header("HTTP/1.0 400 Bad Request");
  print("Did not understand URL");

?>