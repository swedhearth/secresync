const txtBankObj = {
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
                    "q": "Czy chcesz zsynchronizowac baze danych z lokalnym zapasowym Plikiemn Bazy Danych?",
                    "y": "Tak jest!<br>Zaczynaj!",
                    "n": "Nie, nie chce.<br>Dziekuje.",
                    "i": "localFile"
                },
            },
            "disconnectDbFrom":{
                "local": {
                    "q": "Wlasnie zamierzasz usunac Podreczna Baze Danych z tego urzadzenia.<br><br>Mozesz nie byc w stanie uzywac applikacji bez polaczenia z internetem.<br>Nie wplynie to na zadna inna baze danych.",
                    "y": "Tak!<br><br>Usun Podreczna Baze Danych z tego urzadzenia.<br>",
                    "n": "O, nie!<br><br>To byla pomylka.",
                    "i": "local"
                },
                "dbxFile": {
                    "q": "Wlasnie zamierzasz usunac polaczenie z Baza Danych Dropbox.<br>Baza Danych applikacji nie bedzie zsynchronizowana z Baza Danych Dropbox.<br>Applikacja straci przywilej korzystania z Dropbox.",
                    "y": "Tak!<br><br>Usun polaczenie z Dropbox!",
                    "n": "O, nie!<br><br>To byla pomylka.",
                    "i": "dbxFile"
                },
                "localFile": {
                    "q": "Wlasnie zamierzasz usunac polaczenie z zapasowym plikiem Bazy Danych.<br>Baza Danych applikacji nie bedzie zsynchronizowana z zapasowym plikiem Bazy Danych.",
                    "y": "Tak!<br><br>Usun polaczenie z zapasowym plikiem Bazy Danych!",
                    "n": "O, nie!<br><br>To byla pomylka.",
                    "i": "localFile"
                },
            },
            "deleteExistingStore":{
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
                    "q": "Polaczenie z zapasowym plikiem Bazy Danych istnieje na urzadzeniu. Co robimy?",
                    "y": "Usun polaczenie z zapasowa Baza Danych.",
                    "n": "Nie usuwaj polaczenia. Wciaz bede uzywac istniejacy plik z zapasowa Baza Danych.",
                    "i": "localFile"
                },
            },
            "localFileLoadOrCreate": {
                "q": "Czy juz posiadasz plik z zapasowa kopia Bazy Danych?",
                "y": "Tak. Posiadam zapasowy plik Bazy Danych<br><br>Chce wyrac plik.",
                "n": "Nie, musze stworzyc nowy zapasowy plik Bazy Danych<br><br>Chce zapisac nowy plik.",
                "i": "localFile"
            },
            "localFileDownload": {
                "q": "Nie istnieje mozliwosc zsynchronizowania Zapasowego Pilku Bazy Danych na tym urzadzeniu.",
                "y": "Chce pobrac aktualna baze danych Aplikacji do nowego zapasowego Pilku Bazy Danych.<br>",
                "n": "Rozumiem. Nie chce pobierac Bazy Danych.",
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
                "i": "${ sKey }",
            },
            "catchSync": {
                "q": "Nie mozna zsynchronizowac ${ sName }<br><br>Komputer mowi:<br><br>${ cErr }",
                "y": "",
                "n": "W porzadku. Rozumiem.",
                "i": "${ sKey }",
            },
            "catchUpdate": {
                "q": "Wystapil problem polaczenia.<br><br>Nie mozna zaktualizowac ${ sName }.<br>Komputer mowi:<br><br>${ cErr }<br><br>Polaczenie zostanie usuniete.",
                "y": "",
                "n": "W porzadku. Rozumiem.",
                "i": "${ sKey }",
            },
            "privateModeEnableClipboard":{
                "q": "Applikacja jest w Prywatnym Trybie.<br><br>By polaczyc do Dropbox, ta Applikacja bedzie wymagac chwilowego dostepu do schowka na urzadzeniu.",
                "y": "Udostepnie schowek gdy applikacja bedzie tego wymagac.",
                "n": "Nie, nie potrzebuje dostepu do Dropbox.",
                "i": "dbxFile",
            },
            "privateModeUnableSync":{
                "q": "Aplikacja jest w Prywatnym Trybie.<br><br>Nie mozna zachowac na urzadzeniu jako Podreczna Baze Danych.<br><br>By zachowac nane na urzadzeniu, nalezy ponownie uruchomic aplikacje i umozliwic jej dostep do pamieci urzadzenia.",
                "y": "",
                "n": "W porzadku. Rozumiem.",
                "i": "local",
            },
            "removePersisted":{
                "q": "Zaszyfrowane haslo Bazy Danych zostanie usuniete.<br>Zeby odblokowac Baze Danych bedzie nalezalo podac haslo i PIN.",
                "y": "W porzadku. Rozumiem.<br>Uzyje hasla i PIN-u",
                "n": "Nie! Nie chce usuwac zachowanego hasla.",
                "i": "unlockDb",
            },
            "setOlderStore":{
                "q": "${ sName } jest starsza niz Baza Danych Aplikacji.",
                "y": "${ sName } zawiera dane, ktorych chce uzwac.<br><br>${ sName } zastapi Baze Danych Aplikacji.",
                "n": "Baza Danych Aplikacji zawiera dane, ktorych chce uzwac.<br><br>${ sName } zostanie zaktualizowana.",
                "i": "${ sKey }",
            }
        },
        "message":{
            "noWriteStores": "Ops! Mamy problem... Zadna baza danych nie jest dostepna do modyfikacji.",
            "storeConnectionTrue": "${ sName } zostala polaczona.",
            "storeConnectionFalse": "${ sName } zostala odlaczona.",
            "storeConnectFail": "Ops! Mamy problem... Baza danych ${ sName } nie zostala polaczona.",
            "existingDb": "Wpisz haslo do swojej Bazy Danych.",
            "loggedOff": "Baza danych zostala zabezpieczona po czasie braku aktywnosci. Wpisz ponownie haslo by odblokowac dane.",
            "loadBd":"Wczytaj istniejaca lub stworz nowa baze danych.",
            "dbFailed": "Baza danych nie moze zostac odblokowana. Masz jeszcze ${ count } proby by ja odblokowac...",
            "logShort": "Login musi miec conajmniej 3 znaki.",
            "nameShort": "Nazwa konta musi miec co najmniej 3 znaki.",
            "deleteVendorReject": "Konto o nazwie '${ vName }' nie zostalo usuniete z bazy danych.",
            "deleteVendorFailed": "Ops! Mamy problem... Zadna baza danych nie jest dostepna do modyfikacji. Konto '${ vName }' zostalo usuniete ale zmiany beda widoczna tylko do momentu zamkniecia aplikacji. Przywroc polaczenie z zewnetrzna baza danych lub pobierz plik z kopia Bazy Danych.",
            "submitFormFailed": "Ops! Mamy problem... Zadna baza danych nie jest dostepna do modyfikacji. Konto '${ vName }' zostalo zaktualizowane ale zmiany beda widoczna tylko do momentu zamkniecia aplikacji. Przywroc polaczenie z zewnetrzna baza danych lub pobierz plik z kopia Bazy Danych.",
            "submitFormSucess": "Konto '${ vName }' zostalo pomyslnie zaktualizowane.",
            "submitFormSucessModerateFail": "Dane konta '${ vName }' nie zostaly zmienione w kopiach baz danych gdzie polaczenie zostalo usuniete. Gdy polaczenie zostanie przywrocone, dane zostana uaktualnione.",
            "submitPassFailed": "Ops! Mamy problem... Nie mozna utworzyc nowego hasla dla konta '${ vName }'. Haslo nie zostalo zmienione.",
            "vendorExists": "Konto o nazwie: '${ vName }' juz istnieje. Wybierz inna nazwe.",
            "customPassCopied": "Wlasne haslo zostalo skopiowane do schowka.",
            "passCopied": "Haslo zostalo skopiowane do schowka.",
            "logCopied": "Login zostal skopiowany do schowka.",
            "vendorDeleted": "Konto o nazwie '${ vName }' zostalo pomyslnie usuniete z bazy danych.",
            "exitAppConfirm": "Ponownie nacisnij przycisk wstecz by wyjsc z Applikacji.",
            "noFilePickedErr": "Plik nie zostal wczytany lub jest uszkodzony. Baza danych nie moze zostac zaladowana...",
            "pickFileFR": "Wybierz plik by wczytac baze danych uzywajac atrybutu 'tylko do odczytu'. Plik bazy danych nie bedzie modyfikowany...",
            "pickImportFile": "Wybierz plik bazy danych do importu.",
            "pickFile": "Wybierz plik bazy danych...",
            "offline": "Nie mozna polaczyc z siecia. Syncronizacja z chmura jest zawieszona.",
            "online": "Polaczenie z siecia zostalo przywrocone.",
            "credFormPinTooLong": "Wklejony PIN jest za dlugi.",
            "credFormPassTooLong": "Wklejone haslo jest za dlugie.",
            "persistedSucess": "Zaszyfrowane haslo zostalo zachowane na urzadzeniu. Nastepnym razem wystarczy PIN",
            "persistedFail": "Ops! Mamy problem... Nie udalo sie zachowac hasla na urzadzeniu.",
            "persistedDeleted": "Haslo zostalo usuniete z urzadzenia.",
            "persistedBadPin": "Bledny PIN. Baza danych nie moze zostac odblokowana. Masz jeszcze ${ count } proby by ja odblokowac uzywajac PIN-u.",
            "dbCredentialsChangeSucess": "Dane logowania zostaly zmienione.",
            "dbCredentialsChangeFail": "Dane logowania nie zostaly zmienione.",
            "dbCredentialsChangeModerateFail": "Dane logowania nie zostaly zmienione w kopiach baz danych gdzie polaczenie zostalo usuniete. Nie bedzie mozna zsynchronizowac bazy danych z tymi kopiami.",
            "dbCredentialsChangeCriticalFail": "Utracono polaczenie z Baza Danych. Dane logowania nie zostaly zmienione.",
            "emergDbCreated": "Zapasowa kopia bazy danych zostala utworzona.",
            "importDbFail": "Baza danych do importu nie moze zostac zaimportowana.",
            "importDbCancel": "Dane nie zostaly zaimportowane.",
            "importDbSuccess": "Dane zostaly zaimportowane.",
            "langChange": "Jezyk applikacji zostal ustawiony na Polski.",
            "dbFileDownloaded": "Pobieram kopie bazy danych: ${ fName }",
            "storeIsSyncing": "Baza danych ${ sName } jest aktualnie synchronizowana",
        },
        "app":{
            "titles": {
                "PL": "Polski",
                "GB": "English",
                "FR": "Française",
                "detDates":"Daty",
                "detNotes": "Notki",
                "detTags": "Etykiety",
                "typeNote": "Kategoria Notatka",
                "typeLog": "Kategoria Logowanie",
                "vTaskSwitch": "Sortuj",
                "vTaskSwitchSort": "Detale",
                "vSortCr8": "Sortuj po Dacie Utworzenia",
                "vSortMod": "Sortuj po dacie Modyfikacji",
                "vSortName": "Sortuj po Nazwie Konta",
                "moreMenu": "Pokaz Wiecej Opcji",
                "inputBoxSearchBtn": "Znajdz",
                "hide": "Schowaj",
                "deleteLeft": "Wyczysc",
                
                "localSync": "Polaczenie Podrecznej Bazy Danych",
                "dbxFileSync": "Polaczenie Bazy Danych Dropbox",
                "localFileSync": "Polaczenie Zapasowego Pliku Bazy Danych",
                
                "newDbLoad": "Utworz Nowa Baze Danych",
                "dbxFileLoad": "Polacz z istniejaca Baze Danych Dropbox lub utworz nowa BazeDanych na Dropbox",
                "localFileLoad": "Wczytaj baze danych z istniejacego zapasowego pliku Bazy Danych",
                
                "localCred": "Podreczna Baza Danych",
                "dbxFileCred": "Baza Danych na Dropbox",
                "localFileCred": "Zapasowa kopia Bazy Danych",
                
                "newDb": "Utworz Nowa Baze Danych",
                "mpClose": "Odlacz Baze Danych",

                



                "loadNewDb": "Utworz Nowa Baze Danych",


                
                "reloadApp": "Wyloguj / Odswiez Aplikacje",
                "changeDbPass": "Zmien Haslo Bazy Danych",
                "emergDb": "Utworz awaryjna kopie Bazy Danych",
                "impDb": "Importuj dane z innej Bazy Danych",
                "downDb": "Pobierz plik z kopia Bazy Danych",


                "addVendorBtn": "Dodaj Konto",
                
                
                "submitFormBtn": "Zachowaj Zmiany",
                "editFormBtn": "Edytuj Konto",

                
                
                
                "btnCloseForm": "Zamknij",
                "copyLogBtn": "Skopiuj Login",
                "copyPassBtn": "Skopjuj Haslo",
                
                "minusBtn": "Odejmij",
                "plusBtn": "Dodaj",
                
                "newPassBtn": "Wygeneruj nowe haslo",

                "showPassToggleBtn": "Zmien widzialnosc",
                "openLinkBtn": "Otworz odnosnik",
                "deleteVendorBtn": "Usun konto",
                "toggleToLog": "Zmien kategorie konta z Notatki na Logowanie",
                "toggleToNote": "Zmien kategorie konta z Logowanie na Notatke",

                "changeLang": "Zmien Jezyk Applikacji",
                "donate": "Wesprzyj nas bysmy mogli rozwijac applikacje!",
                "credChecked": "Wylacz szybkie logowanie",
                "credUnchecked": "Wlacz szybkie logowanie",
                "unlockDb": "Odblokuj Baze Danych",
                "protectDb": "Zabezpiecz Baze Danych",
                "formIconTypeNote": "Konto kategorii Notatka",
                "formIconTypeLog": "Konto kategorii Notatka",
                
                "local": "Podreczna Baza Danych",
                "dbxFile": "Baza Danych na Dropbox",
                "localFile": "Zapasowa kopia Bazy Danych",
            },
            
            "htmls":{
                "infoLine": "Nacisnij ikone by wczytac Baze Danych...",
                "formLabelName": "Nazwa Konta",
                "formLabelLog": "Login / Nazwa Uzytkownika",
                "formLabelPass": "Haslo",
                "formLabelCustomPass": "Wlasne Haslo",
                "formLabelNote": "Notka",
                "formLabelUrl": "Odnosnik",
                "formLabelTags": "Etykiety",
                
                "formLabelPassCplx": "Kompleksowosc Hasla",
                "formLabelPassLen": "Dlugosc Hasla",
                "formLabelPassEntropy": "Entropia Hasla",
                "formLabelPassGrade": "Ocena Hasla",
                
                "vendorPassGradeVal": {
                    "inadequate":"Nie Adekwatne,", // Nie adekwatne, nieodpowiednie, niezadowalajace, ponizej normy
                    "extremelyWeak":"Mierne", //Mierne
                    "veryWeak":"Bardzo Slabe", // Bardzo Slabe
                    "weak":"Slabe", // Mizerne, //Kiepskie
                    "fair":"Znosne", // Znosne
                    "fine":"Satysfakcjonujace", // Przecietne,// Wystarczajace, //zadawalajace, do przyjecia, poprawne, przecietne, satysfakcjonujace, srednie,wzgledne, znosne
                    "good":"Dobre", // Dobre
                    "strong":"Silne", // Silne
                    "veryStrong":"Bardzo Silne", // Bardzo silne
                    "great":"Swietne", // swietne
                    "excellent":"Doskonale", // doskonale
                    "superior":"Wybitne" // wybitne //celujace, wybitne, wysmienite, mistrzowskie, wyborne, wspaniale, znakomite, perfekcyjne, kapitalne
                },
                
                
                
                "credFormTitle": "Odblokuj Baze Danych",
                "credFormImportTitle": "Odblokuj Baze Danych do Importu",
                "credFormTitleNew": "Zabezpiecz Baze Danych",
                "credFormPass": "Wpisz swoje haslo",
                "credFormImpPass": "Wpisz haslo importowanej bazy danych",
                "credFormPin": "Wpisz swoj PIN",
                "credFormImportPin": "Wpisz PIN importowanej bazy danych",
                "credFormPersist": "Uzyj tylko PIN-u",
                "credFormRemovePersist": "Uzyj hasla i PIN-u",
                "credFormPassHint": "Please enter a new Password. It can be between 10 and 32 characters long and contain any type of characters.",
                "credFormPinHint": "Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
                "credFormPersistHint": "Zachowaj zaszyfrowane haslo na urzadzeniu by umozliwic odblokowanie bazy danych tylko za pomoca PIN-u.<br>Nie zaznaczaj tej opcji jezeli nie masz wylacznej kontroli nad urzadzeniem.",
                "credFormRemovePersistHint": "Usun zachowane haslo z urzadzenia. Nastepnym razem baza danych bedzie musiala byc odblokowana za pomoca hasla i PIN-u.",
                "masterPasFormNewDB": "Nowa Baza danych",
                "masterPasFormChangePass": "Zmiana Hasla Bazy Danych",
                "vListHeads":{
                    "notFound": "'<i>${ searchStr }</i>' nie znaleziono.",
                    "nameFound": "Nazwa:",
                    "tagsFound": "'<i>${ searchStr }</i>' znaleziono w Etykietach:",
                    "notesFound": "'<i>${ searchStr }</i>' znaleziono w Notkach:",
                    
                },
                "credChecked": "Logowanie tylko PIN-em jest wlaczone.",
                "credUnchecked": "Logowanie tylko PIN-em jest wylaczone.",
                "unlockDb": "Odblokuj Baze Danych",
                "protectDb": "Zabezpiecz Baze Danych",
                "withConsent": "Aplikacja ma dostep dp pamieci urzadzenia.",
                "withConsentNoIdxdb": "<br>Aczkolwiek, obecnie, nie jest w stanie zachowac bazy danych na tym urzadzeniu.<br>Mozliwe, ze przegladanie w trybie prywatnym (incognito) jast aktywne.",
                "removeConsent": "<br><br>Kliknij by aktywowac Tryb Prywatny Aplikacji<br>(Aplikacja nie bedzie miala dostepu do pamieci urzadzenia).",
                "noConsent": "Aplikacja jest w Trybie Prywatnym.<br>Nacisnij by umozliwic Aplikacji dostep do pamieci urzadzenia.",
                "browserIsPrivate": "Aplikacja jest w Trybie Prywatnym.<br>Okno przegladarki jest w trybie prywatnym.<br>Aplikacja nie ma dostepu do pamieci urzadzenia.",
                "msgHistory": "Historia Notyfikacji",
                "inputBoxSearch": "Szukaj...",
            },

            "values": {
                "badPass": "Password Incorrect... removing all databases...",
                "redirectWelcome": "Juz prawie... Wpisz haslo ponownie",
                "noPass": "Haslo Bazy Danych nie zostalo wpisane",
                "userReject": "Uzytkownik odrzucil mozliwosz wczytania pliku",
                "updateFail": "Aktualizacja sie nie powiodla"
            }

        }
    },
    "GB": {
        "alert": {
            "appFailed": {
                "q": "Something went wrong... The App can't start. Try to reload the App",
                "y": "",
                "n": "W porzadku, rozumiem."
            },
            "offline": {
                "q": "Cant't connect to the cloud.<br><br>It looks like you don't have the internet connection.",
                "y": "",
                "n": "OK. I see."
            },
            "deleteVendor": {
                "q": "Do you really want to delete ${ vName }?",
                "y": "Yes I do!",
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
                    "q": "To load the database automaticaly you can save it in the device memory.",
                    "y": "OK!<br>Save the database in my device's memory!",
                    "n": "No, don't do it.<br>I will load the database manually.",
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
                },
            },
            "disconnectDbFrom":{
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
                },
            },
            "deleteExistingStore":{
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
                },
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
                "q": "There is a problem with the ${ sName } connection.",
                "y": "Lets remove the connection and reload the App.<br>",
                "n": "No! Just ignore it for the time beign!",
                "i": "${ sKey }",
            },
            "catchSync": {
                "q": "Can't Synchronise the ${ sName }<br><br>The computer says:<br><br>${ cErr }",
                "y": "",
                "n": "OK. I see.",
                "i": "${ sKey }",
            },
            "catchUpdate": {
                "q": "There is a problem with the connection<br>Can't update the ${ sName }<br><br>The computer says:<br><br>${ cErr }The connection will be removed.",
                "y": "",
                "n": "OK. I see.",
                "i": "${ sKey }",
            },
            "privateModeEnableClipboard":{
                "q": "The App is in Private Mode.<br><br>This App will need a temporary access to your device's Clipboard in order to connect to the Dropbox after redirection.",
                "y": "I will enable Clipboard access when prompted.",
                "n": "No, I don't need connecting to the Dropbox.",
                "i": "dbxFile",
            },
            "privateModeUnableSync":{
                "q": "The App is in the Private Mode.<br><br>You can't save the Quick Access Database on this device.<br>To save the data on the device, you need to restart the application and enable App Storage.",
                "y": "",
                "n": "OK. I see.",
                "i": "local",
            },
            "removePersisted":{
                "q": "Encrypted database password will be removed from the device.<br>You will have to provide password and PIN to unlock the Database.",
                "y": "OK, I see.<br>I will use password and PIN.",
                "n": "No! I don't want to remove the password from the device.",
                "i": "unlockDb",
            },
            "setOlderStore":{
                "q": "${ sName } is older than the current Application Database.",
                "y": "${ sName } contains<br>the data I want to use.<br><br>Application Database will be updated.",
                "n": "Application Database contains<br>the data I want to use.<br><br>${ sName } will be updated with the Application Database.",
                "i": "${ sKey }",
            }
        },
        "message":{
            "noWriteStores": "Ooops! There is a problem... No Database is available for modification.",
            "storeConnectionTrue": "Connected to ${ sName }",
            "storeConnectionFalse": "${ sName } disconnected",
            "storeConnectFail": "Ooops! There is a problem...  The ${ sName } database has not been connected.",
            "existingDb": "Please enter password to your Database",
            "loggedOff": "You have been logged off after inactivity. Re-input your password to unlock the database.",
            "loadBd":"Load the database or create a new one",
            "dbFailed": "Database cannot be unlocked. You have ${ count } more attempts to unlock it...",
            "logShort": "Login must be at least 3 characters long.",
            "nameShort": "Account Name must be at least 3 characters long.",
            "deleteVendorReject": "The '${ vName }' Account has not been removed.",
            "deleteVendorFailed": "Ooops! There is a problem... No Database is available for modification. The Account '${ vName }' has been successfully removed but the changes will only be visible until you close the application. Restore the connection to an external Database or download copy of the Database.",
            "submitFormFailed": "Ooops! There is a problem... No Database is available for modification. The Account '${ vName }' has been successfully updated but the changes will only be visible until you close the application. Restore the connection to an external Database or download copy of the Database.",
            "submitFormSucess": "The '${ vName }' Account has been successfully updated.",
            "submitFormSucessModerateFail": "The '${ vName }' Account has not been updated in the databases with removed connection. The Account will be updated when connection is restored.",
            "submitPassFailed": "Ooops! There is a problem... Can't save the new Password the '${ vName }' Account. The Password has not been changed.",
            "vendorExists": "Account name: '${ vName }' is already in use! Choose another name.",
            "customPassCopied": "Custom Password copied to clipboard.",
            "passCopied": "Password copied.",
            "logCopied": "Login copied.",
            "vendorDeleted": "The '${ vName }' Account has been successfully deleted.",
            "exitAppConfirm": "Press the Back Button again to exit the App.",
            "noFilePickedErr": "The Database File has not been chosen or is corrupted. Database cannot be loaded...",
            "pickFileFR": "Choose the Database File using the FileReader. Database cannot be modified...",
            "pickImportFile": "Choose the Database File to import.",
            "pickFile": "Choose the Database File...",
            "offline": "No internet connection. Can't sync the cloud.",
            "online": "You are back online.",
            "credFormPinTooLong": "Pasted PIN is too long.",
            "credFormPassTooLong": "Pasted password is too long.",
            "persistedSucess": "Encrypted password has been saved on the device. Next time you will log with PIN",
            "persistedFail": "Ooops! There is a problem...  Can't save the password on the device.",
            "persistedDeleted": "Pasword has been removed from the device.",
            "persistedBadPin": "PIN is incorrect. Database cannot be unlocked. You have ${ count } more attempts to unlock the it with PIN.",
            "dbCredentialsChangeSucess": "Login credentials have been changed.",
            "dbCredentialsChangeFail": "Login credentials have not been changed.",
            "dbCredentialsChangeModerateFail": "Dane logowania nie zostaly zmienione w kopiach baz danych gdzie polaczenie zostalo usuniete. Nie bedzie mozna zsynchronizowac bazy danych z tymi kopiami.",
            "dbCredentialsChangeCriticalFail": "Lost connection with Database. Login credentials have not been changed.",
            "emergDbCreated": "Emergency copy of the database has been created.",
            "importDbFail": "Import Database cannot be imported.",
            "importDbCancel": "Data has not been improrted.",
            "importDbSuccess": "Data has been improrted.",
            "langChange": "App language set to English.",
            "dbFileDownloaded": "Downloading copy of the database: ${ fName }",
            "storeIsSyncing": "The ${ sName } Database is curently syncing",
        },
        "app":{
            "titles": {
                "PL": "Polski",
                "GB": "English",
                "FR": "Française",
                "detDates":"Dates Details",
                "detNotes": "Notes Details",
                "detTags": "Tags Details",
                "typeNote": "Notes",
                "typeLog": "Login Credentials",
                "vTaskSwitch": "Sort Options",
                "vTaskSwitchSort": "Details Options",
                "vSortCr8": "Sort by Create Date",
                "vSortMod": "Sort by Modified Date",
                "vSortName": "Sort by Name",
                "moreMenu": "More Options",
                "inputBoxSearchBtn": "Search",
                "hide": "Hide",
                "deleteLeft": "Clear Input",
                "localSync": "Quick Access Database Connection",
                "dbxFileSync": "Dropbox Database Connection",
                "localFileSync": "Database Backup File Connection",
                "newDbLoad": "Create New Database",
                "dbxFileLoad": "Connect Exisisting Dropbox Database or Create a New Database in the Dropbox",
                "localFileLoad": "Load Database from an Existing Backup File",
                "localCred": "Quick Access Database",
                "dbxFileCred": "Dropbox Database",
                "localFileCred": "Database Backup File",
                "newDb": "Create New Database",
                "mpClose": "Unlink Database",
                "loadNewDb": "Create New Database",
                "reloadApp": "Log Out / Reload the App",
                "changeDbPass": "Change Application Database Password",
                "emergDb": "Create emergency copy of the Database",
                "impDb": "Import data from other Database",
                "downDb": "Download copy of the Database",
                "addVendorBtn": "Add Account",
                "submitFormBtn": "Save Changes",
                "editFormBtn": "Edit Account",
                "btnCloseForm": "Close",
                "copyLogBtn": "Copy Login",
                "copyPassBtn": "Copy Password",
                "minusBtn": "Subtract",
                "plusBtn": "Add",
                "newPassBtn": "Generate New Password",
                "showPassToggleBtn": "Toggle visibility",
                "openLinkBtn": "Open Hyperlink",
                "deleteVendorBtn": "Delete Account",
                "toggleToLog": "Convert Note to Login Credentials",
                "toggleToNote": "Convert Login Credentials to Note",
                "changeLang": "Change Language",
                "donate": "Support us to keep up the good work!",
                "credChecked": "Turn off PIN only login",
                "credUnchecked": "Turn on PIN only login",
                "unlockDb": "Unlock Database",
                "protectDb": "Protect Database",
                "formIconTypeNote": "Note Account",
                "formIconTypeLog": "Login Account",
                "local": "Quick Access Database",
                "dbxFile": "Dropbox Database",
                "localFile": "Database Backup File",
            },
            "htmls":{
                "infoLine": "Please Press the Icon to Load the Database File...",
                "formLabelName": "Account Name",
                "formLabelLog": "Login / Username",
                "formLabelPass": "Password",
                "formLabelCustomPass": "Custom Password",
                "formLabelNote": "Note",
                "formLabelUrl": "Link",
                "formLabelTags": "Tags",
                "formLabelPassCplx": "Password complexity",
                "formLabelPassLen": "Password length",
                "formLabelPassEntropy": "Password Entropy",
                "formLabelPassGrade": "Password Grade",
                "vendorPassGradeVal": {
                    "inadequate":"Inadequate",
                    "extremelyWeak":"Extremely Weak",
                    "veryWeak":"Very Weak",
                    "weak":"Weak",
                    "fair":"Fair", 
                    "fine":"Fine",
                    "good":"Good",
                    "strong":"Strong",
                    "veryStrong":"Very Strong",
                    "great":"Great",
                    "excellent":"Excellent",
                    "superior":"Superior"
                },
                "credFormTitle": "Unlock Database",
                "credFormImportTitle": "Unlock Database for Import",
                "credFormTitleNew": "Protect Database",
                "credFormPass": "Enter your password",
                "credFormImpPass": "Enter Import Database password",
                "credFormPin": "Enter your PIN",
                "credFormImportPin": "Enter Import Database PIN",
                "credFormPersist": "Use PIN only",
                "credFormRemovePersist": "Use password and PIN",
                "credFormPassHint": "Please enter a new Password. It can be between 10 and 32 characters long and contain any type of characters.",
                "credFormPinHint": "Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
                "credFormPersistHint": "Securely save the encrypted database password on the device to enable unlocking the database using the pin only.<br>Do NOT enable this option if using public device",
                "credFormRemovePersistHint": "Remove saved password from the device. Next time the database will have to be unlocked using pasword and PIN.",
                "masterPasFormNewDB": "New Database",
                "masterPasFormChangePass": "Database Password Change",
                "vListHeads":{
                    "notFound": "'<i>${ searchStr }</i>' not found.",
                    "nameFound": "Name:",
                    "tagsFound": "'<i>${ searchStr }</i>' found in Tags:",
                    "notesFound": "'<i>${ searchStr }</i>' found in Notes:",
                },
                "credChecked": "PIN only login is enabled.",
                "credUnchecked": "PIN only login is disabled.",
                "unlockDb": "Unlock Database",
                "protectDb": "Protect Database",
                "withConsent": "The App has access to the Device Storage.",
                "withConsentNoIdxdb": "<br>However, currently it can not persists any database on this device.<br>It's possible that the browser's Private Mode is enabled.",
                "removeConsent": "<br>Click to activate the App Private Mode<br>(The App will not have access to the device storage).",
                "noConsent": "The App is in the Private Mode.<br>Click to enable App Storage.",
                "browserIsPrivate": "The App is in the Private Mode<br>The browser window is in Private mode.<br>The App does not have access to the device storage.",
                "msgHistory": "Notification History",
                "inputBoxSearch": "Search...",
            },
            "values": {
                "badPass": "Password Incorrect... removing all databases...",
                "redirectWelcome": "You almost there. Please re-type your password",
                "noPass": "No Database Password Provided",
                "userReject": "User Rejected Use of the File Handle",
            }

        }
    },
    "FR": { /*TO DO!!!!!!!!!!!!!!!*/
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
                    "q": "By szybko i automatycznie otwierac baze danych bez koniecznosci polaczenia z internetem, mozesz ja zachowac na urzadzeniu w Podrecznej Bazie Danych.",
                    "y": "Zgadzam sie!<br>Zachowaj baze danych w applikacji!",
                    "n": "Nie, nie zachowuj.<br>Bede wczytywal baze danych manualnie.",
                    "i": "local"
                },
                "dbxFile": {
                    "q": "Czy chcesz zsynchronizowac baze danych z Dropbox?",
                    "y": "Tak jest!<br>Zaczynaj!",
                    "n": "Nie, nie chce.<br>Dziekuje.",
                    "i": "dbxFile"
                },
                "localFile": {
                    "q": "Czy chcesz zsynchronizowac baze danych z lokalnym zapasowym Plikiemn Bazy Danych?",
                    "y": "Tak jest!<br>Zaczynaj!",
                    "n": "Nie, nie chce.<br>Dziekuje.",
                    "i": "localFile"
                },
            },
            "disconnectDbFrom":{
                "local": {
                    "q": "Wlasnie zamierzasz usunac Podreczna Baze Danych z tego urzadzenia.<br><br>Mozesz nie byc w stanie uzywac applikacji bez polaczenia z internetem.<br>Nie wplynie to na zadna inna baze danych.",
                    "y": "Tak!<br><br>Usun Podreczna Baze Danych z tego urzadzenia.<br>",
                    "n": "O, nie!<br><br>To byla pomylka.",
                    "i": "local"
                },
                "dbxFile": {
                    "q": "Wlasnie zamierzasz usunac polaczenie z Baza Danych Dropbox.<br>Baza Danych applikacji nie bedzie zsynchronizowana z Baza Danych Dropbox.<br>Applikacja straci przywilej korzystania z Dropbox.",
                    "y": "Tak!<br><br>Usun polaczenie z Dropbox!",
                    "n": "O, nie!<br><br>To byla pomylka.",
                    "i": "dbxFile"
                },
                "localFile": {
                    "q": "Wlasnie zamierzasz usunac polaczenie z zapasowym plikiem Bazy Danych.<br>Baza Danych applikacji nie bedzie zsynchronizowana z zapasowym plikiem Bazy Danych.",
                    "y": "Tak!<br><br>Usun polaczenie z zapasowym plikiem Bazy Danych!",
                    "n": "O, nie!<br><br>To byla pomylka.",
                    "i": "localFile"
                },
            },
            "deleteExistingStore":{
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
                    "q": "Polaczenie z zapasowym plikiem Bazy Danych istnieje na urzadzeniu. Co robimy?",
                    "y": "Usun polaczenie z zapasowa Baza Danych.",
                    "n": "Nie usuwaj polaczenia. Wciaz bede uzywac istniejacy plik z zapasowa Baza Danych.",
                    "i": "localFile"
                },
            },
            "localFileLoadOrCreate": {
                "q": "Czy juz posiadasz plik z zapasowa kopia Bazy Danych?",
                "y": "Tak. Posiadam zapasowy plik Bazy Danych<br><br>Chce wyrac plik.",
                "n": "Nie, musze stworzyc nowy zapasowy plik Bazy Danych<br><br>Chce zapisac nowy plik.",
                "i": "localFile"
            },
            "localFileDownload": {
                "q": "Nie istnieje mozliwosc zsynchronizowania Zapasowego Pilku Bazy Danych na tym urzadzeniu.",
                "y": "Chce pobrac aktualna baze danych Aplikacji do nowego zapasowego Pilku Bazy Danych.<br>",
                "n": "Rozumiem. Nie chce pobierac Bazy Danych.",
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
                "i": "${ sKey }",
            },
            "catchSync": {
                "q": "Nie mozna zsynchronizowac ${ sName }<br><br>Komputer mowi:<br><br>${ cErr }",
                "y": "",
                "n": "W porzadku. Rozumiem.",
                "i": "${ sKey }",
            },
            "catchUpdate": {
                "q": "Wystapil problem polaczenia.<br><br>Nie mozna zaktualizowac ${ sName }.<br>Komputer mowi:<br><br>${ cErr }<br><br>Polaczenie zostanie usuniete.",
                "y": "",
                "n": "W porzadku. Rozumiem.",
                "i": "${ sKey }",
            },
            "privateModeEnableClipboard":{
                "q": "Applikacja jest w Prywatnym Trybie.<br><br>By polaczyc do Dropbox, ta Applikacja bedzie wymagac chwilowego dostepu do schowka na urzadzeniu.",
                "y": "Udostepnie schowek gdy applikacja bedzie tego wymagac.",
                "n": "Nie, nie potrzebuje dostepu do Dropbox.",
                "i": "dbxFile",
            },
            "privateModeUnableSync":{
                "q": "Aplikacja jest w Prywatnym Trybie.<br><br>Nie mozna zachowac na urzadzeniu jako Podreczna Baze Danych.<br><br>By zachowac nane na urzadzeniu, nalezy ponownie uruchomic aplikacje i umozliwic jej dostep do pamieci urzadzenia.",
                "y": "",
                "n": "W porzadku. Rozumiem.",
                "i": "local",
            },
            "removePersisted":{
                "q": "Zaszyfrowane haslo Bazy Danych zostanie usuniete.<br>Zeby odblokowac Baze Danych bedzie nalezalo podac haslo i PIN.",
                "y": "W porzadku. Rozumiem.<br>Uzyje hasla i PIN-u",
                "n": "Nie! Nie chce usuwac zachowanego hasla.",
                "i": "unlockDb",
            },
            "setOlderStore":{
                "q": "${ sName } jest starsza niz Baza Danych Aplikacji.",
                "y": "${ sName } zawiera dane, ktorych chce uzwac.<br><br>${ sName } zastapi Baze Danych Aplikacji.",
                "n": "Baza Danych Aplikacji zawiera dane, ktorych chce uzwac.<br><br>${ sName } zostanie zaktualizowana.",
                "i": "${ sKey }",
            }
        },
        "message":{
            "noWriteStores": "Ops! Mamy problem... Zadna baza danych nie jest dostepna do modyfikacji.",
            "storeConnectionTrue": "${ sName } zostala polaczona.",
            "storeConnectionFalse": "${ sName } zostala odlaczona.",
            "storeConnectFail": "Ops! Mamy problem... Baza danych ${ sName } nie zostala polaczona.",
            "existingDb": "Wpisz haslo do swojej Bazy Danych.",
            "loggedOff": "Baza danych zostala zabezpieczona po czasie braku aktywnosci. Wpisz ponownie haslo by odblokowac dane.",
            "loadBd":"Wczytaj istniejaca lub stworz nowa baze danych.",
            "dbFailed": "Baza danych nie moze zostac odblokowana. Masz jeszcze ${ count } proby by ja odblokowac...",
            "logShort": "Login musi miec conajmniej 3 znaki.",
            "nameShort": "Nazwa konta musi miec co najmniej 3 znaki.",
            "deleteVendorReject": "Konto o nazwie '${ vName }' nie zostalo usuniete z bazy danych.",
            "deleteVendorFailed": "Ops! Mamy problem... Zadna baza danych nie jest dostepna do modyfikacji. Konto '${ vName }' zostalo usuniete ale zmiany beda widoczna tylko do momentu zamkniecia aplikacji. Przywroc polaczenie z zewnetrzna baza danych lub pobierz plik z kopia Bazy Danych.",
            "submitFormFailed": "Ops! Mamy problem... Zadna baza danych nie jest dostepna do modyfikacji. Konto '${ vName }' zostalo zaktualizowane ale zmiany beda widoczna tylko do momentu zamkniecia aplikacji. Przywroc polaczenie z zewnetrzna baza danych lub pobierz plik z kopia Bazy Danych.",
            "submitFormSucess": "Konto '${ vName }' zostalo pomyslnie zaktualizowane.",
            "submitFormSucessModerateFail": "Dane konta '${ vName }' nie zostaly zmienione w kopiach baz danych gdzie polaczenie zostalo usuniete. Gdy polaczenie zostanie przywrocone, dane zostana uaktualnione.",
            "submitPassFailed": "Ops! Mamy problem... Nie mozna utworzyc nowego hasla dla konta '${ vName }'. Haslo nie zostalo zmienione.",
            "vendorExists": "Konto o nazwie: '${ vName }' juz istnieje. Wybierz inna nazwe.",
            "customPassCopied": "Wlasne haslo zostalo skopiowane do schowka.",
            "passCopied": "Haslo zostalo skopiowane do schowka.",
            "logCopied": "Login zostal skopiowany do schowka.",
            "vendorDeleted": "Konto o nazwie '${ vName }' zostalo pomyslnie usuniete z bazy danych.",
            "exitAppConfirm": "Ponownie nacisnij przycisk wstecz by wyjsc z Applikacji.",
            "noFilePickedErr": "Plik nie zostal wczytany lub jest uszkodzony. Baza danych nie moze zostac zaladowana...",
            "pickFileFR": "Wybierz plik by wczytac baze danych uzywajac atrybutu 'tylko do odczytu'. Plik bazy danych nie bedzie modyfikowany...",
            "pickFile": "Wybierz plik bazy danych...",
            "pickImportFile": "Wybierz plik bazy danych do importu.",
            "offline": "Nie mozna polaczyc z siecia. Syncronizacja z chmura jest zawieszona.",
            "online": "Polaczenie z siecia zostalo przywrocone.",
            "credFormPinTooLong": "Wklejony PIN jest za dlugi.",
            "credFormPassTooLong": "Wklejone haslo jest za dlugie.",
            "persistedSucess": "Zaszyfrowane haslo zostalo zachowane na urzadzeniu. Nastepnym razem wystarczy PIN",
            "persistedFail": "Ops! Mamy problem... Nie udalo sie zachowac hasla na urzadzeniu.",
            "persistedDeleted": "Haslo zostalo usuniete z urzadzenia.",
            "persistedBadPin": "Bledny PIN. Baza danych nie moze zostac odblokowana. Masz jeszcze ${ count } proby by ja odblokowac uzywajac PIN-u.",
            "dbCredentialsChangeSucess": "Dane logowania zostaly zmienione.",
            "dbCredentialsChangeFail": "Dane logowania nie zostaly zmienione.",
            "dbCredentialsChangeModerateFail": "Dane logowania nie zostaly zmienione w kopiach baz danych gdzie polaczenie zostalo usuniete. Nie bedzie mozna zsynchronizowac bazy danych z tymi kopiami.",
            "dbCredentialsChangeCriticalFail": "Utracono polaczenie z Baza Danych. Dane logowania nie zostaly zmienione.",
            "emergDbCreated": "Zapasowa kopia bazy danych zostala utworzona.",
            "importDbFail": "Baza danych do importu nie moze zostac zaimportowana.",
            "importDbCancel": "Dane nie zostaly zaimportowane.",
            "importDbSuccess": "Dane zostaly zaimportowane.",
            "langChange": "Jezyk applikacji zostal ustawiony na Française.",
            "dbFileDownloaded": "Pobieram kopie bazy danych: ${ fName }",
            "storeIsSyncing": "Baza danych ${ sName } jest aktualnie synchronizowana",
        },
        "app":{
            "titles": {
                "PL": "Polski",
                "GB": "English",
                "FR": "Française",
                "detDates":"Daty",
                "detNotes": "Notki",
                "detTags": "Etykiety",
                "typeNote": "Kategoria Notatka",
                "typeLog": "Kategoria Logowanie",
                "vTaskSwitch": "Sortuj",
                "vTaskSwitchSort": "Detale",
                "vSortCr8": "Sortuj po Dacie Utworzenia",
                "vSortMod": "Sortuj po dacie Modyfikacji",
                "vSortName": "Sortuj po Nazwie Konta",
                "moreMenu": "Pokaz Wiecej Opcji",
                "inputBoxSearchBtn": "Znajdz",
                "hide": "Schowaj",
                "deleteLeft": "Wyczysc",
                
                "localSync": "Polaczenie Podrecznej Bazy Danych",
                "dbxFileSync": "Polaczenie Bazy Danych Dropbox",
                "localFileSync": "Polaczenie Zapasowego Pliku Bazy Danych",
                
                "newDbLoad": "Utworz Nowa Baze Danych",
                "dbxFileLoad": "Polacz z istniejaca Baze Danych Dropbox lub utworz nowa BazeDanych na Dropbox",
                "localFileLoad": "Wczytaj baze danych z istniejacego zapasowego pliku Bazy Danych",

                "localCred": "Podreczna Baza Danych",
                "dbxFileCred": "Baza Danych na Dropbox",
                "localFileCred": "Zapasowa kopia Bazy Danych",
                
                "newDb": "Utworz Nowa Baze Danych",
                "mpClose": "Odlacz Baze Danych",



                "loadNewDb": "Utworz Nowa Baze Danych",

                
                "reloadApp": "Wyloguj / Odswiez Aplikacje",
                "changeDbPass": "Zmien Haslo Bazy Danych",
                "emergDb": "Utworz awaryjna kopie Bazy Danych",
                "impDb": "Importuj dane z innej Bazy Danych",
                "downDb": "Pobierz plik z kopia Bazy Danych",


                "addVendorBtn": "Dodaj Konto",
                
                "submitFormBtn": "Zachowaj Zmiany",
                "editFormBtn": "Edytuj Konto",

                
                "btnCloseForm": "Zamknij",
                "copyLogBtn": "Skopiuj Login",
                "copyPassBtn": "Skopjuj Haslo",
                
                "minusBtn": "Odejmij",
                "plusBtn": "Dodaj",
                
                "newPassBtn": "Wygeneruj nowe haslo",

                "showPassToggleBtn": "Zmien widzialnosc",
                "openLinkBtn": "Otworz odnosnik",
                "deleteVendorBtn": "Usun konto",
                "toggleToLog": "Zmien kategorie konta z Notatki na Logowanie",
                "toggleToNote": "Zmien kategorie konta z Logowanie na Notatke",

                "changeLang": "Zmien Jezyk Applikacji",
                "donate": "Wesprzyj nas bysmy mogli rozwijac applikacje!",
                "credChecked": "Wylacz szybkie logowanie",
                "credUnchecked": "Wlacz szybkie logowanie",
                "unlockDb": "Unlock Database",
                "protectDb": "Zabezpiecz Baze Danych",
                "formIconTypeNote": "Konto kategorii Notatka",
                "formIconTypeLog": "Konto kategorii Notatka",
                
                "local": "Podreczna Baza Danych",
                "dbxFile": "Baza Danych na Dropbox",
                "localFile": "Zapasowa kopia Bazy Danych",
            },
            
            "htmls":{
                "infoLine": "Nacisnij ikone by wczytac Baze Danych...",
                "formLabelName": "Nazwa Konta",
                "formLabelLog": "Login / Nazwa Uzytkownika",
                "formLabelPass": "Haslo",
                "formLabelCustomPass": "Wlasne Haslo",
                "formLabelNote": "Notka",
                "formLabelUrl": "Odnosnik",
                "formLabelTags": "Etykiety",
                
                "formLabelPassCplx": "Kompleksowosc Hasla",
                "formLabelPassLen": "Dlugosc Hasla",
                "formLabelPassEntropy": "Entropia Hasla",
                "formLabelPassGrade": "Ocena Hasla",
                
                "vendorPassGradeVal": {
                    "inadequate":"Nie Adekwatne,", // Nie adekwatne, nieodpowiednie, niezadowalajace, ponizej normy
                    "extremelyWeak":"Mierne", //Mierne
                    "veryWeak":"Bardzo Slabe", // Bardzo Slabe
                    "weak":"Slabe", // Mizerne, //Kiepskie
                    "fair":"Znosne", // Znosne
                    "fine":"Satysfakcjonujace", // Przecietne,// Wystarczajace, //zadawalajace, do przyjecia, poprawne, przecietne, satysfakcjonujace, srednie,wzgledne, znosne
                    "good":"Dobre", // Dobre
                    "strong":"Silne", // Silne
                    "veryStrong":"Bardzo Silne", // Bardzo silne
                    "great":"Swietne", // swietne
                    "excellent":"Doskonale", // doskonale
                    "superior":"Wybitne" // wybitne //celujace, wybitne, wysmienite, mistrzowskie, wyborne, wspaniale, znakomite, perfekcyjne, kapitalne
                },
                

                
                
                "credFormTitle": "Odblokuj Baze Danych",
                "credFormImportTitle": "Odblokuj Baze Danych do Importu",
                "credFormTitleNew": "Zabezpiecz Baze Danych",
                "credFormPass": "Wpisz swoje haslo",
                "credFormImpPass": "Wpisz haslo importowanej bazy danych",
                "credFormPin": "Wpisz swoj PIN",
                "credFormImportPin": "Wpisz PIN importowanej bazy danych",
                "credFormPersist": "Uzyj tylko PIN-u",
                "credFormRemovePersist": "Uzyj hasla i PIN-u",
                "credFormPassHint": "Please enter a new Password. It can be between 10 and 32 characters long and contain any type of characters.",
                "credFormPinHint": "Please provide a new PIN. It can be between 4 and 32 characters long and contain any type of characters.",
                "credFormPersistHint": "Zachowaj zaszyfrowane haslo na urzadzeniu by nastepnym razem umozliwic odblokowanie bazy danych tylko za pomoca PIN-u.<br>Nie zaznaczaj tej opcji jezeli nie masz wylacznej kontroli nad urzadzeniem.",
                "credFormRemovePersistHint": "Usun zachowane haslo z urzadzenia. Nastepnym razem baza danych bedzie musiala byc odblokowana za pomoca hasla i PIN-u.",
                "masterPasFormNewDB": "Nowa Baza danych",
                "masterPasFormChangePass": "Zmiana Hasla Bazy Danych",
                "vListHeads":{
                    "notFound": "'<i>${ searchStr }</i>' nie znaleziono.",
                    "nameFound": "Nazwa:",
                    "tagsFound": "'<i>${ searchStr }</i>' znaleziono w Etykietach:",
                    "notesFound": "'<i>${ searchStr }</i>' znaleziono w Notkach:",
                    
                },
                "credChecked": "Logowanie tylko PIN-em jest wlaczone.",
                "credUnchecked": "Logowanie tylko PIN-em jest wylaczone.",
                "unlockDb": "Odblokuj Baze Danych",
                "protectDb": "Zabezpiecz Baze Danych",
                "withConsent": "Aplikacja ma dostep dp pamieci urzadzenia.",
                "withConsentNoIdxdb": "<br>Aczkolwiek, obecnie, nie jest w stanie zachowac bazy danych na tym urzadzeniu.<br>Mozliwe, ze przegladanie w trybie prywatnym (incognito) jast aktywne.",
                "removeConsent": "<br><br>Kliknij by aktywowac Tryb Prywatny Aplikacji<br>(Aplikacja nie bedzie miala dostepu do pamieci urzadzenia).",
                "noConsent": "Aplikacja jest w Trybie Prywatnym.<br>Nacisnij by umozliwic Aplikacji dostep do pamieci urzadzenia.",
                "browserIsPrivate": "Aplikacja jest w Trybie Prywatnym.<br>Okno przegladarki jest w trybie prywatnym.<br>Aplikacja nie ma dostepu do pamieci urzadzenia.",
                "msgHistory": "Historique des notifications",
                "inputBoxSearch": "Szukaj...",
            },
            "values": {
                //"noPrevPass": "No Previous Password",
                //"errNoDB": "Baza danych nie zostala znaleziona...",
                "badPass": "Password Incorrect... removing all databases...",
                "redirectWelcome": "Juz prawie... Wpisz haslo ponownie",
                "noPass": "Haslo Bazy Danych nie zostalo wpisane",
                "userReject": "Uzytkownik odrzucil mozliwosz wczytania pliku",
                //"updateFail": "Aktualizacja sie nie powiodla"
            }

        }
    }
};