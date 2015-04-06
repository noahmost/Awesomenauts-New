<?php
    require_once(__DIR__ . "/databasee.php"); //used when we want to get something
    //this starts a session on our webpage
    session_start();
//    this prevents being hacked by not letting them use a previous id that had been used before them
    session_regenerate_id(true);
    
    $path = "/NoahM.Awesomenauts-New/php/"; //when we use the variable path insert this
    
    $host = "localhost"; //variables
    $username = "root"; //whenever we use variables for configuration use config.php
    $password = "root";
    $database = "awesomenauts_db";

    if(!isset($_SESSION["connection"])){ //we wanna check whether or not this variable is called session and this session variable exists
        //this is a database object; the constructor uses this info and stores it in the variables
        $connection = new Database($host, $username, $password, $database);
        //were assigning the database object to session
        $_SESSION["connection"] = $connection;
    }