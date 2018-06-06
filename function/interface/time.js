class Timer{
    constructor(){
        this.times = 0;
    }

    start(){
        this.times = new Date();
    }

    end(){
        var dt = new Date();
        dt = dt - this.times;
        return dt;
    }
}