const {createApp} = Vue;
const contacts =  [
    {
        name: 'Michele',
        avatar: 'img/avatar_1.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: 'img/avatar_2.jpg',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: 'img/avatar_3.jpg',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: 'img/avatar_4.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: 'img/avatar_5.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: 'img/avatar_5.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: 'img/avatar_7.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: 'img/avatar_8.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
];

const randomWords = [
    'tutto bene e tu?',
    'non ci sono stasera, mi spiace?',
    'hai visto Claudia?',
    'tornerò per le 8',
    'mi manca un ultimo esame', 
    'ho visto il tuo messaggio solo ora',
    'peccato non essere venuti',
    'ci vediamo a Lisbona',
    'quando torni da Berlino?',
    'hai visto la partita ieri?',
    'non contatemi per domani',
];

function createRandomNum(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

class Message {
    constructor(date, message, status){
        this.date = date;
        this.message = message;
        this.status = status;
    }
}

createApp({
    data(){
        return {
            contacts: contacts,
            randomAnswers: randomWords,
            activeContact: '',
            newMessage: '',
            searchedInput: '',
            hasClicked: false,
            slide: false,
            hasClikedIndex: '',
        }
    },
    methods: {
        changeActiveContact(index){
            this.activeContact = index;
            this.slide = true;
        },
        sendMessageAndResponse(){
            if(this.newMessage.trim() !== ''){
                const today = new Date().toLocaleString('en-US', { hour12: false}).replace(', ', ' ');
                this.contacts[this.activeContact].messages.push(new Message(today, this.newMessage, 'sent'));
                this.newMessage = '';
                setTimeout(()=>{
                    this.contacts[this.activeContact].messages
                    .push(new Message(today, this.randomAnswers[createRandomNum(0, this.randomAnswers.length - 1)], 'received'));
                }, 1000);
            }
        },
        searchContacts(){
            if(this.searchedInput !== ''){
                return this.contacts.filter((contact)=> {
                    return contact.name.toLowerCase().includes(this.searchedInput.toLowerCase());
                });
            }else {
                return this.contacts;
            }
        },
        handleDate(time){
            return time.split(' ')[1].substring(0, 5);
        },
        dropDown(index = ''){
            this.hasClikedIndex = index;
            if(!this.hasClicked && index !== ''){
                this.hasClicked = true;
            }else{
                this.hasClicked = false;
                this.hasClickedIndex = '';
            }
        },
        deleteMeesage(index){
            this.contacts[this.activeContact].messages.splice(index, 1);
            this.hasClickedIndex = '';
            this.hasClicked = false;
        },
        removeSlide(){
            this.slide = false;
        }
    }
}).mount('#app');




