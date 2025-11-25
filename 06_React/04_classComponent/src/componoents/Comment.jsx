import React, { Component } from 'react'

export default class Comment extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    componentDidMount(){
        console.log(`componentDidMount : ${this.props.id}`)
    }

    componentDidUpdate(prevProps, prevState){
        console.log("componentDidUpdate : 컴포넌트가 업데이트 되었습니다.")
        console.log("이전 state : ", prevState);
        console.log("이전 props : ", prevProps);
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount : ${this.props.id} 언마운트`)
    }

    render() {
        const {id, message} = this.props;

        return (
            <div style={{border: '1px solid #ddd', padding: '10px', margin: '10px'}}>
                <p>댓글 {id}</p>
                <p>{message}</p>
            </div>
        )
    }
}