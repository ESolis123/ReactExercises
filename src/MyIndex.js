import React from 'react';
import './Styles.css';
import Twitter from './assets/twitter-brands.svg';
import Tumblr from './assets/tumblr-brands.svg';

const quotes =[
    {
        phrase: 'Whatever the mind of man can conceive and believe, it can achieve.',
        author: 'Napoleon Hill'
    },

    {
        phrase: 'Be yourself; everyone else is already taken.',
        author: 'Oscar Wilde'
    },

    {
        phrase: 'So many books, so little time.',
        author: 'Frank Zappa'
    }
]

const colors = [
    "#194980", "#ed4256", "#cfca48", "#19b34f"
]

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            quote: quotes[parseInt(Math.random() * quotes.length)],
            color: colors[parseInt(Math.random() * colors.length)]
        }
    }

    newQuote = () => {
        let quotesFiltered = quotes.filter(quote => quote.phrase !== this.state.quote.phrase);
        this.setState({quote: quotesFiltered[parseInt(Math.random() * quotesFiltered.length)]})
        this.changeColor();
    }

    getRandomColor = () => {

        console.log(`Color: ${this.getRandomItem(colors)}`);
        return this.getRandomItem(colors);
    }

    getRandomQuote = () => {

        console.log(`Quote: ${this.getRandomItem(quotes)}`);
        return this.getRandomItem(quotes);
    }

    getRandomItem = (array) =>  array[parseInt(Math.random() * array.length)];

    changeColor = () => {

        let colors2 = [...colors].filter(color=>color !== this.state.color)

        let randomIndex = parseInt(Math.random() * colors2.length);
        this.setState({color: colors2[randomIndex]})

        this.changeButtonColors();
    }


    changeButtonColors(){
        for(let button of document.getElementsByTagName("button")){
            button.style.backgroundColor = this.state.color;
        }

        document.getElementsByTagName("body")[0].style.backgroundColor = this.state.color;
    }

    componentDidMount(){
        this.changeButtonColors();
    }


    render(){
        let quote = this.state.quote;
        let fullQuote = `${quote.phrase} %0D%0A${quote.author}`
        let url = `https://x.com/intent/tweet?text=${fullQuote}`;

        return (
            <div id="content">
                <div id="quote-box">
                    <span id="text"><span>"</span>{quote.phrase}</span>
                    <span id="author">- <span>{quote.author}</span></span>

                    <div id="buttons">
                        <button>
                            <a id="tweet-quote" href={url}>
                                <img src={Twitter} width="50px" height="80px" />
                            </a>
                        </button>
                        <button><img src={Tumblr} width="40px" height="60px"/></button>
                        <button id="new-quote" onClick={this.newQuote}>New Quote</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;