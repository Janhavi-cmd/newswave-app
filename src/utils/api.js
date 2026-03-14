import axios from "axios";
import { CATEGORIES, LANGUAGES, YT_BASE, YT_KEY } from "./constants";

/* ─── GUARDIAN NEWS ──────────────────────────────────────── */
export async function fetchNews(catId, query) {
  var cat = catId || "general";
  var q   = query || "";
  try {
    var found  = CATEGORIES.find(function(c) { return c.id === cat; });
    var params = { "show-fields": "thumbnail,headline,trailText,byline", "page-size": 30, "api-key": "test" };
    if (q) params.q = q;
    else if (found) params.section = found.guardian;
    var res     = await axios.get("https://content.guardianapis.com/search", { params: params });
    var results = (res.data && res.data.response && res.data.response.results) ? res.data.response.results : [];
    if (results.length === 0) return getMockNews(cat);
    return results.map(function(a, i) {
      var desc = (a.fields && a.fields.trailText) ? a.fields.trailText : "";
      return {
        id:          a.id || ("g-" + i),
        source:      "The Guardian",
        sourceFlag:  "🇬🇧",
        author:      (a.fields && a.fields.byline) ? a.fields.byline : "The Guardian",
        title:       a.webTitle || "News Article",
        description: desc,
        url:         a.webUrl || "#",
        image:       (a.fields && a.fields.thumbnail) ? a.fields.thumbnail : "",
        publishedAt: a.webPublicationDate || new Date().toISOString(),
        category:    cat,
        readTime:    Math.max(1, Math.ceil(desc.length / 200)),
      };
    });
  } catch (err) {
    console.warn("Guardian failed:", err.message);
    return getMockNews(cat);
  }
}

/* ─── YOUTUBE ────────────────────────────────────────────── */
export async function fetchVideos(catId, query, langCode) {
  var cat  = catId || "general";
  var lang = langCode || "en";
  var found = CATEGORIES.find(function(c) { return c.id === cat; });
  var lobj  = LANGUAGES.find(function(l) { return l.code === lang; });
  var q     = query || (found ? found.ytq : "world news today");
  var rl    = lobj ? lobj.yt : "en";

  if (!YT_KEY) return getMockVideos(cat, lang);

  try {
    var res   = await axios.get(YT_BASE + "/search", {
      params: { part: "snippet", q: q, type: "video", maxResults: 15, order: "relevance", relevanceLanguage: rl, key: YT_KEY },
    });
    var items = (res.data && res.data.items) ? res.data.items : [];
    if (!items.length) return getMockVideos(cat, lang);
    return items.map(function(v, i) {
      var sn    = v.snippet || {};
      var th    = sn.thumbnails || {};
      var thumb = (th.medium && th.medium.url) ? th.medium.url : (th.high && th.high.url) ? th.high.url : (th.default && th.default.url) ? th.default.url : "";
      return {
        videoId:   (v.id && v.id.videoId) ? v.id.videoId : "",
        title:     sn.title || "Video",
        channel:   sn.channelTitle || "",
        desc:      sn.description || "",
        thumb:     thumb,
        published: sn.publishedAt || new Date().toISOString(),
        isReal:    true,
      };
    });
  } catch (err) {
    console.warn("YouTube error:", err.message);
    return getMockVideos(cat, lang);
  }
}

/* ─── MOCK NEWS ──────────────────────────────────────────── */
var MOCK_NEWS = {
  general: [
    { t: "Global Leaders Sign Landmark Climate Treaty at Geneva Summit", d: "Representatives from 194 nations signed a comprehensive climate agreement committing to net-zero emissions by 2040 after three days of intensive negotiations." },
    { t: "UN Security Council Deploys Emergency Peacekeeping Force", d: "A unanimous resolution authorised deployment of 15,000 peacekeeping troops to three active conflict zones in the most coordinated multilateral response in years." },
    { t: "World Health Organisation Lifts Global Emergency Status", d: "The WHO lifted emergency status across multiple regions citing successful containment measures and strong vaccination coverage among at-risk populations." },
    { t: "G20 Nations Agree on $3 Trillion Economic Recovery Package", d: "Finance leaders from the world twenty largest economies announced a sweeping coordinated stimulus targeting recovery in developing nations hardest hit by recent downturns." },
    { t: "Historic Peace Agreement Ends 20-Year Regional Conflict", d: "A comprehensive peace treaty witnessed by delegates from 60 countries brought an end to one of the longest-running regional conflicts in modern history." },
    { t: "International Space Station Welcomes Most Diverse Crew Ever", d: "Eight astronauts from six continents began a six-month mission aboard the ISS, representing the most multinational crew assembled in human spaceflight history." },
  ],
  technology: [
    { t: "Next-Generation AI Model Passes All Professional Certification Exams", d: "A new large language model achieved top-percentile scores across medical, legal and engineering certification examinations, marking a new milestone for artificial intelligence." },
    { t: "Apple Reveals Second-Generation Spatial Computing Headset", d: "The next iteration of Apple spatial computing platform introduces true holographic projection and all-day battery life, transforming how developers build immersive applications." },
    { t: "Quantum Internet Successfully Links Five Major World Cities", d: "Scientists demonstrated sustained quantum-encrypted data transmission between London, Paris, Berlin, Tokyo and New York, a breakthrough for global secure communications infrastructure." },
    { t: "Autonomous Vehicles Receive Full Regulatory Approval in 45 Countries", d: "International regulators granted level-5 autonomy certification following five years of testing with an unblemished safety record across more than 50 million test kilometers." },
    { t: "New GPU Architecture Delivers Tenfold AI Performance Improvement", d: "A newly released graphics processor reduces AI inference costs by 80 percent while consuming half the power of its predecessor, opening new possibilities for edge deployment." },
    { t: "Non-Invasive Neural Interface Achieves 100 Words Per Minute", d: "A wearable brain-computer interface achieved unprecedented typing speeds using thought alone, creating new possibilities for accessibility and human-computer interaction." },
  ],
  business: [
    { t: "Global Stock Markets Simultaneously Break All-Time Records", d: "The Dow Jones, FTSE 100, Nikkei and DAX all reached historic highs in the same trading session, reflecting sustained investor confidence across all major economies." },
    { t: "Technology Giant Completes $35 Billion Healthcare Acquisition", d: "The landmark deal adds more than 5,000 clinics and 65 million patients, marking the largest technology company expansion into direct healthcare delivery ever completed." },
    { t: "Venture Capital Investment Surpasses $200 Billion in Single Quarter", d: "Record-breaking funding concentrated in artificial intelligence, climate technology and biotechnology signals unprecedented private sector confidence in deep technology development." },
    { t: "Central Bank Announces Third Consecutive Interest Rate Reduction", d: "The dovish policy shift reflects sustained progress on inflation targets and labour market stability, with economists forecasting two additional reductions before the calendar year ends." },
    { t: "Electric Vehicles Claim Majority Market Share Across All Regions", d: "For the first time, battery electric vehicles outsold internal combustion alternatives simultaneously across North America, Europe and Asia-Pacific in the same monthly reporting period." },
    { t: "Investment Conglomerate Discloses Surprise $60 Billion Technology Stake", d: "The previously undisclosed position in an emerging technology company sent sector stocks broadly higher and reignited speculation about further large-scale institutional technology investments." },
  ],
  health: [
    { t: "Personalised Cancer Vaccine Achieves 96 Percent Efficacy Across Six Types", d: "A global phase-three trial of individualised mRNA cancer vaccines demonstrated near-complete tumour regression across six distinct cancer types in more than 50,000 enrolled patients." },
    { t: "Annual Alzheimer Therapy Dramatically Slows Cognitive Decline", d: "A single annual injection of a new monoclonal antibody therapy cleared amyloid plaques and substantially slowed neurodegeneration in the largest neurology trial ever conducted." },
    { t: "WHO Mandates Mental Health Programmes in Schools Across 140 Nations", d: "New international frameworks now require dedicated mental health curricula, trained counsellors and early intervention programmes in all educational institutions across 140 signatory states." },
    { t: "Targeted Gene Therapy Reverses Biological Ageing Markers by Two Decades", d: "A combination of precision gene editing and cellular reprogramming achieved measurable reversal of biological age indicators in an unprecedented proof-of-concept human trial." },
    { t: "Global Average Life Expectancy Exceeds 80 Years for the First Time", d: "Driven by advances in preventive medicine, expanded vaccine access and improved water sanitation, average human lifespan crossed 80 years globally according to the latest WHO data." },
    { t: "Single-Treatment CRISPR Therapy Achieves Permanent Cure for Blood Disorders", d: "The FDA-approved gene editing treatment delivered functional cures in 98 percent of sickle cell and beta-thalassemia patients treated, requiring only a single administration session." },
  ],
  sports: [
    { t: "FIFA World Cup 2026 Draw Creates Dream Group Stage Matchups", d: "The expanded 48-nation tournament draw placed several historic rivalries in the same groups, guaranteeing dramatic early-stage encounters at venues across North America." },
    { t: "World Athletics Championship Night Produces Three World Records", d: "An extraordinary evening of competition saw world records fall in the 100 metres, long jump and hammer throw on the opening night of the global championships." },
    { t: "Championship Final Game 7 Draws 52 Million Viewers Worldwide", d: "The deciding game of the basketball championship became the most-watched match in league history, with audiences tuning in across 185 countries during the final broadcast." },
    { t: "Formula 1 Confirms Complete Transition to Electric Power from 2028", d: "Governing body regulations mandate full battery electric powertrains across the entire grid from the 2028 season while preserving the distinctive acoustic character of the sport." },
    { t: "Olympic Games Los Angeles 2028 Expands Programme with Six New Sports", d: "The International Olympic Committee confirmed the addition of breaking, cricket, flag football, lacrosse, squash and underwater hockey to the 2028 Summer Games programme." },
    { t: "Global Transfer Window Sets New Spending Record of $6 Billion", d: "The summer window broke all previous spending records with 14 individual player transfers each exceeding $200 million, reflecting the enormous commercial growth of elite club football." },
  ],
  entertainment: [
    { t: "International Films Dominate Global Film Awards in Historic Ceremony", d: "Productions from South Korea, Nigeria, Brazil and India swept the major categories in the most geographically diverse awards ceremony in the history of global film recognition." },
    { t: "Streaming Giants Announce $55 Billion Merger Creating 500 Million Subscriber Platform", d: "The combined platform will launch under a unified brand and become the largest streaming service globally, offering content in 40 languages across more than 190 countries." },
    { t: "Concert Documentary Film Becomes Highest-Grossing Music Release in History", d: "The unprecedented theatrical run across 75 countries generated $3 billion at the box office, shattering every previous record for music documentaries and concert films combined." },
    { t: "Streaming Platform Commits $12 Billion to Original Multilingual Productions", d: "The record content investment funds 250 original series and feature films across 35 languages, targeting simultaneous global audiences in every major territory worldwide." },
    { t: "Music Streaming Services Surpass 2 Billion Monthly Active Users Combined", d: "The industry milestone reflects the complete transformation of recorded music consumption, with streaming now accounting for 95 percent of all global recorded music revenues." },
    { t: "Interactive Entertainment Revenue Overtakes Combined Film and Music Industries", d: "Annual global gaming revenues reached $420 billion, cementing interactive entertainment as the dominant force in global popular culture and media consumption." },
  ],
  science: [
    { t: "James Webb Space Telescope Detects Multiple Confirmed Biosignatures on Exoplanet", d: "Simultaneous detection of oxygen, methane and phosphine in atmospheric profiles of a rocky exoplanet 40 light-years distant represents the most compelling evidence for extraterrestrial life yet found." },
    { t: "Commercial Fusion Reactor Sustains Net Positive Energy for 14 Hours", d: "A private fusion energy company achieved sustained net energy gain over a 14-hour period, crossing the threshold that transforms fusion from laboratory experiment to viable commercial power." },
    { t: "Deep Ocean Expedition Catalogues 80 Previously Unknown Species", d: "A six-month Smithsonian-led scientific expedition to the Mariana Trench returned with 80 specimens representing entirely new orders of marine life never before observed by science." },
    { t: "Laboratory-Grown Organs Successfully Implanted in Human Recipients", d: "Three patients received fully functional kidneys cultivated entirely from their own stem cells, eliminating transplant rejection risk and opening a viable path beyond the organ donor shortage." },
    { t: "Gravitational Wave Observatory Records Largest Black Hole Collision Ever", d: "The LIGO and Virgo detector network confirmed a merger between two intermediate black holes combining mass 500 billion times that of the sun, requiring fundamental revisions to astrophysics models." },
    { t: "New Antarctic Research Finds Ice Sheet Far More Stable Than Feared", d: "Geological surveys identifying previously unmapped ancient seafloor barriers beneath the Thwaites Glacier suggest substantially slower ice retreat than existing climate models had projected." },
  ],
  politics: [
    { t: "Historic Bipartisan Infrastructure Act Passes with Largest Congressional Majority in 30 Years", d: "A landmark $2.5 trillion infrastructure bill securing unprecedented bipartisan support funds roads, railways, broadband internet and clean energy transitions across all 50 states." },
    { t: "European Parliament Adopts Comprehensive Artificial Intelligence Governance Framework", d: "The landmark legislation establishes globally influential standards covering AI transparency, safety certification, accountability requirements and the protection of fundamental rights from algorithmic harm." },
    { t: "United Nations Votes to Expand Security Council in Historic Reform", d: "The most significant overhaul of UN governance in 80 years adds six new permanent members from Africa, Asia and Latin America to reflect contemporary geopolitical and demographic realities." },
    { t: "G7 Finance Ministers Confirm Implementation of Global Minimum Corporate Tax", d: "The confirmed rollout of a 15 percent global corporate minimum tax closes major offshore avoidance structures that cost governments an estimated $240 billion annually in lost revenues." },
    { t: "International Court of Justice Issues Binding Ruling on Major Maritime Dispute", d: "The precedent-setting judgement resolves a 40-year territorial claim in a ruling that sets binding legal standards applicable to dozens of similar maritime boundary cases currently awaiting resolution." },
    { t: "Global Democracy Summit Produces Binding Electoral Integrity Commitments", d: "Representatives from 85 nations signed comprehensive commitments on election security, press freedom protections, anti-corruption enforcement and disinformation accountability in a landmark multilateral agreement." },
  ],
};

function getMockNews(cat) {
  var items = MOCK_NEWS[cat] || MOCK_NEWS.general;
  return items.map(function(n, i) {
    return {
      id:          "mock-" + cat + "-" + i,
      source:      "NewsWave",
      sourceFlag:  "🌐",
      author:      "NewsWave Editorial",
      title:       n.t,
      description: n.d,
      url:         "https://theguardian.com",
      image:       "https://picsum.photos/seed/" + cat + i + "nw3/800/450",
      publishedAt: new Date(Date.now() - i * 5400000).toISOString(),
      category:    cat,
      readTime:    Math.max(1, Math.ceil(n.d.length / 200)),
    };
  });
}

/* ─── MOCK VIDEOS ────────────────────────────────────────── */
var MOCK_VIDEOS = {
  general:       [{ t: "World News Today All Top Stories", ch: "BBC World News" }, { t: "Breaking International Headlines Live", ch: "CNN International" }, { t: "Global Roundup Latest Updates", ch: "Al Jazeera English" }, { t: "World Affairs Expert Analysis", ch: "DW News" }, { t: "UN Briefing Global Decisions", ch: "UN Web TV" }, { t: "International Crisis Full Coverage", ch: "France 24" }],
  technology:    [{ t: "AI Revolution 2026 Complete Guide", ch: "MKBHD" }, { t: "Top Technology News This Week", ch: "Linus Tech Tips" }, { t: "Future of Technology Expert Roundtable", ch: "Wired" }, { t: "AI Tools Complete 2026 Comparison", ch: "Dave2D" }, { t: "Startups Changing the World Today", ch: "TechCrunch" }, { t: "Quantum Computing Simply Explained", ch: "Kurzgesagt" }],
  business:      [{ t: "Stock Market Full Analysis Today", ch: "Bloomberg Television" }, { t: "Economic Outlook 2026 Expert Forecast", ch: "CNBC" }, { t: "Markets Explained for Everyone", ch: "Forbes" }, { t: "Startup Funding Hits Record Highs", ch: "Wall Street Journal" }, { t: "Central Banks Policy Deep Dive", ch: "The Economist" }, { t: "Investing Strategy Complete Guide 2026", ch: "Graham Stephan" }],
  health:        [{ t: "Cancer Research Latest Breakthrough", ch: "Medical News Today" }, { t: "Mental Health Solutions for Today", ch: "TED" }, { t: "Nutrition Science Update 2026", ch: "Huberman Lab" }, { t: "AI Transforming Medicine Right Now", ch: "Doctor Mike" }, { t: "Sleep Science Complete Improvement Guide", ch: "Healthline" }, { t: "Gene Therapy Revolution Explained", ch: "SciShow" }],
  sports:        [{ t: "Top Sports Moments This Week", ch: "ESPN" }, { t: "Champions League All Goals Highlights", ch: "UEFA" }, { t: "NBA Daily Scores Highlights Analysis", ch: "House of Highlights" }, { t: "Formula 1 Race Full Breakdown", ch: "F1 Official Channel" }, { t: "Athlete of the Year Full Documentary", ch: "Sky Sports" }, { t: "World Cup 2026 Preview Analysis", ch: "Goal" }],
  entertainment: [{ t: "Hollywood Latest News Weekly Roundup", ch: "Entertainment Weekly" }, { t: "Box Office Winners and Losers This Week", ch: "Variety" }, { t: "Best New Streaming Shows Right Now", ch: "Screen Rant" }, { t: "Music Awards Best Moments Compilation", ch: "MTV" }, { t: "Film Industry Deep Dive Analysis", ch: "The Hollywood Reporter" }, { t: "Celebrity News Complete Weekly Update", ch: "E News" }],
  science:       [{ t: "James Webb Telescope Greatest Discoveries", ch: "NASA Official" }, { t: "New Ocean Species Discovery Expedition", ch: "National Geographic" }, { t: "Fusion Power Is It Finally Real", ch: "Kurzgesagt" }, { t: "Space Exploration What Comes Next", ch: "SpaceX" }, { t: "Climate Science Simply Explained", ch: "Our Changing Climate" }, { t: "Biology Biggest Breakthroughs This Year", ch: "SciShow" }],
  politics:      [{ t: "Political Analysis Complete Week in Review", ch: "BBC Politics" }, { t: "Congress Latest Major Developments", ch: "C-SPAN" }, { t: "Global Politics Expert Panel Discussion", ch: "Foreign Affairs" }, { t: "Election Data Analysis Deep Dive", ch: "FiveThirtyEight" }, { t: "Policy Debate Full Live Coverage", ch: "PBS NewsHour" }, { t: "International Relations Latest Update", ch: "Council on Foreign Relations" }],
};

function getMockVideos(cat, lang) {
  var list   = MOCK_VIDEOS[cat] || MOCK_VIDEOS.general;
  var suffix = lang && lang !== "en" ? " in " + lang : "";
  return list.map(function(v, i) {
    return {
      videoId:   "",
      title:     v.t + suffix,
      channel:   v.ch,
      desc:      "",
      thumb:     "https://picsum.photos/seed/vid" + cat + i + "/320/180",
      published: new Date(Date.now() - i * 3600000).toISOString(),
      isReal:    false,
      searchUrl: "https://www.youtube.com/results?search_query=" + encodeURIComponent(v.t),
    };
  });
}
