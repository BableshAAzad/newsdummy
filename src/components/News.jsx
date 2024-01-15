import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    // articles = [
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]
    capitalFirstLatter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalFirstLatter(this.props.category)} - Free NewsApp`;
    }
    async updateNews() {
        this.props.setProgress(10);
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parseData = await data.json();
        // console.log(parseData)
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        // let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4aa3b9bcab643459a3b9bdf617b024d&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData)
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }
    // handlePrevClick = async () => {
    //     // console.log("Prev")
    //     // let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4aa3b9bcab643459a3b9bdf617b024d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parseData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parseData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }
    // handleNextClick = async () => {
    //     // console.log("next")
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //         // let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4aa3b9bcab643459a3b9bdf617b024d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         // this.setState({ loading: true });
    //         // let data = await fetch(url);
    //         // let parseData = await data.json();
    //         // this.setState({
    //         //     page: this.state.page + 1,
    //         //     articles: parseData.articles,
    //         //     loading: false
    //         // })
    //         this.setState({ page: this.state.page + 1 });
    //         this.updateNews();
    //     }
    // }
    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        let url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData)
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            // loading: false,
        })
    };
    render() {
        // console.log("render")
        return (
            <>
                <h1 className='text-center' style={{ margin: "35px 0px" }}>NewsApp : Top {this.capitalFirstLatter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />};
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    scrollableTarget="row"
                >
                    <div className='container'>
                    <div className='row'>
                        {/* {!this.state.loading && this.state.articles.map((element) => { */}
                        {this.state.articles.map((element, ind) => {
                            return <div className="col-md-4" key={element.url}>
                                {/* <NewsItem title={element.title === null ? "" : element.title.slice(0, 45)} */}
                                <NewsItem title={element.title === null ? "" : element.title}
                                    // description={element.description === null ? "" : element.description.slice(0, 88)}
                                    description={element.description === null ? "" : element.description}
                                    imageUrl={element.urlToImage} newsUrl={element.url}
                                    author={element.author === null ? "Unknown" : element.author}
                                    date={element.publishedAt}
                                    source={element.source.name} alt="No pic" />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                {/* <section className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark"
                        onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button"
                        className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </section> */}
            </>
        )
    }
}

export default News
