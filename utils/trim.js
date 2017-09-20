module.exports = function trim(vlr) {
    while (vlr.indexOf(' ') !== -1) vlr = vlr.replace(' ', '');
    return vlr;
}