import React from "react";
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
    }

    componentDidUpdate(){
      //  this.content = []
       // this.checkText();
    }

    componentDidMount(){
        //this.checkText();
    }

    createElement(element, children){
        return(React.createElement(element, null, children))
    }

    replaceHeading(text, pattern, heading){
        let newText = text.replace(new RegExp(pattern),"");
        return this.createElement(`h${heading}`, newText)
    }

    checkIfIsAHeading(text){
        for(let i = 3 ; i> 0; i--){
            let pattern =`^#{${i}}`;

            if(text.match(pattern)){
                return this.replaceHeading(text, pattern, i)}
        }

        return <p>{text}</p>
    }


    convert(text){
        let encabezado = '';

        encabezado = this.checkIfIsAHeading(text);

        if(text.match('^(/){2}')){
            encabezado = <p className="comment">{text}</p>
        }

        else if(text.match('^```')){
            if(this.actualParent === null){
                this.actualParent = [];
            }

            else{
                encabezado = <div className="code">{this.actualParent}</div>;
                this.actualParent = null;
            }
        }

        if(text.match(/\*\*(.*)\*\*/)){

            let element = encabezado.type;

            encabezado.props.children = encabezado.props.children.replace(/\*{2}/g,"")
            encabezado = <strong>{encabezado}</strong>
        }

        if(text.match(/_(.*)_/)){
            encabezado.props.children = encabezado.props.children.replace(/\*{2}/g,"")
            encabezado = <strong>{encabezado}</strong>
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