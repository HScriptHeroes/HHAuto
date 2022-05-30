function calculateDominationBonuses(playerElements, opponentElements) {
    const bonuses = {
        player: {
            ego: 0,
            attack: 0,
            chance: 0
        },
        opponent: {
            ego: 0,
            attack: 0,
            chance: 0
        }
    };

    [
        { a: playerElements, b: opponentElements, k: 'player' },
        { a: opponentElements, b: playerElements, k: 'opponent' }
    ].forEach(({ a, b, k }) => {
        a.forEach(element => {
            if (getHHScriptVars("ELEMENTS").egoDamage[element] && b.includes(getHHScriptVars("ELEMENTS").egoDamage[element])) {
                bonuses[k].ego += 0.1
                bonuses[k].attack += 0.1
            }
            if (getHHScriptVars("ELEMENTS").chance[element] && b.includes(getHHScriptVars("ELEMENTS").chance[element])) {
                bonuses[k].chance += 0.2
            }
        })
    })

    return bonuses
}

function calculateCritChanceShare(ownHarmony, otherHarmony) {
    return 0.3 * ownHarmony / (ownHarmony + otherHarmony)
}

function calculateSynergiesFromTeamMemberElements(elements) {
    const counts = countElementsInTeam(elements)

    // Only care about those not included in the stats already: fire, stone, sun and water
    // Assume max harem synergy
    const girlCount = isJSON(getStoredValue("HHAuto_Temp_HaremSize")) ? JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count : 800;
    const girlsPerElement = Math.min(girlCount / 8, 100)

    return {
        critDamage: (0.0035 * girlsPerElement) + (0.1 * counts.fire),
        critChance: (0.0007 * girlsPerElement) + (0.02 * counts.stone),
        defReduce: (0.0007 * girlsPerElement) + (0.02 * counts.sun),
        healOnHit: (0.001 * girlsPerElement) + (0.03 * counts.water)
    }
}

function calculateThemeFromElements(elements) {
    const counts = countElementsInTeam(elements)

    const theme = []
    Object.entries(counts).forEach(([element, count]) => {
        if (count >= 3) {
            theme.push(element)
        }
    })
    return theme;
}

function calculateBattleProbabilities(player, opponent) {
    const ret = {
        points: {},
        win: 0,
        loss: 0,
        avgTurns: 0,
        scoreClass: ''
    }

    player.critMultiplier = 2 + player.bonuses.critDamage
    opponent.critMultiplier = 2 + opponent.bonuses.critDamage

    let runs = 0
    let wins = 0
    let losses = 0
    const pointsCollector = {}
    let totalTurns = 0

    while (runs < getHHScriptVars("STOCHASTIC_SIM_RUNS")) {
        const { points, turns } = simulateBattle({ ...player }, { ...opponent })

        pointsCollector[points] = (pointsCollector[points] || 0) + 1
        if (points >= 15) {
            wins++
        } else {
            losses++
        }

        totalTurns += turns
        runs++
    }

    ret.points = Object.entries(pointsCollector).map(([points, occurrences]) => ({ [points]: occurrences / runs })).reduce((a, b) => Object.assign(a, b), {})

    ret.win = wins / runs
    ret.loss = losses / runs
    ret.avgTurns = totalTurns / runs
    ret.scoreClass = ret.win > 0.9 ? "plus" : ret.win < 0.5 ? "minus" : "close"

    return ret
}

function randomInterval(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}