import React, { useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import { Oval } from 'react-loader-spinner'; // Import the specific loader you want to use

const ListingForm = ({ setListings }) => {
    const [formData, setFormData] = useState({
        sale_type: 'For Sale',
        price: '$0+',
        bedrooms: '0+',
        home_type: 'House',
        bathrooms: '0+',
        sqft: '1000+',
        days_listed: '1 or less',
        has_photos: '1+',
        open_house: false, // Changed from 'false' to false (boolean)
        keywords: ''
    });

    const {
        sale_type,
        price,
        bedrooms,
        home_type,
        bathrooms,
        sqft,
        days_listed,
        has_photos,
        open_house,
        keywords
    } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        axios.defaults.headers = {
            'Content-Type': 'application/json',
        };

        setLoading(true);
        axios.post('http://localhost:8000/api/listings/search', {
            sale_type,
            price,
            bedrooms,
            home_type,
            bathrooms,
            sqft,
            days_listed,
            has_photos,
            open_house,
            keywords
        })
            .then(res => {
                setLoading(false);
                setListings(res.data);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                setLoading(false);
                window.scrollTo(0, 0);
            });
    };

    return (
        <form className="listingform" onSubmit={onSubmit}>
            <div className="row">
                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="sale_type">
                            Sale or Rent
                        </label>
                        <select className="listingform__select" name="sale_type" onChange={onChange}>
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                    </div>
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="sqft">
                            Area (in sqft)
                        </label>
                        <select className="listingform__select" name="sqft" onChange={onChange}>
                            <option>1000+</option>
                            <option>1200+</option>
                            <option>1500+</option>
                            <option>2000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="days_listed">
                            Days Listed
                        </label>
                        <select className="listingform__select" name="days_listed" onChange={onChange}>
                            <option>1 or less</option>
                            <option>2 or less</option>
                            <option>5 or less</option>
                            <option>10 or less</option>
                            <option>20 or less</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="bedrooms">
                            Bedrooms
                        </label>
                        <select className="listingform__select" name="bedrooms" onChange={onChange}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                            <option>5+</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="has_photos">
                            Has Photos
                        </label>
                        <select className="listingform__select" name="has_photos" onChange={onChange}>
                            <option>1+</option>
                            <option>3+</option>
                            <option>5+</option>
                            <option>10+</option>
                            <option>15+</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="home_type">
                            Home Type
                        </label>
                        <select className="listingform__select" name="home_type" onChange={onChange}>
                            <option>House</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="keywords">
                            Keywords
                        </label>
                        <input className="listingform__input" name="keywords" type="text" onChange={onChange} />
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="open_house">
                            Open House
                        </label>
                        <input className="listingform__checkbox" name="open_house" type="checkbox" onChange={onChange} />
                    </div>
                </div>

                <div className="col-1-of-6">
                    <div className="listingform__section">
                        <label className="listingform__label" htmlFor="bathrooms">
                            Bathrooms
                        </label>
                        <select className="listingform__select" name="bathrooms" onChange={onChange}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-6">
                    {loading ? (
                        <div className="listingform__loader">
                            <Oval
                                color='#424242'
                                height={50}
                                width={50}
                            />
                        </div>
                    ) : (
                        <button type="submit" className='listingform__button listingform__button--primary'>
                            Search
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

ListingForm.propTypes = {
    setListings: PropTypes.func.isRequired,
};

export default ListingForm;
