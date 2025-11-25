import React, { Component } from 'react'
import Comment from './Comment'

const serverCommentData = [
    {
        id: 1,
        message: "안녕하세요. 홍길동입니다."
    },{
        id: 2,
        message: "날씨가 아주 추워요."
    },{
        id: 3,
        message: "집갈 때 붕어빵!."
    },
]

export default class CommentBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            commentList: [],
        }
    }

    componentDidMount(){
        this.timer = setInterval(() => {
            const {commentList} = this.state;

            if(commentList.length < serverCommentData.length){
                const nextComment = serverCommentData[commentList.length];
                this.setState({
                    commentList: [...commentList, nextComment],
                })
            } else {
                this.setState({
                    commentList: [],
                })
            }
        }, 3000);
    }

    componentWillUnmount() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        const {commentList} = this.state;

        return (
            <div>
                {commentList.map(c =>
                    <Comment
                        key={c.id}
                        id={c.id}
                        message={c.message}
                    />
                )}
            </div>
        )
    }
}