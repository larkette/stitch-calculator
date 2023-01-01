import React from 'react';
import './calculator.css';
import 'bootstrap/dist/css/bootstrap.css';

class Quantity extends React.Component {
    number = 0;

    updateQuantity = (e) => {
        this.number = e.target.value;
        e.preventDefault();
        
    }

    sendQuantity = (e) => {
        //this.props.giveQuantity(this.number);
        console.log('number: ' + this.number);
        // console.log('quantity: ' + this.quantity);
        this.props.update(this.number)
        e.preventDefault();
    }

    render() {
        return(
        <form onSubmit = {this.sendQuantity}>
            <label name='quantity'>How many repeats are in the pattern?
                <input id='quantity' name='quantity' onChange = {this.updateQuantity} autoComplete = 'off' type='number' required/>
            </label>
            <label name='submit'>
                <input className='btn btn-light' type='submit'/>
            </label>
        </form>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            number: [],
            stitches: 0,
            isRepeatHidden: true,
            isResultHidden: true,
        }
    
    }
    list = [];
    repeat = [];
    // stitches = 0;
    updateNumber = (newNumber) => {
        for(let i = 0; i < newNumber; i++) {
        this.state.number.push(i);
        let labelKey = ('label' + i)
        this.list.push(
            <label className='repeat' name={i} key={labelKey}>How many stitches per repeat?
            <input name={i} key={i} onChange={this.updateStitches} autoComplete='off' type='number' required/>
            </label>
        )
        console.log(this.state.number);
        console.log(this.list);
        }
    }

    handleQuantity = (quantityData) =>{
        this.setState({quantity : quantityData});
        if (this.state.number[0] !== 0) {
            this.updateNumber(quantityData);
        } else {
            if(this.state.number.length > quantityData) {
                let numCopy = this.state.number.splice(0, quantityData);
                this.setState({number: numCopy});
            }
            else {
                let numCopy = this.state.number.splice(0,this.state.number.length);
                this.setState({number : numCopy});
            }
            console.log(this.state.number);
        };
        this.setState({ isRepeatHidden: false});
        
    };
    
    updateStitches = (e) => {
        let repeatName = e.target.name;
        let value = parseInt(e.target.value);
        console.log(e);
        console.log((e.target.name + ': ' + e.target.value))
        this.repeat[repeatName] = value;
        console.log(this.repeat);
        e.preventDefault();
    }
    stitchCalc = (e) => {
        console.log(e);
        console.log('Calc: ' + this.repeat);
        let maxCombo = 0;
        let len = this.repeat.length;
        let compareArray = [];
        let matchArray = [];

        //determine max number by multiplying all repeat inputs
        for (let i = 0; i < len; i++) {
            if (maxCombo === 0) {
                maxCombo = this.repeat[i];
            }
            else {
                maxCombo *= this.repeat[i];
            }
            console.log(maxCombo);
        }
        //create arrays for each repeat by multipying repeat by i
        //until maxMultiple is reached
        for(let i = 0; i< len ; i++) {
            let maxMultiple = maxCombo / this.repeat[i];
            let numArray= [];
            for(let j = 1; j <= maxMultiple; j++) {
                let multiple = this.repeat[i] * j;
                numArray.push(multiple);
            }
            compareArray.push(numArray);
            console.log('Result: ')
            console.log(compareArray);
        }
        for(let k = 0; k < compareArray.length; k++) {
            let thisArray = compareArray[k];
            let nextArray = compareArray[k+1];
            let matchFound = false;
            
            if (matchArray.length === 0) {
                for (let n of nextArray) {
                    for (let l = 0; l <= thisArray.length; l++) {
                        if (n === thisArray[l]) {
                            console.log('match: '+ n);
                            matchArray.push(n)
                        } 
                    }
                }
            }
            else {
                let matches = [];
                for(let m= 0; m <= matchArray.length; m++) {
                    for (let n = 0; n <= thisArray.length; n++) {
                        if (matchArray[m] === thisArray[n]) {
                            matchFound = true;
                            console.log('match2: ' + matchArray[m]);
                            matches.push(matchArray[m]);
                        }
                    }
                    if (matchFound === false) {
                        console.log('removed: ' + matchArray[m]);
                           
                    }  
                }
                matchArray = matches;
                console.log(matchArray);
            }
        }
        
        e.preventDefault();
        this.setState({stitches : matchArray[0]});
        this.setState({isResultHidden: false});
        console.log(this.state.stitches);
    }
    reset = (e) => {
        e.preventDefault();
        console.log(e);
        window.location.reload(false);
    }

    render() {
       return(
            <div className='calculator wrapper'>
                <h2>Stitch calculator</h2>
                <p>Most crochet and knit patterns give a specific number
                    of stitches per row or round, which they calculated to
                    account for any repeats in the pattern.  Some patterns many
                    state to increase in multiples of x.
                </p>
                <p>The calculator below is set up to give you the
                    minimum multiple needed, to cover all
                    of the repeats in the pattern, if not given in the pattern
                    or a pattern you've created.
                </p>
                <Quantity update = {this.handleQuantity} />
                <form id='repeats' className='repeat'>{this.list}</form>
                <form className={this.state.isRepeatHidden ? 'hide' : null} onSubmit={this.stitchCalc}>
                    <label >
                        <input className='btn btn-light' name='stitchSubmit' type='submit'/>
                    </label>
                    <label >
                        <input className='btn btn-light' name='reset' type='submit' onClick= {this.reset} value='Reset'/>
                    </label>
                </form>
                <div className={this.state.isResultHidden ? 'hide' : 'result'}>Your row/round should be in multiples of: {this.state.stitches}</div>
            </div>
       )
    }
}



export default Calculator;