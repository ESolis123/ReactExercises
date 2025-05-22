import React from 'react';
import './Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            index: 0,
            color: colors[0]
        }
    }

    newQuote = () => {
        if(this.state.index < quotes.length - 1){
            this.setState((state)=> ({index: state.index + 1}))

        }

        else {
            this.setState({index: 0})
        }

        this.changeColor()
    }

    changeColor = () => {

        let colors2 = [...colors].filter(color=>color != this.state.color)

        let randomIndex = parseInt(Math.random() * colors2.length);
        this.setState({color: colors2[randomIndex]})

        document.getElementsByTagName("body")[0].style.backgroundColor = this.state.color;

        this.changeButtonColors()
    }

    changeButtonColors(){
        for(let button of document.getElementsByTagName("button")){
            button.style.backgroundColor = this.state.color;
        }
    }

    componentDidMount(){
        this.changeColor();
    }

    render(){
        let quote = quotes[this.state.index];

        return (
                    <div id="content">
            <div id="quote">
                <span id="quote-text"><span>"</span>{quote.phrase}</span>
                <span id="author">- <span>{quote.author}</span></span>
                {/*<FontAwesomeIcon icon= color='red' />*/}
                <div id="buttons">

                    <button>Twitter</button>
                    <button>Tumbler</button>
                    <button onClick={this.newQuote}>New Quote</button>
                </div>
            </div>
        </div>)
    }
}

export default Index;