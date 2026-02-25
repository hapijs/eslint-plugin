/* eslint-disable no-unused-vars, handle-callback-err */


// Declare internals

const internals = {};


export const foo = function (value) {

    const top = function (err) {

        const inner = function (err) {

            return value;
        };
    };

    top();
};


export const bar = function (value) {

    const top = function (res) {

        const inner = function (res) {

            return value;
        };
    };

    top();
};
