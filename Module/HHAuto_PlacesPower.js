function doPowerPlacesStuff(index) {
    if (getPage() !== "powerplace" + index) {
        logHHAuto("Navigating to powerplace" + index + " page.");
        gotoPage(getHHScriptVars("pagesIDActivities"), { tab: "pop", index: index });
        // return busy
        return true;
    }
    else {
        logHHAuto("On powerplace" + index + " page.");

        //getting reward in case failed on main page
        var querySelectorText = "button[rel='pop_claim']:not([style*='display:none']):not([style*='display: none'])";
        if ($(querySelectorText).length > 0) {
            $(querySelectorText).click();
            logHHAuto("Claimed powerplace" + index);
            if (getStoredValue("HHAuto_Setting_autoPowerPlacesAll") !== "true") {
                cleanTempPopToStart();
                gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
                return;
            }
        }

        if ($("div.pop_right_part div.no_girls_message").length > 0) {
            addPopToUnableToStart(index, "Unable to start Pop " + index + " no girls available.");
            removePopFromPopToStart(index);
            return false;
        }

        if ($("div.grid_view div.not_selected").length === 1) {
            $("div.grid_view div.not_selected").click();
            logHHAuto("Only one girl available for powerplace n°" + index + " assigning her.");
        }
        else {
            querySelectorText = "button.blue_button_L[rel='pop_auto_assign']:not([disabled])"
            if ($(querySelectorText).length > 0) {
                document.querySelector(querySelectorText).click();
                logHHAuto("Autoassigned powerplace" + index);
            }
        }

        querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
        if ($(querySelectorText).length > 0) {
            document.querySelector(querySelectorText).click();
            logHHAuto("Started powerplace" + index);
        }
        else if ($("button.blue_button_L[rel='pop_action'][disabled]").length > 0 && $("div.grid_view div.pop_selected").length > 0) {
            addPopToUnableToStart(index, "Unable to start Pop " + index + " not enough girls available.");
            removePopFromPopToStart(index);
            return false;
        }

        removePopFromPopToStart(index);
        // Not busy
        return false;
    }
}

function cleanTempPopToStart() {
    sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
    sessionStorage.removeItem('HHAuto_Temp_popToStart');
}

function addPopToUnableToStart(popIndex, message) {
    var popUnableToStart = getStoredValue("HHAuto_Temp_PopUnableToStart") ? getStoredValue("HHAuto_Temp_PopUnableToStart") : "";
    logHHAuto(message);
    if (popUnableToStart === "") {
        setStoredValue("HHAuto_Temp_PopUnableToStart", String(popIndex));
    }
    else {
        setStoredValue("HHAuto_Temp_PopUnableToStart", popUnableToStart + ";" + String(popIndex));
    }
}


function removePopFromPopToStart(index) {
    var epop;
    var popToSart;
    var newPopToStart;
    popToSart = getStoredValue("HHAuto_Temp_PopToStart") ? JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")) : [];
    newPopToStart = [];
    for (epop of popToSart) {
        if (epop != index) {
            newPopToStart.push(epop);
        }
    }
    setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(newPopToStart));
}
