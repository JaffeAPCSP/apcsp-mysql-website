<?php
include 'db.php';

// Testing!!
// $_POST['username'] = 'rogerjaffe';
// $_POST['password'] = '';
// $_POST['db'] = 'school';
// $_POST['query'] = 'SELECT * FROM names';

if (isset($_POST['username']) && ($_POST['username'] != '') &&
    isset($_POST['password']) && 
    isset($_POST['db']) && ($_POST['db'] != '') &&
    isset($_POST['query']) && ($_POST['query'] != '')) {

  $db = new Db($_POST['username'], $_POST['password'], $_POST['db']);
  echo json_encode($db->query($_POST['query']));
} else {
  echo json_encode(array('error' => TRUE, 'msg' => 'Parameter error'));
}

?>