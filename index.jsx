const {Component}=React;
const {Router,Route,IndexRoute,Link}=ReactRouter;

class Main extends Component{
    render(){
        return(
            <div>
                <h1>Hyperledger Fabric Study</h1>
                <ul className="header">
                    <li><Link exact to="/">Home</Link></li>
                    <li><Link to="/basic">BasicNetwork</Link></li>
                    <li><Link to="/first">FirstNetwork</Link></li>
                </ul>
                
                
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Home extends Component{
    render(){
        return(
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}

class BasicNetwork extends Component{
    state={
        amount:0
    }

    basic_network_connect=()=>{
        axios.get('basic_network/connect')
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    query=()=>{        
        axios.get('/basic_network/query')
        .then((response)=>{
            console.log(response.data.msg);
            this.setState({amount:response.data.msg});
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    send=()=>{
        alert(this.amount.value);
        axios.post('/basic_network/send',{"amount":this.amount.value})
        .then((response)=>{
            console.log(response);
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    getHistory=()=>{
        alert(this.user.value);
        axios.post('/basic_network/getHistory',{"user":this.user.value})
        .then((response)=>{
            console.log(response);
            this.tx.value = response.data.msg;
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <h2>BasicNetwork
                에 <button onClick={this.basic_network_connect}>연결</button></h2>
                <br/>
                <button onClick={this.query}  > a의 잔액 확인</button> {' '} {this.state.amount}원
                <br/>               
                <br/> 
                <div>a가 b에게 {' '}
                <input placeholder='송금량' ref={ref=>this.amount=ref} />원을 {' '} 
                <button onClick={this.send}  > 보내기</button><br/>               
                </div>
                <div>
                <input placeholder='user' ref={ref=>this.user=ref} />의
                <button onClick={this.getHistory}  > 송금 이력 보기</button><br/>               
                <textarea id='hong' ref={ref=>this.tx=ref} >
                </textarea>
                </div>

            </div>
        );
    }
}

class FirstNetwork extends Component{
    render(){
        return(
            <div>
                <h2>FirstNetwork</h2>
            </div>
        );
    }
}

ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >
            <IndexRoute component={Home} />
            <Route path="basic" component={BasicNetwork} />
            <Route path="first" component={FirstNetwork} />
        </Route>
    </Router>)
     , document.getElementById("root")
);

