import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NewsItem extends Component {
    pic = require("./../picFolder/noPicture.jpg")
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card"> {/* style={{ width: "18rem" }} */}
                    <section style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </section>
                    <img src={imageUrl === null ? this.pic : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text" style={{ fontSize: "15px" }}><small className="text-muted">By: {author}, On: {new Date(date).toGMTString()}</small></p>
                        {/* <p className="card-text"><small className="text-muted">Source: {source}</small></p> */}
                        <Link to={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
