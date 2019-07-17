import React, { Component } from "react";
import SearchScreen from "./presenter";
import SearchBar from "../../components/SearchBar";
import PropTypes from "prop-types";

class Container extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            headerTitle: <SearchBar submit={(text) => {params.submitSearch(text)}}/>
        }
    }
    static = {
        searchingBy: "",
        isFetching: false
    }
    static propTypes = {
        getEmptySearch: PropTypes.func.isRequired,
	    searchHashtag: PropTypes.func.isRequired,
	    search: PropTypes.array
    }
    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({
            submitSearch: this._submitSearch
        })
    }
    componentWillReceiveProps = nextProps => {
	    if (nextProps.search) {
	      this.setState({
	        isFetching: false
	      });
	    }
    };
    render() {
        return <SearchScreen {...this.state} {...this.props} refresh={this._refresh} />
    }
    _submitSearch(text) {
        const {searchingBy} = this.state;
        const {searchHashtag} = this.props;
        if (text === "") {
            getEmptySearch();
        } else {
            //call api by hashtag
            searchHashtag(text);
        }
        this.setState({
            searchingBy: text,
            isFetching: true
        })
    }
    _refresh() {
        const { searchingBy } = this.state;
        const { getEmptySearch, searchHashtag } = this.props;
        if (searchingBy === "") {
            getEmptySearch();
        } else {
            searchHashtag(searchingBy);
        }
    }
}

export default Container;