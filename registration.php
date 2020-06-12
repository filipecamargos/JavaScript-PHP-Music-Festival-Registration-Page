<?php
$type = $_POST['performance'];
$fname = $_POST['first_name'];
$lname = $_POST['last_name'];
$student = $_POST['student_id'];
$skill = $_POST['skill'];
$instrument = $_POST['instrument'];
$location = $_POST['location'];
$room = $_POST['room'];
$time = $_POST['time_slot'];

//Make an associative Array
$data = array(
    "type" => $type,
    "fname" => $fname,
    "lname" => $lname,
    "student" => $student,
    "skill" => $skill,
    "instrument" => $instrument,
    "location" => $location,
    "room" => $room,
    "time" =>$time
);

if ($type == "Duet"){
    $data['fnameA'] = $_POST['first_name_2'];
    $data['lnameA'] = $_POST['last_name_2'];
    $data['studentA'] = $_POST['student_id_2'];

}else{/* */}


//lets creat a file
$file = "data/data.txt";

//array empty
$current = [];

//Check for the file
if (file_exists($file)){
    $current = file_get_contents($file);
    $current = json_decode($current);
}

$current[] = $data;
$current = json_encode($current);
file_put_contents($file, $current);

echo $current;

?>