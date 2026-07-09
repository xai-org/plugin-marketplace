/**
 * Marco Island Housing Market Overview - PPTX Generator (10 slides)
 * Exact recreation from XML-parsed positions, fonts, and colors.
 *
 * npm install -g pptxgenjs react-icons react react-dom sharp
 * Images: ./images/sunset_bg.jpg, florida_map.png, florida_map_legend.png, us_rent_map_small.png
 * Run: node create_presentation.js
 */
const pptxgen = require("pptxgenjs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const C = {darkNavy:"0C3547",teal:"17A2B8",tealDk:"0E6B7F",coral:"E8734A",white:"FFFFFF",cream:"F5EDE3",bgL:"F8F9FA",bgW:"FFFFFF",tk:"D4EFF4",mt:"5A7184",dv:"E2E8F0"};
const F = {t:"Trebuchet MS",b:"Calibri"};
const I = {bg:path.resolve(__dirname,"images/sunset_bg.jpg"),fl:path.resolve(__dirname,"images/florida_map_cropped.png"),fll:path.resolve(__dirname,"images/florida_legend_cropped.png"),us:path.resolve(__dirname,"images/us_rent_map_small.png")};

function iSvg(Co,c,s=256){return ReactDOMServer.renderToStaticMarkup(React.createElement(Co,{color:c,size:String(s)}));}
async function i2b(Co,c,s=256){return "image/png;base64,"+(await sharp(Buffer.from(iSvg(Co,c,s))).png().toBuffer()).toString("base64");}
async function circ(Co,bg,ic,s=256){const sv=iSvg(Co,ic,Math.round(s*.55)).replace(/<svg[^>]*>/,"").replace(/<\/svg>/,"");const o=Math.round(s*.225);return "image/png;base64,"+(await sharp(Buffer.from(`<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><circle cx="${s/2}" cy="${s/2}" r="${s/2}" fill="#${bg}"/><g transform="translate(${o},${o})">${sv}</g></svg>`)).png().toBuffer()).toString("base64");}
async function bar(fh,th,p,w=146,h=28){return "image/png;base64,"+(await sharp(Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="4" fill="#${th}"/><rect width="${Math.round(w*p)}" height="${h}" rx="4" fill="#${fh}"/></svg>`)).png().toBuffer()).toString("base64");}

function addTK(s,txt,src){
  s.addShape("rect",{x:0.5,y:4.85,w:9,h:0.5,fill:{color:C.tk}});
  s.addShape("rect",{x:0.5,y:4.85,w:0.06,h:0.5,fill:{color:C.coral}});
  s.addText([{text:"Key Takeaway: ",options:{bold:true,fontSize:12,fontFace:F.b,color:C.darkNavy}},{text:txt,options:{fontSize:12,fontFace:F.b,color:C.darkNavy}}],{x:0.6,y:4.85,w:8.85,h:0.5,valign:"middle",margin:0});
  if(src) s.addText(src,{x:0.5,y:5.3891,w:9,h:0.2,fontSize:10,fontFace:F.b,color:C.mt,italic:true,margin:0});
}
function hdr(s,t,sub,tw,sw){
  s.addText(t,{x:0.5,y:0.3,w:tw||9,h:0.5,fontSize:26,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  if(sub) s.addText(sub,{x:0.5,y:0.8,w:sw||9,h:0.3,fontSize:12,fontFace:F.b,color:C.mt,margin:0});
}

async function main(){
  const{FaMapMarkerAlt,FaHome,FaBuilding}=require("react-icons/fa");
  const pin=await i2b(FaMapMarkerAlt,"#FFFFFF");
  const hC=await circ(FaHome,C.tealDk,"#FFFFFF");
  const bC=await circ(FaBuilding,C.coral,"#FFFFFF");
  const tB={d:await bar(C.tealDk,"B8D8D5",.46),l:await bar(C.tealDk,"B8D8D5",.47),p:await bar(C.tealDk,"B8D8D5",1),v:await bar(C.tealDk,"B8D8D5",.55)};
  const cB={d:await bar(C.coral,"F0C4B4",1),l:await bar(C.coral,"F0C4B4",1),p:await bar(C.coral,"F0C4B4",.33),v:await bar(C.coral,"F0C4B4",.85)};

  const pres=new pptxgen();pres.layout="LAYOUT_16x9";pres.author="Market Analysis Team";pres.title="Marco Island Housing Market Overview";

  // SLIDE 1 - Title
  {const s=pres.addSlide();s.background={path:I.bg};
  s.addShape("rect",{x:0,y:0,w:10,h:5.625,fill:{color:"000000",transparency:35}});
  s.addShape("rect",{x:0,y:0,w:0.12,h:5.625,fill:{color:C.teal}});
  s.addImage({data:pin,x:0.6,y:0.8,w:0.6,h:0.6});
  s.addText("MARCO ISLAND",{x:0.6,y:1.55,w:8.5,h:0.7,fontSize:44,fontFace:F.t,color:C.white,bold:true,margin:0});
  s.addText("HOUSING MARKET OVERVIEW",{x:0.6,y:2.2,w:8.5,h:0.55,fontSize:24,fontFace:F.b,color:C.teal,charSpacing:4,margin:0});
  s.addText("April 2026  |  Data sourced from Zillow.com, Redfin, and industry reports",{x:0.6,y:4.1946,w:8.5,h:0.4,fontSize:14,fontFace:F.b,color:C.cream,margin:0});
  s.addShape("rect",{x:0.6,y:4.6924,w:7.3891,h:0.04,fill:{color:C.coral}});
  s.addText("Prepared for National Team Presentation",{x:0.6,y:4.8,w:8,h:0.35,fontSize:14,fontFace:F.b,color:C.cream,italic:true,margin:0});}

  // SLIDE 2 - A Buyer's Market
  {const s=pres.addSlide();s.background={color:C.bgL};
  hdr(s,"A BUYER'S MARKET","Pricing, pace, and inventory from Zillow - as of February 28, 2026",5,5);
  s.addText("$859,460",{x:0.4803,y:1.4654,w:4,h:0.6,fontSize:36,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  s.addText("Avg. Home Value (ZHVI)",{x:0.5064,y:2.0654,w:2.5,h:0.3,fontSize:13,fontFace:F.b,color:C.mt,margin:0});
  s.addText("Down 4.0% YoY",{x:2.8572,y:2.0654,w:1.5,h:0.3,fontSize:12,fontFace:F.b,color:C.coral,bold:true,align:"right",margin:0});
  s.addText("736",{x:0.4803,y:2.7719,w:4,h:0.6,fontSize:36,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  s.addText("Active Listings",{x:0.5064,y:3.3719,w:2.5,h:0.3,fontSize:13,fontFace:F.b,color:C.mt,margin:0});
  s.addText("109 new listings in Feb",{x:2.4707,y:3.3719,w:1.8859,h:0.3,fontSize:12,fontFace:F.b,color:C.coral,bold:true,align:"right",margin:0});
  s.addText("77 Days",{x:0.4803,y:4.0784,w:4,h:0.6,fontSize:36,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  s.addText("Median Days to Pending",{x:0.5064,y:4.6784,w:2.5,h:0.3,fontSize:13,fontFace:F.b,color:C.mt,margin:0});
  s.addText("Up from prior year",{x:2.8572,y:4.6784,w:1.5,h:0.3,fontSize:12,fontFace:F.b,color:C.coral,bold:true,align:"right",margin:0});
  s.addImage({path:I.fl,x:5.4095,y:0.6301,w:3.8585,h:4.0026});
  s.addImage({path:I.fll,x:5.1097,y:4.6002,w:4.2,h:0.6});}

  // SLIDE 3 - Prices Correcting, But Stabilizing
  {const s=pres.addSlide();s.background={color:C.bgW};
  hdr(s,"PRICES CORRECTING, BUT STABILIZING","Zillow Home Value Index - Marco Island vs. National YoY % change");
  s.addChart(pres.charts.BAR,[
    {name:"Marco Island",labels:["2020","2021","2022","2023","2024","2025","Feb 2026"],values:[5.2,18.5,24.3,4.1,-1.2,-5.8,-4]},
    {name:"National Avg.",labels:["2020","2021","2022","2023","2024","2025","Feb 2026"],values:[6.7,16.9,19.8,5.5,3.8,2.1,1.5]}
  ],{x:0.387,y:1.3928,w:9.2,h:3,barDir:"col",chartColors:[C.tealDk,C.coral],showValue:true,dataLabelPosition:"outEnd",dataLabelColor:C.darkNavy,dataLabelFontSize:9,catAxisLabelColor:C.darkNavy,catAxisLabelFontSize:11,catAxisLabelFontBold:true,valAxisLabelColor:C.mt,valGridLine:{color:C.dv,size:0.5},catGridLine:{style:"none"},showLegend:true,legendPos:"b",legendFontSize:11});
  addTK(s,"Post-pandemic correction: values peaked at +24.3% (2022) and the YoY decline is decelerating from -5.8% to -4.0%.","Source: Zillow ZHVI");}

  // SLIDE 4 - Condos: 2X Longer on Market
  {const s=pres.addSlide();s.background={color:C.bgL};
  hdr(s,"CONDOS: 2X LONGER ON MARKET","Two distinct segments with divergent trajectories",9,8);
  s.addImage({data:hC,x:0.7,y:1.25,w:0.5,h:0.5});
  s.addText("SINGLE-FAMILY HOMES",{x:1.35,y:1.25,w:3.5,h:0.5,fontSize:16,fontFace:F.t,color:C.darkNavy,bold:true,valign:"middle",margin:0});
  s.addImage({data:bC,x:5.3,y:1.25,w:0.5,h:0.5});
  s.addText("CONDOS & CO-OPS",{x:5.95,y:1.25,w:3.5,h:0.5,fontSize:16,fontFace:F.t,color:C.darkNavy,bold:true,valign:"middle",margin:0});
  s.addShape("line",{x:4.95,y:1.25,w:0,h:3.3,line:{color:C.dv,width:1}});
  [2.53,3.21,3.89].forEach(ly=>{s.addShape("line",{x:0.7,y:ly,w:4,h:0,line:{color:C.dv,width:1}});s.addShape("line",{x:5.3,y:ly,w:4,h:0,line:{color:C.dv,width:1}});});
  [{l:"Avg. Days on Market",y:1.9498,tb:tB.d,tv:"~107 days",cb:cB.d,cv:"~232 days"},{l:"Active Listings",y:2.63,tb:tB.l,tv:"~164",cb:cB.l,cv:"~350+"},{l:"Avg. List Price",y:3.31,tb:tB.p,tv:"$1,970,155",cb:cB.p,cv:"$658,700"},{l:"Buyer Leverage",y:3.99,tb:tB.v,tv:"Moderate",cb:cB.v,cv:"Strong"}].forEach(r=>{
    s.addText(r.l,{x:0.6826,y:r.y,w:1.3,h:0.5,fontSize:11,fontFace:F.b,color:C.mt,valign:"middle",margin:0});
    s.addImage({data:r.tb,x:2.0913,y:r.y+0.08,w:1.5,h:0.34});
    s.addText(r.tv,{x:3.875,y:r.y,w:1.15,h:0.5,fontSize:12,fontFace:F.b,color:C.darkNavy,bold:true,valign:"middle",margin:0});
    s.addText(r.l,{x:5.2826,y:r.y,w:1.3,h:0.5,fontSize:11,fontFace:F.b,color:C.mt,valign:"middle",margin:0});
    s.addImage({data:r.cb,x:6.6913,y:r.y+0.08,w:1.5,h:0.34});
    s.addText(r.cv,{x:8.475,y:r.y,w:1.15,h:0.5,fontSize:12,fontFace:F.b,color:C.darkNavy,bold:true,valign:"middle",margin:0});
  });
  addTK(s,"Condos sit on market 2x longer than houses. Condo buyers have significant negotiation leverage in today's market.","Source: Zillow, AgentsGather.com, Feb 2026 data");}

  // SLIDE 5 - Luxury Insulated by Cash & Scarcity
  {const s=pres.addSlide();s.background={color:C.bgW};
  hdr(s,"LUXURY INSULATED BY CASH & SCARCITY","Pricing, buyer composition, and inventory at the high end",9,8);
  [{v:"$3.45M",x:0.5,y:1.4198,lb:"Median Luxury Price",ly:2.1198,sub:"+4.7% YoY",sy:2.4698,sc:C.coral,ssz:14},
   {v:"$922K",x:3.9098,y:1.4231,lb:"Median List Price",ly:2.1231,sub:"Sale-to-list ratio: 0.939",sy:2.4981,sc:C.tealDk,ssz:12},
   {v:"80%",x:7.3196,y:1.4242,lb:"Waterfront Properties",ly:2.1242,sub:"Island-wide",sy:2.5037,sc:C.coral,ssz:14},
   {v:"+4.7%",x:0.5,y:3.0576,lb:"Luxury YoY Appreciation",ly:3.7576,sub:"Outpacing broader market",sy:4.1076,sc:C.tealDk,ssz:14},
   {v:"68%",x:3.9098,y:3.0576,lb:"Cash Transactions",ly:3.7576,sub:"Insulated from rate shifts",sy:4.1076,sc:C.coral,ssz:14},
   {v:"0",x:7.3196,y:3.063,lb:"New Gulf-Front Lots",ly:3.763,sub:"Resale-only inventory",sy:4.113,sc:C.tealDk,ssz:14}
  ].forEach(st=>{
    s.addText(st.v,{x:st.x,y:st.y,w:2.8,h:0.7,fontSize:44,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
    s.addText(st.lb,{x:st.x,y:st.ly,w:2.8,h:0.35,fontSize:16,fontFace:F.b,color:C.mt,margin:0});
    s.addText(st.sub,{x:st.x,y:st.sy,w:2.8,h:0.3,fontSize:st.ssz,fontFace:F.b,color:st.sc,italic:true,margin:0});
  });
  addTK(s,"Zero new Gulf-front lots and 68% cash buyers give Marco Island's luxury waterfront market a durable price floor.","Source: NaplesEd.com / Zillow / Industry Analysis, April 2026");}

  // SLIDE 6 - Outperforming SW Florida Neighbors
  {const s=pres.addSlide();s.background={color:C.bgL};
  hdr(s,"OUTPERFORMING SW FLORIDA NEIGHBORS","Marco Island vs. neighboring metros - price change and inventory",9,8);
  s.addChart(pres.charts.BAR,[{name:"YoY Price Change (%)",labels:["Punta Gorda","Cape Coral-Ft Myers","N. Port-Sarasota","Naples-Marco Island"],values:[-11.93,-9.19,-7.54,-5.97]}],
    {x:0.5,y:1.44,w:5.5,h:3,barDir:"col",chartColors:[C.coral],showValue:true,dataLabelPosition:"outEnd",dataLabelColor:C.darkNavy,dataLabelFontSize:10,catAxisLabelColor:C.darkNavy,catAxisLabelFontSize:9,valAxisLabelColor:C.mt,valGridLine:{color:C.dv,size:0.5},catGridLine:{style:"none"},showLegend:false});
  s.addText("AVG. DAYS ON MARKET",{x:6.3261,y:1.6227,w:3.5,h:0.35,fontSize:12,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  [2.5727,3.1227,3.6727].forEach(ly=>s.addShape("line",{x:6.3261,y:ly,w:3.1,h:0,line:{color:C.dv,width:1}}));
  [{c:"Punta Gorda",d:"145 days",y:2.1227,h:false},{c:"Cape Coral-Ft Myers",d:"118 days",y:2.6727,h:false},{c:"N. Port-Sarasota",d:"105 days",y:3.2227,h:false},{c:"Naples-Marco Island",d:"77 days",y:3.7727,h:true}].forEach(r=>{
    s.addText(r.c,{x:6.3261,y:r.y,w:2.5,h:0.4,fontSize:12,fontFace:F.b,color:C.mt,valign:"middle",margin:0});
    s.addText(r.d,{x:8.4185,y:r.y,w:1,h:0.4,fontSize:14,fontFace:F.b,color:r.h?C.coral:C.darkNavy,bold:true,align:"right",valign:"middle",margin:0});
  });
  addTK(s,"Marco Island (-5.97%) outperforms all SW Florida neighbors, buffered by luxury positioning and its cash-buyer base.","Source: Zillow, Jan 2025 - Jan 2026");}

  // SLIDE 7 - Rents 2.5X the National Average
  {const s=pres.addSlide();s.background={color:C.bgW};
  hdr(s,"RENTS 2.5X THE NATIONAL AVERAGE","Average rents by state with Marco Island comparison");
  s.addImage({path:I.us,x:0.912,y:1.2105,w:5.8,h:3.31});
  s.addText("$4,740",{x:7.1601,y:1.3748,w:2.0957,h:0.6,fontSize:40,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  s.addText([{text:"Marco Island",options:{fontSize:12,fontFace:F.b,color:C.mt,breakLine:true}},{text:"Avg. Rent / Month",options:{fontSize:12,fontFace:F.b,color:C.mt}}],{x:7.1601,y:1.9748,w:1.8989,h:0.5,margin:0});
  s.addText("$1,895",{x:7.1601,y:2.6748,w:2.4388,h:0.5,fontSize:32,fontFace:F.t,color:C.mt,bold:true,margin:0});
  s.addText("U.S. National Avg.",{x:7.1601,y:3.1248,w:2.175,h:0.3,fontSize:12,fontFace:F.b,color:C.mt,margin:0});
  s.addShape("line",{x:7.1601,y:3.5748,w:1.9413,h:0,line:{color:C.dv,width:1}});
  s.addText("2.5x",{x:7.1601,y:3.6748,w:1.2,h:0.5,fontSize:32,fontFace:F.t,color:C.coral,bold:true,margin:0});
  s.addText([{text:"National",options:{fontSize:14,fontFace:F.b,color:C.coral,bold:true,breakLine:true}},{text:"Average",options:{fontSize:14,fontFace:F.b,color:C.coral,bold:true}}],{x:8.2601,y:3.6813,w:1.5,h:0.45,margin:0});
  addTK(s,"Marco Island rents exceed every U.S. state average. Waterfront rentals command $8K-$15K+/mo in season.","Source: Zillow ZORI, RentCafe, Feb 2026");}

  // SLIDE 8 - Pressure Points
  {const s=pres.addSlide();s.background={color:C.bgL};
  s.addText("PRESSURE POINTS: FOUR RISKS SHAPING 2026",{x:0.5,y:0.3,w:9,h:0.5,fontSize:26,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
  s.addText("RISK",{x:0.5,y:0.9,w:1.8,h:0.3,fontSize:11,fontFace:F.t,color:C.mt,bold:true,margin:0});
  s.addText("KEY METRIC",{x:2.5337,y:0.9,w:1.3,h:0.3,fontSize:11,fontFace:F.t,color:C.mt,bold:true,margin:0});
  s.addText("DETAIL",{x:4.1946,y:0.9,w:4.5,h:0.3,fontSize:11,fontFace:F.t,color:C.mt,bold:true,margin:0});
  s.addText("IMPACT",{x:8.3761,y:0.9,w:1.2,h:0.3,fontSize:11,fontFace:F.t,color:C.mt,bold:true,margin:0});
  s.addShape("line",{x:0.5,y:1.2,w:9,h:0,line:{color:C.darkNavy,width:1.5}});
  [2.1,2.95,3.8].forEach(ly=>s.addShape("line",{x:0.5,y:ly,w:9,h:0,line:{color:C.dv,width:1}}));
  [{y:1.35,ac:C.teal,r:"Mortgage Rates",m:"6.5%+",d:"Purchasing power down ~20-25% vs. pandemic lows. However, 68% cash-buyer base cushions impact.",i:"MODERATE",ic:C.teal,by:1.56},
   {y:2.2,ac:C.coral,r:"Insurance &\nFlood Risk",m:"96%",d:"Of properties face severe 30-yr flood risk. Rising insurance costs are a significant factor statewide.",i:"HIGH",ic:C.coral,by:2.41},
   {y:3.05,ac:C.teal,r:"Migration Slowing",m:"310K to 22K",d:"Net domestic migration to FL has normalized sharply from the pandemic-era surge.",i:"MODERATE",ic:C.teal,by:3.26},
   {y:3.9,ac:C.coral,r:"Extended Days\non Market",m:"232 days",d:"Condo avg. (vs. 107 days for houses). Sellers must price precisely - buyers are leverage-aware.",i:"HIGH",ic:C.coral,by:4.11}
  ].forEach(r=>{
    s.addShape("rect",{x:0.5,y:r.y,w:0.06,h:0.7,fill:{color:r.ac}});
    s.addText(r.r,{x:0.7,y:r.y,w:1.5,h:0.7,fontSize:14,fontFace:F.t,color:C.darkNavy,valign:"middle",margin:0});
    s.addText(r.m,{x:2.4185,y:r.y,w:1.4478,h:0.7,fontSize:18,fontFace:F.t,color:C.darkNavy,bold:true,valign:"middle",margin:0});
    s.addText(r.d,{x:4.1837,y:r.y,w:3.6369,h:0.7,fontSize:11,fontFace:F.b,color:C.mt,valign:"middle",margin:0});
    s.addShape("rect",{x:8.3717,y:r.by,w:1.05,h:0.28,fill:{color:r.ic}});
    s.addText(r.i,{x:8.3717,y:r.by,w:1.05,h:0.28,fontSize:10,fontFace:F.t,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
  });
  addTK(s,"Elevated rates, insurance costs, slowing migration, and extended days on market put pressure on home prices.",null);}

  // SLIDE 9 - Silver Linings
  {const s=pres.addSlide();s.background={color:C.bgW};
  hdr(s,"SILVER LININGS: WHY MARCO STILL DELIVERS VALUE ","Four actionable themes for 2026-2027",9,8);
  [{lx:0.5,ly:1.3848,lc:C.tealDk,tx:0.6,ty:1.5048,t:"Condo Value Plays",st:"232 days",sc:C.tealDk,sy:1.8392,ux:2.3049,u:"avg. on market",uy:1.9421,bd:"Strong buyer leverage. Dated units with high HOA present the best below-asking acquisition opportunities.",bdy:2.2848},
   {lx:5.1,ly:1.3848,lc:C.coral,tx:5.2,ty:1.5048,t:"Waterfront Premium",st:"0 lots",sc:C.coral,sy:1.8392,ux:6.3007,u:"new Gulf-front",uy:1.9421,bd:"Resale-only inventory means modernized waterfront homes remain supply-protected at ~$3.45M.",bdy:2.2848},
   {lx:0.5,ly:3.1163,lc:C.tealDk,tx:0.6,ty:3.2363,t:"Rental Income",st:"$4,740",sc:C.tealDk,sy:3.5707,ux:1.9715,u:"avg. rent/mo",uy:3.6789,bd:"2.5x national average. Seasonal STRs on waterfront generate $8K-$15K+/mo in high season.",bdy:4.0163},
   {lx:5.1,ly:3.1163,lc:C.coral,tx:5.2,ty:3.2363,t:"Stabilization",st:"-4.0%",sc:C.coral,sy:3.5707,ux:6.3111,u:"vs. -5.8% prior",uy:3.6751,bd:"Decline is decelerating. Zillow forecasts flat to slight decline in 2026 - market finding its floor.",bdy:4.0163}
  ].forEach(c=>{
    s.addShape("rect",{x:c.lx,y:c.ly,w:4.3,h:0.04,fill:{color:c.lc}});
    s.addText(c.t,{x:c.tx,y:c.ty,w:4.1,h:0.3,fontSize:16,fontFace:F.t,color:C.darkNavy,bold:true,margin:0});
    s.addText(c.st,{x:c.tx,y:c.sy,w:1.688,h:0.45,fontSize:28,fontFace:F.t,color:c.sc,bold:true,margin:0});
    s.addText(c.u,{x:c.ux,y:c.uy,w:1.5,h:0.35,fontSize:16,fontFace:F.b,color:C.mt,margin:0});
    s.addText(c.bd,{x:c.tx,y:c.bdy,w:4.1,h:0.5,fontSize:12,fontFace:F.b,color:C.mt,margin:0});
  });
  addTK(s,"Marco Island offers durable value through waterfront scarcity, premium rents, and a stabilizing price environment.",null);}

  // SLIDE 10 - Closing
  {const s=pres.addSlide();s.background={path:I.bg};
  s.addShape("rect",{x:0,y:0,w:10,h:5.625,fill:{color:C.darkNavy,transparency:20}});
  s.addShape("rect",{x:0,y:0,w:0.12,h:5.625,fill:{color:C.teal}});
  s.addText("MARCO ISLAND",{x:0.6,y:1.55,w:8.8,h:0.7,fontSize:44,fontFace:F.t,color:C.white,bold:true,margin:0});
  s.addText("A RESILIENT ISLAND MARKET",{x:0.6,y:2.2,w:8.8,h:0.55,fontSize:24,fontFace:F.b,color:C.teal,charSpacing:3,margin:0});
  s.addText("Questions? Let's discuss opportunities.",{x:0.6,y:4.2,w:8,h:0.4,fontSize:14,fontFace:F.b,color:C.cream,margin:0});
  s.addShape("rect",{x:0.6,y:4.6824,w:5.6989,h:0.05,fill:{color:C.coral}});
  s.addText("Data sourced from Zillow.com, Redfin, and industry reports  |  April 2026",{x:0.6,y:4.8,w:8,h:0.35,fontSize:14,fontFace:F.b,color:C.cream,italic:true,margin:0});}

  const out=path.resolve(__dirname,"Marco_Island_Market_Overview.pptx");
  await pres.writeFile({fileName:out});
  console.log("Saved:",out);
}
main().catch(e=>{console.error(e);process.exit(1);});
