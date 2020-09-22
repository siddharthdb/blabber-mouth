import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../models/Article';

interface State {
    articles: Article[]
}

export default class ArticleList extends React.Component<{}, State>{

    constructor(props: any) {
        super(props)
        this.state = { articles: [] }
    }

    componentDidMount() {
        fetch(`${process.env.API_URL}/articles`)
        .then(res => res.json())
        .then(res => { console.log(res); this.setState({ articles: res }) })
    }

    render() {        

        return (
            <>
                <div>
                    My recent Articles
                    <div>
                        <ul>
                            {
                                this.state.articles ? this.state.articles.map((al:Article, key: number, articles: Article[]) => {
                                    return <li key={key}><Link to={`/articlepage/${al.title}`}>{al.title}</Link>
                                    </li>
                                }) : <li></li>
                            }
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}