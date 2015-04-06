<?php
    require_once(__DIR__ . "/../model/config.php");
    
    $array = array(
      'exp' => '',
      'exp1' => '',
      'exp2' => '',
      'exp3' => '',
      'exp4' => '',
    );
    
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
//    this is a query where we are going to select our salt and password from users table where our username was sent in via the post
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");
    
    if($query->num_rows == 1){
        $row = $query->fetch_array();
//        check if the hashedpassword is equal to the new hashedpassword according to the salt
        if($row["password"] === crypt($password, $row["salt"])){
//            this makes sure the user has been authenticated in this session
            $_SESSION["authenticated"] = true;
            $array["exp"] = $row["exp"];
            $array["exp1"] = $row["exp1"];
            $array["exp2"] = $row["exp2"];
            $array["exp3"] = $row["exp3"];
            $array["exp4"] = $row["exp4"];
            $_SESSION["name"] = $username;
            echo json_encode($array);
        }
        else {
            echo "Invalid username and password";
        }
    }
    else {
        echo "Invalid username and password";
    }
    ?>
<html>
    <body class="loginbody">
        
    </body>
    
</html>