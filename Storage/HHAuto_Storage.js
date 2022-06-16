function getStorage() {
    return getStoredValue("HHAuto_Setting_settPerTab") === "true" ? sessionStorage : localStorage;
}

function getStoredValue(inVarName) {
    return HHStoredVars.hasOwnProperty(inVarName) ? getStorageItem(HHStoredVars[inVarName].storage)[inVarName] : undefined;
}

function deleteStoredValue(inVarName) {
    if (HHStoredVars.hasOwnProperty(inVarName)) {
        getStorageItem(HHStoredVars[inVarName].storage).removeItem(inVarName);
    }
}

function setStoredValue(inVarName, inValue) {
    if (HHStoredVars.hasOwnProperty(inVarName)) {
        getStorageItem(HHStoredVars[inVarName].storage)[inVarName] = inValue;
    }
}