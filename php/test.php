<?php

require_once('simpletest/autorun.php');
include_once 'db.php';

class DbTest extends UnitTestCase {
  // ...

  public function testCheckDefaults() {
    $db = new Db();
    $this->assertEqual('NOT_SET', $db->username);
    $this->assertEqual('NOT_SET', $db->password);
    $this->assertEqual('NO_DB', $db->db);
  }
  
  public function testGoodConnection() {
    $db = new Db('rogerjaffe','','');
    $err = $db->connect();
    $this->assertFalse($err['error']);
  }

  public function testBadConnection() {
    $db = new Db('unknown','','');
    $err = $db->connect();
    $this->assertTrue($err['error']);
  }
  
  public function testQuery() {
    $db = new Db('rogerjaffe','','school');
    $query = "SELECT * FROM names";
    $result = $db->query($query);
    $this->assertEqual(count($result['data']), 24);
  }

  
}

?>