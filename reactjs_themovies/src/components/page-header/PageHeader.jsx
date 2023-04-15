import React from 'react'
import './page-header.scss';
const PageHeader = (props) => {
    return (
        <div className="footer" style={{backgroundImage: "url(https://images.unsplash.com/photo-1535016120720-40c646be5580?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)"}}>
            <h2>{props.children}</h2>
        </div>
    )
}

export default PageHeader
