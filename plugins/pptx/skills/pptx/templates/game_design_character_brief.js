// =============================================================================
// Chibi Star Command — game design brief deck
// Recreates chibi__1_.pptx via pptxgenjs
// Canvas: 20" × 11.25" (custom widescreen)
// =============================================================================

const pptxgen = require("pptxgenjs");

// ---------- palette ----------
const C = {
  // Voidborn / dark
  DEEP_SPACE: "1A1033",
  MID_SPACE:  "2B1B47",
  PLUM:       "3E2464",
  LAVENDER:   "C9B8FF",
  NEBULA:     "8EE6D6",
  // Celestials / warm
  CREAM:      "FFF4E6",
  PINK_BLOOM: "FFB8D1",
  HOT_PINK:   "FF6FA3",
  STAR_GOLD:  "FFD66B",
  SOFT_PEACH: "FFE2CC",
  // misc
  WHITE:      "FFFFFF",
  MUTED:      "8B7BB8",
  MUTED_DIM:  "6B5B9E",
  OUTLINE:    "3A1F5C",
  OUTLINE_V:  "0E0520",
};

const FONT_DISPLAY = "Fredoka";       // Titles / display
const FONT_BODY    = "Calibri";       // Body
const FONT_MONO    = "VT323";         // HUD / numerics

// ---------- pixel-art portraits (extracted from original) ----------
// Each entry: "col,row,HEXFILL" — grid is 14 × 16, cell size 0.17"
// Origin is the card position; caller supplies originX, originY.
const PORTRAITS = {
  lumi: [
    "0,4,3A1F5C","0,5,3A1F5C","0,6,3A1F5C","0,10,3A1F5C","0,11,3A1F5C","0,12,3A1F5C","1,2,3A1F5C","1,3,3A1F5C",
    "1,4,FFD66B","1,5,FFD66B","1,6,FFD66B","1,7,3A1F5C","1,9,3A1F5C","1,10,FFB8D1","1,11,FFB8D1","1,12,FFB8D1",
    "1,13,3A1F5C","1,14,3A1F5C","1,15,3A1F5C","2,1,3A1F5C","2,2,FFD66B","2,3,FFD66B","2,4,FFD66B","2,5,FFE2CC",
    "2,6,FFE2CC","2,7,FFE2CC","2,8,3A1F5C","2,9,FFB8D1","2,10,FFB8D1","2,11,E38AAE","2,12,FFB8D1","2,13,FFB8D1",
    "2,14,FFE2CC","2,15,3A1F5C","3,0,3A1F5C","3,1,FFD66B","3,2,E0A93A","3,3,FFD66B","3,4,FFE2CC","3,5,FFE2CC",
    "3,6,F2B89A","3,7,FFE2CC","3,8,FFE2CC","3,9,FFB8D1","3,10,FFB8D1","3,11,FFB8D1","3,12,FFB8D1","3,13,FFB8D1",
    "3,14,FFE2CC","3,15,3A1F5C","4,0,3A1F5C","4,1,FFD66B","4,2,FFD66B","4,3,FFD66B","4,4,FFE2CC","4,5,6B3FA0",
    "4,6,FFE2CC","4,7,FFE2CC","4,8,FFE2CC","4,9,FFB8D1","4,10,FFB8D1","4,11,FFB8D1","4,12,FFB8D1","4,13,FFB8D1",
    "4,14,3A1F5C","5,0,3A1F5C","5,1,FFD66B","5,2,FFD66B","5,3,FFD66B","5,4,FFE2CC","5,5,3A1F5C","5,6,FFE2CC",
    "5,7,FFE2CC","5,8,FFE2CC","5,9,FFFFFF","5,10,B39DDB","5,11,FFB8D1","5,12,E38AAE","5,13,3A1F5C","6,0,3A1F5C",
    "6,1,FFD66B","6,2,FFD66B","6,3,FFD66B","6,4,FFE2CC","6,5,3A1F5C","6,6,FF8FB3","6,7,FFE2CC","6,8,FFE2CC",
    "6,9,FFFFFF","6,10,B39DDB","6,11,FFB8D1","6,12,FFB8D1","6,13,3A1F5C","7,0,3A1F5C","7,1,FFD66B","7,2,FFD66B",
    "7,3,FFD66B","7,4,FFE2CC","7,5,3A1F5C","7,6,FF8FB3","7,7,FFE2CC","7,8,FFE2CC","7,9,FFFFFF","7,10,B39DDB",
    "7,11,FFB8D1","7,12,FFB8D1","7,13,3A1F5C","7,14,3A1F5C","8,0,3A1F5C","8,1,FFD66B","8,2,FFD66B","8,3,FFD66B",
    "8,4,FFE2CC","8,5,3A1F5C","8,6,FFE2CC","8,7,FFE2CC","8,8,FFE2CC","8,9,FFFFFF","8,10,B39DDB","8,11,FFB8D1",
    "8,12,E38AAE","8,13,FFB8D1","8,14,FFE2CC","8,15,3A1F5C","9,0,3A1F5C","9,1,FFD66B","9,2,FFD66B","9,3,FFD66B",
    "9,4,FFE2CC","9,5,6B3FA0","9,6,FFE2CC","9,7,FFE2CC","9,8,FFE2CC","9,9,FFB8D1","9,10,FFB8D1","9,11,FFB8D1",
    "9,12,FFB8D1","9,13,FFB8D1","9,14,FFE2CC","9,15,3A1F5C","10,0,3A1F5C","10,1,FFD66B","10,2,E0A93A","10,3,FFD66B",
    "10,4,FFE2CC","10,5,FFE2CC","10,6,FFE2CC","10,7,FFE2CC","10,8,FFE2CC","10,9,FFB8D1","10,10,FFB8D1","10,11,E38AAE",
    "10,12,FFB8D1","10,13,FFB8D1","10,14,3A1F5C","10,15,3A1F5C","11,1,3A1F5C","11,2,FFD66B","11,3,FFD66B","11,4,FFD66B",
    "11,5,FFE2CC","11,6,FFE2CC","11,7,FFE2CC","11,8,3A1F5C","11,9,3A1F5C","11,10,FFB8D1","11,11,FFB8D1","11,12,FFB8D1",
    "11,13,3A1F5C","12,2,3A1F5C","12,3,3A1F5C","12,4,FFD66B","12,5,FFD66B","12,6,FFD66B","12,7,3A1F5C","12,10,3A1F5C",
    "12,11,3A1F5C","12,12,3A1F5C","13,4,3A1F5C","13,5,3A1F5C","13,6,3A1F5C"
  ],
  nova: [
    "0,4,3A1F5C","0,5,3A1F5C","0,6,3A1F5C","0,10,3A1F5C","0,11,3A1F5C","0,12,3A1F5C","1,2,3A1F5C","1,3,3A1F5C",
    "1,4,FF9FC7","1,5,FF9FC7","1,6,FF9FC7","1,7,3A1F5C","1,9,3A1F5C","1,10,FFF4E6","1,11,FFF4E6","1,12,FFF4E6",
    "1,13,3A1F5C","1,14,3A1F5C","1,15,3A1F5C","2,1,3A1F5C","2,2,FF9FC7","2,3,FF9FC7","2,4,FF9FC7","2,5,FFE2CC",
    "2,6,FFE2CC","2,7,FFE2CC","2,8,3A1F5C","2,9,FFF4E6","2,10,FFF4E6","2,11,E8D3B0","2,12,FFF4E6","2,13,FFF4E6",
    "2,14,FFE2CC","2,15,3A1F5C","3,0,3A1F5C","3,1,FF9FC7","3,2,D16B96","3,3,FF9FC7","3,4,FFE2CC","3,5,FFE2CC",
    "3,6,F2B89A","3,7,FFE2CC","3,8,FFE2CC","3,9,FFF4E6","3,10,FFF4E6","3,11,FFF4E6","3,12,FFF4E6","3,13,FFF4E6",
    "3,14,FFE2CC","3,15,3A1F5C","4,0,3A1F5C","4,1,FF9FC7","4,2,FF9FC7","4,3,FF9FC7","4,4,FFE2CC","4,5,B23A6F",
    "4,6,FFE2CC","4,7,FFE2CC","4,8,FFE2CC","4,9,FFF4E6","4,10,FFF4E6","4,11,FFF4E6","4,12,FFF4E6","4,13,FFF4E6",
    "4,14,3A1F5C","5,0,3A1F5C","5,1,FF9FC7","5,2,FF9FC7","5,3,FF9FC7","5,4,FFE2CC","5,5,3A1F5C","5,6,FFE2CC",
    "5,7,FFE2CC","5,8,FFE2CC","5,9,FFD66B","5,10,FF6FA3","5,11,FFF4E6","5,12,E8D3B0","5,13,3A1F5C","6,0,3A1F5C",
    "6,1,FF9FC7","6,2,FF9FC7","6,3,FF9FC7","6,4,FFE2CC","6,5,3A1F5C","6,6,FF8FB3","6,7,FFE2CC","6,8,FFE2CC",
    "6,9,FFD66B","6,10,FF6FA3","6,11,FFF4E6","6,12,FFF4E6","6,13,3A1F5C","7,0,3A1F5C","7,1,FF9FC7","7,2,FF9FC7",
    "7,3,FF9FC7","7,4,FFE2CC","7,5,3A1F5C","7,6,FF8FB3","7,7,FFE2CC","7,8,FFE2CC","7,9,FFD66B","7,10,FF6FA3",
    "7,11,FFF4E6","7,12,FFF4E6","7,13,3A1F5C","7,14,3A1F5C","8,0,3A1F5C","8,1,FF9FC7","8,2,FF9FC7","8,3,FF9FC7",
    "8,4,FFE2CC","8,5,3A1F5C","8,6,FFE2CC","8,7,FFE2CC","8,8,FFE2CC","8,9,FFD66B","8,10,FF6FA3","8,11,FFF4E6",
    "8,12,E8D3B0","8,13,FFF4E6","8,14,FFE2CC","8,15,3A1F5C","9,0,3A1F5C","9,1,FF9FC7","9,2,FF9FC7","9,3,FF9FC7",
    "9,4,FFE2CC","9,5,B23A6F","9,6,FFE2CC","9,7,FFE2CC","9,8,FFE2CC","9,9,FFF4E6","9,10,FFF4E6","9,11,FFF4E6",
    "9,12,FFF4E6","9,13,FFF4E6","9,14,FFE2CC","9,15,3A1F5C","10,0,3A1F5C","10,1,FF9FC7","10,2,D16B96","10,3,FF9FC7",
    "10,4,FFE2CC","10,5,FFE2CC","10,6,FFE2CC","10,7,FFE2CC","10,8,FFE2CC","10,9,FFF4E6","10,10,FFF4E6","10,11,E8D3B0",
    "10,12,FFF4E6","10,13,FFF4E6","10,14,3A1F5C","10,15,3A1F5C","11,1,3A1F5C","11,2,FF9FC7","11,3,FF9FC7","11,4,FF9FC7",
    "11,5,FFE2CC","11,6,FFE2CC","11,7,FFE2CC","11,8,3A1F5C","11,9,3A1F5C","11,10,FFF4E6","11,11,FFF4E6","11,12,FFF4E6",
    "11,13,3A1F5C","12,2,3A1F5C","12,3,3A1F5C","12,4,FF9FC7","12,5,FF9FC7","12,6,FF9FC7","12,7,3A1F5C","12,10,3A1F5C",
    "12,11,3A1F5C","12,12,3A1F5C","13,4,3A1F5C","13,5,3A1F5C","13,6,3A1F5C"
  ],
  aster: [
    "0,4,3A1F5C","0,5,3A1F5C","0,6,3A1F5C","0,10,3A1F5C","0,11,3A1F5C","0,12,3A1F5C","1,2,3A1F5C","1,3,3A1F5C",
    "1,4,C9B8FF","1,5,C9B8FF","1,6,C9B8FF","1,7,3A1F5C","1,9,3A1F5C","1,10,FFD66B","1,11,FFD66B","1,12,FFD66B",
    "1,13,3A1F5C","1,14,3A1F5C","1,15,3A1F5C","2,1,3A1F5C","2,2,C9B8FF","2,3,C9B8FF","2,4,C9B8FF","2,5,FFE2CC",
    "2,6,FFE2CC","2,7,FFE2CC","2,8,3A1F5C","2,9,FFD66B","2,10,FFD66B","2,11,C99A2E","2,12,FFD66B","2,13,FFD66B",
    "2,14,FFE2CC","2,15,3A1F5C","3,0,3A1F5C","3,1,C9B8FF","3,2,8E78D1","3,3,C9B8FF","3,4,FFE2CC","3,5,FFE2CC",
    "3,6,F2B89A","3,7,FFE2CC","3,8,FFE2CC","3,9,FFD66B","3,10,FFD66B","3,11,FFD66B","3,12,FFD66B","3,13,FFD66B",
    "3,14,FFE2CC","3,15,3A1F5C","4,0,3A1F5C","4,1,C9B8FF","4,2,C9B8FF","4,3,C9B8FF","4,4,FFE2CC","4,5,3A5BA0",
    "4,6,FFE2CC","4,7,FFE2CC","4,8,FFE2CC","4,9,FFD66B","4,10,FFD66B","4,11,FFD66B","4,12,FFD66B","4,13,FFD66B",
    "4,14,3A1F5C","5,0,3A1F5C","5,1,C9B8FF","5,2,C9B8FF","5,3,C9B8FF","5,4,FFE2CC","5,5,3A1F5C","5,6,FFE2CC",
    "5,7,FFE2CC","5,8,FFE2CC","5,9,FFFFFF","5,10,FFB8D1","5,11,FFD66B","5,12,C99A2E","5,13,3A1F5C","6,0,3A1F5C",
    "6,1,C9B8FF","6,2,C9B8FF","6,3,C9B8FF","6,4,FFE2CC","6,5,3A1F5C","6,6,FF8FB3","6,7,FFE2CC","6,8,FFE2CC",
    "6,9,FFFFFF","6,10,FFB8D1","6,11,FFD66B","6,12,FFD66B","6,13,3A1F5C","7,0,3A1F5C","7,1,C9B8FF","7,2,C9B8FF",
    "7,3,C9B8FF","7,4,FFE2CC","7,5,3A1F5C","7,6,FF8FB3","7,7,FFE2CC","7,8,FFE2CC","7,9,FFFFFF","7,10,FFB8D1",
    "7,11,FFD66B","7,12,FFD66B","7,13,3A1F5C","7,14,3A1F5C","8,0,3A1F5C","8,1,C9B8FF","8,2,C9B8FF","8,3,C9B8FF",
    "8,4,FFE2CC","8,5,3A1F5C","8,6,FFE2CC","8,7,FFE2CC","8,8,FFE2CC","8,9,FFFFFF","8,10,FFB8D1","8,11,FFD66B",
    "8,12,C99A2E","8,13,FFD66B","8,14,FFE2CC","8,15,3A1F5C","9,0,3A1F5C","9,1,C9B8FF","9,2,C9B8FF","9,3,C9B8FF",
    "9,4,FFE2CC","9,5,3A5BA0","9,6,FFE2CC","9,7,FFE2CC","9,8,FFE2CC","9,9,FFD66B","9,10,FFD66B","9,11,FFD66B",
    "9,12,FFD66B","9,13,FFD66B","9,14,FFE2CC","9,15,3A1F5C","10,0,3A1F5C","10,1,C9B8FF","10,2,8E78D1","10,3,C9B8FF",
    "10,4,FFE2CC","10,5,FFE2CC","10,6,FFE2CC","10,7,FFE2CC","10,8,FFE2CC","10,9,FFD66B","10,10,FFD66B","10,11,C99A2E",
    "10,12,FFD66B","10,13,FFD66B","10,14,3A1F5C","10,15,3A1F5C","11,1,3A1F5C","11,2,C9B8FF","11,3,C9B8FF","11,4,C9B8FF",
    "11,5,FFE2CC","11,6,FFE2CC","11,7,FFE2CC","11,8,3A1F5C","11,9,3A1F5C","11,10,FFD66B","11,11,FFD66B","11,12,FFD66B",
    "11,13,3A1F5C","12,2,3A1F5C","12,3,3A1F5C","12,4,C9B8FF","12,5,C9B8FF","12,6,C9B8FF","12,7,3A1F5C","12,10,3A1F5C",
    "12,11,3A1F5C","12,12,3A1F5C","13,4,3A1F5C","13,5,3A1F5C","13,6,3A1F5C"
  ],
  nyx: [
    "0,4,0E0520","0,5,0E0520","0,6,0E0520","0,10,0E0520","0,11,0E0520","0,12,0E0520","1,2,0E0520","1,3,0E0520",
    "1,4,2B1B47","1,5,2B1B47","1,6,2B1B47","1,7,0E0520","1,9,0E0520","1,10,6B3FA0","1,11,6B3FA0","1,12,6B3FA0",
    "1,13,0E0520","1,14,0E0520","1,15,0E0520","2,1,0E0520","2,2,2B1B47","2,3,2B1B47","2,4,2B1B47","2,5,E8D4E8",
    "2,6,E8D4E8","2,7,E8D4E8","2,8,0E0520","2,9,6B3FA0","2,10,6B3FA0","2,11,3E2464","2,12,6B3FA0","2,13,6B3FA0",
    "2,14,E8D4E8","2,15,0E0520","3,0,0E0520","3,1,2B1B47","3,2,1A0E2E","3,3,2B1B47","3,4,E8D4E8","3,5,E8D4E8",
    "3,6,B89AB8","3,7,E8D4E8","3,8,E8D4E8","3,9,6B3FA0","3,10,6B3FA0","3,11,6B3FA0","3,12,6B3FA0","3,13,6B3FA0",
    "3,14,E8D4E8","3,15,0E0520","4,0,0E0520","4,1,2B1B47","4,2,2B1B47","4,3,2B1B47","4,4,E8D4E8","4,5,FF6FA3",
    "4,6,E8D4E8","4,7,E8D4E8","4,8,E8D4E8","4,9,6B3FA0","4,10,6B3FA0","4,11,6B3FA0","4,12,6B3FA0","4,13,6B3FA0",
    "4,14,0E0520","5,0,0E0520","5,1,2B1B47","5,2,2B1B47","5,3,2B1B47","5,4,E8D4E8","5,5,0E0520","5,6,E8D4E8",
    "5,7,E8D4E8","5,8,E8D4E8","5,9,C9B8FF","5,10,FF9FE0","5,11,6B3FA0","5,12,3E2464","5,13,0E0520","6,0,0E0520",
    "6,1,2B1B47","6,2,2B1B47","6,3,2B1B47","6,4,E8D4E8","6,5,0E0520","6,6,C97BB0","6,7,E8D4E8","6,8,E8D4E8",
    "6,9,C9B8FF","6,10,FF9FE0","6,11,6B3FA0","6,12,6B3FA0","6,13,0E0520","7,0,0E0520","7,1,2B1B47","7,2,2B1B47",
    "7,3,2B1B47","7,4,E8D4E8","7,5,0E0520","7,6,C97BB0","7,7,E8D4E8","7,8,E8D4E8","7,9,C9B8FF","7,10,FF9FE0",
    "7,11,6B3FA0","7,12,6B3FA0","7,13,0E0520","7,14,0E0520","8,0,0E0520","8,1,2B1B47","8,2,2B1B47","8,3,2B1B47",
    "8,4,E8D4E8","8,5,0E0520","8,6,E8D4E8","8,7,E8D4E8","8,8,E8D4E8","8,9,C9B8FF","8,10,FF9FE0","8,11,6B3FA0",
    "8,12,3E2464","8,13,6B3FA0","8,14,E8D4E8","8,15,0E0520","9,0,0E0520","9,1,2B1B47","9,2,2B1B47","9,3,2B1B47",
    "9,4,E8D4E8","9,5,FF6FA3","9,6,E8D4E8","9,7,E8D4E8","9,8,E8D4E8","9,9,6B3FA0","9,10,6B3FA0","9,11,6B3FA0",
    "9,12,6B3FA0","9,13,6B3FA0","9,14,E8D4E8","9,15,0E0520","10,0,0E0520","10,1,2B1B47","10,2,1A0E2E","10,3,2B1B47",
    "10,4,E8D4E8","10,5,E8D4E8","10,6,E8D4E8","10,7,E8D4E8","10,8,E8D4E8","10,9,6B3FA0","10,10,6B3FA0","10,11,3E2464",
    "10,12,6B3FA0","10,13,6B3FA0","10,14,0E0520","10,15,0E0520","11,1,0E0520","11,2,2B1B47","11,3,2B1B47","11,4,2B1B47",
    "11,5,E8D4E8","11,6,E8D4E8","11,7,E8D4E8","11,8,0E0520","11,9,0E0520","11,10,6B3FA0","11,11,6B3FA0","11,12,6B3FA0",
    "11,13,0E0520","12,2,0E0520","12,3,0E0520","12,4,2B1B47","12,5,2B1B47","12,6,2B1B47","12,7,0E0520","12,10,0E0520",
    "12,11,0E0520","12,12,0E0520","13,4,0E0520","13,5,0E0520","13,6,0E0520"
  ],
  vex: [
    "0,4,0E0520","0,5,0E0520","0,6,0E0520","0,10,0E0520","0,11,0E0520","0,12,0E0520","1,2,0E0520","1,3,0E0520",
    "1,4,8EE6D6","1,5,8EE6D6","1,6,8EE6D6","1,7,0E0520","1,9,0E0520","1,10,2B1B47","1,11,2B1B47","1,12,2B1B47",
    "1,13,0E0520","1,14,0E0520","1,15,0E0520","2,1,0E0520","2,2,8EE6D6","2,3,8EE6D6","2,4,8EE6D6","2,5,E8D4E8",
    "2,6,E8D4E8","2,7,E8D4E8","2,8,0E0520","2,9,2B1B47","2,10,2B1B47","2,11,120A26","2,12,2B1B47","2,13,2B1B47",
    "2,14,E8D4E8","2,15,0E0520","3,0,0E0520","3,1,8EE6D6","3,2,4FB8A4","3,3,8EE6D6","3,4,E8D4E8","3,5,E8D4E8",
    "3,6,B89AB8","3,7,E8D4E8","3,8,E8D4E8","3,9,2B1B47","3,10,2B1B47","3,11,2B1B47","3,12,2B1B47","3,13,2B1B47",
    "3,14,E8D4E8","3,15,0E0520","4,0,0E0520","4,1,8EE6D6","4,2,8EE6D6","4,3,8EE6D6","4,4,E8D4E8","4,5,8EE6D6",
    "4,6,E8D4E8","4,7,E8D4E8","4,8,E8D4E8","4,9,2B1B47","4,10,2B1B47","4,11,2B1B47","4,12,2B1B47","4,13,2B1B47",
    "4,14,0E0520","5,0,0E0520","5,1,8EE6D6","5,2,8EE6D6","5,3,8EE6D6","5,4,E8D4E8","5,5,0E0520","5,6,E8D4E8",
    "5,7,E8D4E8","5,8,E8D4E8","5,9,FF6FA3","5,10,FFD66B","5,11,2B1B47","5,12,120A26","5,13,0E0520","6,0,0E0520",
    "6,1,8EE6D6","6,2,8EE6D6","6,3,8EE6D6","6,4,E8D4E8","6,5,0E0520","6,6,C97BB0","6,7,E8D4E8","6,8,E8D4E8",
    "6,9,FF6FA3","6,10,FFD66B","6,11,2B1B47","6,12,2B1B47","6,13,0E0520","7,0,0E0520","7,1,8EE6D6","7,2,8EE6D6",
    "7,3,8EE6D6","7,4,E8D4E8","7,5,0E0520","7,6,C97BB0","7,7,E8D4E8","7,8,E8D4E8","7,9,FF6FA3","7,10,FFD66B",
    "7,11,2B1B47","7,12,2B1B47","7,13,0E0520","7,14,0E0520","8,0,0E0520","8,1,8EE6D6","8,2,8EE6D6","8,3,8EE6D6",
    "8,4,E8D4E8","8,5,0E0520","8,6,E8D4E8","8,7,E8D4E8","8,8,E8D4E8","8,9,FF6FA3","8,10,FFD66B","8,11,2B1B47",
    "8,12,120A26","8,13,2B1B47","8,14,E8D4E8","8,15,0E0520","9,0,0E0520","9,1,8EE6D6","9,2,8EE6D6","9,3,8EE6D6",
    "9,4,E8D4E8","9,5,8EE6D6","9,6,E8D4E8","9,7,E8D4E8","9,8,E8D4E8","9,9,2B1B47","9,10,2B1B47","9,11,2B1B47",
    "9,12,2B1B47","9,13,2B1B47","9,14,E8D4E8","9,15,0E0520","10,0,0E0520","10,1,8EE6D6","10,2,4FB8A4","10,3,8EE6D6",
    "10,4,E8D4E8","10,5,E8D4E8","10,6,E8D4E8","10,7,E8D4E8","10,8,E8D4E8","10,9,2B1B47","10,10,2B1B47","10,11,120A26",
    "10,12,2B1B47","10,13,2B1B47","10,14,0E0520","10,15,0E0520","11,1,0E0520","11,2,8EE6D6","11,3,8EE6D6","11,4,8EE6D6",
    "11,5,E8D4E8","11,6,E8D4E8","11,7,E8D4E8","11,8,0E0520","11,9,0E0520","11,10,2B1B47","11,11,2B1B47","11,12,2B1B47",
    "11,13,0E0520","12,2,0E0520","12,3,0E0520","12,4,8EE6D6","12,5,8EE6D6","12,6,8EE6D6","12,7,0E0520","12,10,0E0520",
    "12,11,0E0520","12,12,0E0520","13,4,0E0520","13,5,0E0520","13,6,0E0520"
  ],
  orin: [
    "0,4,0E0520","0,5,0E0520","0,6,0E0520","0,10,0E0520","0,11,0E0520","0,12,0E0520","1,2,0E0520","1,3,0E0520",
    "1,4,C9B8FF","1,5,C9B8FF","1,6,C9B8FF","1,7,0E0520","1,9,0E0520","1,10,3E2464","1,11,3E2464","1,12,3E2464",
    "1,13,0E0520","1,14,0E0520","1,15,0E0520","2,1,0E0520","2,2,C9B8FF","2,3,C9B8FF","2,4,C9B8FF","2,5,E8D4E8",
    "2,6,E8D4E8","2,7,E8D4E8","2,8,0E0520","2,9,3E2464","2,10,3E2464","2,11,1F122E","2,12,3E2464","2,13,3E2464",
    "2,14,E8D4E8","2,15,0E0520","3,0,0E0520","3,1,C9B8FF","3,2,8E78D1","3,3,C9B8FF","3,4,E8D4E8","3,5,E8D4E8",
    "3,6,B89AB8","3,7,E8D4E8","3,8,E8D4E8","3,9,3E2464","3,10,3E2464","3,11,3E2464","3,12,3E2464","3,13,3E2464",
    "3,14,E8D4E8","3,15,0E0520","4,0,0E0520","4,1,C9B8FF","4,2,C9B8FF","4,3,C9B8FF","4,4,E8D4E8","4,5,FFD66B",
    "4,6,E8D4E8","4,7,E8D4E8","4,8,E8D4E8","4,9,3E2464","4,10,3E2464","4,11,3E2464","4,12,3E2464","4,13,3E2464",
    "4,14,0E0520","5,0,0E0520","5,1,C9B8FF","5,2,C9B8FF","5,3,C9B8FF","5,4,E8D4E8","5,5,0E0520","5,6,E8D4E8",
    "5,7,E8D4E8","5,8,E8D4E8","5,9,8EE6D6","5,10,C9B8FF","5,11,3E2464","5,12,1F122E","5,13,0E0520","6,0,0E0520",
    "6,1,C9B8FF","6,2,C9B8FF","6,3,C9B8FF","6,4,E8D4E8","6,5,0E0520","6,6,C97BB0","6,7,E8D4E8","6,8,E8D4E8",
    "6,9,8EE6D6","6,10,C9B8FF","6,11,3E2464","6,12,3E2464","6,13,0E0520","7,0,0E0520","7,1,C9B8FF","7,2,C9B8FF",
    "7,3,C9B8FF","7,4,E8D4E8","7,5,0E0520","7,6,C97BB0","7,7,E8D4E8","7,8,E8D4E8","7,9,8EE6D6","7,10,C9B8FF",
    "7,11,3E2464","7,12,3E2464","7,13,0E0520","7,14,0E0520","8,0,0E0520","8,1,C9B8FF","8,2,C9B8FF","8,3,C9B8FF",
    "8,4,E8D4E8","8,5,0E0520","8,6,E8D4E8","8,7,E8D4E8","8,8,E8D4E8","8,9,8EE6D6","8,10,C9B8FF","8,11,3E2464",
    "8,12,1F122E","8,13,3E2464","8,14,E8D4E8","8,15,0E0520","9,0,0E0520","9,1,C9B8FF","9,2,C9B8FF","9,3,C9B8FF",
    "9,4,E8D4E8","9,5,FFD66B","9,6,E8D4E8","9,7,E8D4E8","9,8,E8D4E8","9,9,3E2464","9,10,3E2464","9,11,3E2464",
    "9,12,3E2464","9,13,3E2464","9,14,E8D4E8","9,15,0E0520","10,0,0E0520","10,1,C9B8FF","10,2,8E78D1","10,3,C9B8FF",
    "10,4,E8D4E8","10,5,E8D4E8","10,6,E8D4E8","10,7,E8D4E8","10,8,E8D4E8","10,9,3E2464","10,10,3E2464","10,11,1F122E",
    "10,12,3E2464","10,13,3E2464","10,14,0E0520","10,15,0E0520","11,1,0E0520","11,2,C9B8FF","11,3,C9B8FF","11,4,C9B8FF",
    "11,5,E8D4E8","11,6,E8D4E8","11,7,E8D4E8","11,8,0E0520","11,9,0E0520","11,10,3E2464","11,11,3E2464","11,12,3E2464",
    "11,13,0E0520","12,2,0E0520","12,3,0E0520","12,4,C9B8FF","12,5,C9B8FF","12,6,C9B8FF","12,7,0E0520","12,10,0E0520",
    "12,11,0E0520","12,12,0E0520","13,4,0E0520","13,5,0E0520","13,6,0E0520"
  ]
};

// ---------- helpers ----------
function drawPortrait(slide, pres, key, originX, originY, cell = 0.17) {
  const pixels = PORTRAITS[key];
  for (const p of pixels) {
    const [c, r, fill] = p.split(",");
    slide.addShape(pres.shapes.RECTANGLE, {
      x: originX + parseInt(c, 10) * cell,
      y: originY + parseInt(r, 10) * cell,
      w: cell, h: cell,
      fill: { color: fill },
      line: { type: "none" },
    });
  }
}

function textBox(slide, text, opts) {
  slide.addText(text, Object.assign({ margin: 0, fontFace: FONT_DISPLAY, color: C.WHITE }, opts));
}

function monoText(slide, text, opts) {
  slide.addText(text, Object.assign({ margin: 0, fontFace: FONT_MONO, color: C.WHITE }, opts));
}

// =============================================================================
// MAIN BUILD
// =============================================================================
async function build() {
  const pres = new pptxgen();
  pres.author = "Chibi Star Command";
  pres.title = "Chibi Star Command — Game Design Brief";

  // Custom layout: 20" x 11.25"
  pres.defineLayout({ name: "CHIBI", width: 20, height: 11.25 });
  pres.layout = "CHIBI";

  // ============================================================
  // SLIDE 1 — TITLE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.DEEP_SPACE };

    // Decorative sparkles (scattered)
    const sparkles = [
      [2.0, 1.6, 0.22, C.STAR_GOLD], [4.5, 0.9, 0.16, C.LAVENDER],
      [6.8, 2.1, 0.18, C.PINK_BLOOM], [15.8, 1.1, 0.22, C.NEBULA],
      [17.3, 2.6, 0.16, C.LAVENDER], [18.8, 1.8, 0.20, C.STAR_GOLD],
      [2.6, 9.9, 0.18, C.NEBULA], [17.0, 9.6, 0.20, C.PINK_BLOOM],
      [13.5, 9.2, 0.14, C.LAVENDER], [6.2, 10.0, 0.16, C.STAR_GOLD],
    ];
    for (const [x, y, sz, col] of sparkles) {
      s.addText("✦", { x: x - sz / 2, y: y - sz / 2, w: sz * 3, h: sz * 2,
        fontSize: sz * 80, color: col, fontFace: FONT_DISPLAY, align: "left", margin: 0 });
    }

    // Eyebrow
    textBox(s, "★ GAME DESIGN BRIEF ★", {
      x: 1.04, y: 2.73, w: 9.67, h: 0.49,
      fontSize: 18, bold: true, color: C.STAR_GOLD,
      charSpacing: 8, fontFace: FONT_DISPLAY,
    });

    // Big title
    s.addText([
      { text: "Chibi Star", options: { color: C.PINK_BLOOM, breakLine: true } },
      { text: "Command",   options: { color: C.LAVENDER } },
    ], {
      x: 1.04, y: 3.38, w: 10.5, h: 2.81,
      fontSize: 96, bold: true, fontFace: FONT_DISPLAY,
      margin: 0, valign: "top",
    });

    // Subtitle
    textBox(s,
      "Character sprite sheets & responsive layout specs for a pastel-cosmic, magical-girl tower defense.",
      { x: 1.05, y: 6.57, w: 9.0, h: 1.03,
        fontSize: 20, color: C.LAVENDER, fontFace: FONT_BODY, italic: true });

    // Faction pills
    // CELESTIALS pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.64, y: 8.29, w: 2.35, h: 0.54,
      fill: { color: C.PINK_BLOOM }, line: { type: "none" }, rectRadius: 0.27,
    });
    textBox(s, "CELESTIALS", {
      x: 1.64, y: 8.29, w: 2.35, h: 0.54,
      fontSize: 14, bold: true, color: C.DEEP_SPACE,
      align: "center", valign: "middle", charSpacing: 3,
    });
    // VS pill (outlined)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 4.18, y: 8.29, w: 0.85, h: 0.54,
      fill: { color: C.DEEP_SPACE },
      line: { color: C.LAVENDER, width: 1 }, rectRadius: 0.27,
    });
    textBox(s, "VS", {
      x: 4.18, y: 8.29, w: 0.85, h: 0.54,
      fontSize: 14, bold: true, color: C.LAVENDER,
      align: "center", valign: "middle",
    });
    // VOIDBORN pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.21, y: 8.29, w: 2.14, h: 0.54,
      fill: { color: C.PLUM }, line: { type: "none" }, rectRadius: 0.27,
    });
    textBox(s, "VOIDBORN", {
      x: 5.21, y: 8.29, w: 2.14, h: 0.54,
      fontSize: 14, bold: true, color: C.LAVENDER,
      align: "center", valign: "middle", charSpacing: 3,
    });

    // Right-side illustration: two chibi portraits w/ labels
    // LUMI (warm)
    drawPortrait(s, pres, "lumi", 12.25, 2.70);
    textBox(s, "LUMI", {
      x: 12.83, y: 6.73, w: 1.25, h: 0.35,
      fontSize: 14, bold: true, color: C.STAR_GOLD,
      align: "center", charSpacing: 4,
    });

    // NYX (cool)
    drawPortrait(s, pres, "nyx", 15.45, 2.70);
    textBox(s, "NYX", {
      x: 15.85, y: 6.73, w: 1.25, h: 0.35,
      fontSize: 14, bold: true, color: C.NEBULA,
      align: "center", charSpacing: 4,
    });

    // Footer
    monoText(s, "v1.0 · sprite sheets · responsive layout", {
      x: 1.04, y: 10.57, w: 9.0, h: 0.31,
      fontSize: 14, color: C.MUTED,
    });
  }

  // ============================================================
  // SLIDE 2 — ART DIRECTION
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.DEEP_SPACE };

    // Eyebrow
    monoText(s, "01 · ART DIRECTION", {
      x: 1.04, y: 0.94, w: 18.45, h: 0.38,
      fontSize: 16, color: C.LAVENDER, charSpacing: 4,
    });
    // Slide title
    textBox(s, "Color system & type pairing", {
      x: 1.04, y: 1.27, w: 18.45, h: 0.74,
      fontSize: 36, bold: true, color: C.WHITE,
    });

    // ---- LEFT: Celestials palette ----
    textBox(s, "★ CELESTIALS — WARM PASTEL", {
      x: 1.04, y: 2.60, w: 8.90, h: 0.40,
      fontSize: 15, bold: true, color: C.PINK_BLOOM, charSpacing: 2,
    });

    const celestials = [
      ["Cream Paper", "FFF4E6"], ["Pink Bloom", "FFB8D1"],
      ["Hot Pink",    "FF6FA3"], ["Star Gold",  "FFD66B"],
      ["Soft Peach",  "FFE2CC"],
    ];
    celestials.forEach(([name, hex], i) => {
      const x = 1.04 + i * 1.76;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 3.14, w: 1.63, h: 1.04,
        fill: { color: hex }, line: { type: "none" },
      });
      textBox(s, name, {
        x, y: 4.27, w: 1.71, h: 0.28,
        fontSize: 11, bold: true, color: C.WHITE,
      });
      monoText(s, "#" + hex, {
        x, y: 4.51, w: 1.71, h: 0.26,
        fontSize: 12, color: C.MUTED,
      });
    });

    // ---- RIGHT: Voidborn palette ----
    textBox(s, "☾ VOIDBORN — COOL COSMIC", {
      x: 10.31, y: 2.60, w: 8.90, h: 0.40,
      fontSize: 15, bold: true, color: C.LAVENDER, charSpacing: 2,
    });

    const voidborn = [
      ["Deep Space",  "1A1033"], ["Mid Space", "2B1B47"],
      ["Plum",        "3E2464"], ["Lavender",  "C9B8FF"],
      ["Nebula Teal", "8EE6D6"],
    ];
    voidborn.forEach(([name, hex], i) => {
      const x = 10.31 + i * 1.76;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 3.14, w: 1.63, h: 1.04,
        fill: { color: hex },
        line: (hex === "1A1033") ? { color: C.MID_SPACE, width: 0.75 } : { type: "none" },
      });
      textBox(s, name, {
        x, y: 4.27, w: 1.71, h: 0.28,
        fontSize: 11, bold: true, color: C.WHITE,
      });
      monoText(s, "#" + hex, {
        x, y: 4.51, w: 1.71, h: 0.26,
        fontSize: 12, color: C.MUTED,
      });
    });

    // ---- Typography section ----
    monoText(s, "TYPOGRAPHY", {
      x: 1.04, y: 5.45, w: 9.71, h: 0.35,
      fontSize: 13, color: C.LAVENDER, charSpacing: 4,
    });
    textBox(s, "Fredoka", {
      x: 1.04, y: 5.94, w: 3.98, h: 0.79,
      fontSize: 44, bold: true, color: C.STAR_GOLD, fontFace: FONT_DISPLAY,
    });
    monoText(s, "DISPLAY · TITLES · UI LABELS", {
      x: 1.04, y: 7.01, w: 3.98, h: 0.31,
      fontSize: 12, color: C.MUTED, charSpacing: 2,
    });
    s.addText("VT323", {
      x: 5.33, y: 5.96, w: 3.86, h: 0.79,
      fontSize: 44, color: C.NEBULA, fontFace: FONT_MONO, margin: 0,
    });
    monoText(s, "NUMERIC · HUD · READOUTS", {
      x: 5.27, y: 7.03, w: 3.86, h: 0.31,
      fontSize: 12, color: C.MUTED, charSpacing: 2,
    });

    // Vertical divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: 10.65, y: 5.50, w: 0.01, h: 2.30,
      fill: { color: C.PLUM }, line: { type: "none" },
    });

    // ---- Principles ----
    monoText(s, "PRINCIPLES", {
      x: 11.10, y: 5.45, w: 8.10, h: 0.35,
      fontSize: 13, color: C.LAVENDER, charSpacing: 4,
    });
    s.addText([
      { text: "Big eyes, 2-head-tall chibi proportions", options: { bullet: { code: "00B7" }, breakLine: true } },
      { text: "3-tone shading per surface, no gradients", options: { bullet: { code: "00B7" }, breakLine: true } },
      { text: "Outline always 1px, hue-shifted (never black)", options: { bullet: { code: "00B7" }, breakLine: true } },
      { text: "Sparkle & star motifs as VFX, not clutter",     options: { bullet: { code: "00B7" } } },
    ], {
      x: 11.10, y: 5.94, w: 8.15, h: 1.85,
      fontSize: 16, color: C.WHITE, fontFace: FONT_BODY,
      paraSpaceAfter: 4, valign: "top", margin: 0,
    });

    // Footer
    monoText(s, "02 / 09", {
      x: 17.5, y: 10.65, w: 1.5, h: 0.3,
      fontSize: 12, color: C.MUTED_DIM, align: "right",
    });
  }

  // ============================================================
  // CHARACTER SLIDE TEMPLATE
  // ============================================================
  function characterSlide(opts) {
    const {
      idx, factionTag, factionColor, role, name, quote, portraitKey,
      stats,        // [hp, dmg, range, speed] 0-10
      accentColor,  // stat bar + details accent
      palette6,     // 6 hex strings
      kit,          // [[ability, desc], ...]
    } = opts;

    const s = pres.addSlide();
    s.background = { color: C.DEEP_SPACE };

    // Eyebrow row: faction · role
    textBox(s, factionTag, {
      x: 1.04, y: 0.94, w: 2.8, h: 0.43,
      fontSize: 15, bold: true, color: factionColor, charSpacing: 3,
    });
    textBox(s, "·", {
      x: 3.84, y: 0.94, w: 0.2, h: 0.43,
      fontSize: 15, color: C.MUTED,
    });
    monoText(s, role, {
      x: 4.15, y: 0.99, w: 6.24, h: 0.38,
      fontSize: 14, color: C.LAVENDER, charSpacing: 3,
    });

    // Name — big
    textBox(s, name, {
      x: 1.00, y: 1.47, w: 3.8, h: 0.95,
      fontSize: 60, bold: true, color: C.WHITE,
      fontFace: FONT_DISPLAY, valign: "top",
    });
    // Quote
    textBox(s, quote, {
      x: 4.9, y: 1.76, w: 8.0, h: 0.57,
      fontSize: 18, italic: true, color: C.MUTED,
      fontFace: FONT_BODY,
    });

    // ========= LEFT CARD: portrait + palette =========
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.04, y: 2.68, w: 3.75, h: 4.69,
      fill: { color: C.CREAM },
      line: { color: C.PLUM, width: 1 }, rectRadius: 0.08,
    });
    // Portrait label
    monoText(s, "PORTRAIT · 128×128", {
      x: 1.15, y: 5.77, w: 3.55, h: 0.28,
      fontSize: 12, color: C.MUTED_DIM, align: "center", charSpacing: 3,
    });
    // Portrait
    drawPortrait(s, pres, portraitKey, 1.75, 2.96);

    // 6-hue palette swatches, centered
    palette6.forEach((hex, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 2.00 + i * 0.31, y: 6.24, w: 0.27, h: 0.27,
        fill: { color: hex },
        line: { color: C.PLUM, width: 0.5 },
      });
    });
    monoText(s, "CHARACTER PALETTE · 6 HUES", {
      x: 1.15, y: 6.66, w: 3.55, h: 0.32,
      fontSize: 11, color: C.MUTED_DIM, align: "center", charSpacing: 3,
    });

    // ========= MIDDLE CARD: sprite sheet =========
    monoText(s, "SPRITE SHEET · 64×64 · 4-DIR", {
      x: 5.31, y: 2.68, w: 9.87, h: 0.31,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.31, y: 3.09, w: 9.58, h: 5.24,
      fill: { color: C.CREAM },
      line: { color: C.PLUM, width: 1 }, rectRadius: 0.08,
    });

    const rows = [
      { name: "IDLE",   frames: 4 },
      { name: "WALK",   frames: 6 },
      { name: "ATTACK", frames: 5 },
      { name: "CAST",   frames: 6 },
      { name: "DEATH",  frames: 6 },
    ];
    rows.forEach((row, idxR) => {
      const y = 3.37 + idxR * 0.98;
      // Row label
      textBox(s, row.name, {
        x: 5.49, y: y + 0.25, w: 1.23, h: 0.28,
        fontSize: 12, bold: true, color: C.OUTLINE, charSpacing: 2,
      });
      // Frame squares
      for (let f = 0; f < row.frames; f++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: 6.80 + f * 0.85, y: y, w: 0.76, h: 0.76,
          fill: { color: C.DEEP_SPACE }, line: { type: "none" },
        });
        // Center dot (indicates sprite)
        s.addShape(pres.shapes.OVAL, {
          x: 6.80 + f * 0.85 + 0.32, y: y + 0.32, w: 0.12, h: 0.12,
          fill: { color: accentColor }, line: { type: "none" },
        });
      }
      // Frame count
      monoText(s, `${row.frames} f`, {
        x: 13.81, y: y + 0.26, w: 0.92, h: 0.28,
        fontSize: 14, color: C.MUTED, charSpacing: 1,
      });
      // Separator under row (except last)
      if (idxR < rows.length - 1) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: 5.49, y: y + 0.88, w: 9.24, h: 0.01,
          fill: { color: C.LAVENDER, transparency: 60 }, line: { type: "none" },
        });
      }
    });

    // ========= RIGHT: STAT BLOCK + KIT =========
    monoText(s, "STAT BLOCK", {
      x: 15.42, y: 2.68, w: 3.65, h: 0.31,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });

    const statNames = ["HP", "DMG", "RANGE", "SPEED"];
    stats.forEach((val, i) => {
      const y = 3.09 + i * 0.49;
      // label
      textBox(s, statNames[i], {
        x: 15.42, y: y, w: 1.5, h: 0.28,
        fontSize: 13, bold: true, color: C.WHITE, charSpacing: 1,
      });
      // value
      monoText(s, `${val} /10`, {
        x: 18.30, y: y + 0.02, w: 0.95, h: 0.24,
        fontSize: 14, color: C.WHITE, align: "right",
      });
      // track (full bar)
      s.addShape(pres.shapes.RECTANGLE, {
        x: 15.42, y: y + 0.29, w: 3.54, h: 0.10,
        fill: { color: C.WHITE, transparency: 80 }, line: { type: "none" },
      });
      // fill (proportion of 10)
      s.addShape(pres.shapes.RECTANGLE, {
        x: 15.42, y: y + 0.30, w: 3.54 * (val / 10), h: 0.09,
        fill: { color: accentColor }, line: { type: "none" },
      });
    });

    // KIT
    monoText(s, "KIT", {
      x: 15.42, y: 5.20, w: 3.65, h: 0.31,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });
    kit.forEach(([ability, desc], i) => {
      const y = 5.55 + i * 0.75;
      textBox(s, ability, {
        x: 15.38, y: y, w: 3.65, h: 0.32,
        fontSize: 16, bold: true, color: accentColor,
        fontFace: FONT_DISPLAY,
      });
      textBox(s, `— ${desc}`, {
        x: 15.42, y: y + 0.32, w: 3.65, h: 0.40,
        fontSize: 12, color: C.WHITE, fontFace: FONT_BODY,
      });
    });

    // Footer page indicator
    monoText(s, `0${idx} / 09`, {
      x: 17.5, y: 10.65, w: 1.5, h: 0.3,
      fontSize: 12, color: C.MUTED_DIM, align: "right",
    });
  }

  // ============================================================
  // SLIDE 3 — LUMI
  // ============================================================
  characterSlide({
    idx: 3, factionTag: "★ CELESTIALS", factionColor: C.PINK_BLOOM,
    role: "MAGIC · STARLIGHT CASTER", name: "Lumi",
    quote: "“ may the stars guide my aim ”",
    portraitKey: "lumi", accentColor: C.STAR_GOLD,
    stats: [5, 7, 9, 6],
    palette6: ["FFD66B", "FFE2CC", "FFB8D1", "FFFFFF", "B39DDB", "6B3FA0"],
    kit: [
      ["Starfall",       "ranged AoE, slow cast, 3-tile radius"],
      ["Wishlight",      "buffs adjacent allies +15% dmg"],
      ["Twinkle Burst",  "5 homing star projectiles"],
    ],
  });

  // ============================================================
  // SLIDE 4 — NOVA
  // ============================================================
  characterSlide({
    idx: 4, factionTag: "★ CELESTIALS", factionColor: C.PINK_BLOOM,
    role: "DPS · COMET ARCHER", name: "Nova",
    quote: "“ one shot, one comet ”",
    portraitKey: "nova", accentColor: C.HOT_PINK,
    stats: [4, 9, 8, 8],
    palette6: ["FF9FC7", "FFE2CC", "FFF4E6", "FFD66B", "FF6FA3", "B23A6F"],
    kit: [
      ["Comet Shot",    "piercing arrow, hits up to 3 targets"],
      ["Sprint",        "passive — +20% movement speed"],
      ["Meteor Volley", "6 arrows in 3 seconds"],
    ],
  });

  // ============================================================
  // SLIDE 5 — ASTER
  // ============================================================
  characterSlide({
    idx: 5, factionTag: "★ CELESTIALS", factionColor: C.PINK_BLOOM,
    role: "TANK · MOONSHIELD GUARDIAN", name: "Aster",
    quote: "“ the moon stands with me ”",
    portraitKey: "aster", accentColor: C.LAVENDER,
    stats: [10, 4, 2, 4],
    palette6: ["C9B8FF", "FFE2CC", "FFD66B", "FFFFFF", "FFB8D1", "3A5BA0"],
    kit: [
      ["Lunar Wall",    "place barrier, blocks 400 dmg"],
      ["Taunt",         "forces enemies within 2 tiles to target her"],
      ["Eclipse Guard", "50% dmg reduction for allies, 6s"],
    ],
  });

  // ============================================================
  // SLIDE 6 — NYX
  // ============================================================
  characterSlide({
    idx: 6, factionTag: "☾ VOIDBORN", factionColor: C.LAVENDER,
    role: "MAGIC · NEBULA WITCH", name: "Nyx",
    quote: "“ the void remembers everything ”",
    portraitKey: "nyx", accentColor: C.HOT_PINK,
    stats: [5, 8, 8, 5],
    palette6: ["2B1B47", "E8D4E8", "6B3FA0", "C9B8FF", "FF9FE0", "FF6FA3"],
    kit: [
      ["Hex Cloud",  "4-tile radius, 8s duration"],
      ["Siphon",     "drains HP from enemy, heals allies"],
      ["Black Hole", "pull all enemies to center tile"],
    ],
  });

  // ============================================================
  // SLIDE 7 — VEX
  // ============================================================
  characterSlide({
    idx: 7, factionTag: "☾ VOIDBORN", factionColor: C.LAVENDER,
    role: "DPS · SHADOW STRIKER", name: "Vex",
    quote: "“ catch me if you can, sugar ”",
    portraitKey: "vex", accentColor: C.NEBULA,
    stats: [5, 9, 3, 10],
    palette6: ["8EE6D6", "E8D4E8", "2B1B47", "FF6FA3", "FFD66B", "8EE6D6"],
    kit: [
      ["Twin Daggers", "3 hits per attack cycle"],
      ["Warp Step",    "blink 3 tiles, refreshes on kill"],
      ["Eventide",     "invisible, +100% crit for 4s"],
    ],
  });

  // ============================================================
  // SLIDE 8 — ORIN
  // ============================================================
  characterSlide({
    idx: 8, factionTag: "☾ VOIDBORN", factionColor: C.LAVENDER,
    role: "TANK · ECLIPSE BULWARK", name: "Orin",
    quote: "“ break on me and be broken ”",
    portraitKey: "orin", accentColor: C.NEBULA,
    stats: [10, 5, 2, 3],
    palette6: ["C9B8FF", "E8D4E8", "3E2464", "8EE6D6", "C9B8FF", "FFD66B"],
    kit: [
      ["Void Plate",   "absorbs 25% of incoming dmg"],
      ["Gravity Slam", "stun in 2-tile cone, 1.5s"],
      ["Singularity",  "taunt all, reflect 30% dmg, 5s"],
    ],
  });

  // ============================================================
  // SLIDE 9 — RESPONSIVE LAYOUT
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.DEEP_SPACE };

    monoText(s, "09 · RESPONSIVE LAYOUT", {
      x: 1.04, y: 0.89, w: 18.45, h: 0.38,
      fontSize: 16, color: C.LAVENDER, charSpacing: 4,
    });
    textBox(s, "Desktop & mobile screen specs", {
      x: 1.04, y: 1.27, w: 18.45, h: 0.74,
      fontSize: 36, bold: true, color: C.WHITE,
    });

    // ============ DESKTOP WIREFRAME ============
    monoText(s, "DESKTOP · 1440 × 900 MIN · 16:9 STAGE", {
      x: 1.04, y: 2.49, w: 10.23, h: 0.33,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });

    // Desktop frame
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.04, y: 2.91, w: 8.12, h: 4.58,
      fill: { color: C.MID_SPACE },
      line: { color: C.PLUM, width: 1 }, rectRadius: 0.08,
    });

    // Top HUD band
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.06, y: 2.93, w: 8.08, h: 0.56,
      fill: { color: C.PINK_BLOOM }, line: { type: "none" },
    });
    textBox(s, "♥ 20", {
      x: 1.23, y: 3.10, w: 0.54, h: 0.26,
      fontSize: 12, bold: true, color: C.DEEP_SPACE,
    });
    monoText(s, "✦ 350", {
      x: 1.81, y: 3.08, w: 0.71, h: 0.29,
      fontSize: 14, color: C.DEEP_SPACE,
    });
    monoText(s, "WAVE 03 / 20", {
      x: 2.46, y: 3.10, w: 6.30, h: 0.26,
      fontSize: 12, color: C.DEEP_SPACE, align: "center", charSpacing: 3,
    });
    textBox(s, "⚙", {
      x: 8.80, y: 3.08, w: 0.26, h: 0.29,
      fontSize: 14, color: C.DEEP_SPACE,
    });

    // Play field (purple area)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.06, y: 3.49, w: 6.00, h: 3.15,
      fill: { color: C.LAVENDER }, line: { type: "none" },
    });
    textBox(s, "PLAY FIELD · tile = 64px", {
      x: 1.06, y: 4.83, w: 6.00, h: 0.51,
      fontSize: 14, bold: true, color: C.PLUM, align: "center", charSpacing: 2,
    });

    // Side rail
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.06, y: 3.49, w: 2.08, h: 3.15,
      fill: { color: C.PLUM }, line: { type: "none" },
    });
    monoText(s, "UNIT ROSTER", {
      x: 7.19, y: 3.62, w: 1.91, h: 0.24,
      fontSize: 11, color: C.LAVENDER, align: "center", charSpacing: 2,
    });
    // 3x2 roster cells
    for (let col = 0; col < 2; col++) {
      for (let row = 0; row < 3; row++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: 7.19 + col * 0.95, y: 3.92 + row * 0.54,
          w: 0.88, h: 0.47,
          fill: { color: C.CREAM }, line: { type: "none" },
        });
      }
    }
    monoText(s, "WAVE QUEUE ▸", {
      x: 7.19, y: 5.60, w: 1.91, h: 0.24,
      fontSize: 11, color: C.LAVENDER, align: "center", charSpacing: 2,
    });

    // Shop dock
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.06, y: 6.64, w: 8.08, h: 0.83,
      fill: { color: C.CREAM }, line: { type: "none" },
    });
    // Unit slots with labels
    const units = ["LUMI", "NOVA", "ASTER"];
    units.forEach((nm, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.23 + i * 0.68, y: 6.72, w: 0.55, h: 0.68,
        fill: { color: C.SOFT_PEACH },
        line: { color: C.PLUM, width: 0.5 },
      });
      textBox(s, nm, {
        x: 1.23 + i * 0.68, y: 7.16, w: 0.55, h: 0.19,
        fontSize: 8, bold: true, color: C.PLUM,
        align: "center", charSpacing: 1,
      });
    });
    monoText(s, "SHOP · 120px", {
      x: 7.53, y: 6.96, w: 1.53, h: 0.24,
      fontSize: 11, color: C.MUTED_DIM, charSpacing: 2,
    });

    // Desktop callout cards (annotations)
    const deskCallouts = [
      ["TOP HUD",   "80px",  1.04],
      ["SIDE RAIL", "280px", 3.55],
      ["SHOP DOCK", "120px", 6.06],
      ["TILE SIZE", "64px",  8.57],
    ];
    deskCallouts.forEach(([label, val, x]) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 7.64, w: 2.40, h: 0.71,
        fill: { color: C.WHITE, transparency: 92 },
        line: { color: C.PLUM, width: 0.5 },
      });
      monoText(s, label, {
        x: x + 0.13, y: 7.73, w: 2.23, h: 0.28,
        fontSize: 11, color: C.LAVENDER, charSpacing: 2,
      });
      monoText(s, val, {
        x: x + 0.13, y: 7.96, w: 2.23, h: 0.33,
        fontSize: 16, color: C.STAR_GOLD,
      });
    });

    // ============ MOBILE WIREFRAME ============
    monoText(s, "MOBILE · 390 × 844 PORTRAIT", {
      x: 11.60, y: 2.49, w: 7.58, h: 0.33,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });

    // Phone body
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 11.60, y: 2.91, w: 2.29, h: 4.58,
      fill: { color: C.MID_SPACE },
      line: { color: C.PLUM, width: 1 }, rectRadius: 0.22,
    });
    // Notch
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 12.33, y: 2.99, w: 0.83, h: 0.17,
      fill: { color: "000000" }, line: { type: "none" }, rectRadius: 0.08,
    });
    // Top HUD
    s.addShape(pres.shapes.RECTANGLE, {
      x: 11.70, y: 3.24, w: 2.08, h: 0.46,
      fill: { color: C.PINK_BLOOM }, line: { type: "none" },
    });
    textBox(s, "♥20", {
      x: 11.81, y: 3.39, w: 0.36, h: 0.21,
      fontSize: 10, bold: true, color: C.DEEP_SPACE,
    });
    monoText(s, "W 03/20", {
      x: 12.38, y: 3.39, w: 0.70, h: 0.21,
      fontSize: 10, color: C.DEEP_SPACE, align: "center", charSpacing: 1,
    });
    monoText(s, "✦350", {
      x: 13.20, y: 3.37, w: 0.56, h: 0.24,
      fontSize: 11, color: C.DEEP_SPACE, align: "right",
    });

    // Play field
    s.addShape(pres.shapes.RECTANGLE, {
      x: 11.70, y: 3.80, w: 2.08, h: 2.54,
      fill: { color: C.DEEP_SPACE },
      line: { color: C.PLUM, width: 0.5 },
    });
    monoText(s, "PLAY FIELD", {
      x: 11.70, y: 5.00, w: 2.08, h: 0.20,
      fontSize: 10, color: C.LAVENDER, align: "center", charSpacing: 2,
    });

    // Unit shop row
    s.addShape(pres.shapes.RECTANGLE, {
      x: 11.70, y: 6.43, w: 2.08, h: 0.96,
      fill: { color: C.CREAM }, line: { type: "none" },
    });
    monoText(s, "UNIT SHOP", {
      x: 11.77, y: 6.50, w: 2.03, h: 0.19,
      fontSize: 9, color: C.PLUM, align: "center", charSpacing: 2,
    });
    for (let i = 0; i < 6; i++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 11.77 + i * 0.33, y: 6.72, w: 0.29, h: 0.58,
        fill: { color: C.SOFT_PEACH },
        line: { color: C.PLUM, width: 0.3 },
      });
    }

    // Mobile callouts
    const mobCallouts = [
      ["TOP HUD",    "64px",  11.60],
      ["ACTION DOCK","140px", 15.33],
    ];
    mobCallouts.forEach(([label, val, x]) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 7.64, w: 3.63, h: 0.71,
        fill: { color: C.WHITE, transparency: 92 },
        line: { color: C.PLUM, width: 0.5 },
      });
      monoText(s, label, {
        x: x + 0.13, y: 7.73, w: 3.46, h: 0.28,
        fontSize: 11, color: C.LAVENDER, charSpacing: 2,
      });
      monoText(s, val, {
        x: x + 0.13, y: 7.96, w: 3.46, h: 0.33,
        fontSize: 16, color: C.STAR_GOLD,
      });
    });

    // ============ BOTTOM: 3 reference blocks ============
    // BREAKPOINTS
    monoText(s, "BREAKPOINTS", {
      x: 1.04, y: 8.78, w: 5.87, h: 0.33,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });
    const bps = [
      ["xs", "320 – 479 · portrait phone"],
      ["sm", "480 – 767 · large phone"],
      ["md", "768 – 1023 · tablet"],
      ["lg", "1024 – 1439 · laptop"],
      ["xl", "1440+ · desktop"],
    ];
    bps.forEach(([k, v], i) => {
      const y = 9.18 + i * 0.33;
      monoText(s, k, {
        x: 1.04, y, w: 0.92, h: 0.31,
        fontSize: 14, color: C.STAR_GOLD,
      });
      monoText(s, v, {
        x: 2.00, y, w: 4.6, h: 0.31,
        fontSize: 13, color: C.WHITE,
      });
    });

    // RENDER
    monoText(s, "RENDER", {
      x: 7.15, y: 8.78, w: 5.87, h: 0.33,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });
    const render = [
      ["canvas",    "PixiJS · 60fps target"],
      ["scale",     "integer-only · image-rendering:pixelated"],
      ["tilemap",   "64×64 · iso-offset optional"],
      ["DPR",       "cap @2 for perf"],
      ["safe-area", "env(safe-area-inset-*)"],
    ];
    render.forEach(([k, v], i) => {
      const y = 9.18 + i * 0.33;
      monoText(s, k, {
        x: 7.15, y, w: 1.2, h: 0.31,
        fontSize: 14, color: C.NEBULA,
      });
      monoText(s, v, {
        x: 8.40, y, w: 4.6, h: 0.31,
        fontSize: 13, color: C.WHITE,
      });
    });

    // UI TOKENS
    monoText(s, "UI TOKENS", {
      x: 13.26, y: 8.78, w: 5.87, h: 0.33,
      fontSize: 13, color: C.LAVENDER, charSpacing: 3,
    });
    const tokens = [
      ["radius",     "2px · 4px · 8px (cards)"],
      ["hit-target", "min 44×44 (mobile)"],
      ["health-bar", "48 × 6 px · above sprite"],
      ["tooltip",    "280px max · VT323 18px"],
      ["modal",      "640px · cream paper bg"],
    ];
    tokens.forEach(([k, v], i) => {
      const y = 9.18 + i * 0.33;
      monoText(s, k, {
        x: 13.26, y, w: 1.3, h: 0.31,
        fontSize: 14, color: C.PINK_BLOOM,
      });
      monoText(s, v, {
        x: 14.60, y, w: 4.6, h: 0.31,
        fontSize: 13, color: C.WHITE,
      });
    });
  }

  // =============================================================
  // WRITE FILE
  // =============================================================
  await pres.writeFile({ fileName: "chibi-star-command.pptx" });
  console.log("✓ Written: chibi-star-command.pptx");
}

build().catch(err => { console.error(err); process.exit(1); });
