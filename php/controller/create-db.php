<?php

    require_once(__DIR__ . "/../model/config.php"); //inserts code from config.php to dis one; DIR concatinates the actual directory to database
    //instead of $connection we put $_SESSION
    $query = $_SESSION["connection"]->query("CREATE TABLE posts ( " //this creates a table so we can put info in dbase; table is called posts
            . "id int(11) NOT NULL AUTO_INCREMENT," //the id is an integer 
            . "title varchar(255) NOT NULL," // the title is a string of characters
            . "post text NOT NULL," // the post is text
            . "DateTime datetime NOT NULL,"
            . "PRIMARY KEY (id))"); //theres up to 11 values in the integer so we can generate up to 1 billion ids
    // not null means id cant be empty; 
    
//    if($query){
//        echo "<p>succesfully created table: posts</p>";
//    }
// else {
//        echo "<p>" . $_SESSION["connection"]->error . "</p>"; //<p> works like html makes them into paragraphs
//}
$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
//        NOT NULL because the username has to be said it cant be blank; varchar(30) is the username can only have 30 characters
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL,"
//        salt is used to create a little bit more security
        . "salt char(128) NOT NULL,"
        . "PRIMARY KEY (id))"); 
//    if the query works then echo the successfully line of code if not then use else
//    if($query){
//        echo "<p>Succesfuly made a table called users: </p>";
//    }
//    else {
//        echo "<p>" . $_SESSION["connection"]->error . "</p>";
//    }