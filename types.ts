export type Recrutor = {
    recruiter_id: string;
    content: string;
    image?:string;
    profile_picture_url?: string,
    recruiter_rating?: number,
    recruiter_name: string,
    num_candidates_listed: number,
    successful_deals: number,
    verified_badge: boolean,
    location: string
}


export type Candidates = {
    id: string;
    recruiter_id: string;
    name: string;
    email: string;
    expected_ctc ?: string;
    experience ?: number;
    linkedin_profile_url ?: string;
    location ?: string;
    role?: string;
    notice_period?: string;
    backImage?: string;
    about?: string;
    skills?: [];
    contact_number?: string
    // experience?: Experience[]
}

// export type Experience = {
//    id: string;
//    title: string;
//    companyName: string;
//    companyImage?: string;
// }