/*
MrFarland & Felix MIL
version 1.0
----------------
generateNPC.js
*/

 // Pull race and gender for an NPC based on the selections in the dropdown menus.
 // --------------------------------------------------------------------------------

 function getRace() {

    // Get the current value from the selectRace dropdown menu.
    selectRace = document.getElementById('selectRace');
    race = selectRace.options[selectRace.selectedIndex].value;

    // If no race has been selected, generate one randomly.
    if (race == "None"){
        race = generate_text("Race");
    }
    
    // Fix the race and subrace variables for Humans, Half-Elves, and Half-Orcs.
    humanCultures = ["Arabic","Barovian","Celtic","Chinese","Egyptian","English","French","German","Greek","Indian","Japanese","Maori","Mesoamerican","Niger-Congo","Norse","Polynesian","Roman","Slavic","Spanish"];

    if (humanCultures.includes(race)){
        subRace = race;
        race = "Human";
    } else if (race == "Half-Elf"){
        subRaceLookup = (race + "Subrace");
        subRace = generate_text(subRaceLookup);
        if (subRace == "Human"){
            subRaceLookup = (subRace + "Subrace");
            subRace = generate_text(subRaceLookup);
        }
    } else if (race == "Half-Orc"){
        subRaceLookup = (race + "Subrace");
        subRace = generate_text(subRaceLookup);
        if (subRace == "Human"){
            subRaceLookup = (subRace + "Subrace");
            subRace = generate_text(subRaceLookup);
        }
    } else {
        subRaceLookup = (race + "Subrace");
        subRace = generate_text(subRaceLookup);   
    }

    // Create a variable to combine race and subrace, if there is one.
    if (subRace == "None" || race == "Half-Elf" || race == "Half-Orc"){
        fullRace = (race);
    } else {
        fullRace = (race + " (" + subRace + ")");
    }

    // Return the values for racein an array.
    return [race, subRace, fullRace];

}

function getGender() {

    // Get the NPCs genderForm from the selectGender dropdown.
    // - genderForm refers to the feminine or masculine form of the given name.
    selectGender = document.getElementById('selectGender');
    genderForm = selectGender.options[selectGender.selectedIndex].value;

    // If the NPCs genderForm is not defined, choose one randomly.
    if (genderForm == "None"){
        genderForm = generate_text("Gender");
    }

    // Get the NPCs genderID from the selectGender dropdown.
    // - GenderID refers to the preferred gender identity of the NPC.
    selectGender = document.getElementById('selectGender');
    genderID = selectGender.options[selectGender.selectedIndex].text;
 
    // If the NPCs genderID is not defined, default to cisgender equivalent for the genderForm.
    if (genderID == "Any Gender" && genderForm=="Feminine"){
        genderID = "Cisgender (F)";
    } else {
        genderID = "Cisgender (M)";
    }

    // Return the values for race and gender in an array.
    return [genderForm, genderID];

}


// Generate a name based on the race & gender provided by getRaceGender.
// --------------------------------------------------------------------------------

function generateName() {

    // Get the race and gender for the name from the getRaceGender function.
    getRace();
    getGender();

    // Identify the appropriate name lists to select from based on race/subrace.
    // --- Human names are based on their subrace and not their race.
    // --- Half-Elves & Half-Orcs can have a name from either of their parent's cultures.
    // --- Half-Elves & Half-Orcs with human names need to draw from the various culturws.
    if (race == "Human" || race == "Half-Elf" || race == "Half-Orc"){
        familyNameList = (subRace + "Family");
        givenNameList = (subRace + genderForm);
    } else {
        familyNameList = (race + "Family");
        givenNameList = (race + genderForm);
    }

    familyName = generate_text(familyNameList);
    givenName = generate_text(givenNameList);
    
    // Generate a child name for Elves.
    if (race == "Elf"){
        childName = generate_text(race + "Child");
    } else if (subRace == "Elf"){
        childName = generate_text(subRace + "Child");
    } else {
        childName = "";
    }
    
    // Generate a virtue name for Tieflings.
    if (race == "Tiefling"){
        virtueName = generate_text(race + "Virtue");
    } else {
        virtueName = "";
    }

    // Generate the full name based on the race/subrace convention.
    if (familyName == null){
        fullName = (givenName);
    } else if (subRace == "Chinese"){
        fullName = (familyName + " " + givenName);
    } else if (race == "Tiefling"){
        fullName = (givenName + "  \"" + virtueName + "\"");
    } else {
        fullName = (givenName + " " + familyName);
    }

    // Return the family, given and full names for the character.
    return [familyName, givenName, fullName, childName, virtueName]; 

 }

    
// Generate an NPC with a name & description of their appearance, personality, etc.
// --------------------------------------------------------------------------------

function generateNPC() {

    // Get a name for the NPC based on the race and gender selections.
    // - This will also get the race and gender for the NPC.
    generateName();

    // Generate the variables to define the NPCs appearance.
    
    age = generate_text("Age");
    eyes = generate_text("Eyes");
    hair = generate_text("Hair");
    height = generate_text("Height");
    weight = generate_text("Weight");

    // Generates a random description based on race and gender
    description = generate_text(race + genderForm + "Description"); 

    // Generates a random attitude for the NPC
    attitude = generate_text("Attitude")

    displayNPC()
     
}

// Populate HTML with generated values

function displayNPC() {

    // Character Details
    npcAge.innerHTML = age;
    npcGenderID.innerHTML = genderID;
    npcRace.innerHTML = race;
    npcSubRace.innerHTML = subRace;
    npcFullRace.innerHTML = fullRace; 

    // Character Name
    npcGenderForm.innerHTML = genderForm;
    npcFamilyName.innerHTML = familyName;
    npcGivenName.innerHTML = givenName;
    npcChildName.innerHTML = childName;
    npcVirtueName.innerHTML = virtueName;
    npcFullName.innerHTML = fullName;

    // Appearance
    npcEyes.innerHTML = eyes;
    npcHair.innerHTML = hair;
    npcHeight.innerHTML = height;
    npcWeight.innerHTML = weight;

}