var updateData = function () {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput => {
        currentInput.checkValidity();
    });
    if (getStoredValue("HHAuto_Setting_showInfo") == "true") // && busy==false // && getPage()==getHHScriptVars("pagesIDHome")
    {
        var Tegzd = '';
        Tegzd += (getStoredValue("HHAuto_Setting_master") === "true" ? "<span style='color:LimeGreen'>HH auto ++ ON" : "<span style='color:red'>HH auto ++ OFF") + '</span>';
        //Tegzd+=(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        if (getStoredValue("HHAuto_Setting_paranoia") == "true") {
            Tegzd += '<br>' + getStoredValue("HHAuto_Temp_pinfo") + ': ' + getTimeLeft('paranoiaSwitch');
        }
        if (getHHScriptVars('isEnabledTrollBattle', false) && getStoredValue("HHAuto_Setting_autoTrollBattle") == "true") {
            Tegzd += '<br>' + getTextForUI("autoTrollTitle", "elementText") + ' : ' + getHHVars('Hero.energies.fight.amount') + '/' + getHHVars('Hero.energies.fight.max_amount');
        }
        if (getHHScriptVars("isEnabledSalary", false) && getStoredValue("HHAuto_Setting_autoSalary") == "true") {
            Tegzd += '<br>' + getTextForUI("autoSalary", "elementText") + ' : ' + getTimeLeft('nextSalaryTime');
        }
        if (getHHScriptVars('isEnabledSeason', false) && getStoredValue("HHAuto_Setting_autoSeason") == "true") {
            Tegzd += '<br>' + getTextForUI("autoSeasonTitle", "elementText") + ' : ' + getHHVars('Hero.energies.kiss.amount') + '/' + getHHVars('Hero.energies.kiss.max_amount') + ' (' + getTimeLeft('nextSeasonTime') + ')';
        }
        /*if (getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeasonCollect") =="true")
        {
            Tegzd += '<br>'+getTextForUI("autoSeasonCollect","elementText")+" "+getTextForUI("autoSeasonTitle","elementText")+' : '+getTimeLeft('nextSeasonCollectTime');
        }*/
        if (getHHScriptVars('isEnabledLeagues', false) && getStoredValue("HHAuto_Setting_autoLeagues") == "true") {
            Tegzd += '<br>' + getTextForUI("autoLeaguesTitle", "elementText") + ' : ' + getHHVars('Hero.energies.challenge.amount') + '/' + getHHVars('Hero.energies.challenge.max_amount') + ' (' + getTimeLeft('nextLeaguesTime') + ')';
        }
        if (getHHScriptVars("isEnabledChamps", false) && getStoredValue("HHAuto_Setting_autoChamps") == "true") {
            Tegzd += '<br>' + getTextForUI("autoChampsTitle", "elementText") + ' : ' + getTimeLeft('nextChampionTime');
        }
        if (getHHScriptVars("isEnabledClubChamp", false) && getStoredValue("HHAuto_Setting_autoClubChamp") == "true") {
            Tegzd += '<br>' + getTextForUI("autoClubChamp", "elementText") + ' : ' + getTimeLeft('nextClubChampionTime');
        }
        if (getHHScriptVars('isEnabledPantheon', false) && getStoredValue("HHAuto_Setting_autoPantheon") == "true") {
            Tegzd += '<br>' + getTextForUI("autoPantheonTitle", "elementText") + ' : ' + getHHVars('Hero.energies.worship.amount') + '/' + getHHVars('Hero.energies.worship.max_amount') + ' (' + getTimeLeft('nextPantheonTime') + ')';
        }
        if (getHHScriptVars("isEnabledShop", false)) {
            Tegzd += '<br>' + getTextForUI("autoBuy", "elementText") + ' : ' + getTimeLeft('nextShopTime');
        }
        if (getHHScriptVars("isEnabledMission", false) && getStoredValue("HHAuto_Setting_autoMission") == "true") {
            Tegzd += '<br>' + getTextForUI("autoMission", "elementText") + ' : ' + getTimeLeft('nextMissionTime');
        }
        if (getHHScriptVars("isEnabledContest", false) && getStoredValue("HHAuto_Setting_autoContest") == "true") {
            Tegzd += '<br>' + getTextForUI("autoContest", "elementText") + ' : ' + getTimeLeft('nextContestTime');
        }
        if (getHHScriptVars("isEnabledPowerPlaces", false) && getStoredValue("HHAuto_Setting_autoPowerPlaces") == "true") {
            Tegzd += '<br>' + getTextForUI("autoPowerPlaces", "elementText") + ' : ' + getTimeLeft('minPowerPlacesTime');
        }
        if (getHHScriptVars("isEnabledPachinko", false) && getStoredValue("HHAuto_Setting_autoFreePachinko") == "true") {
            if (getTimer('nextPachinkoTime') !== -1) {
                Tegzd += '<br>' + getTextForUI("autoFreePachinko", "elementText") + ' : ' + getTimeLeft('nextPachinkoTime');
            }
            if (getTimer('nextPachinko2Time') !== -1) {
                Tegzd += '<br>' + getTextForUI("autoMythicPachinko", "elementText") + ' : ' + getTimeLeft('nextPachinko2Time');
            }
        }
        if (getTimer('eventMythicNextWave') !== -1) {
            Tegzd += '<br>' + getTextForUI("mythicGirlNext", "elementText") + ' : ' + getTimeLeft('eventMythicNextWave');
        }
        if (getStoredValue("HHAuto_Temp_haveAff")) {
            Tegzd += '<br>' + getTextForUI("autoAffW", "elementText") + ' : ' + add1000sSeparator(getStoredValue("HHAuto_Temp_haveAff"));
        }
        if (getStoredValue("HHAuto_Temp_haveExp")) {
            Tegzd += '<br>' + getTextForUI("autoExpW", "elementText") + ' : ' + add1000sSeparator(getStoredValue("HHAuto_Temp_haveExp"));
        }
        /*if (isJSON(getStoredValue("HHAuto_Temp_BoostersData")))
        {
            for(let boost of JSON.parse(getStoredValue("HHAuto_Temp_BoostersData")))
            {
                Tegzd += `<br>${boost.rarity} <img class="iconImg" src="${boost.ico}" /> : ${getBoosterExpiration(boost)}`;
            }
        }*/
        //if (Tegzd.length>0)
        //{
        document.getElementById('pInfo').style.display = 'block';
        document.getElementById('pInfo').innerHTML = Tegzd;  //document.getElementById('pInfo').textContent=Tegzd;
        // }
        // else
        // {
        //     document.getElementById('pInfo').style.display='none';
        // }
    }
    else {
        document.getElementById('pInfo').style.display = 'none';
    }
};

var createUI = function () {

    if (unsafeWindow.Hero === undefined) {
        logHHAuto('???no Hero???');
        $('.hh_logo').click();
        return;
    }
    checkClubStatus();
    replaceCheatClick();
    migrateHHVars();

    $('.redirect.gay').hide();
    $('.redirect.comix').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();

    if (getStoredValue("HHAuto_Temp_Timers")) {
        Timers = JSON.parse(getStoredValue("HHAuto_Temp_Timers"));
    }
    clearEventData("onlyCheckEventsHHScript");
    setDefaults();

    // Add UI buttons.
    let sMenu = `<div id="sMenu" class="HHAutoScriptMenu" style="top: 45px;right: 52px;padding: 4px;display: none;opacity: 1;border-radius: 4px;border: 1px solid #ffa23e;background-color: #1e261e;font-size:x-small; position:absolute; text-align:left; flex-direction:column; justify-content:space-between; z-index:10000">`
        + `<div class="optionsRow">`
        + `<div class="optionsColumn">`
        + `<div style="padding:3px; display:flex; flex-direction:column;">`
        + `<span>HH Automatic ++</span>`
        + `<span style="font-size:smaller; padding-bottom:10px">Version ${GM_info.script.version}</span>`
        + `<div class="internalOptionsRow" style="padding:3px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("gitHub", "tooltip")}</span>`
        + `<label class="myButton" id="git">${getTextForUI("gitHub", "elementText")}</label>`
        + `</div>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("DebugMenu", "tooltip")}</span>`
        + `<label class="myButton" id="DebugMenu">${getTextForUI("DebugMenu", "elementText")}</label>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow" style="padding:3px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("saveConfig", "tooltip")}</span>`
        + `<label class="myButton" id="saveConfig">${getTextForUI("saveConfig", "elementText")}</label>`
        + `</div>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("loadConfig", "tooltip")}</span>`
        + `<label class="myButton" id="loadConfig">${getTextForUI("loadConfig", "elementText")}</label>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow" style="padding:3px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("saveDefaults", "tooltip")}</span>`
        + `<label class="myButton" id="saveDefaults">${getTextForUI("saveDefaults", "elementText")}</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/panel.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("globalTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="rowOptionsBox">`
        + `<div class="optionsColumn">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("master", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("master", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="master" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("paranoia", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("paranoia", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="paranoia" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledDailyRewards" class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoDailyRewardsCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoDailyRewardsCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoDailyRewardsCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsColumn">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("settPerTab", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("settPerTab", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="settPerTab" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("paranoiaSpendsBefore", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("paranoiaSpendsBefore", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="paranoiaSpendsBefore" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledDailyGoals" class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoDailyGoalsCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoDailyGoalsCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoDailyGoalsCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="rowOptionsBox">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("spendKobans0", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/affil_prog.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("spendKobans0", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="spendKobans0" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("kobanBank", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_hard_currency.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("kobanBank", "tooltip")}</span>`
        + `<input id="kobanBank" style="text-align:right; width:45px" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/sex_friends.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("displayTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="rowOptionsBox">`
        + `<div class="optionsColumn">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("showInfo", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("showInfo", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="showInfo" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("showTooltips", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("showTooltips", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="showTooltips" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsColumn">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("showCalculatePower", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("showCalculatePower", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="showCalculatePower" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("PoAMaskRewards", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("PoAMaskRewards", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="PoAMaskRewards" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsColumn">`
        + `<div class="optionsRow">`
        + `<div class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/missions.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoActivitiesTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div class="internalOptionsRow">`
        + `<div id="isEnabledMission" class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoMission", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoMission", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoMission" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoMissionCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoMissionCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoMissionCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoMissionKFirst", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoMissionKFirst", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoMissionKFirst" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledContest" class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoContest", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoContest", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoContest" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledPowerPlaces" class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoPowerPlaces", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPowerPlaces", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoPowerPlaces" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoPowerPlacesIndexFilter", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPowerPlacesIndexFilter", "tooltip")}</span>`
        + `<input id="autoPowerPlacesIndexFilter" required pattern="${HHAuto_inputPattern.autoPowerPlacesIndexFilter}" type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoPowerPlacesAll", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPowerPlacesAll", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoPowerPlacesAll" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsColumn">`
        + `<div class="optionsBoxTitle">`
        + `</div>`
        + `<div id="isEnabledSalary" class="rowOptionsBox">`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoSalary", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/harem.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSalary", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoSalary" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoSalaryMinSalary", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSalaryMinSalary", "tooltip")}</span>`
        + `<input id="autoSalaryMinSalary" style="text-align:right; width:45px" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoSalaryMaxTimer", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSalaryMaxTimer", "tooltip")}</span>`
        + `<input id="autoSalaryMaxTimer" style="text-align:right; width:45px" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsRow">`
        + `<div id="isEnabledPachinko" class="rowOptionsBox">`
        + `<div class="internalOptionsRow" style="justify-content: space-between">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoFreePachinko", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/menu/pachinko.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoFreePachinko", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoFreePachinko" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledQuest" class="rowOptionsBox">`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoQuest", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/forward.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoQuest", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoQuest" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledSideQuest" class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoSideQuest", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSideQuest", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoSideQuest" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoQuestThreshold", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_energy_quest.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoQuestThreshold", "tooltip")}</span>`
        + `<input style="text-align:center; width:25px" id="autoQuestThreshold" required pattern="${HHAuto_inputPattern.autoQuestThreshold}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsRow">`
        + `<div id="isEnabledSeason" class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/seasons.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoSeasonTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoSeason", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSeason", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoSeason" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoSeasonCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSeasonCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoSeasonCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("SeasonMaskRewards", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("SeasonMaskRewards", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="SeasonMaskRewards" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoSeasonPassReds", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSeasonPassReds", "tooltip")}</span>`
        + `<label  class="switch">`
        + `<input id="autoSeasonPassReds" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoSeasonThreshold", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_kiss.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoSeasonThreshold", "tooltip")}</span>`
        + `<input style="text-align:center; width:25px" id="autoSeasonThreshold" required pattern="${HHAuto_inputPattern.autoSeasonThreshold}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledLeagues" class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/leaderboard.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoLeaguesTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLeagues", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLeagues", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoLeagues" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton" style="align-items:center">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLeaguesPowerCalc", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLeaguesPowerCalc", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoLeaguesPowerCalc" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton" style="align-items:right">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLeaguesCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLeaguesCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoLeaguesCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLeaguesSelector", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLeaguesSelector", "tooltip")}</span>`
        + `<select id="autoLeaguesSelector">`
        + `</select>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLeaguesAllowWinCurrent", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLeaguesAllowWinCurrent", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoLeaguesAllowWinCurrent" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoLeaguesThreshold", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/league_points.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLeaguesThreshold", "tooltip")}</span>`
        + `<input style="text-align:center; width:25px" id="autoLeaguesThreshold" required pattern="${HHAuto_inputPattern.autoLeaguesThreshold}"type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsRow">`
        + `<div id="isEnabledPoVPoG" class="optionsBox">`
        + `<div id="isEnabledPoV" class="internalOptionsRow" style="justify-content: space-evenly">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("PoVMaskRewards", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("PoVMaskRewards", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="PoVMaskRewards" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoPoVCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPoVCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoPoVCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledPoG" class="internalOptionsRow" style="justify-content: space-evenly">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("PoGMaskRewards", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("PoGMaskRewards", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="PoGMaskRewards" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoPoGCollect", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPoGCollect", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoPoGCollect" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/menu/map.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoTrollTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div class="internalOptionsRow" style="justify-content: space-between">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoTrollBattle", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoTrollBattle", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoTrollBattle" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoTrollSelector", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoTrollSelector", "tooltip")}</span>`
        + `<select id="autoTrollSelector">`
        + `</select>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoTrollThreshold", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh.hh-content.com/pictures/design/ic_energy_fight.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoTrollThreshold", "tooltip")}</span>`
        + `<input style="text-align:center; width:25px" id="autoTrollThreshold" required pattern="${HHAuto_inputPattern.autoTrollThreshold}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("useX10Fights", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("useX10Fights", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="useX10Fights" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("useX10FightsAllowNormalEvent", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("useX10FightsAllowNormalEvent", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="useX10FightsAllowNormalEvent" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("minShardsX10", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("minShardsX10", "tooltip")}</span>`
        + `<input id="minShardsX10" style="text-align:center; width:7em" required pattern="${HHAuto_inputPattern.minShardsX}"type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("useX50Fights", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("useX50Fights", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="useX50Fights" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("useX50FightsAllowNormalEvent", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("useX50FightsAllowNormalEvent", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="useX50FightsAllowNormalEvent" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("minShardsX50", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("minShardsX50", "tooltip")}</span>`
        + `<input id="minShardsX50" style="text-align:center; width:7em" required pattern="${HHAuto_inputPattern.minShardsX}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("plusEvent", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("plusEvent", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="plusEvent" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("eventTrollOrder", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("eventTrollOrder", "tooltip")}</span>`
        + `<input id="eventTrollOrder" style="width:120px" required pattern="${HHAuto_inputPattern.eventTrollOrder}"type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("buyCombat", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("buyCombat", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="buyCombat" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("buyCombTimer", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("buyCombTimer", "tooltip")}</span>`
        + `<input id="buyCombTimer" style="text-align:center; width:50%" required pattern="${HHAuto_inputPattern.buyCombTimer}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("plusEventMythic", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("plusEventMythic", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="plusEventMythic" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoTrollMythicByPassParanoia", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoTrollMythicByPassParanoia", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoTrollMythicByPassParanoia" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("buyMythicCombat", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("buyMythicCombat", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="buyMythicCombat" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("buyMythicCombTimer", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("buyMythicCombTimer", "tooltip")}</span>`
        + `<input id="buyMythicCombTimer" style="text-align:center; width:50%" required pattern="${HHAuto_inputPattern.buyMythicCombTimer}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="optionsColumn">`
        + `<div id="isEnabledAllChamps" class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/ic_champions.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoChampsTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div id="isEnabledChamps" class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoChamps", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoChamps", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoChamps" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoChampsForceStart", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoChampsForceStart", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoChampsForceStart" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoChampsUseEne", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_energy_quest.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoChampsUseEne", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoChampsUseEne" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoChampsFilter", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoChampsFilter", "tooltip")}</span>`
        + `<input style="text-align:center; width:70px" id="autoChampsFilter" required pattern="${HHAuto_inputPattern.autoChampsFilter}" type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton" style="display: none;">`
        + `<span class="HHMenuItemName">${getTextForUI("autoChampsForceStartEventGirl", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoChampsForceStartEventGirl", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoChampsForceStartEventGirl" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledClubChamp" class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoClubChamp", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoClubChamp", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoClubChamp" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoClubForceStart", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoClubForceStart", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoClubForceStart" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton" style="align-items: flex-end;">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoClubChampMax", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/champion_ticket.png" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoClubChampMax", "tooltip")}</span>`
        + `<input style="text-align:center; width:45px" id="autoClubChampMax" required pattern="${HHAuto_inputPattern.autoClubChampMax}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledPantheon" class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/ic_champions.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoPantheonTitle", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoPantheon", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPantheon", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoPantheon" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoPantheonThreshold", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh.hh-content.com/pictures/design/ic_worship.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoPantheonThreshold", "tooltip")}</span>`
        + `<input style="text-align:center; width:25px" id="autoPantheonThreshold" required pattern="${HHAuto_inputPattern.autoPantheonThreshold}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div id="isEnabledShop" class="optionsBoxWithTitle">`
        + `<div class="optionsBoxTitle">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/shop.svg" />`
        + `<span class="optionsBoxTitle">${getTextForUI("autoBuy", "elementText")}</span>`
        + `</div>`
        + `<div class="optionsBox">`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoStatsSwitch", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/ic_plus.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoStatsSwitch", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoStatsSwitch" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoStats", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoStats", "tooltip")}</span>`
        + `<input class="maxMoneyInputField" id="autoStats" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoExpW", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/ic_books_gray.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoExpW", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoExpW" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("maxExp", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("maxExp", "tooltip")}</span>`
        + `<input style="text-align:right; width:60px" id="maxExp" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoExp", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoExp", "tooltip")}</span>`
        + `<input class="maxMoneyInputField" id="autoExp" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoAffW", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/ic_gifts_gray.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoAffW", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoAffW" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("maxAff", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("maxAff", "tooltip")}</span>`
        + `<input style="text-align:right; width:60px" id="maxAff" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoAff", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoAff", "tooltip")}</span>`
        + `<input class="maxMoneyInputField" id="autoAff" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoLGMW", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/ic_equipment_gray.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLGMW", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoLGMW" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLGM", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLGM", "tooltip")}</span>`
        + `<input class="maxMoneyInputField" id="autoLGM" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoLGRW", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/pictures/misc/items_icons/16.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLGRW", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoLGRW" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoLGR", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoLGR", "tooltip")}</span>`
        + `<input class="maxMoneyInputField" id="autoLGR" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoBuyBoosters", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/ic_boosters_gray.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoBuyBoosters", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="autoBuyBoosters" type="checkbox">`
        + `<span class="slider round kobans">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI("autoBuyBoostersFilter", "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("autoBuyBoostersFilter", "tooltip")}</span>`
        + `<input style="text-align:center; width:70px" id="autoBuyBoostersFilter" required pattern="${HHAuto_inputPattern.autoBuyBoostersFilter}" type="text">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `<div class="internalOptionsRow">`
        + `<div class="labelAndButton">`
        + `<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("showMarketTools", "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="https://hh2.hh-content.com/design/menu/panel.svg" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI("showMarketTools", "tooltip")}</span>`
        + `<label class="switch">`
        + `<input id="showMarketTools" type="checkbox">`
        + `<span class="slider round">`
        + `</span>`
        + `</label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`
    $('#contains_all').prepend(sMenu);

    GM_addStyle(''
        + '#sMenuButton {'
        + '   position: absolute;'
        + '   top: 45px;'
        + '   right: 15px;'
        + '   z-index:5000;'
        + '}'
        + '@media only screen and (max-width: 1025px) {'
        + '#sMenuButton {'
        + '   width: 40px;'
        + '   height: 40px;'
        + '   top: 20px;'
        + '   right: 74px;'
        + '}}'
    );
    $("#contains_all nav").prepend('<div class="square_blue_btn" id="sMenuButton" ><img src="https://i.postimg.cc/bv7n83z3/script-Icon2.png"></div>');
    document.getElementById("sMenuButton").addEventListener("click", function () {
        if (document.getElementById("sMenu").style.display === "none") {
            setMenuValues();
            document.getElementById("sMenu").style.display = "flex";
            $('#contains_all')[0].style.zIndex = 9;
        }
        else {
            getMenuValues();
            document.getElementById("sMenu").style.display = "none"
            $('#contains_all')[0].style.zIndex = "";
        }
    });

    addEventsOnMenuItems();

    document.getElementById("showTooltips").addEventListener("change", function () {
        //console.log(this.checked);
        if (this.checked) {
            enableToolTipsDisplay(true);
        }
        else {
            disableToolTipsDisplay(true);
        }
    });

    var div = document.createElement('div');
    div.innerHTML = '<div id="pInfo" ></div>'.trim(); //height: auto;

    var pInfo = div.firstElementChild;

    pInfo.addEventListener("dblclick", function () {
        let masterSwitch = document.getElementById("master");
        if (masterSwitch.checked === true) {
            setStoredValue("HHAuto_Setting_master", "false");
            masterSwitch.checked = false;
            //console.log("Master switch off");
        } else {
            setStoredValue("HHAuto_Setting_master", "true");
            masterSwitch.checked = true;
            //console.log("Master switch on");
        }
    });
    if (getPage() == getHHScriptVars("pagesIDHome")) {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');
    }
    else {
        GM_addStyle(''
            + '#pInfo:hover {'
            + '   padding-top : 22px;'
            + '   height : auto;'
            + '   left : 77%;'
            + '}'
            + '#pInfo {'
            + '   right : 1%;'
            + '   left : 88%;'
            + '   top : 8%;'
            + '   z-index : 1000;'
            + '   height : 22px;'
            + '   padding-top : unset;'
            + '}'
            + '@media only screen and (max-width: 1025px) {'
            + '   #pInfo {'
            + '      top : 13%;'
            + '   }'
            + '}');
    }

    document.getElementById('contains_all').appendChild(div.firstChild);
    maskInactiveMenus();

    // Add auto troll options
    var trollOptions = document.getElementById("autoTrollSelector");

    for (var i = 0; i < getHHVars('Hero.infos.questing.id_world'); i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = Trollz[i];
        trollOptions.add(option);
    };

    // Add league options
    var leaguesOptions = document.getElementById("autoLeaguesSelector");

    for (var j in Leagues) {
        var optionL = document.createElement("option");
        optionL.value = Number(j) + 1;
        optionL.text = Leagues[j];
        leaguesOptions.add(optionL);
    };

    setMenuValues();
    getMenuValues();
    manageToolTipsDisplay();

    document.getElementById("git").addEventListener("click", function () { window.open("https://github.com/Roukys/HHauto/wiki"); });
    document.getElementById("loadConfig").addEventListener("click", function () {
        let LoadDialog = '<p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" accept=".json" name="myfile"> </label></p>';
        fillHHPopUp("loadConfig", getTextForUI("loadConfig", "elementText"), LoadDialog);
        document.getElementById('myfile').addEventListener('change', myfileLoad_onChange);

    });
    document.getElementById("saveConfig").addEventListener("click", saveHHVarsSettingsAsJSON);
    document.getElementById("saveDefaults").addEventListener("click", saveHHStoredVarsDefaults);
    document.getElementById("DebugMenu").addEventListener("click", function () {
        let debugDialog = '<div style="padding:10px; display:flex;flex-direction:column">'
            + '<p>HHAuto : v' + GM_info.script.version + '</p>'
            + '<p>' + getTextForUI("DebugFileText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row">'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("saveDebug", "tooltip") + '</span><label class="myButton" id="saveDebug">' + getTextForUI("saveDebug", "elementText") + '</label></div>'
            + '</div>'
            + '<p>' + getTextForUI("DebugResetTimerText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row">'
            + '<div style="padding-right:30px"class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("timerResetButton", "tooltip") + '</span><label class="myButton" id="timerResetButton">' + getTextForUI("timerResetButton", "elementText") + '</label></div>'
            + '<div style="padding-right:10px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("timerResetSelector", "tooltip") + '</span><select id="timerResetSelector"></select></div>'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("timerLeftTime", "tooltip") + '</span><span id="timerLeftTime">' + getTextForUI("timerResetNoTimer", "elementText") + '</span></div>'
            + '</div>'
            + '<p>' + getTextForUI("DebugOptionsText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row">'
            + '<div style="padding-right:30px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("DeleteTempVars", "tooltip") + '</span><label class="myButton" id="DeleteTempVars">' + getTextForUI("DeleteTempVars", "elementText") + '</label></div>'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("ResetAllVars", "tooltip") + '</span><label class="myButton" id="ResetAllVars">' + getTextForUI("ResetAllVars", "elementText") + '</label></div>'
            + '</div>'
            + '</div>'
        fillHHPopUp("DebugMenu", getTextForUI("DebugMenu", "elementText"), debugDialog);
        document.getElementById("DeleteTempVars").addEventListener("click", function () {
            debugDeleteTempVars();
            location.reload();
        });
        document.getElementById("ResetAllVars").addEventListener("click", function () {
            debugDeleteAllVars();
            location.reload();
        });
        document.getElementById("saveDebug").addEventListener("click", saveHHDebugLog);

        document.getElementById("timerResetButton").addEventListener("click", function () {
            let timerSelector = document.getElementById("timerResetSelector");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer", "elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector", "elementText")) {
                document.getElementById("sMenu").style.display = "none";
                maskHHPopUp();
                setTimer(timerSelector.options[timerSelector.selectedIndex].text, 0);
                timerSelector.selectedIndex = 0;
            }
        });
        $(document).on('change', "#timerResetSelector", function () {
            let timerSelector = document.getElementById("timerResetSelector");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer", "elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector", "elementText")) {
                document.getElementById("timerLeftTime").innerText = getTimeLeft(timerSelector.options[timerSelector.selectedIndex].text);
            }
            else {
                document.getElementById("timerLeftTime").innerText = getTextForUI("timerResetNoTimer", "elementText");
            }
        });
        // Add Timer reset options //changed
        let timerOptions = document.getElementById("timerResetSelector");
        var countTimers = 0;
        let optionElement = document.createElement("option");
        optionElement.value = countTimers;
        optionElement.text = getTextForUI("timerResetSelector", "elementText");
        countTimers++;
        timerOptions.add(optionElement);

        for (let i2 in Timers) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers;
            countTimers++;
            optionElement.text = i2;
            timerOptions.add(optionElement);
        };

        if (countTimers === 1) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers;
            optionElement.text = getTextForUI("timerResetNoTimer", "elementText");
            timerOptions.add(optionElement);
        }

    });

    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput => {
        currentInput.addEventListener('input', () => {
            currentInput.style.backgroundColor = "";
            currentInput.checkValidity();
        });

        currentInput.addEventListener('invalid', () => {
            currentInput.style.backgroundColor = "red";
            //document.getElementById("master").checked = false;
            //setStoredValue("HHAuto_Setting_master", "false");
        });
        currentInput.checkValidity();
    });



    setStoredValue("HHAuto_Temp_autoLoop", "true");
    if (typeof getStoredValue("HHAuto_Temp_freshStart") == "undefined" || isNaN(Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))) {
        setDefaults(true);
    }

    if (getBurst()) {
        doShopping();
        if (getStoredValue("HHAuto_Setting_autoStatsSwitch") === "true") {
            doStatUpgrades();
        }
    }

    if (hh_nutaku) {
        function Alive() {
            window.top.postMessage({ ImAlive: true }, '*');
            if (getStoredValue("HHAuto_Temp_autoLoop") == "true") {
                setTimeout(Alive, 2000);
            }
        }
        Alive();
    }
    if (isJSON(getStoredValue("HHAuto_Temp_LastPageCalled")) && JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page.indexOf(".html") > 0) {
        //console.log("testingHome : setting to : "+getPage());
        setStoredValue("HHAuto_Temp_LastPageCalled", JSON.stringify({ page: getPage(), dateTime: new Date().getTime() }));
    }
    if (isJSON(getStoredValue("HHAuto_Temp_LastPageCalled")) && JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page === getHHScriptVars("pagesIDHome")) {
        //console.log("testingHome : delete");
        deleteStoredValue("HHAuto_Temp_LastPageCalled");
    }
    getPage(true);
    setTimeout(autoLoop, 1000);
};
