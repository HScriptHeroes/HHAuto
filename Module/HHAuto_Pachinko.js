function modulePachinko() {
    const menuID = "PachinkoButton";
    let PachinkoButton = '<div style="position: absolute;left: 52%;top: 100px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoButton", "tooltip") + '</span><label style="font-size:small" class="myButton" id="PachinkoButton">' + getTextForUI("PachinkoButton", "elementText") + '</label></div>'

    if (document.getElementById(menuID) === null) {
        $("#contains_all section").prepend(PachinkoButton);
        document.getElementById("PachinkoButton").addEventListener("click", buildPachinkoSelectPopUp);
    }
    else {
        return;
    }

    function buildPachinkoSelectPopUp() {
        let PachinkoMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            + '<div style="display:flex;flex-direction:row">'
            + '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoSelector", "tooltip") + '</span><select id="PachinkoSelector"></select></div>'
            + '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoLeft", "tooltip") + '</span><span id="PachinkoLeft"></span></div>'
            + '</div>'
            + '<div style="display:flex;flex-direction:row;align-items:center;">'
            + '<div style="padding:10px"class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("Launch", "tooltip") + '</span><label class="myButton" id="PachinkoPlayX">' + getTextForUI("Launch", "elementText") + '</label></div>'
            + '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoXTimes", "tooltip") + '</span><input id="PachinkoXTimes" style="width:50px;height:20px" required pattern="' + HHAuto_inputPattern.menuExpLevel + '" type="text" value="1"></div>'
            + '<div style="display:flex;flex-direction:column;align-items: center;">'
            + '<div>' + getTextForUI("PachinkoByPassNoGirls", "elementText") + '</div>'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoByPassNoGirls", "tooltip") + '</span><input id="PachinkoByPassNoGirls" type="checkbox"></div>'
            + '</div>'
            + '</div>'
            + '<p style="color: red;" id="PachinkoError"></p>'
            + '</div>'
        fillHHPopUp("PachinkoMenu", getTextForUI("PachinkoButton", "elementText"), PachinkoMenu);



        document.getElementById("PachinkoPlayX").addEventListener("click", pachinkoPlayXTimes);
        $(document).on('change', "#PachinkoSelector", function () {
            let timerSelector = document.getElementById("PachinkoSelector");
            let selectorText = timerSelector.options[timerSelector.selectedIndex].text;
            if (selectorText === getTextForUI("PachinkoSelectorNoButtons", "elementText")) {
                document.getElementById("PachinkoLeft").innerText = "";
                return;
            }
            let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games=" + timerSelector.options[timerSelector.selectedIndex].value + "] span[total_orbs]");

            if (orbsLeft.length > 0) {
                document.getElementById("PachinkoLeft").innerText = orbsLeft[0].innerText + getTextForUI("PachinkoOrbsLeft", "elementText");
            }
            else {
                document.getElementById("PachinkoLeft").innerText = 0;
            }
        });
        // Add Timer reset options //changed
        let timerOptions = document.getElementById("PachinkoSelector");
        let countTimers = 0;
        let PachinkoType = $("div.playing-zone #playzone-replace-info div.cover h2")[0].innerText;

        $("div.playing-zone div.btns-section button.blue_button_L").each(function () {
            let optionElement = document.createElement("option");
            let numberOfGames = Number($(this).attr('nb_games'))
            optionElement.value = numberOfGames;
            countTimers++;
            optionElement.text = PachinkoType + " x" + $(this).attr('nb_games');
            timerOptions.add(optionElement);

            if (countTimers === 1) {
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games=" + numberOfGames + "] span[total_orbs]")[0];
                document.getElementById("PachinkoLeft").innerText = orbsLeft.innerText + getTextForUI("PachinkoOrbsLeft", "elementText");;
            }
        });


        if (countTimers === 0) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers;
            optionElement.text = getTextForUI("PachinkoSelectorNoButtons", "elementText");
            timerOptions.add(optionElement);
        }
    }

    function pachinkoPlayXTimes() {
        let timerSelector = document.getElementById("PachinkoSelector");
        let ByPassNoGirlChecked = document.getElementById("PachinkoByPassNoGirls").checked;
        let buttonValue = Number(timerSelector.options[timerSelector.selectedIndex].value);
        let buttonSelector = "div.playing-zone div.btns-section button.blue_button_L[nb_games=" + buttonValue + "]";
        let orbsLeftSelector = buttonSelector + " span[total_orbs]";
        let orbsLeft = $(orbsLeftSelector);
        let orbsToGo = document.getElementById("PachinkoXTimes").value;
        let orbsPlayed = 0;

        if (orbsLeft.length > 0) {
            orbsLeft = Number(orbsLeft[0].innerText);
        }
        else {
            logHHAuto('No Orbs left for : ' + timerSelector.options[timerSelector.selectedIndex].text);
            document.getElementById("PachinkoError").innerText = getTextForUI("PachinkoSelectorNoButtons", "elementText");
            return;
        }

        if (Number.isNaN(Number(orbsToGo)) || orbsToGo < 1 || orbsToGo > orbsLeft) {
            logHHAuto('Invalid orbs number ' + orbsToGo);
            document.getElementById("PachinkoError").innerText = getTextForUI("PachinkoInvalidOrbsNb", "elementText") + " : " + orbsToGo;
            return;
        }
        let PachinkoPlay = '<div style="padding:50px; display:flex;flex-direction:column">'
            + '<p>' + timerSelector.options[timerSelector.selectedIndex].text + ' : </p>'
            + '<p id="PachinkoPlayedTimes" style="padding:10px">0/' + orbsToGo + '</p>'
            + '<label style="width:80px" class="myButton" id="PachinkoPlayCancel">' + getTextForUI("OptionCancel", "elementText") + '</label>'
            + '</div>'
        fillHHPopUp("PachinkoPlay", getTextForUI("PachinkoButton", "elementText"), PachinkoPlay);
        document.getElementById("PachinkoPlayCancel").addEventListener("click", function () {
            maskHHPopUp();
            logHHAuto("Cancel clicked, closing popUp.");

        });
        function playXPachinko_func() {
            if (!isDisplayedHHPopUp()) {
                logHHAuto("PopUp closed, cancelling interval.");
                return;
            }
            if (document.getElementById("confirm_pachinko") !== null) {
                if (ByPassNoGirlChecked && document.getElementById("confirm_pachinko").querySelector("#popup_confirm.blue_button_L") !== null) {
                    document.getElementById("confirm_pachinko").querySelector("#popup_confirm.blue_button_L").click();
                }
                else {
                    logHHAuto("No more girl on Pachinko, cancelling.");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp();
                    document.getElementById("PachinkoError").innerText = getTextForUI("PachinkoNoGirls", "elementText");
                }
            }
            let pachinkoSelectedButton = $(buttonSelector);
            let rewardQuery = "div#rewards_popup button.blue_button_L";
            if ($(rewardQuery).length > 0) {
                $(rewardQuery).click();
            }
            let currentOrbsLeft = $(orbsLeftSelector);
            if (currentOrbsLeft.length > 0) {
                currentOrbsLeft = Number(currentOrbsLeft[0].innerText);
            }
            else {
                currentOrbsLeft = 0;
            }
            let spendedOrbs = Number(orbsLeft - currentOrbsLeft);
            document.getElementById("PachinkoPlayedTimes").innerText = spendedOrbs + "/" + orbsToGo;
            if (spendedOrbs < orbsToGo && currentOrbsLeft > 0) {
                pachinkoSelectedButton.click();
            }
            else {
                logHHAuto("All spent, going back to Selector.");
                maskHHPopUp();
                buildPachinkoSelectPopUp();
                return;
            }
            setTimeout(playXPachinko_func, randomInterval(500, 1500));
        }
        setTimeout(playXPachinko_func, randomInterval(500, 1500));
    }
}