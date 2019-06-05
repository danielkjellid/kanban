
function leaderBoard() {
    

    let doneTasks = tasksIndex.count("done");
    
    //declare new variabels, 0 = number of points each member start with
    let danielCounter = 0;
    let linneaCounter = 0;
    let kainatCounter = 0;
    let sultanCounter = 0;
    let magoCounter = 0;

    //error handler
    doneTasks.onerror = function() {
    }

    doneTasks.onsuccess = function() {
        
    //get all the cards
    for (let i = 1; i < doneTasks.result+1; i++) {
        let getTasks = tasksStore.get(i);

        //error handler 
        getTasks.onerror = function() {
    
        }

        getTasks.onsuccess = function() {
            
            if (getTasks.result.memberFullName == "Daniel Kjellid") {
                    danielCounter++;
                    console.log("d " + danielCounter);
            } else if (getTasks.result.memberFullName == "Linnea S. Fylling") {
                    linneaCounter++;
            } else if (getTasks.result.memeberFullName == "Kainat Zahoor") { 
                    kainatCounter++;
            } else if (getTasks.result.memberFullName == "Magomed Derbtichev") {
                    magoCounter++;            
            } else if (getTasks.result.memberFullName == "Sultan Khan") {
                    sultanCounter++;
                
                }    
            } 
        } 
    }
}