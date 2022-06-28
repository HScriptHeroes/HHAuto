function moduleSimSeasonMaskReward() {
    var arrayz;
    var nbReward;
    let modified = false;
    arrayz = $('.rewards_pair:not([style*="display:none"]):not([style*="display: none"])');
    if ($("div#gsp_btn_holder[style='display: block;']").length) {
        nbReward = 1;
    }
    else {
        nbReward = 2;
    }

    var obj;

    if (arrayz.length > 0) {
        for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
            obj = $(arrayz[i2]).find('.tick_s:not([style*="display:none"]):not([style*="display: none"])');
            if (obj.length >= nbReward) {
                arrayz[i2].style.display = "none";
                modified = true;
            }
        }
    }
    if (modified) {
        let divToModify = $('#seasons_row1');
        if (divToModify.length > 0) {
            divToModify[0].style.transform = "translate3d(0px, 0px, 0px)";
        }
        divToModify = $('#ascrail2000-hr .nicescroll-cursors');
        if (divToModify.length > 0) {
            divToModify[0].style.left = '0px';
        }
    }
}