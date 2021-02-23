import React, {Component} from 'react';
import { API } from 'aws-amplify';
import {listTodos} from '../../graphql/queries';
import SearchForm from './function';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './style.css';
import "../../App.css";
import SearchCard from '../Card/search';

class Results extends Component {

    state = {
        search: "",
        listings: [],
        listingSort: [],
        order: "",
        searchLength: false

    };
     async componentDidMount() {
         try{
       // var notesFromAPI= await  API.graphql({ query: listTodos })
         const locationInfo = await API.graphql({ query: listTodos })
         const notesFromAPI = locationInfo.data.listTodos.items;
        this.setState({
            listings: notesFromAPI,
            listingSort: notesFromAPI
        })
    }catch (err){ console.log(err)}
         
    }

    sortByName = () => {
        const filtereds = this.state.listingSort;
        if (this.state.order === "ascending") {
            const sortFunction = filtereds.sort((a, b) => (a.date > b.date) ? 1 : -1)
            console.log(sortFunction)

            this.setState({
                listingSort: sortFunction,
                order: "descending"
            })
        } else {

            const sortFunction = filtereds.sort((a, b) => (a.date > b.date) ? -1 : 1)

            this.setState({
                listingSort: sortFunction,
                order: "ascending"
            })

        }
    }
    render() {
        return (
            <div>
                <Container fluid className="search-bkg">
                    <div style={{ textAlign: 'center' }}>
                        <h2>  Listings   </h2>
                        <h3><SearchForm
                            id={this.state._id}
                            listing={this.state.listings}
                            handleSearch={this.handleSearch}
                            handleInputChange={
                                this.handleInputChange
                            }
                        /></h3>
                    </div>
                    <div className="itemTable">
                        <Row>
                            <Col >

                                <Row>
                                    <thead className="">
                                        <h2
                                            className="hover-pointer heading"
                                            onClick={this.sortByName}
                                        >
                                            Sort by date</h2>
                                    </thead>
                                </Row>
                                {this.state.searchLength ? (

                                <Row className="justify-content-md-center">

                                    {this.state.listingSort.map(
                                        (listing) => {
                                            return (
                                                <Col xs={12} md={12}>
                                                    <Row className="justify-content-md-center">
                                                        <SearchCard
                                                            listingId={listing._id}
                                                            title={
                                                                listing.businessName
                                                            }
                                                            street={
                                                                listing.businessAddress
                                                            }
                                                            city={listing.city}
                                                            state={listing.state}
                                                            modalButton={
                                                                <Button className="btn-custom" variant="custom"><a href={"/Update/" + listing._id}>View</a></Button>

                                                            }
                                                        />
                                                    </Row>

                                                </Col>
                                            )
                                        }
                                    )}
                                </Row>
                                     ) : (
                                                                        <h3>No Results to Display</h3>
                                    )}
                                {this.state.listings.length ? (
                                    <tbody className="">

                                    </tbody>
                                ) : (
                                        <h3>No Results to Display</h3>
                                    )}
                            </Col>
                        </Row>
                    </div>


                </Container>
            </div>
        );
    }
    handleInputChange = (event) => {
        const listings = this.state.listings;
        const UserInput = event.target.value;
        const listingSort = listings.filter(
            (listing) =>
                listing.businessName
                    .toLowerCase()
                    .indexOf(UserInput.toLowerCase()) > -1 ||
                listing.city
                    .toLowerCase()
                    .indexOf(UserInput.toLowerCase()) > -1 ||
                listing.state
                    .toLowerCase()
                    .indexOf(UserInput.toLowerCase()) > -1
        );
        this.setState({
            listingSort,
        });
        this.setState({
            searchLength: !event? false : true,
        });
    };
    listingSearch = () => {
        API.getListings()
            .then((res) =>
                this.setState({
                    listingSort: res.data,
                    listings: res.data,
                })
            )
            .catch((err) => console.log(err));
    };
    handleSearch = (event) => {
        event.preventDefault();
        event.persist();
        const { listings, search } = this.state;
        const userInput = event.target.value;
        console.log(event);
        const listingSort = listings.filter(
            (listing) =>
                listing.businessName
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );

        this.setState({
            listingSort,
        });

    };
}

export default Results;