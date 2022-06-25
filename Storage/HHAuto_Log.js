function logHHAuto(...args) {
    let currDate = new Date();
    var prefix = currDate.toLocaleString() + "." + currDate.getMilliseconds() + ":" + getCallerCallerFunction();
    var text;
    var currentLoggingText;
    var nbLines;
    var maxLines = 500;

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };
    if (args.length === 1) {
        if (typeof args[0] === 'string' || args[0] instanceof String) {
            text = args[0];
        }
        else {
            text = JSON.stringify(args[0], getCircularReplacer(), 2);
        }
    }
    else {
        text = JSON.stringify(args, getCircularReplacer(), 2);
    }
    currentLoggingText = getStoredValue("HHAuto_Temp_Logging") !== undefined ? getStoredValue("HHAuto_Temp_Logging") : "reset";
    //console.log("debug : ",currentLoggingText);
    if (!currentLoggingText.startsWith("{")) {
        //console.log("debug : delete currentLog");
        currentLoggingText = {};
    }
    else {

        currentLoggingText = JSON.parse(currentLoggingText);
    }
    nbLines = Object.keys(currentLoggingText).length;
    //console.log("Debug : Counting log lines : "+nbLines);
    if (nbLines > maxLines) {
        var keys = Object.keys(currentLoggingText);
        //console.log("Debug : removing old lines");
        for (var i = 0; i < nbLines - maxLines; i++) {
            //console.log("debug delete : "+currentLoggingText[keys[i]]);
            delete currentLoggingText[keys[i]];
        }
    }
    let count = 1;
    let newPrefix = prefix;
    while (currentLoggingText.hasOwnProperty(newPrefix) && count < 10) {
        newPrefix = prefix + "-" + count;
        count++;
    }
    prefix = newPrefix;
    console.log(prefix + ":" + text);
    currentLoggingText[prefix] = text;

    setStoredValue("HHAuto_Temp_Logging", JSON.stringify(currentLoggingText));
}