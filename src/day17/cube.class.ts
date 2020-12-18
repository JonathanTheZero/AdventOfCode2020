export default class Cube {
    #isActive: boolean;

    constructor(isActive = false) {
        this.#isActive = isActive;
    }

    toggleActive(): void {
        this.#isActive = this.#isActive ? false : true;
    }
}