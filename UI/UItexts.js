
function getLanguageCode() {
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