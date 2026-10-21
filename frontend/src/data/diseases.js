export const DISEASES = {
  earlyBlight: {
    id: "earlyBlight",
    nameMr: "अर्ली ब्लाइट",
    nameEn: "Early Blight",
    cropIds: ["tomato", "potato"],
    cause: "Alternaria solani",
    symptoms: {
      mr: "पानांवर तपकिरी-काळे वर्तुळाकार ठिपके दिसतात व कडा पिवळसर पडतात.",
      en: "Dark brown concentric rings with yellowing halos appear on older leaves.",
    },
    explainer: {
      mr: "लाल/नारंगी रंगात दाखवलेले भाग गडद वर्तुळाकार ठिपके व पिवळसर कडा दर्शवतात — हे अर्ली ब्लाइटचे ठळक लक्षण आहे. हा रोग सहसा जुन्या, खालच्या पानांपासून सुरू होऊन वरच्या दिशेने पसरतो, विशेषतः उष्ण व दमट वातावरणात.",
      en: "The highlighted (red/orange) spots show concentric dark rings with yellowing edges — a classic sign of Early Blight. This pattern usually spreads from older, lower leaves upward, especially in warm, humid conditions.",
    },
    advisory: {
      organic: {
        mr: [
          "प्रभावित पाने तोडून नष्ट करा.",
          "शेणखत/कंपोस्टचा वापर करा.",
          "5-7 दिवसांनी नीम अर्काची फवारणी करा.",
        ],
        en: [
          "Prune and destroy infected leaves immediately.",
          "Apply farmyard manure/compost to strengthen plants.",
          "Spray neem extract every 5-7 days.",
        ],
      },
      chemical: {
        mr: [
          "कॉपरयुक्त बुरशीनाशकाची योग्य प्रमाणात फवारणी करा.",
          "मॅन्कोझेब 75% WP 2-2.5 ग्रॅम प्रति लिटर पाण्यात मिसळून दर 10 दिवसांनी फवारणी करा.",
          "फवारणी करताना हातमोजे व मास्क वापरा; पावसापूर्वी फवारणी टाळा.",
        ],
        en: [
          "Apply copper-based fungicide according to package directions.",
          "Use Mancozeb 75% WP at 2-2.5 g/liter of water, spray every 10 days.",
          "Always wear gloves and mask during spraying; avoid spraying before rain.",
        ],
      },
    },
  },

  // REVIEW: agronomy + Marathi
  leafMiner: {
    id: "leafMiner",
    nameMr: "लीफ माईनर",
    nameEn: "Leaf Miner",
    cropIds: ["tomato", "chilli"],
    cause: "Liriomyza trifolii",
    symptoms: {
      mr: "पानांवर पांढऱ्या नागमोडी रेषा किंवा भुयारे दिसतात. जास्त प्रादुर्भाव असल्यास पाने वाळतात.",
      en: "Serpentine white trails and tunnels appear on leaf surfaces, leading to leaf drying.",
    },
    explainer: {
      mr: "पानावरील नागमोडी पांढऱ्या रेषा व किडीच्या अळ्यांनी तयार केलेले भुयार स्पष्ट दिसते. हे लीफ माईनरच्या प्रादुर्भावाचे निश्चित लक्षण आहे.",
      en: "The highlighted areas reveal characteristic winding white trails carved by larvae inside leaf tissue. This serpentine tunneling confirms leaf miner infestation.",
    },
    advisory: {
      organic: {
        mr: [
          "कीड लागलेली पाने गोळा करून जाळून नष्ट करा.",
          "पिकात पिवळे चिकट सापळे लावा.",
          "5% निंबोळी अर्काची (नीम अर्क) आठवड्यातून एकदा फवारणी करा.",
        ],
        en: [
          "Collect and destroy heavily mined leaves.",
          "Install yellow sticky traps across the field.",
          "Spray 5% neem seed kernel extract weekly.",
        ],
      },
      chemical: {
        mr: [
          "अबामेक्टिन 1.9% EC 0.5 मिली प्रति लिटर पाण्यात मिसळून फवारा.",
          "प्रादुर्भाव जास्त असल्यास स्पिनोसॅड 45% SC 0.3 मिली प्रति लिटर वापरा.",
          "कीटकनाशकांची आलटून-पालटून फवारणी करा जेणेकरून प्रतिकारशक्ती वाढणार नाही.",
        ],
        en: [
          "Spray Abamectin 1.9% EC at 0.5 ml per liter of water.",
          "For severe attacks, use Spinosad 45% SC at 0.3 ml per liter.",
          "Rotate chemical classes to prevent insect resistance.",
        ],
      },
    },
  },

  // REVIEW: agronomy + Marathi
  bacterialSpot: {
    id: "bacterialSpot",
    nameMr: "बॅक्टेरियल स्पॉट",
    nameEn: "Bacterial Spot",
    cropIds: ["tomato", "chilli"],
    cause: "Xanthomonas campestris",
    symptoms: {
      mr: "पानांवर व फळांवर लहान, काळे किंवा गडद तपकिरी पाण्यासारखे ठिपके दिसतात.",
      en: "Small, dark brown to black water-soaked lesions appear on leaves and fruit.",
    },
    explainer: {
      mr: "पानांवरील गडद पाणीयुक्त ठिपके व त्यांच्या भोवतालची हलकी पिवळसर कडा दिसते. हे जिवाणूजन्य करप्याचे (बॅक्टेरियल स्पॉट) ठळक लक्षण आहे.",
      en: "The highlighted spots show irregular water-soaked lesions with chlorotic halos. These lesions indicate a bacterial spot infection favored by moisture.",
    },
    advisory: {
      organic: {
        mr: [
          "बाधित झाडांची पाने तोडून नष्ट करा व स्वच्छता राखा.",
          "झाडांच्या पानांवर पाणी साचू नये म्हणून ठिबक सिंचन वापरा.",
          "प्रतिबंधात्मक उपाय म्हणून ताक व हिंगाच्या द्रावणाची फवारणी करा.",
        ],
        en: [
          "Remove and destroy diseased plant debris and maintain field hygiene.",
          "Use drip irrigation to keep leaf surfaces dry.",
          "Apply fermented buttermilk spray as a preventive bio-agent.",
        ],
      },
      chemical: {
        mr: [
          "कॉपर ऑक्सिक्लोराईड (COC) 2.5 ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा.",
          "स्ट्रेप्टोसायक्लिन 1 ग्रॅम प्रति 10 लिटर पाण्यात मिसळून कॉपरसोबत वापरा.",
          "दमट किंवा पावसाळी हवेत 7-10 दिवसांच्या अंतराने पुन्हा फवारणी करा.",
        ],
        en: [
          "Spray Copper Oxychloride at 2.5 g per liter of water.",
          "Add Streptocycline (1 g per 10 L water) mixed with copper fungicide.",
          "Repeat application every 7-10 days during warm, wet weather.",
        ],
      },
    },
  },

  // REVIEW: agronomy + Marathi
  powderyMildew: {
    id: "powderyMildew",
    nameMr: "पावडरी मिल्ड्यू",
    nameEn: "Powdery Mildew",
    cropIds: ["cucumber", "pumpkin"],
    cause: "Podosphaera xanthii",
    symptoms: {
      mr: "पानांच्या वरच्या व खालच्या पृष्ठभागावर पांढरी भुकटी किंवा पिठासारखा थर दिसतो.",
      en: "White powdery fungal patches develop on upper and lower leaf surfaces.",
    },
    explainer: {
      mr: "पानांवर पसरलेले पांढरे पिठासारखे ठिपके व बुरशीचे थर स्पष्ट दिसत आहेत. हे पावडरी मिल्ड्यू (भुरी) रोगाचे वैशिष्ट्यपूर्ण लक्षण आहे.",
      en: "The heatmap highlights characteristic white talcum-like fungal growth across the leaf surface. This visual pattern is typical of powdery mildew development.",
    },
    advisory: {
      organic: {
        mr: [
          "बाधित पाने तोडून नष्ट करा व झाडांना पुरेसा सूर्यप्रकाश मिळेल याची काळजी घ्या.",
          "दूध आणि पाण्याचे 1:9 प्रमाणात द्रावण तयार करून फवारणी करा.",
          "बेकिंग सोडा (5 ग्रॅम प्रति लिटर) आणि साबणाचे पाणी मिसळून फवारा.",
        ],
        en: [
          "Prune heavily affected leaves and improve canopy sunlight penetration.",
          "Spray a 1:9 milk-to-water solution under morning sunlight.",
          "Apply baking soda solution (5 g/L water) with a few drops of liquid soap.",
        ],
      },
      chemical: {
        mr: [
          "विद्राव्य गंधक (Sulfur 80% WDG) 2 ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा.",
          "जास्त प्रादुर्भाव असल्यास डायफेनोकोनाझोल (0.5 मिली/लिटर) चा वापर करा.",
          "कडक उन्हात गंधकाची फवारणी करणे टाळा, पाने करपू शकतात.",
        ],
        en: [
          "Spray wettable sulfur (80% WDG) at 2 g per liter of water.",
          "Use Difenoconazole 25% EC at 0.5 ml per liter for advanced infection.",
          "Avoid sulfur application during peak midday heat to prevent scorching.",
        ],
      },
    },
  },

  // REVIEW: agronomy + Marathi
  leafCurl: {
    id: "leafCurl",
    nameMr: "लीफ कर्ल",
    nameEn: "Leaf Curl",
    cropIds: ["chilli"],
    cause: "Chilli leaf curl virus (ChiLCV)",
    symptoms: {
      mr: "पाने वरच्या किंवा खालच्या बाजूने आकसतात, झाडाची वाढ खुंटते आणि पाने लहान होतात.",
      en: "Leaves curl upward or downward, puckering with stunted plant growth.",
    },
    explainer: {
      mr: "पानांच्या कडा आकसणे व शिरांमधील फुगवटा स्पष्टपणे निदर्शनास येतो. पांढऱ्या माशीमुळे पसरणाऱ्या लीफ कर्ल विषाणूचे हे प्रमुख लक्षण आहे.",
      en: "The heatmap highlights leaf edge upward curling and severe vein distortion. This structural deformation points directly to whitefly-transmitted Leaf Curl virus.",
    },
    advisory: {
      organic: {
        mr: [
          "विषाणूग्रस्त झाडे तातडीने उपटून जमिनीत गाडून टाका.",
          "पांढऱ्या माशीच्या नियंत्रणासाठी पिवळे चिकट सापळे एकरी 15-20 लावा.",
          "नीम तेल (10,000 PPM) 2-3 मिली प्रति लिटर पाण्यात मिसळून फवारा.",
        ],
        en: [
          "Rogue out and safely bury severely virus-infected plants.",
          "Set up 15-20 yellow sticky traps per acre to catch whiteflies.",
          "Spray cold-pressed neem oil (10,000 PPM) at 2-3 ml per liter.",
        ],
      },
      chemical: {
        mr: [
          "पांढऱ्या माशीसाठी इमिडाक्लोप्रिड 17.8% SL 0.3 मिली प्रति लिटर फवारा.",
          "डायफेन्थियुरॉन 50% WP 1.2 ग्रॅम प्रति लिटर पाण्यात मिसळून वापरा.",
          "रोगप्रसार रोखण्यासाठी किडीचा प्रादुर्भाव दिसताच फवारणी करा.",
        ],
        en: [
          "Spray Imidacloprid 17.8% SL at 0.3 ml per liter for vector control.",
          "Apply Diafenthiuron 50% WP at 1.2 g per liter of water.",
          "Target sucking pests early to halt virus spread across the field.",
        ],
      },
    },
  },

  // REVIEW: agronomy + Marathi
  healthy: {
    id: "healthy",
    nameMr: "निरोगी",
    nameEn: "Healthy",
    cropIds: ["tomato", "chilli", "potato", "cucumber", "pumpkin"],
    cause: null,
    symptoms: {
      mr: "पानांवर कोणताही डाग, कीड किंवा रोगाची लक्षणे नाहीत; रंग गडद हिरवा व तजेलदार आहे.",
      en: "No spots, discoloration, or pest damage observed; foliage is vibrant and green.",
    },
    explainer: {
      mr: "पानाचा पृष्ठभाग एकसमान हिरवा असून त्यावर कोणतेही रोगट ठिपके किंवा विकृती आढळलेली नाही. हे पान पूर्णपणे निरोगी आहे.",
      en: "The scan shows an even chlorophyll pattern with no necrotic lesions or tissue stress. The leaf is healthy with no disease symptoms detected.",
    },
    advisory: {
      organic: {
        mr: [
          "संतुलित सेंद्रिय खते आणि जिवामृताचा नियमित वापर सुरू ठेवा.",
          "प्रतिबंधात्मक उपाय म्हणून दर 15 दिवसांनी हलका नीम अर्क फवारा.",
          "झाडांना योग्य प्रमाणात पाणी द्या आणि शेतात तण वाढू देऊ नका.",
        ],
        en: [
          "Maintain regular organic feeding with compost and bio-fertilizers.",
          "Apply preventive light neem sprays every 15 days.",
          "Provide optimal soil moisture and keep the plot weed-free.",
        ],
      },
      chemical: {
        mr: [
          "सध्या कोणत्याही रासायनिक औषधाची फवारणी करण्याची आवश्यकता नाही.",
          "पिकाच्या पोषणासाठी 19:19:19 विद्राव्य खताची हलकी फवारणी करू शकता.",
          "नियमित निरीक्षण ठेवा जेणेकरून किडीचा प्रादुर्भाव वेळेत लक्षात येईल.",
        ],
        en: [
          "No chemical fungicides or insecticides needed at this stage.",
          "A light foliar feed of balanced 19:19:19 NPK may be given if required.",
          "Continue periodic field scouting to catch any early distress signs.",
        ],
      },
    },
  },
};

export default DISEASES;
