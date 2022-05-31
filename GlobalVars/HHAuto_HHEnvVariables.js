var HHEnvVariables = {};
HHEnvVariables["global"] = {};
for (let i in HHKnownEnvironnements) {
    HHEnvVariables[HHKnownEnvironnements[i].name] = {};
    HHEnvVariables[HHKnownEnvironnements[i].name].gameID = HHKnownEnvironnements[i].id;
    HHEnvVariables[HHKnownEnvironnements[i].name].HHGameName = HHKnownEnvironnements[i].name;
}

HHEnvVariables["global"].eventIDReg = "event_";
HHEnvVariables["global"].mythicEventIDReg = "mythic_event_";
HHEnvVariables["global"].girlToolTipData = "data-new-girl-tooltip";
HHEnvVariables["global"].dailyRewardNotifRequest = "#contains_all header .currency .daily-reward-notif";
HHEnvVariables["global"].IDpanelEditTeam = "#edit-team-page"
HHEnvVariables["global"].shopGirlCountRequest = '#girls_list .g1 .nav_placement span:not([contenteditable]';
HHEnvVariables["global"].shopGirlCurrentRequest = '#girls_list .g1 .nav_placement span[contenteditable]';
HHEnvVariables["global"].contestMaxDays = 21;
HHEnvVariables["global"].selectorFilterNotDisplayNone = ':not([style*="display:none"]):not([style*="display: none"])';
HHEnvVariables["global"].HaremMaxSizeExpirationSecs = 7 * 24 * 60 * 60;//7 days
HHEnvVariables["global"].HaremMinSizeExpirationSecs = 24 * 60 * 60;//1 days
HHEnvVariables["global"].LeagueListExpirationSecs = 60 * 60;//1 hour max
HHEnvVariables["global"].minSecsBeforeGoHomeAfterActions = 10;
HHEnvVariables["global"].dailyRewardMaxRemainingTime = 2 * 60 * 60;
HHEnvVariables["global"].maxCollectionDelay = 2 * 60 * 60;
HHEnvVariables["global"].STOCHASTIC_SIM_RUNS = 10000;
HHEnvVariables["global"].PoVPoGTimestampAttributeName = "data-time-stamp";
HHEnvVariables["global"].ELEMENTS =
{
    chance: {
        darkness: 'light',
        light: 'psychic',
        psychic: 'darkness'
    },
    egoDamage: {
        fire: 'nature',
        nature: 'stone',
        stone: 'sun',
        sun: 'water',
        water: 'fire'
    }
};
HHEnvVariables["global"].powerCalcImages =
{
    plus: "https://i.postimg.cc/qgkpN0sZ/Opponent-green.png",
    close: "https://i.postimg.cc/3JCgVBdK/Opponent-orange.png",
    minus: "https://i.postimg.cc/PxgxrBVB/Opponent-red.png",
    chosen: "https://i.postimg.cc/MfKwNbZ8/Opponent-go.png"
};
HHEnvVariables["global"].boostersIdentifier =
{
    MB1: { name: "Sandalwood perfume", usage: "1 more shards when winning shards from villain, up to 11." },
    MB2: { name: "All Mastery's Emblem", usage: "+15% attack power against League/Seasons for next 100 fights" },
    MB3: { name: "Headband of determination", usage: "+25% damage against champions for next 200 fights" },
    MB4: { name: "Luxurious Watch", usage: "+25% power against PoA for next 60 missions" },
    MB5: { name: "Combative Cinnamon", usage: "+5 mojo on a win and 0 on a loose for next 100 season fight" },
    MB6: { name: "Alban's travel memories", usage: "+20% xp (5 if level 300 or higher), up to 100000" },
    MB7: { name: "Angels' semen scent", usage: "+25% power against PoA for next 60 missions" },
};

HHEnvVariables["global"].possibleRewardsList = {
    'energy_kiss': "Kisses",
    'energy_quest': "Quest energy",
    'energy_fight': "Fights",
    'xp': "Exp",
    'girl_shards': "Girl shards",
    'soft_currency': "Ymens",
    'hard_currency': "Kobans",
    'gift': "Gifts",
    'potion': "Potions",
    'booster': "Boosters",
    'orbs': "Orbs",
    'gems': "Gems",
    'avatar': "Avatar",
    'ticket': "Champions' tickets"
};

HHEnvVariables["global"].trollzList = ["Latest",
    "Dark Lord",
    "Ninja Spy",
    "Gruntt",
    "Edwarda",
    "Donatien",
    "Silvanus",
    "Bremen",
    "Finalmecia",
    "Roko Senseï",
    "Karole",
    "Jackson\'s Crew",
    "Pandora witch",
    "Nike",
    "Sake",
    "WereBunny Police"];
HHEnvVariables["global"].leaguesList = ["Wanker I",
    "Wanker II",
    "Wanker III",
    "Sexpert I",
    "Sexpert II",
    "Sexpert III",
    "Dicktator I",
    "Dicktator II",
    "Dicktator III"];
switch (getLanguageCode()) {
    case "fr":
        HHEnvVariables["global"].trollzList = ["Dernier",
            "Dark Lord",
            "Espion Ninja",
            "Gruntt",
            "Edwarda",
            "Donatien",
            "Silvanus",
            "Bremen",
            "Finalmecia",
            "Roko Senseï",
            "Karole",
            "Jackson",
            "Pandora",
            "Nike",
            "Sake",
            "Police des Lapines-Garous"];
        HHEnvVariables["global"].leaguesList = ["Branleur I",
            "Branleur II",
            "Branleur III",
            "Sexpert I",
            "Sexpert II",
            "Sexpert III",
            "Dicktateur I",
            "Dicktateur II",
            "Dicktateur III"];
        break;
    default:
        break;
}
HHEnvVariables["global"].haremSortingFunctions = {};
HHEnvVariables["global"].haremSortingFunctions.date_acquired = function (a, b) {
    if (getHHVars("all_possible_girls") === null)
        return -1;
    if (a.gData.own && b.gData.own) {
        var dateA = new Date(getHHVars("all_possible_girls")[a.gId].date_added).getTime();
        var dateB = new Date(getHHVars("all_possible_girls")[b.gId].date_added).getTime();
        return dateA - dateB
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1;
    else
        return b.shards - a.shards
};
HHEnvVariables["global"].haremSortingFunctions.name = function sortByName(a, b) {
    var nameA = a.gData.name.toUpperCase();
    var nameB = b.gData.name.toUpperCase();
    if (a.gData.own == b.gData.own) {
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1
};
HHEnvVariables["global"].haremSortingFunctions.grade = function sortByGrade(a, b) {
    return compareOwnFirst(a.gData, b.gData, b.gData.graded - a.gData.graded)
};
HHEnvVariables["global"].haremSortingFunctions.level = function sortByLevel(a, b) {
    return compareOwnFirst(a.gData, b.gData, b.gData.level - a.gData.level)
};
HHEnvVariables["global"].haremSortingFunctions.power = function sortByPower(a, b) {
    return compareOwnFirst(a.gData, b.gData, b.gData.caracs.carac1 + b.gData.caracs.carac2 + b.gData.caracs.carac3 - a.gData.caracs.carac1 - a.gData.caracs.carac2 - a.gData.caracs.carac3)
}
HHEnvVariables["global"].haremSortingFunctions.upgrade_cost = function sortByUpgradeCost(a, b) {
    const aCost = (Number(a.gData.nb_grades) === Number(a.gData.graded) || !a.gData.own) ? 0 : getGirlUpgradeCost(a.gData.rarity, a.gData.graded + 1);
    const bCost = (Number(b.gData.nb_grades) === Number(b.gData.graded) || !b.gData.own) ? 0 : getGirlUpgradeCost(b.gData.rarity, b.gData.graded + 1);
    return compareOwnFirst(a.gData, b.gData, bCost - aCost)
}

HHEnvVariables["global"].pagesKnownList = [];

HHEnvVariables["global"].pagesIDHome = "home";
HHEnvVariables["global"].pagesURLHome = "/home.html";
HHEnvVariables["global"].pagesKnownList.push("Home");

HHEnvVariables["global"].pagesIDMissions = "missions";
HHEnvVariables["global"].pagesKnownList.push("Missions");

HHEnvVariables["global"].pagesIDContests = "contests";
HHEnvVariables["global"].pagesKnownList.push("Contests");

HHEnvVariables["global"].pagesIDDailyGoals = "daily_goals";
HHEnvVariables["global"].pagesKnownList.push("DailyGoals");

HHEnvVariables["global"].pagesIDQuest = "quest";
HHEnvVariables["global"].pagesKnownList.push("Quest");

HHEnvVariables["global"].pagesIDActivities = "activities";
HHEnvVariables["global"].pagesURLActivities = "/activities.html";
HHEnvVariables["global"].pagesKnownList.push("Activities");

HHEnvVariables["global"].pagesIDHarem = "harem";
HHEnvVariables["global"].pagesURLHarem = "/harem.html";
HHEnvVariables["global"].pagesKnownList.push("Harem");

HHEnvVariables["global"].pagesIDMap = "map";
HHEnvVariables["global"].pagesURLMap = "/map.html";
HHEnvVariables["global"].pagesKnownList.push("Map");

HHEnvVariables["global"].pagesIDPachinko = "pachinko";
HHEnvVariables["global"].pagesURLPachinko = "/pachinko.html";
HHEnvVariables["global"].pagesKnownList.push("Pachinko");

HHEnvVariables["global"].pagesIDLeaderboard = "leaderboard";
HHEnvVariables["global"].pagesURLLeaderboard = "/tower-of-fame.html";
HHEnvVariables["global"].pagesKnownList.push("Leaderboard");

HHEnvVariables["global"].pagesIDShop = "shop";
HHEnvVariables["global"].pagesURLShop = "/shop.html";
HHEnvVariables["global"].pagesKnownList.push("Shop");

HHEnvVariables["global"].pagesIDClub = "clubs";
HHEnvVariables["global"].pagesURLClub = "/clubs.html";
HHEnvVariables["global"].pagesKnownList.push("Club");

HHEnvVariables["global"].pagesIDPantheon = "pantheon";
HHEnvVariables["global"].pagesURLPantheon = "/pantheon.html";
HHEnvVariables["global"].pagesKnownList.push("Pantheon");
HHEnvVariables["global"].pagesIDPantheonPreBattle = "pantheon-pre-battle";
HHEnvVariables["global"].pagesURLPantheonPreBattle = "/pantheon-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("PantheonPreBattle");

HHEnvVariables["global"].pagesIDChampionsPage = "champions";
HHEnvVariables["global"].pagesKnownList.push("ChampionsPage");

HHEnvVariables["global"].pagesIDChampionsMap = "champions_map";
HHEnvVariables["global"].pagesURLChampionsMap = "/champions-map.html";
HHEnvVariables["global"].pagesKnownList.push("ChampionsMap");

HHEnvVariables["global"].pagesIDSeason = "season";
HHEnvVariables["global"].pagesURLSeason = "/season.html";
HHEnvVariables["global"].pagesKnownList.push("Season");

HHEnvVariables["global"].pagesIDSeasonArena = "season_arena";
HHEnvVariables["global"].pagesURLSeasonArena = "/season-arena.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonArena");

HHEnvVariables["global"].pagesIDClubChampion = "club_champion";
HHEnvVariables["global"].pagesURLClubChampion = "/club-champion.html";
HHEnvVariables["global"].pagesKnownList.push("ClubChampion");

HHEnvVariables["global"].pagesIDLeagueBattle = "league-battle";
HHEnvVariables["global"].pagesURLLeagueBattle = "/league-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LeagueBattle");

HHEnvVariables["global"].pagesIDTrollBattle = "troll-battle";
HHEnvVariables["global"].pagesURLTrollBattle = "/troll-battle.html";
HHEnvVariables["global"].pagesKnownList.push("TrollBattle");

HHEnvVariables["global"].pagesIDSeasonBattle = "season-battle";
HHEnvVariables["global"].pagesURLSeasonBattle = "/season-battle.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonBattle");

HHEnvVariables["global"].pagesIDPantheonBattle = "pantheon-battle";
HHEnvVariables["global"].pagesURLPantheonBattle = "/pantheon-battle.html";
HHEnvVariables["global"].pagesKnownList.push("PantheonBattle");

HHEnvVariables["global"].pagesIDTrollPreBattle = "troll-pre-battle";
HHEnvVariables["global"].pagesURLTrollPreBattle = "/troll-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("TrollPreBattle");

HHEnvVariables["global"].pagesIDEvent = "event";
HHEnvVariables["global"].pagesURLEvent = "/event.html";
HHEnvVariables["global"].pagesKnownList.push("Event");

HHEnvVariables["global"].pagesIDPoV = "path-of-valor";
HHEnvVariables["global"].pagesURLPoV = "/path-of-valor.html";
HHEnvVariables["global"].pagesKnownList.push("PoV");

HHEnvVariables["global"].pagesIDPoG = "path-of-glory";
HHEnvVariables["global"].pagesURLPoG = "/path-of-glory.html";
HHEnvVariables["global"].pagesKnownList.push("PoG");

HHEnvVariables["global"].pagesIDPowerplacemain = "powerplacemain";
HHEnvVariables["global"].pagesKnownList.push("Powerplacemain");

HHEnvVariables["global"].pagesIDEditTeam = "edit-team";
HHEnvVariables["global"].pagesURLEditTeam = "";
HHEnvVariables["global"].pagesKnownList.push("EditTeam");

HHEnvVariables["global"].pagesIDPoA = "path_of_attraction";
HHEnvVariables["global"].pagesKnownList.push("PoA");

HHEnvVariables["global"].isEnabledEvents = true;
HHEnvVariables["global"].isEnabledTrollBattle = true;
HHEnvVariables["global"].isEnabledPachinko = true;
HHEnvVariables["global"].isEnabledGreatPachinko = true;
HHEnvVariables["global"].isEnabledMythicPachinko = true;
HHEnvVariables["global"].isEnabledContest = true;
HHEnvVariables["global"].isEnabledPowerPlaces = true;
HHEnvVariables["global"].isEnabledMission = true;
HHEnvVariables["global"].isEnabledQuest = true;
HHEnvVariables["global"].isEnabledSideQuest = true;
HHEnvVariables["global"].isEnabledSeason = true;
HHEnvVariables["global"].isEnabledPantheon = true;
HHEnvVariables["global"].isEnabledAllChamps = true;
HHEnvVariables["global"].isEnabledChamps = true;
HHEnvVariables["global"].isEnabledClubChamp = true;
HHEnvVariables["global"].isEnabledLeagues = true;
HHEnvVariables["global"].isEnabledDailyRewards = true;
HHEnvVariables["global"].isEnabledShop = true;
HHEnvVariables["global"].isEnabledSalary = true;
HHEnvVariables["global"].isEnabledPoVPoG = true;
HHEnvVariables["global"].isEnabledPoV = true;
HHEnvVariables["global"].isEnabledPoG = true;
HHEnvVariables["global"].isEnabledDailyGoals = true;

HHEnvVariables["HH_test"].isEnabledDailyRewards = false;// to remove if daily rewards arrives in test
["CH_prod", "NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
        'BodyHack',
        'Grey Golem',
        'The Nymph',
        'Athicus Ho’ole',
        'The Mimic'];
    HHEnvVariables[element].isEnabledClubChamp = false;// to remove when Club Champs arrives in Comix
    HHEnvVariables[element].isEnabledPantheon = false;// to remove when Pantheon arrives in Comix
    HHEnvVariables[element].isEnabledPoG = false;
})
HHEnvVariables["SH_prod"].isEnabledSideQuest = false;// to remove when SideQuest arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPowerPlaces = false;// to remove when PoP arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledAllChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoVPoG = false;
HHEnvVariables["SH_prod"].isEnabledPoV = false;// to remove when PoV arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoG = false;// to remove when PoG arrives in hornyheroes
["PH_prod", "NPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
        'Headmistress Asa Akira',
        'Sammy Jayne'];
    HHEnvVariables[element].isEnabledPowerPlaces = false;// to remove when PoP arrives in pornstar
    HHEnvVariables[element].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in pornstar
    HHEnvVariables[element].isEnabledClubChamp = false;// to remove when Club Champs arrives in pornstar
    HHEnvVariables[element].isEnabledPantheon = false;// to remove when Pantheon arrives in pornstar
    HHEnvVariables[element].isEnabledPoVPoG = false;
    HHEnvVariables[element].isEnabledPoV = false;// to remove when PoV arrives in pornstar
    HHEnvVariables[element].isEnabledPoG = false;// to remove when PoG arrives in pornstar
})
