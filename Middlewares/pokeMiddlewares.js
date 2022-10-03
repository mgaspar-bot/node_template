function validateNumberQuery (req, res, next) {
    let dexNumber = req.query.id;
    dexNumber = Number(dexNumber);
    if (Number.isInteger(dexNumber) && (0 < dexNumber) && (dexNumber < 906) ) {
        next();
    }else if (!dexNumber) {
        res.status(400).json({
            "error":"We only accept queries for the field 'id"
        });
        return;
    }else {
        res.status(404).json({
            "error":"invalid pokedex number"
        });
        return;
    }
}

exports.validateNumberQuery = validateNumberQuery;

function validateNumberURL (req, res, next) {
    let dexNumber = req.params.id;
    dexNumber = Number(dexNumber);
    if (Number.isInteger(dexNumber) && (0 < dexNumber) && (dexNumber < 906) ) {
        next();
    }else {
        res.status(404).json({
            "error":"invalid pokedex number"
        });
        return;
    }
}

exports.validateNumberURL = validateNumberURL;

