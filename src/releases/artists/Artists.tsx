import React from 'react';
import { IArtist } from '../../types';
import styled from 'styled-components';

interface MultipleArtistsProps {
    artists: IArtist[];
}

const ArtistNames = styled.span`
    .artistName {
        display: inline-block;
    }
    
    // For the comma between artists, except the latest one
    .artistName + .artistName::before { 
        display: inline-block;
        white-space: pre;
        content: ", ";
    }
`;

const Artists = ({ artists }: MultipleArtistsProps) => {
    return (
        <ArtistNames>
            {artists.map((artist) => <span className='artistName'>{ artist.name} </span> )}
        </ArtistNames>
    );
};

export default Artists;
