<?php

class FileGetter 
{
	public function getFilesInDirectory($sDirectoryName)
	{
		$bFileExists = file_exists($sDirectoryName);
		
		if (!$bFileExists) 
		{
			return false;
		}
	
		$aFileNames = preg_grep('/^([^.])/', scandir($sDirectoryName));
		
		return $aFileNames;
	}
}