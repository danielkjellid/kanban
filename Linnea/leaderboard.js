function leaderBoard() {

    let doneTasks = tasksIndex.count("done");
    
    let danielCounter = 0;
    let linneaCounter = 0;
    let kainatCounter = 0;
    let sultanCounter = 0;
    let magoCounter = 0;

    doneTasks.onerror = function() {
        //error handler
    }

    doneTasks.onsuccess = function() {
        
        let count = 0;
        
    //hent først ut alle kort
    for (let i = 1; i < doneTasks.result+1; i++) {
        let getTasks = tasksStore.get(i);

        getTasks.onerror = function() {
            //error handler for å hente alle tasks
        }

        getTasks.onsuccess = function() {
            if (getTasks.result.memberFullName == "Daniel Kjellid") {
                    count++;
                    danielCounter = count;
            } else if (getTasks.result.memberFullName == "Linnea S. Fylling") {
                    linneaCounter++;
            } else if (getTasks.result.memeberFullName == "Kainat Zahoor") { 
                    kainatCounter++;
            } else if (getTasks.result.memberFullName == "Magomed Derbtichev") {
                    magoCounter++;            
            } else if (getTasks.result.memberFullName == "Sultan Khan") {
                    sultanCounter++;
                
            }
                //do nothing

            }
        
        }
        
         console.log("d " + danielCounter);
        
         //function to sort the score in a descending order. Highest score in index 0. 
         function sortScore(a, b) {
                return b - a;
            }
    
                let score = [danielCounter, linneaCounter, kainatCounter, magoCounter, sultanCounter];
    
                    score.sort(sortScore);
                    console.log(score);
    }     
}