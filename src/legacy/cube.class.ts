export default class Cube {
    _isActive: boolean;

    constructor(isActive = false) {
        this._isActive = isActive;
    }

    toggleActive(): void {
        this._isActive = this._isActive ? false : true;
    }
}