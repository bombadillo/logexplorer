<?php

class FileContentsGetter 
{
	public function getFileContents($sFileName)
	{
		$bFileExists = file_exists($sFileName);

		if (!$bFileExists) 
		{
			return false;
		}
	
		$sFileContents = file_get_contents($sFileName);		
		
		return $sFileContents;
	}
}