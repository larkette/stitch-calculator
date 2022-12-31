import React from 'react';

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
                <input id='quantity' name='quantity' onChange = {this.updateQuantity}/>
            </label>
            <label name='submit'>
                <input type='submit'/>
            </label>
        </form>
        )
    }
}

// class Repeats extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {numbers: [],};
//     };
//     quantity = this.quantity;
//     render() {
        
//         console.log('Repeats' + this.state.numbers);
//         return(
//             <div>
//                 <ul>{this.list}</ul>
//             </div>
//         );
//     }
// };

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            number: [],
            stitches: 0,
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
            <label name={i} key={labelKey}>How many stitches per repeat?
            <input name={i} key={i} onChange={this.updateStitches}/>
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
        for(let k = 0; k < compareArray.length-1; k++) {
            let thisArray = compareArray[k];
            let nextArray = compareArray[k+1];
            let matchFound = false;
            
            if (matchArray.length === 0) {
                for (let n of nextArray) {
                    for (let l = 0; l < thisArray.length; l++) {
                        if (n === thisArray[l]) {
                            console.log('match: '+ n);
                            matchArray.push(n)
                        } 
                    }
                }
            }
            else {
                for(let m= 0; m < matchArray.length; m++) {
                    for (let n = 0; n < nextArray.length; n++) {
                        if (matchArray[m] === nextArray[n]) {
                            matchFound = true;
                            console.log('match2: ' + matchArray[m])
                        }
                    }
                    if (matchFound === false) {
                        console.log('removed: ' + matchArray[m]);
                        matchArray.splice(m, 1);   
                    }  
                }
                console.log(matchArray);
            }
        }
        
        e.preventDefault();
        this.setState({stitches : matchArray[0]});
        console.log(this.state.stitches);
    }

    render() {
       return(
            <div className='calculator wrapper'>
                <h2>Stitch calculator</h2>
                <Quantity update = {this.handleQuantity} />
                <div>{this.list}</div>
                <form onSubmit={this.stitchCalc}>
                    <label>
                        <input name='stitchSubmit' type='submit'/>
                    </label>
                </form>
                <div>{this.state.stitches}</div>
            </div>
       )
    }
}



export default Calculator;