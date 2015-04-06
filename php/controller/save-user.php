<?php
require_once(__DIR__ . "/../model/config.php");
//5 variables being used to pass into the code below
$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);
//updates user table and sets 5 variables where they used to be in username account
$query = $_SESSION["connection"]->query("UPDATE users SET "
        . "exp = $exp, "
        . "exp1 = $exp, "
        . "exp2 = $exp, "
        . "exp3 = $exp, "
        . "exp4 = $exp WHERE username = \"" . $_SESSION["name"]. "\""
        );
// if works echo true
if($query){
    echo "true";
}else{
//    if not echo this
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}