/**
 * Export and import directives have serveral syntax variants
 */


export let months = ['Jan', 'Feb', 'Mar', 'Apr']

export const MODULES_BECOME_STANDARD_YEAR = 2015

export class user {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(`Hello ${this.name}`);
    }
}
