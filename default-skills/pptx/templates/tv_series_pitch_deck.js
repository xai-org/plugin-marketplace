const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Series Bible";
pres.title = "THE FIFTH SUN - Series Bible";

const C = {
  black: "0A0A0A",
  darkBg: "111111",
  darkCard: "1A1A1A",
  gold: "C8A951",
  goldDark: "8B7332",
  goldLight: "E8D48B",
  cream: "F5E6C8",
  blood: "8B1A1A",
  white: "FFFFFF",
  gray: "888888",
  lightGray: "CCCCCC",
  darkGray: "333333",
  jade: "00A86B",
  jadeLight: "4DC99B",
  bloodLight: "C25555",
};

const FONT_H = "Georgia";
const FONT_B = "Calibri";

// All images are 1168x784, aspect ratio = 1.4898
const IMG_RATIO = 1168 / 784;

function goldLine(slide, x, y, w) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.02,
    fill: { color: C.gold }
  });
}

// Add a dark overlay rectangle (fully opaque, between image layer and text)
function darkOverlay(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: "000000", transparency: 40 }
  });
}

// ============================================================
// SLIDE 1: COVER - Ship background
// ============================================================
let s1 = pres.addSlide();
s1.background = { path: "/home/assets/Ship.jpeg" };
darkOverlay(s1, 0, 0, 10, 5.625);
s1.addText("THE FIFTH SUN", {
  x: 0.5, y: 1.8, w: 9, h: 1.2,
  fontFace: FONT_H, fontSize: 54, color: C.gold,
  bold: true, align: "center", charSpacing: 8
});
goldLine(s1, 3, 3.05, 4);
s1.addText("A HISTORICAL FICTION TELEVISION SERIES", {
  x: 0.5, y: 3.2, w: 9, h: 0.5,
  fontFace: FONT_B, fontSize: 18, color: C.cream,
  align: "center", charSpacing: 4
});
s1.addText("HBO / WARNER BROS. DISCOVERY", {
  x: 0.5, y: 5.15, w: 9, h: 0.35,
  fontFace: FONT_B, fontSize: 11, color: C.goldDark,
  align: "center", charSpacing: 3
});

// ============================================================
// SLIDE 2: LOGLINE
// ============================================================
let s2 = pres.addSlide();
s2.background = { color: C.darkBg };
s2.addText("LOGLINE", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6
});
goldLine(s2, 0.5, 1.1, 2);
s2.addText(
  "In 1519, a rogue Spanish captain defies his governor and sails eleven ships toward an empire of twenty-five million souls. What follows is not a conquest — it is a collision between two civilizations, each convinced the gods are on their side, and each willing to destroy themselves to prove it.",
  {
    x: 0.8, y: 1.4, w: 8.4, h: 2.2,
    fontFace: FONT_H, fontSize: 18, color: C.cream,
    italic: true, align: "center", lineSpacingMultiple: 1.5
  }
);
goldLine(s2, 3, 3.8, 4);
s2.addText("Genre: Historical Dark Fantasy  •  Tone: Game of Thrones meets Apocalypto", {
  x: 0.5, y: 4.0, w: 9, h: 0.4,
  fontFace: FONT_B, fontSize: 13, color: C.gray, align: "center"
});
s2.addText("Format: 10 Episodes per Season  •  60–75 Minutes Each", {
  x: 0.5, y: 4.4, w: 9, h: 0.4,
  fontFace: FONT_B, fontSize: 13, color: C.gray, align: "center"
});

// ============================================================
// SLIDE 3: SERIES OVERVIEW - jungle background
// ============================================================
let s3 = pres.addSlide();
s3.background = { path: "/home/assets/jungle.jpeg" };
darkOverlay(s3, 0, 0, 10, 5.625);
s3.addText("SERIES OVERVIEW", {
  x: 0.5, y: 0.4, w: 9, h: 0.6,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6
});
goldLine(s3, 0.5, 1.0, 2);
s3.addText([
  { text: "THE FIFTH SUN chronicles the rise and fall of two empires through the eyes of the men who led them — and the women, priests, warriors, and slaves caught between them.", options: { fontFace: FONT_B, fontSize: 11.5, color: C.cream, breakLine: true, paraSpaceAfter: 8 } },
  { text: "Hernán Cortés is no hero. A failed law student, a debtor, a womanizer expelled from Hispaniola, he is a man running out of second chances. When he defies Governor Velázquez and sails for the mainland with 500 men, he is committing an act of mutiny that should end in his execution.", options: { fontFace: FONT_B, fontSize: 11.5, color: C.cream, breakLine: true, paraSpaceAfter: 8 } },
  { text: "Moctezuma II is no passive king. He rules the most sophisticated civilization in the Western hemisphere, commands armies that number in the hundreds of thousands, and oversees a system of tributary states bound by terror, tribute, and blood sacrifice. But omens plague him. Comets streak the sky. A temple burns without cause. And now pale men have arrived from the sea — just as prophecy foretold.", options: { fontFace: FONT_B, fontSize: 11.5, color: C.cream, breakLine: true, paraSpaceAfter: 8 } },
  { text: "Their collision will reshape the world. But this is not the simple story of European guns defeating indigenous spears. This is a story of alliances and betrayals, of Tlaxcalan rebels who hate the Aztecs more than they fear the Spanish, of La Malinche — the enslaved woman whose tongue becomes the deadliest weapon on the continent, and of a smallpox plague that does what no army ever could.", options: { fontFace: FONT_B, fontSize: 11.5, color: C.cream } },
], {
  x: 1.2, y: 1.2, w: 7.6, h: 4.1,
  lineSpacingMultiple: 1.3, valign: "top"
});

// ============================================================
// SLIDE 4: HERNÁN CORTÉS
// ============================================================
let s4 = pres.addSlide();
s4.background = { color: C.darkCard };
s4.addImage({
  path: "/home/assets/Cortes_final.jpeg",
  x: 0, y: 0, w: 5, h: 5.625
});
s4.addShape(pres.shapes.RECTANGLE, {
  x: 5, y: 0, w: 5, h: 5.625,
  fill: { color: C.darkCard }
});
s4.addText("HERNÁN CORTÉS", {
  x: 5.4, y: 0.4, w: 4.2, h: 0.5,
  fontFace: FONT_H, fontSize: 22, color: C.gold, bold: true
});
s4.addText("The Gambler", {
  x: 5.4, y: 0.9, w: 4.2, h: 0.4,
  fontFace: FONT_H, fontSize: 14, color: C.goldLight, italic: true
});
goldLine(s4, 5.4, 1.35, 1.5);
s4.addText(
  `A man who burns his own ships to eliminate retreat. Cortés is magnetic, ruthless, and terrifyingly adaptive. He learns indigenous languages, takes indigenous lovers, and converts indigenous allies — all while planning their subjugation.

He is not a soldier. He is a lawyer who learned to fight, and his greatest weapon is his mouth. He talks his way out of execution, into alliances, and through massacres. Every smile hides a calculation.

His arc across the series traces the cost of ambition: from charming rogue to architect of genocide, never once believing himself a villain.`,
  {
    x: 5.4, y: 1.55, w: 4.2, h: 3.5,
    fontFace: FONT_B, fontSize: 11, color: C.lightGray,
    lineSpacingMultiple: 1.35, valign: "top"
  }
);
s4.addText("PROTAGONIST", {
  x: 0.4, y: 4.8, w: 4.2, h: 0.4,
  fontFace: FONT_B, fontSize: 10, color: C.cream, charSpacing: 4, bold: true
});

// ============================================================
// SLIDE 5: MOCTEZUMA II
// ============================================================
let s5 = pres.addSlide();
s5.background = { color: C.darkCard };
s5.addImage({
  path: "/home/assets/Moctezuma_final.jpeg",
  x: 0, y: 0, w: 5, h: 5.625
});
s5.addShape(pres.shapes.RECTANGLE, {
  x: 5, y: 0, w: 5, h: 5.625,
  fill: { color: C.darkCard }
});
s5.addText("MOCTEZUMA II", {
  x: 5.4, y: 0.4, w: 4.2, h: 0.5,
  fontFace: FONT_H, fontSize: 22, color: C.gold, bold: true
});
s5.addText("The God-King", {
  x: 5.4, y: 0.9, w: 4.2, h: 0.4,
  fontFace: FONT_H, fontSize: 14, color: C.goldLight, italic: true
});
goldLine(s5, 5.4, 1.35, 1.5);
s5.addText(
  `Ruler of the most powerful empire in the Americas. Moctezuma is a philosopher-king trapped between pragmatism and prophecy. He has conquered dozens of city-states, but now the gods themselves seem to be sending warnings.

He is not weak — he is paralyzed by intelligence. He sees every angle, considers every possibility, and in doing so, hesitates at the one moment hesitation is fatal. His hospitality toward Cortés is not naiveté. It is a calculated gambit to study his enemy from within. It simply fails.

His arc is Shakespearean tragedy: a brilliant man undone by the very qualities — patience, deliberation, piety — that made him great.`,
  {
    x: 5.4, y: 1.55, w: 4.2, h: 3.5,
    fontFace: FONT_B, fontSize: 11, color: C.lightGray,
    lineSpacingMultiple: 1.35, valign: "top"
  }
);
s5.addText("PROTAGONIST", {
  x: 0.4, y: 4.8, w: 4.2, h: 0.4,
  fontFace: FONT_B, fontSize: 10, color: C.cream, charSpacing: 4, bold: true
});

// ============================================================
// SLIDE 6: SUPPORTING CHARACTERS - with portraits
// ============================================================
let s6 = pres.addSlide();
s6.background = { color: C.darkBg };
s6.addText("KEY CHARACTERS", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6
});
goldLine(s6, 0.5, 0.9, 2);

const chars = [
  { name: "LA MALINCHE", role: "The Tongue", desc: "Enslaved, gifted to Cortés, she becomes his translator, advisor, and lover. The most powerful person in every room — and the most invisible.", img: "/home/assets/malinche.jpeg" },
  { name: "PEDRO DE ALVARADO", role: "The Butcher", desc: "Cortés's golden-haired lieutenant. Charismatic, impulsive, and catastrophically violent. His paranoia triggers the massacre that ignites the uprising.", img: "/home/assets/alvarado.jpeg" },
  { name: "CUAUHTÉMOC", role: "The Last Eagle", desc: "Moctezuma's nephew. Decisive, martial, and unwilling to negotiate. His 80-day defense of Tenochtitlan is the series climax.", img: "/home/assets/cuauhtemoc.jpeg" },
  { name: "XICOTENCATL", role: "The Dissenter", desc: "Tlaxcalan war chief who alone sees the Spanish for what they are. He argues against the alliance, is overruled, and watches his nation become the instrument of empire.", img: "/home/assets/xicotencatl.jpeg" },
];

for (let i = 0; i < 4; i++) {
  const x = 0.4 + i * 2.4;
  const c = chars[i];
  const imgW = 2.0;
  const imgH = 2.0 * (1168 / 784);
  s6.addImage({ path: c.img, x: x, y: 1.15, w: imgW, h: imgH, sizing: { type: "cover", w: imgW, h: 2.2 } });
  s6.addText(c.name, { x: x, y: 3.4, w: imgW, h: 0.3, fontFace: FONT_H, fontSize: 10.5, color: C.gold, bold: true, align: "center", margin: 0 });
  s6.addText(c.role, { x: x, y: 3.65, w: imgW, h: 0.25, fontFace: FONT_H, fontSize: 9.5, color: C.goldLight, italic: true, align: "center", margin: 0 });
  s6.addText(c.desc, { x: x, y: 3.95, w: imgW, h: 1.4, fontFace: FONT_B, fontSize: 8.5, color: C.lightGray, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.2 });
}

// ============================================================
// SLIDE 7: PILOT EPISODE
// ============================================================
let s7 = pres.addSlide();
s7.background = { path: "/home/assets/temple.jpeg" };
darkOverlay(s7, 0, 0, 10, 5.625);
s7.addText("PILOT EPISODE", {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6
});
goldLine(s7, 0.5, 0.8, 2);
s7.addText('"THE PROPHECY"', {
  x: 0.5, y: 1.0, w: 9, h: 0.6,
  fontFace: FONT_H, fontSize: 28, color: C.cream, bold: true, align: "center"
});
s7.addText(`The pilot opens in Tenochtitlan, 1518, as a comet tears across the sky above the Great Temple. Moctezuma watches from his chambers. His priests dismiss it. His face says he knows better. Six months later in Cuba, Hernán Cortés learns he has been appointed to lead an expedition to the mainland — and that the governor is already moving to revoke the commission. He has twelve hours. By dawn, he has commandeered eleven ships, rallied 500 men, and earned a death warrant.

During the crossing, we meet the ensemble who will carry the series: Alvarado, the violent golden boy; Bernal Díaz, the chronicler who writes everything down; and Gerónimo de Aguilar, the shipwrecked priest who speaks Maya. On landfall at Cozumel, the Spanish make first contact with Maya traders. Cortés sees gold, but he sees something far more valuable — information. He learns of a vast empire inland, ruled by a king who drinks from golden cups. Among the gifts presented to the Spanish is a slave girl who speaks both Maya and Nahuatl. Her name is Malinalli, and she will become the deadliest weapon on the continent.

The episode closes on a parallel image: Cortés standing on a beach, looking inland; Moctezuma standing on his temple, looking east. Neither knows the other exists. Both sense that something fundamental has shifted in the world.`, {
  x: 0.6, y: 1.7, w: 8.8, h: 3.7,
  fontFace: FONT_B, fontSize: 11, color: C.cream,
  lineSpacingMultiple: 1.35, valign: "top"
});

// ============================================================
// SLIDE 8: VISUAL LANGUAGE (moved from original position 11)
// ============================================================
let s8 = pres.addSlide();
s8.background = { path: "/home/assets/language.jpeg" };
darkOverlay(s8, 0, 0, 10, 5.625);
s8.addText("VISUAL LANGUAGE", {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6
});
goldLine(s8, 0.5, 0.8, 2);
s8.addText("DUAL VISUAL GRAMMARS", {
  x: 0.5, y: 1.2, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 20, color: C.cream, bold: true, align: "center"
});

s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 4.2, h: 2.2, fill: { color: C.darkCard } });
s8.addText("THE SPANISH WORLD", { x: 0.7, y: 2.3, w: 3.8, h: 0.2, fontFace: FONT_H, fontSize: 13, color: C.gold, bold: true });
s8.addText("Handheld camera, natural light, mud and iron. The Spanish occupy cramped ships, swampy coasts, and alien jungles. Their world is claustrophobic, paranoid, and lit by firelight. Think Ridley Scott meets Terrence Malick — The New World but with teeth.", {
  x: 0.7, y: 2.45, w: 3.8, h: 1.8, fontFace: FONT_B, fontSize: 10.5, color: C.lightGray, lineSpacingMultiple: 1.3
});

s8.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 2.1, w: 4.2, h: 2.2, fill: { color: C.darkCard } });
s8.addText("THE AZTEC WORLD", { x: 5.5, y: 2.3, w: 3.8, h: 0.2, fontFace: FONT_H, fontSize: 13, color: C.gold, bold: true });
s8.addText("Symmetrical framing, saturated color, monumental scale. Tenochtitlan is shot like a dream — massive pyramids, floating gardens, markets larger than any European city. The camera moves slowly, formally, like ritual. When it breaks from this grammar, something sacred has been violated.", {
  x: 5.5, y: 2.45, w: 3.8, h: 1.8, fontFace: FONT_B, fontSize: 10.5, color: C.lightGray, lineSpacingMultiple: 1.3
});

// ============================================================
// SLIDE 9: AUDIENCE & COMPARABLES (moved from original position 12)
// ============================================================
let s9 = pres.addSlide();
s9.background = { color: C.darkBg };
s9.addText("AUDIENCE & COMPARABLES", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
goldLine(s9, 0.5, 0.8, 2);

s9.addText([
  { text: "TARGET AUDIENCE\n", options: { fontFace: FONT_H, fontSize: 14, color: C.cream, bold: true, breakLine: true, paraSpaceAfter: 4 } },
  { text: "Adults 18–54 who watch prestige drama. Fans of historical epics, morally complex fantasy, and the massive underserved Latino and Latin American market. 580 million Spanish speakers worldwide, the conquest of Mexico taught in schools across the Americas, and a story that has never been told at this scale.", options: { fontFace: FONT_B, fontSize: 10.5, color: C.lightGray } },
], { x: 0.5, y: 1.0, w: 9, h: 1.4, valign: "top" });

const posters = [
  { path: "/home/assets/poster_got.jpg", title: "Game of Thrones" },
  { path: "/home/assets/poster_rome.jpg", title: "Rome" },
  { path: "/home/assets/poster_vikings.jpg", title: "Vikings" },
  { path: "/home/assets/poster_shogun.jpg", title: "Shōgun" },
  { path: "/home/assets/poster_apocalypto.jpg", title: "Apocalypto" },
];

for (let i = 0; i < 5; i++) {
  const x = 0.5 + i * 1.9;
  const p = posters[i];
  s9.addImage({ path: p.path, x: x, y: 2.5, w: 1.7, h: 2.5, sizing: { type: "cover", w: 1.7, h: 2.5 } });
  s9.addText(p.title, { x: x, y: 5.05, w: 1.7, h: 0.3, fontFace: FONT_H, fontSize: 9, color: C.goldLight, align: "center", margin: 0 });
}

// ============================================================
// SLIDE 10: THE WORLD - TENOCHTITLAN (moved from original position 13)
// ============================================================
let s10 = pres.addSlide();
s10.background = { path: "/home/assets/Tenoch.jpeg" };
darkOverlay(s10, 0, 0, 10, 5.625);
s10.addText("THE WORLD", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
goldLine(s10, 0.5, 0.8, 2);
s10.addText("TENOCHTITLAN", { x: 0.5, y: 1.1, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 22, color: C.cream, bold: true, align: "center" });
s10.addText(`A city of 200,000 on a lake, larger than any European capital. Floating gardens feed its population. Causeways link it to the mainland. Aqueducts carry fresh water from the mountains. Pyramids rise above marketplaces where 60,000 people trade daily. This is not a primitive village. This is one of the greatest cities in human history — and the Spanish will destroy it in 80 days.

The series recreates this world at full scale: the temple precinct where 20,000 gather for festivals, the palace complex with its aviaries and gardens, the canals teeming with canoe traffic, and the mountains beyond where the Tlaxcalan republic maintains its independence through constant, bloody warfare against the Aztec empire.

Both worlds are rendered with equal grandeur and equal honesty. The Spanish world includes its Inquisition, its slavery, its feudal cruelty. The Aztec world includes its human sacrifice, its flower wars, its tributary oppression. There are no noble savages. There are no righteous conquerors. There are only human beings, making terrible choices in extraordinary circumstances.`, {
  x: 0.5, y: 1.7, w: 9, h: 3.5, fontFace: FONT_B, fontSize: 11, color: C.cream, lineSpacingMultiple: 1.3, align: "center"
});

// ============================================================
// SLIDE 11: THE WORLD - YUCATÁN (moved from original position 14)
// ============================================================
let s11 = pres.addSlide();
s11.background = { path: "/home/assets/yucatan.jpeg" };
darkOverlay(s11, 0, 0, 10, 5.625);
s11.addText("THE WORLD", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
goldLine(s11, 0.5, 0.8, 2);
s11.addText("THE YUCATÁN COAST", { x: 0.5, y: 1.1, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 22, color: C.cream, bold: true, align: "center" });
s11.addText(`Where the Old World meets the New. In February 1519, Cortés's eleven ships make landfall on the coast of the Yucatán — a land of Maya city-states, dense jungle, and ancient trade routes that stretch deep into the continent.

This is not the empire. The Yucatán is its frontier — a place of first contact, first misunderstanding, and first blood. Here the Spanish encounter Maya traders who speak of a vast civilization inland, a king who commands hundreds of thousands, and cities built on water. Here Cortés acquires his two most important weapons: Gerónimo de Aguilar, a shipwrecked priest who speaks Maya, and Malinalli, an enslaved woman who speaks both Maya and Nahuatl.

The coast is humid, alien, and hostile. Mangrove swamps, mosquitoes, tropical storms. The Spanish are sick, terrified, and completely out of their depth. Every step inland takes them further from the ships — and closer to a world they cannot yet imagine.`, {
  x: 0.5, y: 1.7, w: 9, h: 3.5, fontFace: FONT_B, fontSize: 11, color: C.cream, lineSpacingMultiple: 1.3, align: "center"
});

// ============================================================
// SLIDE 12: THE WORLD - THE ROUTE INLAND (moved from original position 15)
// ============================================================
let s12 = pres.addSlide();
s12.background = { path: "/home/assets/path.jpeg" };
darkOverlay(s12, 0, 0, 10, 5.625);
s12.addText("THE WORLD", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
goldLine(s12, 0.5, 0.8, 2);
s12.addText("THE ROUTE THROUGH MEXICO", { x: 0.5, y: 1.1, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 22, color: C.cream, bold: true, align: "center" });
s12.addText(`Three hundred miles of jungle, mountain, and hostile territory separate the coast from the Aztec capital. The march inland is the spine of Season One — a journey through landscapes that shift from tropical lowland to volcanic highland, each with its own peoples, languages, and loyalties.

The Spanish pass through the territories of the Totonacs, who secretly despise their Aztec overlords and see the strangers as potential liberators. They cross into Tlaxcala, a fiercely independent republic surrounded on all sides by the Aztec empire, where they fight four pitched battles before forging the alliance that will change everything.

The landscape itself is a character. Dense jungle gives way to pine forest. River valleys open into vast plateaus ringed by snow-capped volcanoes. And then, from the pass between Popocatépetl and Iztaccíhuatl, the Spanish see it for the first time: Tenochtitlan, shimmering on its lake, more magnificent than anything in Europe. The men weep. Some believe they are dreaming.`, {
  x: 0.5, y: 1.7, w: 9, h: 3.5, fontFace: FONT_B, fontSize: 11, color: C.cream, lineSpacingMultiple: 1.3, align: "center"
});

// ============================================================
// SLIDE 13: SERIES STRUCTURE (moved from original position 8)
// Now uses camp.jpeg background with overlay instead of solid darkBg
// ============================================================
let s13 = pres.addSlide();
s13.background = { path: "/home/assets/camp.jpeg" };
darkOverlay(s13, 0, 0, 10, 5.625);
s13.addText("SERIES STRUCTURE", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.8, w: 2, h: 0.02, fill: { color: C.gold } });

s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.4, w: 4.3, h: 3.0, fill: { color: C.darkCard } });
s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.4, w: 4.3, h: 0.06, fill: { color: C.gold } });
s13.addText([
  { text: "SEASON ONE", options: { fontFace: FONT_H, fontSize: 18, color: C.gold, bold: true, breakLine: true } },
  { text: "THE ARRIVAL", options: { fontFace: FONT_H, fontSize: 12, color: C.goldLight, italic: true, breakLine: true, paraSpaceAfter: 6 } },
  { text: "10 Episodes  •  60–75 min each", options: { fontFace: FONT_B, fontSize: 10, color: C.gray, breakLine: true, paraSpaceAfter: 8 } },
  { text: "From Cortés's defiant departure from Cuba through the first entry into Tenochtitlan, the alliance with Tlaxcala, the growing tensions inside the Aztec capital, and the catastrophic La Noche Triste that leaves the Spanish broken and fleeing.", options: { fontFace: FONT_B, fontSize: 11, color: C.lightGray } },
], { x: 0.8, y: 1.55, w: 3.7, h: 2.7, valign: "top", lineSpacingMultiple: 1.2 });

s13.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.4, w: 4.3, h: 3.0, fill: { color: C.darkCard } });
s13.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.4, w: 4.3, h: 0.06, fill: { color: C.gold } });
s13.addText([
  { text: "SEASON TWO", options: { fontFace: FONT_H, fontSize: 18, color: C.gold, bold: true, breakLine: true } },
  { text: "THE SIEGE", options: { fontFace: FONT_H, fontSize: 12, color: C.goldLight, italic: true, breakLine: true, paraSpaceAfter: 6 } },
  { text: "10 Episodes  •  60–75 min each", options: { fontFace: FONT_B, fontSize: 10, color: C.gray, breakLine: true, paraSpaceAfter: 8 } },
  { text: "The 80-day siege of Tenochtitlan. Cortés rebuilds his army with indigenous allies, constructs a fleet on the lake, and wages the most devastating urban battle the Americas have ever seen. Cuauhtémoc rises as the final defender of a dying world.", options: { fontFace: FONT_B, fontSize: 11, color: C.lightGray } },
], { x: 5.5, y: 1.55, w: 3.7, h: 2.7, valign: "top", lineSpacingMultiple: 1.2 });
s13.addText("20 TOTAL EPISODES  •  2 SEASONS  •  COMPLETE STORY", { x: 0.5, y: 5.1, w: 9, h: 0.3, fontFace: FONT_B, fontSize: 11, color: C.gold, align: "center", charSpacing: 2 });

// ============================================================
// SLIDE 14: SEASON ONE EPISODES (moved from original position 9)
// Now uses interior.jpeg background with overlay instead of solid darkBg
// ============================================================
let s14 = pres.addSlide();
s14.background = { path: "/home/assets/interior.jpeg" };
darkOverlay(s14, 0, 0, 10, 5.625);
s14.addText("SEASON ONE  —  THE ARRIVAL", {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 4
});
s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.8, w: 2, h: 0.02, fill: { color: C.gold } });

const s1eps = [
  { num: "01", title: "The Burning Ships", desc: "Cortés defies the governor, assembles his fleet, and makes landfall." },
  { num: "02", title: "The Tongue", desc: "Malinalli is gifted to the Spanish. She begins translating — and calculating." },
  { num: "03", title: "Gifts of Gold", desc: "Moctezuma sends lavish gifts to buy off the strangers. The gold achieves the opposite." },
  { num: "04", title: "The Republic of Blood", desc: "Cortés fights four brutal battles before Tlaxcala agrees to an alliance." },
  { num: "05", title: "Cholula", desc: "Cortés massacres thousands, claiming a preemptive strike. Malinche provided the intelligence." },
  { num: "06", title: "The Causeway", desc: "The Spanish enter Tenochtitlan for the first time. They cannot believe what they see." },
  { num: "07", title: "Guest and Prisoner", desc: "Moctezuma welcomes Cortés into the palace. Hospitality becomes hostage-taking." },
  { num: "08", title: "Narváez", desc: "Velázquez sends 900 men to arrest Cortés. Cortés leaves Alvarado in charge." },
  { num: "09", title: "The Toxcatl Massacre", desc: "Alvarado slaughters Aztec nobles during a religious festival. Tenochtitlan erupts." },
  { num: "10", title: "La Noche Triste", desc: "The Spanish flee by night. Hundreds die on the causeways. Moctezuma is killed." },
];

for (let i = 0; i < 5; i++) {
  const left = s1eps[i];
  const right = s1eps[i + 5];
  const yBase = 1.05 + i * 0.88;
  s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yBase, w: 4.3, h: 0.78, fill: { color: C.darkCard } });
  s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yBase, w: 4.3, h: 0.04, fill: { color: C.gold } });
  s14.addText(left.num + ".  " + left.title, { x: 0.65, y: yBase + 0.1, w: 4.0, h: 0.25, fontFace: FONT_H, fontSize: 11, color: C.gold, bold: true, margin: 0 });
  s14.addText(left.desc, { x: 0.65, y: yBase + 0.32, w: 4.0, h: 0.42, fontFace: FONT_B, fontSize: 9, color: C.lightGray, valign: "middle", margin: 0 });
  s14.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: yBase, w: 4.3, h: 0.78, fill: { color: C.darkCard } });
  s14.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: yBase, w: 4.3, h: 0.04, fill: { color: C.gold } });
  s14.addText(right.num + ".  " + right.title, { x: 5.35, y: yBase + 0.1, w: 4.0, h: 0.25, fontFace: FONT_H, fontSize: 11, color: C.gold, bold: true, margin: 0 });
  s14.addText(right.desc, { x: 5.35, y: yBase + 0.32, w: 4.0, h: 0.42, fontFace: FONT_B, fontSize: 9, color: C.lightGray, valign: "middle", margin: 0 });
}

// ============================================================
// SLIDE 15: SEASON TWO EPISODES (moved from original position 10)
// Now uses village.jpeg background with overlay instead of solid darkBg
// ============================================================
let s15 = pres.addSlide();
s15.background = { path: "/home/assets/village.jpeg" };
darkOverlay(s15, 0, 0, 10, 5.625);
s15.addText("SEASON TWO  —  THE SIEGE", {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 4
});
s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.8, w: 2, h: 0.02, fill: { color: C.gold } });

const s2eps = [
  { num: "01", title: "Ashes and Embers", desc: "Cortés regroups in Tlaxcala. The Spanish are broken, and Cortés is more dangerous than ever." },
  { num: "02", title: "The Invisible Army", desc: "Smallpox arrives in Tenochtitlan. Cuitláhuac, Moctezuma's successor, dies within weeks." },
  { num: "03", title: "The Last Eagle Rises", desc: "Cuauhtémoc takes the throne. He begins fortifying the city and building an army." },
  { num: "04", title: "Thirteen Brigantines", desc: "Cortés builds warships to assault a lake-city. Tlaxcalans carry them over mountains." },
  { num: "05", title: "Scorched Causeways", desc: "The siege begins. Cortés cuts the aqueducts. Tenochtitlan begins to starve." },
  { num: "06", title: "House by House", desc: "Urban warfare in a floating city. Both sides descend into atrocity." },
  { num: "07", title: "The Dissenter's End", desc: "Xicotencatl the Younger attempts to defect. Cortés has him hanged." },
  { num: "08", title: "Flowers and Songs", desc: "The women of Tenochtitlan organize resistance. The city eats leather, then bark, then nothing." },
  { num: "09", title: "The Lake Runs Red", desc: "The final naval battle on Lake Texcoco. Cuauhtémoc is captured. He asks Cortés to kill him." },
  { num: "10", title: "New Spain", desc: "The fall of Tenochtitlan. The Fifth Sun has ended. A new world begins on the bones of the old." },
];

for (let i = 0; i < 5; i++) {
  const left = s2eps[i];
  const right = s2eps[i + 5];
  const yBase = 1.05 + i * 0.88;
  s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yBase, w: 4.3, h: 0.78, fill: { color: C.darkCard } });
  s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yBase, w: 4.3, h: 0.04, fill: { color: C.gold } });
  s15.addText(left.num + ".  " + left.title, { x: 0.65, y: yBase + 0.1, w: 4.0, h: 0.25, fontFace: FONT_H, fontSize: 11, color: C.gold, bold: true, margin: 0 });
  s15.addText(left.desc, { x: 0.65, y: yBase + 0.32, w: 4.0, h: 0.42, fontFace: FONT_B, fontSize: 9, color: C.lightGray, valign: "middle", margin: 0 });
  s15.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: yBase, w: 4.3, h: 0.78, fill: { color: C.darkCard } });
  s15.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: yBase, w: 4.3, h: 0.04, fill: { color: C.gold } });
  s15.addText(right.num + ".  " + right.title, { x: 5.35, y: yBase + 0.1, w: 4.0, h: 0.25, fontFace: FONT_H, fontSize: 11, color: C.gold, bold: true, margin: 0 });
  s15.addText(right.desc, { x: 5.35, y: yBase + 0.32, w: 4.0, h: 0.42, fontFace: FONT_B, fontSize: 9, color: C.lightGray, valign: "middle", margin: 0 });
}

// ============================================================
// SLIDE 16: THEMES & TONE
// ============================================================
let s16 = pres.addSlide();
s16.background = { path: "/home/assets/treasure.jpeg" };
darkOverlay(s16, 0, 0, 10, 5.625);
s16.addText("THEMES & TONE", {
  x: 0.5, y: 0.3, w: 9, h: 0.5,
  fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6
});
goldLine(s16, 0.5, 0.8, 2);

const themes = [
  { title: "THE MYTH OF\nDISCOVERY", desc: "There is no \"new\" world. There are only worlds that have not yet collided. The series dismantles the colonial narrative from within." },
  { title: "POWER AND\nITS PRICE", desc: "Every character who reaches for power loses something essential. Cortés loses his humanity. Moctezuma loses his agency. Malinche loses her name." },
  { title: "TRANSLATION\nAS WEAPON", desc: "Language is the invisible battlefield. Malinche controls what each side hears. Misunderstandings drive the plot as much as swords." },
  { title: "PROPHECY VS.\nPRAGMATISM", desc: "The tension between religious destiny and political calculation runs through both civilizations. Both sides believe God is on their side. Both are wrong." },
  { title: "THE END\nOF WORLDS", desc: "In Aztec cosmology, we live in the age of the Fifth Sun — the last age before destruction. The series title is a promise." },
];

for (let i = 0; i < 3; i++) {
  const x = 0.5 + i * 3.1;
  const t = themes[i];
  s16.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.1, w: 2.8, h: 2.0, fill: { color: C.darkCard } });
  s16.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.1, w: 2.8, h: 0.04, fill: { color: C.gold } });
  s16.addText(t.title, { x: x + 0.2, y: 1.2, w: 2.4, h: 0.65, fontFace: FONT_H, fontSize: 13, color: C.gold, bold: true, valign: "top", margin: 0 });
  s16.addText(t.desc, { x: x + 0.2, y: 1.9, w: 2.4, h: 1.05, fontFace: FONT_B, fontSize: 9.5, color: C.lightGray, valign: "top", margin: 0, lineSpacingMultiple: 1.2 });
}

for (let i = 0; i < 2; i++) {
  const x = 2.05 + i * 3.1;
  const t = themes[i + 3];
  s16.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.35, w: 2.8, h: 2.0, fill: { color: C.darkCard } });
  s16.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.35, w: 2.8, h: 0.04, fill: { color: C.gold } });
  s16.addText(t.title, { x: x + 0.2, y: 3.45, w: 2.4, h: 0.65, fontFace: FONT_H, fontSize: 13, color: C.gold, bold: true, valign: "top", margin: 0 });
  s16.addText(t.desc, { x: x + 0.2, y: 4.15, w: 2.4, h: 1.05, fontFace: FONT_B, fontSize: 9.5, color: C.lightGray, valign: "top", margin: 0, lineSpacingMultiple: 1.2 });
}

// ============================================================
// SLIDE 17: LANGUAGE & AUTHENTICITY
// ============================================================
let s17 = pres.addSlide();
s17.background = { path: "/home/assets/interior.jpeg" };
darkOverlay(s17, 0, 0, 10, 5.625);
s17.addText("LANGUAGE & AUTHENTICITY", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
goldLine(s17, 0.5, 0.8, 2);
s17.addText("Following the Shōgun model, The Fifth Sun commits to multilingual authenticity.", {
  x: 0.5, y: 0.95, w: 9, h: 0.4, fontFace: FONT_H, fontSize: 13, color: C.cream, italic: true
});

const langs = [
  { title: "NAHUATL", desc: "All Aztec characters speak Nahuatl among themselves. Written with language consultants and performed by native speakers. Subtitled." },
  { title: "16TH-CENTURY\nSPANISH", desc: "Period-appropriate Castilian. Crude, profane, immediate — soldiers' Spanish, not court Spanish. Subtitled." },
  { title: "ENGLISH", desc: "Interior monologue and select narration only. An intimate layer bridging the audience to characters who speak neither language." },
  { title: "MAYA &\nTOTONAC", desc: "Coastal peoples speak their own languages. Every misunderstanding is a potential catastrophe, making Malinche's role as translator essential." },
];

for (let i = 0; i < 4; i++) {
  const x = 0.5 + i * 2.35;
  const l = langs[i];
  s17.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.9, w: 2.15, h: 2.2, fill: { color: C.darkCard } });
  s17.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.9, w: 2.15, h: 0.04, fill: { color: C.gold } });
  s17.addText(l.title, { x: x + 0.15, y: 2.0, w: 1.85, h: 0.5, fontFace: FONT_H, fontSize: 13, color: C.gold, bold: true, valign: "top", margin: 0 });
  s17.addText(l.desc, { x: x + 0.15, y: 2.55, w: 1.85, h: 1.4, fontFace: FONT_B, fontSize: 9.5, color: C.lightGray, valign: "top", margin: 0, lineSpacingMultiple: 1.25 });
}

// ============================================================
// SLIDE 18: WHY NOW
// ============================================================
let s18 = pres.addSlide();
s18.background = { path: "/home/assets/village.jpeg" };
darkOverlay(s18, 0, 0, 10, 5.625);
s18.addText("WHY NOW", { x: 0.5, y: 0.3, w: 9, h: 0.5, fontFace: FONT_H, fontSize: 14, color: C.gold, charSpacing: 6 });
goldLine(s18, 0.5, 0.8, 2);

s18.addText("The most dramatic event in Western Hemisphere history has never been the subject of a major television series.", {
  x: 0.5, y: 1.05, w: 9, h: 0.7,
  fontFace: FONT_H, fontSize: 18, color: C.cream, bold: true, align: "center"
});

const whyStats = [
  { stat: "580M+", label: "SPANISH SPEAKERS", desc: "The largest underserved audience in premium television. No major series has ever centered their history at this scale." },
  { stat: "ZERO", label: "SERIES EXIST", desc: "Rome has been dramatized dozens of times. Viking sagas fill streaming catalogs. The fall of the Aztec Empire remains completely untold." },
  { stat: "25", label: "EMMY NOMINATIONS", desc: "Shōgun proved that multilingual, subtitle-driven prestige drama is not a risk. It is the future of the medium." },
];

for (let i = 0; i < 3; i++) {
  const x = 0.5 + i * 3.1;
  const s = whyStats[i];
  s18.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.0, w: 2.8, h: 2.8, fill: { color: C.darkCard } });
  s18.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.0, w: 2.8, h: 0.04, fill: { color: C.gold } });
  s18.addText(s.stat, { x: x + 0.2, y: 2.15, w: 2.4, h: 0.6, fontFace: FONT_H, fontSize: 32, color: C.gold, bold: true, valign: "top", margin: 0 });
  s18.addText(s.label, { x: x + 0.2, y: 2.75, w: 2.4, h: 0.25, fontFace: FONT_H, fontSize: 9, color: C.goldLight, bold: true, valign: "top", margin: 0, charSpacing: 2 });
  s18.addText(s.desc, { x: x + 0.2, y: 3.1, w: 2.4, h: 1.5, fontFace: FONT_B, fontSize: 10, color: C.lightGray, valign: "top", margin: 0, lineSpacingMultiple: 1.25 });
}

s18.addText("500+ years since the conquest. Nations across Latin America are reexamining their colonial origins. The cultural moment is now.", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontFace: FONT_B, fontSize: 10, color: C.goldLight, italic: true, align: "center"
});

// ============================================================
// SLIDE 19: CLOSING
// ============================================================
let s19 = pres.addSlide();
s19.background = { path: "/home/assets/Ship.jpeg" };
darkOverlay(s19, 0, 0, 10, 5.625);
s19.addText("THE FIFTH SUN", {
  x: 0.5, y: 0.7, w: 9, h: 1.0,
  fontFace: FONT_H, fontSize: 48, color: C.gold, bold: true, align: "center", charSpacing: 6
});
goldLine(s19, 3.5, 1.8, 3);
s19.addText('"When the sun sets on one world, it rises on another.\nThe question is: who survives the night."', {
  x: 1, y: 2.0, w: 8, h: 0.8,
  fontFace: FONT_H, fontSize: 15, color: C.cream, italic: true, align: "center", lineSpacingMultiple: 1.5
});
s19.addText([
  { text: "For inquiries, please contact:\n", options: { fontFace: FONT_B, fontSize: 10, color: C.cream, breakLine: true, paraSpaceAfter: 6 } },
  { text: "Alexandra Reyes  •  Producer & Creator\n", options: { fontFace: FONT_B, fontSize: 11, color: C.cream, breakLine: true, paraSpaceAfter: 0 } },
  { text: "alexandra@fifthsunproductions.com\n", options: { fontFace: FONT_B, fontSize: 10, color: C.goldLight, breakLine: true, paraSpaceAfter: 6 } },
  { text: "Represented by William Morris Endeavor\n", options: { fontFace: FONT_B, fontSize: 10, color: C.cream, breakLine: true, paraSpaceAfter: 0 } },
  { text: "Daniel Alvarez  •  (310) 285-9000", options: { fontFace: FONT_B, fontSize: 10, color: C.goldLight } },
], { x: 2.5, y: 3.2, w: 5, h: 1.5, align: "center", valign: "middle" });
s19.addText("HBO  •  WARNER BROS. DISCOVERY", {
  x: 0.5, y: 5.15, w: 9, h: 0.35,
  fontFace: FONT_B, fontSize: 11, color: C.goldDark, align: "center", charSpacing: 3
});

pres.writeFile({ fileName: "/home/assets/TheFifthSun_SeriesBible.pptx" })
  .then(() => console.log("DONE"))
  .catch(err => console.error(err));
