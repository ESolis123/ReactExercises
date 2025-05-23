import React, { act } from "react";
import './App.css'

class Previewer extends React.Component{

    constructor(props){
        super(props);
        this.lastIndex = 0;

        this.content = [];

        this.checkText = this.checkText.bind(this);
        this.convert = this.convert.bind(this);
        this.actualParent = null;
    }

    checkText(){
        console.log(`Text: ${this.props.text}`)
        let text = this.props.text.split('\n')
        let encabezado = [];

        for (let line of text){
            if(line !== ''){
                let element = this.convert(line)

                if(this.actualParent === null)
                    encabezado.push(element);
                else
                    this.actualParent.push(element);

                if(element.type === "h1" || element.type === "h2"){
                    encabezado.push(<hr className={element.type} />)
                }
            }

        }

        this.content.push(encabezado);
        if(this.actualParent !== null)
           this.content.push(<div className="code">{this.actualParent}</div>);
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

        if(text.match('^#{2}')){
            if(this.actualParent === null)
                encabezado = <h2>{text}</h2>
            else
                encabezado = <p>{text}</p>
        }

        else if(text.match('^#{1}')){
             if(this.actualParent === null)
                encabezado = <h1>{text}</h1>
            else
                encabezado = <p>{text}</p>
        }

        else if(text.match('^(\/){2}')){
            encabezado = <p className="comment">{text}</p>
        }

        else if(text.match('```')){
            if(this.actualParent === null){
                this.actualParent = [];
            }

            else{
                this.content.push(<div className="code">{this.actualParent}</div>);
                this.actualParent = null;
            }

        }

        else{
            encabezado =  <p>{text}</p>
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