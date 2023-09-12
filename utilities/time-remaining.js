const getRemainingTime = (tStamp) => {
    const nowStamp = new Date().getTime();
    const diff = tStamp - nowStamp;

    const days = diff / 1000 / 60 / 60 / 24;
    const hours = (diff / 1000 / 60 / 60) % 24;
    const minutes = (diff / 1000 / 60) % 60;
    const seconds = (diff / 1000) % 60;

    return `Ending in ${Math.floor(days)}days ${Math.floor(hours)}hrs ${Math.floor(minutes)}min ${Math.floor(seconds)}secs`
}

export {getRemainingTime}