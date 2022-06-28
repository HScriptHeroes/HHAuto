function moduleOldPathOfAttractionHide() {
    let array = $('#path_of_attraction div.poa.container div.all-objectives .objective.completed');
    if (array.length == 0) {
        return
    }
    let lengthNeeded = $('.golden-block.locked').length > 0 ? 1 : 2;
    for (let i = array.length - 1; i >= 0; i--) {
        if ($(array[i]).find('.picked-reward').length == lengthNeeded) {
            array[i].style.display = "none";
        }
    }
}

function modulePathOfAttractionHide() {
    if (getPage() === getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab=path_event") && getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true") {
        let arrayz;
        let nbReward;
        let modified = false;
        arrayz = $('.nc-poa-reward-pair:not([style*="display:none"]):not([style*="display: none"])');
        if ($("#nc-poa-tape-blocker").length) {
            nbReward = 1;
        }
        else {
            nbReward = 2;
        }

        var obj;
        if (arrayz.length > 0) {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                obj = $(arrayz[i2]).find('.nc-poa-reward-container.claimed');
                if (obj.length >= nbReward) {
                    $("#events .nc-panel-body .scroll-area")[0].scrollLeft -= arrayz[i2].offsetWidth;
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }
    }
}

function getPoVRemainingTime() {
    const poVTimerRequest = `#pov_tab_container > div.potions-paths-first-row > div.potions-paths-timer.timer[${getHHScriptVars("PoVPoGTimestampAttributeName")}]`;

    if ($(poVTimerRequest).length > 0 && (getSecondsLeft("PoVRemainingTime") === 0 || getStoredValue("HHAuto_Temp_PoVEndDate") === undefined)) {
        const poVTimer = Number($(poVTimerRequest).attr(getHHScriptVars("PoVPoGTimestampAttributeName")));
        setTimer("PoVRemainingTime", poVTimer);
        setStoredValue("HHAuto_Temp_PoVEndDate", Math.ceil(new Date().getTime() / 1000) + poVTimer);
    }
}

function getPoGRemainingTime() {
    const poGTimerRequest = `#pog_tab_container > div.potions-paths-first-row > div.potions-paths-timer.timer[${getHHScriptVars("PoVPoGTimestampAttributeName")}]`;

    if ($(poGTimerRequest).length > 0 && (getSecondsLeft("PoGRemainingTime") === 0 || getStoredValue("HHAuto_Temp_PoGEndDate") === undefined)) {
        const poGTimer = Number($(poGTimerRequest).attr(getHHScriptVars("PoVPoGTimestampAttributeName")));
        setTimer("PoGRemainingTime", poGTimer);
        setStoredValue("HHAuto_Temp_PoGEndDate", Math.ceil(new Date().getTime() / 1000) + poGTimer);
    }
}

function moduleSimPoVMaskReward() {
    var arrayz;
    var nbReward;
    let modified = false;
    arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
    //doesn sure about  " .purchase-pov-pass"-button visibility
    if ($('#pov_tab_container .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length) {
        nbReward = 1;
    }
    else {
        nbReward = 2;
    }
    var obj;
    if (arrayz.length > 0) {
        for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
            obj = $(arrayz[i2]).find('.claimed-slot:not([style*="display:none"]):not([style*="display: none"])');
            if (obj.length >= nbReward) {
                arrayz[i2].style.display = "none";
                modified = true;
            }
        }
    }

    if (modified) {
        let divToModify = $('.pov-progress-bar-section');
        if (divToModify.length > 0) {
            $('.pov-progress-bar-section')[0].scrollTop = '0';
        }
    }
}

function moduleSimPoGMaskReward() {
    var arrayz;
    var nbReward;
    let modified = false;
    arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
    //doesn sure about  " .purchase-pov-pass"-button visibility
    if ($('#pog_tab_container .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length) {
        nbReward = 1;
    }
    else {
        nbReward = 2;
    }
    var obj;
    if (arrayz.length > 0) {
        for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
            obj = $(arrayz[i2]).find('.claimed-slot:not([style*="display:none"]):not([style*="display: none"])');
            if (obj.length >= nbReward) {
                arrayz[i2].style.display = "none";
                modified = true;
            }
        }
    }

    if (modified) {
        let divToModify = $('.pov-progress-bar-section');
        if (divToModify.length > 0) {
            $('.pov-progress-bar-section')[0].scrollTop = '0';
        }
    }
}
