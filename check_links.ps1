Get-Item "C:\Users\$env:UserName\Desktop\*.lnk" | ForEach-Object {
	$BadLinks = "C:\Users\$env:UserName\Desktop\BadLinks\";
    $WScriptShell = New-Object -COM WScript.Shell;
    $Shortcut = $WScriptShell.CreateShortcut($_.FullName);
	
    If (!(Test-Path $Shortcut.TargetPath)) { 
        If (!(Test-Path $BadLinks)) { 
			New-Item -Path $BadLinks -ItemType Directory;
        } 
		Move-Item -Path $_.FullName -Destination $BadLinks+$_.Name; 
    }
}
