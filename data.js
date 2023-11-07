let tableOrder = []

function submitEntry(u,s,p) {
    console.log("REACHED");
    const unit = u.textContent;
    const standing = Number(s);
    const prone = Number(p);
    newEntry(unit, standing, prone);
}

function newEntry(unit, standing, prone) {
    const team = {
        rank: null,
        unit: unit,
        standing: standing,
        prone: prone,
        overall: (standing+prone)/2,
        getStat: function getFunction(stat) {
            if (stat === "rank") return this.rank;
            else if (stat === "unit") return this.unit;
            else if (stat === "standing") return this.standing;
            else if (stat === "prone") return this.prone;
            else if (stat === "overall") return this.overall;
            else return null;
        }
    }
    console.log(team)
    team.rank = getRanking(team)
    localStorage.setItem(`#${team.rank}`, JSON.stringify(team))
    tableOrder.push(team);
    sortTable()
    console.log(tableOrder)
}

function getRanking(newTeam) {
    let betterTeams = tableOrder.filter(function(extTeam) {
        return extTeam.overall > newTeam.overall;
    })
    console.log(betterTeams.length);
    return betterTeams.length+1;
}

function sortTable(stat, atTop) {
    let sortingStats = ["rank", "unit", "standing", "prone", "overall"]
    let sortingOrders = ["highest", "lowest"]

    let sortBy = sortingStats.includes(stat) ? stat : "rank";
    let order = sortingOrders.includes(atTop) ? atTop : "highest";

    if (order === "highest") {
        tableOrder.sort(function(a, b) { return a.getStat(sortBy) > b.getStat(sortBy) ? a : b; }) // if a is bigger than b, return A.
    }
    else {
        tableOrder.sort(function(a, b) { return a.getStat(sortBy) > b.getStat(sortBy) ? b : a; }) // if a is bigger than b, return B.
    }    
}

function removeTeam(rank) {
    sortTable();
    tableOrder.splice(rank-1,1);
    tableOrder.forEach((team,i) => {
        team.rank = i+1;
    })
}

function initArray() {
    for (var i = 1; i <= localStorage.length; i++) {
        let team = localStorage.getItem(`#${i}`);
        team = JSON.parse(team);
        if (!team) {
            continue;
        } else {
            tableOrder.push(team);
        }
    }
}

initArray()