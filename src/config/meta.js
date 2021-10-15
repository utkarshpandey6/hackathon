export const HOME = {
    title: 'Home | Divide & Conquer',
    description:
        'Divide & Conquer is a group of enthusiastic coders from Jalpaiguri Government Engineering College. Here, we not only introduce coding to students who have never given it a thought, but also provide mentorship and assistance to all the students throughout their journey.',
}

export const IDE = {
    title: 'IDE | Divide & Conquer',
    description: 'Fast reliable online IDE for hassle free coding time',
}

export const RESOURCE = {
    title: 'Resources | Divide & Conquer',
    description:
        "Helpful resources for budding coder's to learn and practice coding, all compiled by member of Divide and Conquer (JGEC Coder's Club)",
}

export const STUDY_MATERIAL = {
    title: 'Study Material | Divide & Conquer',
    description:
        "Helpful study materials for budding coder's to learn and practice coding, all compiled by member of Divide and Conquer (JGEC Coder's Club)",
}

export const PRACTICE = {
    title: 'Practice | Divide & Conquer',
    description:
        'Coding practice categories and compiled questions from all across the coding websites, compiled by member of Divide & Conquer (DnC)',
}

export const VIDEO_TUTORIALS = {
    title: 'Video Tutorials | Divide & Conquer',
    description:
        'Video Tutorials of different areas of web development, mobile development, competitive programming, and much more everything compiled together by members of Divide and Conquer at one place',
}

export const GALLERY = {
    title: 'Gallery | Divide & Conquer',
    description:
        'Album Gallery of Divide and Conquer member comprising of many proud and emotional memories attached with the club and its members.',
}

export const ALUMNI = {
    title: 'Alumni | Divide & Conquer',
    description:
        'Ex-Members of Divide and Conquer who are the pride of the club across all the batches of Jalpaiguri Government Engineering College (JGEC)',
}

export const COMMITTEE = {
    title: 'Committee | Divide & Conquer',
    description: 'The present committee members of the Divide and Conquer club',
}

export const CONTACT = {
    title: 'Contact Us | Divide & Conquer',
    description:
        'Send your valuable feedback, give your valuable suggestion or just reach out to members of Divide and Conquer, we would love to hear from you.',
}

export const EVENTS = {
    title: 'Events | Divide & Conquer',
    description:
        'Know all the upcoming internal events of Divide and Conquer along with all the competitive programming contest and hackathon events across the internet.',
}

export const AUTH = {
    title: 'Auth | Divide & Conquer',
    description:
        'Welcome to Divide and Conquer, please provide you username/email and password to log into your account or Join by creating a new account',
}

export const BLOGREAD = {
    title: 'Blogs | Divide & Conquer',
    description:
        'Awesome and resourceful technical/informal blogs from divide and conquer community.',
}

export const BLOGWRITE = {
    title: 'Write | Divide & Conquer',
    description:
        'Create awesome and resourceful technical/informal blogs to share with divide and conquer community.',
}

export const NOTFOUND = {
    title: '404 | Not Found',
    description: 'Not Found',
}

export const buildMeta = (title, description) => {
    if (title === null || title === undefined || title.length === 0) {
        title = 'Divide & Conquer'
    } else {
        title = title + ' | Divide & Conquer'
    }
    if (
        description === null ||
        description === undefined ||
        description.length === 0
    ) {
        description = ''
    }
    return { title, description }
}
