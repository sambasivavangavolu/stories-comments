import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

export default class StoryDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getStoryDetails(this.props.val)
  }

  componentDidUpdate(prevProps) {
    if (this.props.val !== prevProps.val) {
      this.getStoryDetails(this.props.val)
    }
  }

  getStoryDetails(data) {
    if(data.kids && data.kids.length) {
      data.kids = data.kids.splice(0,20)
      data.comments = []
      this.setState({storyDetails: data})
      data.kids.forEach(comment => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`).then(response => {
          data.comments.push(response.data)
          this.setState({storyDetails: data})
        })
      });
    }
  };

  render() {
    if (!this.state.storyDetails)
      return (<p>Loading Data</p>)
    return (<div className="storyDetails text-center">
      <h2>Story Deatils</h2>
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.storyDetails.title}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p>Title : {this.state.storyDetails.title}</p>
          <p>Url : {this.state.storyDetails.url}</p>
          <p>Type : {this.state.storyDetails.type}</p>
          <hr/>
          <div className="text-center">
            <h4>Top 20 Comments</h4>
          </div>
          {this.state.storyDetails.comments && this.state.storyDetails.comments.map(comment => 
            <div className="storyDetails text-center">
              <Panel bsStyle="info" className="centeralign">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{comment.text}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <p>Comment By : {comment.by}</p>
                  <p>Type : {comment.type}</p>
                </Panel.Body>
              </Panel>
            </div>
          )}
        </Panel.Body>
      </Panel>
    </div>)
  }
}
