/* eslint-disable strict */
module.exports.foo = function () {

    try {
        return 1;
    }
    catch (err) {

        return 2;
    }
    finally {
        return 3;
    }
};
