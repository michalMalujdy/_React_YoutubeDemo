import React from "react";
import "./SearchBar.scss";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchTerm: "",
            onSubmit: props.onSubmit
        }
    }
    
    render() {
        return (
            <div className="search-bar ui segment">
                <form className="ui form" onSubmit={this.OnFormSubmit}>
                    <div className="field">
                        <label>Video search</label>
                        <input 
                            input="text"
                            value={this.state.searchTerm}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
    
    OnFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchTerm);
    };
    
    onInputChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    };
}

export default SearchBar;