<?php

//    we want to access the database object within this page
require_once(__DIR__ . "/../model/config.php");
//filter sanitize string means that any invalid characters that cannot be in strings are deleted
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

//the $$ are variables to php so we have to split them up; uniqid creates a super unique id for the password
$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
//this creates an encrypted password for us with salt
$hashedPassword = crypt($password, $salt);
//created a query which inserts into our table called users, were setting email, username, password, and salt
$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt',"
        . "exp = 0,"
        . "exp1 = 0,"
        . "exp2 = 0,"
        . "exp3 = 0,"
        . "exp4 = 0");
$_SESSION["name"] = $username;

if($query) {
//    Need this for ajax on index.php
    echo "true";
}
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}