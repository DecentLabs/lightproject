/* eslint-disable no-console */

async function initWakeLock (request = null, timelimit) {
  let status = ''
  let wakeLockObj = undefined

  if ('getWakeLock' in navigator) {

    navigator.getWakeLock('screen').then(res => {
      wakeLockObj = res
      let wakeLockRequest = null
      

      if (wakeLockRequest) {
        wakeLockRequest.cancel();
        wakeLockRequest = null;
        return;
      }
      console.log('getWakeLock success', wakeLockObj)
    }).catch((err) => {
      status = 'wakelock error'
      console.log('Could not obtain wake lock', err);
    });
  } else {
    console.log('getWakeLock not supported')
    status = 'wakelock not supported'
  }

  return {
    status,
    wakeLockObj
  }
}

export {
  initWakeLock
}
