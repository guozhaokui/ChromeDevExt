
interface NumbNumberConstructorer{
    constrain(num:number,min:number,max:number):number;
}

Number['constrain'] = function(num:number, min:number, max:number){
    if (num < min)
        num = min;
    else if (num > max)
        num = max;
    return num;
}