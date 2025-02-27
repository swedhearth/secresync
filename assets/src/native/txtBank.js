/* 'frequent_0.081_GitHub */
const txtBankObj = {
  "EN": {
    "alert": {
      "fromMessage": {
        "q": "${ sMsg }",
        "y": "",
        "n": "Okay, I understand.",
        "i": "${ sKey }"
      },
      "offline": {
        "q": "I can't connect to the cloud.<br><br>It seems that you do not have an internet connection.",
        "y": "",
        "n": "Okay, I understand.",
        "i": "${ sKey }"
      },
      "deleteVendor": {
        "q": "Are you sure you want to delete ${ vName }?",
        "y": "Yes. Delete.",
        "n": "No! That was a mistake!",
        "i": "deleteVendorBtn"
      },
      "deleteVendorPermanent": {
        "q": "Are you sure you want to permanently delete ${ vName }?",
        "y": "Yes, definitely!<br>I understand that there is no coming back from this.",
        "n": "No!<br>Just leave it as it is!",
        "i": "deleteVendorBtn"
      },
      "deleteRevision": {
        "q": "Are you sure you want to delete the previous version of the account '${vName}'? <br><br>This action cannot be undone.",
        "y": "Yes, definitely!<br>Delete the previous version.",
        "n": "No!<br>Keep the previous version.",
        "i": "deleteVendorBtn"
      },
      "restoreRevision": {
        "q": "Are you sure you want to restore the previous version of the account '${vName}'? <br><br>The current version will be saved as the past version.",
        "y": "Yes, definitely!<br>Restore the previous version.",
        "n": "No!<br>Keep the current version.",
        "i": "restoreTrashedBtn"
      },
      "restoreTrashed": {
        "q": "Are you sure you want to restore the account '${vName}' from the bin? <br><br>The restored account's name will have today's date.",
        "y": "Yes, definitely!<br>Restore the deleted account.",
        "n": "No!<br>Leave the account in the bin.",
        "i": "restoreTrashedBtn"
      },
      "newVersion": {
        "q": "A new version of SecreSync is available.",
        "y": "Okay, update now.<br><br>The application will be restarted.",
        "n": "Do not update for now.<br><br>The application will be updated after a restart.",
        "i": "secreSync"
      },
      "noDbObjError": {
        "q": "Oops! There's an issue...<br>Some database connections are active, but no database is available.",
        "y": "Remove the connections from my device.<br>This will allow me to load my saved database or create a new one.",
        "n": "Do not remove the connection.<br>Let's reload the application and see if it hepls.",
        "i": "secreSync"
      },
      "syncDbWith": {
        "local": {
          "q": "To quickly load the database, save it in the device's memory.<br><br>This will also enable the use of data in case of no internet connection.",
          "y": "Yes, please save the Quick Access Database in the device's memory.",
          "n": "No, I prefer to load the database manually when needed.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Do you want to synchronise the database with Dropbox?",
          "y": "Yes!<br>Start!",
          "n": "No, I don't want to.<br>Thank you.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Do you want to synchronise the database with OneDrive?",
          "y": "Yes!<br>Start!",
          "n": "No, I don't want to.<br>Thank you.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Do you want to synchronise the application database with the local file on this device?", //Device Database File
          "y": "Yes!<br>Start!",
          "n": "No, I don't want to.<br>Thank you.",
          "i": "localFile"
        }
      },
      "disconnectDbFrom": {
        "local": {
          "q": "You are about to remove the Quick Access Database from this device.<br><br>You will not be able to use the data without an internet connection.",
          "y": "Remove the Quick Access Database from the device.",
          "n": "Oh, no! That was a mistake.",
          "i": "local"
        },
        "dbxFile": {
          "q": "You are about to remove the connection with the Dropbox Database.<br>The application's database will not be synchronised with the Dropbox Database.<br>The application will lose the privilege of using Dropbox.",
          "y": "Remove the connection with Dropbox.",
          "n": "Oh, no! That was a mistake.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "You are about to remove the connection with the OneDrive Database.<br>The application's database will not be synchronised with the OneDrive Database.<br>The application will lose the privilege of using OneDrive.",
          "y": "Remove the connection with OneDrive.",
          "n": "Oh, no! That was a mistake.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "You are about to remove the connection with the Database File.<br>The application's database will not be synchronised with the Database File on this device.", //Device Database File
          "y": "Remove the connection with the Database File.", //Device Database File
          "n": "Oh, no! That was a mistake.",
          "i": "localFile"
        }
      },
      "deleteExistingStore": {
        "local": {
          "q": "The Quick Access Database is present on the device.<br>What should we do?",
          "y": "Remove the Quick Access Database from the device.",
          "n": "Do not remove the Quick Access Database.",
          "i": "local"
        },
        "dbxFile": {
          "q": "A connection with the Dropbox Database exists on the device. What should we do?",
          "y": "Remove the connection with Dropbox.<br><br>The Dropbox Database will not be deleted from the cloud.",
          "n": "Do not remove the connection with Dropbox.<br><br>I still want to synchronise data with the cloud.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "A connection with the OneDrive Database exists on the device. What should we do?",
          "y": "Remove the connection with OneDrive.<br><br>The OneDrive Database will not be deleted from the cloud.",
          "n": "Do not remove the connection with OneDrive.<br><br>I still want to synchronise data with the cloud.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "A connection with the Database File exists on the device. What should we do?", ////Device Database File
          "y": "Remove the connection with the file.<br><br>The Database File will remain on the device.",//Device Database File
          "n": "Do not remove the connection.<br><br>I still want to synchronise data with the file.",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "Do you already have a file with the copy of the Database?",
        "y": "Yes, I do.<br>I want to choose the file.",
        "n": "No, I don't.<br>I need to create and save a new file.",
        "i": "localFile"
      },
      "localFileUserActivate": {
        "q": "Tap OK to allow access to the database file on this device/browser",
        "y": "OK.",
        "n": "No,<br>I don't want to give access to the database file on this device/browser.",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "There is no possibility to synchronise<br>with the Database File on this device/browser.<br><br>However, you can download a copy of the application's database.",//Device Database File
        "y": "I want to download a copy<br>of the database.",
        "n": "I do not want to download a copy<br>of the database.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Data will be imported.<br>The names of imported accounts will contain the suffix: '(i_1)'.<br><br>With each subsequent import, if the account names are identical,<br>the number after the underscore will be increased.",
        "y": "I want to import data.<br>",
        "n": "I do not want to import data.",
        "i": "impDb"
      },
      "changePassword": {
        "q": "The password and PIN of the application, which secure all connected databases, will be changed.<br><br>After the change, it will not be possible to unlock the database using the previous login credentials.",
        "y": "Yes, I want to change the login credentials.",
        "n": "No, I don't want to change anything now.",
        "i": "secreSync"
      },
      "importDbPickFile": {
        "q": "Data from the selected SecreSync file will be imported into the application database.<br><br>Please select the SecreSync database file and unlock it using the password and PIN for the database to be imported.",
        "y": "Okay, I will select the SecreSync file for import.",
        "n": "No, I don't want to import right now.",
        "i": "impDb"
      },
      "emergDbDownload": {
        "q": "A password-protected HTML file containing your database will be downloaded.<br>This ensures all your data is preserved without needing an internet connection or the SecreSync service.<br><br>The file can be opened using any browser, allowing you to view all the accounts' details and download the database in CSV, JSON, or the native SecreSync format.<br><br>\u26A0<br>\u2B07 Important \u2B07<br>When displaying or downloading the CSV or JSON copies, the details of the accounts will be unprotected.<br><br>\u2605 The downloaded emergency copy cannot be amended. \u2605",
        "y": "Okay, download the Emergency Copy now.",
        "n": "I do not want to download the Emergency Copy.",
        "i": "emergDb"
      },
      "exportDb": {
        "q": "A copy of the SecreSync database will be downloaded.<br><br>This file can be used as ${ localFileName } or can be imported into another database.<br><br>If you don't want to download the database now, close the window.",
        "y": "OK, download the entire copy of the SecreSync database.",
        "n": "Download only selected accounts.",
        "i": "expDb"
      },
      "catchLoad": {
        "q": "An unexpected connection problem occurred.<br><br>${ sName } was not loaded.",
        "y": "Remove the connection.<br>This will help solve the problem.",
        "n": "Do not remove the connection.<br>Just ignore it at this moment.",
        "i": "${ sKey }"
      },
      "catchSync": {
        "q": "An unexpected synchronisation error occurred.<br><br>${ sName } will not be synchronised.<br><br><br>The computer says:<br><br>${ cErr }",
        "y": "",
        "n": "Okay. I understand.",
        "i": "${ sKey }"
      },
      "catchUpdate": {
        "q": "An unexpected connection problem occurred.<br><br>${ sName } was not updated.<br><br><br>The computer says:<br>${ cErr }<br><br><br>The connection with the database will be removed.",
        "y": "",
        "n": "Okay. I understand.",
        "i": "${ sKey }"
      },
      "remoteRedirect": {
        "q": "You will be redirected to begin the cloud connection authorisation process.",
        "y": "Understood. Redirect me to the cloud.",
        "n": "I do not want to connect to the cloud.",
        "i": "${ sKey }"
      },
      "remoteRedirectPrivateMode": {
        "q": "The application is currently in Private Mode.<br><br>Temporary access to the device's memory is required<br>to initiate initiate cloud connection authorisation.",
        "y": "I will grant temporary access to the device's memory.<br>Redirect me to the cloud.",
        "n": "I do not want to connect to the cloud<br>at this moment.",
        "i": "${ sKey }"
      },
      "privateModeUnablePreserveLocalFile": {
        "q": "Connection to ${ sLocalName } cannot be maintained in Private Mode.<br><br>Once connected to ${ sCloudName }, you will be able to synchronise the current application with it, and then reconnect to ${ sLocalName }.",
        "y": "",
        "n": "Okay. I understand.",
        "i": "${ sLocalKey }"
      },
      "privateModeOneCloudConnectionAllowed": {
        "q": "While in Private Mode, only one cloud connection can be maintained at a time.<br><br>Connecting to ${ sCloudNameNew } will terminate your connection to ${sCloudNameCurrent}.<br><br>Once connected to ${ sCloudNameNew }, you will be able to synchronise the current application database with it.",
        "y": "Okay.<br>I understand that I will no longer be connected to ${ sCloudNameCurrent } after connecting to ${ sCloudNameNew }.",
        "n": "I don't want to connect to ${ sCloudNameNew }.",
        "i": "${ sKeyCurrent }"
      },
      "privateModeUnableSyncLocal": {
        "q": "The application is in Private Mode.<br><br>The Quick Access Database cannot be stored on the device.<br><br>To keep data on the device, you need to restart the application and allow access to the device's memory.",
        "y": "",
        "n": "Okay. I understand.",
        "i": "local"
      },
      "removePersisted": {
        "q": "The encrypted password for the Database will be removed from the device.<br><br>To unlock the database, you will need to provide the password and PIN.",
        "y": "Understood.<br>I will use the password and PIN.",
        "n": "No!<br>I do not want to remove the persisted password.",
        "i": "unlockDb"
      },
      "removePersistedLastStoreDisconnect": {
        "q": "You are removing the last connection to the Database.<br><br>The encrypted password will also be removed from the device.",
        "y": "I understand.",
        "n": "No!<br>I don't want to remove the connection to the Database or the encrypted password.",
        "i": "unlockDb"
      },
      "setOlderStore": {
        "q": "${ sName } is older than the application's data.",
        "y": "${ sName } contains data I want to use.<br><br>The application's data will be replaced.",
        "n": "I want to use the application's data.<br><br>${ sName } will be updated.",
        "i": "${ sKey }"
      },
      "remoteSyncOrOverwrite": {
        "q": "${ sName } already exists in the cloud.",
        "y": "Synchronise the application's data<br>with the cloud data.",
        "n": "Replace the cloud data<br>with the application's data.",
        "i": "${ sKey }"
      },
      "remoteLoadOrNew": {
        "q": "${ sName } already exists in the cloud.",
        "y": "Load data from the cloud.",
        "n": "Replace existing cloud data with a new database.",
        "i": "${ sKey }"
      },
      "remoteFileDelete": {
        "q": "The existing cloud database will be deleted.",
        "y": "Yes, I want to permanently remove the data and create a new database in the cloud.",
        "n": "No, I do not want to delete the data.<br>Keep the previous database in the cloud and do not connect to the cloud right now.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "There was a problem.<br>It seems that ${ sName } is connected to the application,<br>but the data could not be loaded.<br><br>It's possible that the database file has been deleted from the cloud.",
        "y": "Try again<br>to save the data in the cloud.",
        "n": "Strange situation.<br>Remove the connection with the cloud.",
        "i": "${ sKey }"
      },
      "registerAuth": {
        "q": "Would you like to enable the Web Authentication (WebAuthn) API?<br>You can choose from various methods available on your device (fingerprint, voice, eye scan, PIN, etc.).",
        "y": "Yes, I want to use the available device authentication.",
        "n": "No, I do not want to use any biometric authentication.<br>Use a different authentication method instead.",
        "i": "secreSync"
      },
      "persistOnline": {
        "q": "The online authentication method is currently unavailable.<br><br>Alternatively, you can save the encrypted password directly on the device.<br>The database password will be secured by a PIN, however, an insufficiently long PIN may allow a skilled hacker who gains access to this device to break it.",
        "y": "",
        "n": "Okay. Save the encrypted password directly on the device.<br><br>I understand that losing control of the device may result in access to my data.",
        "i": "secreSync"
      },
      "oneDriveRefreshAccess": {
        "q": "The app has lost access to OneDrive.<br>Access must be re-validated at least once every 24 hours.",
        "y": "Okay, refresh access now.",
        "n": "This is frustrating! I don't want to do this every time.",
        "i": "oneDriveFile"
      },
      "saveVendorChanges": {
        "q": "Do you want to save your changes?",
        "y": "Yes,<br>Save changes",
        "n": "No,<br>Discard changes",
        "i": "draftVendObj"
      },
      "secreSyncReset": {
        "q": "Do you want to reset the application?",
        "y": "Yes,<br>I want to remove all connections to my database and restore the application to its default settings.",
        "n": "No,<br>This was a mistake.",
        "i": "secreSyncReset"
      }
    },
    "message": {
      "appFailed":"Something went wrong...<br><br>SecreSync cannot be launched.<br><br>Try closing the application and launching it again.",
      "noWriteStores": "Oops! There's an issue... The Database is currently unavailable for modifications.",
      "IdxDbError": "Oops! There's an issue with connecting to the device storage.<br><br>The App will reload in Private Mode.",
      "storeConnectionTrue": "Successfully connected to ${ sName }.",
      "storeConnectionFalse": "${ sName } has been disconnected.",
      "storeConnectFail": "Oops! There's an issue... Unable to connect to the ${ sName } database.",
      "existingDb": "Please unlock your database to proceed.", 
      "loggedOff": "The database has been secured due to inactivity. Unlock to access data.",
      "loadDbStandard": "SecreSync is operating in Standard Mode. Load an existing database or create a new one.",
      "loadDbPrivate": "SecreSync is operating in Private Mode. Load an existing database or create a new one.",
      "dbFailed": "Unable to unlock the Database. You have ${ count } attempts remaining...",
      "logShort": "The login must be at least 3 characters.",
      "nameShort": "The Account Name must be at least 3 characters.",
      "deleteVendorReject": "The '${ vName }' Account has not been deleted.",
      "restoreRevisionReject": "The previous version of the account '${vName}' was not restored.",
      "deleteRevisionReject": "The previous version of the account '${vName}' was not deleted.",
      "restoreTrashedReject": "The account '${vName}' was not restored from the bin.",
      "deleteVendorFailed": "Oops! There's an issue... No Database is available for modifications. The '${ vName }' Account has been removed, but changes will persist only until the application is closed. Re-establish the connection to an external Database or download a copy of the Database.",
      "submitFormFailed": "Oops! There's an issue... No Database is available for modifications. The '${ vName }' Account has been updated, but changes will persist only until the application is closed. Re-establish the connection to an external Database or download a copy of the Database.",
      "submitFormSucess": "The '${ vName }' Account has been updated.",
      "submitFormSucessModerateFail": "The '${ vName }' Account updates are not reflected in the disconnected databases. Updates will be applied once the connection is restored.",
      "submitPassFailed": "Oops! There's an issue... The new password for the '${ vName }' Account cannot be saved. The password remains unchanged.",
      "vendorExists": "The account name '${ vName }' is already in use. Please choose a different name.",
      "customPassCopied": "Custom Password has been copied to the clipboard.",
      "passCopied": "Password has been copied to the clipboard.",
      "logCopied": "Login has been copied to the clipboard.",
      "pinCopied": "PIN has been copied to the clipboard.",
      "shareFail": "Specified data cannot be shared.",
      "newPassGenerated": "A new password for the account '${vName}' has been generated.",
      "vendorDeleted": "The '${ vName }' Account has been deleted.",
      "exitAppConfirm": "Press the Back Button again to exit the application.",
      "noFilePickedErr": "No Database File has been selected, or the file is corrupted. Unable to load the Database...",
      "pickFileFR": "Select the database file. Data on this file will not be modifiable...", //Device Database File
      "pickImportFile": "Select the Database File you wish to import.",
      "pickFile": "Please select a Database File...",
      "offline": "No internet connection detected. Unable to sync with the cloud.",
      "online": "Internet connection restored. You are now online.",
      "offlineCredNoVerify": "No Internet connection.<br>Cannot verify the saved password.<br>",
      "offlineCredNoSave": "No Internet connection.<br>Cannot save the password on the device.", // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      "credFormPinTooLong": "The entered PIN is too long.",
      "credFormPassTooLong": "The entered password is too long.",
      "persistedSucess": "The encrypted password has been saved on the device. You will log in with a PIN next time.",
      "persistedFail": "Oops! There's an issue... The password cannot be saved on the device.",
      "persistedDeleted": "The password has been removed from the device.",
      "persistedBadPin": "The entered PIN is incorrect. The Database cannot be unlocked. You have ${ count } more attempts to unlock it with the PIN.",
      "dbCredentialsChangeSucess": "The login credentials have been updated.",
      "dbCredentialsChangeFail": "The login credentials have not been updated.",
      "dbCredentialsChangeModerateFail": "The login credentials have not been updated in the databases with removed connections. It will not be possible to synchronise the Database with these copies.",
      "dbCredentialsChangeCriticalFail": "Connection with the database has been lost. Login credentials remain unchanged.",
      "emergDbCreated": "An emergency backup of the database has been downloaded: : ${ fName }.",
      "importDbFail": "The database could not be imported.",
      "importDbCancel": "The import of data has been cancelled.",
      "importDbSuccess": "The data has been successfully imported.",
      "exportDbFail": "There are no accounts available for export.",
      "langChanged": "The application language has been set to English.",
      "dbFileDownloaded": "The database copy is being downloaded: ${ fName }",
      "storeIsSyncing": "The ${ sName } database is currently syncing.",
      "remoteAuthorised": "Application cloud connection has been authorised.",
      "remoteConnectFail": "Cloud authorisation error. ${ sName } has not been connected.",
      "remoteConnectionCancelled": "The application's connection to the cloud has been cancelled.",
      "remoteFileMissing": "A problem occurred.<br>It seems that ${ sName } is connected to the application,<br>but the data could not be loaded.<br><br>It is possible that the database file was deleted from the cloud.<br><br>The cloud connection will be removed.",
      "noSessionStorage": "I can't connect to the cloud.<br><br>It seems like access to the browser's session storage, which is necessary for connecting the application to the cloud, has been disabled.",
      "remoteRedirectError": "I can't connect to the cloud.<br><br>An error occurred during redirection.<br><br>Please try again.",
      "textAreaLimitReached": "You have reached the maximum character limit.",
      "tapToOpenFullArchive": "Tap to open the Notification History."
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "EN": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Details of Dates",
        "detNotes": "Details of Notes",
        "detTags": "Details of Tags",
        "typeNote": "Notes",
        "typeLog": "Login Credentials",
        "vTaskChangeDetais": "Sorting Options",
        "vTaskChangeSort": "Details Options",
        "vSortCr8": "Sort by Creation Date",
        "vSortMod": "Sort by Modification Date",
        "vSortName": "Sort by Name",
        "moreMenu": "Additional Options",
        "inputBoxSearchBtn": "Search",
        "hide": "Hide",
        "deleteLeft": "Clear Input",
        "localSync": "Quick Access Database Connection",
        "dbxFileSync": "Dropbox Database Connection",
        "oneDriveFileSync": "OneDrive Database Connection",
        "localFileSync": "Device Database File Connection", //Device Database File
        "newDbLoad": "Create a New Database",
        "dbxFileLoad": "Connect to an Existing Dropbox Database or Create a New One in Dropbox",
        "oneDriveFileLoad":  "Connect to an Existing OneDrive Database or Create a New One in OneDrive",
        "localFileLoad": "Load Database from device file", //Device Database File
        "localCred": "Quick Access Database",
        "dbxFileCred": "Dropbox Database",
        "oneDriveFileCred": "OneDrive Database",
        "localFileCred": "Device Database File",
        "newDb": "New Database",
        "unlinkDb": "Disconnect Database",
        "loadNewDb": "Create a New Database",
        "reloadApp": "Log Out / Reload the Application",
        "changeDbPass": "Change application database password",
        "emergDb": "Download an Emergency Copy of the Database",
        "impDb": "Import Data from Another Database",
        "expDb": "Export Database Copy", 
        "expDbFiltered": "Choose Accounts for Export",
        "addVendorBtn": "Add an Account",
        "submitFormBtn": "Save Changes",
        "editFormBtn": "Edit an Account",
        "restoreTrashedBtn": "Restore from the bin",
        "restoreRevisionBtn": "Restore this version",
        "revisions": "Revision History",
        "previousVersion": "Previous Version",
        "nextVersion": "Next Version",
        "btnClose": "Close",
        "copyLogBtn": "Copy Login",
        "copyPassBtn": "Copy Password",
        "copyPinBtn":  "Copy PIN",
        "decrease": "Decrease",
        "increase": "Increase",
        "newPassBtn": "Generate a New Password",
        "showPassToggleBtn": "Toggle Password Visibility",
        "openLinkBtn": "Open a Hyperlink",
        "deleteVendorBtn": "Delete an Account",
        "undoChangesBtn": "Undo Changes",
        "deleteTrashedBtn": "Permanently remove from the bin",
        "deleteRevisionBtn": "Delete this version",
        "toggleToLog": "Convert a Note to Login Credentials",
        "toggleToNote": "Convert Login Credentials to a Note",
        "changeLang": "Change Language",
        "donate": "Support Our Work!",
        "appTheme": "Change Theme",
        "appWidth" : "Adjust Width",
        "appLayout": "Change Layout",
        "appLogOff": "Set Logoff Delay",
        "selfProfile": "My Profile",
        "appIconSize": "Adjust Icon Size",
        "appBlur": "Toggle Blur Effect",
        "credChecked": "Disable PIN-Only Login",
        "credUnchecked": "Enable PIN-Only Login",
        "unlockDb": "Unlock the Database",
        "protectDb": "Secure the Database",
        "formIconTypeNote": "Note Type Account",
        "formIconTypeLog": "Login Type Account",
        "formIconTypeNoteNew": "New Note Type Account",
        "formIconTypeLogNew": "New Login Type Account",
        "vCr8DateLabel": "Account Created",
        "vModDateLabel": "Account Modified",
        "local": "Quick Access Database",
        "dbxFile": "Dropbox Database",
        "oneDriveFile": "OneDrive Database",
        "localFile": "Device Database File", //Device Database File.
        "secreSync": "SecreSync",
        "share": "Share",
        "settings": "Settings",
        "msgHistory": "Notification History",
        "installApp": "Install SecreSync on this device",
        "updateApp": "A new version of SecreSync is available. Update the application",
        "restoreSettings": "Restore Defaults",
        "shareBarcodeText": "Display Password QR Code", //*Description: Generate a QR code that contains the plain password for local sharing.*
        "shareBarcodeLink": "Display Encrypted Password QR Code", //*Description: Generate a QR code with a link and a PIN to decrypt the password.*
        "shareWebshareLink": "Share Password Link with PIN", //*Description: Share a link and display a PIN to decrypt the password.*
        "draftVendObj": "Draft version",
        "wallet": "Wallet address",
        "secreSyncReset": "Reset Application"
      },
      "htmls": {
        "formLabelName": "Account Name",
        "formLabelLog": "Login / Username",
        "formLabelPass": "Password",
        "formLabelCustomPass": "Custom Password",
        "formLabelNote": "Note",
        "formLabelUrl": "Link",
        "formLabelTags": "Tags",
        "formLabelPassCplx": "Password Complexity",
        "formLabelPassLen": "Password Length",
        "formLabelPassEntropy": "Password Entropy",
        "formLabelPassGrade": "Password Grade",
        "vendorPassGradeVal": {
          "0": "Inadequate",
          "40": "Extremely Weak",
          "50": "Very Weak",
          "60": "Weak",
          "70": "Fair",
          "80": "Fine",
          "90": "Good",
          "100": "Strong",
          "110": "Very Strong",
          "120": "Great",
          "127": "Excellent",
          "200": "Superior"
        },
        "credFormTitle": "Unlock Database",
        "credFormTitleImport": "Unlock Database for Import",
        "credFormTitleNew": "Protect Database",
        "credFormPass": "Enter Your Password",
        "credFormImpPass": "Enter Import Database Password",
        "credFormPin": "Enter Your PIN",
        "credFormImportPin": "Enter Import Database PIN",
        "credFormPersist": "Remember password",
        "credFormPersistRemove": "Remove saved password",
        "credFormPassHint": "Please enter a new password. It can be between 10 and 32 characters long and contain any type of characters.",
        "credFormPinHint": "Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
        "credFormPersistHint": "Securely save the encrypted database password on the device to enable unlocking the database using the PIN only. <br>Do not enable this option if using a public device.",
        "credFormPersistRemoveHint": "Remove the saved password from the device. Next time, the database will have to be unlocked using the password and PIN.",
        "masterPasFormNewDB": "New Database",
        "masterPasFormChangePass": "Database Password Change",
        "vListHeads": {
          "empty": "No accounts found.",
          "name": "Accounts number: ${ hits }.",
          "notFound": "'<i>${ searchStr }</i>' not found.",
          "nameFound": "Found '<i>${ searchStr }</i>'. Accounts number: ${ hits }.",
          "tagsFound": "'<i>${ searchStr }</i>' found in Tags. Accounts number: ${ hits }.",
          "notesFound": "'<i>${ searchStr }</i>' found in Notes. Accounts number: ${ hits }."
        },
        "credChecked": "Save the password on the device",
        "credUnchecked": "Do not save the password on the device",
        "credCheckedPersisted": "The password is saved on the device",
        "credUncheckedPersisted": "The saved password will be removed from the device",
        "unlockDb": "Unlock Database",
        "protectDb": "Protect Database",
        "withConsent": "The app has access to the device storage.",
        "withConsentNoIdxdb": "<br>However, currently it cannot persist any database on this device.<br>It's possible that the browser's Private Mode is enabled.",
        "removeConsent": "<br>Click to activate the app's Private Mode<br>(The app will not have access to the device storage).",
        "noConsent": "The app is in Private Mode.<br>Click to enable app storage.",
        "browserIsPrivate": "The browser window is in Private mode.<br>The app will not have access to the device storage.",

        "inputBoxSearch": "Search...",
        "showBtnTxt": "Show Database Records",
        "dowloadJson": "Download Unprotected Database JSON",
        "downloadCsv": "Download Unprotected Database CVS",
        "downloadSnc": "Download Protected Database SecreSync File",
        "revision": "Version modified: ${ revisionDate }",
        "revisions": "Adjust the maximum accounts revisions stored by the application.<br>Current revisions stored: ${ value }.",
        "appWidth": "Adjust the width of the application window.<br>Current width: ${ value } pixels.",
        "appLayout": "Switch between different layouts for the application.<br>Current layout: ${value}.",
        "appLayoutMobile": "Mobile Layout",
        "appLayoutDesktop": "Desktop Layout",
        "appLogOff": "Set the delay time before the application logs off automatically.<br>Current delay: ${value} seconds.",
        "selfProfile": "My database login details:<br>Password: ${plainPassString}<br>PIN: ${plainPinString}<br>Created on: ${timestamp}",
        "appIconSize": "Change the size of the application icons.<br>Current icon size: ${value} pixels.",
        "appBlur": "Enable or disable the blur effect when the application is not in focus.<br>Current setting: ${value}.",
        "appBlurEnabled": "Enabled",
        "appBlurDisabled": "Disabled",
        "appTheme": "Switch between Light and Dark themes of the application.<br>Current theme: ${value}.",
        "darkThemeEnabled": "Dark Theme",
        "darkThemeDisabled": "Light Theme",
        "shareBarcodeText": "Generate a QR code that contains the plain password for local sharing.",
        "shareBarcodeLink": "Generate a QR code with a link and a PIN to decrypt the password.",
        "shareWebshareLink": "Share a link and display a PIN to decrypt the password.",
        "statusTypeNoteNew": "Editing a New Note-Type Account",
        "statusTypeLogNew": "Editing a New Login-Type Account",
        "statusDraftTypeNote": "Editing a New Note-Type Account: ${accountName}",
        "statusDraftTypeLog": "Editing a Login-Type Account: ${accountName}",
        "statusRevisions": "Revision History. Versions Back: ${revisionIdx}",
        "statusTypeNote": "Note-Type Account: ${accountName}",
        "statusTypeLog": "Login-Type Account: ${accountName}",
        "donate": "Support us by donating ${ donateAcc }"
      },
      "values": {
        "badPass": "Password incorrect... Removing all databases...",
        "redirectWelcome": "You're almost there. Please re-type your password.",
        "noPass": "No database password provided.",
        "userReject": "User rejected the use of the file handle."
      }
    }
  },
  "ES": {
    "alert": {
      "fromMessage": {
        "q": "${ sMsg }",
        "y": "",
        "n": "OK. Ya veo.",
        "i": "${ sKey }"
      },
      "offline": {
        "q": "No se puede conectar a la nube.<br><br>Parece que no tienes conexión a internet.",
        "y": "",
        "n": "OK. Ya veo.",
        "i": "${ sKey }"
      },
      "deleteVendor": {
        "q": "¿Realmente quieres eliminar ${vName}?",
        "y": "Sí. Eliminar.",
        "n": "¡No! ¡Fue un error!",
        "i": "deleteVendorBtn"
      },
      "deleteVendorPermanent": {
        "q": "¿Estás seguro de que quieres eliminar permanentemente a ${ vName }?",
        "y": "¡Sí, definitivamente!<br>Entiendo que no hay vuelta atrás.",
        "n": "¡No!<br>¡Déjalo como está!",
        "i": "deleteVendorBtn"
      },
      "deleteRevision": {
        "q": "¿Está seguro de que desea eliminar la versión anterior de la cuenta '${vName}'? <br><br>Esta acción no se puede deshacer.",
        "y": "¡Sí, definitivamente!<br>Elimina la versión anterior.",
        "n": "¡No!<br>Mantén la versión anterior.",
        "i": "deleteVendorBtn"
      },
      "restoreRevision": {
        "q": "¿Está seguro de que desea restaurar la versión anterior de la cuenta '${vName}'? <br><br>La versión actual se guardará como versión anterior.",
        "y": "¡Sí, definitivamente!<br>Restaura la versión anterior.",
        "n": "¡No!<br>Mantén la versión actual.",
        "i": "restoreTrashedBtn"
      },
      "restoreTrashed": {
        "q": "¿Está seguro de que desea restaurar la cuenta '${vName}' de la papelera? <br><br>El nombre de la cuenta restaurada tendrá la fecha de hoy.",
        "y": "¡Sí, definitivamente!<br>Restaura la cuenta eliminada.",
        "n": "¡No!<br>Deja la cuenta en la papelera.",
        "i": "restoreTrashedBtn"
      },
      "newVersion": {
        "q": "Una nueva versión de la App está disponible.",
        "y": "¡OK!<br>¡Actualiza la App ahora!",
        "n": "Aún no la actualices.<br>Recargaré la app manualmente.",
        "i": "secreSync"
      },
      "noDbObjError": {
        "q": "¡Ups! Hay un problema...<br>Algunas conexiones a la base de datos están activas, pero no hay ninguna base de datos disponible.",
        "y": "Elimina las conexiones de mi dispositivo.<br>Esto me permitirá cargar mi base de datos guardada o crear una nueva.",
        "n": "No elimines las conexiones.<br>Recarguemos la aplicación y veamos si esto ayuda.",
        "i": "secreSync"
      },
      "syncDbWith": {
        "local": {
          "q": "¿Desea cargar la base de datos automáticamente guardándola en la memoria de su dispositivo?",
          "y": "Sí, por favor guarde la base de datos en la memoria de mi dispositivo.",
          "n": "No, prefiero cargar la base de datos manualmente cuando sea necesario.",
          "i": "local"
        },
        "dbxFile": {
          "q": "¿Te gustaría sincronizar la App con Dropbox?",
          "y": "¡Sí!<br>¡Adelante!",
          "n": "No, no quiero.<br>Gracias.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "¿Te gustaría sincronizar la App con OneDrive?",
          "y": "¡Sí!<br>¡Adelante!",
          "n": "No, no quiero.<br>Gracias.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "¿Quieres sincronizar la base de datos de la aplicación con el archivo local en este dispositivo?",
          "y": "¡Sí!<br>¡Empieza!",
          "n": "No, no quiero.<br>Gracias.",
          "i": "localFile"
        }
      },
      "disconnectDbFrom": {
        "local": {
          "q": "Estás a punto de desconectar la Base de Datos de Acceso Rápido de este dispositivo.<br><br>Puede que no puedas usar la App sin una conexión a internet.<br>No se afectarán otras bases de datos sincronizadas.",
          "y": "¡Sí!<br><br>Elimina la Base de Datos de Acceso Rápido de este dispositivo.<br>",
          "n": "¡Oh, no!<br><br>Fue un error.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Estás a punto de desconectar la Base de Datos de Dropbox.<br>La base de datos de la App no se sincronizará con la Base de Datos de Dropbox.<br>Se revocará el permiso de la App para usar Dropbox.",
          "y": "¡Sí!<br><br>Desconecta la Base de Datos de Dropbox!",
          "n": "¡Oh, no!<br><br>Fue un error.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Estás a punto de desconectar la Base de Datos de OneDrive.<br>La base de datos de la App no se sincronizará con la Base de Datos de OneDrive.<br>Se revocará el permiso de la App para usar OneDrive.",
          "y": "¡Sí!<br><br>Desconecta la Base de Datos de OneDrive!",
          "n": "¡Oh, no!<br><br>Fue un error.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Estás a punto de eliminar la conexión con el archivo de base de datos.<br>La base de datos de la aplicación no se sincronizará con el archivo de base de datos en este dispositivo.",
          "y": "Eliminar la conexión con el archivo de base de datos.",
          "n": "¡Oh, no! Fue un error.",
          "i": "localFile"
        }
      },
      "deleteExistingStore": {
        "local": {
          "q": "Existe una base de datos de acceso rápido local. ¿Qué hacemos?",
          "y": "Eliminar la base de datos de acceso rápido existente.",
          "n": "No eliminar la base de datos de acceso rápido existente.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Hay una conexión existente con la base de datos de Dropbox. ¿Qué hacemos?",
          "y": "Eliminar la conexión actual con la base de datos de Dropbox.<br><br>Entiendo que puedo perder todos los datos.",
          "n": "No eliminar la conexión. Quiero usarla",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Hay una conexión existente con la base de datos de OneDrive. ¿Qué hacemos?",
          "y": "Eliminar la conexión actual con la base de datos de OneDrive.<br><br>Entiendo que puedo perder todos los datos.",
          "n": "No eliminar la conexión. Quiero usarla",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Existe una conexión con el archivo de base de datos en el dispositivo. ¿Qué debemos hacer?",
          "y": "Eliminar la conexión con el archivo.<br><br>El archivo de base de datos permanecerá en el dispositivo.",
          "n": "No eliminar la conexión.<br><br>Todavía quiero sincronizar los datos con el archivo.",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "¿Ya tienes un archivo con una copia de la base de datos?",
        "y": "Sí, lo tengo.<br>Quiero elegir el archivo.",
        "n": "No, no lo tengo.<br>Necesito crear y guardar un nuevo archivo.",
        "i": "localFile"
      },
      "localFileUserActivate": {
        "q": "Toca OK para permitir el acceso al archivo de base de datos en este dispositivo/navegador",
        "y": "OK.",
        "n": "No,<br>no quiero permitir el acceso al archivo de base de datos en este dispositivo/navegador.",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "No es posible sincronizar<br>con el archivo de base de datos en este dispositivo/navegador.<br><br>Sin embargo, puedes descargar una copia de la base de datos de la aplicación.",
        "y": "Quiero descargar una copia<br>de la base de datos.",
        "n": "No quiero descargar una copia<br>de la base de datos.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Se importarán datos. Los nombres de cuentas importados contendrán el sufijo: '(i_1)'.<br><br>En cada próxima importación, si los nombres de cuentas son idénticos, el número que sigue al guion bajo aumentará.<br><br>Se preservarán las fechas de creación y modificación originales de las cuentas importadas.",
        "y": "Sí. Quiero importar los datos.<br>",
        "n": "No, cambié de opinión.",
        "i": "impDb"
      },
      "changePassword": {
        "q": "La contraseña y el PIN de la aplicación, que protegen todas las bases de datos conectadas, serán cambiados.<br><br>Después del cambio, no será posible desbloquear la base de datos utilizando las credenciales anteriores.",
        "y": "Sí, quiero cambiar las credenciales.",
        "n": "No, no quiero cambiar nada ahora.",
        "i": "secreSync"
      },
      "importDbPickFile": {
        "q": "Los datos del archivo SecreSync seleccionado se importarán a la base de datos de la aplicación.<br><br>Por favor, seleccione el archivo de base de datos SecreSync y desbloquéelo utilizando la contraseña y el PIN de la base de datos que se va a importar.",
        "y": "De acuerdo, seleccionaré el archivo SecreSync para importar.",
        "n": "No, no quiero importar ahora.",
        "i": "impDb"
      },
      "emergDbDownload": {
        "q": "Se descargará un archivo HTML protegido por contraseña que contiene su base de datos.<br>Esto asegura que todos sus datos se conserven sin necesidad de una conexión a Internet o del servicio SecreSync.<br><br>El archivo se puede abrir con cualquier navegador, lo que le permite ver todos los detalles de las cuentas y descargar la base de datos en formato CSV, JSON o en el formato nativo de SecreSync.<br><br>\u26A0<br>\u2B07 Importante \u2B07<br>Al mostrar o descargar las copias CSV o JSON, los detalles de las cuentas estarán desprotegidos.<br><br>\u2605 La copia de emergencia descargada no se puede modificar. \u2605",
        "y": "De acuerdo, descargue la copia de emergencia ahora.",
        "n": "No quiero descargar la copia de emergencia.",
        "i": "emergDb"
      },
      "exportDb": {
        "q": "Se descargará una copia de la base de datos SecreSync.<br><br>Este archivo puede ser utilizado como ${ localFileName } o puede ser importado a otra base de datos.<br><br>Si no desea descargar la base de datos ahora, cierre la ventana.",
        "y": "OK, descarga la copia completa de la base de datos SecreSync.",
        "n": "Descarga solo las cuentas seleccionadas.",
        "i": "expDb"
      },
      "catchLoad": {
        "q": "Hay un problema con la conexión ${sName}.",
        "y": "Eliminemos la conexión y recarguemos la App.<br>",
        "n": "¡No! Solo ignóralo por ahora!",
        "i": "${sKey}"
      },
      "catchSync": {
        "q": "No se puede Sincronizar el ${sName}<br><br>El ordenador dice:<br><br>${cErr}",
        "y": "",
        "n": "OK. Ya veo.",
        "i": "${sKey}"
      },
      "catchUpdate": {
        "q": "Hay un problema con la conexión<br>No se puede actualizar el ${sName}<br><br>El ordenador dice:<br><br>${cErr}La conexión será eliminada.",
        "y": "",
        "n": "OK. Ya veo.",
        "i": "${sKey}"
      },
      "remoteRedirect": {
        "q": "Será redirigido para iniciar el proceso de autorización de conexión con la nube.",
        "y": "Sí, por favor diríjame a la nube para autorizar la conexión.",
        "n": "No, elijo no conectarme a la nube en este momento.",
        "i": "${ sKey }"
      },
      "remoteRedirectPrivateMode": {
        "q": "La aplicación está actualmente en modo privado.<br><br>Se requiere acceso temporal a la memoria del dispositivo<br>para iniciar la autorización de la conexión a la nube.",
        "y": "Concederé acceso temporal a la memoria del dispositivo.<br>Redirígeme a la nube.",
        "n": "No quiero conectarme a la nube<br>en este momento.",
        "i": "${ sKey }"
      },
      "privateModeUnablePreserveLocalFile": {
        "q": "La conexión a ${ sLocalName } no se puede mantener en modo privado.<br><br>Una vez conectado a ${ sCloudName }, se podrá sincronizar la aplicación actual con él, y luego volver a conectar a ${ sLocalName }.",
        "y": "",
        "n": "De acuerdo. Entiendo.",
        "i": "${ sLocalKey }"
      },
      "privateModeOneCloudConnectionAllowed": {
        "q": "En modo privado, solo se puede mantener una conexión en la nube a la vez.<br><br>Conectarse a ${ sCloudNameNew } terminará su conexión con ${ sCloudNameCurrent }. Una vez conectado a ${ sCloudNameNew }, se podrá sincronizar la base de datos de la aplicación actual con él.",
        "y": "De acuerdo.<br>Entiendo que ya no estaré conectado a ${ sCloudNameCurrent } después de conectarme a ${ sCloudNameNew }.",
        "n": "No quiero conectarme a ${ sCloudNameNew }.",
        "i": "${ sKeyCurrent }"
      },
      "privateModeUnableSyncLocal": {
        "q": "La App está en Modo Privado.<br><br>No puedes guardar la Base de Datos de Acceso Rápido en este dispositivo.<br>Para guardar los datos en el dispositivo, necesitas reiniciar la aplicación y habilitar el Almacenamiento de la App.",
        "y": "",
        "n": "OK. Ya veo.",
        "i": "local"
      },
      "removePersisted": {
        "q": "La contraseña de la base de datos cifrada será eliminada del dispositivo.<br>Tendrás que proporcionar la contraseña y el PIN para desbloquear la Base de Datos.",
        "y": "OK, ya veo.<br>Usaré la contraseña y el PIN.",
        "n": "¡No! No quiero eliminar la contraseña del dispositivo.",
        "i": "unlockDb"
      },
      "removePersistedLastStoreDisconnect": {
        "q": "Estás eliminando la última conexión a la base de datos.<br><br>La contraseña cifrada también se eliminará del dispositivo.",
        "y": "Entiendo.",
        "n": "¡No!<br>No quiero eliminar la conexión a la base de datos ni la contraseña cifrada.",
        "i": "unlockDb"
      },
      "setOlderStore": {
        "q": "${sName} es más antiguo que la base de datos de la aplicación actual.",
        "y": "${sName} contiene<br>los datos que quiero utilizar.<br><br>La base de datos de la aplicación será actualizada.",
        "n": "La base de datos de la aplicación contiene<br>los datos que quiero utilizar.<br><br>${sName} será actualizado con la base de datos de la aplicación.",
        "i": "${sKey}"
      },
      "remoteSyncOrOverwrite": {
        "q": "${ sName } no existe en la nube.",
        "y": "Sincroniza la base de datos de la aplicación con los datos de la nube.",
        "n": "Reemplaza los datos en la nube con la base de datos actual de la aplicación.",
        "i": "${ sKey }"
      },
      "remoteLoadOrNew": {
        "q": "${sName} ya existe en la nube.",
        "y": "Cargar los datos desde la nube.",
        "n": "Reemplazar los datos existentes en la nube con una nueva base de datos.",
        "i": "${sKey}"
      },
      "remoteFileDelete": {
        "q": "La base de datos en la nube existente será eliminada.",
        "y": "Sí, quiero eliminar permanentemente los datos y crear una nueva base de datos en la nube.",
        "n": "No, no quiero eliminar los datos.<br>Mantén la base de datos anterior en la nube y no te conectes a la nube ahora.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "Ocurrió un problema.<br>Parece que ${ sName } está conectada a la aplicación pero no se pudieron cargar sus datos.<br>Es posible que el archivo de la base de datos haya sido eliminado de la nube.",
        "y": "Intenta de nuevo guardar los datos en la nube.",
        "n": "Situación extraña.<br>Simplemente elimina la conexión con la nube.",
        "i": "${ sKey }"
      },
      "registerAuth": {
        "q": "¿Te gustaría habilitar la API de Autenticación Web (WebAuthn)?<br>Puedes elegir entre varios métodos disponibles en tu dispositivo (huella digital, voz, escaneo ocular, PIN, etc.).",
        "y": "Sí, quiero usar la autenticación del dispositivo disponible.",
        "n": "No, no quiero usar ninguna autenticación biométrica.<br>Utilice otro método de autenticación en su lugar.",
        "i": "secreSync"
      },
      "persistOnline": {
        "q": "El método de autenticación en línea no está disponible actualmente.<br><br>Alternativamente, puede guardar la contraseña cifrada directamente en el dispositivo.<br>La contraseña de la base de datos estará protegida por un PIN, sin embargo, un PIN insuficientemente largo puede permitir que un hacker experimentado que acceda a este dispositivo lo rompa.",
        "y": "",
        "n": "De acuerdo. Guarde la contraseña cifrada directamente en el dispositivo.<br><br>Entiendo que perder el control del dispositivo puede resultar en el acceso a mis datos.",
        "i": "secreSync"
      },
      "oneDriveRefreshAccess": {
        "q": "La aplicación ha perdido el acceso a OneDrive.<br>El acceso debe ser revalidado al menos una vez cada 24 horas.",
        "y": "De acuerdo, actualiza el acceso ahora.",
        "n": "¡Esto es frustrante! No quiero hacer esto cada vez.",
        "i": "oneDriveFile"
      },
      "saveVendorChanges": {
        "q": "¿Quieres guardar los cambios?",
        "y": "Sí,<br>Guardar cambios",
        "n": "No,<br>Descartar cambios",
        "i": "draftVendObj"
      },
      "secreSyncReset": {
        "q": "¿Quieres restablecer la aplicación?",
        "y": "Sí,<br>quiero eliminar todas las conexiones a mi base de datos y restaurar la configuración predeterminada de la aplicación.",
        "n": "No,<br>esto fue un error.",
        "i": "secreSyncReset"
      }
    },
    "message": {
      "appFailed":"Algo salió mal...<br><br>La aplicación no puede iniciar.<br><br>Intenta recargar la aplicación",
      "noWriteStores": "¡Vaya! Hay un problema... La base de datos no está disponible actualmente para modificaciones.",
      "IdxDbError": "¡Vaya! Hay un problema al conectar con el almacenamiento del dispositivo.<br><br>La aplicación se recargará en el Modo Privado.",
      "storeConnectionTrue": "Conexión exitosa a ${ sName }.",
      "storeConnectionFalse": "${ sName } se ha desconectado.",
      "storeConnectFail": "¡Vaya! Hay un problema... No se pudo conectar a la base de datos ${ sName }.",
      "existingDb": "Por favor, desbloquee su base de datos para continuar.",
      "loggedOff": "La base de datos ha sido asegurada debido a la inactividad. Desbloquee para acceder a los datos.",
      "loadDbStandard": "SecreSync está en Modo Estándar. Cargue una base de datos existente o cree una nueva.",
      "loadDbPrivate": "SecreSync está en Modo Privado. Cargue una base de datos existente o cree una nueva.",
      "dbFailed": "No se puede desbloquear la base de datos. Le quedan ${ count } intentos...",
      "logShort": "El inicio de sesión debe tener al menos 3 caracteres.",
      "nameShort": "El nombre de la cuenta debe tener al menos 3 caracteres.",
      "deleteVendorReject": "La cuenta '${ vName }' no ha sido eliminada.",
      "restoreRevisionReject": "La versión anterior de la cuenta '${vName}' no fue restaurada.",
      "deleteRevisionReject": "La versión anterior de la cuenta '${vName}' no fue eliminada.",
      "restoreTrashedReject": "La cuenta '${vName}' no fue restaurada de la papelera.",
      "deleteVendorFailed": "¡Vaya! Hay un problema... No hay base de datos disponible para modificaciones. La cuenta '${ vName }' se ha eliminado correctamente, pero los cambios solo serán visibles hasta que cierre la aplicación. Restablezca la conexión con una base de datos externa o descargue una copia de la base de datos.",
      "submitFormFailed": "¡Vaya! Hay un problema... No hay base de datos disponible para modificaciones. La cuenta '${ vName }' se ha actualizado correctamente, pero los cambios solo serán visibles hasta que cierre la aplicación. Restablezca la conexión con una base de datos externa o descargue una copia de la base de datos.",
      "submitFormSucess": "La cuenta '${ vName }' se ha actualizado.",
      "submitFormSucessModerateFail": "Las actualizaciones de la cuenta '${ vName }' no se reflejan en las bases de datos desconectadas. Las actualizaciones se aplicarán una vez que se restablezca la conexión.",
      "submitPassFailed": "¡Vaya! Hay un problema... La nueva contraseña para la cuenta '${ vName }' no se puede guardar. La contraseña permanece sin cambios.",
      "vendorExists": "El nombre de la cuenta '${ vName }' ya está en uso. Elija otro nombre.",
      "customPassCopied": "La contraseña personalizada se ha copiado al portapapeles.",
      "passCopied": "La contraseña se ha copiado al portapapeles.",
      "logCopied": "Los detalles de inicio de sesión se han copiado al portapapeles.",
      "pinCopied": "El PIN ha sido copiado al portapapeles.",
      "shareFail": "No se pueden compartir los datos especificados.",
      "newPassGenerated": "Se ha generado una nueva contraseña para la cuenta '${vName}'.",
      "vendorDeleted": "La cuenta '${ vName }' se ha eliminado.",
      "exitAppConfirm": "Presione nuevamente el botón Atrás para salir de la aplicación.",
      "noFilePickedErr": "No se ha seleccionado ningún archivo de base de datos o el archivo está dañado. No se puede cargar la base de datos...",
      "pickFileFR": "Seleccione el archivo de base de datos. Los datos en este archivo no podrán ser modificados...",
      "pickImportFile": "Seleccione el archivo de base de datos que desea importar.",
      "pickFile": "Seleccione un archivo de base de datos...",
      "offline": "No hay conexión a Internet. No se puede sincronizar con la nube.",
      "online": "Ha vuelto a estar en línea.",
      "offlineCredNoVerify": "Sin conexión a Internet.<br>No se puede verificar la contraseña guardada.<br>",
      "offlineCredNoSave": "Sin conexión a Internet.<br>No se puede guardar la contraseña en el dispositivo.", // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      "credFormPinTooLong": "El PIN ingresado es demasiado largo.",
      "credFormPassTooLong": "La contraseña ingresada es demasiado larga.",
      "persistedSucess": "La contraseña cifrada se ha guardado en el dispositivo. La próxima vez iniciará sesión con un PIN.",
      "persistedFail": "¡Vaya! Hay un problema... La contraseña no se puede guardar en el dispositivo.",
      "persistedDeleted": "La contraseña se ha eliminado del dispositivo.",
      "persistedBadPin": "El PIN ingresado es incorrecto. No se puede desbloquear la base de datos. Le quedan ${ count } intentos para desbloquearla con el PIN.",
      "dbCredentialsChangeSucess": "Las credenciales de inicio de sesión se han actualizado.",
      "dbCredentialsChangeFail": "Las credenciales de inicio de sesión no se han actualizado.",
      "dbCredentialsChangeModerateFail": "Las credenciales de inicio de sesión no se han actualizado en las bases de datos con conexiones eliminadas. No será posible sincronizar la base de datos con estas copias.",
      "dbCredentialsChangeCriticalFail": "Se ha perdido la conexión con la base de datos. Las credenciales de inicio de sesión no han sido cambiadas.",
      "emergDbCreated": "Se ha creado una copia de emergencia de la base de datos: : ${ fName }.",
      "importDbFail": "La base de datos no pudo ser importada.",
      "importDbCancel": "La importación de datos ha sido cancelada.",
      "importDbSuccess": "Los datos han sido importados con éxito.",
      "exportDbFail": "No hay cuentas disponibles para exportar.",
      "langChanged": "El idioma de la aplicación se ha establecido en Español.",
      "dbFileDownloaded": "Se está descargando la copia de la base de datos: ${ fName }",
      "storeIsSyncing": "La base de datos ${ sName } está actualmente sincronizándose.",
      "remoteAuthorised": "La conexión con la nube de la aplicación ha sido autorizada.",
      "remoteConnectFail": "Error de autorización en la nube. La ${ sName } no ha sido conectada.",
      "remoteConnectionCancelled": "La conexión de la aplicación con la nube ha sido cancelada.",
      "remoteFileMissing": "Ha ocurrido un problema.<br>Parece que ${ sName } está conectado a la aplicación,<br>pero no se pudieron cargar los datos.<br><br>Es posible que el archivo de la base de datos haya sido eliminado de la nube.<br><br>La conexión con la nube se eliminará.",
      "noSessionStorage": "No puedo conectarme a la nube.<br><br>Parece que el acceso al almacenamiento de sesión del navegador, que es necesario para conectar la aplicación a la nube, ha sido deshabilitado.",
      "remoteRedirectError": "No puedo conectarme a la nube.<br><br>Ocurrió un error durante la redirección.<br><br>Inténtalo de nuevo.",
      "textAreaLimitReached": "Has alcanzado el límite máximo de caracteres.",
      "tapToOpenFullArchive": "Toca para abrir el historial de notificaciones."
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "EN": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Detalles de fechas",
        "detNotes": "Detalles de notas",
        "detTags": "Detalles de etiquetas",
        "typeNote": "Notas",
        "typeLog": "Credenciales de inicio de sesión",
        "vTaskChangeDetais": "Opciones de ordenamiento",
        "vTaskChangeSort": "Opciones de detallado",
        "vSortCr8": "Ordenar por fecha de creación",
        "vSortMod": "Ordenar por fecha de modificación",
        "vSortName": "Ordenar por nombre",
        "moreMenu": "Opciones adicionales",
        "inputBoxSearchBtn": "Buscar",
        "hide": "Ocultar",
        "deleteLeft": "Limpiar entrada",
        "localSync": "Conexión rápida a la base de datos",
        "dbxFileSync": "Conexión a la base de datos de Dropbox",
        "oneDriveFileSync": "Conexión a la base de datos de OneDrive",
        "localFileSync": "Conexión con el archivo de base de datos del dispositivo",
        "newDbLoad": "Crear una nueva base de datos",
        "dbxFileLoad": "Conectar a una base de datos de Dropbox existente o crear una nueva en Dropbox",
        "oneDriveFileLoad": "Conectar a una base de datos de OneDrive existente o crear una nueva en OneDrive",
        "localFileLoad": "Cargar la base de datos desde el archivo del dispositivo",
        "localCred": "Base de datos de acceso rápido",
        "dbxFileCred": "Base de datos de Dropbox",
        "oneDriveFileCred": "Base de datos de OneDrive",
        "localFileCred": "Archivo de base de datos del dispositivo",
        "newDb": "Nueva base de datos",
        "unlinkDb": "Desconectar la base de datos",
        "loadNewDb": "Crear una nueva base de datos",
        "reloadApp": "Cerrar sesión / Recargar la aplicación",
        "changeDbPass": "Cambiar la contraseña de la base de datos de la aplicación",
        "emergDb": "Descargar una copia de emergencia de la base de datos",
        "impDb": "Importar datos de otra base de datos",
        "expDb": "Exportar copia de la base de datos",
        "expDbFiltered": "Elija cuentas para exportar",
        "addVendorBtn": "Añadir una cuenta",
        "submitFormBtn": "Guardar cambios",
        "editFormBtn": "Editar una cuenta",
        "restoreTrashedBtn": "Restaurar de la papelera",
        "restoreRevisionBtn": "Restaurar esta versión",
        "revisions": "Historial de revisiones",
        "previousVersion": "Versión anterior",
        "nextVersion": "Versión siguiente",
        "btnClose": "Cerrar",
        "copyLogBtn": "Copiar detalles de inicio de sesión",
        "copyPassBtn": "Copiar contraseña",
        "copyPinBtn":  "Copiar PIN",
        "decrease": "Disminuir",
        "increase": "Aumentar",
        "newPassBtn": "Generar una nueva contraseña",
        "showPassToggleBtn": "Alternar visibilidad de la contraseña",
        "openLinkBtn": "Abrir un hipervínculo",
        "deleteVendorBtn": "Eliminar una cuenta",
        "undoChangesBtn": "Deshacer cambios",
        "deleteTrashedBtn": "Eliminar permanentemente de la papelera",
        "deleteRevisionBtn": "Eliminar esta versión",
        "toggleToLog": "Convertir una nota en credenciales de inicio de sesión",
        "toggleToNote": "Convertir credenciales de inicio de sesión en nota",
        "changeLang": "Cambiar idioma",
        "donate": "¡Apoya nuestro trabajo!",
        "appTheme": "Cambiar tema",
        "appWidth": "Ajustar el ancho",
        "appLayout": "Cambiar diseño",
        "appLogOff": "Establecer retraso de cierre de sesión",
        "selfProfile": "Mi perfil",
        "appIconSize": "Ajustar el tamaño de los iconos",
        "appBlur": "Activar/Desactivar efecto de desenfoque",
        "credChecked": "Desactivar inicio de sesión solo con PIN",
        "credUnchecked": "Activar inicio de sesión solo con PIN",
        "unlockDb": "Desbloquear la base de datos",
        "protectDb": "Proteger la base de datos",
        "formIconTypeNote": "Cuenta de tipo nota",
        "formIconTypeLog": "Cuenta de tipo inicio de sesión",
        "formIconTypeNoteNew": "Nueva cuenta de tipo nota",
        "formIconTypeLogNew": "Nueva cuenta de tipo inicio de sesión",
        "vCr8DateLabel": "Fecha de creación de la cuenta",
        "vModDateLabel": "Fecha de modificación de la cuenta",
        "local": "Base de datos de acceso rápido",
        "dbxFile": "Base de datos de Dropbox",
        "oneDriveFile": "Base de datos de OneDrive",
        "localFile": "Archivo de base de datos del dispositivo",
        "secreSync": "SecreSync",
        "share": "Compartir",
        "settings": "Configuración",
        "msgHistory": "Historial de notificaciones",
        "installApp": "Instala SecreSync en este dispositivo",
        "updateApp": "Una nueva versión de SecreSync está disponible. Actualiza la aplicación",
        "restoreSettings": "Restaurar valores predeterminados",
        "shareBarcodeText": "Mostrar código QR de la contraseña",
        "shareBarcodeLink": "Mostrar código QR de la contraseña cifrada",
        "shareWebshareLink": "Compartir enlace de la contraseña con PIN",
        "draftVendObj": "Versión borrador",
        "wallet": "Dirección de la cartera",
        "secreSyncReset": "Restablecer la aplicación"
      },
      "htmls": {
        "formLabelName": "Nombre de la Cuenta",
        "formLabelLog": "Inicio de Sesión / Nombre de Usuario",
        "formLabelPass": "Contraseña",
        "formLabelCustomPass": "Contraseña Personalizada",
        "formLabelNote": "Nota",
        "formLabelUrl": "Enlace",
        "formLabelTags": "Etiquetas",
        "formLabelPassCplx": "Complejidad de la Contraseña",
        "formLabelPassLen": "Longitud de la Contraseña",
        "formLabelPassEntropy": "Entropía de la Contraseña",
        "formLabelPassGrade": "Calificación de la Contraseña",
        "vendorPassGradeVal": {
          "0": "Inadecuada",
          "40": "Extremadamente Débil",
          "50": "Muy Débil",
          "60": "Débil",
          "70": "Aceptable",
          "80": "Buena",
          "90": "Buena",
          "100": "Fuerte",
          "110": "Muy Fuerte",
          "120": "Excelente",
          "127": "Excelente",
          "200": "Superior"
        },
        "credFormTitle": "Desbloquear Base de Datos",
        "credFormTitleImport": "Desbloquear Base de Datos para Importar",
        "credFormTitleNew": "Proteger Base de Datos",
        "credFormPass": "Ingrese su contraseña",
        "credFormImpPass": "Ingrese la contraseña de la Base de Datos de Importación",
        "credFormPin": "Ingrese su PIN",
        "credFormImportPin": "Ingrese el PIN de la Base de Datos de Importación",
        "credFormPersist": "Recordar la contraseña",
        "credFormPersistRemove": "Eliminar la contraseña guardada",
        "credFormPassHint": "Por favor, ingrese una nueva contraseña. Puede tener entre 10 y 32 caracteres y contener cualquier tipo de caracteres.",
        "credFormPinHint": "Por favor, proporcione un nuevo PIN. Puede tener entre 4 y 32 caracteres y contener cualquier tipo de caracteres.",
        "credFormPersistHint": "Guarde de forma segura la contraseña cifrada de la base de datos en el dispositivo para permitir el desbloqueo de la base de datos utilizando solo el PIN. No active esta opción si está utilizando un dispositivo público.",
        "credFormPersistRemoveHint": "Elimine la contraseña guardada del dispositivo. La próxima vez, la base de datos deberá ser desbloqueada utilizando la contraseña y el PIN.",
        "masterPasFormNewDB": "Nueva Base de Datos",
        "masterPasFormChangePass": "Cambio de Contraseña de la Base de Datos",
        "vListHeads": {
          "empty": "No se encontró ninguna cuenta.",
          "name": "Número de cuentas: ${ hits }.",
          "notFound": "'<i>${ searchStr }</i>' no encontrado.",
          "nameFound": "Encontrado '<i>${ searchStr }</i>'. Número de cuentas: ${ hits }.",
          "tagsFound": "'<i>${ searchStr }</i>' encontrado en Etiquetas. Número de cuentas: ${ hits }.",
          "notesFound": "'<i>${ searchStr }</i>' encontrado en Notas. Número de cuentas: ${ hits }."
        },
        "credChecked": "Guardar la contraseña en el dispositivo",
        "credUnchecked": "No guardar la contraseña en el dispositivo",
        "credCheckedPersisted": "La contraseña está guardada en el dispositivo",
        "credUncheckedPersisted": "La contraseña guardada se eliminará del dispositivo",
        "unlockDb": "Desbloquear Base de Datos",
        "protectDb": "Proteger Base de Datos",
        "withConsent": "La aplicación tiene acceso al almacenamiento del dispositivo.",
        "withConsentNoIdxdb": "Sin embargo, actualmente no puede persistir ninguna base de datos en este dispositivo. Es posible que el modo privado del navegador esté activado.",
        "removeConsent": "Haga clic para activar el modo privado de la aplicación (la aplicación no tendrá acceso al almacenamiento del dispositivo).",
        "noConsent": "La aplicación está en modo privado. Haga clic para habilitar el almacenamiento de la aplicación.",
        "browserIsPrivate": "La aplicación está en modo privado. La ventana del navegador está en modo privado. La aplicación no tiene acceso al almacenamiento del dispositivo.",

        "inputBoxSearch": "Buscar...",
        "showBtnTxt": "Mostrar registros de la base de datos",
        "dowloadJson": "Descargar JSON de base de datos no protegida",
        "downloadCsv": "Descargar CSV de base de datos no protegida",
        "downloadSnc": "Descargar archivo SecreSync de base de datos protegida",
        "revision": "Versión modificada: ${ revisionDate }",
        "revisions": "Ajusta el número máximo de revisiones de cuentas almacenadas por la aplicación.<br>Revisiones actuales almacenadas: ${ value }.",
        "appWidth": "Ajusta el ancho de la ventana de la aplicación.<br>Ancho actual: ${ value } píxeles.",
        "appLayout": "Cambia entre diferentes diseños para la aplicación.<br>Diseño actual: ${value}.",
        "appLayoutMobile": "Diseño móvil",
        "appLayoutDesktop": "Diseño de escritorio",
        "appLogOff": "Establezca el tiempo de retraso antes de que la aplicación cierre sesión automáticamente.<br>Retraso actual: ${value} segundos.",
        "selfProfile": "Mis datos de inicio de sesión en la base de datos:<br>Contraseña: ${plainPassString}<br>PIN: ${plainPinString}<br>Creado el: ${timestamp}",
        "appIconSize": "Cambia el tamaño de los iconos de la aplicación.<br>Tamaño actual de los iconos: ${value} píxeles.",
        "appBlur": "Habilitar o deshabilitar el efecto de desenfoque cuando la aplicación no está en foco.<br>Configuración actual: ${value}.",
        "appBlurEnabled": "Habilitado",
        "appBlurDisabled": "Désactivé",
        "appTheme": "Cambia entre los temas claro y oscuro de la aplicación.<br>Tema actual: ${value}.",
        "darkThemeEnabled": "Tema oscuro",
        "darkThemeDisabled": "Tema claro",
        "shareBarcodeText": "Generar un código QR que contiene la contraseña en texto plano para compartir localmente.",
        "shareBarcodeLink": "Generar un código QR con un link y un PIN para descifrar la contraseña.",
        "shareWebshareLink": "Compartir un link y mostrar un PIN para descifrar la contraseña.",
        "statusTypeNoteNew": "Editando una nueva cuenta de tipo nota",
        "statusTypeLogNew": "Editando una nueva cuenta de tipo inicio de sesión",
        "statusDraftTypeNote": "Editando una nueva cuenta de tipo nota: ${accountName}",
        "statusDraftTypeLog": "Editando una cuenta de tipo inicio de sesión: ${accountName}",
        "statusRevisions": "Historial de revisiones. Versiones anteriores: ${revisionIdx}",
        "statusTypeNote": "Cuenta de tipo nota: ${accountName}",
        "statusTypeLog": "Cuenta de tipo inicio de sesión: ${accountName}",
        "donate": "Apóyanos donando ${ donateAcc }"
      },
      "values": {
        "badPass": "Contraseña incorrecta... Eliminando todas las bases de datos...",
        "redirectWelcome": "Casi estás allí. Por favor, vuelve a escribir tu contraseña.",
        "noPass": "No se ha proporcionado contraseña para la base de datos.",
        "userReject": "El usuario rechazó el uso del manejador de archivos."
      }
    }
  },
  "FR": {
    "alert": {
      "fromMessage": {
        "q": "${ sMsg }",
        "y": "",
        "n": "OK. Je vois.",
        "i": "${ sKey }"
      },
      "offline": {
        "q": "Impossible de se connecter au cloud.<br><br>On dirait que vous n'avez pas de connexion internet.",
        "y": "",
        "n": "OK. Je vois.",
        "i": "${ sKey }"
      },
      "deleteVendor": {
        "q": "Voulez-vous vraiment supprimer ${vName}?",
        "y": "Oui. Supprimer.",
        "n": "Non! C'était une erreur!",
        "i": "deleteVendorBtn"
      },
      "deleteVendorPermanent": {
        "q": "Êtes-vous sûr de vouloir supprimer définitivement ${ vName }?",
        "y": "Oui, absolument!<br>Je comprends qu'il n'y a pas de retour en arrière.",
        "n": "Non!<br>Laissez-le tel quel!",
        "i": "deleteVendorBtn"
      },
      "deleteRevision": {
        "q": "Êtes-vous sûr de vouloir supprimer la version précédente du compte '${vName}' ? <br><br>Cette action est irréversible.",
        "y": "Oui, absolument !<br>Supprimez la version précédente.",
        "n": "Non !<br>Gardez la version précédente.",
        "i": "deleteVendorBtn"
      },
      "restoreRevision": {
        "q": "Êtes-vous sûr de vouloir restaurer la version précédente du compte '${vName}' ? <br><br>La version actuelle sera enregistrée comme version antérieure.",
        "y": "Oui, absolument !<br>Restaurez la version précédente.",
        "n": "Non !<br>Gardez la version actuelle.",
        "i": "restoreTrashedBtn"
      },
      "restoreTrashed": {
        "q": "Êtes-vous sûr de vouloir restaurer le compte '${vName}' depuis la corbeille ? <br><br>Le nom du compte restauré aura la date d'aujourd'hui.",
        "y": "Oui, absolument !<br>Restaurez le compte supprimé.",
        "n": "Non !<br>Laissez le compte dans la corbeille.",
        "i": "restoreTrashedBtn"
      },
      "newVersion": {
        "q": "Une nouvelle version de l'application est disponible.",
        "y": "D'accord!<br>Mettez à jour l'application maintenant!",
        "n": "Ne la mettez pas à jour pour l'instant.<br>Je rechargerai l'application manuellement.",
        "i": "secreSync"
      },
      "noDbObjError": {
        "q": "Oups ! Il y a un problème...<br>Certaines connexions à la base de données sont actives, mais aucune base de données n'est disponible.",
        "y": "Supprimez les connexions de mon appareil.<br>Cela me permettra de charger ma base de données sauvegardée ou d'en créer une nouvelle.",
        "n": "Ne supprimez pas les connexions.<br>Rechargeons l'application et voyons si cela aide.",
        "i": "secreSync"
      },
      "syncDbWith": {
        "local": {
          "q": "Souhaitez-vous charger automatiquement la base de données en la sauvegardant dans la mémoire de votre appareil ?",
          "y": "Oui, veuillez sauvegarder la base de données dans la mémoire de mon appareil.",
          "n": "Non, je préfère charger la base de données manuellement lorsque c'est nécessaire.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Souhaitez-vous synchroniser l'application avec Dropbox?",
          "y": "Oui!<br>Allez-y!",
          "n": "Non, je ne veux pas.<br>Merci.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Souhaitez-vous synchroniser l'application avec OneDrive?",
          "y": "Oui!<br>Allez-y!",
          "n": "Non, je ne veux pas.<br>Merci.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Voulez-vous synchroniser la base de données de l'application avec le fichier local sur cet appareil?",
          "y": "Oui!<br>Commencez!",
          "n": "Non, je ne veux pas.<br>Merci.",
          "i": "localFile"
        }
      },
      "disconnectDbFrom": {
        "local": {
          "q": "Vous êtes sur le point de déconnecter la base de données d'accès rapide de cet appareil.<br><br>Vous pourriez ne pas pouvoir utiliser l'application sans connexion internet.<br>Aucune autre base de données synchronisée ne sera affectée.",
          "y": "Oui!<br><br>Retirez la base de données d'accès rapide de cet appareil.<br>",
          "n": "Oh non!<br><br>C'était une erreur.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Vous êtes sur le point de déconnecter la base de données Dropbox.<br>La base de données de l'application ne sera plus synchronisée avec la base de données Dropbox.<br>L'autorisation de l'application d'utiliser Dropbox sera révoquée.",
          "y": "Oui!<br><br>Déconnectez la base de données Dropbox!",
          "n": "Oh non!<br><br>C'était une erreur.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Vous êtes sur le point de déconnecter la base de données OneDrive.<br>La base de données de l'application ne sera plus synchronisée avec la base de données OneDrive.<br>L'autorisation de l'application d'utiliser OneDrive sera révoquée.",
          "y": "Oui!<br><br>Déconnectez la base de données OneDrive!",
          "n": "Oh non!<br><br>C'était une erreur.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Vous êtes sur le point de supprimer la connexion avec le fichier de base de données.<br>La base de données de l'application ne sera pas synchronisée avec le fichier de base de données sur cet appareil.",
          "y": "Supprimer la connexion avec le fichier de base de données.",
          "n": "Oh, non! C'était une erreur.",
          "i": "localFile"
        }
      },
      "deleteExistingStore": {
        "local": {
          "q": "La base de données d'accès rapide locale existe. Que faisons-nous ?",
          "y": "Supprimer la base de données d'accès rapide existante.",
          "n": "Ne pas supprimer la base de données d'accès rapide existante.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Il existe une connexion actuelle avec la base de données Dropbox. Que faisons-nous ?",
          "y": "Supprimer la connexion actuelle avec la base de données Dropbox.<br><br>Je comprends que je pourrais perdre toutes les données.",
          "n": "Ne pas supprimer la connexion. Je veux l'utiliser",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Il existe une connexion actuelle avec la base de données OneDrive. Que faisons-nous ?",
          "y": "Supprimer la connexion actuelle avec la base de données OneDrive.<br><br>Je comprends que je pourrais perdre toutes les données.",
          "n": "Ne pas supprimer la connexion. Je veux l'utiliser",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Une connexion avec le fichier de base de données existe sur l'appareil. Que devons-nous faire?",
          "y": "Supprimer la connexion avec le fichier.<br><br>Le fichier de base de données restera sur l'appareil.",
          "n": "Ne pas supprimer la connexion.<br><br>Je veux toujours synchroniser les données avec le fichier.",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "Avez-vous déjà un fichier avec une copie de la base de données?",
        "y": "Oui, j'en ai un.<br>Je veux choisir le fichier.",
        "n": "Non, je n'en ai pas.<br>Je dois créer et enregistrer un nouveau fichier.",
        "i": "localFile"
      },
      "localFileUserActivate": {
        "q": "Appuyez sur OK pour autoriser l'accès au fichier de base de données sur cet appareil/navigateur",
        "y": "OK.",
        "n": "Non,<br>je ne veux pas autoriser l'accès au fichier de base de données sur cet appareil/navigateur.",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "Il n'est pas possible de synchroniser<br>avec le fichier de base de données sur cet appareil/navigateur.<br><br>Toutefois, vous pouvez télécharger une copie de la base de données de l'application.",
        "y": "Je veux télécharger une copie<br>de la base de données.",
        "n": "Je ne veux pas télécharger une copie<br>de la base de données.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Les données seront importées. Les noms de comptes importés contiendront le suffixe : '(i_1)'.<br><br>À chaque nouvelle importation, si les noms de comptes sont identiques, le numéro suivant le trait de soulignement augmentera.<br><br>Les dates de création et de modification originales des comptes importés seront préservées.",
        "y": "Oui. Je veux importer les données.<br>",
        "n": "Non, j'ai changé d'avis.",
        "i": "impDb"
      },
      "changePassword": {
        "q": "Le mot de passe et le PIN de l'application, qui sécurisent toutes les bases de données connectées, seront modifiés.<br><br>Après la modification, il ne sera plus possible de déverrouiller la base de données en utilisant les anciennes informations de connexion.",
        "y": "Oui, je veux changer les informations de connexion.",
        "n": "Non, je ne veux rien changer pour le moment.",
        "i": "secreSync"
      },
      "importDbPickFile": {
        "q": "Les données du fichier SecreSync sélectionné seront importées dans la base de données de l'application.<br><br>Veuillez sélectionner le fichier de base de données SecreSync et le déverrouiller en utilisant le mot de passe et le code PIN de la base de données à importer.",
        "y": "D'accord, je vais sélectionner le fichier SecreSync pour l'importation.",
        "n": "Non, je ne veux pas importer maintenant.",
        "i": "impDb"
      },
      "emergDbDownload": {
        "q": "Un fichier HTML protégé par mot de passe contenant votre base de données sera téléchargé.<br>Cela garantit que toutes vos données sont préservées sans avoir besoin d'une connexion Internet ou du service SecreSync.<br><br>Le fichier peut être ouvert avec n'importe quel navigateur, vous permettant de voir tous les détails des comptes et de télécharger la base de données au format CSV, JSON ou au format natif SecreSync.<br><br>\u26A0<br>\u2B07 Important \u2B07<br>Lors de l'affichage ou du téléchargement des copies CSV ou JSON, les détails des comptes seront non protégés.<br><br>\u2605 La copie d'urgence téléchargée ne peut pas être modifiée. \u2605",
        "y": "D'accord, téléchargez la copie d'urgence maintenant.",
        "n": "Je ne veux pas télécharger la copie d'urgence.",
        "i": "emergDb"
      },
      "exportDb": {
        "q": "Une copie de la base de données SecreSync sera téléchargée.<br><br>Ce fichier peut être utilisé comme ${ localFileName } ou peut être importé dans une autre base de données.<br><br>Si vous ne souhaitez pas télécharger la base de données maintenant, fermez la fenêtre.",
        "y": "OK, téléchargez l'intégralité de la copie de la base de données SecreSync.",
        "n": "Téléchargez uniquement les comptes sélectionnés.",
        "i": "expDb"
      },
      "catchLoad": {
        "q": "Il y a un problème avec la connexion ${sName}.",
        "y": "Supprimons la connexion et rechargeons l'application.<br>",
        "n": "Non! Ignorons-le pour le moment!",
        "i": "${sKey}"
      },
      "catchSync": {
        "q": "Impossible de synchroniser le ${sName}<br><br>L'ordinateur dit :<br><br>${cErr}",
        "y": "",
        "n": "OK. Je vois.",
        "i": "${sKey}"
      },
      "catchUpdate": {
        "q": "Il y a un problème avec la connexion<br>Impossible de mettre à jour le ${sName}<br><br>L'ordinateur dit :<br><br>${cErr}La connexion sera supprimée.",
        "y": "",
        "n": "OK. Je vois.",
        "i": "${sKey}"
      },
      "remoteRedirect": {
        "q": "Vous serez redirigé pour commencer le processus d'autorisation de connexion au nuage.",
        "y": "Oui, veuillez me diriger vers le nuage pour autoriser la connexion.",
        "n": "Non, je choisis de ne pas me connecter au nuage pour l'instant.",
        "i": "${ sKey }"
      },
      "remoteRedirectPrivateMode": {
        "q": "L'application est actuellement en mode privé.<br><br>L'accès temporaire à la mémoire de l'appareil est requis<br>pour initier l'autorisation de la connexion au cloud.",
        "y": "Je vais accorder un accès temporaire à la mémoire de l'appareil.<br>Redirigez-moi vers le cloud.",
        "n": "Je ne veux pas me connecter au cloud<br>pour le moment.",
        "i": "${ sKey }"
      },
      "privateModeUnablePreserveLocalFile": {
        "q": "La connexion à ${ sLocalName } ne peut pas être maintenue en mode privé.<br><br>Une fois connecté à ${ sCloudName }, il sera possible de synchroniser l'application actuelle avec lui, puis de se reconnecter à ${ sLocalName }.",
        "y": "",
        "n": "D'accord. Je comprends.",
        "i": "${ sLocalKey }"
      },
      "privateModeOneCloudConnectionAllowed": {
        "q": "En mode privé, une seule connexion cloud peut être maintenue à la fois.<br><br>La connexion à ${ sCloudNameNew } mettra fin à votre connexion avec ${ sCloudNameCurrent }. Une fois connecté à ${ sCloudNameNew }, il sera possible de synchroniser la base de données de l'application actuelle avec lui.",
        "y": "D'accord.<br>Je comprends que je ne serai plus connecté à ${ sCloudNameCurrent } après la connexion à ${ sCloudNameNew }.",
        "n": "Je ne veux pas me connecter à ${ sCloudNameNew }.",
        "i": "${ sKeyCurrent }"
      },
      "privateModeUnableSyncLocal": {
        "q": "L'application est en mode privé.<br><br>Vous ne pouvez pas sauvegarder la base de données d'accès rapide sur cet appareil.<br>Pour sauvegarder les données sur l'appareil, vous devez redémarrer l'application et activer le stockage de l'application.",
        "y": "",
        "n": "OK. Je vois.",
        "i": "local"
      },
      "removePersisted": {
        "q": "Le mot de passe de la base de données chiffrée sera supprimé de l'appareil.<br>Vous devrez fournir le mot de passe et le PIN pour déverrouiller la base de données.",
        "y": "OK, je vois.<br>J'utiliserai le mot de passe et le PIN.",
        "n": "Non! Je ne veux pas supprimer le mot de passe de l'appareil.",
        "i": "unlockDb"
      },
      "removePersistedLastStoreDisconnect": {
      "q": "Vous supprimez la dernière connexion à la base de données.<br><br>Le mot de passe chiffré sera également supprimé de l'appareil.",
      "y": "Je comprends.",
      "n": "Non!<br>Je ne veux pas supprimer la connexion à la base de données ni le mot de passe chiffré.",
      "i": "unlockDb"
    },
      "setOlderStore": {
        "q": "${sName} est plus ancien que la base de données de l'application actuelle.",
        "y": "${sName} contient<br>les données que je souhaite utiliser.<br><br>La base de données de l'application sera mise à jour.",
        "n": "La base de données de l'application contient<br>les données que je souhaite utiliser.<br><br>${sName} sera mis à jour avec la base de données de l'application.",
        "i": "${sKey}"
      },
      "remoteSyncOrOverwrite": {
        "q": "${ sName } existe déjà dans le nuage.",
        "y": "Synchronisez la base de données de l'application avec les données du nuage.",
        "n": "Remplacez les données dans le nuage par la base de données actuelle de l'application.",
        "i": "${ sKey }"
      },
      "remoteLoadOrNew": {
        "q": "${sName} existe déjà dans le nuage.",
        "y": "Charger les données depuis le nuage.",
        "n": "Remplacer les données existantes dans le nuage par une nouvelle base de données.",
        "i": "${sKey}"
      },
      "remoteFileDelete": {
        "q": "La base de données existante dans le cloud sera supprimée.",
        "y": "Oui, je veux supprimer définitivement les données et créer une nouvelle base de données dans le cloud.",
        "n": "Non, je ne veux pas supprimer les données.<br>Laissez la base de données précédente dans le cloud et ne vous connectez pas au cloud pour le moment.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "Un problème est survenu.<br>Il semble que ${ sName } soit connecté à l'application mais ses données n'ont pas pu être chargées.<br>Il est possible que le fichier de base de données ait été supprimé du nuage.",
        "y": "Essayez à nouveau de sauvegarder les données dans le nuage.",
        "n": "Situation étrange.<br>Supprimez simplement la connexion avec le nuage.",
        "i": "${ sKey }"
      },
      "registerAuth": {
        "q": "Souhaitez-vous activer l'API d'authentification Web (WebAuthn)?<br>Vous pouvez choisir parmi les différentes méthodes disponibles sur votre appareil (empreinte digitale, voix, scan oculaire, code PIN, etc.).",
        "y": "Oui, je veux utiliser l'authentification de l'appareil disponible.",
        "n": "Non, je ne veux pas utiliser d'authentification biométrique.<br>Utilisez une autre méthode d'authentification à la place.",
        "i": "secreSync"
      },
      "persistOnline": {
        "q": "La méthode d'authentification en ligne est actuellement indisponible.<br><br>Alternativement, vous pouvez enregistrer le mot de passe crypté directement sur l'appareil.<br>Le mot de passe de la base de données sera sécurisé par un code PIN, cependant, un PIN insuffisamment long peut permettre à un hacker expérimenté qui accède à cet appareil de le casser.",
        "y": "",
        "n": "D'accord. Enregistrez le mot de passe crypté directement sur l'appareil.<br><br>Je comprends que la perte du contrôle de l'appareil peut entraîner l'accès à mes données.",
        "i": "secreSync" 
     },
      "oneDriveRefreshAccess": {
        "q": "L'application a perdu l'accès à OneDrive.<br>L'accès doit être revalidé au moins une fois toutes les 24 heures.",
        "y": "D'accord, actualisez l'accès maintenant.",
        "n": "C'est frustrant ! Je ne veux pas faire ça à chaque fois.",
        "i": "oneDriveFile"
      },
      "saveVendorChanges": {
        "q": "Voulez-vous enregistrer vos modifications?",
        "y": "Oui,<br>Enregistrer les modifications",
        "n": "Non,<br>Annuler les modifications",
        "i": "draftVendObj"
      },
      "secreSyncReset": {
        "q": "Voulez-vous réinitialiser l'application ?",
        "y": "Oui,<br>je veux supprimer toutes les connexions à ma base de données et restaurer les paramètres par défaut de l'application.",
        "n": "Non,<br>c'était une erreur.",
        "i": "secreSyncReset"
      }
    },
    "message": {
      "appFailed":"Quelque chose s'est mal passé...<br><br>L'application ne peut pas démarrer.<br><br>Essayez de recharger l'application",
      "noWriteStores": "Oups ! Il y a un problème... La base de données n'est pas disponible pour des modifications.",
      "IdxDbError": "Oups ! Il y a un problème de connexion au stockage de l'appareil.<br><br>L'application va se recharger en Mode Privé.",
      "storeConnectionTrue": "Connexion réussie à ${ sName }.",
      "storeConnectionFalse": "${ sName } a été déconnecté.",
      "storeConnectFail": "Oups ! Il y a un problème... Impossible de se connecter à la base de données ${ sName }.",
      "existingDb": "Veuillez déverrouiller votre base de données pour continuer.",
      "loggedOff": "La base de données a été sécurisée en raison d'une inactivité. Déverrouillez pour accéder aux données.",
      "loadDbStandard": "SecreSync est en Mode Standard. Chargez une base de données existante ou créez-en une nouvelle.",
      "loadDbPrivate": "SecreSync est en Mode Privé. Chargez une base de données existante ou créez-en une nouvelle.",
      "dbFailed": "Impossible de déverrouiller la base de données. Il vous reste ${ count } tentatives...",
      "logShort": "Le login doit comporter au moins 3 caractères.",
      "nameShort": "Le nom du compte doit comporter au moins 3 caractères.",
      "deleteVendorReject": "Le compte '${ vName }' n'a pas été supprimé.",
      "restoreRevisionReject": "La version précédente du compte '${vName}' n'a pas été restaurée.",
      "deleteRevisionReject": "La version précédente du compte '${vName}' n'a pas été supprimée.",
      "restoreTrashedReject": "Le compte '${vName}' n'a pas été restauré depuis la corbeille.",
      "deleteVendorFailed": "Oups ! Il y a un problème... Aucune base de données n'est disponible pour des modifications. Le compte '${ vName }' a été supprimé, mais les changements ne persisteront que jusqu'à la fermeture de l'application. Rétablissez la connexion à une base de données externe ou téléchargez une copie de la base de données.",
      "submitFormFailed": "Oups ! Il y a un problème... Aucune base de données n'est disponible pour des modifications. Le compte '${ vName }' a été mis à jour, mais les changements ne persisteront que jusqu'à la fermeture de l'application. Rétablissez la connexion à une base de données externe ou téléchargez une copie de la base de données.",
      "submitFormSucess": "Le compte '${ vName }' a été mis à jour avec succès.",
      "submitFormSucessModerateFail": "Les mises à jour du compte '${ vName }' ne sont pas reflétées dans les bases de données déconnectées. Les mises à jour seront appliquées une fois la connexion rétablie.",
      "submitPassFailed": "Oups ! Il y a un problème... Le nouveau mot de passe pour le compte '${ vName }' ne peut pas être enregistré. Le mot de passe reste inchangé.",
      "vendorExists": "Le nom de compte '${ vName }' est déjà utilisé. Veuillez choisir un autre nom.",
      "customPassCopied": "Le mot de passe personnalisé a été copié dans le presse-papiers.",
      "passCopied": "Le mot de passe a été copié dans le presse-papiers.",
      "logCopied": "Les détails de connexion ont été copiés dans le presse-papiers.",
      "pinCopied": "Le code PIN a été copié dans le presse-papiers.",
      "shareFail": "Les données spécifiées ne peuvent pas être partagées.",
      "newPassGenerated": "Un nouveau mot de passe pour le compte '${vName}' a été généré.",
      "vendorDeleted": "Le compte '${ vName }' a été supprimé avec succès.",
      "exitAppConfirm": "Appuyez à nouveau sur le bouton Retour pour quitter l'application.",
      "noFilePickedErr": "Aucun fichier de base de données n'a été sélectionné, ou le fichier est corrompu.Impossible de charger la base de données...",
      "pickFileFR": "Sélectionnez le fichier de base de données. Les données de ce fichier ne pourront pas être modifiées...",
      "pickImportFile": "Sélectionnez le fichier de base de données que vous souhaitez importer.",
      "pickFile": "Veuillez sélectionner un fichier de base de données...",
      "offline": "Aucune connexion Internet détectée. Impossible de synchroniser avec le cloud.",
      "online": "Connexion Internet rétablie. Vous êtes maintenant en ligne.",
      "offlineCredNoVerify": "Pas de connexion Internet.<br>Impossible de vérifier le mot de passe enregistré.<br>",
      "offlineCredNoSave": "Pas de connexion Internet.<br>Impossible d'enregistrer le mot de passe sur l'appareil.", // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      "credFormPinTooLong": "Le PIN saisi est trop long.",
      "credFormPassTooLong": "Le mot de passe saisi est trop long.",
      "persistedSucess": "Le mot de passe chiffré a été enregistré sur l'appareil. Vous vous connecterez avec un PIN la prochaine fois.",
      "persistedFail": "Oups ! Il y a un problème... Le mot de passe ne peut pas être enregistré sur l'appareil.",
      "persistedDeleted": "Le mot de passe a été supprimé de l'appareil.",
      "persistedBadPin": "Le PIN saisi est incorrect. La base de données ne peut pas être déverrouillée. Il vous reste ${ count } tentatives pour la déverrouiller avec le PIN.",
      "dbCredentialsChangeSucess": "Les informations d'identification de connexion ont été mises à jour avec succès.",
      "dbCredentialsChangeFail": "Les informations d'identification de connexion n'ont pas été mises à jour.",
      "dbCredentialsChangeModerateFail": "Les informations d'identification de connexion n'ont pas été mises à jour dans les bases de données dont la connexion a été supprimée. Il ne sera pas possible de synchroniser la base de données avec ces copies.",
      "dbCredentialsChangeCriticalFail": "La connexion avec la base de données a été perdue. Les identifiants de connexion n'ont pas été modifiés.",
      "emergDbCreated": "Une copie de secours de la base de données a été créée: : ${ fName }.",
      "importDbFail": "La base de données n'a pas pu être importée.",
      "importDbCancel": "L'importation des données a été annulée.",
      "importDbSuccess": "Les données ont été importées avec succès.",
      "exportDbFail": "Il n’y a aucun compte disponible pour l’exportation.",
      "langChanged": "La langue de l’application a été définie sur le Français.",
      "dbFileDownloaded": "La copie de la base de données est en cours de téléchargement : ${ fName }",
      "storeIsSyncing": "La base de données ${ sName } est actuellement en cours de synchronisation.",
      "remoteAuthorised": "La connexion au nuage de l’application a été autorisée.",
      "remoteConnectFail": "Erreur d'autorisation du cloud. La ${ sName } n'a pas été connectée.",
      "remoteConnectionCancelled": "La connexion de l'application au cloud a été annulée.",
      "remoteFileMissing": "Un problème est survenu.<br>Il semble que ${ sName } soit connecté à l'application,<br>mais les données n'ont pas pu être chargées.<br><br>Il est possible que le fichier de la base de données ait été supprimé du cloud.<br><br>La connexion au cloud sera supprimée.",
      "noSessionStorage": "Je ne peux pas me connecter au cloud.<br><br>Il semble que l'accès au stockage de session du navigateur, qui est nécessaire pour connecter l'application au cloud, ait été désactivé.",
      "remoteRedirectError": "Je ne peux pas me connecter au cloud.<br><br>Une erreur s'est produite lors de la redirection.<br><br>Veuillez réessayer.",
      "textAreaLimitReached": "Vous avez atteint la limite maximale de caractères.",
      "tapToOpenFullArchive": "Appuyez pour ouvrir l'historique des notifications."
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "EN": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Détails des Dates",
        "detNotes": "Détails des Notes",
        "detTags": "Détails des Étiquettes",
        "typeNote": "Notes",
        "typeLog": "Identifiants de Connexion",
        "vTaskChangeDetais": "Options de Tri",
        "vTaskChangeSort": "Options de Détail",
        "vSortCr8": "Trier par Date de Création",
        "vSortMod": "Trier par Date de Modification",
        "vSortName": "Trier par Nom",
        "moreMenu": "Options Supplémentaires",
        "inputBoxSearchBtn": "Rechercher",
        "hide": "Cacher",
        "deleteLeft": "Effacer l'Entrée",
        "localSync": "Connexion Rapide à la Base de Données",
        "dbxFileSync": "Connexion à la Base de Données Dropbox",
        "oneDriveFileSync": "Connexion à la Base de Données oneDriveFile",
        "localFileSync": "Connexion au fichier de base de données de l’appareil",
        "newDbLoad": "Créer une Nouvelle Base de Données",
        "dbxFileLoad": "Se Connecter à une Base de Données Dropbox Existante ou Créer une Nouvelle dans Dropbox",
        "oneDriveFileLoad":  "Se Connecter à une Base de Données OneDrive Existante ou Créer une Nouvelle dans OneDrive",
        "localFileLoad": "Charger la Base de Données à partir du fichier de l’appareil",
        "localCred": "Base de Données d'Accès Rapide",
        "dbxFileCred": "Base de Données Dropbox",
        "oneDriveFileCred": "Base de Données OneDrive",
        "localFileCred": "Fichier de Base de Données de l'appareil",
        "newDb": "Nouvelle Base de Données",
        "unlinkDb": "Déconnecter la Base de Données",
        "loadNewDb": "Créer une Nouvelle Base de Données",
        "reloadApp": "Se Déconnecter / Recharger l'Application",
        "changeDbPass": "Changer le mot de passe de la base de données de l'application",
        "emergDb": "Télécharger une Copie d'Urgence de la Base de Données",
        "impDb": "Importer des Données d'une Autre Base de Données",
        "expDb": "Exporter une copie de la base de données",
        "expDbFiltered": "Choisissez les comptes à exporter",
        "addVendorBtn": "Ajouter un Compte",
        "submitFormBtn": "Enregistrer les Modifications",
        "editFormBtn": "Éditer un Compte",
        "restoreTrashedBtn": "Restaurer de la corbeille",
        "restoreRevisionBtn": "Restaurer cette version",
        "revisions": "Historique des révisions",
        "previousVersion": "Version précédente",
        "nextVersion": "Version suivante",
        "btnClose": "Fermer",
        "copyLogBtn": "Copier les Détails de Connexion",
        "copyPassBtn": "Copier le Mot de Passe",
        "copyPinBtn":  "Copier le code PIN",
        "decrease": "Diminuer",
        "increase": "Augmenter",
        "newPassBtn": "Générer un Nouveau Mot de Passe",
        "showPassToggleBtn": "Afficher/Cacher le Mot de Passe",
        "openLinkBtn": "Ouvrir un Hyperlien",
        "deleteVendorBtn": "Supprimer un Compte",
        "undoChangesBtn": "Annuler les modifications",
        "deleteTrashedBtn": "Supprimer définitivement de la corbeille",
        "deleteRevisionBtn": "Supprimer cette version",
        "toggleToLog": "Convertir une Note en Identifiants de Connexion",
        "toggleToNote": "Convertir des Identifiants de Connexion en Note",
        "changeLang": "Changer de Langue",
        "donate": "Soutenez Notre Travail !",
        "appTheme": "Changer le thème",
        "appWidth" : "Ajuster la largeur",
        "appLayout": "Changer la disposition",
        "appLogOff": "Définir le délai de déconnexion",
        "selfProfile": "Mon profil",
        "appIconSize": "Ajuster la taille des icônes",
        "appBlur": "Activer/Désactiver l'effet de flou",
        "credChecked": "Désactiver la Connexion par PIN Uniquement",
        "credUnchecked": "Activer la Connexion par PIN Uniquement",
        "unlockDb": "Déverrouiller la Base de Données",
        "protectDb": "Sécuriser la Base de Données",
        "formIconTypeNote": "Compte de Type Note",
        "formIconTypeLog": "Compte de Type Connexion",
        "formIconTypeNoteNew": "Nouveau Compte de Type Note",
        "formIconTypeLogNew": "Nouveau Compte de Type Connexion",
        "vCr8DateLabel": "Date de création du compte",
        "vModDateLabel": "Date de modification du compte",
        "local": "Base de Données d'Accès Rapide",
        "dbxFile": "Base de Données Dropbox",
        "oneDriveFile": "Base de Données OneDrive",
        "localFile": "Fichier de base de données de l'appareil",
        "secreSync": "SecreSync",
        "share": "Partager",
        "settings": "Paramètres",
        "msgHistory": "Historique des Notifications",
        "installApp": "Installez SecreSync sur cet appareil",
        "updateApp": "Une nouvelle version de SecreSync est disponible. Mettez à jour l'application",
        "restoreSettings": "Restaurer les paramètres par défaut",
        "shareBarcodeText": "Afficher le code QR du mot de passe",
        "shareBarcodeLink": "Afficher le code QR du mot de passe chiffré",
        "shareWebshareLink": "Partager le lien du mot de passe avec le code PIN",
        "draftVendObj": "Version brouillon",
        "wallet": "Adresse du portefeuille",
        "secreSyncReset": "Réinitialiser l'application"
      },
      "htmls": {
        "formLabelName": "Nom du Compte",
        "formLabelLog": "Identifiant / Nom d'Utilisateur",
        "formLabelPass": "Mot de Passe",
        "formLabelCustomPass": "Mot de Passe Personnalisé",
        "formLabelNote": "Note",
        "formLabelUrl": "Lien",
        "formLabelTags": "Étiquettes",
        "formLabelPassCplx": "Complexité du Mot de Passe",
        "formLabelPassLen": "Longueur du Mot de Passe",
        "formLabelPassEntropy": "Entropie du Mot de Passe",
        "formLabelPassGrade": "Niveau du Mot de Passe",
        "vendorPassGradeVal": {
          "0": "Inadéquat",
          "40": "Extrêmement Faible",
          "50": "Très Faible",
          "60": "Faible",
          "70": "Passable",
          "80": "Bien",
          "90": "Bon",
          "100": "Fort",
          "110": "Très Fort",
          "120": "Excellent",
          "127": "Exceptionnel",
          "200": "Supérieur"
        },
        "credFormTitle": "Déverrouiller la Base de Données",
        "credFormTitleImport": "Déverrouiller la Base de Données pour l'Importation",
        "credFormTitleNew": "Protéger la Base de Données",
        "credFormPass": "Entrez Votre Mot de Passe",
        "credFormImpPass": "Entrez le Mot de Passe de la Base de Données d'Importation",
        "credFormPin": "Entrez Votre PIN",
        "credFormImportPin": "Entrez le PIN de la Base de Données d'Importation",
        "credFormPersist": "Se souvenir du mot de passe",
        "credFormPersistRemove": "Supprimer le mot de passe enregistré",
        "credFormPassHint": "Veuillez entrer un nouveau mot de passe. Il peut contenir entre 10 et 32 caractères et inclure tout type de caractères.",
        "credFormPinHint": "Veuillez fournir un nouveau PIN. Il peut contenir entre 4 et 32 caractères et inclure tout type de caractères.",
        "credFormPersistHint": "Enregistrez de manière sécurisée le mot de passe de la base de données chiffrée sur l'appareil pour permettre le déverrouillage de la base de données en utilisant uniquement le PIN. Ne pas activer cette option si vous utilisez un appareil public.",
        "credFormPersistRemoveHint": "Supprimez le mot de passe enregistré de l'appareil. La prochaine fois, la base de données devra être déverrouillée en utilisant le mot de passe et le PIN.",
        "masterPasFormNewDB": "Nouvelle Base de Données",
        "masterPasFormChangePass": "Changement de Mot de Passe de la Base de Données",
        "vListHeads": {
          "empty": "Aucun compte trouvé.",
          "name": "Numéro de comptes: ${ hits }.",
          "notFound": "'<i>${ searchStr }</i>' introuvable.",
          "nameFound": "Trouvé '<i>${ searchStr }</i>'. Numéro de comptes: ${ hits }.",
          "tagsFound": "'<i>${ searchStr }</i>' trouvé dans les Étiquettes. Numéro de comptes: ${ hits }.",
          "notesFound": "'<i>${ searchStr }</i>' trouvé dans les Notes. Numéro de comptes: ${ hits }."
        },
        "credChecked": "Conserver le mot de passe sur l'appareil",
        "credUnchecked": "Ne pas conserver le mot de passe sur l'appareil",
        "credCheckedPersisted": "Le mot de passe est enregistré sur l'appareil",
        "credUncheckedPersisted": "Le mot de passe enregistré sera supprimé de l'appareil",
        "unlockDb": "Déverrouiller la Base de Données",
        "protectDb": "Protéger la Base de Données",
        "withConsent": "L'application a accès au stockage de l'appareil.",
        "withConsentNoIdxdb": "Cependant, actuellement elle ne peut pas persister de base de données sur cet appareil. Il est possible que le mode Privé du navigateur soit activé.",
        "removeConsent": "Cliquez pour activer le mode Privé de l'application (l'application n'aura pas accès au stockage de l'appareil).",
        "noConsent": "L'application est en mode Privé. Cliquez pour activer le stockage de l'application.",
        "browserIsPrivate": "L'application est en mode Privé. La fenêtre du navigateur est en mode Privé. L'application n'a pas accès au stockage de l'appareil.",

        "inputBoxSearch": "Rechercher...",
        "showBtnTxt": "Afficher les enregistrements de la base de données",
        "dowloadJson": "Télécharger le JSON de la base de données non protégée",
        "downloadCsv": "Télécharger le CSV de la base de données non protégée",
        "downloadSnc": "Télécharger le fichier SecreSync de la base de données protégée",
        "revision": "Version modifiée: ${ revisionDate }",
        "revisions": "Ajustez le nombre maximum de révisions de comptes stockées par l'application.<br>Révisions actuelles stockées : ${ value }.",
        "appWidth": "Ajustez la largeur de la fenêtre de l'application.<br>Largeur actuelle : ${ value } pixels.",
        "appLayout": "Basculez entre différentes dispositions pour l'application.<br>Disposition actuelle : ${value}.",
        "appLayoutMobile": "Disposition mobile",
        "appLayoutDesktop": "Disposition de bureau",
        "appLogOff": "Définissez le temps de délai avant la déconnexion automatique de l'application.<br>Délai actuel : ${value} secondes.",
        "selfProfile": "Mes identifiants de connexion à la base de données :<br>Mot de passe : ${plainPassString}<br>PIN : ${plainPinString}<br>Créé le : ${timestamp}",
        "appIconSize": "Changez la taille des icônes de l'application.<br>Taille actuelle des icônes : ${value} pixels.",
        "appBlur": "Activez ou désactivez l'effet de flou lorsque l'application n'est pas au premier plan.<br>Paramètre actuel : ${value}.",
        "appBlurEnabled": "Activé",
        "appBlurDisabled": "Désactivé",
        "appTheme": "Basculez entre les thèmes clair et sombre de l'application.<br>Thème actuel : ${value}.",
        "darkThemeEnabled": "Thème sombre",
        "darkThemeDisabled": "Thème clair",
        "shareBarcodeText": "Générer un code QR contenant le mot de passe en clair pour le partage local.",
        "shareBarcodeLink": "Générer un code QR avec un lien et un code PIN pour déchiffrer le mot de passe.",
        "shareWebshareLink": "Partager un lien et afficher un code PIN pour déchiffrer le mot de passe.",
        "statusTypeNoteNew": "Édition d'un nouveau compte de type note",
        "statusTypeLogNew": "Édition d'un nouveau compte de type connexion",
        "statusDraftTypeNote": "Édition d'un nouveau compte de type note: ${accountName}",
        "statusDraftTypeLog": "Édition d'un compte de type connexion: ${accountName}",
        "statusRevisions": "Historique des révisions. Versions précédentes : ${revisionIdx}",
        "statusTypeNote": "Compte de type note: ${accountName}",
        "statusTypeLog": "Compte de type connexion: ${accountName}",
        "donate": "Soutenez-nous en faisant un don de ${ donateAcc }"
      },
      "values": {
        "badPass": "Mot de passe incorrect... Suppression de toutes les bases de données...",
        "redirectWelcome": "Vous y êtes presque. Veuillez retaper votre mot de passe.",
        "noPass": "Aucun mot de passe de base de données fourni.",
        "userReject": "L'utilisateur a rejeté l'utilisation du descripteur de fichier."
      }
    }
  },
  "PL": {
    "alert": {
      "fromMessage": {
        "q": "${ sMsg }",
        "y": "",
        "n": "W porzaądku, rozumiem.",
        "i": "${ sKey }"
      },
      "offline": {
        "q": "Nie mogę połączyc z chmurą.<br><br>Wygląda na to, że nie masz połączenia z internetem.",
        "y": "",
        "n": "W porządku, rozumiem.",
        "i": "${ sKey }"
      },
      "deleteVendor": {
        "q": "Czy na pewno usunąć ${ vName }?",
        "y": "Tak. Usuń",
        "n": "Nie! To byla pomyłka!",
        "i": "deleteVendorBtn"
      },
      "deleteVendorPermanent": {
        "q": "Czy na pewno chcesz trwale usunąć ${ vName }?",
        "y": "Tak, zdecydowanie!<br>Rozumiem, że nie ma odwrotu.",
        "n": "Nie!<br>Zostaw to tak, jak jest!",
        "i": "deleteVendorBtn"
      },
      "deleteRevision": {
        "q": "Czy na pewno chcesz usunąć poprzednią wersję konta '${vName}'? <br><br>Tej operacji nie można cofnąć.",
        "y": "Tak, zdecydowanie!<br>Usuń poprzednią wersję.",
        "n": "Nie!<br>Zachowaj poprzednią wersję.",
        "i": "deleteVendorBtn"
      },
      "restoreRevision": {
        "q": "Czy na pewno chcesz przywrócić poprzednią wersję konta '${vName}'? <br><br>Obecna wersja zostanie zapisana jako wersja archiwalna.",
        "y": "Tak, zdecydowanie!<br>Przywróć poprzednią wersję.",
        "n": "Nie!<br>Zachowaj obecną wersję.",
        "i": "restoreTrashedBtn"
      },
      "restoreTrashed": {
        "q": "Czy na pewno chcesz przywrócić konto '${vName}' z kosza? <br><br>Nazwa przywróconego konta będzie miała dzisiejszą datę.",
        "y": "Tak, zdecydowanie!<br>Przywróć usunięte konto.",
        "n": "Nie!<br>Pozostaw konto w koszu.",
        "i": "restoreTrashedBtn"
      },
      "newVersion": {
        "q": "Nowa wersja SecreSync jest dostępna.",
        "y": "W porządku, aktualizuj teraz.<br><br>Aplikacja zostanie ponownie uruchomiona.",
        "n": "Nie aktualizuj na razie.<br><br>Aplikacja zostanie zaktualizowana po ponownym uruchomieniu.",
        "i": "secreSync"
      },
      "noDbObjError": {
        "q": "Ups! Wystąpił problem...<br>Niektóre połączenia z bazą danych są aktywne, ale żadna baza danych nie jest dostępna.",
        "y": "Usuń połączenia z mojego urządzenia.<br>Pozwoli mi to załadować zapisaną bazę danych lub utworzyć nową.",
        "n": "Nie usuwaj połączeń.<br>Przeładujmy aplikację i zobaczmy, czy to pomoże.",
        "i": "secreSync"
      },
      "syncDbWith": {
        "local": {
          "q": "By szybko wczytywać bazę danych, zapisz ją w pamięci urządzenia.<br><br>Umożliwi to korzystanie z danych w razie braku połaczenia z internetem.",
          "y": "Tak, proszę zapisz Szybką Dazę Danych w pamięci urządzenia.",
          "n": "Nie, wolę wczytać bazę danych ręcznie, gdy będzie to potrzebne.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Czy chcesz zsynchronizowac bazę danych z Dropbox?",
          "y": "Tak jest!<br>Zaczynaj!",
          "n": "Nie, nie chcę.<br>Dziekuję.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Czy chcesz zsynchronizowac bazę danych z OneDrive?",
          "y": "Tak jest!<br>Zaczynaj!",
          "n": "Nie, nie chcę.<br>Dziekuję.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Czy chcesz zsynchronizowac bazę danych aplikacji z lokalnym plikiem na tym urządzeniu?",
          "y": "Tak jest!<br>Zaczynaj!",
          "n": "Nie, nie chce.<br>Dziekuję.",
          "i": "localFile"
        }
      },
      "disconnectDbFrom": {
        "local": {
          "q": "Własnie zamierzasz usunąć Szybka Baze Danych z tego urządzenia.<br><br>Nie bedziesz w stanie używać danych bez połączenia z internetem.",
          "y": "Usuń Szybka Bazę Danych z urządzenia.",
          "n": "O, nie! To byla pomyłka.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Wlasnie zamierzasz usunąć połączenie z Baza Danych Dropbox.<br>Baza danych aplikacji nie będzie zsynchronizowana z Bazą Danych Dropbox.<br>Aplikacja straci przywilej korzystania z Dropbox.",
          "y": "Usuń połączenie z Dropbox.",
          "n": "O, nie! To była pomyłka.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Wlasnie zamierzasz usunąć połączenie z Baza Danych OneDrive.<br>Baza danych aplikacji nie będzie zsynchronizowana z Bazą Danych OneDrive.<br>Aplikacja straci przywilej korzystania z OneDrive.",
          "y": "Usuń połączenie z OneDrive.",
          "n": "O, nie! To była pomyłka.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Wlaśnie zamierzasz usunąć połączenie z Plikiem Bazy Danych urządzenia.<br>Baza danych applikacji nie będzie zsynchronizowana z plikiem na urządzeniu.",
          "y": "Usun połączenie z Plikiem Bazy Danych.",
          "n": "O, nie! To byla pomyłka.",
          "i": "localFile"
        }
      },
      "deleteExistingStore": {
        "local": {
          "q": "Szybka Baza Danych znajduje się na urządzeniu. Co robimy?",
          "y": "Usuń Szybką Bazę Danych z urządzenia.",
          "n": "Nie usuwaj Szybkiej Bazy Danych.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Połączenie z Bazą Danych Dropbox istnieje na urządzeniu. Co robimy?",
          "y": "Usuń połączenie z Dropbox.<br><br>Baza Danych Dropbox nie zostanie usunięta z chmury.",
          "n": "Nie usuwaj polączenia z Dropbox.<br><br>Wciąż chcę synchronizowac dane z chmurą.",
          "i": "dbxFile"
        },
        "oneDriveFile": {
          "q": "Połączenie z Bazą Danych OneDrive istnieje na urządzeniu. Co robimy?",
          "y": "Usuń połączenie z OneDrive.<br><br>Baza Danych OneDrive nie zostanie usunięta z chmury.",
          "n": "Nie usuwaj polączenia z OneDrive.<br><br>Wciąż chcę synchronizowac dane z chmurą.",
          "i": "oneDriveFile"
        },
        "localFile": {
          "q": "Połączenie z Plikiem Bazy Danych istnieje na urządzeniu. Co robimy?",
          "y": "Usun połączenie z plikiem.<br><br>Plik Bazy Danych pozostanie na urządzeniu.",
          "n": "Nie usuwaj polączenia.<br><br>Wciąż chcę synchronizowac dane z plikiem.",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "Czy posiadasz plik z kopią Bazą Danych?",
        "y": "Tak. Chce wskazać plik.",
        "n": "Nie. Chce stworzyć i zapisać nowy plik.",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "Nie istnieje możliwość synchronizacji<br>z Plikiem Bazy Danych na tym urządzeniu/przeglądarce.<br><br>Możesz natomiast pobrać kopię bazy danych aplikacji.",
        "y": "Chcę pobrać kopię bazy danych.",
        "n": "Nie chce pobierać kopii bazy danych.",
        "i": "localFile"
      },
      "localFileUserActivate": {
        "q": "Kliknij OK, aby zezwolić na dostęp do pliku bazy danych na tym urządzeniu/przeglądarce",
        "y": "OK.",
        "n": "Nie,<br>nie chcę zezwalać na dostęp do pliku bazy danych na tym urządzeniu/przeglądarce.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Dane zostaną zaimportowane.<br>Nazwy importowanych kont będą zawierały sufix: '(i_1)'.<br><br>Przy każdym kolejnym imporcie, jesli nazwy kont będą identyczne,<br>numer po podkreśleniu będzie zwiększany.",
        "y": "Chcę zaimportować dane.<br>",
        "n": "Nie chcę importować danych.",
        "i": "impDb"
      },
      "changePassword": {
        "q": "Hasło i PIN aplikacji, które zabezpieczają wszystkie podłączone bazy danych, zostaną zmienione.<br><br>Po zmianie, nie będzie można odblokować bazy danych używając poprzednich danych logowania.",
        "y": "Tak, chcę zmienić dane logowania.",
        "n": "Nie, nie chcę teraz nic zmieniać.",
        "i": "secreSync"
      },
      "importDbPickFile": {
        "q": "Dane z wybranego pliku SecreSync zostaną zaimportowane do bazy danych aplikacji.<br><br>Proszę wybrać plik bazy danych SecreSync i odblokować go za pomocą hasła i PIN-u bazy danych, która ma zostać zaimportowana.",
        "y": "OK, wybiorę plik SecreSync do importu.",
        "n": "Nie, nie chcę teraz importować.",
        "i": "impDb"
      },
      "emergDbDownload": {
        "q": "Zabezpieczony hasłem plik HTML, zawierający Twoją bazę danych, zostanie pobrany.<br>Zapewni to zachowanie wszystkich danych bez potrzeby połączenia z internetem lub usługą SecreSync.<br><br>Plik będzie można otworzyć w dowolnej przeglądarce, co umożliwi wyświetlenie wszystkich szczegółów kont lub pobranie bazy danych w formacie CSV, JSON lub natywnym formacie SecreSync.<br><br>\u26A0<br>\u2B07 Ważne \u2B07<br>Podczas wyświetlania lub pobierania kopii CSV lub JSON, szczegóły kont będą niezabezpieczone.<br><br>\u2605 Pobrana kopia awaryjna nie będzie mogła być zmieniona. \u2605",
        "y": "OK, pobierz teraz kopię awaryjną.",
        "n": "Nie chcę pobierać kopii awaryjnej.",
        "i": "emergDb"
      },
      "exportDb": {
        "q": "Kopia bazy danych SecreSync zostanie pobrana.<br><br>Ten plik może być używany jako ${ localFileName } lub może być zaimportowany do innej bazy danych.<br><br>Jeśli nie chcesz teraz pobierać bazy danych, zamknij okno.",
        "y": "OK, pobierz całą kopię bazy danych SecreSync.",
        "n": "Pobierz tylko wybrane konta.",
        "i": "expDb"
      },
      "catchLoad": {
        "q": "Wystąpił nieoczekiwany problem połączenia.<br><br>${ sName } nie została wczytana.",
        "y": "Usuń połączenie.<br>To pomoże rozwiązać problem.",
        "n": "Nie usuwaj połączenia.<br>Po prostu zignoruj w tej chwili.",
        "i": "${ sKey }"
      },
      "catchSync": {
        "q": "Wystąpił nieoczekiwany błąd synchronizacji.<br><br>${ sName } nie zostanie zsynchronizowana.<br><br><br>Komputer mówi:<br><br>${ cErr }",
        "y": "",
        "n": "W porządku. Rozumiem.",
        "i": "${ sKey }"
      },
      "catchUpdate": {
        "q": "Wystąpił nieoczekiwany problem połączenia.<br><br>${ sName } nie została zaktualizowana.<br><br><br>Komputer mówi:<br>${ cErr }<br><br><br>Połączenie z bazą danych zostanie usunięte.",
        "y": "",
        "n": "W porządku. Rozumiem.",
        "i": "${ sKey }"
      },
      "remoteRedirect": {
        "q": "Nastąpi przekierowanie w celu rozpoczęcia<br>procesu autoryzacji połączenia z chmurą.",
        "y": "Rozumiem. Przekieruj mnie do chmury.",
        "n": "Nie chcę łączyć się z chmurą.",
        "i": "${ sKey }"
      },
      "remoteRedirectPrivateMode": {
        "q": "Aplikacja jest obecnie w Trybie Prywatnym.<br><br>Tymczasowy dostęp do pamięci urządzenia jest wymagany,<br>aby zainicjować autoryzację połączenia z chmurą.",
        "y": "Udzielę tymczasowego dostępu do pamięci urządzenia.<br>Przekieruj mnie do chmury.",
        "n": "Nie chcę łączyć się z chmurą<br>w tym momencie.",
        "i": "${ sKey }"
      },
      "privateModeUnablePreserveLocalFile": {
        "q": "Połączenie z ${ sLocalName } nie może być utrzymane w trybie prywatnym.<br><br>Po połączeniu z chmurą, będzie można zsynchronizować obecną bazę danych aplikacji z ${ sCloudName },<br>a następnie ponownie połączyć z ${ sLocalName }.",
        "y": "",
        "n": "Ok. Rozumiem.",
        "i": "${ sLocalKey }"
      },
      "privateModeOneCloudConnectionAllowed": {
        "q": "W trybie prywatnym można utrzymywać tylko jedno połączenie z chmurą naraz.<br><br>Połączenie z ${ sCloudNameNew } zakończy połączenie z ${ sCloudNameCurrent }.<br><br>Po połączeniu, będzie można zsynchronizować obecną bazę danych aplikacji z ${ sCloudNameNew }.",
        "y": "Ok.<br>Rozumiem że, połączenie z ${ sCloudNameCurrent } zostanie stracone po połączeniu z ${ sCloudNameNew }.",
        "n": "Nie chcę łączyć się z ${ sCloudNameNew }.",
        "i": "${ sKeyCurrent }"
      },
      "privateModeUnableSyncLocal": {
        "q": "Aplikacja jest w Trybie Prywatnym.<br><br>Nie mozna zachować Szybkiej Bazy Danych na urządzeniu.<br><br>By zachowac dane na urządzeniu, należy ponownie uruchomić aplikację i umożliwić jej dostęp do pamięci urządzenia.",
        "y": "",
        "n": "W porządku. Rozumiem.",
        "i": "local"
      },
      "removePersisted": {
        "q": "Zaszyfrowane hasło Bazy Danych zostanie usunięte z urządzenia.<br><br>Żeby odblokować bazę danych będzie należalo podać hasło i PIN.",
        "y": "Rozumiem.<br>Użyję hasła i PIN-u",
        "n": "Nie!<br>Nie chce usuwać zachowanego hasła.",
        "i": "unlockDb"
      },
      "removePersistedLastStoreDisconnect": {
        "q": "Usuwasz ostatnie połączenie z Bazą Danych.<br><br>Zaszyfrowane hasło również zostanie usunięte z urządzenia.",
        "y": "Rozumiem.",
        "n": "Nie!<br>Nie chce usuwać połączenie z Bazą Danych ani zaszyfrowanego hasła.",
        "i": "unlockDb"
      },
      "setOlderStore": {
        "q": "${ sName } jest starsza niż dane aplikacji.",
        "y": "${ sName } zawiera dane, których chcę użwać.<br><br>Dane aplikacji zostaną zastąpione.",
        "n": "Chcę używać danych aplikacji.<br><br>${ sName } zostanie zaktualizowana.",
        "i": "${ sKey }"
      },
      "remoteSyncOrOverwrite": {
        "q": "${ sName } już istnieje w chmurze.",
        "y": "Zsynchronizuj dane aplikacji<br>z danymi z chmury.",
        "n": "Zastąp dane w chmurze<br>danymi aplikacji.",
        "i": "${ sKey }"
      },
      "remoteLoadOrNew": {
        "q": "${sName} już istnieje w chmurze.",
        "y": "Załaduj dane z chmury.",
        "n": "Zastąp istniejące dane w chmurze nową bazą danych.",
        "i": "${sKey}"
      },
      "remoteFileDelete": {
        "q": "Istniejąca baza danych w chmurze zostanie usunięta.",
        "y": "Tak, chcę trwale usunąć dane i utworzyć nową bazę danych w chmurze.",
        "n": "Nie, nie chcę usuwać danych.<br>Pozostaw poprzednią bazę danych w chmurze i nie łącz się z chmurą teraz.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "Wystąpił problem.<br>Wygląda na to, że ${ sName } jest połączona z aplikacją,<br>jednak nie udało się wczytać danych.<br><br>Możliwe, że plik bazy danych został usunięty z chmury.",
        "y": "Spróbuj ponownie<br>zapisać dane w chmurze.",
        "n": "Dziwna sytuacja.<br>Usuń połączenie z chmurą.",
        "i": "${ sKey }"
      },
      "registerAuth": {
        "q": "Czy chcesz włączyć interfejs Web Authentication (WebAuthn) API?<br>Możesz wybrać jedną z dostępnych metod na swoim urządzeniu (odcisk palca, głos, skan oka, PIN itp.).",
        "y": "Tak, chcę używać dostępnej autoryzacji urządzenia.",
        "n": "Nie, nie chcę używać żadnej biometrycznej autoryzacji.<br>Użyj innej metody uwierzytelniania.",
        "i": "secreSync"
      },
      "persistOnline": {
        "q": "Metoda uwierzytelniania online jest obecnie niedostępna.<br><br>Alternatywnie, można zapisać zaszyfrowane hasło bezpośrednio na urządzeniu.<br>Hasło do bazy danych będzie zabezpieczone PIN-em, jednak niewystarczająco długi PIN może umożliwić jego złamanie przez doświadczonego hakera, który zdobędzie dostęp do tego urządzenia.",
        "y": "",
        "n": "Dobrze. Zapisz zaszyfrowane hasło bezpośrednio na urządzeniu.<br><br>Rozumiem, że utrata kontroli nad urządzeniem może skutkować dostępem do moich danych.",
        "i": "secreSync"
      },
      "oneDriveRefreshAccess": {
        "q": "Aplikacja utraciła dostęp do OneDrive.<br>Dostęp musi być ponownie zweryfikowany co najmniej raz na 24 godziny.",
        "y": "Dobrze, odśwież dostęp teraz.",
        "n": "To frustrujące! Nie chcę tego robić za każdym razem.",
        "i": "oneDriveFile"
     },
      "saveVendorChanges": {
        "q": "Czy chcesz zapisać zmiany?",
        "y": "Tak,<br>Zapisz zmiany",
        "n": "Nie,<br>Odrzuć zmiany",
        "i": "draftVendObj"
      },
      "secreSyncReset": {
        "q": "Czy chcesz zresetować aplikację?",
        "y": "Tak,<br>chcę usunąć wszystkie połączenia z moją bazą danych i przywrócić domyślne ustawienia aplikacji.",
        "n": "Nie,<br>to była pomyłka.",
        "i": "secreSyncReset"
      }
    },
    "message": {
      "appFailed":"Coś poszło nie tak...<br><br>Nie można uruchomić SecreSync.<br><br>Spróbuj zamknąć aplikację i uruchomić ją ponownie.",
      "noWriteStores": "Ups! Wystąpił problem... Żadna baza danych nie jest dostępna do modyfikacji",
      "IdxDbError": "Ups! Wystąpił problem z połączeniem z pamięcią urządzenia.<br><br>Aplikacja zostanie uruchomiona w Trybie Prywatnym.",
      "storeConnectionTrue": "${ sName } zostala polaczona.",
      "storeConnectionFalse": "${ sName } zostala odlaczona.",
      "storeConnectFail": "Ups! Wystąpił problem... Nie udało się połączyć z bazą danych ${ sName }.",
      "existingDb": "Proszę odblokować bazę danych, aby kontynuować.",
      "loggedOff": "Baza danych zostala zabezpieczona z powodu braku aktywności. Odblokuj, aby uzyskać dostęp danych.",
      "loadDbStandard": "SecreSync jest w Trybie Standardowym. Załaduj istniejącą bazę danych lub utwórz nową.",
      "loadDbPrivate": "SecreSync jest w Trybie Prywatnym. Załaduj istniejącą bazę danych lub utwórz nową.",
      "dbFailed": "Nie można odblokować bazy danych. Pozostało prób: ${ count }.",
      "logShort": "Login musi mieć co najmniej 3 znaki.",
      "nameShort": "Nazwa konta musi mieć co najmniej 3 znaki.",
      "deleteVendorReject": "Konto '${ vName }' nie zostało usunięte.",
      "restoreRevisionReject": "Poprzednia wersja konta '${vName}' nie została przywrócona.",
      "deleteRevisionReject": "Poprzednia wersja konta '${vName}' nie została usunięta.",
      "restoreTrashedReject": "Konto '${vName}' nie zostało przywrócone z kosza.",
      "deleteVendorFailed": "Ups! Wystąpił problem... Żadna baza danych nie jest dostępna do modyfikacji. Konto '${ vName }' zostało usunięte, ale zmiany będą widoczne tylko do zamknięcia aplikacji. Przywróć połączenie z zewnętrzną bazą danych lub pobierz kopię bazy danych.",
      "submitFormFailed": "Ups! Wystąpił problem... Żadna baza danych nie jest dostępna do modyfikacji. Konto '${ vName }' zostało zaktualizowane, ale zmiany będą widoczne tylko do zamknięcia aplikacji. Przywróć połączenie z zewnętrzną bazą danych lub pobierz kopię bazy danych.",
      "submitFormSucess": "Konto '${ vName }' zostało zaktualizowane.",
      "submitFormSucessModerateFail": "Aktualizacje konta '${ vName }' nie są odzwierciedlone w bazach danych, z którymi rozłączono połączenie. Aktualizacje zostaną zastosowane po przywróceniu połączenia.",
      "submitPassFailed": "Ups! Wystąpił problem... Nie można zapisać nowego hasła dla konta '${ vName }'. Hasło nie zostało zmienione.",
      "vendorExists": "Nazwa konta '${ vName }' jest już używana. Proszę wybrać inną nazwę.",
      "customPassCopied": "Własne hasło zostało skopiowane do schowka.",
      "passCopied": "Hasło zostało skopiowane do schowka.",
      "logCopied": "Login został skopiowany do schowka.",
      "pinCopied": "PIN został skopiowany do schowka.",
      "shareFail": "Nie można udostępnić określonych danych.",
      "newPassGenerated": "Nowe hasło dla konta '${ vName }' zostało wygenerowane.",
      "vendorDeleted": "Konto '${ vName }' zostało usunięte.",
      "exitAppConfirm": "Naciśnij ponownie przycisk Wstecz, aby wyjść z aplikacji.",
      "noFilePickedErr": "Nie wybrano pliku bazy danych lub plik jest uszkodzony. Nie można załadować bazy danych...",
      "pickFileFR": "Wybierz plik bazy danych. Dane w tym pliku nie będą mogły być modyfikowane...",
      "pickImportFile": "Wybierz plik bazy danych do importu.",
      "pickFile": "Proszę wybrać plik bazy danych...",
      "offline": "Brak połączenia z Internetem. Nie można zsynchronizować z chmurą.",
      "online": "Połączenie z Internetem zostało przywrócone.",
      "offlineCredNoVerify": "Brak połączenia z Internetem.<br>Nie można zweryfikować zachowanego hasła.<br>",
      "offlineCredNoSave": "Brak połączenia z Internetem.<br>Nie można zapisać hasła na urządzeniu.", // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      "credFormPinTooLong": "Wprowadzony PIN jest za długi.",
      "credFormPassTooLong": "Wprowadzone hasło jest za długie.",
      "persistedSucess": "Zaszyfrowane hasło zostało zapisane na urządzeniu. Następnym razem zalogujesz się za pomocą PIN-u.",
      "persistedFail": "Ups! Wystąpił problem... Nie można zapisać hasła na urządzeniu.",
      "persistedDeleted": "Hasło zostało usunięte z urządzenia.",
      "persistedBadPin": "Wprowadzony PIN jest nieprawidłowy. Baza danych nie może być odblokowana. Aby odblokować ją za pomocą PIN-u pozostało Ci prób: ${ count }.",
      "dbCredentialsChangeSucess": "Dane logowania zostały zmienione.",
      "dbCredentialsChangeFail": "Dane logowania nie zostały zmienione.",
      "dbCredentialsChangeModerateFail": "Dane logowania nie zostały zmienione w bazach danych, z którymi rozłączono połączenie. Nie będzie możliwe zsynchronizowanie bazy danych z tymi kopiami.",
      "dbCredentialsChangeCriticalFail": "Utracono połączenie z bazą danych. Dane logowania nie zostały zmienione.",
      "emergDbCreated": "Pobrano awaryjną kopię bazy danych: : ${ fName }.",
      "importDbFail": "Bazy danych nie można zaimportować.",
      "importDbCancel": "Import danych został anulowany.",
      "importDbSuccess": "Dane zostały pomyślnie zaimportowane.",
      "exportDbFail": "Nie ma dostępnych kont do eksportu.",
      "langChanged": "Język aplikacji został ustawiony na Polski.",
      "dbFileDownloaded": "Kopia bazy danych jest pobierana: ${ fName }",
      "storeIsSyncing": "Baza danych ${ sName } jest obecnie synchronizowana.",
      "remoteAuthorised": "Połączenie aplikacji z chmurą zostało autoryzowane.",
      "remoteConnectFail": "Błąd autoryzacji chmury. ${ sName } nie została połączona.",
      "remoteConnectionCancelled": "Połączenie aplikacji z chmurą zostało anulowane.",
      "remoteFileMissing": "Wystąpił problem.<br>Wygląda na to, że ${ sName } jest połączona z aplikacją,<br>jednak nie udało się wczytać danych.<br><br>Możliwe, że plik bazy danych został usunięty z chmury.<br><br>Połączenie z chmurą zostanie usunięte.",
      "noSessionStorage": "Nie mogę połączyć się z chmurą.<br><br>Wygląda na to, że dostęp do pamięci sesji przeglądarki, która jest niezbędna do połączenia aplikacji z chmurą, został wyłączony.",
      "remoteRedirectError": "Nie mogę połączyć się z chmurą.<br><br>Wystąpił błąd podczas przekierowania.<br><br>Spróbuj ponownie.",
      "textAreaLimitReached": "Maksymalny limit znaków został osiągnięty.",
      "tapToOpenFullArchive": "Dotknij, aby otworzyć historię powiadomień."
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "EN": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Szczegóły Dat",
        "detNotes": "Szczegóły Notatek",
        "detTags": "Szczegóły Tagów",
        "typeNote": "Notatki",
        "typeLog": "Dane Logowania",
        "vTaskChangeDetais": "Opcje Sortowania",
        "vTaskChangeSort": "Opcje Szczegółów",
        "vSortCr8": "Sortuj według Daty Utworzenia",
        "vSortMod": "Sortuj według Daty Modyfikacji",
        "vSortName": "Sortuj według Nazwy",
        "moreMenu": "Więcej Opcji",
        "inputBoxSearchBtn": "Szukaj",
        "hide": "Ukryj",
        "deleteLeft": "Wyczyść",
        "localSync": "Szybkie Połączenie z Bazą Danych",
        "dbxFileSync": "Połączenie z Bazą Danych Dropbox",
        "oneDriveFileSync": "Połączenie z Bazą Danych OneDrive",
        "localFileSync": "Połączenie z Plikem Bazy Danych Urządzenia",
        "newDbLoad": "Utwórz Nową Bazę Danych",
        "dbxFileLoad": "Połącz z Istniejącą Bazą Danych Dropbox lub Utwórz Nową w Dropbox",
        "oneDriveFileLoad":  "Połącz z Istniejącą Bazą Danych  OneDrive Database lub Utwórz Nową w OneDrive",
        "localFileLoad": "Załaduj Bazę Danych z pliku urządzenia",
        "localCred": "Szybka Baza Danych",
        "dbxFileCred": "Baza Danych Dropbox",
        "oneDriveFileCred": "Baza Danych OneDrive",
        "localFileCred": "Baza Danych Urządzenia",
        "newDb": "Nowa Baza Danych",
        "unlinkDb": "Odłącz Bazę Danych",
        "loadNewDb": "Utwórz Nową Bazę Danych",
        "reloadApp": "Wyloguj się / Przeładuj Aplikację",
        "changeDbPass": "Zmień hasło bazy danych aplikacji",
        "emergDb": "Pobierz Awaryjną Kopię Bazy Danych",
        "impDb": "Importuj Dane z Innej Bazy Danych",
        "expDb": "Eksportuj kopię bazy danych",
        "expDbFiltered": "Wybierz konta do eksportu",
        "addVendorBtn": "Dodaj Konto",
        "submitFormBtn": "Zapisz Zmiany",
        "editFormBtn": "Edytuj Konto",
        "restoreTrashedBtn": "Przywróć z kosza",
        "restoreRevisionBtn": "Przywróć tę wersję",
        "revisions": "Historia zmian",
        "previousVersion": "Poprzednia wersja",
        "nextVersion": "Następna wersja",
        "btnClose": "Zamknij",
        "copyLogBtn": "Kopiuj Dane Logowania",
        "copyPassBtn": "Kopiuj Hasło",
        "copyPinBtn":  "Kopiuj PIN",
        "decrease": "Odejmij",
        "increase": "Dodaj",
        "newPassBtn": "Wygeneruj Nowe Hasło",
        "showPassToggleBtn": "Przełącz Widoczność",
        "openLinkBtn": "Otwórz Odnośnik",
        "deleteVendorBtn": "Usuń Konto",
        "undoChangesBtn": "Cofnij zmiany",
        "deleteTrashedBtn": "Trwale usuń z kosza",
        "deleteRevisionBtn": "Usuń tę wersję",
        "toggleToLog": "Konwertuj Notatkę na Dane Logowania",
        "toggleToNote": "Konwertuj Dane Logowania na Notatkę",
        "changeLang": "Zmień Język",
        "donate": "Wesprzyj Naszą Pracę!",
        "appTheme": "Zmień motyw",
        "appWidth" : "Dostosuj szerokość",
        "appLayout": "Zmień układ", 
        "appLogOff": "Ustaw opóźnienie wylogowania",
        "selfProfile": "Mój profil",
        "appIconSize": "Dostosuj rozmiar ikon",
        "appBlur": "Przełącz efekt rozmycia",
        "credChecked": "Wyłącz Logowanie Tylko za Pomocą PIN",
        "credUnchecked": "Włącz Logowanie Tylko za Pomocą PIN",
        "unlockDb": "Odblokuj Bazę Danych",
        "protectDb": "Zabezpiecz Bazę Danych",
        "formIconTypeNote": "Konto Typu Notatka",
        "formIconTypeLog": "Konto Typu Dane Logowania",
        "formIconTypeNoteNew": "Nowe Konto Typu Notatka",
        "formIconTypeLogNew": "Nowe Konto Typu Dane Logowania",
        "vCr8DateLabel": "Data Utworzenia Konta",
        "vModDateLabel": "Data Modyfikacji Konta",
        "local": "Szybka Baza Danych",
        "dbxFile": "Baza Danych Dropbox",
        "oneDriveFile": "Baza Danych OneDrive",
        "localFile": "Baza Danych Urządzenia", //bazy danych pliku urządzenia // "Zapasowa Kopia Bazy Danych"
        "secreSync": "SecreSync",
        "share": "Udostępnij",
        "settings": "Ustawienia",
        "msgHistory": "Historia Powiadomień",
        "installApp": "Zainstaluj SecreSync na tym urządzeniu",
        "updateApp": "Nowa wersja SecreSync jest dostępna. Zaktualizuj aplikację",
        "restoreSettings": "Przywróć ustawienia domyślne",
        "shareBarcodeText": "Wyświetl kod QR hasła",
        "shareBarcodeLink": "Wyświetl zaszyfrowany kod QR hasła",
        "shareWebshareLink": "Udostępnij link do hasła z PIN-em",
        "draftVendObj": "Wersja Robocza",
        "wallet": "Adres portfela",
        "secreSyncReset": "Zresetuj aplikację"
      },
      "htmls": {
        "formLabelName": "Nazwa Konta",
        "formLabelLog": "Login / Nazwa Użytkownika",
        "formLabelPass": "Hasło",
        "formLabelCustomPass": "Własne Hasło",
        "formLabelNote": "Notatka",
        "formLabelUrl": "Link",
        "formLabelTags": "Tagi",
        "formLabelPassCplx": "Złożoność Hasła",
        "formLabelPassLen": "Długość Hasła",
        "formLabelPassEntropy": "Entropia Hasła",
        "formLabelPassGrade": "Ocena Hasła",
        "vendorPassGradeVal": {
          "0": "Niewystarczające",
          "40": "Wyjątkowo Słabe",
          "50": "Bardzo Słabe",
          "60": "Słabe",
          "70": "Przeciętne",
          "80": "Poprawne",
          "90": "Dobre",
          "100": "Silne",
          "110": "Bardzo Silne",
          "120": "Świetne",
          "127": "Doskonałe",
          "200": "Wybitne"
        },
        "credFormTitle": "Odblokuj Bazę Danych",
        "credFormTitleImport": "Odblokuj Bazę Danych do importu",
        "credFormTitleNew": "Zabezpiecz Bazę Danych",
        "credFormPass": "Wprowadź swoje hasło",
        "credFormImpPass": "Wprowadź hasło bazy danych do importu",
        "credFormPin": "Wprowadź swój PIN",
        "credFormImportPin": "Wprowadź PIN bazy danych do importu",
        "credFormPersist": "Zapamiętaj hasło",
        "credFormPersistRemove": "Usuń zapisane hasło",
        "credFormPassHint": "Proszę wprowadzić nowe hasło. Może mieć od 10 do 32 znaków i zawierać dowolny rodzaj znaków.",
        "credFormPinHint": "Proszę podać nowy PIN. Może mieć od 4 do 32 znaków i zawierać dowolny rodzaj znaków.",
        "credFormPersistHint": "Bezpiecznie zapisz zaszyfrowane hasło bazy danych na urządzeniu, aby umożliwić odblokowanie bazy danych za pomocą samego PIN-u. Nie aktywuj tej opcji, jeśli korzystasz z publicznego urządzenia.",
        "credFormPersistRemoveHint": "Usuń zapisane hasło z urządzenia. Następnym razem baza danych będzie musiała zostać odblokowana za pomocą hasła i PIN-u.",
        "masterPasFormNewDB": "Nowa Baza Danych",
        "masterPasFormChangePass": "Zmiana Hasła Bazy Danych",
        "vListHeads": {
          "empty": "Nie znaleziono żadnych kont.",
          "name": "Numer kont: ${ hits }",
          "notFound": "Nie znaleziono '<i>${ searchStr }</i>'.",
          "nameFound": "Znaleziono '<i>${ searchStr }</i>'. Numer kont: ${ hits }.",
          "tagsFound": "'<i>${ searchStr }</i>' znaleziono w Tagach. Numer kont: ${ hits }.",
          "notesFound": "'<i>${ searchStr }</i>' znaleziono w Notatkach. Numer kont: ${ hits }."
        },
        "credChecked": "Zachowaj hasło na urządzeniu",
        "credUnchecked": "Nie zachowuj hasła na urządzeniu",
        "credCheckedPersisted": "Hasło jest zapisane na urządzeniu",
        "credUncheckedPersisted": "Zapisane hasło zostanie usunięte z urządzenia",
        "unlockDb": "Odblokuj Bazę Danych",
        "protectDb": "Zabezpiecz Bazę Danych",
        "withConsent": "Aplikacja ma dostęp do pamięci urządzenia.",
        "withConsentNoIdxdb": "Jednak obecnie nie może przechowywać żadnej bazy danych na tym urządzeniu.<br>Możliwe, że włączony jest tryb prywatny przeglądarki.",
        "removeConsent": "<br>Kliknij, aby aktywować tryb prywatny aplikacji<br>(aplikacja nie będzie miała dostępu do pamięci urządzenia).",
        "noConsent": "Aplikacja jest w trybie prywatnym.<br>Kliknij, by umożliwic aplikacji dostep do pamięci urządzenia.",
        "browserIsPrivate": "Aplikacja jest w trybie prywatnym.<br>Okno przeglądarki jest w trybie prywatnym.<br>Aplikacja nie ma dostępu do pamięci urządzenia.",

        "inputBoxSearch": "Szukaj...",
        "showBtnTxt": "Pokaż rekordy bazy danych",
        "dowloadJson": "Pobierz niechroniony JSON bazy danych",
        "downloadCsv": "Pobierz niechroniony CSV bazy danych",
        "downloadSnc": "Pobierz chroniony plik SecreSync bazy danych",
        "revision": "Wersja zmodyfikowana: ${ revisionDate }",
        "revisions": "Dostosuj maksymalną liczbę przechowywanych wersji kont przez aplikację.<br>Obecnie przechowywane wersje: ${ value }.",
        "appWidth": "Dostosuj szerokość okna aplikacji.<br>Obecna szerokość: ${ value } pikseli.",
        "appLayout": "Przełącz się między różnymi układami aplikacji.<br>Aktualny układ: ${value}.",
        "appLayoutMobile": "Układ mobilny",
        "appLayoutDesktop": "Układ desktopowy",
        "appLogOff": "Ustaw czas opóźnienia przed automatycznym wylogowaniem aplikacji.<br>Aktualne opóźnienie: ${value} sekund.",
        "selfProfile": "Moje dane logowania do bazy danych:<br>Hasło: ${plainPassString}<br>PIN: ${plainPinString}<br>Utworzono: ${timestamp}",
        "appIconSize": "Zmień rozmiar ikon aplikacji.<br>Aktualny rozmiar ikon: ${value} pikseli.",
        "appBlur": "Włącz lub wyłącz efekt rozmycia, gdy aplikacja nie jest w fokusie.<br>Aktualne ustawienie: ${value}.",
        "appBlurEnabled": "Włączone",
        "appBlurDisabled": "Wyłączone",
        "appTheme": "Przełącz między jasnym i ciemnym motywem aplikacji.<br>Aktualny motyw: ${value}.",
        "darkThemeEnabled": "Motyw ciemny",
        "darkThemeDisabled": "Motyw jasny",
        "shareBarcodeText": "Wygeneruj kod QR zawierający zwykłe hasło do lokalnego udostępniania.",
        "shareBarcodeLink": "Wygeneruj kod QR z linkiem i PIN-em do odszyfrowania hasła.",
        "shareWebshareLink": "Udostępnij link i wyświetl PIN do odszyfrowania hasła.",
        "statusTypeNoteNew": "Edytowanie nowego konta typu notatka",
        "statusTypeLogNew": "Edytowanie nowego konta typu logowanie",
        "statusDraftTypeNote": "Edytowanie nowego konta typu notatka: ${accountName}",
        "statusDraftTypeLog": "Edytowanie konta typu logowanie: ${accountName}",
        "statusRevisions": "Historia zmian. Wersji wstecz: ${revisionIdx}",
        "statusTypeNote": "Konto typu notatka: ${accountName}",
        "statusTypeLog": "Konto typu logowanie: ${accountName}",
        "donate": "Wesprzyj nas, wpłacając ${ donateAcc }"
        
      },
      "values": {
        "badPass": "Nieprawidłowe hasło... Usuwanie wszystkich połączen z bazą danych...",
        "redirectWelcome": "Jesteś prawie na miejscu. Proszę wpisz ponownie swoje hasło.",
        "noPass": "Nie podano hasła do bazy danych.",
        "userReject": "Użytkownik odrzucił możliwość wczytania pliku."
      }
    }
  }
}
// /* /* Lokalna Baza Danych / Szybka Baza Zadnych / Podreczna Baza Danych ????*/
        // "vendorPassGradeVal": {
          // "inadequate": "Niewystarczające",/* Nie adekwatne, nieodpowiednie, niezadowalajace, ponizej normy*/
          // "extremelyWeak": "Wyjątkowo Słabe",/*/Mierne*/
          // "veryWeak": "Bardzo Słabe", /*// Bardzo Slabe*/
          // "weak": "Słabe", /*// Mizerne, //Kiepskie*/
          // "fair": "Przeciętne", /*// Znosne*/
          // "fine": "Poprawne", /*// Przecietne,// Wystarczajace, //zadawalajace, do przyjecia, poprawne, przecietne, satysfakcjonujace, srednie,wzgledne, znosne*/
          // "good": "Dobre",
          // "strong": "Silne",
          // "veryStrong": "Bardzo Silne",
          // "great": "Świetne", /*// swietne*/
          // "excellent": "Doskonałe",
          // "superior": "Wybitne" /*// wybitne //celujace, wybitne, wysmienite, mistrzowskie, wyborne, wspaniale, znakomite, perfekcyjne, kapitalne*/
        // }, */