import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom'
import { Box } from "@mui/system";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Overlay from "./Overlay";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import PanelV2 from "./PanelV2";
import { createContext, useContext } from 'react';
import SignIn from "./SignIn";
import AppSelector from "./AppSelector";
import SignInByCardNumber from "./SignInByLink";
import SignInByLink from "./SignInByLink";

import Wallpaper from "./Wallpaper";
import SelectDialog from "./SelectDialog";


export var headers = {
  "Leaks": ["ID Naprawy", "Nieszczelności", "Osoby odpowiedzialne", "ID Pracownika", "Numer zamówienia", "Czas zakończenia", "Czas logowania", "Czas rozpoczęcia", "Stanowisko"],
  "WoodApp": ["ID zamówienia", "ID pracownika", "Typ zamówienia", "Waga", "Zrealizowano", "Data zamówienia", "Cena za kg", "Data odebrania", "Cena netto", "Cena brutto", "Plant", "Imię", "Nazwisko"]
};

export const columnOrder = {
  "WoodApp": [0, 1, 11, 12, 2, 6, 3, 8, 9, 5, 7, 4, 10]
}


export const dateTimeHeaders = {
  "WoodApp": [5, 7]
}

export const booleanHeaders = {
  "WoodApp": [4]
}

export const switches = {
  "WoodApp": {
    10: ["P1", "P2"],
    2: ["wKawalkach", "wPaletach"]
  }
}
//TODO: Zrobic też dla Leaks



export default function App(props) {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [token, setToken] = useState(null);

  const [isSignedInByLink, setIsSignedInByLink] = useState("false");

  const [availableHeliumMachines, setAvailableHeliumMachines] = useState([]);
  const [selectedHeliumMachinesId, setSelectedHeliumMachinesId] = useState([]);
  const [heliumSelectorOpen, setHeliumSelectorOpen] = useState(false);
  



  useEffect(() => {
    const t = sessionStorage.getItem("token");
    const n = sessionStorage.getItem("name");
    const sn = sessionStorage.getItem("surname");
    const uId = sessionStorage.getItem("userId");
    const iSBL = sessionStorage.getItem("isSignedInByLink");

    if (t && n && sn && uId) {
      setToken(t);
      setName(n);
      setSurname(sn);
      setUserId(uId);
      setIsSignedInByLink(iSBL);
    }
  }, [])

  






  const [loading, setLoading] = useState(false);

  const [contactErrorInfo, setContactErrorInfo] = useState(false);


  const [dateLabel, setDateLabel] = React.useState("Nie można wczytać daty!");


  const passwordRef = useRef(null);


  const [selectedLanguage, setSelectedLanguage] = React.useState(localStorage.getItem('selectedLanguage') || "pl");

  const lastUpdate = "05.07.2023 17:00";



  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  

  const rows = useRef([]);
  const filteredRows = React.useRef([]);

  const [heliumHeaders, setHeliumHeaders] = useState([]);

  const [cardNumber, setCardNumber] = useState(sessionStorage.getItem('cardNumber') || null);

  const [searchTags, setSearchTags] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  const [leaksPerms, setLeaksPerms] = useState(sessionStorage.getItem('leaks_perms'));
  const [woodAppPerms, setWoodAppPerms] = useState(sessionStorage.getItem('woodapp_perms'));
  const [heliumPerms, setHeliumPerms] = useState(sessionStorage.getItem('helium_perms'));

  



  useEffect(() => {
    rows.current = [];
    filteredRows.current = [];
  }, []);

  useEffect(() => {
    console.log("Pages count: " + pagesCount);
  }, [pagesCount])



  const languageStrings = {
    pl: {
      "appTitle": "Panel administracyjny",
      "appUnderDevelopment": "Aplikacja jest w trakcie rozwoju! Niektóre funkcje mogą nie działać poprawnie! Wszelkie uwagi lub błędy prosimy zgłaszać pod numer wewnętrzny programisty: 289. Ostatnia aktualizacja: " + lastUpdate,
      "adminPanel": "Panel administracyjny",
      "signIn": "Zeskanuj kartę pracownika",
      "signInHint": "Aby zeskanować kartę musisz najpierw kliknąć w okno tak aby stało się aktywne.",
      "notSignedIn": "Niezalogowany",
      "signOut": "Wyloguj się",
      "pleaseWait": "Proszę czekać...",
      "close": "Zamknij",
      "error": "Wystąpił błąd podczas przetwarzania żądania. Spróbuj ponownie wykonać ostatnią operację. Jeśli problem nadal będzie się pojawiał skontaktuj się z programistą działu IT!",
      "fillData": "Podaj wymagane informacje, a następnie kliknij przycisk aby rozpocząć naprawę.",
      "orderNumber": "Numer zamówienia produkcyjnego",
      "responsiblePerson": "Osoba odpowiedzialna",
      "addManually": "Dodaj ręcznie",
      "workplace": "Stanowisko pracy",
      "selectionTime": "Czas wyboru",
      "fixTime": "Czas naprawy",
      "stateFixed": "Naprawiono",
      "stateStartFix": "Rozpocznij naprawę",
      "addManuallyResponsiblePerson": "Dodaj ręcznie osobę odpowiedzialną",
      "chooseLeak": "Wybierz nieszczelność",
      "signInSuccess": "Zalogowano pomyślnie!",
      "signInError": "Nie udało się zalogować!",
      "apply": "Zatwierdź",
      "or": "lub",
      "return": "Powrót do ekranu głównego",
      "delete": "Usuń",

      "leak900": "NIESZCZELNOŚĆ NA SPOINIE NÓŻKI KOLEKTORA, ZAWORU BĄDŹ MONOBLOKA",
      "leak901": "ROZERWANE KOLANKO, PRZEGRZANE",
      "leak902": "NIESZCZELNOŚĆ NA RURCE W MIEJSCU ZACISKANIA POD RURKĘ O MNIEJSZEJ ŚREDNICY NIŻ OBIEGOWA",
      "leak904": "NIESZCZELNOŚĆ NA SPOINIE KOLANKA",
      "leak905": "PRZEPALONE KOLANKO",
      "leak950": "NIESZCZELNOŚĆ NA ZAMKNIĘCIU KOLEKTORA LUB NA SPOINACH POMIĘDZY NÓŻKAMI I KORPUSEM LUB MIĘDZY RURKĄ WYJŚCIOWĄ I KORPUSEM",
      "leak951": "NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY ZAWORKIEM I RURKĄ MIEDZIANĄ",
      "leak952": "NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY DYFUZOREM I KAPILARĄ",
      "leak955": "NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY RURKĄ KAPILARNĄ I RURKĄ",
      "leak958": "NIESZCZELNOŚCI NA POŁĄCZENIU RUREK DO RUREK / RUREK DO ŚRUBUNKÓW",
      "leak960": "NIESZCZELNOŚĆ NA ŁĄCZENIU RURKI Z PIASTRINĄ",


      "username": "Nazwa użytkownika",
      "password": "Hasło",
      "cardId": "Numer karty",
      "appSelectorTitle": "Wybierz aplikację",
      "manageLeaks": "Zarządzaj nieszczelnościami",
      "chooseHeliumMachines": "Wybierz helownice do wyświetlenia",
    },
    en: {
      "appTitle": "AdminPanel",
      "appUnderDevelopment": "The application is under development! Some functions may not work properly! Any comments or errors should be reported to the internal number of the programmer: 289. Last update: " + lastUpdate,
      "adminPanel": "Admin panel",
      "signIn": "Scan employee card",
      "signInHint": "To scan the card you must first click on the window so that it becomes active.",
      "notSignedIn": "Not signed in",
      "signOut": "Sign out",
      "pleaseWait": "Please wait...",
      "close": "Close",
      "error": "An error occurred while processing the request. Try to perform the last operation again. If the problem persists, contact the IT department programmer!",
      "fillData": "Enter the required information and then click the button to start the repair.",
      "orderNumber": "Production order number",
      "responsiblePerson": "Responsible person",
      "addManually": "Add manually",
      "workplace": "Workplace",
      "selectionTime": "Selection time",
      "fixTime": "Fix time",
      "stateFixed": "Fixed",
      "stateStartFix": "Start fix",
      "addManuallyResponsiblePerson": "Add responsible person manually",
      "chooseLeak": "Choose leak",
      "signInSuccess": "Signed in successfully!",
      "signInError": "Failed to sign in!",
      "apply": "Apply",
      "or": "or",
      "return": "Return to home page",
      "delete": "Delete",

      "leak900": "NIESZCZELNOŚĆ NA SPOINIE NÓŻKI KOLEKTORA, ZAWORU BĄDŹ MONOBLOKA",
      "leak901": "ROZERWANE KOLANKO, PRZEGRZANE",
      "leak902": "NIESZCZELNOŚĆ NA RURCE W MIEJSCU ZACISKANIA POD RURKĘ O MNIEJSZEJ ŚREDNICY NIŻ OBIEGOWA",
      "leak904": "NIESZCZELNOŚĆ NA SPOINIE KOLANKA",
      "leak905": "PRZEPALONE KOLANKO",
      "leak950": "NIESZCZELNOŚĆ NA ZAMKNIĘCIU KOLEKTORA LUB NA SPOINACH POMIĘDZY NÓŻKAMI I KORPUSEM LUB MIĘDZY RURKĄ WYJŚCIOWĄ I KORPUSEM",
      "leak951": "NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY ZAWORKIEM I RURKĄ MIEDZIANĄ",
      "leak952": "NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY DYFUZOREM I KAPILARĄ",
      "leak955": "NIESZCZELNOŚĆ NA SPOINACH POMIĘDZY RURKĄ KAPILARNĄ I RURKĄ",
      "leak958": "NIESZCZELNOŚCI NA POŁĄCZENIU RUREK DO RUREK / RUREK DO ŚRUBUNKÓW",
      "leak960": "NIESZCZELNOŚĆ NA ŁĄCZENIU RURKI Z PIASTRINĄ",

      "username": "Username",
      "password": "Password",
      "cardId": "Card ID",
      "appSelectorTitle": "Select application",
      "manageLeaks": "Manage leaks",
      "chooseHeliumMachines": "Choose helium machines",
    },
    ru: {
      "appTitle": "Панель администратора",
      "appUnderDevelopment": "Приложение находится в разработке! Некоторые функции могут работать неправильно! Пожалуйста, сообщайте о любых замечаниях или ошибках по внутреннему номеру программистам: 289. Последнее обновление: " + lastUpdate,
      "adminPanel": "Панель администрирования",
      "signIn": "Отсканируйте карту работника",
      "signInHint": "Для сканирования карты необходимо сначала нажать на окно, чтобы оно стало активным",
      "notSignedIn": "Незалогированный",
      "signOut": "выйти",
      "pleaseWait": "Пожалуйста, подождите...",
      "close": "закрыть",
      "error": "Во время обработки Вашего запроса произошла ошибка. Повторите последнюю операцию. Если проблема не устранена, обратитесь к отделу программирования!",
      "fillData": "Заполните необходимую информацию, а затем нажмите кнопку, чтобы начать ремонт",
      "orderNumber": "Номер производственного заказа",
      "responsiblePerson": "Ответственное лицо",
      "addManually": "Добавить вручную",
      "workplace": "Место работы",
      "selectionTime": "Время выбора",
      "fixTime": "Время ремонта",
      "stateFixed": "Отремонтировано",
      "stateStartFix": "Начать ремонт",
      "addManuallyResponsiblePerson": "Вручную добавить ответственное лицо",
      "chooseLeak": "Выберите утечку",
      "signInSuccess": "Авторизация прошла успешно!",
      "signInError": "Ошибка входа!",
      "apply": "ПОДТВЕРДИТЬ",
      "or": "смазка",
      "return": "Вернуться на главный экран",
      "delete": "УДАЛИТЬ",

      "leak900": "Протечки в месте сварки коллекторного патрубка, клапана или моноблока",
      "leak901": "Разорванное колено, перегретое",
      "leak902": "Протечки на трубе в месте зажима под трубу с меньшим диаметром, чем циркуляционная ",
      "leak904": "Протечка в месте сварки колена",
      "leak905": "прожженное колено",
      "leak950": "УТЕЧКИ В ЗАКРЫТИИ КОЛЛЕКТОРА ИЛИ В СВАРНЫХ СОЕДИНЕНИЯХ МЕЖДУ НОЖКАМИ И КОРПУСОМ ИЛИ МЕЖДУ ВЫПУСКНОЙ ТРУБОЙ И КОРПУСОМ",
      "leak951": "УТЕЧКИ В СОЕДИНЕНИЯХ МЕЖДУ КЛАПАНОМ И МЕДНОЙ ТРУБКОЙ",
      "leak952": "УТЕЧКИ НА СОЕДИНЕНИЯХ ДИФФУЗОРА И КАПИЛЛЯРА",
      "leak955": "УТЕЧКИ В СОЕДИНЕНИЯХ КАПИЛЛЯРНОЙ ТРУБКИ И ТРУБКИ",
      "leak958": "УТЕЧКИ НА СОЕДИНЕНИИ ТРУБ К ТРУБКАМ / ТРУБ К МУФТАМ",
      "leak960": "протечки в месте соединения трубы с пиастриной",

      "username": "Имя пользователя",
      "password": "Пароль",
      "cardId": "ID карты",
      "appSelectorTitle": "Выберите приложение",
      "manageLeaks": "Управление утечками",
      "chooseHeliumMachines": "Выберите машины helium",
    }
  }


  const getSelectedLanguageString = (key) => {
    return languageStrings[selectedLanguage][key];
  }

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]); // Add isComplete as a dependency
  
  


//TODO: Zrobic tak aby przy zmianie aplikacji nie pokazywaly sie rekordy z poprzednio wybranej aplikacji
 


  const now = new Date(); // Get the current date and time
  const now2 = new Date(); // Get the current date and time
  /*
// Set dateStart to the first day of the current month at 6 AM
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
startOfMonth.setHours(0)
startOfMonth.setMinutes(0)
startOfMonth.setSeconds(0)

// Set dateEnd to the last day of the current month at 6 PM
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
endOfMonth.setHours(23)
endOfMonth.setMinutes(59)
endOfMonth.setSeconds(59)
*/
const [dateEnd, setDateEnd] = React.useState(now);

now2.setMonth(now.getMonth() - 1);
const [dateStart, setDateStart] = React.useState(now2);
const [refreshData, setRefreshData] = React.useState(false);
  



  const showLoadingScreen = () => {
    setLoading(true);
  };
  
  const hideLoadingScreen = () => {
    setLoading(false);
  };

  const notify = (action, text) => {
    if(action == "success") {
      toast.success(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if(action == "info") {
      toast.info(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if(action == "error") {
      if(text == "contact") {
        setContactErrorInfo(true)
      } else {
        toast.error(text, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
  }
    } else if(action == "warning") {
      toast.warn(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };





useEffect(() => {

  /*
  const urlEnd = window.location.href.split('/').pop().toLocaleLowerCase();
    console.log(urlEnd)

    // This code will be executed every time the location changes
    if(urlEnd == "") {
      setShowAdminPanel(false);
    }
    if(urlEnd == "panel") {
      setShowAdminPanel(true);
    }
    if(urlEnd == "panelv2") {
      setShowAdminPanel(true);
    }
    */
    
}, []);


  function handleUserIdChange(id) {
    setUserId(id);
    sessionStorage.setItem('userId', id);
  }


  const handleHeliumSelectorClose = (event) => {
    if(selectedHeliumMachinesId.length != 0) {
      setHeliumSelectorOpen(false);
    }
  }






return (
  <Box>
    
  <Box component="main" style={{ paddingTop: 150 }}>
    <LoadingOverlay loading={loading} getSelectedLanguageString={getSelectedLanguageString} />
      {contactErrorInfo && (
        <Overlay>
          <Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, textAlign: 'center' }}>
            <Grid container>
              <Grid item xs={12}>
          <Typography variant="h4">                                                                                                                                                                                                                                                                                                                   
            { getSelectedLanguageString("error") }
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => {setContactErrorInfo(false)}}>{ getSelectedLanguageString("close") }</Button>
          </Box>
          </Grid>
          </Grid>
          </Box>
          
          </Paper>
        </Overlay>
        
      )}
      <ToastContainer />
      
      
  <Router>
              <Routes>
                  <Route exact path="/" element={
                    <React.Fragment>
                    <ResponsiveAppBar filteredRows={filteredRows} isSearching={isSearching} setIsSearching={setIsSearching} searchTags={searchTags} setSearchTags={setSearchTags} userId={userId} name={name} surname={surname} dateLabel={dateLabel} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} getSelectedLanguageString={getSelectedLanguageString} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} refreshData={refreshData} setRefreshData={setRefreshData} showNav="false" />
                    { token && name && surname && userId ? (
                      <AppSelector leaksPerms={leaksPerms} setLeaksPerms={setLeaksPerms} woodAppPerms={woodAppPerms} setWoodAppPerms={setWoodAppPerms} heliumPerms={heliumPerms} setHeliumPerms={setHeliumPerms} getSelectedLanguageString={getSelectedLanguageString} />
                      ) : (
                        <SignIn leaksPerms={leaksPerms} setLeaksPerms={setLeaksPerms} woodAppPerms={woodAppPerms} setWoodAppPerms={setWoodAppPerms} heliumPerms={heliumPerms} setHeliumPerms={setHeliumPerms} isSignedInByLink={isSignedInByLink} setIsSignedInByLink={setIsSignedInByLink} userId={userId} setUserId={handleUserIdChange} name={name} setName={setName} surname={surname} setSurname={setSurname} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }} getSelectedLanguageString={getSelectedLanguageString} selectedLanguage={selectedLanguage} token={token} setToken={setToken} />
                    )}
                    </React.Fragment>
                  }>
                  
                  </Route>

                  <Route path="/Leaks/signIn/:cardNumber" element={
                      <React.Fragment>
                        <ResponsiveAppBar filteredRows={filteredRows} isSearching={isSearching} setIsSearching={setIsSearching} searchTags={searchTags} setSearchTags={setSearchTags} rows={rows} userId={userId} name={name} surname={surname} dateLabel={dateLabel} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} getSelectedLanguageString={getSelectedLanguageString} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} refreshData={refreshData} setRefreshData={setRefreshData} showNav={true} pagesCount={pagesCount} setPagesCount={setPagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} showNav="false" />
                        <SignInByLink cardNumber={cardNumber} setCardNumber={setCardNumber} isSignedInByLink={isSignedInByLink} setIsSignedInByLink={setIsSignedInByLink} userId={userId} setUserId={handleUserIdChange} name={name} setName={setName} surname={surname} setSurname={setSurname} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }} getSelectedLanguageString={getSelectedLanguageString} selectedLanguage={selectedLanguage} token={token} setToken={setToken} />
                    </React.Fragment>
                    } />
                  


                    <Route path="/:appName" element={
                      <React.Fragment>
                         
                        <Wallpaper />
                        <ResponsiveAppBar selectedHeliumMachinesId={selectedHeliumMachinesId} setSelectedHeliumMachinesId={setSelectedHeliumMachinesId} availableHeliumMachines={availableHeliumMachines} setAvailableHeliumMachines={setAvailableHeliumMachines} heliumSelectorOpen={heliumSelectorOpen} setHeliumSelectorOpen={setHeliumSelectorOpen} filteredRows={filteredRows} isSearching={isSearching} setIsSearching={setIsSearching} searchTags={searchTags} setSearchTags={setSearchTags} rows={rows} userId={userId} name={name} surname={surname} dateLabel={dateLabel} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} getSelectedLanguageString={getSelectedLanguageString} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} refreshData={refreshData} setRefreshData={setRefreshData} showNav={true} pagesCount={pagesCount} setPagesCount={setPagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                        <PanelV2 heliumHeaders={heliumHeaders} setHeliumHeaders={setHeliumHeaders} heliumSelectorOpen={heliumSelectorOpen} setHeliumSelectorOpen={setHeliumSelectorOpen} availableHeliumMachines={availableHeliumMachines} setAvailableHeliumMachines={setAvailableHeliumMachines} selectedHeliumMachinesId={selectedHeliumMachinesId} setSelectedHeliumMachinesId={setSelectedHeliumMachinesId} currentAppName={useParams().appName} filteredRows={filteredRows} isSearching={isSearching} setIsSearching={setIsSearching} searchTags={searchTags} setSearchTags={setSearchTags} cardNumber={cardNumber} setCardNumber={setCardNumber} isSignedInByLink={isSignedInByLink} rows={rows} userId={userId} setUserId={handleUserIdChange} setName={setName} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }} dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} refreshData={refreshData} setRefreshData={setRefreshData} token={token} pagesCount={pagesCount} setPagesCount={setPagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                        <SelectDialog handleClose={handleHeliumSelectorClose} open={heliumSelectorOpen} setOpen={setHeliumSelectorOpen} heliumSelectorOpen={heliumSelectorOpen} setHeliumSelectorOpen={setHeliumSelectorOpen} availableHeliumMachines={availableHeliumMachines} setAvailableHeliumMachines={setAvailableHeliumMachines} selectedHeliumMachinesId={selectedHeliumMachinesId} setSelectedHeliumMachinesId={setSelectedHeliumMachinesId} getSelectedLanguageString={getSelectedLanguageString} />
                    
                    </React.Fragment>
                  }>
                    </Route>


                    
              </Routes>
          </Router>
          
          </Box>


          
       

          </Box>

)
}