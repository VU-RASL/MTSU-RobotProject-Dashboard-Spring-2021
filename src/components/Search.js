import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
import '../components/search.css';
import { Link } from 'react-router-dom';
import icon from '../images/search_icon.png'


function shouldRenderSuggestions() {
  return true;
}



// used to refresh page , so that user can search multiple names while on profile page
function refreshPage() {
  setTimeout(() => {
    window.location.reload(false);
  }, 50);

}


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  // user selects a name from list.. will be a link that takes them to their specific 
  // page
  <div>

    <Link to={{ pathname: '/participant_profile', state: { name: suggestion.name } }} style={{ display: "block" }} onClick={refreshPage}> {suggestion.name} </Link>

  </div>
);



// place image icon in search bar here
const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <img className="icon" src={icon} alt="" />
    <input {...inputProps} />
  </div>
);



class Search extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      results: []
    };
  }


  componentDidMount() {

    this.getData();

  }






  getData() {

    async function status() {
      const url = "http://localhost:4000/app/data";
      let response = await axios.get(url);
      return response.data;
    }

    status().then((data) => this.setState({ results: data })

    );




  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {




    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = value => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      // if user click box and doesnt enter text , then show all names else if they enter text start filtering
      return inputLength === 0 ? this.state.results.filter(result =>
        result.name) : this.state.results.filter(result =>
          result.name.toLowerCase().includes(inputValue)
          // result.name.toLowerCase().slice(0, inputLength) === inputValue // commented this to avoid searching from the start

        );
    };



    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type Name of Participant',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}


      />
    );
  }
}


export default Search;







