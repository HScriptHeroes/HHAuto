function getLanguageCode() {
    alert("getLanguageCode");
    let HHAuto_Lang = 'en';
    if ($('html')[0].lang === 'en') {
        HHAuto_Lang = 'en';
    }
    else if ($('html')[0].lang === 'fr') {
        HHAuto_Lang = 'fr';
    }
    else if ($('html')[0].lang === 'es_ES') {
        HHAuto_Lang = 'es';
    }
    else if ($('html')[0].lang === 'de_DE') {
        HHAuto_Lang = 'de';
    }
    else if ($('html')[0].lang === 'it_IT') {
        HHAuto_Lang = 'it';
    }
    return HHAuto_Lang;
}

function getTextForUI(id, type) {
    alert("getTextForUI");
    let HHAuto_Lang = getLanguageCode();
    let defaultLanguageText = null;
    let defaultLanguageVersion = "0";

    //console.log(id);
    if (HHAuto_ToolTips['en'] !== undefined && HHAuto_ToolTips['en'][id] !== undefined && HHAuto_ToolTips['en'][id][type] !== undefined) {
        defaultLanguageText = HHAuto_ToolTips['en'][id][type];
        defaultLanguageVersion = HHAuto_ToolTips['en'][id].version;
    }

    if (HHAuto_ToolTips[HHAuto_Lang] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id][type] !== undefined && cmpVersions(HHAuto_ToolTips[HHAuto_Lang][id].version, defaultLanguageVersion) >= 0) {
        return HHAuto_ToolTips[HHAuto_Lang][id][type];
    }
    else {
        if (defaultLanguageText !== null) {
            return defaultLanguageText;
        }
        else {
            logHHAuto("not found text for " + HHAuto_Lang + "/" + id + "/" + type);
            return HHAuto_Lang + "/" + id + "/" + type + " not found.";
        }
    }
}