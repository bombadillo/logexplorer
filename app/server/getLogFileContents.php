<?php

require_once 'classes/FileContentsGetter.php';
require_once 'include/config.php';

$sFileName = $_GET['fileName'];

$fileContentsGetter = new FileContentsGetter();

$sFileContents = $fileContentsGetter->getFileContents(LOG_FILE_DIRECTORY . $sFileName);

echo $sFileContents;