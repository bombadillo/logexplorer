<?php

define('FILE_DIRECTORY', 'E:\\Apps\\web\\demandware\\logs');

require_once 'classes/FileGetter.php';

$fileGetter = new FileGetter();

$aFileNames = $fileGetter->getFilesInDirectory(FILE_DIRECTORY);

if (!$aFileNames) $aFileNames = [];

echo json_encode($aFileNames);