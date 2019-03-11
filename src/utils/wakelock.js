/* eslint-disable no-console */

async function initWakeLock () {
  let status = ''
  if ('getWakeLock' in navigator) {
    let wakeLockObj = undefined

    try {
      // Create a wake lock for the type we want.
      wakeLockObj = await navigator.getWakeLock('screen')
      console.log('getWakeLock success', wakeLockObj)
      status = 'wakelock OK'
    } catch (err) {
      console.error('getWakeLock error', err)
      status = 'wakelock error'
    }

    return {
      status,
      wakeLock: wakeLockObj
    }
  } else {
    console.log('getWakeLock not supported')
    status = 'wakelock not supported'
  }

  return {
    status
  }
}

export {
  initWakeLock
}
