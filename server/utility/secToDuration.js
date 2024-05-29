exports.convertSecondToDuration=(seconds)=>{

    const hour = Math.floor(seconds/3600);
    const remainingSeconds = seconds%3600;
    const minute = Math.floor(remainingSeconds/60);
    const second = Math.floor(remainingSeconds%60);

    if(hour>0){
        return `${hour}h ${minute}m`;
    }
    else if(minute>0){
        return `${minute}m ${second}s`
    }
    else{
        return `${second}s`
    }
}