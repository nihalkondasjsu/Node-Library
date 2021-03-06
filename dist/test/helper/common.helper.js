import { expect } from './chai.helper';
function jsonStructure(json, keys) {
    for (const k of keys) {
        expect(k in json).to.be.true;
        json = json[k];
    }
    expect(json).to.not.be.undefined;
    expect(json).to.not.be.null;
    return json;
}
function nonEmptyString(value) {
    expect(value).to.be.a('string');
    expect(value).to.not.equal("");
    return value;
}
function isNumber(value) {
    expect(value).to.be.a('number');
    return value;
}
function wait(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(ms);
        }, ms);
    });
}
export { jsonStructure, nonEmptyString, isNumber, wait };
//# sourceMappingURL=common.helper.js.map