import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ne";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof Dict) => string };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("mpcn-lang") as Lang | null) : null;
    if (saved === "en" || saved === "ne") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("mpcn-lang", l);
  };

  const t = (k: keyof Dict) => dict[k][lang];

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

type Dict = typeof dict;

// Central dictionary. Keep keys stable; add per-page keys grouped by prefix.
const dict = {
  // Nav
  nav_home: { en: "Home", ne: "गृह" },
  nav_how: { en: "How It Works", ne: "प्रक्रिया" },
  nav_about: { en: "About", ne: "हाम्रो बारे" },
  nav_reps: { en: "For Representatives", ne: "सांसदहरूका लागि" },
  nav_involved: { en: "Get Involved", ne: "सहभागी बन्नुहोस्" },
  nav_contact: { en: "Contact", ne: "सम्पर्क" },
  nav_wall: { en: "Wall", ne: "वाल" },
  nav_signin: { en: "Sign in", ne: "साइन इन" },
  nav_account: { en: "Account", ne: "खाता" },
  nav_admin: { en: "Admin", ne: "एडमिन" },
  nav_signout: { en: "Sign out", ne: "साइन आउट" },
  cta_request: { en: "Request a Call", ne: "कल अनुरोध गर्नुहोस्" },
  cta_request_arrow: { en: "Request a Call with Your MP →", ne: "आफ्नो सांसदसँग कल अनुरोध गर्नुहोस् →" },
  brand_tag: { en: "Independent · Non-partisan", ne: "स्वतन्त्र · गैरदलीय" },
  lang_switch_label: { en: "नेपाली", ne: "English" },
  lang_switch_aria: { en: "Switch to Nepali", ne: "Switch to English" },

  // Footer
  footer_desc: {
    en: "An independent, non-partisan civic nonprofit connecting Nepali citizens with their elected representatives.",
    ne: "नेपाली नागरिकहरूलाई आफ्ना निर्वाचित प्रतिनिधिहरूसँग जोड्ने स्वतन्त्र, गैरदलीय नागरिक गैरनाफामुखी संस्था।",
  },
  footer_reg: { en: "Nonprofit registration: pending", ne: "गैरनाफामुखी दर्ता: प्रक्रियामा" },
  footer_explore: { en: "Explore", ne: "अन्वेषण गर्नुहोस्" },
  footer_join: { en: "Join Us", ne: "हामीसँग जोडिनुहोस्" },
  footer_contact: { en: "Contact", ne: "सम्पर्क" },
  footer_location: { en: "Kathmandu, Nepal", ne: "काठमाडौँ, नेपाल" },
  footer_rights: {
    en: "All rights reserved.",
    ne: "सर्वाधिकार सुरक्षित।",
  },
  footer_disclaimer: {
    en: "Independent · Non-partisan · Not affiliated with any political party or the Government of Nepal.",
    ne: "स्वतन्त्र · गैरदलीय · कुनै पनि राजनीतिक दल वा नेपाल सरकारसँग सम्बद्ध छैन।",
  },
  skip: { en: "Skip to content", ne: "मुख्य सामग्रीमा जानुहोस्" },

  // Home
  home_hero_title: { en: "Your voice, delivered to your representative.", ne: "तपाईंको आवाज, तपाईंकै प्रतिनिधिसम्म।" },
  home_hero_lead: {
    en: "MPs sit in Kathmandu. You live in your constituency. We bridge that distance with organized video calls between citizens and their MPs.",
    ne: "सांसदहरू काठमाडौँमा हुन्छन्, तपाईं आफ्नै निर्वाचन क्षेत्रमा। हामी नागरिक र सांसदबीच व्यवस्थित भिडियो कलमार्फत त्यो दूरी कम गर्छौं।",
  },
  home_hero_meta: {
    en: "Free · Independent · Non-partisan · English & नेपाली",
    ne: "निःशुल्क · स्वतन्त्र · गैरदलीय · English र नेपाली",
  },
  home_how_eyebrow: { en: "The process", ne: "प्रक्रिया" },
  home_how_title: { en: "Three simple steps.", ne: "तीन सरल चरण।" },
  home_step1_t: { en: "Submit your request", ne: "अनुरोध पेस गर्नुहोस्" },
  home_step1_d: { en: "Tell us who you are, your constituency, and the question or idea you want to raise.", ne: "आफ्नो नाम, निर्वाचन क्षेत्र र उठाउन चाहेको प्रश्न वा विचार लेख्नुहोस्।" },
  home_step2_t: { en: "We group by constituency", ne: "क्षेत्रअनुसार समूहबद्ध" },
  home_step2_d: { en: "Submissions are organized so your MP hears from many constituents at once — not scattered messages.", ne: "अनुरोधहरूलाई एकीकृत गरी सांसदले धेरै मतदाताको आवाज एकैसाथ सुन्न पाउनुहुन्छ।" },
  home_step3_t: { en: "We arrange the call", ne: "कल आयोजना" },
  home_step3_d: { en: "A shared video call is scheduled with your MP. Can't attend live? We'll relay your idea for you.", ne: "सांसदसँग साझा भिडियो कल तय हुन्छ। लाइभ सहभागी हुन नसक्नुभए हामी तपाईंको विचार पुर्‍याइदिन्छौँ।" },
  home_why_eyebrow: { en: "Why MPConnectNepal exists", ne: "किन MPConnectNepal?" },
  home_why_title: { en: "A gap between citizens and the people who represent them.", ne: "नागरिक र प्रतिनिधिबीचको खाडल पुर्ने प्रयास।" },
  home_why_p1: { en: "MPs want to hear from the people they serve, but with hundreds of thousands of constituents each, there is no reliable filter for whose voice reaches them.", ne: "सांसदहरू आफ्नो क्षेत्रका जनताको आवाज सुन्न चाहन्छन्, तर लाखौँ मतदाताको भीडमा कसको आवाज पुग्ने भन्ने भरपर्दो प्रणाली छैन।" },
  home_why_p2: { en: "Engaged citizens with real ideas rarely get through. Democracy suffers when the two sides cannot reliably talk to each other.", ne: "असल विचार भएका नागरिकको आवाज विरलै पुग्छ। दुई पक्षबीच भरपर्दो संवाद नहुँदा लोकतन्त्र कमजोर हुन्छ।" },
  home_why_p3: { en: "MPConnectNepal fills that gap — screening and organizing citizen requests, then arranging video calls free of cost.", ne: "MPConnectNepal यही खाडल पुर्छ — नागरिकका अनुरोधलाई छानेर मिलाउँछ र निःशुल्क भिडियो कल आयोजना गर्छ।" },
  home_disclaimer: {
    en: "MPConnectNepal is an independent, non-partisan civic nonprofit. We are not affiliated with, endorsed by, or funded by any political party or the Government of Nepal.",
    ne: "MPConnectNepal एक स्वतन्त्र, गैरदलीय नागरिक गैरनाफामुखी संस्था हो। हामी कुनै राजनीतिक दल वा नेपाल सरकारसँग सम्बद्ध छैनौँ।",
  },
  home_ready: { en: "Ready to be heard?", ne: "आवाज उठाउन तयार हुनुहुन्छ?" },
  home_ready_sub: { en: "Requesting a call takes about two minutes. There is no cost.", ne: "कल अनुरोध गर्न झन्डै दुई मिनेट लाग्छ। कुनै शुल्क छैन।" },
  hero_image_alt: { en: "A citizen speaking with their representative on a video call.", ne: "भिडियो कलमार्फत आफ्नो प्रतिनिधिसँग कुरा गर्दै एक नागरिक।" },
  how_link: { en: "How it works", ne: "कसरी काम गर्छ" },

  // How it works
  how_eyebrow: { en: "The process", ne: "प्रक्रिया" },
  how_title: { en: "How MPConnectNepal works.", ne: "MPConnectNepal कसरी काम गर्छ।" },
  how_lead: { en: "From the moment you submit a request to the moment you speak with your MP — here's exactly what happens.", ne: "तपाईंले अनुरोध पेस गरेदेखि सांसदसँग कुरा गर्ने क्षणसम्म — यसरी काम हुन्छ।" },
  how_s1_t: { en: "You submit a request", ne: "तपाईं अनुरोध पेस गर्नुहुन्छ" },
  how_s1_d: { en: "Fill out a short form with your name, contact, constituency, and the topic you want to raise.", ne: "छोटो फारममा आफ्नो नाम, सम्पर्क, निर्वाचन क्षेत्र र विषय लेख्नुहोस्।" },
  how_s2_t: { en: "We review and group by constituency", ne: "हामी क्षेत्रअनुसार समूहबद्ध गर्छौँ" },
  how_s2_d: { en: "Our team reads every submission and organizes people by constituency, so your MP hears a clear signal.", ne: "हाम्रो टोलीले प्रत्येक अनुरोध पढ्छ र क्षेत्रअनुसार मिलाउँछ, ताकि सांसदले स्पष्ट सन्देश सुन्न पाउनुहोस्।" },
  how_s3_t: { en: "We reach out to your MP's office", ne: "सांसदको कार्यालयसँग सम्पर्क" },
  how_s3_d: { en: "Once we have enough interest, we formally request time with the MP on your behalf.", ne: "पर्याप्त चासो जुटेपछि हामी तपाईंको तर्फबाट औपचारिक रूपमा सांसदसँग समय माग्छौँ।" },
  how_s4_t: { en: "A shared video call is scheduled", ne: "साझा भिडियो कल तय" },
  how_s4_d: { en: "We host the call on Google Meet with the MP, participating citizens, and an MPConnectNepal moderator.", ne: "गुगल मिटमा सांसद, सहभागी नागरिक र MPConnectNepal समन्वयकसहित कल हुन्छ।" },
  how_s5_t: { en: "Can't attend? We relay for you", ne: "उपस्थित हुन नसके हामी सम्प्रेषण गर्छौँ" },
  how_s5_d: { en: "If a live call doesn't work for you, we'll present your idea to the MP and share the response back.", ne: "लाइभ नमिले हामी तपाईंको विचार सांसदसामु राखिदिन्छौँ र जवाफ फिर्ता दिन्छौँ।" },
  how_faq: { en: "Frequently asked questions", ne: "बारम्बार सोधिने प्रश्नहरू" },
  how_ready: { en: "Ready to submit your request?", ne: "अनुरोध पेस गर्न तयार हुनुहुन्छ?" },
  faq_q1: { en: "Is this free?", ne: "यो निःशुल्क हो?" },
  faq_a1: { en: "Yes. MPConnectNepal is a nonprofit initiative. Citizens are never charged.", ne: "हो। MPConnectNepal गैरनाफामुखी अभियान हो। नागरिकबाट कुनै शुल्क लिइँदैन।" },
  faq_q2: { en: "Will my MP definitely respond?", ne: "मेरो सांसदले पक्कै जवाफ दिनुहुन्छ?" },
  faq_a2: { en: "We can't guarantee a response from every MP — participation is at their discretion. What we do guarantee is that your request is organized and delivered to the right office.", ne: "हरेक सांसदको जवाफको ग्यारेन्टी दिन सक्दैनौँ — सहभागिता उहाँकै विवेकमा हुन्छ। तर तपाईंको अनुरोध व्यवस्थित रूपमा सही ठाउँमा पुग्ने ग्यारेन्टी हामी दिन्छौँ।" },
  faq_q3: { en: "How long does it take?", ne: "यसमा कति समय लाग्छ?" },
  faq_a3: { en: "It depends on your constituency and your MP's availability. We'll keep you updated at every stage.", ne: "यो क्षेत्र र सांसदको समयमा निर्भर हुन्छ। हामी हरेक चरणमा जानकारी गराइरहन्छौँ।" },
  faq_q4: { en: "Is my information kept private?", ne: "मेरो जानकारी गोप्य रहन्छ?" },
  faq_a4: { en: "Yes. Details are shared only with your MP's office to arrange the call.", ne: "हो। कल मिलाउनका लागि मात्र सांसद कार्यालयसँग विवरण साझा गरिन्छ।" },
  faq_q5: { en: "Who is behind MPConnectNepal?", ne: "MPConnectNepal पछाडि को छन्?" },
  faq_a5: { en: "An independent, non-partisan team of Nepali citizens who believe democracy works better when representatives can actually hear the people.", ne: "प्रतिनिधिले जनताको आवाज साँच्चै सुन्न पाए लोकतन्त्र सुदृढ हुन्छ भन्ने विश्वास राख्ने स्वतन्त्र, गैरदलीय नेपाली नागरिकको टोली।" },

  // About
  about_eyebrow: { en: "Our mission", ne: "हाम्रो अभियान" },
  about_title: { en: "Democracy works better when the two sides can talk.", ne: "जब दुवै पक्ष कुरा गर्न पाउँछन्, लोकतन्त्र राम्रो हुन्छ।" },
  about_lead: { en: "MPConnectNepal was started to fix a small, stubborn problem: engaged citizens rarely get through to the people who represent them, and MPs rarely have a reliable way to hear from constituents.", ne: "MPConnectNepal एउटा सानो तर जिद्दी समस्या समाधान गर्न सुरु भएको हो — नागरिकको आवाज सांसदसम्म कम मात्र पुग्छ, र सांसदले पनि नागरिकको आवाज सुन्ने भरपर्दो माध्यम पाउँदैनन्।" },
  about_story_eyebrow: { en: "Founding story", ne: "स्थापनाको कथा" },
  about_story_title: { en: "Why we started this.", ne: "किन सुरु गर्‍यौँ।" },
  about_story_p1: { en: "After watching people in our own constituencies try — and fail — to get five minutes with their MP over real local issues, we realised the problem wasn't lack of interest. It was logistics and the absence of a professional channel.", ne: "हाम्रै क्षेत्रका मानिसहरूले सांसदसँग पाँच मिनेट पनि नपाएको देखेपछि हामीले महसुस गर्‍यौँ — समस्या रुचिको होइन, व्यवस्थापनको हो।" },
  about_story_p2: { en: "MPConnectNepal is our attempt to fix that permanently, one constituency at a time, until every Nepali has a reliable path to their representative.", ne: "MPConnectNepal यसैलाई स्थायी रूपमा सुधार्ने प्रयास हो — एक क्षेत्रबाट सुरु गरी सम्पूर्ण नेपालसम्म पुर्‍याउने।" },
  about_vision_eyebrow: { en: "Our vision", ne: "हाम्रो सोच" },
  about_vision_title: { en: "Nationwide, across every constituency.", ne: "देशभरका हरेक निर्वाचन क्षेत्रमा।" },
  about_vision_p1: { en: "Start in a handful of constituencies. Prove the model with real, respectful calls that produce real outcomes. Then expand across all 165 electoral constituencies of Nepal.", ne: "केही क्षेत्रबाट सुरु गरौँ। इमानदार र मर्यादित कलमार्फत मोडेल प्रमाणित गरौँ। त्यसपछि नेपालका सम्पूर्ण १६५ निर्वाचन क्षेत्रसम्म पुगौँ।" },
  about_vision_p2: { en: "Long term: any citizen in any district should be able to request a call with their MP and trust that it will happen.", ne: "दीर्घकालीन लक्ष्य: कुनै पनि जिल्लाको कुनै पनि नागरिकले आफ्नो सांसदसँग कल अनुरोध गर्न सकून् र त्यो निश्चित रूपमा हुन्छ भन्ने विश्वास राख्न सकून्।" },
  about_team_eyebrow: { en: "Meet the team", ne: "हाम्रो टोली" },
  about_team_title: { en: "The people behind it.", ne: "अभियानका अनुहारहरू।" },
  about_founder_role: { en: "Founder", ne: "संस्थापक" },
  about_associate_role: { en: "Program Associate", ne: "कार्यक्रम सहयोगी" },
  about_bio_p1: {
    en: "\"I've often seen our country's representatives asking their own citizens for the problems and solutions they should raise in parliament. But the people who end up talking to them are often random, and the conversations aren't professional or productive. At the same time, many bright, thoughtful people who genuinely want to talk to their representatives never get the chance. The core issue was clear: there was no channel to bring together the people of a specific constituency and give them a well-organized conversation with their representative.\"",
    ne: "\"हाम्रा प्रतिनिधिहरूले संसदमा उठाउनुपर्ने समस्या र समाधान नागरिकसँगै सोधिरहेको मैले धेरै पटक देखेको छु। तर तिनीहरूसँग कुरा गर्ने मानिसहरू प्रायः जुनसुकै हुन्छन् र संवाद व्यावसायिक हुँदैन। अर्कातिर, आफ्ना प्रतिनिधिसँग साँच्चै कुरा गर्न चाहने धेरै विवेकी नागरिकले कहिल्यै मौका पाउँदैनन्। मूल समस्या स्पष्ट थियो — कुनै एक क्षेत्रका मानिसलाई प्रतिनिधिसँग व्यवस्थित संवादमा जोड्ने कुनै माध्यम थिएन।\"",
  },
  about_bio_p2: {
    en: "\"At MPConnectNepal, we're committed to making that process more professional — helping people communicate more clearly and thoughtfully so they walk away feeling genuinely heard. At the same time, we save our MPs' time by filtering out unproductive calls. While MPs are in Kathmandu for extended periods, they get to hear the real problems and real solutions worth raising in parliament.\"",
    ne: "\"MPConnectNepal मार्फत हामी यो प्रक्रियालाई थप व्यावसायिक बनाउन प्रतिबद्ध छौँ — मानिसहरूलाई आफ्नो कुरा स्पष्ट र विचारशील ढंगले राख्न सिकाएर, ताकि उनीहरू साँच्चै सुनिएको महसुस गरून्। साथै अनुत्पादक कलहरू छानिदिएर सांसदको समय जोगाउँछौँ। सांसदहरू लामो समय काठमाडौँमै रहँदा उनीहरूले संसदमा उठाउन योग्य वास्तविक समस्या र समाधान सुन्न पाउनुहुन्छ।\"",
  },
  about_join_title: { en: "Join us", ne: "हामीसँग जोडिनुहोस्" },
  about_join_desc: { en: "We're actively looking for people who care.", ne: "साँच्चै मन पराउने मानिसहरूको खोजीमा छौँ।" },
  about_join_cta: { en: "Join Us", ne: "जोडिनुहोस्" },
  about_vol_team: { en: "Volunteer team", ne: "स्वयंसेवक टोली" },
  about_vol_desc: { en: "Constituency coordinators across Nepal.", ne: "नेपालभरका क्षेत्रगत समन्वयकहरू।" },
  about_commit_eyebrow: { en: "Our commitment", ne: "हाम्रो प्रतिबद्धता" },
  about_commit_title: { en: "Non-partisan. Independent. Always.", ne: "गैरदलीय। स्वतन्त्र। सधैँ।" },
  about_commit_p: { en: "MPConnectNepal does not endorse candidates, parties, or ideologies. We do not accept funding that would compromise our independence. We serve every Nepali citizen — regardless of who they voted for.", ne: "MPConnectNepal ले कुनै उम्मेदवार, दल वा विचारधारालाई समर्थन गर्दैन। स्वतन्त्रता जोखिममा पार्ने कुनै पनि सहयोग स्वीकार्दैनौँ। हामी हरेक नेपाली नागरिकको सेवामा छौँ।" },

  // For Representatives
  reps_eyebrow: { en: "For MPs & Staff", ne: "सांसद र कर्मचारीका लागि" },
  reps_title: { en: "Hear from your constituents — without the noise.", ne: "आफ्ना मतदाताको आवाज — हल्लाबाजीविना।" },
  reps_lead: { en: "MPConnectNepal filters, groups, and organizes citizen requests by constituency so your time on the call goes to real, substantive input.", ne: "MPConnectNepal ले नागरिकका अनुरोध क्षेत्रअनुसार छानेर मिलाउँछ, ताकि तपाईंको समय वास्तविक र सारगर्भित संवादमा लागोस्।" },
  reps_b1_t: { en: "Pre-screened requests", ne: "पूर्व-जाँच गरिएका अनुरोध" },
  reps_b1_d: { en: "Every submission is reviewed. Duplicates, spam, and off-topic messages don't reach you.", ne: "हरेक अनुरोध जाँचिन्छ। दोहोरो, स्प्याम र विषयबाहिरका सन्देश तपाईंसम्म पुग्दैनन्।" },
  reps_b2_t: { en: "Grouped by constituency", ne: "क्षेत्रअनुसार समूहबद्ध" },
  reps_b2_d: { en: "You hear from many of your own constituents at once, in one organized session.", ne: "एउटै व्यवस्थित सत्रमा आफ्ना धेरै मतदाताको आवाज सुन्न पाउनुहुन्छ।" },
  reps_b3_t: { en: "Logistics fully handled", ne: "व्यवस्थापन हाम्रो जिम्मा" },
  reps_b3_d: { en: "We schedule, host on Google Meet, moderate, and share notes afterwards.", ne: "हामी समय तय गर्छौँ, गुगल मिटमा आयोजना गर्छौँ, सञ्चालन गर्छौँ र नोट पनि साझा गर्छौँ।" },
  reps_partner_title: { en: "Partner with us", ne: "हामीसँग साझेदारी गर्नुहोस्" },
  reps_partner_lead: { en: "If you're an MP or a member of an MP's office, fill out the short form below and we'll discuss a pilot session.", ne: "तपाईं सांसद वा सांसद कार्यालयको सदस्य हुनुहुन्छ भने तलको छोटो फारम भर्नुहोस्, हामी परीक्षण सत्रबारे कुरा गर्नेछौँ।" },
  reps_form_name: { en: "Name", ne: "नाम" },
  reps_form_role: { en: "Role / Office", ne: "पद / कार्यालय" },
  reps_form_role_ph: { en: "e.g. Chief of Staff, MP Office", ne: "जस्तै: प्रमुख सचिव, सांसद कार्यालय" },
  reps_form_constituency: { en: "Constituency", ne: "निर्वाचन क्षेत्र" },
  reps_form_email: { en: "Email", ne: "इमेल" },
  reps_form_message: { en: "Message", ne: "सन्देश" },
  reps_form_submit: { en: "Send inquiry", ne: "अनुरोध पठाउनुहोस्" },
  reps_form_submitting: { en: "Sending…", ne: "पठाउँदै…" },
  reps_form_done: { en: "Thank you.", ne: "धन्यवाद।" },
  reps_form_done_msg: { en: "We've received your inquiry and will be in touch soon.", ne: "तपाईंको अनुरोध प्राप्त भयो, चाँडै सम्पर्क गर्नेछौँ।" },
  reps_form_or_email: { en: "Or email us directly at", ne: "वा सिधै इमेल गर्नुहोस्:" },

  // Get involved
  gi_eyebrow: { en: "Volunteer", ne: "स्वयंसेवा" },
  gi_title: { en: "Help us reach every constituency.", ne: "हरेक निर्वाचन क्षेत्रसम्म पुग्न सघाउनुहोस्।" },
  gi_lead: { en: "MPConnectNepal grows one volunteer at a time. Whether you have an hour a week or a day, there's a role for you.", ne: "MPConnectNepal एक-एक स्वयंसेवकको सहयोगमा बढ्छ। हप्तामा एक घन्टा भए पनि, दिनभर भए पनि — तपाईंका लागि भूमिका छ।" },
  gi_r1_t: { en: "Review submissions", ne: "अनुरोधहरू समीक्षा गर्नुहोस्" },
  gi_r1_d: { en: "Read incoming citizen requests, tag them by constituency and topic, and help group them for MP outreach.", ne: "आउने अनुरोध पढ्ने, क्षेत्र र विषयअनुसार वर्गीकरण गर्ने र सांसद सम्पर्कका लागि तयार पार्ने काम।" },
  gi_r2_t: { en: "Coordinate outreach", ne: "समन्वय गर्नुहोस्" },
  gi_r2_d: { en: "Help contact MP offices, schedule calls, and moderate video sessions.", ne: "सांसद कार्यालयसँग सम्पर्क, कल तालिका र भिडियो सत्र सञ्चालनमा सहयोग।" },
  gi_r3_t: { en: "Expand to your district", ne: "आफ्नो जिल्लामा विस्तार" },
  gi_r3_d: { en: "Become the constituency lead for your area — build local trust and be the face of MPConnectNepal on the ground.", ne: "आफ्नो क्षेत्रको संयोजक बन्नुहोस् — स्थानीय भरोसा निर्माण गर्दै जमिनी अनुहार बन्नुहोस्।" },
  gi_form_title: { en: "Sign up to volunteer", ne: "स्वयंसेवाका लागि दर्ता गर्नुहोस्" },
  gi_form_lead: { en: "Tell us a little about yourself and how you'd like to help. We'll be in touch within a week.", ne: "आफ्नो बारेमा र कसरी सहयोग गर्न चाहनुहुन्छ लेख्नुहोस्। हामी एक हप्ताभित्र सम्पर्कमा आउनेछौँ।" },
  gi_form_name: { en: "Full name", ne: "पूरा नाम" },
  gi_form_email: { en: "Email", ne: "इमेल" },
  gi_form_constituency: { en: "Constituency (or district)", ne: "निर्वाचन क्षेत्र (वा जिल्ला)" },
  gi_form_role: { en: "How would you like to help?", ne: "कसरी सहयोग गर्न चाहनुहुन्छ?" },
  gi_form_choose: { en: "Choose one…", ne: "एउटा छान्नुहोस्…" },
  gi_role_1: { en: "Review submissions", ne: "अनुरोधहरू समीक्षा" },
  gi_role_2: { en: "Coordinate outreach", ne: "समन्वय गर्ने" },
  gi_role_3: { en: "Become a constituency lead", ne: "क्षेत्र संयोजक बन्ने" },
  gi_role_4: { en: "Other / open to anything", ne: "अन्य / जुनसुकै" },
  gi_form_notes: { en: "Anything else? (optional)", ne: "अरू केही? (वैकल्पिक)" },
  gi_form_submit: { en: "Submit", ne: "पेस गर्नुहोस्" },
  gi_form_submitting: { en: "Submitting…", ne: "पठाउँदै…" },
  gi_form_done_title: { en: "धन्यवाद — Thank you!", ne: "धन्यवाद!" },
  gi_form_done_msg: { en: "Your response has been noted. We'll reach out soon.", ne: "तपाईंको जवाफ प्राप्त भयो। हामी चाँडै सम्पर्कमा आउनेछौँ।" },
  gi_privacy: { en: "We use your details only to coordinate with you as a volunteer.", ne: "तपाईंका विवरण स्वयंसेवा समन्वयका लागि मात्र प्रयोग हुन्छन्।" },

  // Contact
  contact_eyebrow: { en: "Contact", ne: "सम्पर्क" },
  contact_title: { en: "Get in touch.", ne: "सम्पर्कमा रहनुहोस्।" },
  contact_lead: { en: "Questions, ideas, or want to partner with us? Reach out — we read every message.", ne: "प्रश्न, विचार वा साझेदारीका लागि लेख्नुहोस् — हामी हरेक सन्देश पढ्छौँ।" },
  contact_general: { en: "General", ne: "सामान्य" },
  contact_general_d: { en: "Citizens, questions, or anything else.", ne: "नागरिक, प्रश्न वा अन्य कुरा।" },
  contact_mp: { en: "MP offices", ne: "सांसद कार्यालय" },
  contact_mp_d: { en: "Partnership and pilot session inquiries.", ne: "साझेदारी र परीक्षण सत्रका लागि।" },
  contact_media: { en: "Media", ne: "सञ्चार" },
  contact_media_d: { en: "Interviews, coverage, and press inquiries.", ne: "अन्तर्वार्ता, समाचार र प्रेस सम्बन्धित।" },
  contact_commit_title: { en: "Our commitments to you", ne: "तपाईंप्रति हाम्रा प्रतिबद्धता" },
  contact_commit_1: { en: "We reply to every message within 5 working days.", ne: "५ कार्यदिनभित्र हरेक सन्देशको जवाफ दिन्छौँ।" },
  contact_commit_2: { en: "We never share your contact details with third parties.", ne: "तपाईंका सम्पर्क विवरण कहिल्यै अन्य पक्षसँग साझा गर्दैनौँ।" },
  contact_commit_3: { en: "Independent, non-partisan — not affiliated with any political party or the Government of Nepal.", ne: "स्वतन्त्र र गैरदलीय — कुनै दल वा नेपाल सरकारसँग सम्बद्ध छैन।" },

  // Request a call
  rc_eyebrow: { en: "Request a call", ne: "कल अनुरोध" },
  rc_title: { en: "Request a Call with Your MP.", ne: "आफ्नो सांसदसँग कल अनुरोध गर्नुहोस्।" },
  rc_lead: { en: "Fill out the form below. Our team will review your submission and coordinate an organized video call with your representative.", ne: "तलको फारम भर्नुहोस्। हाम्रो टोलीले तपाईंको अनुरोध समीक्षा गरी सांसदसँग व्यवस्थित भिडियो कल मिलाउनेछ।" },
  rc_fullname: { en: "Full Name", ne: "पूरा नाम" },
  rc_address: { en: "Complete Address", ne: "पूरा ठेगाना" },
  rc_address_hint: { en: "This helps us confirm your constituency.", ne: "यसले तपाईंको निर्वाचन क्षेत्र पुष्टि गर्न सघाउँछ।" },
  rc_mp: { en: "MP You Want to Talk With", ne: "कुन सांसदसँग कुरा गर्न चाहनुहुन्छ" },
  rc_mp_missing: { en: "Please select the MP you want to talk with.", ne: "कृपया सांसद चयन गर्नुहोस्।" },
  rc_question: { en: "Your Question or Idea", ne: "तपाईंको प्रश्न वा विचार" },
  rc_question_hint: { en: "Briefly describe the problem or solution you'd like to discuss.", ne: "छोटकरीमा समस्या वा समाधान वर्णन गर्नुहोस्।" },
  rc_email: { en: "Email Address", ne: "इमेल ठेगाना" },
  rc_phone: { en: "Phone Number", ne: "फोन नम्बर" },
  rc_besttime: { en: "Best Time to Reach You", ne: "सम्पर्कका लागि उत्तम समय" },
  rc_besttime_choose: { en: "Choose one…", ne: "एउटा छान्नुहोस्…" },
  rc_time_morning: { en: "Morning", ne: "बिहान" },
  rc_time_afternoon: { en: "Afternoon", ne: "दिउँसो" },
  rc_time_evening: { en: "Evening", ne: "साँझ" },
  rc_besttime_note: { en: "Best Way to Reach You (note)", ne: "सम्पर्क तरिका (टिप्पणी)" },
  rc_besttime_note_ph: { en: "e.g. Call on WhatsApp after 5pm", ne: "जस्तै: बेलुका ५ पछि WhatsApp मा" },
  rc_submit: { en: "Submit request", ne: "अनुरोध पेस गर्नुहोस्" },
  rc_submitting: { en: "Submitting…", ne: "पठाउँदै…" },
  rc_done_title: { en: "Thank you.", ne: "धन्यवाद।" },
  rc_done_msg: { en: "We've received your request and will be in touch as we coordinate with your representative.", ne: "तपाईंको अनुरोध प्राप्त भयो। सांसदसँग समन्वय गर्दै हामी सम्पर्कमा आउनेछौँ।" },
  rc_privacy: { en: "Your information is used only to arrange your call and will not be shared publicly or with any third party.", ne: "तपाईंको जानकारी कल मिलाउन मात्र प्रयोग हुन्छ र सार्वजनिक वा अन्य पक्षसँग साझा गरिँदैन।" },
  rc_error_generic: { en: "Sorry — we couldn't submit your request just now. Please try again in a moment.", ne: "माफ गर्नुहोस् — अहिले पठाउन सकिएन। केही समयपछि पुनः प्रयास गर्नुहोस्।" },
  required_star: { en: "required", ne: "आवश्यक" },
} as const;
