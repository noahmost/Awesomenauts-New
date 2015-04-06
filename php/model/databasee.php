<?php

class Database { //classes are used to make code easier to maintain; cut down lines of code; easier to read
//classes also make the code re-usable
//the name of the class usually if not always has to have the same name as the file

    private $connection; //private means that this can only be used in this file
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

    public function __construct($host, $username, $password, $database) {
        //this lets us establish a connection with the variables and it lets us save the information in these variables
        //the __construct function also lets us define our constructors the right way and public means it lets us use it in any file
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        $this->connection = new mysqli($host, $username, $password); //mysqli was used to build a new object

        if ($this->connection->connect_error) { //if there is an error
            die("<p>error: " . $this->connection->connect_error) . "</p>"; //die no more code to be executed
        }
        $exists = $this->connection->select_db($database); //if database exists or doesnt exist it will be stored here

        if (!$exists) { //checking if we can connect to the database; ! means doesnt exist
            $query = $this->connection->query("CREATE DATABASE $database"); //a query that gets applied to our connection; if there is no database create one

            if ($query) { //if this is true then it is successful
                echo "<p>successfully created database: " . $database . "</p>";
            }
        } //objects let us store information and modify it and use the information
      // else {
       //     echo "<p>database has already been created</p>"; // if the database is already created echo database here
       // }
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) { //if there is an error
            die("<p>error: " . $this->connection->connect_error) . "</p>"; //die no more code to be executed
        }
    }

    // a function is a block of statements that can be used repeatedly;
    // a function will be executed when it is called on
    public function closeConnection() {
        //isset is basically checking whether or not the variable has been set; 
        //its checking if there is something inside of the variable; 
        //if there is nothing it will return no; if there is info it will return true
        if (isset($this->connection)) {
            $this->connection->close();
        }
    }

    public function query($string) { //everytime we call the query function we have to pass it a string 
        // open a connection
        $this->openConnection();
        // here is where we query the database; this accesses the connection function then the query function
        $query = $this->connection->query($string);
        //the exlamation point means if this is true it will show false
        if(!$query){
            $this->error = $this->connection->error;
        }

        //closes the connection
        $this->closeConnection();
        //this returns the query variable and prints out what it  contains to the screen
        return $query;
    }

}
