window.addEventListener('DOMContentLoaded', (event) => {
    console.log('hello main.js')
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAU7yRc07l1fAtIQskR-TUFrQHmCMgTpcg",
        authDomain: "tflvoting.firebaseapp.com",
        databaseURL: "https://tflvoting.firebaseio.com",
        projectId: "tflvoting",
        storageBucket: "tflvoting.appspot.com",
        messagingSenderId: "102485799417"
        };
    
    firebase.initializeApp(config);
    const db = firebase.database().ref()
    
    // Create an empty DOM representation of currently available bars DATA
    const lineDataDOM = {}
    const lineBars = document.getElementsByClassName('shape')
    Array.from(lineBars).forEach(elem => {
        lineDataDOM[elem.id] = null
    })

    // All logic goes in this asyn function
    db.on('value', snapshot => {

        // Get current vote counts from Firebase
        const firebaseVotes = snapshot.val();

        // Update DOM representation of Firebase vote counts
        Object.keys(lineDataDOM).forEach(line => {
            lineDataDOM[line] = firebaseVotes[line]
        })

        // Set initial bar widths & labels to Firebase data
        Array.from(lineBars).forEach(elem => {
            elem.style.width = `${firebaseVotes[elem.id]}px`
            elem.innerHTML = `${firebaseVotes[elem.id]} votes`
        })

        // Sum up current Firebase data
        let totalVotesLabel = document.getElementById('totalVotesCounter')
        let totalVotes = Object.values(lineDataDOM)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        totalVotes = totalVotes.reduce(reducer)
        totalVotesLabel.innerHTML = `Votes so far: <b>${totalVotes}</b>`
        console.log(totalVotes)

        // Update Firebase data via event listeners
        Array.from(lineBars).forEach(elem => {
            let currentVotes = lineDataDOM[elem.id]
            elem.addEventListener('click', event => {
                currentVotes ++
                db.child(elem.id).set(currentVotes);
            })
        })


        totalVotes

        // do all updating within this async function
    });

    
    
    
    
})
