export const tileType = ["Road", "Roadside", "Landscape", "Special", "Golden", "Class"];

export const minTotalCards = 7;
export const maxTotalCards = 15;

export const placeholderDeck = [[], [], [], [], [], [], ['00'], ['00'], ['00'], ['00'], ['00']];

export const roadCards = ["Cemetery", "Village", "Grove", "Wheat Fields", "Swamp", "Ruins"];
roadCards.name = "Road";
export const roadsideCards = ["Spider Cocoon", "Vampire Mansion", "Battlefield", "Blood Grove", "Bookery", "Road Lantern", "Smith Forge", "Chrono Crystals", "Outpost"];
roadsideCards.name = "Roadside";
export const landscapeCards = ["Mountain", "Thicket", "River", "Sand Dunes", "Meadow", "Suburbs"];
landscapeCards.name = "Landscape";
export const specialCards = ["Oblivion", "Beacon", "Storm Temple", "Temporal Beacon", "Treasury"];
specialCards.name = "Special";
export const goldCards = ["Ancestral Crypt", "Zero Milestone", "Maze Of Memories", "Arsenal"];
goldCards.name = "Gold";
export const classChoice = ["Warrior", "Rogue", "Necromancer"];
classChoice.name = "Class"

export const totalCards = [roadCards.slice(), roadsideCards.slice(), landscapeCards.slice(), specialCards.slice(), goldCards.slice(), classChoice.slice()];