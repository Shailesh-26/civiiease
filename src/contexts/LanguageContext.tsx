import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'kn' | 'ml' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    help: 'Help',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    hero_title: 'Empowering Citizens with Easy Access to Every Government Service',
    hero_subtitle: 'Navigate all Indian government services from one unified platform',
    explore_services: 'Explore Services',
    talk_to_ai: 'Talk to CivicEase AI',
    search_placeholder: 'Search any government service...',
    learn_more: 'Learn More',
    apply_now: 'Apply Now',
    apply_passport: 'Apply for Passport',
    update_aadhaar: 'Update Aadhaar',
    pan_status: 'PAN Card Status',
    dl_renewal: 'Driving License Renewal',
    action_initiated: 'Action Initiated',
    process_started: 'process started',
    auth_required: 'Authentication Required',
    please_sign_in: 'Please sign in to access this service',
    footer_cta_title: 'Ready to Simplify Your Civic Journey?',
    footer_cta_subtitle: 'Join thousands of citizens who trust CivicEase for hassle-free government service navigation.',
    create_account: 'Create Account',
    copyright: '© 2025 CivicEase. Making government services accessible to all citizens.',
    chatbot_intro: 'Namaste! I\'m CivicEase AI. How can I help you with government services today?',
    chatbot_placeholder: 'Ask about Passport, Aadhaar, PAN Card...',
    send: 'Send',
    aadhaar: 'Aadhaar Card',
    passport: 'Passport',
    pan: 'PAN Card',
    voter_id: 'Voter ID',
    driving_license: 'Driving License',
  },
  hi: {
    home: 'होम',
    services: 'सेवाएं',
    about: 'के बारे में',
    contact: 'संपर्क करें',
    help: 'सहायता',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    hero_title: 'हर सरकारी सेवा तक आसान पहुंच के साथ नागरिकों को सशक्त बनाना',
    hero_subtitle: 'एक एकीकृत मंच से सभी भारतीय सरकारी सेवाओं को नेविगेट करें',
    explore_services: 'सेवाओं का अन्वेषण करें',
    talk_to_ai: 'CivicEase AI से बात करें',
    search_placeholder: 'कोई भी सरकारी सेवा खोजें...',
    learn_more: 'और जानें',
    apply_now: 'अभी आवेदन करें',
    apply_passport: 'पासपोर्ट के लिए आवेदन करें',
    update_aadhaar: 'आधार अपडेट करें',
    pan_status: 'पैन कार्ड स्थिति',
    dl_renewal: 'ड्राइविंग लाइसेंस नवीनीकरण',
    action_initiated: 'कार्रवाई शुरू की गई',
    process_started: 'प्रक्रिया शुरू हुई',
    auth_required: 'प्रमाणीकरण आवश्यक',
    please_sign_in: 'इस सेवा तक पहुँचने के लिए कृपया साइन इन करें',
    footer_cta_title: 'अपनी नागरिक यात्रा को सरल बनाने के लिए तैयार हैं?',
    footer_cta_subtitle: 'हजारों नागरिकों के साथ जुड़ें जो परेशानी मुक्त सरकारी सेवा नेविगेशन के लिए CivicEase पर भरोसा करते हैं।',
    create_account: 'खाता बनाएं',
    copyright: '© 2025 CivicEase। सभी नागरिकों के लिए सरकारी सेवाओं को सुलभ बनाना।',
    chatbot_intro: 'नमस्ते! मैं CivicEase AI हूं। आज मैं सरकारी सेवाओं में आपकी कैसे मदद कर सकता हूं?',
    chatbot_placeholder: 'पासपोर्ट, आधार, पैन कार्ड के बारे में पूछें...',
    send: 'भेजें',
    aadhaar: 'आधार कार्ड',
    passport: 'पासपोर्ट',
    pan: 'पैन कार्ड',
    voter_id: 'वोटर आईडी',
    driving_license: 'ड्राइविंग लाइसेंस',
  },
  ta: {
    home: 'முகப்பு',
    services: 'சேவைகள்',
    about: 'பற்றி',
    contact: 'தொடர்பு',
    help: 'உதவி',
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    hero_title: 'ஒவ்வொரு அரசு சேவைக்கும் எளிதான அணுகலுடன் குடிமக்களை வலுப்படுத்துதல்',
    hero_subtitle: 'ஒரே ஒருங்கிணைந்த தளத்தில் இருந்து அனைத்து இந்திய அரசு சேவைகளையும் வழிநடத்துங்கள்',
    explore_services: 'சேவைகளை ஆராயுங்கள்',
    talk_to_ai: 'CivicEase AI உடன் பேசுங்கள்',
    search_placeholder: 'எந்த அரசு சேவையையும் தேடுங்கள்...',
    learn_more: 'மேலும் அறிக',
    apply_now: 'இப்போது விண்ணப்பிக்கவும்',
    apply_passport: 'பாஸ்போர்ட்டுக்கு விண்ணப்பிக்கவும்',
    update_aadhaar: 'ஆதாரை புதுப்பிக்கவும்',
    pan_status: 'பான் கார்டு நிலை',
    dl_renewal: 'ஓட்டுநர் உரிம புதுப்பித்தல்',
    action_initiated: 'செயல் தொடங்கப்பட்டது',
    process_started: 'செயல்முறை தொடங்கப்பட்டது',
    auth_required: 'அங்கீகாரம் தேவை',
    please_sign_in: 'இந்த சேவையை அணுக உள்நுழைக',
    footer_cta_title: 'உங்கள் குடிமக்கள் பயணத்தை எளிதாக்க தயாரா?',
    footer_cta_subtitle: 'தொந்தரவு இல்லாத அரசு சேவை வழிசெலுத்தலுக்கு CivicEase ஐ நம்பும் ஆயிரக்கணக்கான குடிமக்களுடன் சேருங்கள்.',
    create_account: 'கணக்கை உருவாக்கவும்',
    copyright: '© 2025 CivicEase. அனைத்து குடிமக்களுக்கும் அரசு சேவைகளை அணுகக்கூடியதாக்குதல்.',
    chatbot_intro: 'வணக்கம்! நான் CivicEase AI. இன்று அரசு சேவைகளில் நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    chatbot_placeholder: 'பாஸ்போர்ட், ஆதார், பான் கார்டு பற்றி கேளுங்கள்...',
    send: 'அனுப்பு',
    aadhaar: 'ஆதார் அட்டை',
    passport: 'பாஸ்போர்ட்',
    pan: 'பான் கார்டு',
    voter_id: 'வாக்காளர் அடையாள அட்டை',
    driving_license: 'ஓட்டுநர் உரிமம்',
  },
  te: {
    home: 'హోమ్',
    services: 'సేవలు',
    about: 'గురించి',
    contact: 'సంప్రదించండి',
    help: 'సహాయం',
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    hero_title: 'ప్రతి ప్రభుత్వ సేవకు సులభ ప్రాప్యతతో పౌరులను శక్తివంతం చేయడం',
    hero_subtitle: 'ఒకే ఏకీకృత వేదిక నుండి అన్ని భారతీయ ప్రభుత్వ సేవలను నావిగేట్ చేయండి',
    explore_services: 'సేవలను అన్వేషించండి',
    talk_to_ai: 'CivicEase AI తో మాట్లాడండి',
    search_placeholder: 'ఏదైనా ప్రభుత్వ సేవను వెతకండి...',
    learn_more: 'మరింత తెలుసుకోండి',
    apply_now: 'ఇప్పుడే దరఖాస్తు చేయండి',
    apply_passport: 'పాస్‌పోర్ట్ కోసం దరఖాస్తు చేయండి',
    update_aadhaar: 'ఆధార్ నవీకరించండి',
    pan_status: 'పాన్ కార్డ్ స్థితి',
    dl_renewal: 'డ్రైవింగ్ లైసెన్స్ పునరుద్ధరణ',
    action_initiated: 'చర్య ప్రారంభించబడింది',
    process_started: 'ప్రక్రియ ప్రారంభమైంది',
    auth_required: 'ప్రమాణీకరణ అవసరం',
    please_sign_in: 'ఈ సేవను యాక్సెస్ చేయడానికి దయచేసి సైన్ ఇన్ చేయండి',
    footer_cta_title: 'మీ పౌర ప్రయాణాన్ని సులభతరం చేయడానికి సిద్ధంగా ఉన్నారా?',
    footer_cta_subtitle: 'ఇబ్బంది లేని ప్రభుత్వ సేవా నావిగేషన్ కోసం CivicEase ను విశ్వసించే వేలాది పౌరులతో చేరండి.',
    create_account: 'ఖాతాను సృష్టించండి',
    copyright: '© 2025 CivicEase. అన్ని పౌరులకు ప్రభుత్వ సేవలను అందుబాటులో ఉంచడం.',
    chatbot_intro: 'నమస్కారం! నేను CivicEase AI. నేను ఈ రోజు ప్రభుత్వ సేవలతో మీకు ఎలా సహాయపడగలను?',
    chatbot_placeholder: 'పాస్‌పోర్ట్, ఆధార్, పాన్ కార్డ్ గురించి అడగండి...',
    send: 'పంపండి',
    aadhaar: 'ఆధార్ కార్డ్',
    passport: 'పాస్‌పోర్ట్',
    pan: 'పాన్ కార్డ్',
    voter_id: 'ఓటర్ ఐడి',
    driving_license: 'డ్రైవింగ్ లైసెన్స్',
  },
  mr: {
    home: 'होम',
    services: 'सेवा',
    about: 'बद्दल',
    contact: 'संपर्क',
    help: 'मदत',
    signIn: 'साइन इन करा',
    signUp: 'साइन अप करा',
    hero_title: 'प्रत्येक सरकारी सेवेसाठी सुलभ प्रवेशासह नागरिकांना सक्षम करणे',
    hero_subtitle: 'एका एकीकृत प्लॅटफॉर्मवरून सर्व भारतीय सरकारी सेवांना नेव्हिगेट करा',
    explore_services: 'सेवा एक्सप्लोर करा',
    talk_to_ai: 'CivicEase AI शी बोला',
    search_placeholder: 'कोणतीही सरकारी सेवा शोधा...',
    learn_more: 'अधिक जाणून घ्या',
    apply_now: 'आता अर्ज करा',
    apply_passport: 'पासपोर्टसाठी अर्ज करा',
    update_aadhaar: 'आधार अद्यतनित करा',
    pan_status: 'पॅन कार्ड स्थिती',
    dl_renewal: 'ड्रायव्हिंग लायसन्स नूतनीकरण',
    action_initiated: 'कृती सुरू केली',
    process_started: 'प्रक्रिया सुरू झाली',
    auth_required: 'प्रमाणीकरण आवश्यक',
    please_sign_in: 'ही सेवा प्रवेश करण्यासाठी कृपया साइन इन करा',
    footer_cta_title: 'तुमचा नागरी प्रवास सुलभ करण्यास तयार आहात?',
    footer_cta_subtitle: 'त्रास-मुक्त सरकारी सेवा नेव्हिगेशनसाठी CivicEase वर विश्वास ठेवणाऱ्या हजारो नागरिकांमध्ये सामील व्हा.',
    create_account: 'खाते तयार करा',
    copyright: '© 2025 CivicEase. सर्व नागरिकांसाठी सरकारी सेवा सुलभ करणे.',
    chatbot_intro: 'नमस्कार! मी CivicEase AI आहे. आज मी सरकारी सेवांसाठी तुम्हाला कशी मदत करू शकतो?',
    chatbot_placeholder: 'पासपोर्ट, आधार, पॅन कार्ड बद्दल विचारा...',
    send: 'पाठवा',
    aadhaar: 'आधार कार्ड',
    passport: 'पासपोर्ट',
    pan: 'पॅन कार्ड',
    voter_id: 'मतदार ओळखपत्र',
    driving_license: 'ड्रायव्हिंग लायसन्स',
  },
  kn: {
    home: 'ಮುಖಪುಟ',
    services: 'ಸೇವೆಗಳು',
    about: 'ಬಗ್ಗೆ',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    help: 'ಸಹಾಯ',
    signIn: 'ಸೈನ್ ಇನ್',
    signUp: 'ಸೈನ್ ಅಪ್',
    hero_title: 'ಪ್ರತಿಯೊಂದು ಸರಕಾರಿ ಸೇವೆಗೆ ಸುಲಭ ಪ್ರವೇಶದೊಂದಿಗೆ ನಾಗರಿಕರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು',
    hero_subtitle: 'ಒಂದೇ ಏಕೀಕೃತ ವೇದಿಕೆಯಿಂದ ಎಲ್ಲಾ ಭಾರತೀಯ ಸರಕಾರಿ ಸೇವೆಗಳನ್ನು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ',
    explore_services: 'ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    talk_to_ai: 'CivicEase AI ಜೊತೆ ಮಾತನಾಡಿ',
    search_placeholder: 'ಯಾವುದೇ ಸರಕಾರಿ ಸೇವೆಯನ್ನು ಹುಡುಕಿ...',
    learn_more: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    apply_now: 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    apply_passport: 'ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    update_aadhaar: 'ಆಧಾರ್ ನವೀಕರಿಸಿ',
    pan_status: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಸ್ಥಿತಿ',
    dl_renewal: 'ಚಾಲನಾ ಪರವಾನಗಿ ನವೀಕರಣ',
    action_initiated: 'ಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ',
    process_started: 'ಪ್ರಕ್ರಿಯೆ ಪ್ರಾರಂಭವಾಗಿದೆ',
    auth_required: 'ದೃಢೀಕರಣ ಅಗತ್ಯವಿದೆ',
    please_sign_in: 'ಈ ಸೇವೆಯನ್ನು ಪ್ರವೇಶಿಸಲು ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    footer_cta_title: 'ನಿಮ್ಮ ನಾಗರಿಕ ಪ್ರಯಾಣವನ್ನು ಸರಳಗೊಳಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    footer_cta_subtitle: 'ತೊಂದರೆ-ಮುಕ್ತ ಸರಕಾರಿ ಸೇವಾ ಸಂಚರಣೆಗಾಗಿ CivicEase ಅನ್ನು ನಂಬುವ ಸಾವಿರಾರು ನಾಗರಿಕರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.',
    create_account: 'ಖಾತೆಯನ್ನು ರಚಿಸಿ',
    copyright: '© 2025 CivicEase. ಎಲ್ಲಾ ನಾಗರಿಕರಿಗೆ ಸರಕಾರಿ ಸೇವೆಗಳನ್ನು ಪ್ರವೇಶಿಸುವಂತೆ ಮಾಡುವುದು.',
    chatbot_intro: 'ನಮಸ್ಕಾರ! ನಾನು CivicEase AI. ಇಂದು ಸರಕಾರಿ ಸೇವೆಗಳೊಂದಿಗೆ ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    chatbot_placeholder: 'ಪಾಸ್‌ಪೋರ್ಟ್, ಆಧಾರ್, ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಬಗ್ಗೆ ಕೇಳಿ...',
    send: 'ಕಳುಹಿಸಿ',
    aadhaar: 'ಆಧಾರ್ ಕಾರ್ಡ್',
    passport: 'ಪಾಸ್‌ಪೋರ್ಟ್',
    pan: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್',
    voter_id: 'ಮತದಾರ ID',
    driving_license: 'ಚಾಲನಾ ಪರವಾನಗಿ',
  },
  ml: {
    home: 'ഹോം',
    services: 'സേവനങ്ങൾ',
    about: 'കുറിച്ച്',
    contact: 'ബന്ധപ്പെടുക',
    help: 'സഹായം',
    signIn: 'സൈൻ ഇൻ',
    signUp: 'സൈൻ അപ്പ്',
    hero_title: 'എല്ലാ സർക്കാർ സേവനങ്ങളിലേക്കും എളുപ്പത്തിൽ പ്രവേശനത്തോടെ പൗരന്മാരെ ശാക്തീകരിക്കുന്നു',
    hero_subtitle: 'ഒരൊറ്റ ഏകീകൃത പ്ലാറ്റ്ഫോമിൽ നിന്ന് എല്ലാ ഇന്ത്യൻ സർക്കാർ സേവനങ്ങളും നാവിഗേറ്റ് ചെയ്യുക',
    explore_services: 'സേവനങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക',
    talk_to_ai: 'CivicEase AI യുമായി സംസാരിക്കുക',
    search_placeholder: 'ഏതെങ്കിലും സർക്കാർ സേവനം തിരയുക...',
    learn_more: 'കൂടുതൽ അറിയുക',
    apply_now: 'ഇപ്പോൾ അപേക്ഷിക്കുക',
    apply_passport: 'പാസ്‌പോർട്ടിനായി അപേക്ഷിക്കുക',
    update_aadhaar: 'ആധാർ അപ്ഡേറ്റ് ചെയ്യുക',
    pan_status: 'പാൻ കാർഡ് സ്ഥിതി',
    dl_renewal: 'ഡ്രൈവിംഗ് ലൈസൻസ് പുതുക്കൽ',
    action_initiated: 'പ്രവർത്തനം ആരംഭിച്ചു',
    process_started: 'പ്രക്രിയ ആരംഭിച്ചു',
    auth_required: 'പ്രാമാണീകരണം ആവശ്യമാണ്',
    please_sign_in: 'ഈ സേവനം ആക്സസ് ചെയ്യാൻ ദയവായി സൈൻ ഇൻ ചെയ്യുക',
    footer_cta_title: 'നിങ്ങളുടെ പൗര യാത്ര ലളിതമാക്കാൻ തയ്യാറാണോ?',
    footer_cta_subtitle: 'ബുദ്ധിമുട്ടില്ലാത്ത സർക്കാർ സേവന നാവിഗേഷനായി CivicEase വിശ്വസിക്കുന്ന ആയിരക്കണക്കിന് പൗരന്മാരോടൊപ്പം ചേരുക.',
    create_account: 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    copyright: '© 2025 CivicEase. എല്ലാ പൗരന്മാർക്കും സർക്കാർ സേവനങ്ങൾ ആക്സസ് ചെയ്യാവുന്നതാക്കുന്നു.',
    chatbot_intro: 'നമസ്കാരം! ഞാൻ CivicEase AI ആണ്. ഇന്ന് സർക്കാർ സേവനങ്ങളുമായി ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
    chatbot_placeholder: 'പാസ്‌പോർട്ട്, ആധാർ, പാൻ കാർഡ് എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...',
    send: 'അയയ്ക്കുക',
    aadhaar: 'ആധാർ കാർഡ്',
    passport: 'പാസ്‌പോർട്ട്',
    pan: 'പാൻ കാർഡ്',
    voter_id: 'വോട്ടർ ID',
    driving_license: 'ഡ്രൈവിംഗ് ലൈസൻസ്',
  },
  bn: {
    home: 'হোম',
    services: 'পরিষেবা',
    about: 'সম্পর্কে',
    contact: 'যোগাযোগ',
    help: 'সাহায্য',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    hero_title: 'প্রতিটি সরকারি পরিষেবাতে সহজ অ্যাক্সেস সহ নাগরিকদের ক্ষমতায়ন',
    hero_subtitle: 'একটি একীভূত প্ল্যাটফর্ম থেকে সমস্ত ভারতীয় সরকারি পরিষেবা নেভিগেট করুন',
    explore_services: 'পরিষেবাগুলি অন্বেষণ করুন',
    talk_to_ai: 'CivicEase AI এর সাথে কথা বলুন',
    search_placeholder: 'যেকোনো সরকারি পরিষেবা খুঁজুন...',
    learn_more: 'আরও জানুন',
    apply_now: 'এখনই আবেদন করুন',
    apply_passport: 'পাসপোর্টের জন্য আবেদন করুন',
    update_aadhaar: 'আধার আপডেট করুন',
    pan_status: 'প্যান কার্ড স্ট্যাটাস',
    dl_renewal: 'ড্রাইভিং লাইসেন্স নবায়ন',
    action_initiated: 'কর্ম শুরু হয়েছে',
    process_started: 'প্রক্রিয়া শুরু হয়েছে',
    auth_required: 'প্রমাণীকরণ প্রয়োজন',
    please_sign_in: 'এই পরিষেবা অ্যাক্সেস করতে সাইন ইন করুন',
    footer_cta_title: 'আপনার নাগরিক যাত্রা সহজ করতে প্রস্তুত?',
    footer_cta_subtitle: 'হাজার হাজার নাগরিকদের সাথে যোগ দিন যারা ঝামেলামুক্ত সরকারি পরিষেবা নেভিগেশনের জন্য CivicEase বিশ্বাস করেন।',
    create_account: 'অ্যাকাউন্ট তৈরি করুন',
    copyright: '© 2025 CivicEase। সমস্ত নাগরিকের কাছে সরকারি পরিষেবা অ্যাক্সেসযোগ্য করে তোলা।',
    chatbot_intro: 'নমস্কার! আমি CivicEase AI। আজ আমি সরকারি পরিষেবাগুলিতে আপনাকে কীভাবে সাহায্য করতে পারি?',
    chatbot_placeholder: 'পাসপোর্ট, আধার, প্যান কার্ড সম্পর্কে জিজ্ঞাসা করুন...',
    send: 'পাঠান',
    aadhaar: 'আধার কার্ড',
    passport: 'পাসপোর্ট',
    pan: 'প্যান কার্ড',
    voter_id: 'ভোটার আইডি',
    driving_license: 'ড্রাইভিং লাইসেন্স',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const loadUserLanguage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.preferred_language) {
          setLanguageState(profile.preferred_language as Language);
        }
      }
    };

    loadUserLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ preferred_language: lang })
        .eq('user_id', user.id);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};