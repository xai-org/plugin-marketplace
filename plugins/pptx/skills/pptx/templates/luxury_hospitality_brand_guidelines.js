const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Meridian";
pres.title = "Meridian — Brand Guidelines & Vision";
const IMG = "/mnt/user-data/uploads/";
const img = {
  logoTaupe:`/home/assets/logo_taupe_upscaled.png`, logoWhite:`/home/assets/logo_white_upscaled.png`,
  banner:`/home/assets/banner_with_stroke.png`, swash:`/home/assets/swash_white.png`,
  hero1:`${IMG}Hero_1.jpeg`, hero2:`${IMG}Hero_2.jpg`, hero3:`${IMG}Hero_3.jpeg`,
  ext1:`${IMG}Exterior_1.jpg`, ext2:`${IMG}Exterior_2.jpeg`, ext3:`${IMG}Exterior_3.jpeg`,
  int1:`${IMG}Interior_1.jpeg`, int2:`${IMG}Interior_2.jpg`,
  exp1:`${IMG}Experience_1.jpg`, exp2:`${IMG}Experience_2.jpeg`, exp3:`${IMG}Experience_3.jpg`,
  guest:`${IMG}Guest_Profile.jpeg`, service:`${IMG}Service_Moment.jpeg`,
};
const C={cream:"FAF7F2",taupe:"B3A48A",charcoal:"2C2C2C",warmGray:"8A8178",gold:"C9B97A",white:"FFFFFF",dark:"3D3428"};
const W=13.33, H=7.5, CX=3.15, CW=9.4, IX=2.15, IW=11.18;

function addBanner(s){s.addImage({path:img.banner,x:0,y:0,w:W,h:H});}
function addBannerTitle(s,title){
  s.addText(title.toUpperCase(),{x:0.35,y:0.35,w:1.85,h:1.15,fontFace:"Century Gothic",fontSize:14,color:C.white,bold:false,italic:false,align:"center",valign:"middle",margin:0,charSpacing:2.5,lineSpacingMultiple:1.3});
  const sw=1.0,sh=sw/3.76,sx=0.35+(1.85-sw)/2;
  s.addImage({path:img.swash,x:sx,y:1.75,w:sw,h:sh});
}
function addImgSlide(s,p){s.addImage({path:p,x:IX,y:0,w:IW,h:H,sizing:{type:"cover",w:IW,h:H}});}
function addOverlay(s,t){s.addShape(pres.shapes.RECTANGLE,{x:IX,y:0,w:IW,h:H,fill:{color:C.dark,transparency:t||55}});}

// Property card: 4 diamond bullet points, location at bottom on two lines
function addPropertySlide(s,imgPath,title,loc,bullets){
  addImgSlide(s,imgPath);
  addBanner(s);
  addBannerTitle(s,title);
  // Tall thin diamond bullet as image, text at 12pt, reduced gaps
  // Each bullet block: 0.73" apart, shifted down
  bullets.forEach((b,i)=>{
    const y = 2.52 + i * 0.73;
    // Bullet text
    s.addText(b,{x:0.58,y:y,w:1.7,h:0.55,fontFace:"Century Gothic",fontSize:11,color:C.white,margin:0,align:"left",valign:"top",lineSpacingMultiple:1.2});
  });
  // Location at bottom — split into two lines, centered, font 12
  const locParts = loc.split("  \u00B7  ");
  const locY = 6.55;
  if(locParts.length === 2){
    s.addText(locParts[0],{x:0.35,y:locY-0.25,w:1.85,h:0.25,fontFace:"Century Gothic",fontSize:12,color:C.white,margin:0,align:"center",charSpacing:1.5});
    s.addText(locParts[1],{x:0.35,y:locY,w:1.85,h:0.25,fontFace:"Century Gothic",fontSize:12,color:C.white,margin:0,align:"center",charSpacing:1.5});
  } else {
    s.addText(loc,{x:0.35,y:locY,w:1.85,h:0.25,fontFace:"Century Gothic",fontSize:12,color:C.white,margin:0,align:"center",charSpacing:1.5});
  }
}

const geo=(sz,o={})=>({fontFace:"Bodoni MT",fontSize:sz,color:o.color||C.charcoal,bold:false,italic:o.italic||false,align:o.align||"left",valign:o.valign||"top",margin:0,...o});
const cal=(sz,o={})=>({fontFace:"Century Gothic",fontSize:sz,color:o.color||C.charcoal,bold:false,italic:o.italic||false,align:o.align||"left",valign:o.valign||"top",margin:0,...o});
const cab=(sz,o={})=>({fontFace:"Century Gothic",fontSize:sz,color:o.color||C.warmGray,bold:false,italic:o.italic||false,align:o.align||"left",valign:o.valign||"top",margin:0,...o});

// ═══════════════════════════════════════════
// S1 — Title
(()=>{const s=pres.addSlide();s.background={color:C.taupe};const m=0.25;
s.addShape(pres.shapes.RECTANGLE,{x:m,y:m,w:W-m*2,h:H-m*2,fill:{color:"000000",transparency:100},line:{color:C.white,width:0.75}});
const bW=4.2,bH=2.5,bX=(W-bW)/2,bY=1.14;
s.addShape(pres.shapes.RECTANGLE,{x:bX,y:bY,w:bW,h:bH,fill:{color:C.white},line:{color:C.white,width:1.5}});
const lW=3.2,lH=lW*(1266/2651),lX=bX+(bW-lW)/2,lY=bY+(bH-lH)/2;
s.addImage({path:img.logoTaupe,x:lX,y:lY,w:lW,h:lH});
s.addText("Beyond the known.",{x:0,y:4.49,w:W,h:0.7,...geo(30,{color:C.white,italic:true,align:"center"})});
s.addText("BESPOKE HOSPITALITY COLLECTION",{x:0,y:5.29,w:W,h:0.5,...cab(14,{color:C.white,align:"center",charSpacing:6})});
s.addText("BRAND GUIDELINES & VISION",{x:0,y:6.5,w:W,h:0.4,...cab(14,{color:C.dark,align:"center",charSpacing:3})});
})();

// S2 — Brand Manifesto
(()=>{const s=pres.addSlide();s.background={color:C.cream};
addImgSlide(s,img.hero3);addOverlay(s,35);addBanner(s);addBannerTitle(s,"Brand\nManifesto");
s.addText([
  {text:"MERIDIAN EXISTS FOR THOSE WHO HAVE SEEN EVERYTHING, AND STILL SEEK MORE.",options:{breakLine:true}},
  {text:"",options:{breakLine:true,fontSize:14}},
  {text:"NOT LOUDER. NOT FARTHER. DEEPER.",options:{breakLine:true}},
  {text:"",options:{breakLine:true,fontSize:14}},
  {text:"EVERY JOURNEY A PRIVATE ACT OF DISCOVERY.",options:{breakLine:true}},
  {text:"EVERY RETURN, A QUIET TRANSFORMATION.",options:{}},
],{x:CX+0.3,y:1.5,w:8,h:5.5,...cal(16,{color:C.white,align:"left",charSpacing:2.5,lineSpacingMultiple:1.35,valign:"bottom"})});
})();

// S3 — Brand Pillars
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"Brand\nPillars");
const ps=[
  {n:"Curated Access",d:"Entry to the unreachable. Private reserves, closed collections, sacred geographies."},
  {n:"Untouched Beauty",d:"Properties chosen for their rarity, not their fame. Places the algorithm hasn\u2019t found."},
  {n:"Singular Craft",d:"Every detail is designed, never defaulted. Nothing is templated."},
  {n:"Invisible Service",d:"Hospitality that anticipates without asking. Present when needed, absent when not."},
  {n:"Rooted Design",d:"Architecture and interiors drawn from the land itself. Local materials, local light, local craft."},
  {n:"Transformative Journey",d:"Travel that changes the traveler. Every departure a threshold, every return a quiet shift."},
];
const cw=2.7,gp=0.25,cols=3,tw=cols*cw+(cols-1)*gp,sx=CX+(CW-tw)/2;
ps.forEach((p,i)=>{const c=i%cols,r=Math.floor(i/cols),x=sx+c*(cw+gp),yBase=r===0?0.95:4.15;
s.addText(p.n,{x,y:yBase+0.1,w:cw,h:0.50,...geo(19,{align:"center",color:C.taupe,valign:"bottom"})});
s.addShape(pres.shapes.LINE,{x:x+0.3,y:yBase+0.65,w:cw-0.6,h:0,line:{color:C.gold,width:0.75}});
s.addText(p.d,{x:x+0.1,y:yBase+0.8,w:cw-0.2,h:1.8,...cal(11,{color:C.warmGray,align:"center",lineSpacingMultiple:1.4})});
});})();

// S4 — Positioning
(()=>{const s=pres.addSlide();s.background={color:C.cream};
addImgSlide(s,img.ext1);addOverlay(s,45);addBanner(s);addBannerTitle(s,"Positioning");
s.addText("MERIDIAN IS A PRIVATE HOSPITALITY COLLECTION\nFOR THOSE WHO HAVE OUTGROWN CONVENTIONAL LUXURY.",{x:3.17,y:3.0,w:9.63,h:4.0,...cal(18,{color:C.white,align:"right",charSpacing:2,lineSpacingMultiple:1.3,valign:"bottom"})});
})();

// ═══════════════════════════════════════════
// SLIDES 10-20 MOVED HERE (after S4)
// ═══════════════════════════════════════════

// S5 — The Collection
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"The\nCollection");
s.addText("Every Meridian property is a singular expression of its landscape. Architecture grows from the terrain, not onto it. Local materials, local craft, local light. There are no signature suites, no brand-standard lobbies. Each space is designed to dissolve the boundary between shelter and sky.",{x:CX,y:0.5,w:CW,h:1.0,...cal(13,{color:C.warmGray,align:"center",lineSpacingMultiple:1.4})});
const props=[
  {i:img.ext1,n:"Canopy House",l:"Costa Rica"},{i:img.ext2,n:"Sakura Pavilion",l:"Japan"},
  {i:img.ext3,n:"Serengeti Camp",l:"Tanzania"},{i:img.hero1,n:"Desert Oasis",l:"Arabian Peninsula"},
  {i:img.int2,n:"Aurora Lodge",l:"Finnish Lapland"},{i:img.hero3,n:"Cliff Villa",l:"Mediterranean"},
  {i:img.int1,n:"Metropolitan Penthouse",l:"Hong Kong"},{i:img.hero2,n:"Sea Bungalow",l:"Maldives"},
];
const tw4=2.45,th=1.55,gx=0.0,gy=0.1,cols=4,gw=cols*tw4,gsx=CX+0.4+(CW-0.4-gw)/2,gsy=1.85,rh=th+0.65+gy;
props.forEach((p,i)=>{const c=i%cols,r=Math.floor(i/cols),x=gsx+c*(tw4+gx),y=gsy+r*rh;
s.addImage({path:p.i,x,y,w:tw4,h:th,sizing:{type:"cover",w:tw4,h:th}});
s.addText(p.n,{x,y:y+th+0.04,w:tw4,h:0.25,...geo(13,{align:"center"})});
s.addText(p.l,{x,y:y+th+0.28,w:tw4,h:0.22,...cab(12,{align:"center",italic:true})});
});})();

// S7 — Serengeti Camp
(()=>{const s=pres.addSlide();s.background={color:C.cream};addPropertySlide(s,img.ext3,"Serengeti\nCamp","Tanzania  \u00B7  East Africa",["Private camp on the migration corridor","Twelve tents, no fences or roads","Personal guides and wildlife tracking","Sundowner dinners under acacia trees"]);})();

// S8 — Desert Oasis
(()=>{const s=pres.addSlide();s.background={color:C.cream};addPropertySlide(s,img.hero1,"Desert\nOasis","Arabian Peninsula  \u00B7  Middle East",["Ancient geometry palace architecture","Oasis pools fed by natural springs","Stargazing with resident astronomers","Falconry and desert expeditions"]);})();

// S9 — Aurora Lodge
(()=>{const s=pres.addSlide();s.background={color:C.cream};addPropertySlide(s,img.int2,"Aurora\nLodge","Finnish Lapland  \u00B7  Arctic Circle",["Glass domes beneath northern lights","Ice architecture and thermal spas","Reindeer and husky safaris","Midnight sun and polar nights"]);})();

// S10 — Metropolitan Penthouse
(()=>{const s=pres.addSlide();s.background={color:C.cream};addPropertySlide(s,img.int1,"Metropolitan\nPenthouse","Hong Kong  \u00B7  East Asia",["Floor-to-ceiling harbor views","Grand piano and art collection","Michelin-starred private chef","Helicopter and yacht transfers"]);})();

// S11 — Sakura Pavilion
(()=>{const s=pres.addSlide();s.background={color:C.cream};addPropertySlide(s,img.ext2,"Sakura\nPavilion","Hakone  \u00B7  Japan",["Ryokan reimagined with modern craft","Private onsen with volcanic views","Tea ceremony with local masters","Kaiseki from local ingredients"]);})();

// S12 — Adventure Excursions (no location text in edited version)
(()=>{const s=pres.addSlide();s.background={color:C.cream};
addImgSlide(s,img.exp1);addBanner(s);addBannerTitle(s,"Adventure\nExcursions");
["Sacred temple passages at dawn","Volcanic rim treks with geologists","Wildlife tracking on private reserves","Arctic and desert expeditions"].forEach((b,i)=>{
  const y = 2.52 + i * 0.73;
  s.addText(b,{x:0.58,y:y,w:1.7,h:0.55,fontFace:"Century Gothic",fontSize:11,color:C.white,margin:0,align:"left",valign:"top",lineSpacingMultiple:1.2});
});})();

// S13 — Private Charters (no location text in edited version)
(()=>{const s=pres.addSlide();s.background={color:C.cream};
addImgSlide(s,img.exp2);addBanner(s);addBannerTitle(s,"Private\nCharters");
["Helicopter coastline passages","Seaplane access to hidden coves","Superyacht island hopping","Jet transfers between properties"].forEach((b,i)=>{
  const y = 2.52 + i * 0.73;
  s.addText(b,{x:0.58,y:y,w:1.7,h:0.55,fontFace:"Century Gothic",fontSize:11,color:C.white,margin:0,align:"left",valign:"top",lineSpacingMultiple:1.2});
});})();

// S14 — Exclusive Dining (no location text in edited version)
(()=>{const s=pres.addSlide();s.background={color:C.cream};
addImgSlide(s,img.exp3);addBanner(s);addBannerTitle(s,"Exclusive\nDining");
["Volcanic terroir tasting menus","Michelin chefs in residence","Foraging with indigenous guides","Private cellar and vineyard access"].forEach((b,i)=>{
  const y = 2.52 + i * 0.73;
  s.addText(b,{x:0.58,y:y,w:1.7,h:0.55,fontFace:"Century Gothic",fontSize:11,color:C.white,margin:0,align:"left",valign:"top",lineSpacingMultiple:1.2});
});})();

// S15 — Partnerships
(()=>{const s=pres.addSlide();s.background={color:C.cream};
// Image smaller and inset from edges
s.addImage({path:img.service,x:8.8,y:0.5,w:4.0,h:6.5,sizing:{type:"cover",w:4.0,h:6.5}});
addBanner(s);addBannerTitle(s,"Partnerships\nand Access");
const lx=3.4; // consistent gap from curve
const ps2=[
  {c:"Private Aviation",d:"PLACEHOLDER"},
  {c:"Conservation and Wildlife",d:"Direct partnerships with reserves and sanctuaries worldwide"},
  {c:"Culinary Masters",d:"Collaborations with Michelin-starred chefs and indigenous food artisans"},
  {c:"Art and Auction Houses",d:"Private viewings, collection access, and artist studio visits"},
  {c:"Luxury Automotive and Marine",d:"Bespoke ground transport and private yacht charters"},
  {c:"Wellness and Spa",d:"Holistic programs with world-renowned healers and thermal traditions"},
];
ps2.forEach((p,i)=>{const y=0.7+i*1.05;
s.addText(p.c,{x:lx,y,w:5.0,h:0.35,...geo(19,{color:C.taupe})});
s.addText(p.d,{x:lx,y:y+0.38,w:5.0,h:0.35,...cal(11,{color:C.warmGray})});
if(i<ps2.length-1)s.addShape(pres.shapes.LINE,{x:lx,y:y+0.85,w:4.0,h:0,line:{color:C.gold,width:0.3,dashType:"dot"}});
});})();

// S16 — The Meridian Traveler — redesigned with consistent style
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"The Meridian\nTraveler");
const lx=3.4;
s.addImage({path:img.guest,x:lx,y:0.37,w:3.94,h:6.77,sizing:{type:"cover",w:3.94,h:6.77}});
const ts=[
  {h:"Ultra-High Net Worth",d:"$100M+, often exceeding $1B"},
  {h:"Depth Over Breadth",d:"50+ countries visited; now seeks meaning, not miles"},
  {h:"Privacy First",d:"Values access and authenticity over brand signaling"},
  {h:"Culturally Literate",d:"Intellectually curious, philanthropically active"},
  {h:"Beyond Conventional",d:"Prefers experiences unavailable through any channel"},
  {h:"Intimate Circle",d:"Travels with partner, family, or alone"},
  {h:"Invisible Service",d:"Expects hospitality that anticipates, never performs"},
];
const rx=8.49;
ts.forEach((t,i)=>{const y=0.85+i*0.88;
s.addText(t.h,{x:rx,y,w:4.84,h:0.3,...geo(19,{color:C.taupe})});
s.addText(t.d,{x:rx,y:y+0.33,w:4.84,h:0.3,...cal(11,{color:C.warmGray})});
if(i<ts.length-1)s.addShape(pres.shapes.LINE,{x:rx,y:y+0.73,w:4.0,h:0,line:{color:C.gold,width:0.3,dashType:"dot"}});
});})();

// ═══════════════════════════════════════════
// Brand guidelines section — consistent style
// ═══════════════════════════════════════════

// S17 — Voice and Language — redesigned
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"Voice and\nLanguage");
const lx=3.4;
// Left column — voice attributes
const attrs=[
  {h:"Confidence",d:"Without boasting. Authority earned, never claimed."},
  {h:"Precision",d:"Poetic but exact. Every word carries weight."},
  {h:"Restraint",d:"Silence and white space speak as loudly as language."},
  {h:"Equality",d:"We speak as peers, never as salespeople."},
];
attrs.forEach((a,i)=>{const y=0.6+i*1.05;
s.addText(a.h,{x:lx,y,w:4.5,h:0.35,...geo(19,{color:C.taupe})});
s.addText(a.d,{x:lx,y:y+0.38,w:4.5,h:0.35,...cal(11,{color:C.warmGray})});
if(i<attrs.length-1)s.addShape(pres.shapes.LINE,{x:lx,y:y+0.85,w:3.5,h:0,line:{color:C.gold,width:0.3,dashType:"dot"}});
});
// Right column — Word Palette
s.addText("Word Palette",{x:8.8,y:0.6,w:4,h:0.4,...geo(19,{color:C.taupe})});
s.addShape(pres.shapes.LINE,{x:8.8,y:1.05,w:2.2,h:0,line:{color:C.gold,width:0.5}});
// Ring arrangement — words placed around an elliptical perimeter, center open
[
  // 12 o'clock — top center
  {t:"reveal",sz:28,x:9.8,y:1.2},
  // 2 o'clock — upper right
  {t:"intention",sz:26,x:11.3,y:1.75},
  // 3 o'clock — right
  {t:"craft",sz:27,x:11.6,y:2.55},
  // 5 o'clock — lower right
  {t:"passage",sz:19,x:11.2,y:3.35},
  // 6 o'clock — bottom center
  {t:"architecture",sz:16,x:9.9,y:3.8},
  // 7 o'clock — lower left
  {t:"threshold",sz:17,x:8.5,y:3.35},
  // 9 o'clock — left
  {t:"uncharted",sz:24,x:8.15,y:2.5},
  // 11 o'clock — upper left
  {t:"converge",sz:19,x:8.6,y:1.65},
  // center — small accent word
  {t:"stillness",sz:20,x:10.1,y:2.6},
].forEach(w=>{
  s.addText(w.t,{x:w.x,y:w.y,w:2.5,h:0.6,...geo(w.sz,{italic:true,color:w.sz>20?C.taupe:C.warmGray})});
});
// Bottom sections
s.addShape(pres.shapes.LINE,{x:lx,y:5.1,w:CW-0.25,h:0,line:{color:C.gold,width:0.3}});
s.addText("We Never Say",{x:lx,y:5.3,w:4,h:0.35,...geo(19,{color:C.taupe})});
s.addText('"world-class"     "unparalleled"     "luxury redefined"     "exclusive"',{x:lx,y:5.68,w:CW-0.25,h:0.35,...cal(11,{color:C.warmGray,italic:true})});
s.addText("We Say Instead",{x:lx,y:6.15,w:4,h:0.35,...geo(19,{color:C.taupe})});
s.addText('"singular"     "unrepeatable"     "considered"     "architected"     "revealed"',{x:lx,y:6.53,w:CW-0.25,h:0.35,...cal(11,{color:C.warmGray,italic:true})});
})();

// S18 — Logo Usage — redesigned: 2 top, 1 centered below, rules fill left
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"Logo\nUsage");
const lx=3.69;
// Two swatches top row — taupe and dark
const sw4=2.5,sh4=1.7,gp4=0.3;
const topSX=7.63;
// Logo aspect ratio from upscaled image
const logoAR=2651/1266; // width/height
const logoW=sw4-0.7, logoH=logoW/logoAR; // 1.8 x 0.86
const logoPadX=0.35, logoCenterY=(sh4-logoH)/2; // vertically center logo in swatch
s.addShape(pres.shapes.RECTANGLE,{x:topSX,y:1.49,w:sw4,h:sh4,fill:{color:C.taupe}});
s.addImage({path:img.logoWhite,x:topSX+logoPadX,y:1.49+logoCenterY,w:logoW,h:logoH});
s.addText("White on Taupe",{x:topSX,y:1.11,w:sw4,h:0.3,...cal(13,{align:"center",color:C.warmGray})});
const x2=topSX+sw4+gp4;
s.addShape(pres.shapes.RECTANGLE,{x:x2,y:1.49,w:sw4,h:sh4,fill:{color:C.dark}});
s.addImage({path:img.logoTaupe,x:x2+logoPadX,y:1.49+logoCenterY,w:logoW,h:logoH});
s.addText("Taupe on Dark",{x:x2,y:1.11,w:sw4,h:0.3,...cal(13,{align:"center",color:C.warmGray})});
// White swatch centered below the two
const whiteX=topSX+(2*sw4+gp4-sw4)/2;
s.addShape(pres.shapes.RECTANGLE,{x:whiteX,y:4.19,w:sw4,h:sh4,fill:{color:C.white},line:{color:C.taupe,width:1.0}});
s.addImage({path:img.logoTaupe,x:whiteX+logoPadX,y:4.19+logoCenterY,w:logoW,h:logoH});
s.addText("Taupe on White",{x:whiteX-0.15,y:3.83,w:sw4+0.3,h:0.3,...cal(13,{align:"center",color:C.warmGray})});
// Rules — left side, spaced out to fill vertical space
const rules=[
  {h:"Minimum Size",d:"1 inch width for all reproductions"},
  {h:"Clear Space",d:"Maintain cap height of the \u2018M\u2019 on all sides"},
  {h:"No Distortion",d:"Do not rotate, stretch, or apply effects"},
  {h:"Approved Backgrounds",d:"Never place on busy or low-contrast surfaces"},
  {h:"Approved Colors Only",d:"Do not recolor beyond the brand palette"},
  {h:"Source Files",d:"Always use provided vector or high-res assets"},
];
rules.forEach((r,i)=>{const y=1.11+i*0.95;
s.addText(r.h,{x:lx,y,w:4.2,h:0.35,...geo(19,{color:C.taupe})});
s.addText(r.d,{x:lx,y:y+0.38,w:4.2,h:0.3,...cal(11,{color:C.warmGray})});
if(i<rules.length-1)s.addShape(pres.shapes.LINE,{x:lx,y:y+0.78,w:3.5,h:0,line:{color:C.gold,width:0.3,dashType:"dot"}});
});
})();

// S19 — Color Palette — redesigned
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"Color\nPalette");
const lx=3.4;
const cs=[
  {n:"Warm Cream",h:"FAF7F2",r:"RGB 250, 247, 242"},
  {n:"Warm Taupe",h:"B3A48A",r:"RGB 179, 164, 138"},
  {n:"Warm Gray",h:"8A8178",r:"RGB 138, 129, 120"},
];
const sw5=2.5,sh5=2.2,gp5=0.4,tw5=cs.length*sw5+(cs.length-1)*gp5,sx5=lx+(CW-0.25-tw5)/2;
cs.forEach((c,i)=>{const x=sx5+i*(sw5+gp5);
s.addShape(pres.shapes.RECTANGLE,{x,y:0.6,w:sw5,h:sh5,fill:{color:c.h},line:c.h==="FAF7F2"?{color:C.taupe,width:1.5}:undefined});
s.addText(c.n,{x,y:2.95,w:sw5,h:0.35,...geo(19,{align:"center",color:C.taupe})});
s.addText("#"+c.h+"  \u00B7  "+c.r,{x,y:3.3,w:sw5,h:0.25,...cal(9,{align:"center",color:C.warmGray})});
});
// Usage rules with consistent heading/description style
const usage=[
  {h:"Primary Background",d:"Warm Cream is the default background for all collateral and digital touchpoints."},
  {h:"Brand Primary",d:"Warm Taupe is used for the logo, accent shapes, and key headlines."},
  {h:"Body Text",d:"Warm Gray is reserved for body copy, captions, and secondary text elements."},
  {h:"On Dark Backgrounds",d:"White is used for text on taupe or dark backgrounds. No other colors are permitted."},
];
usage.forEach((u,i)=>{const y=3.83+i*0.72;
s.addText(u.h,{x:3.85,y,w:CW-0.25,h:0.3,...geo(17,{color:C.taupe})});
s.addText(u.d,{x:3.85,y:y+0.3,w:CW-0.25,h:0.3,...cal(11,{color:C.warmGray})});
});
// Proportions bar
s.addShape(pres.shapes.RECTANGLE,{x:lx,y:7.0,w:(CW-0.25)*0.5,h:0.2,fill:{color:C.cream},line:{color:C.taupe,width:1.0}});
s.addShape(pres.shapes.RECTANGLE,{x:lx+(CW-0.25)*0.5,y:7.0,w:(CW-0.25)*0.3,h:0.2,fill:{color:C.taupe}});
s.addShape(pres.shapes.RECTANGLE,{x:lx+(CW-0.25)*0.8,y:7.0,w:(CW-0.25)*0.2,h:0.2,fill:{color:C.warmGray}});
})();

// S20 — Typography — redesigned two-column layout
(()=>{const s=pres.addSlide();s.background={color:C.cream};addBanner(s);addBannerTitle(s,"Typography");
const lx=3.4, rx=8.5, cw=4.5;
// LEFT — Bodoni MT
s.addText("Bodoni",{x:lx,y:0.5,w:cw,h:0.6,...geo(32,{color:C.taupe})});
s.addText("Primary Typeface",{x:lx,y:1.1,w:cw,h:0.3,...cal(13,{color:C.warmGray})});
s.addShape(pres.shapes.LINE,{x:lx,y:1.5,w:cw,h:0,line:{color:C.gold,width:0.3}});
s.addText("A B C D E F G H I J K L M",{x:lx,y:1.65,w:cw,h:0.3,...geo(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("N O P Q R S T U V W X Y Z",{x:lx,y:1.95,w:cw,h:0.3,...geo(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("a b c d e f g h i j k l m",{x:lx,y:2.3,w:cw,h:0.3,...geo(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("n o p q r s t u v w x y z",{x:lx,y:2.6,w:cw,h:0.3,...geo(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("0 1 2 3 4 5 6 7 8 9",{x:lx,y:2.95,w:cw,h:0.3,...geo(13,{color:C.warmGray,charSpacing:2})});
s.addText("Headlines, taglines, property names",{x:lx,y:3.35,w:cw,h:0.25,...cal(11,{color:C.warmGray,italic:true})});
// RIGHT — Century Gothic
s.addText("Century Gothic",{x:rx,y:0.5,w:cw,h:0.6,...cal(30,{color:C.taupe})});
s.addText("Secondary Typeface",{x:rx,y:1.1,w:cw,h:0.3,...cal(13,{color:C.warmGray})});
s.addShape(pres.shapes.LINE,{x:rx,y:1.5,w:cw,h:0,line:{color:C.gold,width:0.3}});
s.addText("A B C D E F G H I J K L M",{x:rx,y:1.65,w:cw,h:0.3,...cal(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("N O P Q R S T U V W X Y Z",{x:rx,y:1.95,w:cw,h:0.3,...cal(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("a b c d e f g h i j k l m",{x:rx,y:2.3,w:cw,h:0.3,...cal(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("n o p q r s t u v w x y z",{x:rx,y:2.6,w:cw,h:0.3,...cal(13,{color:C.warmGray,charSpacing:1.5})});
s.addText("0 1 2 3 4 5 6 7 8 9",{x:rx,y:2.95,w:cw,h:0.3,...cal(13,{color:C.warmGray,charSpacing:2})});
s.addText("Body copy, descriptions, captions",{x:rx,y:3.35,w:cw,h:0.25,...cal(11,{color:C.warmGray,italic:true})});
// TYPE HIERARCHY — full width bottom section
s.addShape(pres.shapes.LINE,{x:lx,y:3.85,w:W-lx-0.4,h:0,line:{color:C.gold,width:0.3}});
s.addText("Type Hierarchy",{x:lx,y:4.0,w:4,h:0.4,...geo(19,{color:C.taupe})});
// Hierarchy examples across full width
s.addText("Slide Title",{x:lx,y:4.5,w:3,h:0.45,...geo(28,{color:C.taupe})});
s.addText("28pt Bodoni",{x:lx+3.2,y:4.6,w:2,h:0.3,...cal(10,{color:C.warmGray})});
s.addText("Subtitle Text",{x:rx,y:4.5,w:3,h:0.4,...cal(18,{color:C.warmGray})});
s.addText("18pt Century Gothic",{x:rx+3.2,y:4.55,w:2.5,h:0.3,...cal(9,{color:C.warmGray})});
s.addText("Body copy and descriptions",{x:lx,y:5.1,w:3.5,h:0.35,...cal(14,{color:C.warmGray})});
s.addText("14pt Century Gothic",{x:lx+3.2,y:5.15,w:2.5,h:0.3,...cal(9,{color:C.warmGray})});
s.addText("Caption or label text",{x:rx,y:5.1,w:3,h:0.3,...cab(11,{color:C.warmGray})});
s.addText("11pt Century Gothic",{x:rx+3.2,y:5.15,w:2.5,h:0.3,...cal(9,{color:C.warmGray})});
// RULES — bottom 2x2 grid, compact text
s.addShape(pres.shapes.LINE,{x:lx,y:5.7,w:W-lx-0.4,h:0,line:{color:C.gold,width:0.3}});
s.addText("Weight",{x:lx,y:5.85,w:1.3,h:0.25,...geo(15,{color:C.taupe})});
s.addText("No bold. Size and color only.",{x:lx+1.4,y:5.85,w:3.5,h:0.25,...cal(10,{color:C.warmGray})});
s.addText("Sizing",{x:lx,y:6.2,w:1.3,h:0.25,...geo(15,{color:C.taupe})});
s.addText("Body 11pt min. Captions 8pt min.",{x:lx+1.4,y:6.2,w:3.5,h:0.25,...cal(10,{color:C.warmGray})});
s.addText("Caps",{x:rx,y:5.85,w:1.3,h:0.25,...geo(15,{color:C.taupe})});
s.addText("Century Gothic, 2\u20133pt spacing.",{x:rx+1.6,y:5.85,w:3.5,h:0.25,...cal(10,{color:C.warmGray})});
s.addText("Line Spacing",{x:rx,y:6.2,w:1.5,h:0.25,...geo(15,{color:C.taupe})});
s.addText("Body 1.4\u20131.6x. Headlines 1.0\u20131.2x.",{x:rx+1.6,y:6.2,w:3,h:0.25,...cal(10,{color:C.warmGray})});
})();

// S20 — Closing (left-aligned with gradient)
(()=>{const s=pres.addSlide();s.background={color:C.cream};
s.addImage({path:img.hero2,x:0,y:0,w:W,h:H,sizing:{type:"cover",w:W,h:H}});
// Gradient overlay — dark on left fading to transparent
s.addImage({path:"/home/assets/gradient_left.png",x:0,y:0,w:W,h:H});
// Logo left-aligned
const lw=3.5,lh=lw*(329/671),lx=0.8,ly=1.5;
s.addImage({path:"/home/assets/logo_closing_smooth.png",x:lx,y:ly,w:lw,h:lh});
s.addText("Beyond the known.",{x:lx,y:ly+lh+0.4,w:5,h:0.5,...geo(24,{color:C.white,italic:true,align:"left"})});
s.addText("BESPOKE HOSPITALITY COLLECTION",{x:lx,y:ly+lh+1.0,w:5,h:0.35,...cab(12,{color:C.white,align:"left",charSpacing:4})});
s.addText("Confidential \u2014 Internal Use Only",{x:lx,y:6.5,w:5,h:0.3,...cab(9,{color:C.white,align:"left"})});
})();

pres.writeFile({fileName:"/home/assets/Meridian_Brand_Bible.pptx"}).then(()=>console.log("Done")).catch(e=>console.error(e));
