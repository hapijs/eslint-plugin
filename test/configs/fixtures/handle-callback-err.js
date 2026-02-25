/* eslint-disable no-unused-vars */

export const foo = function (value) {

    const top = function (err) {

        const inner = function (e) {

            return value;
        };
    };

    top();
};


export const bar = function (value) {

    const top = function (abc) {

        const inner = function (xyz) {

            return value;
        };
    };

    top();
};
