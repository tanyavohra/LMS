<?php
$servername = "localhost";
$username="root";
$password="";
$database="lms(sahaay)";


//object oriented program
// $conn = new mysqli($servername,$username,$password,$database);
// if($conn->connect_error){
//     die("connection failed:".$conn->connect_error);
//     exit;
// }
// else{
//     echo "connection successful";
// }

//procedure aproch
$conn=mysqli_connect($servername,$username,$password,$database);
if($conn){
    echo "connection successful 69";
     }
    else{
        echo "connection  not successful".mysqli_connect_error();
    }
?>