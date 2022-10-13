function tirarDaus() {
    let tirada = [];
    tirada.push(Math.floor(Math.random()*6 + 1));
    tirada.push(Math.floor(Math.random()*6 + 1));
    return tirada;    
}

module.exports = tirarDaus;