<?php

    require_once(__DIR__ . "/../model/config.php"); //inserts code from config.php to dis one; DIR concatinates the actual directory to database

    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
//        NOT NULL because the username has to be said it cant be blank; varchar(30) is the username can only have 30 characters
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL,"
//        salt is used to create a little bit more security
        . "salt char(128) NOT NULL,"
        . "exp int(4),"
        . "exp1 int(4),"
        . "exp2 int(4),"
        . "exp3 int(4),"
        . "exp4 int(4),"
        . "PRIMARY KEY (id))"); 
//    if the query works then echo the successfully line of code if not then use else
//    if($query){
//        echo "<p>Succesfuly made a table called users: </p>";
//    }
//    else {
//        echo "<p>" . $_SESSION["connection"]->error . "</p>";
//    }