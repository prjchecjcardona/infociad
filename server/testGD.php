<?php
  include 'upload_GoogleDrive.php';
  $drive = new GoogleDrive();
  $file = $drive->upload('files/', 'inicialBot.jpg');
  
?>