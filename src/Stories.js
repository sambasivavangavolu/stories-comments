import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import StoryDetails from './StoryDetails'
import axios from 'axios'

export default class Stories extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedStory: {}
    }
  }

  componentDidMount() {
    this.getCustomerData();
  }

  getCustomerData() {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(response => {
      let data = response.data
      let finalData = []
      console.log(data)
      data = data.splice(0,10)
      data.forEach(item => {        
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`).then(resp => {
          console.log(resp.data)
          finalData.push(resp.data)
          this.setState({stories: finalData})
          this.setState({selectedStory: finalData[0]})
        });
      });
    })
  };

  render() {
    if (!this.state.stories)
      return (<p>Loading data</p>)
    return (<div className="addmargin">
      <div className="col-md-6 text-center">
      <h2>Top 10 Stories</h2>
        {

          this.state.stories && this.state.stories.map(story => <Panel bsStyle="info" key={story.title} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{story.title}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>Url: {story.url}</p>
              <p>Type: {story.type}</p>
              <p>Story By: {story.by}</p>              
              <p>Comments: {story.kids && story.kids.length}</p>
              <Button bsStyle="info" onClick={() => this.setState({selectedStory: story})}>

                Click to View Story Details & Comments

              </Button>

            </Panel.Body>
          </Panel>)
        }
      </div>
      <div className="col-md-6">
        <StoryDetails val={this.state.selectedStory}/>
      </div>
    </div>)
  }

}
