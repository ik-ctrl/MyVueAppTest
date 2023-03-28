let app = new Vue({
    el: '.main',
    data: {
        tgKeyConst: 'sc2TotalGame',
        showMain: true,
        showSocial: false,
        showAchivments: false,
        showQuations: false,
        showResult: false,
        number: 0,
        score: {
            'zerg': 0,
            'primal': 0,
            'protoss': 0,
            'taldarim': 0,
            'terran': 0,
        },
        totalGame: localStorage.getItem('sc2TotalGame')
            ? JSON.parse(localStorage.getItem('sc2TotalGame'))
            : {
                'zerg': 0,
                'primal': 0,
                'protoss': 0,
                'taldarim': 0,
                'terran': 0,
                'infested': 0,
                'hybrid': 0,
            },
        totalGames: localStorage.getItem('sc2TotalGames')
            ? localStorage.getItem('sc2TotalGames')
            : 0,
        questions: questions,
        results: results,
        resultRace: "protoss",
    },
    methods: {
        goToMain() {
            // this.showSocial = false;
            this.showAchivments = false;
            this.showQuations = false;
            this.showResult = false;
            this.showMain = true;
        },
        // goToSocial() {
        //     this.showSocial = true;
        //     this.showAchivments = false;
        //     this.showQuations = false;
        //     this.showResult = false;
        //     this.showMain = false;
        // },
        goToAchivments() {
            if (this.totalGames > 0) {
                // this.showSocial = false;
                this.showAchivments = true;
                this.showQuations = false;
                this.showResult = false;
                this.showMain = false;
                return;
            }
            this.goToQuestions();
        },
        goToQuestions() {
            this.score = {
                'zerg': 0,
                'primal': 0,
                'protoss': 0,
                'taldarim': 0,
                'terran': 0,
            }
            this.showSocial = false;
            this.showAchivments = false;
            this.showQuations = true;
            this.showResult = false;
            this.showMain = false;
        },
        goToResults(race) {
            console.log(race)
            this.resultRace = race;
            this.showSocial = false;
            this.showAchivments = false;
            this.showQuations = false;
            this.showResult = true;
            this.showMain = false;
        },
        goNextQuestions(answer) {
            if (this.number === 24) {
                this.number = 0;
                this.endGame();
            } else {
                this.number++;
            }
            eval(answer)
        },
        endGame() {
            this.totalGames++;
            localStorage.setItem('sc2TotalGames', this.totalGames);
            if (
                this.score.zerg > this.score.protoss
                && this.score > this.score.terran
                && this.score.primal < 8
                && Math.abs(this.score.protoss - this.score.zerg) > 3) {
                this.totalGame.zerg += 1;
                this.goToResults('zerg')
            } else if (
                this.score.primal > this.score.protoss
                && this.score.primal > this.score.terran
                && this.score.primal === 8
            ) {
                this.totalGame.primal += 1;
                this.goToResults('primal')
            }
            else if (
                this.score.protoss > this.score.zerg
                && this.score.protoss > this.score.terran
                && this.score.taldarim < 5
                && Math.abs(this.score.protoss - this.score.zerg) > 3
            ) {
                this.totalGame.protoss += 1;
                this.goToResults('protoss')
            } else if (
                this.score.protoss > this.score.zerg
                && this.score.protoss > this.score.terran
                && this.score.taldarim === 5
            ) {
                this.totalGame.taldarim += 1;
                this.goToResults('taldarim')
            } else if (
                this.score.terran > this.score.zerg
                && this.score.terran > this.score.protoss
            ) {
                this.totalGame.terran += 1;
                this.goToResults('terran')
            } else if (
                Math.abs(this.score.protoss - this.score.zerg) <= 3
            ) {
                this.totalGame.hybrid += 1;
                this.goToResults('hybrid')
            }
            else {
                this.totalGame.infested += 1;
                this.goToResults('infested')
            }
            localStorage.setItem('sc2TotalGame', JSON.stringify(this.totalGame));
        }
    },
    computed: {
        totalScore() {
            let score = 0;
            for (let i in this.totalGame) {
                console.log(i)
                score += (this.totalGame[i] * results[i].points);
            }
            return score;
        },
        openedRace() {
            let score = 0;
            for (let i in this.totalGame) {
                if (this.totalGame[i] > 0) {
                    score += 1;
                }
            }
            return score;
        },
        favoriteRace() {
            let maxIndex = 'zerg';
            for (let i in this.totalGame) {
                if (this.totalGame[i] > this.totalGame[maxIndex]) {
                    maxIndex = i
                }
            }
            return results[maxIndex].name;
        },
        showResultRace() {
            return {
                'zerg': this.totalGame.zerg > 0 ? true : false,
                'primal': this.totalGame.primal > 0 ? true : false,
                'terran': this.totalGame.terran > 0 ? true : false,
                'infested': this.totalGame.infested > 0 ? true : false,
                'protoss': this.totalGame.protoss > 0 ? true : false,
                'taldarim': this.totalGame.taldarim > 0 ? true : false,
                'hybrid': this.totalGame.hybrid > 0 ? true : false,
            }
        }
    }
})

// let audio = new Audio('audio/soundtrack.mp3');
// let audioBtn = document.querySelector('.btn_sound');
// let audioIcon = document.querySelector('.btn_sound i');
// audio.muted = true;
// audio.autoplay = true;
// audio.volume = 0.1;

// audio.addEventListener('loadmetadata', function(){
//     audio.currentTime = 0 + Math.random()* (audio.duration+1-0);
// });

// audioBtn.addEventListener('click', function(){ 
//     if(audio.muted) {
//         audio.muted=false;
//         audioIcon.classList.add('fa-volume-up');
//         audioIcon.classList.remove('fa-volume-off');
//     } else if(!audio.muted) {
//         audio.muted=true;
//         audioIcon.classList.add('fa-volume-off');
//         audioIcon.classList.remove('fa-volume-up');
//     }
// })