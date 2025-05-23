import React from "react";
import './App.css'
class Previewer extends React.Component{

    constructor(props){
        super(props);
        this.lastIndex = 0;

        this.content = [];

        this.checkText = this.checkText.bind(this);
        this.convert = this.convert.bind(this);

    }

    checkText(){
        console.log(`Text: ${this.props.text}`)
        let text = this.props.text.split('\n')
        let encabezado = [];

        for (let line of text){
            if(line !== '')
                encabezado.push(this.convert(line));
        }

        this.content.push(encabezado);
        console.log(this.content)
    }

    componentDidUpdate(){
      //  this.content = []
       // this.checkText();
    }

    componentDidMount(){
        //this.checkText();
    }

    convert(text){
        let encabezado = '';

        if(text.match('^#{1}')){

            encabezado = <h1 key={this.lastIndex}>{text}</h1>
        }

        else{
            encabezado = <p key={this.lastIndex}>{text}</p>;
        }
        this.lastIndex++;
        return encabezado;
    }

    render(){
        this.content = []
        this.checkText();
        return (
            <div className="editor">
                <div className="bar">Previewer</div>
                <div className="content">
                    {this.content}
                </div>

            </div>
        )
    }
}

export default Previewer;