function addCss() {
    GM_addStyle('.HHAutoScriptMenu .switch { position: relative; display: inline-block; width: 34px; height: 20px }/* The switch - the box around the slider */ '
        + '.HHAutoScriptMenu .switch input { display:none } /* Hide default HTML checkbox */ '
        + '.HHAutoScriptMenu .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } /* The slider */'
        + '.HHAutoScriptMenu .slider.round:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; -webkit-transition: .4s; transition: .4s; } '
        + '.HHAutoScriptMenu input:checked + .slider { background-color: #2196F3; } '
        + '.HHAutoScriptMenu input:focus + .slider { box-shadow: 0 0 1px #2196F3; } '
        + '.HHAutoScriptMenu input:checked + .slider:before { -webkit-transform: translateX(10px); -ms-transform: translateX(10px); transform: translateX(10px); } '
        + '.HHAutoScriptMenu .slider.round { border-radius: 14px; }/* Rounded sliders */ '
        + '.HHAutoScriptMenu .slider.round:before { border-radius: 50%; }');
    GM_addStyle('.HHAutoScriptMenu input:checked + .slider.kobans { background-color: red; }'
        + '.HHAutoScriptMenu input:not(:checked) + .slider.round.kobans:before { background-color: red }'
        + '.HHAutoScriptMenu input:checked + .slider.round.kobans:before { background-color: white }')
    GM_addStyle('#pInfo {padding-left:3px; z-index:1;white-space: pre;position: absolute;right: 5%; left:77%; height:auto; top:11%; overflow: hidden; border: 1px solid #ffa23e; background-color: rgba(0,0,0,.5); border-radius: 5px; font-size:9pt;}');
    //GM_addStyle('span.HHMenuItemName {font-size: xx-small; line-height: 150%}');
    //GM_addStyle('span.HHMenuItemName {font-size: smaller; line-height: 120%}');
    GM_addStyle('span.HHMenuItemName {padding-bottom:2px; line-height:120%}');
    GM_addStyle('div.optionsRow {display:flex; flex-direction:row; justify-content: space-between}'); //; padding:3px;
    GM_addStyle('span.optionsBoxTitle {padding-left:5px}'); //; padding-bottom:2px
    GM_addStyle('div.optionsColumn {display:flex; flex-direction:column; justify-content: space-between}'); //; padding:3px;
    GM_addStyle('div.optionsBoxWithTitle {display:flex; flex-direction:column}');
    GM_addStyle('img.iconImg {max-width:15px; height:15px}');
    GM_addStyle('div.optionsBoxTitle {padding:5px 15px 0px 5px; height:15px; display:flex; flex-direction:row; justify-content:center; align-items:center;}'); //; padding:2px; padding-bottom:0px;
    GM_addStyle('div.rowOptionsBox {margin:3px; padding:3px; font-size:smaller; display:flex; flex-direction:row; align-items:flex-start; border: 1px solid #ffa23e; border-radius: 5px}');
    GM_addStyle('div.optionsBox {margin:3px; padding:3px; font-size:smaller; display:flex; flex-direction:column; border:1px solid #ffa23e; border-radius:5px}');
    GM_addStyle('div.internalOptionsRow {display:flex; flex-direction:row; justify-content: space-between; align-items: flex-end}'); //; padding:3px;
    GM_addStyle('div.imgAndObjectRow {display:flex; flex-direction:row; justify-content:flex-start; align-items:center}'); //; padding:3px;//class="internalOptionsRow" style="justify-content:flex-start; align-items:center"
    GM_addStyle('div.labelAndButton {padding:3px; display:flex;flex-direction:column}');
    GM_addStyle('div.HHMenuItemBox {padding:0.2em}');
    GM_addStyle('div.HHMenuRow {display:flex; flex-direction:row; align-items:center; align-content:center; justify-content:flex-start}');
    GM_addStyle('input.maxMoneyInputField  {text-align:right; width:70px}');
    GM_addStyle('.myButton {box-shadow: 0px 0px 0px 2px #9fb4f2; background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%); background-color:#7892c2; border-radius:10px; border:1px solid #4e6096; display:inline-block; cursor:pointer; color:#ffffff; font-family:Arial; font-size:8px; padding:3px 7px; text-decoration:none; text-shadow:0px 1px 0px #283966;}'
        + '.myButton:hover { background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%); background-color:#476e9e; }'
        + '.myButton:active { position:relative; top:1px;}');
    GM_addStyle('.HHEventPriority {position: absolute;z-index: 500;background-color: black}');
    GM_addStyle('.HHPopIDs {background-color: black;z-index: 500;position: absolute;margin-top: 25px}');
    GM_addStyle('.tooltipHH:hover { cursor: help; position: relative; }'
        + '.tooltipHH span.tooltipHHtext { display: none }');
    GM_addStyle('#popup_message_league { border: #666 2px dotted; padding: 5px 20px 5px 5px; display: block; z-index: 1000; background: #e3e3e3; left: 0px; margin: 15px; width: 500px; position: absolute; top: 15px; color: black}');
    GM_addStyle('#sliding-popups#sliding-popups { z-index : 1}');
}

export { addCss }; 