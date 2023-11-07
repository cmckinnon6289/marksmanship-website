let tableOrder = []

function submitEntry() {
    const unit = document.querySelector("#unit").value;
    const standing = document.querySelector("#standing").value;
    const prone = document.querySelector("#prone").value;
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
    team.getRanking()
    tableOrder.push(team);
    sortTable()
}

function getRanking() {
    let betterTeams = tableOrder.filter(function(extTeam) {
        return extTeam.overall > this.overall;
    })
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

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        console.log("fired")
        let requiredInputs = document.querySelectorAll('input[required]');
        requiredInputs.forEach(function(input) {
            if (input.value.trim() === '') {
                input.classList.add('is-danger');
            }
        });
    });
});