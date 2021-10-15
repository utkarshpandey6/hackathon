export let BASE_URL = 'https://dncjgec.in/api/'
export let HOST = 'https://dncjgec.in'
export let MEDIA_URL = 'https://dncjgec.in/media/'
export let COMMITTEE = 'committee/'
export let PRACTICE = 'practice/'
export let GALLERY = 'gallery/'
export let ALUMNI = 'alumni/'
export let LANDING = 'landing/'
export let STUDY_MATERIAL = 'study_materials/'
export let CONTACTS = 'https://apis.dncjgec.in/mailer/to_self'

export let EVENTS = 'events/'
export let VIDEO_TUTORIAL = 'video_tutorials/'

export let galleryImages = (slug) => {
    return `${GALLERY}${slug}/images/`
}

export let videoTutorials = (slug) => {
    return `${VIDEO_TUTORIAL}${slug}/videos/`
}

export let practiceQuestions = (slug) => {
    return `${PRACTICE}${slug}/questions/`
}
