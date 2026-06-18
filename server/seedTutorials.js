import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Tutorial from "./models/Tutorial.js";

dotenv.config();

const tutorials = [
  // CHEST
  {
    workoutName: "Flat Barbell Bench Press",
    category: "Chest",
    youtubeUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
    description: "The king of chest exercises. Builds overall chest mass, strength, and thickness using a barbell on a flat bench.",
    benefits: [
      "Builds overall chest mass and strength",
      "Engages triceps and front deltoids",
      "Improves pushing power",
      "Great for progressive overload",
    ],
    precautions: [
      "Always use a spotter when lifting heavy",
      "Don't bounce the bar off your chest",
      "Keep wrists straight and firm",
      "Avoid flaring elbows too wide",
    ],
    preventiveMeasures: [
      "Warm up rotator cuffs before lifting",
      "Start with lighter weight to perfect form",
      "Keep feet flat on the floor",
      "Retract shoulder blades for stability",
    ],
  },
  {
    workoutName: "Incline Dumbbell Press",
    category: "Chest",
    youtubeUrl: "https://www.youtube.com/watch?v=8iPEnn-ltC8",
    description: "Targets the upper chest and front deltoids. Performed on an incline bench with dumbbells for better range of motion.",
    benefits: [
      "Targets the upper chest specifically",
      "Greater range of motion than barbell",
      "Improves chest symmetry",
      "Each arm works independently",
    ],
    precautions: [
      "Don't set incline too steep (30-45 degrees ideal)",
      "Control the dumbbells on the way down",
      "Avoid locking elbows at the top",
      "Don't let dumbbells drift too far apart",
    ],
    preventiveMeasures: [
      "Use lighter weight than flat bench",
      "Keep core engaged throughout",
      "Ask for help getting heavy dumbbells into position",
      "Stop if you feel shoulder joint pain",
    ],
  },
  {
    workoutName: "Cable Chest Fly",
    category: "Chest",
    youtubeUrl: "https://www.youtube.com/watch?v=taI4XduLpTk",
    description: "An isolation exercise using cables to stretch and contract the chest muscles through a wide arc of motion.",
    benefits: [
      "Isolates chest muscles effectively",
      "Constant tension throughout movement",
      "Great for chest definition and shape",
      "Reduces shoulder strain vs dumbbell flys",
    ],
    precautions: [
      "Keep a slight bend in elbows throughout",
      "Don't use too much weight",
      "Control the movement — don't let cables pull you back",
      "Avoid hunching shoulders forward",
    ],
    preventiveMeasures: [
      "Fully stretch chest at the start position",
      "Squeeze chest hard at the peak contraction",
      "Keep chest up and core tight",
      "Use slow tempo for best results",
    ],
  },

  // SHOULDERS
  {
    workoutName: "Overhead Barbell Press",
    category: "Shoulders",
    youtubeUrl: "https://www.youtube.com/watch?v=2yjwXTZQDDI",
    description: "A compound shoulder exercise that builds overall shoulder mass and pressing strength by pressing a barbell overhead.",
    benefits: [
      "Builds overall shoulder size and strength",
      "Engages triceps and upper traps",
      "Improves overhead mobility",
      "Great compound movement for upper body",
    ],
    precautions: [
      "Don't arch lower back excessively",
      "Keep core braced throughout",
      "Avoid pressing with a forward head position",
      "Use a shoulder-width grip",
    ],
    preventiveMeasures: [
      "Warm up shoulders and rotator cuffs",
      "Start light and progress gradually",
      "Keep bar path straight over head",
      "Stop if you feel sharp neck or shoulder pain",
    ],
  },
  {
    workoutName: "Dumbbell Lateral Raise",
    category: "Shoulders",
    youtubeUrl: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    description: "Isolates the medial (side) deltoid to build wider, rounder shoulders. Performed by raising dumbbells to shoulder height.",
    benefits: [
      "Builds width and roundness to shoulders",
      "Isolates the medial deltoid",
      "Improves shoulder aesthetics",
      "Low injury risk when done correctly",
    ],
    precautions: [
      "Don't use momentum or swing the body",
      "Keep a slight bend in elbows",
      "Don't raise above shoulder height",
      "Use lighter weights with strict form",
    ],
    preventiveMeasures: [
      "Lead with elbows, not wrists",
      "Keep neck relaxed — don't shrug",
      "Use slow controlled tempo",
      "Avoid this if you have rotator cuff issues",
    ],
  },
  {
    workoutName: "Arnold Press",
    category: "Shoulders",
    youtubeUrl: "https://www.youtube.com/watch?v=6Z15_WdXmVw",
    description: "A dumbbell shoulder press variation invented by Arnold Schwarzenegger that hits all three deltoid heads through a rotating motion.",
    benefits: [
      "Hits all three heads of the deltoid",
      "Greater range of motion than standard press",
      "Builds well-rounded shoulder development",
      "Improves shoulder stability",
    ],
    precautions: [
      "Use lighter weight than standard press",
      "Rotate slowly and with control",
      "Don't rush the movement",
      "Avoid if you have shoulder impingement",
    ],
    preventiveMeasures: [
      "Warm up thoroughly before attempting",
      "Master standard dumbbell press first",
      "Keep back straight and core tight",
      "Start with a comfortable range of motion",
    ],
  },

  // BICEPS
  {
    workoutName: "Barbell Bicep Curl",
    category: "Biceps",
    youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
    description: "The classic bicep builder. Using a barbell allows heavier loads to maximise bicep size and strength.",
    benefits: [
      "Builds overall bicep mass and peak",
      "Allows heavier loading than dumbbells",
      "Strengthens forearms and grip",
      "Simple and effective movement",
    ],
    precautions: [
      "Don't swing the body to lift the weight",
      "Keep elbows pinned to your sides",
      "Don't fully drop weight — control the negative",
      "Avoid using wrist pain as a sign to stop",
    ],
    preventiveMeasures: [
      "Use an EZ bar to reduce wrist strain",
      "Keep shoulders back and down",
      "Fully extend at the bottom for full range",
      "Squeeze the bicep hard at the top",
    ],
  },
  {
    workoutName: "Hammer Curl",
    category: "Biceps",
    youtubeUrl: "https://www.youtube.com/watch?v=zC3nLlEvin4",
    description: "A dumbbell curl variation with a neutral grip that targets the brachialis and brachioradialis for thicker arms.",
    benefits: [
      "Targets brachialis for thicker arms",
      "Builds forearm strength",
      "Neutral grip is easier on wrists",
      "Good for overall arm development",
    ],
    precautions: [
      "Keep elbows stationary at your sides",
      "Don't use momentum",
      "Control the weight on the way down",
      "Keep wrists neutral throughout",
    ],
    preventiveMeasures: [
      "Can be done alternating or together",
      "Keep upper body still",
      "Avoid if you have elbow tendonitis",
      "Use full range of motion for best results",
    ],
  },
  {
    workoutName: "Concentration Curl",
    category: "Biceps",
  youtubeUrl: "https://www.youtube.com/watch?v=0AUGkch3tzc",
    description: "An isolation exercise that maximises the bicep peak by curling a dumbbell while bracing the elbow against the inner thigh.",
    benefits: [
      "Maximum isolation of the bicep",
      "Builds bicep peak",
      "Eliminates cheating and momentum",
      "Great for mind-muscle connection",
    ],
    precautions: [
      "Don't move the upper arm during the curl",
      "Sit upright and brace elbow firmly",
      "Use a weight you can fully control",
      "Don't rush the movement",
    ],
    preventiveMeasures: [
      "Squeeze hard at the top of each rep",
      "Lower the weight slowly",
      "Keep wrist straight throughout",
      "Focus on the muscle, not the weight",
    ],
  },

  // LEGS
  {
    workoutName: "Barbell Back Squat",
    category: "Legs",
    youtubeUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8",
    description: "The king of all leg exercises. Builds overall lower body strength and mass targeting quads, hamstrings, and glutes.",
    benefits: [
      "Builds overall leg strength and mass",
      "Engages core and lower back",
      "Boosts testosterone and growth hormone",
      "Improves athletic performance",
    ],
    precautions: [
      "Never round your lower back",
      "Keep knees tracking over toes",
      "Use a spotter or safety bars for heavy sets",
      "Warm up hips and knees thoroughly",
    ],
    preventiveMeasures: [
      "Master bodyweight squat first",
      "Use proper footwear with flat sole",
      "Progress weight gradually",
      "Stop immediately if you feel sharp joint pain",
    ],
  },
  {
    workoutName: "Romanian Deadlift",
    category: "Legs",
    youtubeUrl: "https://www.youtube.com/watch?v=JCXUYuzwNrM",
    description: "A hip-hinge movement that targets the hamstrings and glutes. Great for building posterior chain strength and flexibility.",
    benefits: [
      "Targets hamstrings and glutes directly",
      "Improves hip hinge mechanics",
      "Builds posterior chain strength",
      "Enhances hamstring flexibility",
    ],
    precautions: [
      "Keep back straight — never round the spine",
      "Push hips back, don't bend at waist",
      "Keep bar close to legs throughout",
      "Don't lock knees completely",
    ],
    preventiveMeasures: [
      "Start with light weight to learn the hinge",
      "Feel the hamstring stretch at the bottom",
      "Keep core braced throughout",
      "Stop if you feel lower back strain",
    ],
  },
  {
    workoutName: "Leg Press",
    category: "Legs",
    youtubeUrl: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
    description: "A machine-based compound leg exercise that targets the quads, hamstrings, and glutes with reduced lower back stress.",
    benefits: [
      "Builds quad and glute mass safely",
      "Less lower back stress than squats",
      "Easy to progressively overload",
      "Good for beginners and advanced lifters",
    ],
    precautions: [
      "Never lock out knees at the top",
      "Don't let knees cave inward",
      "Keep lower back pressed against pad",
      "Don't go too deep if hips lift off pad",
    ],
    preventiveMeasures: [
      "Adjust seat position before loading weight",
      "Use full range of motion",
      "Vary foot position to target different muscles",
      "Avoid this if you have knee injuries",
    ],
  },
];

const seedTutorials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    await Tutorial.deleteMany({});
    console.log("Cleared existing tutorials");

    await Tutorial.insertMany(tutorials);
    console.log(`✅ Successfully seeded ${tutorials.length} tutorials!`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedTutorials();