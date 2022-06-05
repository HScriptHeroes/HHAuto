var CollectMoney = function () {
    var Clicked = [];
    var endCollectTS = -1;
    let startCollectTS = -1;
    var maxSecsForSalary = Number(getStoredValue("HHAuto_Setting_autoSalaryMaxTimer"));
    var collectedGirlzNb = 0;
    var collectedMoney = 0;
    let totalGirlsToCollect = 0;
    function ClickThem() {
        if (endCollectTS === -1) {
            endCollectTS = new Date().getTime() + 1000 * maxSecsForSalary;
            startCollectTS = new Date().getTime();
        }
        if (Clicked.length > 0) {
            var params = {
                class: "Girl",
                id_girl: Clicked[0],
                action: "get_salary"
            };
            hh_ajax(params, function (data) {
                if (data.success) {
                    if (getHHVars('GirlSalaryManager.girlsMap') !== null && getHHVars('GirlSalaryManager.girlsMap')[Clicked[0]] !== undefined) {
                        const _this2 = getHHVars('GirlSalaryManager.girlsMap')[Clicked[0]];
                        _this2.gData.pay_in = data.time + 60;
                        _this2._noDoubleClick = false;
                        _this2._resetSalaryDisplay();
                    }
                    Hero.update("soft_currency", data.money, true);
                    Collect.check_state();
                    collectedMoney += data.money;
                    collectedGirlzNb++;
                }
                Clicked.shift();
                if (new Date().getTime() < endCollectTS) {
                    setTimeout(ClickThem, randomInterval(300, 500));
                    window.top.postMessage({ ImAlive: true }, '*');
                }
                else {
                    logHHAuto('Salary collection reached to the max time of ' + maxSecsForSalary + ' secs, collected ' + collectedGirlzNb + '/' + totalGirlsToCollect + ' girls and ' + collectedMoney + ' money');
                    setTimeout(CollectData, randomInterval(300, 500));
                }
            },
                function (err) {
                    Clicked.shift();
                    setTimeout(ClickThem, randomInterval(300, 500));
                });
        }
        else {
            const collectionTime = Math.ceil((new Date().getTime() - startCollectTS) / 1000);
            logHHAuto(`Salary collection done : collected ${collectedGirlzNb} / ${totalGirlsToCollect} girls and ${collectedMoney} money in ${collectionTime} secs`);
            setTimeout(CollectData, randomInterval(300, 500));
        }
    }

    function CollectData(inStart = false) {
        let allCollected = true;
        let collectableGirlsList = [];
        const girlsList = getGirlMapSorted(getCurrentSorting(), false);
        if (girlsList === null) {
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        collectableGirlsList = girlsList.filter(filterGirlMapReadyForCollect);

        totalGirlsToCollect = collectableGirlsList.length;

        if (collectableGirlsList.length > 0) {
            allCollected = false;
            for (let girl of collectableGirlsList) {
                Clicked.push(girl.gId);
            }
            logHHAuto({ log: "Girls ready to collect: ", GirlsToCollect: Clicked });
        }
        if (Clicked.length > 0 && inStart) {
            setTimeout(ClickThem, randomInterval(500, 1500));
        }
        else//nothing to collect
        {
            let salaryTimer = predictNextSalaryMinTime();
            if (salaryTimer > 0) {
                salaryTimer = predictNextSalaryMinTime();
                logHHAuto("Setting salary timer to " + salaryTimer + " secs.");
            }
            else {
                logHHAuto("Next salary set to 60 secs as remains girls to collect");
                salaryTimer = 60;
            }
            setTimer('nextSalaryTime', salaryTimer);
            gotoPage(getHHScriptVars("pagesIDHome"), {}, randomInterval(300, 500));
        }
    }

    CollectData(true);
}

function predictNextSalaryMinTime(inGirlsDataList) {
    let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
    const isGirlMap = getHHVars("GirlSalaryManager.girlsMap") !== null;
    if (!isGirlMap) {
        girlsDataList = getHHVars("girlsDataList");
    }
    let nextCollect = 0;
    const minSalaryForCollect = Number(getStoredValue("HHAuto_Setting_autoSalaryMinSalary"));
    let currentCollectSalary = 0;
    if (girlsDataList !== null && minSalaryForCollect !== NaN) {
        let girlsSalary = Object.values(girlsDataList).sort(sortByPayIn);
        for (let i of girlsSalary) {
            let girl = i;
            if (isGirlMap) {
                girl = i.gData;
            }
            currentCollectSalary += girl.salary;
            nextCollect = girl.pay_in;
            if (currentCollectSalary > minSalaryForCollect) {
                break;
            }
        }
    }
    return nextCollect;

    function sortByPayIn(a, b) {
        let aPay = a.pay_in ? a.pay_in : a.gData.pay_in;
        let bPay = b.pay_in ? b.pay_in : b.gData.pay_in;
        return aPay - bPay;
    }
}

var getSalary = function () {
    try {
        if (getPage() == getHHScriptVars("pagesIDHarem") || getPage() == getHHScriptVars("pagesIDHome")) {
            const salaryButton = $("#collect_all_container button[id='collect_all']")
            const salaryToCollect = !(salaryButton.prop('disabled') || salaryButton.attr("style") === "display: none;");
            const getButtonClass = salaryButton.attr("class");
            let salarySumTag = NaN;
            if (getPage() == getHHScriptVars("pagesIDHarem")) {
                salarySumTag = Number($('[rel="next_salary"]', salaryButton)[0].innerText.replace(/[^0-9]/gi, ''));
            }
            else if (getPage() == getHHScriptVars("pagesIDHome")) {
                salarySumTag = Number($('.sum', salaryButton).attr("amount"));
            }

            const enoughSalaryToCollect = salarySumTag === NaN ? true : salarySumTag > Number(getStoredValue("HHAuto_Setting_autoSalaryMinSalary"));
            if (salaryToCollect && enoughSalaryToCollect) {
                if (getButtonClass.indexOf("blue_button_L") !== -1) {
                    salaryButton.click();
                    logHHAuto('Collected all Premium salary');
                    if (getPage() == getHHScriptVars("pagesIDHarem")) {
                        setTimer('nextSalaryTime', predictNextSalaryMinTime());
                        return false;
                    }
                    else {
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return true;
                    }

                }
                else if (getButtonClass.indexOf("orange_button_L") !== -1) {
                    // Not at Harem screen then goto the Harem screen.
                    if (getPage() == getHHScriptVars("pagesIDHarem")) {
                        logHHAuto("Detected Harem Screen. Fetching Salary");
                        setStoredValue("HHAuto_Temp_autoLoop", "false");
                        logHHAuto("setting autoloop to false");
                        CollectMoney();
                    }
                    else {
                        logHHAuto("Navigating to Harem window.");
                        gotoPage(getHHScriptVars("pagesIDHarem"));
                    }
                    return true;
                }
                else {
                    logHHAuto("Unknown salary button color : " + getButtonClass);
                    setTimer('nextSalaryTime', 60);
                }
            }
            else {
                logHHAuto("Not enough salary to collect");
                setTimer('nextSalaryTime', predictNextSalaryMinTime());
            }
        }
        else {
            // Not at Harem screen then goto the Harem screen.
            if (checkTimer('nextSalaryTime')) {
                logHHAuto("Navigating to Home window.");
                gotoPage(getHHScriptVars("pagesIDHome"));
                return true;
            }
        }
    }
    catch (ex) {
        logHHAuto("Catched error : Could not collect salary... " + ex);
        // return not busy
        return false;
    }
};

function moduleHaremExportGirlsData() {
    const menuID = "ExportGirlsData";
    let ExportGirlsData = `<div style="position: absolute;left: 36%;top: 20px;width:60px;z-index:10" class="tooltipHH" id="${menuID}"><span class="tooltipHHtext">${getTextForUI("ExportGirlsData", "tooltip")}</span><label style="font-size:small" class="myButton" id="ExportGirlsDataButton">${getTextForUI("ExportGirlsData", "elementText")}</label></div>`;
    if (document.getElementById(menuID) === null) {
        $("#contains_all section").prepend(ExportGirlsData);
        document.getElementById("ExportGirlsDataButton").addEventListener("click", saveHHGirlsAsCSV);
        GM_registerMenuCommand(getTextForUI(menuID, "elementText"), saveHHGirlsAsCSV);
    }
    else {
        return;
    }


    function saveHHGirlsAsCSV() {
        var dataToSave = "";
        dataToSave = extractHHGirls();
        var name = 'HH_GirlData_' + Date.now() + '.csv';
        const a = document.createElement('a')
        a.download = name
        a.href = URL.createObjectURL(new Blob([dataToSave], { type: 'text/plain' }))
        a.click()
    }

    function extractHHGirls() {
        dataToSave = "Name,Rarity,Class,Figure,Level,Stars,Of,Left,Hardcore,Charm,Know-how,Total,Position,Eyes,Hair,Zodiac,Own\r\n";
        var gMap = getHHVars('GirlSalaryManager.girlsMap');
        if (gMap === null) {
            // error
            logHHAuto("Girls Map was undefined...! Error, cannot export girls.");
        }
        else {
            try {
                var cnt = 1;
                for (var key in gMap) {
                    cnt++;
                    var gData = gMap[key].gData;
                    dataToSave += gData.name + ",";
                    dataToSave += gData.rarity + ",";
                    dataToSave += gData.class + ",";
                    dataToSave += gData.figure + ",";
                    dataToSave += gData.level + ",";
                    dataToSave += gData.graded + ",";
                    dataToSave += gData.nb_grades + ",";
                    dataToSave += Number(gData.nb_grades) - Number(gData.graded) + ",";
                    dataToSave += gData.caracs.carac1 + ",";
                    dataToSave += gData.caracs.carac2 + ",";
                    dataToSave += gData.caracs.carac3 + ",";
                    dataToSave += Number(gData.caracs.carac1) + Number(gData.caracs.carac2) + Number(gData.caracs.carac3) + ",";
                    dataToSave += gData.position_img + ",";
                    dataToSave += stripSpan(gData.ref.eyes) + ",";
                    dataToSave += stripSpan(gData.ref.hair) + ",";
                    dataToSave += gData.ref.zodiac.substring(3) + ",";
                    dataToSave += gData.own + "\r\n";

                }
                //            logHHAuto(dataToSave);

            }
            catch (exp) {
                // error
                logHHAuto("Catched error : Girls Map had undefined property...! Error, cannot export girls : " + exp);
            }
        }
        return dataToSave;
    }

    function stripSpan(tmpStr) {
        var newStr = "";
        while (tmpStr.indexOf(">") > -1) {
            tmpStr = tmpStr.substring(tmpStr.indexOf(">") + 1);
            newStr += tmpStr.slice(0, tmpStr.indexOf("<"));
            //        tmpStr = tmpStr.substring(tmpStr.indexOf(">")+1);
        }
        return newStr;
    }
}
