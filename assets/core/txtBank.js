const txtBankObj = {
  "GB": {
    "alert": {
      "appFailed": {
        "q": "Something went wrong... The App can't start. Try to reload the App",
        "y": "",
        "n": "Okay, I understand."
      },
      "offline": {
        "q": "Can't connect to the cloud.<br><br>It looks like you don't have an internet connection.",
        "y": "",
        "n": "OK. I see."
      },
      "deleteVendor": {
        "q": "Do you really want to delete ${vName}?",
        "y": "Yes, I do!",
        "n": "No! It was a mistake!",
        "i": "deleteVendorBtn"
      },
      "newVersion": {
        "q": "A new version of the App is available.",
        "y": "OK!<br>Update the App now!",
        "n": "Don't update it yet.<br>I will reload the app manually."
      },
      "syncDbWith": {
        "local": {
          "q": "Would you like to load the database automatically by saving it to your device's memory?",
          "y": "Yes, please save the database to my device's memory.",
          "n": "No, I prefer to load the database manually when needed.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Would you like to synchronise the App to the Dropbox?",
          "y": "Yes!<br>Go on then!",
          "n": "No, I don't.<br>Thank you.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "Would you like to synchronise the App with a local Backup File?",
          "y": "Yes!<br>Go on then!",
          "n": "No, I don't.<br>Thank you.",
          "i": "localFile"
        }
      },
      "disconnectDbFrom": {
        "local": {
          "q": "You are about to disconnect the Quick Access Database from this device.<br><br>You may not be able to use the App without an internet connection.<br>No other synchronised databases will be affected.",
          "y": "Yes!<br><br>Remove the Quick Access Database from this device.<br>",
          "n": "Oh, no!<br><br>It was a mistake.",
          "i": "local"
        },
        "dbxFile": {
          "q": "You are about to disconnect the Dropbox Database.<br>The App database will not be synchronised with the Dropbox Database.<br>The App permission to use the Dropbox will be revoked.",
          "y": "Yes!<br><br>Disconnect the Dropbox Database!",
          "n": "Oh, no!<br><br>It was a mistake.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "You are about to disconnect the Database Backup File.<br>The App database will not longer be synchronised with the Backup File.",
          "y": "Yes!<br><br>Disconnect the Backup File!",
          "n": "Oh, no!<br><br>It was a mistake.",
          "i": "localFile"
        }
      },
      "deleteExistingStore": {
        "local": {
          "q": "The local Quick Access Database exists. What do we do?",
          "y": "Remove the existing Quick Access Database.",
          "n": "Do not remove the existing Quick Access Database.",
          "i": "local"
        },
        "dbxFile": {
          "q": "There is an existing connection to the Dropbox Database. What do we do?",
          "y": "Remove the current connection to the Dropbox Database.<br><br>I understand that I may lose all the data.",
          "n": "Do not remove the connection. I want to use it",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "There is an existing connection to the Database Backup File. What do we do?",
          "y": "Remove the current connection to the Backup File.",
          "n": "Do not remove the connection. I want to use it",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "Do you have an existing Database File?",
        "y": "Yes. I already have an existing Database File<br><br>Let me connect to it",
        "n": "I need to create a new Database File<br><br>Just let me save it...",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "You can't synchronise the Database File of this device.",
        "y": "I want to download a copy of the current database.<br>",
        "n": "I see. I don't wan't to download.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Data will be imported. Imported account names will cotain suffix: '(i_1)'.<br><br>On each next import, if the account names are identical, the number following the underline will increase. <br><br>Original creation and modification dates of the imported accounts will be preserved.",
        "y": "Yes. I wan't to import the data.<br>",
        "n": "No, I changed my mind.",
        "i": "impDb"
      },
      "catchLoad": {
        "q": "There is a problem with the ${sName} connection.",
        "y": "Lets remove the connection and reload the App.<br>",
        "n": "No! Just ignore it for the time being!",
        "i": "${sKey}"
      },
      "catchSync": {
        "q": "Can't Synchronise the ${sName}<br><br>The computer says:<br><br>${cErr}",
        "y": "",
        "n": "OK. I see.",
        "i": "${sKey}"
      },
      "catchUpdate": {
        "q": "There is a problem with the connection<br>Can't update the ${sName}<br><br>The computer says:<br><br>${cErr}The connection will be removed.",
        "y": "",
        "n": "OK. I see.",
        "i": "${sKey}"
      },
"remoteRedirect": {
  "q": "You will be redirected to begin the cloud connection authorization process.",
  "y": "Yes, please direct me to the cloud to authorize the connection.",
  "n": "No, I choose not to connect to the cloud right now.",
  "i": "${ sKey }"
},
"remoteRedirectWithClipboard": {
  "q": "The app is currently in Private Mode.<br><br>Temporary access to your device's Clipboard is required to initiate cloud connection authorization.",
  "y": "I will grant Clipboard access upon request.<br>Please navigate me to the cloud to authorize the connection.",
  "n": "No, I prefer not to connect to the cloud at this time.",
  "i": "${ sKey }"
},
      "privateModeUnableSync": {
        "q": "The App is in the Private Mode.<br><br>You can't save the Quick Access Database on this device.<br>To save the data on the device, you need to restart the application and enable App Storage.",
        "y": "",
        "n": "OK. I see.",
        "i": "local"
      },
      "removePersisted": {
        "q": "Encrypted database password will be removed from the device.<br>You will have to provide password and PIN to unlock the Database.",
        "y": "OK, I see.<br>I will use password and PIN.",
        "n": "No! I don't want to remove the password from the device.",
        "i": "unlockDb"
      },
      "setOlderStore": {
        "q": "${sName} is older than the current Application Database.",
        "y": "${sName} contains<br>the data I want to use.<br><br>Application Database will be updated.",
        "n": "Application Database contains<br>the data I want to use.<br><br>${sName} will be updated with the Application Database.",
        "i": "${sKey}"
      },
     "remoteSyncOrOverwrite": {
        "q": "${ sName } already exists in the cloud.",
        "y": "Synchronize the app's database with data from the cloud.",
        "n": "Replace the data in the cloud with the current app database.",
        "i": "${ sKey }"
      },
"remoteLoadOrNew": {
  "q": "${sName} already exists in the cloud.",
  "y": "Load the data from the cloud.",
  "n": "Replace the existing cloud data with a new database.",
  "i": "${sKey}"
},
      "remoteCreateNew": {
        "q": "${ sName } will be created in the cloud.",
        "y": "Yes, please.<br>Create a new database and synchronize it with the cloud.",
        "n": "No. That was a mistake.<br>Delete the connection with the cloud.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "A problem occurred.<br>It seems that ${ sName } is connected to the app but its data could not be loaded.<br>It is possible that the database file has been removed from the cloud.",
        "y": "Try again to save the data in the cloud.",
        "n": "Strange situation.<br>Just remove the connection with the cloud.",
        "i": "${ sKey }"
      },
      "clipboardDelay":{
          "q": "It looks like you didn't approve the access to clipboard on time.",
          "y": "Let's try again.<br>I'll be quicker this time.",
          "n": "I don't want you to access the clipboard.<br>Get lost!.",
          "i": "${ sKey }"
      }
    },
    "message": {
      "noWriteStores": "Oops! There's an issue... The Database is currently unavailable for modifications.",
      "storeConnectionTrue": "Successfully connected to ${ sName }.",
      "storeConnectionFalse": "${ sName } has been disconnected.",
      "storeConnectFail": "Oops! There's an issue... Unable to connect to the ${ sName } database.",
      "existingDb": "Please enter your Database password.",
      "loggedOff": "You've been logged off due to inactivity. Please re-enter your password to access the database.",
      "loadDbStandard": "SecreSync is operating in Standard Mode. Load an existing database or create a new one.",
      "loadDbPrivate": "SecreSync is operating in Private Mode. Load an existing database or create a new one.",
      "dbFailed": "Unable to unlock the Database. You have ${ count } attempts remaining...",
      "logShort": "The login must be at least 3 characters.",
      "nameShort": "The Account Name must be at least 3 characters.",
      "deleteVendorReject": "The '${ vName }' Account has not been deleted.",
      "deleteVendorFailed": "Oops! There's an issue... No Database is available for modifications. The '${ vName }' Account has been removed, but changes will persist only until the application is closed. Re-establish the connection to an external Database or download a copy of the Database.",
      "submitFormFailed": "Oops! There's an issue... No Database is available for modifications. The '${ vName }' Account has been updated, but changes will persist only until the application is closed. Re-establish the connection to an external Database or download a copy of the Database.",
      "submitFormSucess": "The '${ vName }' Account has been updated successfully.",
      "submitFormSucessModerateFail": "The '${ vName }' Account updates are not reflected in the disconnected databases. Updates will be applied once the connection is restored.",
      "submitPassFailed": "Oops! There's an issue... The new password for the '${ vName }' Account cannot be saved. The password remains unchanged.",
      "vendorExists": "The account name '${ vName }' is already in use. Please choose a different name.",
      "customPassCopied": "Custom Password has been copied to the clipboard.",
      "passCopied": "Password has been copied to the clipboard.",
      "logCopied": "Login has been copied to the clipboard.",
      "vendorDeleted": "The '${ vName }' Account has been deleted successfully.",
      "exitAppConfirm": "Press the Back Button again to exit the application.",
      "noFilePickedErr": "No Database File has been selected, or the file is corrupted. Unable to load the Database...",
      "pickFileFR": "Select the Database File using the FileReader. The Database cannot be modified...",
      "pickImportFile": "Select the Database File you wish to import.",
      "pickFile": "Please select a Database File...",
      "offline": "No internet connection detected. Unable to sync with the cloud.",
      "online": "Internet connection restored. You are now online.",
      "credFormPinTooLong": "The entered PIN is too long.",
      "credFormPassTooLong": "The entered password is too long.",
      "persistedSucess": "The encrypted password has been saved on the device. You will log in with a PIN next time.",
      "persistedFail": "Oops! There's an issue... The password cannot be saved on the device.",
      "persistedDeleted": "The password has been removed from the device.",
      "persistedBadPin": "The entered PIN is incorrect. The Database cannot be unlocked. You have ${ count } more attempts to unlock it with the PIN.",
      "dbCredentialsChangeSucess": "The login credentials have been updated successfully.",
      "dbCredentialsChangeFail": "The login credentials have not been updated.",
      "dbCredentialsChangeModerateFail": "The login credentials have not been updated in the databases with removed connections. It will not be possible to synchronize the Database with these copies.",
      "dbCredentialsChangeCriticalFail": "Connection with the database has been lost. Login credentials remain unchanged.",
      "emergDbCreated": "An emergency backup of the database has been created: : ${ fName }.",
      "importDbFail": "The database could not be imported.",
      "importDbCancel": "The import of data has been cancelled.",
      "importDbSuccess": "The data has been successfully imported.",
      "langChange": "The application language has been set to English.",
      "dbFileDownloaded": "The database copy is being downloaded: ${ fName }",
      "storeIsSyncing": "The ${ sName } database is currently syncing.",
      "remoteAuthorised": "Application cloud connection has been authorised.",
      "remoteConnectFail": "${ sName } remoteConnectFail"
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "GB": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Details of Dates",
        "detNotes": "Details of Notes",
        "detTags": "Details of Tags",
        "typeNote": "Notes",
        "typeLog": "Login Credentials",
        "vTaskSwitch": "Sorting Options",
        "vTaskSwitchSort": "Details Options",
        "vSortCr8": "Sort by Creation Date",
        "vSortMod": "Sort by Modification Date",
        "vSortName": "Sort by Name",
        "moreMenu": "Additional Options",
        "inputBoxSearchBtn": "Search",
        "hide": "Hide",
        "deleteLeft": "Clear Input",
        "localSync": "Quick Access Database Connection",
        "dbxFileSync": "Dropbox Database Connection",
        "localFileSync": "Database Backup File Connection",
        "newDbLoad": "Create a New Database",
        "dbxFileLoad": "Connect to an Existing Dropbox Database or Create a New One in Dropbox",
        "localFileLoad": "Load a Database from an Existing Backup File",
        "localCred": "Quick Access Database",
        "dbxFileCred": "Dropbox Database",
        "localFileCred": "Database Backup File",
        "newDb": "Create a New Database",
        "mpClose": "Disconnect Database",
        "loadNewDb": "Create a New Database",
        "reloadApp": "Log Out / Reload the Application",
        "changeDbPass": "Change the Application Database Password",
        "emergDb": "Create an Emergency Copy of the Database",
        "impDb": "Import Data from Another Database",
        "downDb": "Download a Copy of the Database",
        "addVendorBtn": "Add an Account",
        "submitFormBtn": "Save Changes",
        "editFormBtn": "Edit an Account",
        "btnCloseForm": "Close",
        "copyLogBtn": "Copy Login",
        "copyPassBtn": "Copy Password",
        "minusBtn": "Decrease",
        "plusBtn": "Increase",
        "newPassBtn": "Generate a New Password",
        "showPassToggleBtn": "Toggle Password Visibility",
        "openLinkBtn": "Open a Hyperlink",
        "deleteVendorBtn": "Delete an Account",
        "toggleToLog": "Convert a Note to Login Credentials",
        "toggleToNote": "Convert Login Credentials to a Note",
        "changeLang": "Change Language",
        "donate": "Support Our Work!",
        "credChecked": "Disable PIN-Only Login",
        "credUnchecked": "Enable PIN-Only Login",
        "unlockDb": "Unlock the Database",
        "protectDb": "Secure the Database",
        "formIconTypeNote": "Note Type Account",
        "formIconTypeLog": "Login Type Account",
        "local": "Quick Access Database",
        "dbxFile": "Dropbox Database",
        "localFile": "Database Backup File"
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
          "inadequate": "Inadequate",
          "extremelyWeak": "Extremely Weak",
          "veryWeak": "Very Weak",
          "weak": "Weak",
          "fair": "Fair",
          "fine": "Fine",
          "good": "Good",
          "strong": "Strong",
          "veryStrong": "Very Strong",
          "great": "Great",
          "excellent": "Excellent",
          "superior": "Superior"
        },
        "credFormTitle": "Unlock Database",
        "credFormImportTitle": "Unlock Database for Import",
        "credFormTitleNew": "Protect Database",
        "credFormPass": "Enter Your Password",
        "credFormImpPass": "Enter Import Database Password",
        "credFormPin": "Enter Your PIN",
        "credFormImportPin": "Enter Import Database PIN",
        "credFormPersist": "Use PIN Only",
        "credFormRemovePersist": "Use Password and PIN",
        "credFormPassHint": "Please enter a new password. It can be between 10 and 32 characters long and contain any type of characters.",
        "credFormPinHint": "Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
        "credFormPersistHint": "Securely save the encrypted database password on the device to enable unlocking the database using the PIN only. <br>Do not enable this option if using a public device.",
        "credFormRemovePersistHint": "Remove the saved password from the device. Next time, the database will have to be unlocked using the password and PIN.",
        "masterPasFormNewDB": "New Database",
        "masterPasFormChangePass": "Database Password Change",
        "vListHeads": {
          "notFound": "'<i>${ searchStr }</i>' not found.",
          "nameFound": "Name:",
          "tagsFound": "'<i>${ searchStr }</i>' found in Tags:",
          "notesFound": "'<i>${ searchStr }</i>' found in Notes:"
        },
        "credChecked": "PIN-only login is enabled.",
        "credUnchecked": "PIN-only login is disabled.",
        "unlockDb": "Unlock Database",
        "protectDb": "Protect Database",
        "withConsent": "The app has access to the device storage.",
        "withConsentNoIdxdb": "<br>However, currently it cannot persist any database on this device.<br>It's possible that the browser's Private Mode is enabled.",
        "removeConsent": "<br>Click to activate the app's Private Mode<br>(The app will not have access to the device storage).",
        "noConsent": "The app is in Private Mode.<br>Click to enable app storage.",
        "browserIsPrivate": "The browser window is in Private mode.<br>The app will not have access to the device storage.",
        "msgHistory": "Notification History",
        "inputBoxSearch": "Search..."
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
      "appFailed": {
        "q": "Algo salió mal... La aplicación no puede iniciar. Intenta recargar la aplicación",
        "y": "",
        "n": "Vale, entiendo."
      },
      "offline": {
        "q": "No se puede conectar a la nube.<br><br>Parece que no tienes conexión a internet.",
        "y": "",
        "n": "OK. Ya veo."
      },
      "deleteVendor": {
        "q": "¿Realmente quieres eliminar ${vName}?",
        "y": "¡Sí, quiero hacerlo!",
        "n": "¡No! ¡Fue un error!",
        "i": "deleteVendorBtn"
      },
      "newVersion": {
        "q": "Una nueva versión de la App está disponible.",
        "y": "¡OK!<br>¡Actualiza la App ahora!",
        "n": "Aún no la actualices.<br>Recargaré la app manualmente."
      },
      "syncDbWith": {
        "local": {
          "q": "Souhaitez-vous charger automatiquement la base de données en la sauvegardant dans la mémoire de votre appareil ?",
          "y": "Oui, veuillez sauvegarder la base de données dans la mémoire de mon appareil.",
          "n": "Non, je préfère charger la base de données manuellement lorsque c'est nécessaire.",
          "i": "local"
        },
        "dbxFile": {
          "q": "¿Te gustaría sincronizar la App con Dropbox?",
          "y": "¡Sí!<br>¡Adelante!",
          "n": "No, no quiero.<br>Gracias.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "¿Te gustaría sincronizar la App con un Archivo de Respaldo local?",
          "y": "¡Sí!<br>¡Adelante!",
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
        "localFile": {
          "q": "Estás a punto de desconectar el Archivo de Respaldo de la Base de Datos.<br>La base de datos de la App ya no se sincronizará con el Archivo de Respaldo.",
          "y": "¡Sí!<br><br>Desconecta el Archivo de Respaldo!",
          "n": "¡Oh, no!<br><br>Fue un error.",
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
        "localFile": {
          "q": "Hay una conexión existente con el Archivo de Respaldo de la Base de Datos. ¿Qué hacemos?",
          "y": "Eliminar la conexión actual con el Archivo de Respaldo.",
          "n": "No eliminar la conexión. Quiero usarla",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "¿Tienes un Archivo de Base de Datos existente?",
        "y": "Sí. Ya tengo un Archivo de Base de Datos existente<br><br>Déjame conectarme a él",
        "n": "Necesito crear un nuevo Archivo de Base de Datos<br><br>Solo déjame guardarlo...",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "No puedes sincronizar el Archivo de Base de Datos de este dispositivo.",
        "y": "Quiero descargar una copia de la base de datos actual.<br>",
        "n": "Ya veo. No quiero descargar.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Se importarán datos. Los nombres de cuentas importados contendrán el sufijo: '(i_1)'.<br><br>En cada próxima importación, si los nombres de cuentas son idénticos, el número que sigue al guion bajo aumentará.<br><br>Se preservarán las fechas de creación y modificación originales de las cuentas importadas.",
        "y": "Sí. Quiero importar los datos.<br>",
        "n": "No, cambié de opinión.",
        "i": "impDb"
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
"remoteRedirectWithClipboard": {
  "q": "La aplicación está en Modo Privado.<br><br>Se requiere acceso temporal al Portapapeles de su dispositivo para iniciar la autorización de conexión con la nube.",
  "y": "Permitiré el acceso al Portapapeles cuando se solicite.<br>Por favor, diríjame a la nube para autorizar la conexión.",
  "n": "No, prefiero no conectarme a la nube en este momento.",
  "i": "${ sKey }"
},
      "privateModeUnableSync": {
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
      "remoteCreateNew": {
        "q": "${ sName } ya existe existe en la nube.",
        "y": "Sí, por favor.<br>Crea una nueva base de datos y sincronízala con la nube.",
        "n": "No. Eso fue un error.<br>Elimina la conexión con la nube.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "Ocurrió un problema.<br>Parece que ${ sName } está conectada a la aplicación pero no se pudieron cargar sus datos.<br>Es posible que el archivo de la base de datos haya sido eliminado de la nube.",
        "y": "Intenta de nuevo guardar los datos en la nube.",
        "n": "Situación extraña.<br>Simplemente elimina la conexión con la nube.",
        "i": "${ sKey }"
      },
      "clipboardDelay":{
          "q": "It looks like you didn't approve the access to clipboard on time.",
          "y": "Let's try again.<br>I'll be quicker this time.",
          "n": "I don't want you to access the clipboard.<br>Get lost!.",
          "i": "${ sKey }"
      }
    },
    "message": {
      "noWriteStores": "¡Vaya! Hay un problema... La base de datos no está disponible actualmente para modificaciones.",
      "storeConnectionTrue": "Conexión exitosa a ${ sName }.",
      "storeConnectionFalse": "${ sName } se ha desconectado.",
      "storeConnectFail": "¡Vaya! Hay un problema... No se pudo conectar a la base de datos ${ sName }.",
      "existingDb": "Por favor, ingrese la contraseña de su base de datos.",
      "loggedOff": "Ha sido desconectado debido a inactividad. Por favor, vuelva a ingresar su contraseña para acceder a la base de datos.",
      "loadDbStandard": "SecreSync está en Modo Estándar. Cargue una base de datos existente o cree una nueva.",
      "loadDbPrivate": "SecreSync está en Modo Privado. Cargue una base de datos existente o cree una nueva.",
      "dbFailed": "No se puede desbloquear la base de datos. Le quedan ${ count } intentos...",
      "logShort": "El inicio de sesión debe tener al menos 3 caracteres.",
      "nameShort": "El nombre de la cuenta debe tener al menos 3 caracteres.",
      "deleteVendorReject": "La cuenta '${ vName }' no ha sido eliminada.",
      "deleteVendorFailed": "¡Vaya! Hay un problema... No hay base de datos disponible para modificaciones. La cuenta '${ vName }' se ha eliminado correctamente, pero los cambios solo serán visibles hasta que cierre la aplicación. Restablezca la conexión con una base de datos externa o descargue una copia de la base de datos.",
      "submitFormFailed": "¡Vaya! Hay un problema... No hay base de datos disponible para modificaciones. La cuenta '${ vName }' se ha actualizado correctamente, pero los cambios solo serán visibles hasta que cierre la aplicación. Restablezca la conexión con una base de datos externa o descargue una copia de la base de datos.",
      "submitFormSucess": "La cuenta '${ vName }' se ha actualizado correctamente.",
      "submitFormSucessModerateFail": "Las actualizaciones de la cuenta '${ vName }' no se reflejan en las bases de datos desconectadas. Las actualizaciones se aplicarán una vez que se restablezca la conexión.",
      "submitPassFailed": "¡Vaya! Hay un problema... La nueva contraseña para la cuenta '${ vName }' no se puede guardar. La contraseña permanece sin cambios.",
      "vendorExists": "El nombre de la cuenta '${ vName }' ya está en uso. Elija otro nombre.",
      "customPassCopied": "La contraseña personalizada se ha copiado al portapapeles.",
      "passCopied": "La contraseña se ha copiado al portapapeles.",
      "logCopied": "Los detalles de inicio de sesión se han copiado al portapapeles.",
      "vendorDeleted": "La cuenta '${ vName }' se ha eliminado correctamente.",
      "exitAppConfirm": "Presione nuevamente el botón Atrás para salir de la aplicación.",
      "noFilePickedErr": "No se ha seleccionado ningún archivo de base de datos o el archivo está dañado. No se puede cargar la base de datos...",
      "pickFileFR": "Seleccione el archivo de base de datos utilizando FileReader. La base de datos no se puede modificar...",
      "pickImportFile": "Seleccione el archivo de base de datos que desea importar.",
      "pickFile": "Seleccione un archivo de base de datos...",
      "offline": "No hay conexión a Internet. No se puede sincronizar con la nube.",
      "online": "Ha vuelto a estar en línea.",
      "credFormPinTooLong": "El PIN ingresado es demasiado largo.",
      "credFormPassTooLong": "La contraseña ingresada es demasiado larga.",
      "persistedSucess": "La contraseña cifrada se ha guardado en el dispositivo. La próxima vez iniciará sesión con un PIN.",
      "persistedFail": "¡Vaya! Hay un problema... La contraseña no se puede guardar en el dispositivo.",
      "persistedDeleted": "La contraseña se ha eliminado del dispositivo.",
      "persistedBadPin": "El PIN ingresado es incorrecto. No se puede desbloquear la base de datos. Le quedan ${ count } intentos para desbloquearla con el PIN.",
      "dbCredentialsChangeSucess": "Las credenciales de inicio de sesión se han actualizado correctamente.",
      "dbCredentialsChangeFail": "Las credenciales de inicio de sesión no se han actualizado.",
      "dbCredentialsChangeModerateFail": "Las credenciales de inicio de sesión no se han actualizado en las bases de datos con conexiones eliminadas. No será posible sincronizar la base de datos con estas copias.",
      "dbCredentialsChangeCriticalFail": "Se ha perdido la conexión con la base de datos. Las credenciales de inicio de sesión no han sido cambiadas.",
      "emergDbCreated": "Se ha creado una copia de emergencia de la base de datos: : ${ fName }.",
      "importDbFail": "La base de datos no pudo ser importada.",
      "importDbCancel": "La importación de datos ha sido cancelada.",
      "importDbSuccess": "Los datos han sido importados con éxito.",
      "langChange": "El idioma de la aplicación se ha establecido en Español.",
      "dbFileDownloaded": "Se está descargando la copia de la base de datos: ${ fName }",
      "storeIsSyncing": "La base de datos ${ sName } está actualmente sincronizándose.",
      "remoteAuthorised": "La conexión con la nube de la aplicación ha sido autorizada.",
      "remoteConnectFail": "${ sName } remoteConnectFail"
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "GB": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Detalles de Fechas",
        "detNotes": "Detalles de Notas",
        "detTags": "Detalles de Etiquetas",
        "typeNote": "Notas",
        "typeLog": "Credenciales de Inicio de Sesión",
        "vTaskSwitch": "Opciones de Ordenamiento",
        "vTaskSwitchSort": "Opciones de Detallado",
        "vSortCr8": "Ordenar por Fecha de Creación",
        "vSortMod": "Ordenar por Fecha de Modificación",
        "vSortName": "Ordenar por Nombre",
        "moreMenu": "Opciones Adicionales",
        "inputBoxSearchBtn": "Buscar",
        "hide": "Ocultar",
        "deleteLeft": "Limpiar Entrada",
        "localSync": "Conexión Rápida a la Base de Datos",
        "dbxFileSync": "Conexión a la Base de Datos de Dropbox",
        "localFileSync": "Conexión al Archivo de Respaldo de la Base de Datos",
        "newDbLoad": "Crear una Nueva Base de Datos",
        "dbxFileLoad": "Conectar a una Base de Datos de Dropbox Existente o Crear una Nueva en Dropbox",
        "localFileLoad": "Cargar una Base de Datos desde un Archivo de Respaldo Existente",
        "localCred": "Base de Datos de Acceso Rápido",
        "dbxFileCred": "Base de Datos de Dropbox",
        "localFileCred": "Archivo de Respaldo de la Base de Datos",
        "newDb": "Crear una Nueva Base de Datos",
        "mpClose": "Desconectar la Base de Datos",
        "loadNewDb": "Crear una Nueva Base de Datos",
        "reloadApp": "Cerrar Sesión / Recargar la Aplicación",
        "changeDbPass": "Cambiar la Contraseña de la Base de Datos de la Aplicación",
        "emergDb": "Crear una Copia de Emergencia de la Base de Datos",
        "impDb": "Importar Datos de Otra Base de Datos",
        "downDb": "Descargar una Copia de la Base de Datos",
        "addVendorBtn": "Añadir una Cuenta",
        "submitFormBtn": "Guardar Cambios",
        "editFormBtn": "Editar una Cuenta",
        "btnCloseForm": "Cerrar",
        "copyLogBtn": "Copiar Detalles de Inicio de Sesión",
        "copyPassBtn": "Copiar Contraseña",
        "minusBtn": "Disminuir",
        "plusBtn": "Aumentar",
        "newPassBtn": "Generar una Nueva Contraseña",
        "showPassToggleBtn": "Alternar Visibilidad de la Contraseña",
        "openLinkBtn": "Abrir un Hipervínculo",
        "deleteVendorBtn": "Eliminar una Cuenta",
        "toggleToLog": "Convertir una Nota en Credenciales de Inicio de Sesión",
        "toggleToNote": "Convertir Credenciales de Inicio de Sesión en Nota",
        "changeLang": "Cambiar Idioma",
        "donate": "¡Apoya nuestro trabajo!",
        "credChecked": "Desactivar Inicio de Sesión Solo con PIN",
        "credUnchecked": "Activar Inicio de Sesión Solo con PIN",
        "unlockDb": "Desbloquear la Base de Datos",
        "protectDb": "Proteger la Base de Datos",
        "formIconTypeNote": "Cuenta de Tipo Nota",
        "formIconTypeLog": "Cuenta de Tipo Inicio de Sesión",
        "local": "Base de Datos de Acceso Rápido",
        "dbxFile": "Base de Datos de Dropbox",
        "localFile": "Archivo de Respaldo de la Base de Datos"
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
          "inadequate": "Inadecuada",
          "extremelyWeak": "Extremadamente Débil",
          "veryWeak": "Muy Débil",
          "weak": "Débil",
          "fair": "Aceptable",
          "fine": "Buena",
          "good": "Buena",
          "strong": "Fuerte",
          "veryStrong": "Muy Fuerte",
          "great": "Excelente",
          "excellent": "Excelente",
          "superior": "Superior"
        },
        "credFormTitle": "Desbloquear Base de Datos",
        "credFormImportTitle": "Desbloquear Base de Datos para Importar",
        "credFormTitleNew": "Proteger Base de Datos",
        "credFormPass": "Ingrese su contraseña",
        "credFormImpPass": "Ingrese la contraseña de la Base de Datos de Importación",
        "credFormPin": "Ingrese su PIN",
        "credFormImportPin": "Ingrese el PIN de la Base de Datos de Importación",
        "credFormPersist": "Usar solo PIN",
        "credFormRemovePersist": "Usar contraseña y PIN",
        "credFormPassHint": "Por favor, ingrese una nueva contraseña. Puede tener entre 10 y 32 caracteres y contener cualquier tipo de caracteres.",
        "credFormPinHint": "Por favor, proporcione un nuevo PIN. Puede tener entre 4 y 32 caracteres y contener cualquier tipo de caracteres.",
        "credFormPersistHint": "Guarde de forma segura la contraseña cifrada de la base de datos en el dispositivo para permitir el desbloqueo de la base de datos utilizando solo el PIN. No active esta opción si está utilizando un dispositivo público.",
        "credFormRemovePersistHint": "Elimine la contraseña guardada del dispositivo. La próxima vez, la base de datos deberá ser desbloqueada utilizando la contraseña y el PIN.",
        "masterPasFormNewDB": "Nueva Base de Datos",
        "masterPasFormChangePass": "Cambio de Contraseña de la Base de Datos",
        "vListHeads": {
          "notFound": "'${ searchStr }' no encontrado.",
          "nameFound": "Nombre:",
          "tagsFound": "'${ searchStr }' encontrado en Etiquetas:",
          "notesFound": "'${ searchStr }' encontrado en Notas:"
        },
        "credChecked": "El inicio de sesión solo con PIN está habilitado.",
        "credUnchecked": "El inicio de sesión solo con PIN está deshabilitado.",
        "unlockDb": "Desbloquear Base de Datos",
        "protectDb": "Proteger Base de Datos",
        "withConsent": "La aplicación tiene acceso al almacenamiento del dispositivo.",
        "withConsentNoIdxdb": "Sin embargo, actualmente no puede persistir ninguna base de datos en este dispositivo. Es posible que el modo privado del navegador esté activado.",
        "removeConsent": "Haga clic para activar el modo privado de la aplicación (la aplicación no tendrá acceso al almacenamiento del dispositivo).",
        "noConsent": "La aplicación está en modo privado. Haga clic para habilitar el almacenamiento de la aplicación.",
        "browserIsPrivate": "La aplicación está en modo privado. La ventana del navegador está en modo privado. La aplicación no tiene acceso al almacenamiento del dispositivo.",
        "msgHistory": "Historial de Notificaciones",
        "inputBoxSearch": "Buscar..."
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
      "appFailed": {
        "q": "Quelque chose s'est mal passé... L'application ne peut pas démarrer. Essayez de recharger l'application",
        "y": "",
        "n": "D'accord, je comprends."
      },
      "offline": {
        "q": "Impossible de se connecter au cloud.<br><br>On dirait que vous n'avez pas de connexion internet.",
        "y": "",
        "n": "OK. Je vois."
      },
      "deleteVendor": {
        "q": "Voulez-vous vraiment supprimer ${vName}?",
        "y": "Oui, je le veux!",
        "n": "Non! C'était une erreur!",
        "i": "deleteVendorBtn"
      },
      "newVersion": {
        "q": "Une nouvelle version de l'application est disponible.",
        "y": "D'accord!<br>Mettez à jour l'application maintenant!",
        "n": "Ne la mettez pas à jour pour l'instant.<br>Je rechargerai l'application manuellement."
      },
      "syncDbWith": {
        "local": {
          "q": "¿Desea cargar la base de datos automáticamente guardándola en la memoria de su dispositivo?",
          "y": "Sí, por favor guarde la base de datos en la memoria de mi dispositivo.",
          "n": "No, prefiero cargar la base de datos manualmente cuando sea necesario.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Souhaitez-vous synchroniser l'application avec Dropbox?",
          "y": "Oui!<br>Allez-y!",
          "n": "Non, je ne veux pas.<br>Merci.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "Souhaitez-vous synchroniser l'application avec un fichier de sauvegarde local?",
          "y": "Oui!<br>Allez-y!",
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
        "localFile": {
          "q": "Vous êtes sur le point de déconnecter le fichier de sauvegarde de la base de données.<br>La base de données de l'application ne sera plus synchronisée avec le fichier de sauvegarde.",
          "y": "Oui!<br><br>Déconnectez le fichier de sauvegarde!",
          "n": "Oh non!<br><br>C'était une erreur.",
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
        "localFile": {
          "q": "Il existe une connexion actuelle avec le fichier de sauvegarde de la base de données. Que faisons-nous ?",
          "y": "Supprimer la connexion actuelle avec le fichier de sauvegarde.",
          "n": "Ne pas supprimer la connexion. Je veux l'utiliser",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "Avez-vous un fichier de base de données existant ?",
        "y": "Oui. J'ai déjà un fichier de base de données existant<br><br>Laissez-moi me connecter à celui-ci",
        "n": "J'ai besoin de créer un nouveau fichier de base de données<br><br>Laissez-moi juste le sauvegarder...",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "Vous ne pouvez pas synchroniser le fichier de base de données de cet appareil.",
        "y": "Je veux télécharger une copie de la base de données actuelle.<br>",
        "n": "Je vois. Je ne veux pas télécharger.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Les données seront importées. Les noms de comptes importés contiendront le suffixe : '(i_1)'.<br><br>À chaque nouvelle importation, si les noms de comptes sont identiques, le numéro suivant le trait de soulignement augmentera.<br><br>Les dates de création et de modification originales des comptes importés seront préservées.",
        "y": "Oui. Je veux importer les données.<br>",
        "n": "Non, j'ai changé d'avis.",
        "i": "impDb"
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
"remoteRedirectWithClipboard": {
  "q": "L'application est actuellement en Mode Privé.<br><br>Un accès temporaire au Presse-papiers de votre appareil est nécessaire pour initier l'autorisation de connexion au nuage.",
  "y": "J'accorderai l'accès au Presse-papiers sur demande.<br>Veuillez me naviguer vers le nuage pour autoriser la connexion.",
  "n": "Non, je préfère ne pas me connecter au nuage pour le moment.",
  "i": "${ sKey }"
},
      "privateModeUnableSync": {
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
      "remoteCreateNew": {
        "q": "${ sName } sera créé dans le nuage.",
        "y": "Oui, s'il vous plaît.<br>Créez une nouvelle base de données et synchronisez-la avec le nuage.",
        "n": "Non. C'était une erreur.<br>Supprimez la connexion avec le nuage.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "Un problème est survenu.<br>Il semble que ${ sName } soit connecté à l'application mais ses données n'ont pas pu être chargées.<br>Il est possible que le fichier de base de données ait été supprimé du nuage.",
        "y": "Essayez à nouveau de sauvegarder les données dans le nuage.",
        "n": "Situation étrange.<br>Supprimez simplement la connexion avec le nuage.",
        "i": "${ sKey }"
      },
      "clipboardDelay":{
          "q": "It looks like you didn't approve the access to clipboard on time.",
          "y": "Let's try again.<br>I'll be quicker this time.",
          "n": "I don't want you to access the clipboard.<br>Get lost!.",
          "i": "${ sKey }"
      }
    },
    "message": {
      "noWriteStores": "Oups ! Il y a un problème... La base de données n'est pas disponible pour des modifications.",
      "storeConnectionTrue": "Connexion réussie à ${ sName }.",
      "storeConnectionFalse": "${ sName } a été déconnecté.",
      "storeConnectFail": "Oups ! Il y a un problème... Impossible de se connecter à la base de données ${ sName }.",
      "existingDb": "Veuillez entrer votre mot de passe de base de données.",
      "loggedOff": "Vous avez été déconnecté pour cause d'inactivité. Veuillez saisir à nouveau votre mot de passe pour accéder à la base de données.",
      "loadDbStandard": "SecreSync est en Mode Standard. Chargez une base de données existante ou créez-en une nouvelle.",
      "loadDbPrivate": "SecreSync est en Mode Privé. Chargez une base de données existante ou créez-en une nouvelle.",
      "dbFailed": "Impossible de déverrouiller la base de données. Il vous reste ${ count } tentatives...",
      "logShort": "Le login doit comporter au moins 3 caractères.",
      "nameShort": "Le nom du compte doit comporter au moins 3 caractères.",
      "deleteVendorReject": "Le compte '${ vName }' n'a pas été supprimé.",
      "deleteVendorFailed": "Oups ! Il y a un problème... Aucune base de données n'est disponible pour des modifications. Le compte '${ vName }' a été supprimé, mais les changements ne persisteront que jusqu'à la fermeture de l'application. Rétablissez la connexion à une base de données externe ou téléchargez une copie de la base de données.",
      "submitFormFailed": "Oups ! Il y a un problème... Aucune base de données n'est disponible pour des modifications. Le compte '${ vName }' a été mis à jour, mais les changements ne persisteront que jusqu'à la fermeture de l'application. Rétablissez la connexion à une base de données externe ou téléchargez une copie de la base de données.",
      "submitFormSucess": "Le compte '${ vName }' a été mis à jour avec succès.",
      "submitFormSucessModerateFail": "Les mises à jour du compte '${ vName }' ne sont pas reflétées dans les bases de données déconnectées. Les mises à jour seront appliquées une fois la connexion rétablie.",
      "submitPassFailed": "Oups ! Il y a un problème... Le nouveau mot de passe pour le compte '${ vName }' ne peut pas être enregistré. Le mot de passe reste inchangé.",
      "vendorExists": "Le nom de compte '${ vName }' est déjà utilisé. Veuillez choisir un autre nom.",
      "customPassCopied": "Le mot de passe personnalisé a été copié dans le presse-papiers.",
      "passCopied": "Le mot de passe a été copié dans le presse-papiers.",
      "logCopied": "Les détails de connexion ont été copiés dans le presse-papiers.",
      "vendorDeleted": "Le compte '${ vName }' a été supprimé avec succès.",
      "exitAppConfirm": "Appuyez à nouveau sur le bouton Retour pour quitter l'application.",
      "noFilePickedErr": "Aucun fichier de base de données n'a été sélectionné, ou le fichier est corrompu. Impossible de charger la base de données...",
      "pickFileFR": "Sélectionnez le fichier de base de données à l'aide du FileReader. La base de données ne peut pas être modifiée...",
      "pickImportFile": "Sélectionnez le fichier de base de données que vous souhaitez importer.",
      "pickFile": "Veuillez sélectionner un fichier de base de données...",
      "offline": "Aucune connexion Internet détectée. Impossible de synchroniser avec le cloud.",
      "online": "Connexion Internet rétablie. Vous êtes maintenant en ligne.",
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
      "langChange": "La langue de l’application a été définie sur le Français.",
      "dbFileDownloaded": "La copie de la base de données est en cours de téléchargement : ${ fName }",
      "storeIsSyncing": "La base de données ${ sName } est actuellement en cours de synchronisation.",
      "remoteAuthorised": "La connexion au nuage de l’application a été autorisée.",
      "remoteConnectFail": "${ sName } remoteConnectFail"
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "GB": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Détails des Dates",
        "detNotes": "Détails des Notes",
        "detTags": "Détails des Étiquettes",
        "typeNote": "Notes",
        "typeLog": "Identifiants de Connexion",
        "vTaskSwitch": "Options de Tri",
        "vTaskSwitchSort": "Options de Détail",
        "vSortCr8": "Trier par Date de Création",
        "vSortMod": "Trier par Date de Modification",
        "vSortName": "Trier par Nom",
        "moreMenu": "Options Supplémentaires",
        "inputBoxSearchBtn": "Rechercher",
        "hide": "Cacher",
        "deleteLeft": "Effacer l'Entrée",
        "localSync": "Connexion Rapide à la Base de Données",
        "dbxFileSync": "Connexion à la Base de Données Dropbox",
        "localFileSync": "Connexion au Fichier de Sauvegarde de la Base de Données",
        "newDbLoad": "Créer une Nouvelle Base de Données",
        "dbxFileLoad": "Se Connecter à une Base de Données Dropbox Existante ou Créer une Nouvelle dans Dropbox",
        "localFileLoad": "Charger une Base de Données à partir d'un Fichier de Sauvegarde Existant",
        "localCred": "Base de Données d'Accès Rapide",
        "dbxFileCred": "Base de Données Dropbox",
        "localFileCred": "Fichier de Sauvegarde de la Base de Données",
        "newDb": "Créer une Nouvelle Base de Données",
        "mpClose": "Déconnecter la Base de Données",
        "loadNewDb": "Créer une Nouvelle Base de Données",
        "reloadApp": "Se Déconnecter / Recharger l'Application",
        "changeDbPass": "Changer le Mot de Passe de la Base de Données de l'Application",
        "emergDb": "Créer une Copie d'Urgence de la Base de Données",
        "impDb": "Importer des Données d'une Autre Base de Données",
        "downDb": "Télécharger une Copie de la Base de Données",
        "addVendorBtn": "Ajouter un Compte",
        "submitFormBtn": "Enregistrer les Modifications",
        "editFormBtn": "Éditer un Compte",
        "btnCloseForm": "Fermer",
        "copyLogBtn": "Copier les Détails de Connexion",
        "copyPassBtn": "Copier le Mot de Passe",
        "minusBtn": "Diminuer",
        "plusBtn": "Augmenter",
        "newPassBtn": "Générer un Nouveau Mot de Passe",
        "showPassToggleBtn": "Afficher/Cacher le Mot de Passe",
        "openLinkBtn": "Ouvrir un Hyperlien",
        "deleteVendorBtn": "Supprimer un Compte",
        "toggleToLog": "Convertir une Note en Identifiants de Connexion",
        "toggleToNote": "Convertir des Identifiants de Connexion en Note",
        "changeLang": "Changer de Langue",
        "donate": "Soutenez Notre Travail !",
        "credChecked": "Désactiver la Connexion par PIN Uniquement",
        "credUnchecked": "Activer la Connexion par PIN Uniquement",
        "unlockDb": "Déverrouiller la Base de Données",
        "protectDb": "Sécuriser la Base de Données",
        "formIconTypeNote": "Compte de Type Note",
        "formIconTypeLog": "Compte de Type Connexion",
        "local": "Base de Données d'Accès Rapide",
        "dbxFile": "Base de Données Dropbox",
        "localFile": "Fichier de Sauvegarde de la Base de Données"
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
          "inadequate": "Inadéquat",
          "extremelyWeak": "Extrêmement Faible",
          "veryWeak": "Très Faible",
          "weak": "Faible",
          "fair": "Passable",
          "fine": "Bien",
          "good": "Bon",
          "strong": "Fort",
          "veryStrong": "Très Fort",
          "great": "Excellent",
          "excellent": "Exceptionnel",
          "superior": "Supérieur"
        },
        "credFormTitle": "Déverrouiller la Base de Données",
        "credFormImportTitle": "Déverrouiller la Base de Données pour l'Importation",
        "credFormTitleNew": "Protéger la Base de Données",
        "credFormPass": "Entrez Votre Mot de Passe",
        "credFormImpPass": "Entrez le Mot de Passe de la Base de Données d'Importation",
        "credFormPin": "Entrez Votre PIN",
        "credFormImportPin": "Entrez le PIN de la Base de Données d'Importation",
        "credFormPersist": "Utiliser Uniquement le PIN",
        "credFormRemovePersist": "Utiliser le Mot de Passe et le PIN",
        "credFormPassHint": "Veuillez entrer un nouveau mot de passe. Il peut contenir entre 10 et 32 caractères et inclure tout type de caractères.",
        "credFormPinHint": "Veuillez fournir un nouveau PIN. Il peut contenir entre 4 et 32 caractères et inclure tout type de caractères.",
        "credFormPersistHint": "Enregistrez de manière sécurisée le mot de passe de la base de données chiffrée sur l'appareil pour permettre le déverrouillage de la base de données en utilisant uniquement le PIN. Ne pas activer cette option si vous utilisez un appareil public.",
        "credFormRemovePersistHint": "Supprimez le mot de passe enregistré de l'appareil. La prochaine fois, la base de données devra être déverrouillée en utilisant le mot de passe et le PIN.",
        "masterPasFormNewDB": "Nouvelle Base de Données",
        "masterPasFormChangePass": "Changement de Mot de Passe de la Base de Données",
        "vListHeads": {
          "notFound": "'${ searchStr }' introuvable.",
          "nameFound": "Nom :",
          "tagsFound": "'${ searchStr }' trouvé dans les Étiquettes :",
          "notesFound": "'${ searchStr }' trouvé dans les Notes :"
        },
        "credChecked": "La connexion uniquement par PIN est activée.",
        "credUnchecked": "La connexion uniquement par PIN est désactivée.",
        "unlockDb": "Déverrouiller la Base de Données",
        "protectDb": "Protéger la Base de Données",
        "withConsent": "L'application a accès au stockage de l'appareil.",
        "withConsentNoIdxdb": "Cependant, actuellement elle ne peut pas persister de base de données sur cet appareil. Il est possible que le mode Privé du navigateur soit activé.",
        "removeConsent": "Cliquez pour activer le mode Privé de l'application (l'application n'aura pas accès au stockage de l'appareil).",
        "noConsent": "L'application est en mode Privé. Cliquez pour activer le stockage de l'application.",
        "browserIsPrivate": "L'application est en mode Privé. La fenêtre du navigateur est en mode Privé. L'application n'a pas accès au stockage de l'appareil.",
        "msgHistory": "Historique des Notifications",
        "inputBoxSearch": "Rechercher..."
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
      "appFailed": {
        "q": "Cos poszlo nie tak... Nie mozna uruchomic Aplikacji. Sprobuj zamknac applikacje i uruchomic ja ponownie.",
        "y": "",
        "n": "W porzadku, rozumiem."
      },
      "offline": {
        "q": "Nie moge polaczyc z chmura.<br><br>Wyglada na to, ze nie masz polaczenia z internetem.",
        "y": "",
        "n": "W porzadku, rozumiem."
      },
      "deleteVendor": {
        "q": "Czy na pewno usunac ${ vName }?",
        "y": "Tak, Ostatecznie!",
        "n": "Nie! To byla pomylka!",
        "i": "deleteVendorBtn"
      },
      "newVersion": {
        "q": "Nowa versia Applikacji jest dostepna.",
        "y": "OK!<br>Aktualizuj teraz i uruchom Aplikacje ponownie.",
        "n": "Nie odswiezaj na razie.<br>Applicacja sama sie odswiezy po ponownym uruchomieniu."
      },
      "syncDbWith": {
        "local": {
          "q": "Czy chcesz automatycznie załadować bazę danych, zapisując ją w pamięci urządzenia?",
          "y": "Tak, proszę zapisz bazę danych w pamięci mojego urządzenia.",
          "n": "Nie, wolę załadować bazę danych ręcznie, gdy będzie to potrzebne.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Czy chcesz zsynchronizowac baze danych z Dropbox?",
          "y": "Tak jest!<br>Zaczynaj!",
          "n": "Nie, nie chce.<br>Dziekuje.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "Czy chcesz zsynchronizowac baze danych z lokalnym plikiem Zapasowej Kopii Bazy Danych?",
          "y": "Tak jest!<br>Zaczynaj!",
          "n": "Nie, nie chce.<br>Dziekuje.",
          "i": "localFile"
        }
      },
      "disconnectDbFrom": {
        "local": {
          "q": "Wlasnie zamierzasz usunac Szybka Baze Danych z tego urzadzenia.<br><br>Mozesz nie byc w stanie uzywac applikacji bez polaczenia z internetem.<br>Nie wplynie to na zadna inna baze danych.",
          "y": "Tak!<br><br>Usun Szybka Baze Danych z tego urzadzenia.<br>",
          "n": "O, nie!<br><br>To byla pomylka.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Wlasnie zamierzasz usunac polaczenie z Baza Danych Dropbox.<br>Baza Danych applikacji nie bedzie zsynchronizowana z Baza Danych Dropbox.<br>Applikacja straci przywilej korzystania z Dropbox.",
          "y": "Tak!<br><br>Usun polaczenie z Dropbox.",
          "n": "O, nie!<br><br>To byla pomylka.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "Wlasnie zamierzasz usunac polaczenie z plikiem Zapasowej Kopii Bazy Danych.<br>Baza Danych applikacji nie bedzie zsynchronizowana z plikiem Zapasowej Kopii Bazy Danych.",
          "y": "Tak!<br><br>Usun polaczenie z plikiem Zapasowej Kopii Bazy Danych.", 
          "n": "O, nie!<br><br>To byla pomylka.",
          "i": "localFile"
        }
      },
      "deleteExistingStore": {
        "local": {
          "q": "Podreczna Baze Danych znajduje sie na urzadzeniu. Co robimy?",
          "y": "Usun istniejaca Podreczna Baze danych z urzadzenia.",
          "n": "Nie usuwaj istniejacej Podrecznej Bazy Danych. Wciaz chce ja uzywac.",
          "i": "local"
        },
        "dbxFile": {
          "q": "Polaczenie z Baza Danych Dropbox istnieje na urzadzeniu. Co robimy?",
          "y": "Usun polaczenie z Dropbox.<br><br>Rozumiem, ze istnieje mozliwosc utraty wszystkich danych z aktualnej Bazy Danych Dropbox.",
          "n": "Nie usuwaj polaczenia z Dropbox.<br><br>Wciaz chce uzywac polaczenie z istniejaca Baza Danych Dropbox.",
          "i": "dbxFile"
        },
        "localFile": {
          "q": "Polaczenie z plikiem Zapasowej Kopii Bazy Danych istnieje na urzadzeniu. Co robimy?",
          "y": "Usun polaczenie z zapasowa Baza Danych.",
          "n": "Nie usuwaj polaczenia. Wciaz bede uzywac istniejacy plik z zapasowa Baza Danych.",
          "i": "localFile"
        }
      },
      "localFileLoadOrCreate": {
        "q": "Czy juz posiadasz plik z Zapasowa Kopia Bazy Danych?",
        "y": "Tak. Posiadam plik Zapasowej Kopii Bazy Danych<br><br>Chce wyrac plik.",
        "n": "Nie, musze stworzyc nowy plik Zapasowej Kopii Bazy Danych<br><br>Chce zapisac nowy plik.",
        "i": "localFile"
      },
      "localFileDownload": {
        "q": "Nie istnieje mozliwosc zsynchronizowania pliku Zapasowej Kopii Bazy Danych na tym urzadzeniu.",
        "y": "Chce pobrac kopie aktualnej bazy danych aplikacji do nowego pliku.<br>",
        "n": "Rozumiem. Nie chce pobierac kopii bazy danych.",
        "i": "localFile"
      },
      "importDb": {
        "q": "Dane zostana zaimportowane. Nazwy importowanych kont beda zawieraly sufix: '(i_1)'.<br><br>Przy kazdym kolejnym imporcie, jesli nazwy kont beda identyczne, numer po podkresleniu bedzie zwiekszany. <br><br>Originalne daty utworzenia i modyfikacji importowanych kont zostana zachowane.",
        "y": "Chce zaimportowac dane.<br>",
        "n": "Nie, Nie chce importowac danych.",
        "i": "impDb"
      },
      "catchLoad": {
        "q": "Wystapil problem polaczenia z ${ sName }.",
        "y": "Usun polaczenie. Zobaczymy czy to pomoze rozwiazac problem.<br>",
        "n": "Nie! Po prostu zignoruj w tej chwili!",
        "i": "${ sKey }"
      },
      "catchSync": {
        "q": "Nie mozna zsynchronizowac ${ sName }<br><br>Komputer mowi:<br><br>${ cErr }",
        "y": "",
        "n": "W porzadku. Rozumiem.",
        "i": "${ sKey }"
      },
      "catchUpdate": {
        "q": "Wystapil problem polaczenia.<br><br>Nie mozna zaktualizowac ${ sName }.<br>Komputer mowi:<br><br>${ cErr }<br><br>Polaczenie zostanie usuniete.",
        "y": "",
        "n": "W porzadku. Rozumiem.",
        "i": "${ sKey }"
      },
"remoteRedirect": {
  "q": "Nastąpi przekierowanie w celu rozpoczęcia procesu autoryzacji połączenia z chmurą.",
  "y": "Tak, proszę o przekierowanie do chmury w celu autoryzacji połączenia.",
  "n": "Nie, wybieram, aby nie łączyć się z chmurą w tej chwili.",
  "i": "${ sKey }"
},
"remoteRedirectWithClipboard": {
  "q": "Aplikacja jest obecnie w Trybie Prywatnym.<br><br>Tymczasowy dostęp do Schowka urządzenia jest wymagany, aby zainicjować autoryzację połączenia z chmurą.",
  "y": "Udzielę dostępu do Schowka na żądanie.<br>Proszę przekierować mnie do chmury, aby autoryzować połączenie.",
  "n": "Nie, wolę nie łączyć się z chmurą w tym momencie.",
  "i": "${ sKey }"
},
      "privateModeUnableSync": {
        "q": "Aplikacja jest w Prywatnym Trybie.<br><br>Nie mozna zachowac na urzadzeniu jako Podreczna Baze Danych.<br><br>By zachowac nane na urzadzeniu, nalezy ponownie uruchomic aplikacje i umozliwic jej dostep do pamieci urzadzenia.",
        "y": "",
        "n": "W porzadku. Rozumiem.",
        "i": "local"
      },
      "removePersisted": {
        "q": "Zaszyfrowane haslo Bazy Danych zostanie usuniete.<br>Zeby odblokowac Baze Danych bedzie nalezalo podac haslo i PIN.",
        "y": "W porzadku. Rozumiem.<br>Uzyje hasla i PIN-u",
        "n": "Nie! Nie chce usuwac zachowanego hasla.",
        "i": "unlockDb"
      },
      "setOlderStore": {
        "q": "${ sName } jest starsza niz Baza Danych Aplikacji.",
        "y": "${ sName } zawiera dane, ktorych chce uzwac.<br><br>${ sName } zastapi Baze Danych Aplikacji.",
        "n": "Baza Danych Aplikacji zawiera dane, ktorych chce uzwac.<br><br>${ sName } zostanie zaktualizowana.",
        "i": "${ sKey }"
      },
      "remoteSyncOrOverwrite": {
        "q": "${ sName } już istnieje w chmurze.",
        "y": "Zsynchronizuj bazę danych aplikacji z danymi z chmury.",
        "n": "Zastąp dane w chmurze aktualną bazą danych aplikacji.",
        "i": "${ sKey }"
      },
        "remoteLoadOrNew": {
          "q": "${sName} już istnieje w chmurze.",
          "y": "Załaduj dane z chmury.",
          "n": "Zastąp istniejące dane w chmurze nową bazą danych.",
          "i": "${sKey}"
        },
      "remoteCreateNew": {
        "q": "${ sName } zostanie utworzona w chmurze.",
        "y": "Tak, proszę.<br>Utwórz nową bazę danych i zsynchronizuj ją z chmurą.",
        "n": "Nie. To była pomyłka.<br>Usuń połączenie z chmurą.",
        "i": "${ sKey }"
      },
      "remoteFileRestore": {
        "q": "Wystąpił problem.<br>Wygląda na to, że ${ sName } jest połączona z aplikacją, ale nie udało się załadować jej danych.<br>Możliwe, że plik bazy danych został usunięty z chmury.",
        "y": "Spróbuj ponownie zapisać dane w chmurze.",
        "n": "Dziwna sytuacja.<br>Po prostu usuń połączenie z chmurą.",
        "i": "${ sKey }"
      },
      "clipboardDelay":{
          "q": "It looks like you didn't approve the access to clipboard on time.",
          "y": "Let's try again.<br>I'll be quicker this time.",
          "n": "I don't want you to access the clipboard.<br>Get lost!.",
          "i": "${ sKey }"
      }
    },
    "message": {
      "noWriteStores": "Ups! Wystąpił problem... Żadna baza danych nie jest dostępna do modyfikacji",
      "storeConnectionTrue": "${ sName } zostala polaczona.",
      "storeConnectionFalse": "${ sName } zostala odlaczona.",
      "storeConnectFail": "Ups! Wystąpił problem... Nie udało się połączyć z bazą danych ${ sName }.",
      "existingDb": "Proszę wprowadzić hasło do bazy danych.",
      "loggedOff": "Baza danych zostala zabezpieczona z powodu braku aktywności. Proszę wprowadzić ponownie hasło, aby uzyskać dostęp do bazy danych.",
      "loadDbStandard": "SecreSync jest w Trybie Standardowym. Załaduj istniejącą bazę danych lub utwórz nową.",
      "loadDbPrivate": "SecreSync jest w Trybie Prywatnym. Załaduj istniejącą bazę danych lub utwórz nową.",
      "dbFailed": "Nie można odblokować bazy danych. Pozostało prób: ${ count }.",
      "logShort": "Login musi mieć co najmniej 3 znaki.",
      "nameShort": "Nazwa konta musi mieć co najmniej 3 znaki.",
      "deleteVendorReject": "Konto '${ vName }' nie zostało usunięte.",
      "deleteVendorFailed": "Ups! Wystąpił problem... Żadna baza danych nie jest dostępna do modyfikacji. Konto '${ vName }' zostało usunięte, ale zmiany będą widoczne tylko do zamknięcia aplikacji. Przywróć połączenie z zewnętrzną bazą danych lub pobierz kopię bazy danych.",
      "submitFormFailed": "Ups! Wystąpił problem... Żadna baza danych nie jest dostępna do modyfikacji. Konto '${ vName }' zostało zaktualizowane, ale zmiany będą widoczne tylko do zamknięcia aplikacji. Przywróć połączenie z zewnętrzną bazą danych lub pobierz kopię bazy danych.",
      "submitFormSucess": "Konto '${ vName }' zostało pomyślnie zaktualizowane.",
      "submitFormSucessModerateFail": "Aktualizacje konta '${ vName }' nie są odzwierciedlone w bazach danych, z którymi rozłączono połączenie. Aktualizacje zostaną zastosowane po przywróceniu połączenia.",
      "submitPassFailed": "Ups! Wystąpił problem... Nie można zapisać nowego hasła dla konta '${ vName }'. Hasło nie zostało zmienione.",
      "vendorExists": "Nazwa konta '${ vName }' jest już używana. Proszę wybrać inną nazwę.",
      "customPassCopied": "Własne hasło zostało skopiowane do schowka.",
      "passCopied": "Hasło zostało skopiowane do schowka.",
      "logCopied": "Login został skopiowany do schowka.",
      "vendorDeleted": "Konto '${ vName }' zostało pomyślnie usunięte.",
      "exitAppConfirm": "Naciśnij ponownie przycisk Wstecz, aby wyjść z aplikacji.",
      "noFilePickedErr": "Nie wybrano pliku bazy danych lub plik jest uszkodzony. Nie można załadować bazy danych...",
      "pickFileFR": "Wybierz plik bazy danych za pomocą FileReader. Baza danych nie może być modyfikowana...",
      "pickImportFile": "Wybierz plik bazy danych do importu.",
      "pickFile": "Proszę wybrać plik bazy danych...",
      "offline": "Brak połączenia z Internetem. Nie można zsynchronizować z chmurą.",
      "online": "Połączenie z Internetem zostało przywrócone.",
      "credFormPinTooLong": "Wprowadzony PIN jest za długi.",
      "credFormPassTooLong": "Wprowadzone hasło jest za długie.",
      "persistedSucess": "Zaszyfrowane hasło zostało zapisane na urządzeniu. Następnym razem zalogujesz się za pomocą PIN-u.",
      "persistedFail": "Ups! Wystąpił problem... Nie można zapisać hasła na urządzeniu.",
      "persistedDeleted": "Hasło zostało usunięte z urządzenia.",
      "persistedBadPin": "Wprowadzony PIN jest nieprawidłowy. Baza danych nie może być odblokowana. Aby odblokować ją za pomocą PIN-u pozostało Ci prób: ${ count }.",
      "dbCredentialsChangeSucess": "Dane logowania zostały pomyślnie zmienione.",
      "dbCredentialsChangeFail": "Dane logowania nie zostały zmienione.",
      "dbCredentialsChangeModerateFail": "Dane logowania nie zostały zmienione w bazach danych, z którymi rozłączono połączenie. Nie będzie możliwe zsynchronizowanie bazy danych z tymi kopiami.",
      "dbCredentialsChangeCriticalFail": "Utracono połączenie z bazą danych. Dane logowania nie zostały zmienione.",
      "emergDbCreated": "Utworzono awaryjną kopię bazy danych: : ${ fName }.",
      "importDbFail": "Bazy danych nie można zaimportować.",
      "importDbCancel": "Import danych został anulowany.",
      "importDbSuccess": "Dane zostały pomyślnie zaimportowane.",
      "langChange": "Język aplikacji został ustawiony na Polski.",
      "dbFileDownloaded": "Kopia bazy danych jest pobierana: ${ fName }",
      "storeIsSyncing": "Baza danych ${ sName } jest obecnie synchronizowana.",
      "remoteAuthorised": "Połączenie aplikacji z chmurą zostało autoryzowane.",
      "remoteConnectFail": "${ sName } remoteConnectFail"
    },
    "app": {
      "titles": {
        "PL": "Polski",
        "GB": "English",
        "FR": "Français",
        "ES": "Español",
        "detDates": "Szczegóły Dat",
        "detNotes": "Szczegóły Notatek",
        "detTags": "Szczegóły Tagów",
        "typeNote": "Notatki",
        "typeLog": "Dane Logowania",
        "vTaskSwitch": "Opcje Sortowania",
        "vTaskSwitchSort": "Opcje Szczegółów",
        "vSortCr8": "Sortuj według Daty Utworzenia",
        "vSortMod": "Sortuj według Daty Modyfikacji",
        "vSortName": "Sortuj według Nazwy",
        "moreMenu": "Więcej Opcji",
        "inputBoxSearchBtn": "Szukaj",
        "hide": "Ukryj",
        "deleteLeft": "Wyczyść",
        "localSync": "Szybkie Połączenie z Bazą Danych",
        "dbxFileSync": "Połączenie z Bazą Danych Dropbox",
        "localFileSync": "Połączenie z Plikem Kopii Zapasowej Bazy Danych",
        "newDbLoad": "Utwórz Nową Bazę Danych",
        "dbxFileLoad": "Połącz z Istniejącą Bazą Danych Dropbox lub Utwórz Nową w Dropbox",
        "localFileLoad": "Załaduj Bazę Danych z Istniejącego Pliku Kopii Zapasowej",
        "localCred": "Szybka Baza Danych",
        "dbxFileCred": "Baza Danych Dropbox",
        "localFileCred": "Zapasowa Kopia Bazy Danych",
        "newDb": "Utwórz Nową Bazę Danych",
        "mpClose": "Odłącz Bazę Danych",
        "loadNewDb": "Utwórz Nową Bazę Danych",
        "reloadApp": "Wyloguj się / Przeładuj Aplikację",
        "changeDbPass": "Zmień Hasło Bazy Danych Aplikacji",
        "emergDb": "Utwórz Awaryjną Kopię Bazy Danych",
        "impDb": "Importuj Dane z Innej Bazy Danych",
        "downDb": "Pobierz Kopię Bazy Danych",
        "addVendorBtn": "Dodaj Konto",
        "submitFormBtn": "Zapisz Zmiany",
        "editFormBtn": "Edytuj Konto",
        "btnCloseForm": "Zamknij",
        "copyLogBtn": "Kopiuj Dane Logowania",
        "copyPassBtn": "Kopiuj Hasło",
        "minusBtn": "Odejmij",
        "plusBtn": "Dodaj",
        "newPassBtn": "Wygeneruj Nowe Hasło",
        "showPassToggleBtn": "Przełącz Widoczność",
        "openLinkBtn": "Otwórz Odnośnik",
        "deleteVendorBtn": "Usuń Konto",
        "toggleToLog": "Konwertuj Notatkę na Dane Logowania",
        "toggleToNote": "Konwertuj Dane Logowania na Notatkę",
        "changeLang": "Zmień Język",
        "donate": "Wesprzyj Naszą Pracę!",
        "credChecked": "Wyłącz Logowanie Tylko za Pomocą PIN",
        "credUnchecked": "Włącz Logowanie Tylko za Pomocą PIN",
        "unlockDb": "Odblokuj Bazę Danych",
        "protectDb": "Zabezpiecz Bazę Danych",
        "formIconTypeNote": "Konto Typu Notatka",
        "formIconTypeLog": "Konto Typu Dane Logowania",
        "local": "Szybka Baza Danych",
        "dbxFile": "Baza Danych Dropbox",
        "localFile": "Zapasowa Kopia Bazy Danych"
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
          "inadequate": "Niewystarczające",
          "extremelyWeak": "Wyjątkowo Słabe",
          "veryWeak": "Bardzo Słabe",
          "weak": "Słabe",
          "fair": "Przeciętne",
          "fine": "Poprawne",
          "good": "Dobre",
          "strong": "Silne",
          "veryStrong": "Bardzo Silne",
          "great": "Świetne",
          "excellent": "Doskonałe",
          "superior": "Wybitne"
        },
        "credFormTitle": "Odblokuj Bazę Danych",
        "credFormImportTitle": "Odblokuj Bazę Danych do importu",
        "credFormTitleNew": "Zabezpiecz Bazę Danych",
        "credFormPass": "Wprowadź swoje hasło",
        "credFormImpPass": "Wprowadź hasło bazy danych do importu",
        "credFormPin": "Wprowadź swój PIN",
        "credFormImportPin": "Wprowadź PIN bazy danych do importu",
        "credFormPersist": "Użyj tylko PIN",
        "credFormRemovePersist": "Użyj hasła i PIN",
        "credFormPassHint": "Proszę wprowadzić nowe hasło. Może mieć od 10 do 32 znaków i zawierać dowolny rodzaj znaków.",
        "credFormPinHint": "Proszę podać nowy PIN. Może mieć od 4 do 32 znaków i zawierać dowolny rodzaj znaków.",
        "credFormPersistHint": "Bezpiecznie zapisz zaszyfrowane hasło bazy danych na urządzeniu, aby umożliwić odblokowanie bazy danych za pomocą samego PIN-u. Nie aktywuj tej opcji, jeśli korzystasz z publicznego urządzenia.",
        "credFormRemovePersistHint": "Usuń zapisane hasło z urządzenia. Następnym razem baza danych będzie musiała zostać odblokowana za pomocą hasła i PIN-u.",
        "masterPasFormNewDB": "Nowa Baza Danych",
        "masterPasFormChangePass": "Zmiana Hasła Bazy Danych",
        "vListHeads": {
          "notFound": "'${ searchStr }' nie znaleziono.",
          "nameFound": "Nazwa:",
          "tagsFound": "'${ searchStr }' znaleziono w Tagach:",
          "notesFound": "'${ searchStr }' znaleziono w Notatkach:"
        },
        "credChecked": "Logowanie wyłącznie za pomocą PIN-u jest aktywowane.",
        "credUnchecked": "Logowanie wyłącznie za pomocą PIN-u jest wyłączone.",
        "unlockDb": "Odblokuj Bazę Danych",
        "protectDb": "Zabezpiecz Bazę Danych",
        "withConsent": "Aplikacja ma dostęp do pamięci urządzenia.",
        "withConsentNoIdxdb": "Jednak obecnie nie może przechowywać żadnej bazy danych na tym urządzeniu.<br>Możliwe, że włączony jest tryb prywatny przeglądarki.",
        "removeConsent": "<br>Kliknij, aby aktywować tryb prywatny aplikacji<br>(aplikacja nie będzie miała dostępu do pamięci urządzenia).",
        "noConsent": "Aplikacja jest w trybie prywatnym.<br>Kliknij, by umożliwic aplikacji dostep do pamięci urządzenia.",
        "browserIsPrivate": "Aplikacja jest w trybie prywatnym.<br>Okno przeglądarki jest w trybie prywatnym.<br>Aplikacja nie ma dostępu do pamięci urządzenia.",
        "msgHistory": "Historia Powiadomień",
        "inputBoxSearch": "Szukaj..."
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