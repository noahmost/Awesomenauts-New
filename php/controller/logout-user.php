<?php
    require_once (__DIR__ . "/../model/config.php");
//    this deletes the variable so we are no longer aunthenticated
    unset($_SESSION["authenticated"]);
//    this makes it so that when u logout the session is over
    session_destroy();
//    makes us go back to index
    header("Location: " . $path . "index.php");
    
    