Phaser.Time.prototype.original_update = Phaser.Time.prototype.update;

Phaser.Time.prototype.update = function (time) {

    //  More aggressively clamp the delta
    if (this.physicsElapsed > (1.0/15))
    {
        this.physicsElapsed = (1.0/15);
    }

    this.lastPhysElapsed = this.physicsElapsed;
    this.original_update(time);

    // lowpass filter the physics to smooth out the jitters
    this.physicsElapsed = (this.physicsElapsed * 0.1) + (this.lastPhysElapsed * 0.9);
};