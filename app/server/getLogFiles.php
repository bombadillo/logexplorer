<?php

require_once 'classes/FileGetter.php';
require_once 'include/config.php';

$fileGetter = new FileGetter();

$aFiles = $fileGetter->getFilesInDirectory('../../../web/demandware/logs');

echo json_encode($aFiles);