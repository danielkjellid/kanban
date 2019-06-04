

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
        
    //getting all the cards
    for (let i = 1; i < doneTasks.result+1; i++) {
        let getTasks = tasksStore.get(i);

        getTasks.onerror = function() {
            //error handler for å hente alle tasks
        }

        getTasks.onsuccess = function() {
            console.log("d " + danielCounter);
            
            if (getTasks.result.memberFullName == "Daniel Kjellid") {
                    danielCounter++;
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
        
        
         //function to sort the score in a descending order. Highest score in index 0. 
         function sortScore(a, b) {
                return b - a;
            }
    
                let score = [danielCounter, linneaCounter, kainatCounter, magoCounter, sultanCounter];
    
                    score.sort(sortScore);
                    console.log(score);
    }     
}