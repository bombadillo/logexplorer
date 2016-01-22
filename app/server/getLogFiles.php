<?php

require_once 'classes/FileGetter.php';
require_once 'include/config.php';

$fileGetter = new FileGetter();

$aFiles = $fileGetter->getFilesInDirectory(LOG_FILE_DIRECTORY);

echo json_encode($aFiles);
